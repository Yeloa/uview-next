<template>
	<view
		class="u-card"
		@tap.stop="click"
		:class="{ 'u-border': border, 'u-card-full': full, 'u-card--border': round > 0 }"
		:style="{
			borderRadius: $u.addUnit(round),
			margin: margin,
			boxShadow: boxShadow
		}"
	>
		<view
			v-if="showHead"
			class="u-card__head"
			:style="[{padding: $u.addUnit(padding)}, headStyle]"
			:class="{
				'u-border-bottom': headBorderBottom
			}"
			@tap="headClick"
		>
			<slot name="head">
				<view class="u-card__head--left" v-if="title">
					<image
						:src="thumb"
						class="u-card__head--left__thumb"
						mode="aspectFill"
						v-if="thumb"
						:style="{ 
							height: $u.addUnit(thumbWidth), 
							width: $u.addUnit(thumbWidth), 
							borderRadius: thumbCircle ? '50px' : $u.addUnit(thumbRadius)
						}"
					></image>
					<text
						class="u-card__head--left__title"
						:style="{
							fontSize: $u.addUnit(titleSize),
							color: titleColor
						}"
					>
						{{ title }}
					</text>
				</view>
				<view class="u-card__head--right u-line-1" v-if="subTitle">
					<text
						class="u-card__head__title__text"
						:style="{
							fontSize: $u.addUnit(subTitleSize),
							color: subTitleColor
						}"
					>
						{{ subTitle }}
					</text>
				</view>
			</slot>
		</view>
		<view @tap="bodyClick" class="u-card__body" :style="[{padding: $u.addUnit(padding)}, bodyStyle]">
			<slot name="body" />
		</view>
		<view
			v-if="showFoot"
			class="u-card__foot"
			 @tap="footClick"
			:style="[{padding: $slots.foot ? $u.addUnit(padding) : 0}, footStyle]"
			:class="{
				'u-border-top': footBorderTop
			}"
		>
			<slot name="foot" />
		</view>
	</view>
</template>

<script>

import props from './props.js';
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin'

/**
 * card 卡片
 * @description 卡片组件一般用于多个列表条目，且风格统一的场景
 * @tutorial https://uveiw.bdxmz.cn/components/card.html
 * @property {Boolean} full 卡片与屏幕两侧是否留空隙（默认false）
 * @property {String} title 头部左边的标题
 * @property {String} titleColor 标题颜色（默认#303133）
 * @property {String | Number} titleSize 标题字体大小，单位rpx（默认30）
 * @property {String} subTitle 头部右边的副标题
 * @property {String} subTitleColor 副标题颜色（默认#909399）
 * @property {String | Number} subTitleSize 副标题字体大小（默认26）
 * @property {Boolean} border 是否显示边框（默认true）
 * @property {String | Number} index 用于标识点击了第几个卡片
 * @property {String} boxShadow 卡片外围阴影，字符串形式（默认none）
 * @property {String} margin 卡片与屏幕两边和上下元素的间距，需带单位，如"30rpx 20rpx"（默认30rpx）
 * @property {String | Number} round 卡片整体的圆角值，单位rpx（默认16）
 * @property {Object} headStyle 头部自定义样式，对象形式
 * @property {Object} bodyStyle 中部自定义样式，对象形式
 * @property {Object} footStyle 底部自定义样式，对象形式
 * @property {Boolean} headBorderBottom 是否显示头部的下边框（默认true）
 * @property {Boolean} footBorderTop 是否显示底部的上边框（默认true）
 * @property {Boolean} showHead 是否显示头部（默认true）
 * @property {Boolean} showFoot 是否显示尾部（默认true）
 * @property {String} thumb 缩略图路径，如设置将显示在标题的左边，不建议使用相对路径
 * @property {String | Number} thumbWidth 缩略图的宽度，高等于宽，单位rpx（默认60）
 * @property {Boolean} thumbCircle 缩略图是否为圆形（默认false）
 * @event {Function} click 整个卡片任意位置被点击时触发
 * @event {Function} headClick 卡片头部被点击时触发
 * @event {Function} bodyClick 卡片主体部分被点击时触发
 * @event {Function} footClick 卡片底部部分被点击时触发
 * @example <u-card padding="30" title="card"></u-card>
 */
export default {
	name: 'u-card',
	mixins: [mpMixin, mixin, props],
	data() {
		return {};
	},
	// #ifdef VUE3
    emits: ["click","headClick","bodyClick","footClick"],
    // #endif
	methods: {
		click() {
			this.$emit('click', this.index);
		},
		headClick() {
			this.$emit('headClick', this.index);
		},
		bodyClick() {
			this.$emit('bodyClick', this.index);
		},
		footClick() {
			this.$emit('footClick', this.index);
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/components.scss";
	
.u-card {
	position: relative;
	overflow: hidden;
	/* #ifndef APP-NVUE */
    box-sizing: border-box;
    /* #endif */
	background-color: #ffffff;
	
	&-full {
		// 如果是与屏幕之间不留空隙，应该设置左右边距为0
		margin-left: 0 !important;
		margin-right: 0 !important;
		width: 100%;
	}
	
	&--border:after {
		border-radius: 8px;
	}

	&__head {
		@include flex();
		justify-content: space-between;
		align-items: center;
		&--left {
			@include flex();
			align-items: center;
			color: $u-main-color;
			flex: 1;
			min-width: 0;
			&__thumb {
				margin-right: 8px;
				flex-shrink: 0;
			}
			
			&__title {
				/* #ifndef APP-NVUE */
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				flex: 1;
				min-width: 0;
    			/* #endif */
			}
		}

		&--right {
			color: $u-tips-color;
			margin-left: 3px;
		}
	}

	&__body {
		color: $u-content-color;
	}

	&__foot {
		color: $u-tips-color;
	}
}
</style>
