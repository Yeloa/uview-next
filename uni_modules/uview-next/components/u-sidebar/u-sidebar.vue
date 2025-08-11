<template>
	<view class="u-sidebar" :style="[sidebarStyle]">
		<slot></slot>
	</view>
</template>

<script>
import props from './props.js';
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin';

/**
 * Sidebar 侧边栏
 * @description 垂直展示的导航栏，用于在不同的内容区域之间进行切换
 * @tutorial https://uview.d3u.cn/components/sidebar.html
 * 
 * @property {Number | String} value 当前导航项的索引
 * @property {Number | String} modelValue Vue3模式下当前导航项的索引
 * @property {String} width 宽度
 * @property {String} fontSize 字体大小
 * @property {String} lineHeight 行高
 * @property {String} textColor 文本颜色
 * @property {String} disabledColor 禁用文本颜色
 * @property {String} disabledBgColor 禁用背景颜色
 * @property {String} bgColor 背景色
 * @property {String} activeColor 激活时文本颜色
 * @property {String} activeBgColor 激活时背景颜色
 * @property {Boolean} activeBold 激活时是否加粗
 * @property {String | Object} activeStyle 激活时的样式
 * @property {String | Object} inactiveStyle 非激活时的样式
 * @property {String | Number} lineWidth 滑块长度
 * @property {String | Number} lineHeight 滑块高度
 * @property {String} lineColor 滑块颜色
 * @property {String} lineBgSize 滑块背景显示大小，当滑块背景设置为图片时使用
 * @property {Boolean} showLine 是否显示滑块
 * 
 * @event {Function(Object)} change 切换导航项时触发，返回包含index、label、value的对象
 * @example
 * <u-sidebar v-model="current" :width="'200px'" :fontSize="'16px'">
 *   <u-sidebar-item label="标签名称" badge="5" />
 * </u-sidebar>
 */
export default {
	name: 'u-sidebar',
	mixins: [mpMixin, mixin, props],
	data() {
		return {
			innerCurrent: 0
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(newValue) {
				if (newValue !== this.innerCurrent) {
					this.innerCurrent = parseInt(newValue) || 0
					this.updateChildData()
				}
			}
		},
		// #ifdef VUE3
		modelValue: {
			immediate: true,
			handler(newValue) {
				if (newValue !== this.innerCurrent) {
					this.innerCurrent = parseInt(newValue) || 0
					this.updateChildData()
				}
			}
		}
		// #endif
	},
	computed: {
		sidebarStyle() {
			const style = {}
			if (this.width) style.width = this.$u.addUnit(this.width)
			if (this.fontSize) style.fontSize = this.$u.addUnit(this.fontSize)
			if (this.lineHeight) style.lineHeight = this.$u.addUnit(this.lineHeight)
			if (this.bgColor) style.backgroundColor = this.bgColor
			return style
		},
		// 监听参数的变化，通过watch中，手动去更新子组件的数据，否则子组件不会自动变化
		parentData() {
			return [
				this.innerCurrent,	 
				this.width, 
				this.fontSize, 
				this.lineHeight, 
				this.textColor, 
				this.disabledColor, 
				this.disabledBgColor,
				this.bgColor,
				this.activeColor, 	
				this.activeBgColor,
				this.activeBold,
				this.activeStyle,
				this.inactiveStyle,
				this.lineWidth,
				this.lineHeight,
				this.lineColor,
				this.lineBgSize,
				this.showLine
			]
		}
	},
	created() {
		this.children = []
	},
	// #ifdef VUE3
	emits: ["update:modelValue", "change"],
	// #endif
	methods: {
		init() {
			// 当某个子组件内容变化时，触发父组件的init，父组件再让每一个子组件重新初始化一遍
			// 以保证数据的正确性
			this.children.map(child => {
				child.init();
			})
		},
		// 更新子组件的数据
		updateChildData() {
			this.children.map(child => {
				uni.$u.test.func((child || {}).updateFromParent) && child.updateFromParent()
			})
		},
		// 处理子组件点击
		handleItemClick(index) {
			const child = this.children[index]
			if (child && !child.disabled) {
				this.innerCurrent = index
				// #ifdef VUE2
				this.$emit('input', index)
				// #endif

				// #ifdef VUE3
				this.$emit('update:modelValue', index)
				// #endif

				this.$emit('change', {
					index: index,
					label: child.label,
					value: child.value
				})
				
				this.updateChildData()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.u-sidebar {
	
}
</style>
