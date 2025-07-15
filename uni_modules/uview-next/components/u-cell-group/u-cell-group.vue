<template>
    <view :style="wrapperStyle" :class="[customClass]" class="u-cell-group">
        <view v-if="title" class="u-cell-group__title">
            <slot name="title">
				<text class="u-cell-group__title__text">{{ title }}</text>
			</slot>
        </view>
        <view class="u-cell-group__wrapper">
			<u-line v-if="border"></u-line>
            <slot />
        </view>
    </view>
</template>

<script>
	import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';
	/**
	 * cellGroup  单元格
	 * @description cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。
	 * @tutorial https://uviewui.com/components/cell.html
	 * 
	 * @property {String}	title		分组标题
	 * @property {Boolean}	border		是否显示外边框 (默认 true )
	 * @property {Object}	customStyle	定义需要用到的外部样式
	 * 
	 * @event {Function} click 	点击cell列表时触发
	 * @example <u-cell-group title="设置喜好">
	 */
	export default {
		name: 'u-cell-group',
		mixins: [mpMixin, mixin, props],
		computed: {
			parentData() {
				return [this.borderColor]
			},
			// 组件的样式
			wrapperStyle() {
				const style = {};

				style.backgroundColor = this.backgroundColor;
				style.borderRadius = uni.$u.addUnit(this.round)
				
				return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
			}
		},
		watch: {
			// 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
			parentData() {
				if (this.children.length) {
					this.children.map(child => {
						// 判断子组件(u-checkbox)如果有init方法的话，就就执行(执行的结果是子组件重新从父组件拉取了最新的值)
						typeof(child.init) === 'function' && child.init()
					})
				}
			},
		},
		created() {
			this.children = []
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";
	
	$u-cell-group-title-padding: 16px 16px 8px !default;
	$u-cell-group-title-font-size: 15px !default;
	$u-cell-group-title-line-height: 16px !default;
	$u-cell-group-title-color: $u-main-color !default;

    .u-cell-group {
		flex: 1;
		
        &__title {
            padding: $u-cell-group-title-padding;

            &__text {
                font-size: $u-cell-group-title-font-size;
                line-height: $u-cell-group-title-line-height;
                color: $u-cell-group-title-color;
            }
        }
		
		&__wrapper {
			position: relative;
		}
    }
</style>

