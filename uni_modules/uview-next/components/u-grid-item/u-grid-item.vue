<template>
	<view
	    class="u-grid-item"
	    hover-class="u-grid-item--hover-class"
	    :hover-stay-time="200"
	    @tap="clickHandler"
	    :class="classes"
	    :style="[itemStyle]"
	>
		<slot />
	</view>
</template>

<script>
	import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';
	/**
	 * gridItem 提示
	 * @description 宫格组件一般用于同时展示多个同类项目的场景，可以给宫格的项目设置徽标组件(badge)，或者图标等，也可以扩展为左右滑动的轮播形式。搭配u-grid使用
	 * @tutorial https://uview.d3u.cn/components/grid.html
	 * @property {String | Number}	name		宫格的name ( 默认 null )
	 * @property {String}			bgColor		宫格的背景颜色 （默认 'transparent' ）
	 * @property {Object}			customStyle	自定义样式，对象形式
	 * @event {Function} click 点击宫格触发
	 * @example <u-grid-item></u-grid-item>
	 */
	export default {
		name: "u-grid-item",
		mixins: [mpMixin, mixin, props],
		data() {
			return {
				parentData: {
					gutter: 0,
					col: 3, // 父组件划分的宫格数
					border: true, // 是否显示边框，根据父组件决定
				},
				classes: [], // 类名集合，用于判断是否显示右边和下边框
			};
		},
		mounted() {
			this.init()
		},
		computed: {
			width() {
				return 100 / Number(this.parentData.col) + '%'
			},
			itemStyle() {
				const style = {
					width: this.width,
					padding: uni.$u.addUnit(uni.$u.getPx(this.parentData.gutter)/2),
				}
				if(this.bgColor){
					style.backgroundColor = this.bgColor;
				}
				
				return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle))
			}
		},
		// #ifdef VUE3
		emits: ["click"],
		// #endif
		methods: {
			init() {
				// 用于在父组件u-grid的children中被添加入子组件时，
				// 重新计算item的边框
				uni.$on('$uGridItem', () => {
					this.gridItemClasses()
				})
				// 父组件的实例
				this.updateParentData()
				// 发出事件，通知所有的grid-item都重新计算自己的边框
				uni.$emit('$uGridItem')
				this.gridItemClasses()
			},
			// 获取父组件的参数
			updateParentData() {
				// 此方法写在mixin中
				this.getParentData('u-grid');
			},
			clickHandler() {
				let name = this.name
				// 如果没有设置name属性，历遍父组件的children数组，判断当前的元素是否和本实例this相等，找出当前组件的索引
				const children = this.parent.children
				if(children && this.name === null) {
					name = children.findIndex(child => child === this)
				}
				// 调用父组件方法，发出事件
				this.parent && this.parent.childClick(name)
				this.$emit('click', name)
			},
			gridItemClasses() {
				if(this.parentData.border) {
					let classes = []
					this.parent.children.map((child, index) =>{
						if(this === child) {
							const len = this.parent.children.length
							// 贴近右边屏幕边沿的child，并且最后一个（比如只有横向2个的时候），无需右边框
							if((index + 1) % this.parentData.col !== 0 && index + 1 !== len) {
								classes.push('u-border-right')
							}
							// 总的宫格数量对列数取余的值
							// 如果取余后，值为0，则意味着要将最后一排的宫格，都不需要下边框
							const lessNum = len % this.parentData.col === 0 ? this.parentData.col : len % this.parentData.col
							// 最下面的一排child，无需下边框
							if(index < len - lessNum) {
								classes.push('u-border-bottom')
							}
						}
					})
					// 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
					// #ifdef MP-ALIPAY || MP-TOUTIAO
					classes = classes.join(' ')
					// #endif
					this.classes = classes
				}
			}
		},
		// #ifdef VUE2
		beforeDestroy() {
			// 移除事件监听，释放性能
			uni.$off('$uGridItem')
		}
		// #endif
		// #ifdef VUE3
		beforeUnmount() {
			// 移除事件监听，释放性能
			uni.$off('$uGridItem')
		}
		// #endif
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";
      $u-grid-item-hover-class-opcatiy:.5 !default;
      $u-grid-item-margin-top:1rpx !default;
      $u-grid-item-border-right-width:0.5px !default;
      $u-grid-item-border-bottom-width:0.5px !default;
      $u-grid-item-border-right-color:$u-border-color !default;
      $u-grid-item-border-bottom-color:$u-border-color !default;
	.u-grid-item {
		align-items: center;
		justify-content: center;
		position: relative;
		flex-direction: column;
		box-sizing: border-box;
		display: flex;

		/* #ifdef MP */
		position: relative;
		float: left;
		/* #endif */

		/* #ifdef MP-WEIXIN */
		margin-top:$u-grid-item-margin-top;
		/* #endif */

		&--hover-class {
			opacity:$u-grid-item-hover-class-opcatiy;
		}
	}
</style>
