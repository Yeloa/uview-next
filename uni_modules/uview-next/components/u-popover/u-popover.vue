<template>
	<view class="u-popover" :style="[$u.addStyle(customStyle)]">
		<view class="u-popover__trigger" id="popover-trigger" ref="popoverTrigger" @click.stop="clickHandler">
			<slot/>
		</view>
		<u-transition
			mode="fade" 
			:duration="duration" 
			:show="showPopover"
			:custom-style="transitionStyle"
		>
			<view class="u-popover__popup" :style="{
				minWidth:$u.addUnit(minWidth),
				maxWidth:$u.addUnit(maxWidth),
				width:popoverWidth,
				...popoverStyle
			}">
				<view v-if="showArrow" class="u-popover__popup__indicator"
					:class="[`u-popover__popup__indicator__${actualPosition}`]"
					:style="{
						backgroundColor: (arrowColor || bgColor),
						width: $u.addUnit(arrowSize),
						height: $u.addUnit(arrowSize),
					}"
				></view>
				<view 
					class="u-popover__popup__content" 
					:class="[`u-popover__popup__content__${actualPosition}`]"
					:style="{
						backgroundColor: bgColor,
						padding: $u.addUnit(padding),
						borderRadius: $u.addUnit(round)
					}"
				>
					<slot name="content">
						<text :style="{
							color: color,
							fontSize: $u.addUnit(fontSize)
						}">{{ content }}</text>
					</slot>
				</view>
			</view>
		</u-transition>
	</view>
</template>

<script>
import props from './props.js';
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin';

/**
 * Popover 
 * @description 
 * @tutorial https://uveiw.bdxmz.cn/components/popover.html
 * @property {Boolean}			show		是否显示（默认 false ）
 * @property {String}			position		弹出方向：top, bottom, left, right, auto
 * @property {Boolean}			showArrow		是否显示箭头（默认 true ）
 * @property {String | Number}	arrowSize		箭头大小（默认 12px ）
 * @property {String}			arrowColor		箭头颜色（默认 '#000' ）
 * @property {String}			bgColor		弹出层背景色（默认 '#060607' ）
 * @property {String}			color		文字颜色（默认 '#fff' ）
 * @property {String | Number}	fontSize		字体大小（默认 14px ）
 * @property {String | Number}	padding		内边距（默认 8px 12px ）
 * @property {String | Number}	round		圆角（默认 4 ）
 * @property {String | Number}	width		弹出层宽度（默认 '' ）
 * @property {String | Number}	maxWidth		弹出层最大宽度（默认 200 ）
 * @property {String | Number}	minWidth		弹出层最小宽度（默认 50 ）
 * @property {String | Number}	zIndex		层级（默认 999 ）
 * @property {Number}			duration		动画时长（默认 300 ）
 * @property {Boolean}			disabled		是否禁用（默认 false ）
 * @property {Object}			popoverStyle		自定义弹出层样式

 * @example 
 * <u-popover position="top" :content="content">
 * 	<u-button type="primary">点击触发</u-button>
 * </u-popover>
 */
