<template>
	<view class="u-section">
		<view class="u-section__title" :style="uStyle" :class="uClasses">
			<slot name="left">
				<view class="u-section__title__icon-wrap" :style="[lineStyle]" v-if="showLine">
					<u-icon name="column-line" :size="fontSize * 1.25" bold :color="lineColor ? lineColor : color"></u-icon>
				</view>
			</slot>
			<text class="u-section__title__text">{{title}}</text>
		</view>
		<view class="u-section__right-info" v-if="right || $slots.right" :style="{
			color: subColor
		}" @tap="rightClick"> 
			<slot name="right">
				{{subTitle}}
				<view class="u-section__right-info__icon-arrow" v-if="arrow">
					<u-icon name="arrow-right" size="12" :color="subColor"></u-icon>
				</view>
			</slot>
		</view>
	</view>
</template>

<script>

    import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';

    /**
     * section 查看更多
     * @description 该组件一般用于分类信息有很多，但是限于篇幅只能列出一部分，让用户通过"查看更多"获得更多信息的场景，实际效果见演示。
     * @tutorial https://uveiw.bdxmz.cn/components/search.html
     * @property {String} title 左边主标题
     * @property {String} sub-title 右边副标题（默认更多）
     * @property {Boolean} right 是否显示右边的内容（默认true）
     * @property {Boolean} showLine 是否显示左边的竖条（默认true）
     * @property {Boolean} arrow 是否显示右边箭头（默认true）
     * @property {String Number} font-size 主标题的字体大小（默认28）
     * @property {Boolean} bold 主标题是否加粗（默认true）
     * @property {String} color 主标题颜色（默认#303133）
     * @event {Function} click 组件右侧的内容被点击时触发，用于跳转"更多"
     * @example <u-section title="今日热门" :right="false"></u-section>
     */
    export default {
        name: "u-section",
        mixins: [mpMixin, mixin, props],
        computed: {
			uClasses() {
				let classes = [];
				if(this.showLine){
					classes.push('u-section--line');
				}
				// 主题色，通过类配置
				if (this.color && uni.$u.config.type.includes(this.color)) classes.push('u-section__title--' + this.color)
				//#ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
				classes = classes.join(' ')
				//#endif
				return classes
			},
			uStyle() {
				let style = {
					fontWeight: this.bold ? 'bold' : 'normal',
					fontSize: uni.$u.addUnit(this.fontSize),
					paddingLeft: this.showLine ? uni.$u.addUnit(this.fontSize * 0.7) : 0
				};

				if (this.color && !uni.$u.config.type.includes(this.color)) style.color = this.color;
			
				return style;
			},
            // 左边竖条的样式
            lineStyle() {
                // 由于安卓和iOS的，需要稍微调整绝对定位的top值，才能让左边的竖线和右边的文字垂直居中
                return {
                    // 由于竖线为字体图标，具有比实际线宽更宽的宽度，所以也需要根据字体打下动态调整
                    left: uni.$u.addUnit(-(Number(this.fontSize) * 0.5)),
                    top: uni.$u.addUnit(-(Number(this.fontSize) * (uni.$u.os() == 'ios' ? 0.14 : 0.15))),
                }
            }
        },
		
        // #ifdef VUE3
		emits: [ 'click'],
		// #endif
        methods: {
            rightClick() {
                this.$emit('click');
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";
	
	.u-section {
		@include flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		
		&__title {
			position: relative;
			font-size: 14px;
			padding-left: 10px;
			@include flex;
			align-items: center;
			
			&__icon-wrap {
				position: absolute;
			}
			
			&__text {
				line-height: 1;
			}

			&--primary {
				color: $u-primary;
			}

			&--success {
				color: $u-success;
			}

			&--error {
				color: $u-error;
			}

			&--warning {
				color: $u-warning;
			}

			&--info {
				color: $u-info;
			}
		}
		
		&__right-info {
			color: $u-tips-color;
			font-size: 13px;
			@include flex;
			align-items: center;
			
			&__icon-arrow {
				margin-left: 3px;
			}
		}
	}
</style>
