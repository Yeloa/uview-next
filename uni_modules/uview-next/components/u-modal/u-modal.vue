<template>
	<u-popup
		mode="center"
		:zoom="zoom"
		:show="show || innerShow"
        :round="tmpConfig.round"
		:zIndex="zIndex"
		:customStyle="{
			overflow: 'hidden',
			marginTop: `-${$u.addUnit(negativeTop)}`
		}"
		:closeOnClickOverlay="tmpConfig.closeOnClickOverlay"
		:safeAreaInsetBottom="false"
		:duration="tmpConfig.duration"
		@click="clickHandler"
	>
		<view
			class="u-modal"
			:style="[{
				width: $u.addUnit(tmpConfig.width),
			}]">
			<text class="u-modal__title" v-if="tmpConfig.title">{{ tmpConfig.title }}</text>
			<view class="u-modal__content" :style="[{paddingTop: $u.addUnit(tmpConfig.title ? 12 : 25)}]">
				<slot>
					<text class="u-modal__content__text">{{ tmpConfig.content }}</text>
				</slot>
			</view>
			<view class="u-modal__button--confirm-button" v-if="$slots.confirmButton">
				<slot name="confirmButton"></slot>
			</view>
			<template v-else>
				<u-line v-if="tmpConfig.buttonModel == 'text'"></u-line>
				<view
					class="u-modal__button"
					:class="[`u-modal__button__${tmpConfig.buttonModel}`]"
					:style="[{
						flexDirection: tmpConfig.buttonReverse ? 'row-reverse' : 'row'
					}]">
					<view v-if="tmpConfig.showCancelButton"
						class="u-modal__button--cancel"
						:class="[`u-modal__button__${tmpConfig.buttonModel}--cancel`]"
						:hover-class="`u-modal__button__${tmpConfig.buttonModel}--hover`"
						:hover-stay-time="150"
						:style="[cancelButtonStyle]"
						@tap="cancelHandler"
					>
						<text
							class="u-modal__button__text"
							:style="[{
								color: tmpConfig.cancelColor
							}]"
						>{{ tmpConfig.cancelText }}</text>
					</view>
					<u-line direction="column" v-if="tmpConfig.buttonModel == 'text' && tmpConfig.showConfirmButton && tmpConfig.showCancelButton"></u-line>
					<view v-if="tmpConfig.showConfirmButton"
						class="u-modal__button--confirm"
						:class="[`u-modal__button__${tmpConfig.buttonModel}--confirm`]"
						:hover-class="`u-modal__button__${tmpConfig.buttonModel}--hover`"
						:hover-stay-time="150"
						:style="[confirmButtonStyle]"
						@tap="confirmHandler"
					>
						<u-loading-icon v-if="loading"></u-loading-icon>
						<text
							v-else
							class="u-modal__button__text"
							:style="[{
								color: tmpConfig.buttonModel == 'text' ? tmpConfig.confirmColor : '#ffffff'
							}]"
						>{{ tmpConfig.confirmText }}</text>
					</view>
				</view>
			</template>
		</view>
	</u-popup>
</template>

