<template>
	<view class="u-swipe-action-item" ref="u-swipe-action-item">
		<view class="u-swipe-action-item__right">
			<slot name="button">
				<view v-for="(item,index) in options" :key="index" class="u-swipe-action-item__right__button"
					:ref="`u-swipe-action-item__right__button-${index}`" :style="[{
						alignItems: item.style && item.style.round ? 'center' : 'stretch'
					}]" @tap="buttonClickHandler(item, index)">
					<view class="u-swipe-action-item__right__button__wrapper" :style="[{
							backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : '#C7C6CD',
							borderRadius: item.style && item.style.round ? item.style.round : '0',
							padding: item.style && item.style.round ? '0' : '0 15px',
						}, item.style]">
						<u-icon v-if="item.icon" :name="item.icon"
							:color="item.style && item.style.color ? item.style.color : '#ffffff'"
							:size="item.iconSize ? $u.addUnit(item.iconSize) : item.style && item.style.fontSize ? $u.getPx(item.style.fontSize) * 1.2 : 17"
							:customStyle="{
								marginRight: item.text ? '2px' : 0
							}"></u-icon>
						<text v-if="item.text" class="u-swipe-action-item__right__button__wrapper__text u-line-1"
							:style="[{
								color: item.style && item.style.color ? item.style.color : '#ffffff',
								fontSize: item.style && item.style.fontSize ? item.style.fontSize : '16px',
								lineHeight: item.style && item.style.fontSize ? item.style.fontSize : '16px',
							}]">{{ item.text }}</text>
					</view>
				</view>
			</slot>
		</view>
		
		<!-- #ifdef APP-VUE || MP-WEIXIN || MP-ALIPAY || H5 || MP-QQ -->
		<view class="u-swipe-action-item__content" @touchstart="wxs.touchstart" @touchmove="wxs.touchmove"
			@touchend="wxs.touchend" :status="status" :change:status="wxs.statusChange" :size="size"
			:change:size="wxs.sizeChange">
			<slot />
		</view>
		<!-- #endif -->
		
		<!-- #ifdef MP-BAIDU || MP-TOUTIAO || MP-LARK -->
		<view class="u-swipe-action-item__content" @touchstart="touchStartHandler" @touchmove="touchMoveHandler"
			@touchend="touchEndHandler">
			<slot />
		</view>
		<!-- #endif -->

		<!-- #ifdef APP-NVUE -->
		<view class="u-swipe-action-item__content" ref="u-swipe-action-item__content" @panstart="onTouchstart"
			@tap="clickHandler">
			<slot></slot>
		</view>
		<!-- #endif -->
	</view>
