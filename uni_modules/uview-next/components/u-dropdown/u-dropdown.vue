<template>
	<view class="u-dropdown" :style="[{
		height: $u.addUnit(height),
		backgroundColor: bgColor,
		borderRadius: $u.addUnit(round)
	}]">
		<slot></slot>
	</view>
</template>

<script>
import props from './props.js';
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin';

/**
 * dropdown 下拉菜单
 * @description 该组件一般用于向下展开菜单，同时可切换多个选项卡的场景
 * @tutorial http://uviewui.com/components/dropdown.html
 * @property {String} activeColor 标题和选项卡选中的颜色（默认#2979ff）
 * @property {String} inactiveColor 未激活时的颜色
 * @property {String} disabledColor 禁用时的颜色
 * @property {String} bgColor 菜单的背景颜色
 * @property {Number|String} round 菜单的圆角值
 * @property {Boolean} closeOnClickMask 点击遮罩是否关闭菜单
 * @property {Boolean} closeOnClickSelf 点击当前激活项标题是否关闭菜单
 * @property {Number|String} duration 过渡时间
 * @property {Number|String} height 标题菜单的高度
 * @property {Boolean} borderBottom 是否显示下边框
 * @property {Boolean} overlay 是否显示遮罩
 * @property {Number|String} titleSize 标题的字体大小
 * @property {Number|String} borderRadius 下拉出来的内容部分的圆角值
 * @property {String} menuIcon 菜单右侧的icon图标
 * @property {Number|String} menuIconSize 菜单右侧图标的大小
 * @example <u-dropdown></u-dropdown>
 */
export default {
	name: 'u-dropdown',
	mixins: [mixin, mpMixin, props],
	data() {
		return {
			contentHeight: 0
		}
	},
	computed: {
		parentData() {
			return [
				this.overlay,
				this.height,
				this.contentHeight,
				this.inactiveColor,
				this.activeColor,
				this.disabledColor,
				this.duration,
				this.closeOnClickMask,
				this.closeOnClickSelf,
				this.titleSize,
				this.borderRadius,
				this.menuIcon,
				this.menuIconSize
			]
		},
	},
	created() {
		this.children = []
	},
	watch: {
		// 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
		parentData() {
			if (this.children.length) {
				this.children.map(child => {
					typeof(child.updateParentData) === 'function' && child.updateParentData()
				})
			}
		},
	},
	// #ifdef VUE3
	emits: ["open","close"],
	// #endif
	methods: {
		//对外方法
		close(index) {
			this.children.map((child, idx) => {
				if(index != undefined){
					if(index == idx){
						child.close(index);
					}
				}else{
					child.close(idx);
				}
			})
		},
		open(index) {
			const { windowHeight, windowTop, statusBarHeight } = uni.$u.window();
			this.$uGetRect('.u-dropdown').then(res => {
				this.contentHeight = parseInt(windowHeight - statusBarHeight - windowTop - res.top);
			});

			// #ifdef MP-WEIXIN
			this.retryComputedComponentRect(this.$children);
			// #endif
			if(index != undefined){
				const child = this.children.find((child,idx) => index === idx);
				child.open();
			}
		},
		openItem(target) {
			this.open()
			const index = this.children.findIndex(child => child == target);
			this.$emit('open', index);
		},
		closeItem(index) {
			this.$emit('close', index);
		},
		// 关闭其他菜单项
		closeOtherItems(target) {
			this.children.map((child, index) => {
				if(child != target) {
					child.close(index);
				}
			})
		},
		// #ifdef MP-WEIXIN
		retryComputedComponentRect(children) {
			// 组件内部需要计算节点的组件
			const names = ['u-calendar-month', 'u-album', 'u-collapse-item','u-line-progress', 'u-list-item', 'u-rate', 'u-read-more', 'u-row', 'u-row-notice', 'u-scroll-list',
				'u-skeleton', 'u-slider', 'u-steps-item', 'u-sticky', 'u-subsection', 'u-swipe-action-item', 'u-tabbar',
				'u-tabs', 'u-tooltip']

			// 历遍所有的子组件节点
			for (let i = 0; i < children.length; i++) {
				const child = children[i]
				// 拿到子组件的子组件
				const grandChild = child.$children
				// 判断如果在需要重新初始化的组件数组中名中，并且存在init方法的话，则执行
				if (names.includes(child.$options.name) && child.init && typeof child.init === 'function') {
					// 需要进行一定的延时，因为初始化页面需要时间
					uni.$u.sleep(50).then(() => {
						child.init()
					})
				}
				// 如果子组件还有孙组件，进行递归历遍
				if (grandChild.length) {
					this.retryComputedComponentRect(grandChild)
				}
			}
		}
		// #endif
	}
}
</script>

<style scoped lang="scss">
	@import '../../libs/css/components.scss';
	.u-dropdown {
		flex: 1;
		width: 100%;
		position: relative;
		@include flex(row);
		align-items: center;
		flex-shrink: 0;
	}
</style>
