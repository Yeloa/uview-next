<template>
	<view
		@touchmove.stop.prevent="handleTouchMove"
		@touchstart="handleTouchStart"
		@touchend="handleTouchEnd"
		class="u-fab"
		:class="[`u-fab--${this.position}`]"
		:style="[rootStyle]"
		@click.stop=""
	>
		<view :style="{ visibility: inited ? 'visible' : 'hidden' }" class="u-fab__trigger-wrapper">
			<slot name="trigger" v-if="$slots.trigger || $slots.$trigger"></slot>
			<u-button 
				v-else 
				shape="circle"
				@click="handleClick" 
				:type="type" 
				:disabled="disabled"
				:custom-style="triggerStyle"
				:icon="isActive ? activeIcon : inactiveIcon"
			></u-button>
		</view>
		
		<u-transition
			v-if="expandable"
			:show="isActive"
			mode="fade"
			:duration="300"
			:custom-style="actionsStyle"
		>
			<view class="u-fab__actions" :class="[`u-fab__actions--${this.fabDirection}`]">
				<slot></slot>
			</view>
		</u-transition>
	</view>
</template>

<script>
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom')
// #endif
import props from './props.js';
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin';

/**
 * fab 悬浮按钮
 * @description 悬浮动作按钮组件，按下可显示一组动作按钮
 * @tutorial https://uveiw.bdxmz.cn/components/fab.html
 * @property {Boolean}		active			是否激活 （默认 false ）
 * @property {String}		type			类型，可选值为 primary、success、info、warning、error、default （默认 'primary' ）
 * @property {String}		position		悬浮按钮位置，可选值为 left-top、right-top、left-bottom、right-bottom、left-center、right-center、top-center、bottom-center （默认 'right-bottom' ）
 * @property {String}		draggable		按钮拖动模式，可选值为 auto（自动吸附）、free（自由拖动）、none（不可拖动） （默认 'auto' ）
 * @property {String}		direction		悬浮按钮菜单弹出方向，可选值为 top、right、bottom、left （默认 'top' ）
 * @property {Boolean}		disabled		是否禁用 （默认 false ）
 * @property {String}		inactiveIcon	悬浮按钮未展开时的图标 （默认 'plus' ）
 * @property {String}		activeIcon		悬浮按钮展开时的图标 （默认 'close' ）
 * @property {String}		iconColor		悬浮按钮图标颜色 （默认 '#fff' ）
 * @property {Number}		zIndex			自定义悬浮按钮层级 （默认 99 ）
 * @property {Object}		gap				自定义悬浮按钮与可视区域边缘的间距 （默认 {top: 16, left: 16, right: 16, bottom: 16} ）
 * @property {Boolean}		expandable		用于控制点击时是否展开菜单 （默认 true ）
 * @property {Object}		customStyle		定义需要用到的外部样式
 * 
 * @event {Function} click expandable 设置为 false 时，点击悬浮按钮触发
 * @event {Function} change 菜单状态改变时触发
 * @event {Function} update:active 激活状态改变时触发
 * @example <u-fab v-model:active="active" :type="type" :position="position" :direction="direction"></u-fab>
 */
