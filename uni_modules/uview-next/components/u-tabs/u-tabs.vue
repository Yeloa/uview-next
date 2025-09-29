<template>
	<view class="u-tabs">
		<view class="u-tabs__wrapper">
			<slot name="left" />
			<view class="u-tabs__wrapper__scroll-view-wrapper">
				<scroll-view
					:scroll-x="scrollable"
					:scroll-left="scrollLeft"
					scroll-with-animation
					class="u-tabs__wrapper__scroll-view"
					:show-scrollbar="false"
					ref="u-tabs__wrapper__scroll-view"
				>
					<view
						class="u-tabs__wrapper__nav"
						ref="u-tabs__wrapper__nav"
					>
						<view
							class="u-tabs__wrapper__nav__item"
							v-for="(item, index) in computedList"
							:key="index"
							@tap="clickHandler(item, index)"
							@longpress="longPressHandler(item,index)"
							:ref="`u-tabs__wrapper__nav__item-${index}`"
							:style="[$u.addStyle(itemStyle), {flex: scrollable ? '' : 1}]"
							:class="[`u-tabs__wrapper__nav__item-${index}`, item.disabled && 'u-tabs__wrapper__nav__item--disabled']"
						>
							<text
								:class="[item.disabled && 'u-tabs__wrapper__nav__item__text--disabled']"
								class="u-tabs__wrapper__nav__item__text"
								:style="[textStyle(index)]"
							>{{ item[keyName] }}</text>
							<u-badge
								:show="!!(item.badge && (item.badge.show || item.badge.isDot || item.badge.value))"
								:isDot="item.badge && item.badge.isDot"
								:value="item.badge && item.badge.value "
								:max="item.badge && item.badge.max"
								:showZero="item.badge && item.badge.showZero"
								:type="(item.badge && item.badge.type) || ''"
								:bgColor="(item.badge && item.badge.bgColor) || ''"
								:color="(item.badge && item.badge.color) || ''"
								:shape="(item.badge && item.badge.shape) || ''"
								:numberType="(item.badge && item.badge.numberType) || ''"
								:inverted="item.badge && item.badge.inverted"
								customStyle="margin-left: 4px;"
							></u-badge>
						</view>
							<view
								v-if="showLine"
								class="u-tabs__wrapper__nav__line"
								ref="u-tabs__wrapper__nav__line"
								:style="[{
									width: $u.addUnit(lineWidth),
									transform: `translate(${lineOffsetLeft}px)`,
									transitionDuration: `${firstTime ? 0 : duration}ms`,
									height: $u.addUnit(lineHeight),
									background: lineColor,
									backgroundSize: lineBgSize,
								}]"
							>
							</view>
						</view>
				</scroll-view>
			</view>
			<slot name="right" />
		</view>
		<view
			v-if="isSlot" 
			class="u-tabs__content" 
			@touchstart="onTouchStart" 
			@touchmove="onTouchMove" 
			@touchend="onTouchEnd" 
			@touchcancel="onTouchEnd"
		>
			<view 
				class="u-tabs__content__body"
				:class="[animated ? 'u-tabs__content__body--animated' : '']"
				:style="contentBodyStyle"
			>
				<slot />
			</view>
		</view>
	</view>
</template>