<script>
	import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';
	import { setModalRef } from '../../libs/function/modal.js'

	/**
	 * Modal 模态框
	 * @description 弹出模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作。
	 * @tutorial https://uview.d3u.cn/components/modul.html
	 * @property {Boolean}			show				是否显示模态框，请赋值给show （默认 false ）
	 * @property {String}			title				标题内容
	 * @property {String}			content				模态框内容，如传入slot内容，则此参数无效
	 * @property {String}			confirmText			确认按钮的文字 （默认 '确认' ）
	 * @property {String}			cancelText			取消按钮的文字 （默认 '取消' ）
	 * @property {Boolean}			showConfirmButton	是否显示确认按钮 （默认 true ）
	 * @property {Boolean}			showCancelButton	是否显示取消按钮 （默认 false ）
	 * @property {String}			confirmColor		确认按钮的颜色 （默认 '#2979ff' ）
	 * @property {String}			cancelColor			取消按钮的颜色 （默认 '#606266' ）
	 * @property {Number}			duration			弹窗动画过度时间 （默认 400 ）
	 * @property {Boolean}			buttonReverse		对调确认和取消的位置 （默认 false ）
	 * @property {Boolean}			zoom				是否开启缩放模式 （默认 true ）
	 * @property {Number}			zIndex				层级 （默认 10075 ）
	 * @property {Boolean}			asyncClose			是否异步关闭，只对确定按钮有效，见上方说明 （默认 false ）
	 * @property {Boolean}			closeOnClickOverlay	是否允许点击遮罩关闭Modal （默认 false ）
	 * @property {String | Number}	negativeTop			往上偏移的值，给一个负的margin-top，往上偏移，避免和键盘重合的情况，单位任意，数值则默认为px单位 （默认 0 ）
	 * @property {String | Number}	width				modal宽度，不支持百分比，可以数值，px，rpx单位 （默认 '650rpx' ）
	 * @property {String}			round				设置圆角值
     * @property {Boolean}			buttonModel		    buttonModel	按钮模式 text 文字模式，button 按钮模式
	 * @property {Boolean}			buttonRound			按钮圆角
	 * @property {String}			confirmBgColor		确认按钮背景颜色，仅按钮模式有效
	 * @property {String}			cancelBgColor		取消按钮背景颜色，仅按钮模式有效
	 * @event {Function} confirm	点击确认按钮时触发
	 * @event {Function} cancel		点击取消按钮时触发
	 * @event {Function} close		点击遮罩关闭出发，closeOnClickOverlay为true有效
	 * @method {Function} show		显示Modal，可通过this.$refs.xxx.show(options)调用
	 * @method {Function} hide		隐藏Modal，可通过this.$refs.xxx.hide()调用
	 * @example <u-modal :show="true" title="title" content="content"></u-modal>
	 * @example <u-modal ref="uModal" @confirm="handleConfirm" @cancel="handleCancel"></u-modal>
	 */
	export default {
		name: 'u-modal',
		mixins: [mpMixin, mixin, props],
		data() {
			return {
				loading: false,
				innerShow: false, // 内部控制显示状态
				callback: null,
				config: {} // 临时配置，用于show方法传入的参数,
			}
		},
		computed: {
			tmpConfig() {
				return uni.$u.deepMerge({
					title: this.title,
					content: this.content,
					confirmText: this.confirmText,
					cancelText: this.cancelText,
					showConfirmButton: this.showConfirmButton,
					showCancelButton: this.showCancelButton,
					confirmColor: this.confirmColor,
					cancelColor: this.cancelColor,
					buttonReverse: this.buttonReverse,
					closeOnClickOverlay: this.closeOnClickOverlay,
					asyncClose: this.asyncClose,
					width: this.width,
					round: this.round,
					duration: this.duration,
					buttonModel: this.buttonModel,
					buttonRound: this.buttonRound,
					confirmBgColor: this.confirmBgColor,
					cancelBgColor: this.cancelBgColor
				}, this.config);
			},
			confirmButtonStyle(){
				const style = {}
				let radius = ''
				if(this.tmpConfig.buttonModel == 'button'){
					radius = uni.$u.addUnit(this.tmpConfig.buttonRound)
					style.borderTopLeftRadius = radius
					style.borderTopRightRadius = radius
					style.borderBottomLeftRadius = radius
					style.borderBottomRightRadius = radius
					style.backgroundColor = this.tmpConfig.confirmBgColor
				}

				radius = uni.$u.addUnit(this.tmpConfig.round)
				
				if(this.tmpConfig.buttonModel == 'text'){
					style.borderBottomRightRadius = radius

					if(!this.tmpConfig.showCancelButton && this.tmpConfig.showConfirmButton){
						style.borderBottomRightRadius = radius
						style.borderBottomLeftRadius = radius
					}

					if(this.tmpConfig.buttonReverse){
						style.borderBottomLeftRadius = radius
					}
				}

				return style
			},
			cancelButtonStyle() {
				const style = {}
				let radius = ''
				if(this.tmpConfig.buttonModel == 'button'){
					radius = uni.$u.addUnit(this.tmpConfig.buttonRound)
					style.borderTopLeftRadius = radius
					style.borderTopRightRadius = radius
					style.borderBottomLeftRadius = radius
					style.borderBottomRightRadius = radius
					style.backgroundColor = this.tmpConfig.cancelBgColor
				}
				
				radius = uni.$u.addUnit(this.tmpConfig.round)

				if(this.tmpConfig.buttonModel == 'text'){
					style.borderBottomLeftRadius = radius
					if(this.tmpConfig.showCancelButton && !this.tmpConfig.showConfirmButton) {
						style.borderBottomRightRadius = radius
						style.borderBottomLeftRadius = radius
					}

					if(this.tmpConfig.buttonReverse){
						style.borderBottomRightRadius = radius
					}
				}
				
				return style
			},
		},
		watch: {
			show(n) {
				// 为了避免第一次打开modal，又使用了异步关闭的loading
				// 第二次打开modal时，loading依然存在的情况
				if (n && this.loading) this.loading = false
			}
		},
		mounted() {
			// 注册全局Modal引用
			setModalRef(this)
		},
		// #ifdef VUE3
		emits: ["confirm", "cancel", "close"],
		// #endif
		methods: {
			// 显示Modal
			open(options = {}) {
				this.config = options;
				this.callback = (res) => {
					if(uni.$u.test.func(options.success)) {
						options.success(res);
					}
					this.close();
				};
				this.innerShow = true;
			},
			// 隐藏Modal
			close() {
				this.loading = false;
				this.innerShow = false;
			},
			// 点击确定按钮
			confirmHandler() {
				// 如果配置了异步关闭，将按钮值为loading状态
				if (this.tmpConfig.asyncClose) {
					this.loading = true;
				}

				if(this.callback) {
					this.callback({
						confirm: true,
						cancel: false,
					});
				}else{
					this.$emit('confirm')
				}
			},
			// 点击取消按钮
			cancelHandler() {
				if(this.callback) {
					this.callback({
						confirm: false,
						cancel: true,
					});
				}else{
					this.$emit('cancel')
				}
			},
			// 点击遮罩
			// 从原理上来说，modal的遮罩点击，并不是真的点击到了遮罩
			// 因为modal依赖于popup的中部弹窗类型，中部弹窗比较特殊，虽然有遮罩，但是为了让弹窗内容能flex居中
			// 多了一个透明的遮罩，此透明的遮罩会覆盖在灰色的遮罩上，所以实际上是点击不到灰色遮罩的，popup内部在
			// 透明遮罩的子元素做了.stop处理，所以点击内容区，也不会导致误触发
			clickHandler() {
				if (this.tmpConfig.closeOnClickOverlay) {
					if(this.callback) {
						this.callback({
							confirm: false,
							cancel: true,
						});
					}else{
						this.$emit('close')
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";
	$u-modal-border-radius: 6px;

	.u-modal {
		width: 650rpx;
		border-radius: $u-modal-border-radius;
		overflow: hidden;

		&__title {
			display: block;
			font-size: 16px;
			font-weight: bold;
			color: $u-content-color;
			text-align: center;
			padding-top: 25px;
		}

		&__content {
			padding: 12px 25px 25px 25px;
			@include flex;
			justify-content: center;

			&__text {
				font-size: 15px;
				color: $u-content-color;
			}
		}

		&__button {
			@include flex;

			&__text--cancel,
			&__text--confirm {
				flex: 1;
				@include flex;
				justify-content: center;
				align-items: center;
				height: 48px;
			}

			&__button--cancel,
			&__button--confirm {
				flex: 1;
				@include flex;
				justify-content: center;
				align-items: center;
				height: 36px;
				margin: 0 10px;
			}
			
			&__text {
				color: $u-content-color;
				font-size: 14px;
				text-align: center;
				&--hover {
					background-color: $u-bg-color;
				}
			}

			&__button {
				margin-bottom: 20px;
				padding: 0 10px;
				&--hover {
					opacity: 0.8;
				}
			}
		}
	}
</style>