export default {
	name: 'u-popover',
	mixins: [mpMixin, mixin, props],
	data() {
		return {
			showPopover: false,
			popoverWidth: '',
			autoPosition: '', // 自动计算的位置
		}
	},
	computed: {
		// 获取实际使用的position值
		actualPosition() {
			return this.position === 'auto' ? this.autoPosition : this.position
		},
		// 计算气泡和指示器的位置信息
		transitionStyle() {
			let style = {
				position: 'absolute',
				zIndex: this.zIndex
			}

			// 根据actualPosition设置位置
			switch(this.actualPosition) {
				case 'top-left':
					style.left = '0'
					style.transform = 'translate(0, -100%)'
					break
				case 'top':
				case 'top-center':
					style.left = '50%'
					style.transform = 'translate(-50%, -100%)'
					break
				case 'top-right':
					style.right = '0'
					style.transform = 'translate(0, -100%)'
					break
				case 'bottom-left':
					style.bottom = '0'
					style.left = '0'
					style.transform = 'translate(0, 100%)'
					break
				case 'bottom':
				case 'bottom-center':
					style.bottom = '0'
					style.left = '50%'
					style.transform = 'translate(-50%, 100%)'
					break
				case 'bottom-right':
					style.bottom = '0'
					style.right = '0'
					style.transform = 'translate(0, 100%)'
					break
				case 'left-top':
					style.transform = 'translate(-100%, 0)'
					break
				case 'left':
				case 'left-center':
					style.top = '50%'
					style.transform = 'translate(-100%, -50%)'
					break
				case 'left-bottom':
					style.bottom = '0'
					style.transform = 'translate(-100%, 0)'
					break
				case 'right-top':
					style.right = '0'
					style.transform = 'translate(100%, 0)'
					break
				case 'right':
				case 'right-center':
					style.right = '0'
					style.top = '50%'
					style.transform = 'translate(100%, -50%)'
					break
				case 'right-bottom':
					style.right = '0'
					style.bottom = '0'
					style.transform = 'translate(100%, 0)'
					break
				default:
					// 默认为top
					style.left = '50%'
					style.transform = 'translate(-50%, -100%)'
					break
			}

			return style
		}
	},
	mounted() {
		this.init()
	},
	// #ifdef VUE3
	emits: ["click"],
	// #endif
	methods: {
		init() {
			this.addClickOutsideListener()
		},
		// 元素尺寸
		getElRect() {
			const windowInfo = uni.$u.window();
			if(this.width) {
				this.popoverWidth = uni.$u.addUnit(this.width)
			} else {
				this.$uGetRect('#popover-trigger').then(size => {
					// 确保popover宽度不超出屏幕范围
					let targetWidth = size.width
					 if(this.actualPosition.startsWith('left')) {
					 	targetWidth = size.left
					 } else if(this.actualPosition.startsWith('right')) {
					 	targetWidth = windowInfo.windowWidth - size.right
					}

					targetWidth -= 10;
		
					// 如果position为auto，自动计算最佳位置
					if(this.position == 'auto') {
						this.autoPosition = this.calculateBestPosition(targetWidth,size, windowInfo)
					}

					this.popoverWidth = uni.$u.addUnit(targetWidth)
				})
			}
		},
		// 计算最佳显示位置
		calculateBestPosition(popoverWidth, triggerRect, windowInfo) {
			const popoverHeight = 80 // 预估popover高度
			const margin = 10 // 安全边距
			
			// 计算各个方向的可用空间
			const spaceTop = triggerRect.top
			const spaceBottom = windowInfo.windowHeight - triggerRect.bottom
			const spaceLeft = triggerRect.left
			const spaceRight = windowInfo.windowWidth - triggerRect.right
			
			// 优先级：top > bottom > right > left
			if (spaceTop >= popoverHeight + margin) {
				// 上方有足够空间
				if (triggerRect.left + popoverWidth <= windowInfo.windowWidth - margin) {
					return 'top-left'
				} else if (triggerRect.right - popoverWidth >= margin) {
					return 'top-right'
				} else {
					return 'top'
				}
			} else if (spaceBottom >= popoverHeight + margin) {
				// 下方有足够空间
				if (triggerRect.left + popoverWidth <= windowInfo.windowWidth - margin) {
					return 'bottom-left'
				} else if (triggerRect.right - popoverWidth >= margin) {
					return 'bottom-right'
				} else {
					return 'bottom'
				}
			} else if (spaceRight >= popoverWidth + margin) {
				// 右侧有足够空间
				if (triggerRect.top + popoverHeight <= windowInfo.windowHeight - margin) {
					return 'right-top'
				} else if (triggerRect.bottom - popoverHeight >= margin) {
					return 'right-bottom'
				} else {
					return 'right'
				}
			} else if (spaceLeft >= popoverWidth + margin) {
				// 左侧有足够空间
				if (triggerRect.top + popoverHeight <= windowInfo.windowHeight - margin) {
					return 'left-top'
				} else if (triggerRect.bottom - popoverHeight >= margin) {
					return 'left-bottom'
				} else {
					return 'left'
				}
			} else {
				// 所有方向空间都不够，选择空间最大的方向
				const maxSpace = Math.max(spaceTop, spaceBottom, spaceLeft, spaceRight)
				if (maxSpace === spaceTop) return 'top'
				if (maxSpace === spaceBottom) return 'bottom'
				if (maxSpace === spaceRight) return 'right'
				return 'left'
			}
		},
		clickHandler(e) {
			if(this.disabled) return
			this.getElRect()
			// #ifndef H5
			uni.$emit('u-popover-close')
			// #endif
			// 然后切换当前组件状态
			this.showPopover = !this.showPopover
		},
		// 添加全局点击监听
		addClickOutsideListener() {
			// #ifdef H5
			document.addEventListener('click', this.handleClickOutside, true)
			// #endif

			// #ifndef H5
			uni.$on('u-popover-close', () => {
				this.handleClickOutside()
			})
			// #endif
		},
		// 移除全局点击监听
		removeClickOutsideListener() {
			// #ifdef H5
			document.removeEventListener('click', this.handleClickOutside, true)
			// #endif
		
			// #ifndef H5
			uni.$off('u-popover-close')
			// #endif
		},
		handleClickOutside(e) {
			if (!this.showPopover) return
			// #ifdef H5
			// 检查点击的目标是否在popover组件内部
			if (e && this.$el && this.$el.contains(e.target)) {
				return
			}
			// #endif
			this.showPopover = false
		}
	},
	// #ifdef VUE2
	beforeDestroy() {
		this.removeClickOutsideListener()
	},
	// #endif

	// #ifdef VUE3
	beforeUnmount() {
		this.removeClickOutsideListener()
	}
	// #endif
}
</script>