<script>
	import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';
	/**
	 * Tabs 标签
	 * @description tabs标签组件，在标签多的时候，可以配置为左右滑动，标签少的时候，可以禁止滑动。激活的tab会自动移动到组件的中间位置。
	 * @tutorial https://uview.d3u.cn/components/tabs.html
	 *
	 * @property {Number} duration 滑块/内容动画过渡时间(ms)，默认 300
	 * @property {Boolean} animated 是否启用转场动画，默认 false
	 * @property {Boolean} swipeable 是否启用左右滑动切换，默认 false
	 * @property {String|Number} height 内容区域固定高度，默认 ''(自适应)
	 * @property {Array} list tabs标签数组，默认 []
	 * @property {String} lineColor 滑块颜色，默认主题色
	 * @property {String|Object} activeStyle 选中项文字样式，默认 { color: theme.contentColor }
	 * @property {String|Object} inactiveStyle 未选中项文字样式，默认 { color: theme.lightColor }
	 * @property {String|Number} lineWidth 滑块长度，默认 20
	 * @property {String|Number} lineHeight 滑块高度，默认 3
	 * @property {String} lineBgSize 滑块背景显示大小(背景为图片时使用)，默认 'cover'
	 * @property {String|Object} itemStyle 菜单item样式，默认 { height: '44px' }
	 * @property {Boolean} scrollable 菜单是否可滚动，默认 true
	 * @property {Number|String} current 当前选中标签索引/标识，默认 0
	 * @property {String} keyName 从 list 元素对象中读取标题的键名，默认 'name'
	 * @property {Boolean} showLine 是否显示滑块，默认 true
	 *
	 * @event {Function} change 标签改变时触发，参数 { index }
	 * @event {Function} click 点击标签时触发，参数 { index }
	 * @event {Function} longPress 长按标签时触发，参数 { index }
	 *
	 * @example <u-tabs :list="list" :scrollable="false" :current="current" @change="change" @longPress="longPress"></u-tabs>
	 */
	export default {
		name: 'u-tabs',
		mixins: [mpMixin, mixin, props],
		data() {
			return {
				swiperCurrent: 0,
				isSlot: false,
				firstTime: true,
				scrollLeft: 0,
				scrollViewWidth: 0,
				lineOffsetLeft: 0,
				tabsRect: {
					left: 0
				},
				innerCurrent: 0,
				moving: false,
				children: [],
				// 触摸相关状态（精简为一个对象）
				touch: {
					startX: 0,
					startY: 0,
					deltaX: 0,
					deltaY: 0,
					offsetX: 0,
					offsetY: 0,
					direction: ''
				},
				dragging: false,
				dragOffsetPct: 0
			}
		},
		watch: {
			current: {
				immediate: true,
				handler (newValue, oldValue) {
					// 内外部值不相等时，才尝试移动滑块
					if (newValue !== this.innerCurrent) {
						// 如果使用子组件方式，需要根据name或index来匹配
						if (this.list && this.list.length > 0) {
							// 使用list方式，直接使用数字索引
							this.innerCurrent = parseInt(newValue)
						} else {
							// 使用子组件方式，需要找到对应的索引
							const index = this.children.findIndex((child, idx) => {
								return (child.name !== null && child.name !== undefined) ? child.name === newValue : idx === newValue
							})
							this.innerCurrent = index >= 0 ? index : 0
						}
						this.$nextTick(() => {
							this.resize()
						})
					}
				}
			},
			// list变化时，重新渲染list各项信息
			list() {
				this.$nextTick(() => {
					this.resize()
				})
			},
			// 监听子组件变化
			children() {
				this.$nextTick(() => {
					this.resize()
				})
			}
		},
		computed: {
			// 计算最终的list，优先使用list属性，如果没有则使用子组件生成的list
			computedList() {
				if (this.list && this.list.length > 0) {
					return this.list
				}

				this.isSlot = true
				// 从子组件生成list
				return this.children.map((child, index) => {
					return {
						[this.keyName]: child.label,
						disabled: child.disabled || false,
						badge: {
							isDot: child.dot,
							value: child.badge
						}
					}
				})
			},
			textStyle() {
				return index => {
					
					const style = {}
					// 取当期是否激活的样式
					const customeStyle = index === this.innerCurrent ? uni.$u.addStyle(this.activeStyle) : uni.$u.addStyle(this.inactiveStyle)
					// 如果当前菜单被禁用，则加上对应颜色，需要在此做处理，无法在style样式中通过!import覆盖标签的内联样式
					if (this.computedList[index].disabled) {
						style.color = '#c8c9cc'
					}
					
					return uni.$u.deepMerge(customeStyle, style)
				}
			},
			contentBodyStyle() {
				if (!this.animated) {
					return {}
				}

				const baseLeft = -100 * this.innerCurrent
				let style = {
					left: (baseLeft + (this.dragging ? this.dragOffsetPct : 0)) + '%',
					transitionDuration: (this.dragging ? 0 : this.duration) + 'ms',
					'-webkit-transition-duration': (this.dragging ? 0 : this.duration) + 'ms'
				}

				if(this.height) {
					style.height = uni.$u.addUnit(this.height)
				}

				// 根据方向确定是否对 left 应用过渡，以及切换不同的缓动（左/右）
				const isHorizontal = this.touch.direction === 'horizontal'
				const isRight = isHorizontal && this.touch.deltaX > 0
				const isLeft = isHorizontal && this.touch.deltaX < 0
				style.transitionProperty = isHorizontal || !this.touch.direction ? 'left' : 'none'
				style.transitionTimingFunction = this.dragging
					? 'linear'
					: (isLeft
						? 'cubic-bezier(0.4, 0, 0.2, 1)'
						: (isRight ? 'cubic-bezier(0.2, 0, 0, 1)' : 'cubic-bezier(0.4, 0, 0.2, 1)'))

				return style
			}
		},
		created() {
			this.children = []
		},
		async mounted() {
			this.init()
			//#ifndef MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-HARMONY
			uni.onWindowResize(this.windowResize)
			//#endif
		},
		beforeUnmount() {
			//#ifndef MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-HARMONY
			uni.offWindowResize(this.windowResize)
			//#endif
		},
		// #ifdef VUE3
		emits: ["click", "longPress", "change"],
		// #endif
		methods: {
			// 更新子组件
			updateChildren() {
				this.children.forEach((child, index) => {
					child.updateFromParent()
				})
			},
			setLineLeft() {
				const tabItem = this.computedList[this.innerCurrent];
				if (!tabItem || !tabItem.rect) {
					return;
				}
				// 获取滑块该移动的位置
				let lineOffsetLeft = this.computedList
					.slice(0, this.innerCurrent)
					.reduce((total, curr) => total + (curr.rect ? curr.rect.width : 0), 0);
                // 获取下划线的数值px表示法
				const lineWidth = uni.$u.getPx(this.lineWidth);
				this.lineOffsetLeft = lineOffsetLeft + (tabItem.rect.width - lineWidth) / 2
				// 如果是第一次执行此方法，让滑块在初始化时，瞬间滑动到第一个tab item的中间
				// 这里需要一个定时器，是直接通过style绑定过渡时间，需要等其过渡完成后，再设置为false(非第一次移动滑块)
				if (this.firstTime) {
					setTimeout(() => {
						this.firstTime = false
					}, 10);
				}
			},
			// 点击某一个标签
			clickHandler(item, index) {
				// 因为标签可能为disabled状态，所以click是一定会发出的，但是change事件是需要可用的状态才发出
				this.$emit('click', {
					...item,
					index
				})
				// 如果disabled状态，返回
				if (item.disabled) return
				this.innerCurrent = index
				this.resize()
				this.$emit('change', {
					...item,
					index
				})
				// 更新子组件状态
				this.updateChildren()
			},
			// 长按事件
			longPressHandler(item, index) {
				this.$emit('longPress', {
					...item,
					index
				})
			},
			init() {
				uni.$u.sleep().then(() => {
					this.resize()
				})
			},
			windowResize() {
                this.init()
            },
			setScrollLeft() {
				// 当前活动tab的布局信息，有tab菜单的width和left(为元素左边界到父元素左边界的距离)等信息
				if (this.innerCurrent < 0) {
                    this.innerCurrent = 0;
                }
				const tabRect = this.computedList[this.innerCurrent]
				// 如果tabRect不存在或者没有rect属性，则不处理
				if (!tabRect || !tabRect.rect) {
					return
				}
				// 累加得到当前item到左边的距离
				const offsetLeft = this.computedList
					.slice(0, this.innerCurrent)
					.reduce((total, curr) => {
						return total + (curr.rect ? curr.rect.width : 0)
					}, 0)

				// 此处为屏幕宽度
				const windowWidth = uni.$u.window().windowWidth
				// 将活动的tabs-item移动到屏幕正中间，实际上是对scroll-view的移动
				let scrollLeft = offsetLeft - (this.tabsRect.width - tabRect.rect.width) / 2 - (windowWidth - this.tabsRect
					.right) / 2 + this.tabsRect.left / 2
				// 这里做一个限制，限制scrollLeft的最大值为整个scroll-view宽度减去tabs组件的宽度
				scrollLeft = Math.min(scrollLeft, this.scrollViewWidth - this.tabsRect.width)
				this.scrollLeft = Math.max(0, scrollLeft)
			},
			// 获取所有标签的尺寸
			resize() {
				// 如果不存在list，则不处理
				if(this.computedList.length === 0) {
					return
				}
				Promise.all([this.getTabsRect(), this.getAllItemRect()]).then(([tabsRect, itemRect = []]) => {
					this.tabsRect = tabsRect
					this.scrollViewWidth = 0
					itemRect.map((item, index) => {
						// 计算scroll-view的宽度，这里
						this.scrollViewWidth += item.width
						// 另外计算每一个item的中心点X轴坐标
						this.computedList[index].rect = item
					})
					// 获取了tabs的尺寸之后，设置滑块的位置
					if(this.showLine) {
						this.setLineLeft()
					}
					this.setScrollLeft()
				})
			},
			// 获取导航菜单的尺寸
			getTabsRect() {
				return new Promise(resolve => {
					this.queryRect('u-tabs__wrapper__scroll-view').then(size => resolve(size))
				})
			},
			// 获取所有标签的尺寸
			getAllItemRect() {
				return new Promise(resolve => {
					const promiseAllArr = this.computedList.map((item, index) => this.queryRect(
						`u-tabs__wrapper__nav__item-${index}`, true))
					Promise.all(promiseAllArr).then(sizes => resolve(sizes))
				})
			},
			// 获取各个标签的尺寸
			queryRect(el, item) {
				return new Promise(resolve => {
					this.$uGetRect(`.${el}`).then(size => {
						resolve(size)
					})
				})
			},
			
			// 触摸开始事件
			onTouchStart(event) {
				if (!this.swipeable) return
				const touch = event.touches[0]
				this.touch.direction = ''
				this.touch.deltaX = 0
				this.touch.deltaY = 0
				this.touch.offsetX = 0
				this.touch.offsetY = 0
				this.touch.startX = touch.clientX
				this.touch.startY = touch.clientY
				this.dragging = true
				this.dragOffsetPct = 0
			},
			
			// 触摸移动事件
			onTouchMove(event) {
				if (!this.swipeable) return
				const touch = event.touches[0]
				this.touch.deltaX = touch.clientX - this.touch.startX
				this.touch.deltaY = touch.clientY - this.touch.startY
				this.touch.offsetX = Math.abs(this.touch.deltaX)
				this.touch.offsetY = Math.abs(this.touch.deltaY)
				this.touch.direction = this.touch.offsetX > this.touch.offsetY ? 'horizontal' : this.touch.offsetX < this.touch.offsetY ? 'vertical' : ''
				if (this.touch.direction === 'horizontal') {
					const containerWidth = this.tabsRect.width || uni.$u.window().windowWidth
					if (containerWidth) {
						this.dragOffsetPct = (this.touch.deltaX / containerWidth) * 100
					}
				}
			},
			
			// 触摸结束事件
			onTouchEnd() {
				if (!this.swipeable) return
				const minSwipeDistance = 50
				if (this.touch.direction === 'horizontal' && this.touch.offsetX >= minSwipeDistance) {
					const step = this.touch.deltaX > 0 ? -1 : 1
					const nextIndex = this.findAvailableByStep(this.innerCurrent, step)
					if (nextIndex !== -1) {
						this.switchToTab(nextIndex)
					}
				}
				this.dragging = false
				this.dragOffsetPct = 0
			},
			
			// 切换到指定标签
			switchToTab(index) {
				if (index < 0 || index >= this.computedList.length) return
				
				const targetItem = this.computedList[index]
				if (targetItem && !targetItem.disabled) {
					this.innerCurrent = index
					this.resize()
					this.$emit('change', {
						...targetItem,
						index
					})
					this.updateChildren()
				} else {
					this.findNextAvailableTab(index)
				}
			},
			
			// 根据方向步进查找下一个可用索引
			findAvailableByStep(startIndex, step) {
				const list = this.computedList
				if (!Array.isArray(list) || list.length === 0) return -1
				let i = startIndex + step
				while (i >= 0 && i < list.length) {
					if (list[i] && !list[i].disabled) return i
					i += step
				}
				return -1
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";

	.u-tabs {

		&__wrapper {
			@include flex(row);
			align-items: center;

			&__scroll-view-wrapper {
				flex: 1;
				overflow: auto hidden;
			}

			&__scroll-view {
				@include flex(row);
				flex: 1;
			}

			&__nav {
				@include flex(row);
				position: relative;

				&__item {
					padding: 0 11px;
					@include flex(row);
					align-items: center;
					justify-content: center;
					/* #ifdef H5 */
					cursor: pointer;
					/* #endif */

					&--disabled {
						/* #ifdef H5 */
						cursor: not-allowed;
						/* #endif */
					}

					&__text {
						font-size: 15px;
						color: $u-content-color;
						white-space: nowrap;
						&--disabled {
							color: #ccc;
						}
					}
				}

				&__line {
					height: 3px;
					background: $u-primary;
					width: 30px;
					position: absolute;
					bottom: 2px;
					border-radius: 100px;
					transition-property: transform;
					transition-duration: 300ms;
				}
			}
		}

		&__content {
			overflow: hidden;
			@include flex(row);
			
			&__body {
				position: relative;
				width: 100%;
				height: 100%;

				&--animated {
					@include flex(row);
					flex-shrink: 0;
					flex-grow: 0;
				}
			}
		}
	}
</style>