</template>
<!-- #ifdef APP-VUE || MP-WEIXIN || H5 || MP-QQ -->
<script src="./index.wxs" module="wxs" lang="wxs"></script>
<!-- #endif -->
<!-- #ifdef MP-ALIPAY -->
<script src="./index.sjs" module="wxs" lang="sjs"></script>
<!-- #endif -->
<script>

	import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';
	// #ifdef APP-NVUE
	import nvue from './nvue.js';
	// #endif
	
	/**
	 * SwipeActionItem 滑动单元格子组件
	 * @description 该组件一般用于左滑唤出操作菜单的场景，用的最多的是左滑删除操作
	 * @tutorial https://uveiw.bdxmz.cn/components/swipeAction.html
	 * @property {Boolean}			show			控制打开或者关闭（默认 false ）
	 * @property {String | Number}	index			标识符，如果是v-for，可用index索引
	 * @property {Boolean}			disabled		是否禁用（默认 false ）
	 * @property {Boolean}			autoClose		是否自动关闭其他swipe按钮组（默认 true ）
	 * @property {Number}			threshold		滑动距离阈值，只有大于此值，才被认为是要打开菜单（默认 30 ）
	 * @property {Array}			options			右侧按钮内容
	 * @property {String | Number}	duration		动画过渡时间，单位ms（默认 350 ）
	 * @event {Function(index)}	open	组件打开时触发
	 * @event {Function(index)}	close	组件关闭时触发
	 * @example	<u-swipe-action><u-swipe-action-item :options="options1" ></u-swipe-action-item></u-swipe-action>
	 */
	export default {
		name: 'u-swipe-action-item',
		mixins: [
			mpMixin, 
			mixin, 
			props, 
			// #ifdef APP-NVUE
			nvue,
			// #endif
		],
		data() {
			return {
				// 按钮的尺寸信息
				size: {},
				// 父组件u-swipe-action的参数
				parentData: {
					autoClose: true,
				},
				// 当前状态，open-打开，close-关闭
				status: 'close',
				// #ifdef MP-BAIDU || MP-TOUTIAO || MP-LARK
				// 其他小程序平台的状态管理
				startX: 0,
				startY: 0,
				moving: false,
				currentX: 0,
				buttonsWidth: 0,
				// #endif
			}
		},
		watch: {
			// 由于wxs/sjs无法直接读取外部的值，需要在外部值变化时，重新执行赋值逻辑
			wxsInit(newValue, oldValue) {
				this.$nextTick(() => {
					this.queryRect()
				})
			}
		},
		computed: {
			wxsInit() {
				return [this.disabled, this.autoClose, this.threshold, this.options, this.duration]
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
				// 初始化父组件数据
				this.updateParentData()
				// #ifndef APP-NVUE
				uni.$u.sleep().then(() => {
					this.queryRect()
				})
				// #endif
			},
			updateParentData() {
				// 此方法在mixin中
				this.getParentData('u-swipe-action')
			},
			// #ifndef APP-NVUE
			// 查询节点
			queryRect() {
				// #ifdef MP-ALIPAY
				// 支付宝小程序使用特殊的查询方式
				uni.createSelectorQuery().in(this).selectAll('.u-swipe-action-item__right__button').boundingClientRect().exec((res) => {
					const buttons = res[0] || [];
					this.size = {
						buttons,
						show: this.show,
						disabled: this.disabled,
						threshold: this.threshold,
						duration: this.duration
					}
				})
				// #endif
				// #ifndef MP-ALIPAY
				this.$uGetRect('.u-swipe-action-item__right__button', true).then(buttons => {
					this.size = {
						buttons,
						show: this.show,
						disabled: this.disabled,
						threshold: this.threshold,
						duration: this.duration
					}
				})
				// #endif
			},
			// #endif

			// #ifdef APP-VUE || MP-WEIXIN || MP-ALIPAY || H5 || MP-QQ
			closeHandler() {
				this.status = 'close'
			},
			setState(status) {
				this.status = status
			},
			closeOther() {
				// 尝试关闭其他打开的单元格
				this.parent && this.parent.closeOther(this)
			},
			// #endif

			// #ifdef MP-BAIDU || MP-TOUTIAO || MP-LARK
			// 其他小程序平台的原生JavaScript实现
			touchStartHandler(e) {
				if (this.disabled) return;
				const touch = e.touches[0];
				this.startX = touch.pageX;
				this.startY = touch.pageY;
				this.moving = true;
				this.closeOther();
			},
			
			touchMoveHandler(e) {
				if (!this.moving || this.disabled) return;
				const touch = e.touches[0];
				const moveX = touch.pageX - this.startX;
				const moveY = touch.pageY - this.startY;
				
				// 判断是否为水平滑动
				if (Math.abs(moveX) < Math.abs(moveY)) return;
				
				// 阻止默认滚动
				e.preventDefault && e.preventDefault();
				
				this.currentX = moveX;
				this.updateTransform(moveX);
			},
			
			touchEndHandler(e) {
				if (!this.moving || this.disabled) return;
				this.moving = false;
				
				const moveX = this.currentX;
				if (Math.abs(moveX) < this.threshold) {
					this.close();
				} else {
					if (moveX < 0) {
						this.open();
					} else {
						this.close();
					}
				}
			},
			
			updateTransform(translateX) {
				// 限制滑动范围
				if (translateX > 0) translateX = 0;
				if (Math.abs(translateX) > this.buttonsWidth) translateX = -this.buttonsWidth;
				
				// 更新样式
				const content = this.$refs['u-swipe-action-item'];
				if (content) {
					content.style.transform = `translateX(${translateX}px)`;
				}
			},
			
			open() {
				this.status = 'open';
				this.updateTransform(-this.buttonsWidth);
				this.$emit('open', this.index);
			},
			
			close() {
				this.status = 'close';
				this.updateTransform(0);
				this.$emit('close', this.index);
			},
			// #endif
			
			// 按钮被点击
			buttonClickHandler(item, index) {
				this.$emit('click', {
					index,
					name: this.name
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";

	.u-swipe-action-item {
		position: relative;
		overflow: hidden;
		/* #ifndef APP-NVUE || MP-WEIXIN */
		touch-action: pan-y;
		/* #endif */

		&__content {
			transform: translateX(0px);
			background-color: #FFFFFF;
			z-index: 10;
		}

		&__right {
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			@include flex;

			&__button {
				@include flex;
				justify-content: center;
				overflow: hidden;
				align-items: center;

				&__wrapper {
					@include flex;
					align-items: center;
					justify-content: center;
					padding: 0 15px;

					&__text {
						@include flex;
						align-items: center;
						color: #FFFFFF;
						font-size: 15px;
						text-align: center;
						justify-content: center;
					}
				}
			}
		}
	}
</style>