<style lang="scss" scoped>
@import "../../libs/css/components.scss";

.u-popover {
	position: relative;
	@include flex;

	&__popup {
		@include flex;
		justify-content: center;
		align-items: center;
	
		&__indicator {
			position: absolute;
			z-index: -1;
			border-radius: 2px;
			transform: rotate(45deg);
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
			&__top,
			&__top-center {
				bottom: 5px;
			}

			&__top-left {
				bottom: 5px;
				left: 15px;
			}

			&__top-right {
				bottom: 5px;
				right: 15px;
			}

			&__bottom-left {
				top: 5px;
				left: 15px;
			}

			&__bottom,
			&__bottom-center {
				top: 5px;
			}

			&__bottom-right {
				top: 5px;
				right: 15px;
			}

			&__left-top {
				right: 5px;
				top: 15px;
			}	

			&__left,
			&__left-center {
				right: 5px;
			}		

			&__left-bottom {
				right: 5px;
				bottom: 15px;
			}

			&__right-top {
				left: 5px;
				top: 15px;
			}	

			&__right,
			&__right-center {
				left: 5px;
			}	

			&__right-bottom {
				left: 5px;
				bottom: 15px;
			}	
		}
		
		&__content {
			position: relative;
			flex: 1;
			overflow: hidden;
			box-shadow: 0 6px 30px 5px rgba(0, 0, 0, .05), 0 10px 10px 2px rgba(0, 0, 0, .04), 0 10px 10px -5px rgba(0, 0, 0, .08);
			
			&__top,
			&__top-left,
			&__top-center,
			&__top-right {
				margin-bottom: 10px;
			}

			&__bottom,
			&__bottom-left,
			&__bottom-center,
			&__bottom-right {
				margin-top: 10px;
			}

			&__left,
			&__left-top,
			&__left-center,
			&__left-bottom {
				margin-right: 10px;
			}

			&__right,
			&__right-top,
			&__right-center,
			&__right-bottom {
				margin-left: 10px;
			}
		}
	}
}
</style>