export default {
	name: "u-fab",
	mixins: [mpMixin, mixin, props],
	data() {
		return {
			inited: false, // 是否初始化完成
			isActive: false, // 是否激活状态
			fabDirection: this.direction, // 实际弹出方向
			top: 0,
			left: 0,
			screen: { width: 0, height: 0 },
			fabSize: { width: 56, height: 56 },
			bounding: {
				minTop: 0,
				minLeft: 0,
				maxTop: 0,
				maxLeft: 0
			},
			touchOffset: { x: 0, y: 0 }, // 按下时坐标相对于元素的偏移量
			attractTransition: false // 是否显示吸附动画
		}
	},
	computed: {
		rootStyle() {
			const style = {
				position: 'fixed',
				top: this.$u.addUnit(this.top),
				left: this.$u.addUnit(this.left),
				zIndex: this.zIndex,
				transition: this.attractTransition ? 'all ease 0.3s' : 'none'
			}
			return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle))
		},
		triggerStyle() {
			return {
				width: this.$u.addUnit(this.size),
				height: this.$u.addUnit(this.size),
				boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
			}
		},
		actionsStyle() {
			const style = {
				position: 'absolute',
				zIndex: 1,
				display: 'flex',
				alignItems: 'center'
			}

			switch (this.fabDirection) {
				case 'top':
					style.bottom = '100%';
					style.left = '50%';
					style.transform = 'translateX(-50%)';
					style.flexDirection = 'column-reverse';
					break;
				case 'right':
					style.left = '100%';
					style.top = '50%';
					style.transform = 'translateY(-50%)';
					style.flexDirection = 'row';
					break;
				case 'bottom':
					style.top = '100%';
					style.left = '50%';
					style.transform = 'translateX(-50%)';
					style.flexDirection = 'column';
					break;
				case 'left':
					style.right = '100%';
					style.top = '50%';
					style.transform = 'translateY(-50%)';
					style.flexDirection = 'row-reverse';
					break;
			}
			return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle))
		}
	},
	watch: {
		active: {
			handler(newVal) {
				this.isActive = newVal
			},
			immediate: true
		},
		direction: {
			handler(newVal) {
				this.fabDirection = newVal
				
			}
		},
		position() {
			this.initPosition()
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.init()
		})
	},

	// #ifdef VUE3
	emits: ['update:active', 'click','change'],
	// #endif
	methods: {
		async init() {
			await this.getBounding()
			this.initPosition()
			this.inited = true
		},
		
		async getBounding() {
			const windowInfo = this.$u.window()
		
			// 获取触发器尺寸
			try {
				// #ifndef APP-NVUE
				const triggerInfo = await this.$uGetRect('.u-fab__trigger-wrapper')
				this.fabSize.width = triggerInfo.width || 56
				this.fabSize.height = triggerInfo.height || 56
				// #endif
				
				// #ifdef APP-NVUE
				this.fabSize.width = 56
				this.fabSize.height = 56
				// #endif
			} catch (error) {
				console.log('获取触发器尺寸失败:', error)
			}

			const { top = 16, left = 16, right = 16, bottom = 16 } = this.gap
			this.screen.width = windowInfo.windowWidth
			this.screen.height = windowInfo.windowHeight
			
			// #ifdef H5
			this.screen.height = windowInfo.windowTop + windowInfo.windowHeight
			this.bounding.minTop = windowInfo.windowTop + top
			// #endif
			
			// #ifndef H5
			this.bounding.minTop = top
			// #endif
			
			this.bounding.minLeft = left
			this.bounding.maxLeft = this.screen.width - this.fabSize.width - right
			this.bounding.maxTop = this.screen.height - this.fabSize.height - bottom
		},
		
		initPosition() {
			const pos = this.position
			const { minLeft, minTop, maxLeft, maxTop } = this.bounding
			const centerY = (maxTop + minTop) / 2
			const centerX = (maxLeft + minLeft) / 2

			switch (pos) {
				case 'left-top':
					this.top = minTop
					this.left = minLeft
					break
				case 'right-top':
					this.top = minTop
					this.left = maxLeft
					break
				case 'left-bottom':
					this.top = maxTop
					this.left = minLeft
					break
				case 'right-bottom':
					this.top = maxTop
					this.left = maxLeft
					break
				case 'left-center':
					this.top = centerY
					this.left = minLeft
					break
				case 'right-center':
					this.top = centerY
					this.left = maxLeft
					break
				case 'top-center':
					this.top = minTop
					this.left = centerX
					break
				case 'bottom-center':
					this.top = maxTop
					this.left = centerX
					break
			}
		},
		
		handleTouchStart(e) {
			if (this.draggable === 'none') return
			const touch = e.touches[0]
			this.touchOffset.x = touch.clientX - this.left
			this.touchOffset.y = touch.clientY - this.top
			this.attractTransition = false
		},

		handleTouchMove(e) {
			if (this.draggable === 'none') return

			const touch = e.touches[0]
			const { minLeft, minTop, maxLeft, maxTop } = this.bounding
			let x = touch.clientX - this.touchOffset.x
			let y = touch.clientY - this.touchOffset.y

			if (x < minLeft) x = minLeft
			else if (x > maxLeft) x = maxLeft

			if (y < minTop) y = minTop
			else if (y > maxTop) y = maxTop

			this.top = y
			this.left = x
		},

		handleTouchEnd() {

			const screenCenterX = this.screen.width / 2
			const fabCenterX = this.left + this.fabSize.width / 2
			this.attractTransition = true
		
			// 自动吸附模式
			// 检查指定方向是否有足够空间
			const hasEnoughSpace = this.checkDirectionSpace(this.direction)
			
			// 自动计算最佳位置
			if (this.draggable === 'auto') {
				if (fabCenterX < screenCenterX) {
					this.left = this.bounding.minLeft
				} else {
					this.left = this.bounding.maxLeft
				}
			}

			if (hasEnoughSpace) {
				// 使用指定的方向
				this.fabDirection = this.direction
				this.adjustPositionForDirection(this.direction)
			} else {
				// 自动计算最佳位置
				if (fabCenterX < screenCenterX) {
					this.fabDirection = 'right'
				} else {
					this.fabDirection = 'left'
				}
			}
		},
		
		// 检查指定方向是否有足够空间
		checkDirectionSpace(direction) {
			const { minLeft, minTop, maxLeft, maxTop } = this.bounding
			const fabCenterX = this.left + this.fabSize.width / 2
			const fabCenterY = this.top + this.fabSize.height / 2
			const minSpaceNeeded = 100 // 菜单需要的最小空间
			
			switch (direction) {
				case 'top':
					return fabCenterY - minTop >= minSpaceNeeded
				case 'bottom':
					return maxTop - fabCenterY >= minSpaceNeeded
				case 'left':
					return fabCenterX - minLeft >= minSpaceNeeded
				case 'right':
					return maxLeft - fabCenterX >= minSpaceNeeded
				default:
					return false
			}
		},
		
		// 根据方向调整位置
		adjustPositionForDirection(direction) {
			const screenCenterX = this.screen.width / 2
			const screenCenterY = this.screen.height / 2
			
			switch (direction) {
				case 'top':
				case 'bottom':
					// 垂直方向时，水平居中或靠近边缘
					if (Math.abs(this.left + this.fabSize.width / 2 - screenCenterX) < 50) {
						// 如果接近中心，保持中心位置
						this.left = screenCenterX - this.fabSize.width / 2
					}
					break
				case 'left':
				case 'right':
					// 水平方向时，垂直居中或靠近边缘  
					if (Math.abs(this.top + this.fabSize.height / 2 - screenCenterY) < 50) {
						// 如果接近中心，保持中心位置
						this.top = screenCenterY - this.fabSize.height / 2
					}
					break
			}
		},
		
		// 根据当前位置调整弹出方向（用于自由拖动模式）
		adjustDirectionByPosition() {
			const screenCenterX = this.screen.width / 2
			const screenCenterY = this.screen.height / 2
			const fabCenterX = this.left + this.fabSize.width / 2
			const fabCenterY = this.top + this.fabSize.height / 2
			
			// 根据位置智能选择弹出方向
			const distanceToLeft = fabCenterX - this.bounding.minLeft
			const distanceToRight = this.bounding.maxLeft - fabCenterX
			const distanceToTop = fabCenterY - this.bounding.minTop
			const distanceToBottom = this.bounding.maxTop - fabCenterY
			
			// 找到空间最大的方向
			const maxDistance = Math.max(distanceToLeft, distanceToRight, distanceToTop, distanceToBottom)
			
			if (maxDistance === distanceToTop) {
				this.fabDirection = 'top'
			} else if (maxDistance === distanceToBottom) {
				this.fabDirection = 'bottom'
			} else if (maxDistance === distanceToLeft) {
				this.fabDirection = 'left'
			} else {
				this.fabDirection = 'right'
			}
		},
		
		handleClick() {
			if (this.disabled) {
				return
			}

			if (!this.expandable) {
				this.$emit('click')
				return
			}

			this.isActive = !this.isActive
			this.$emit('change')
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.u-fab {
	position: fixed;
	
	&__trigger-wrapper {
		position: relative;
		z-index: 2;
	}
	
	&__actions {
		position: absolute;
		z-index: 1;
		display: flex;
		align-items: center;

		&--top {
			bottom: 100%;
			left: 50%;
			transform: translateX(-50%);
			margin-bottom: 8px;
			flex-direction: column-reverse;
		}
		
		&--right {
			left: 100%;
			top: 50%;
			transform: translateY(-50%);
			margin-left: 8px;
			flex-direction: row;
		}
		
		&--bottom {
			top: 100%;
			left: 50%;
			transform: translateX(-50%);
			margin-top: 8px;
			flex-direction: column;
		}
		
		&--left {
			right: 100%;
			top: 50%;
			transform: translateY(-50%);
			margin-right: 8px;
			flex-direction: row-reverse;
		}
		
	}
}
</style>
