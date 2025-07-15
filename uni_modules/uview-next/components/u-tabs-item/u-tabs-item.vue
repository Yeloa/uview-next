<template>
	<view v-if="isActive" class="u-tabs-item" :style="[$u.addStyle(customStyle)]">
		<slot />
	</view>
</template>

<script>
import props from './props.js';
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin';
/**
 * TabsItem  tabs标签组件的子组件
 * @description tabs标签组件的子组件，用于定义单个标签页的内容
 * @tutorial https://uveiw.bdxmz.cn/components/tabs.html
 * @property {String | Number}	name		标签的名称，作为与u-tabs的current参数匹配的标识符
 * @property {String}			label		标签显示的文本
 * @property {Boolean}			disabled	是否禁用此标签（默认 false ）
 * @property {String | Number}	badge		右上角的角标提示信息
 * @property {Boolean}			dot			是否显示圆点，将会覆盖badge参数（默认 false ）
 * @property {Object}			customStyle	定义需要用到的外部样式
 * @example <u-tabs-item name="tab1" label="标签1">内容1</u-tabs-item>
 */
export default {
	name: 'u-tabs-item',
	mixins: [mpMixin, mixin, props],
	data() {
		return {
			isActive: false, // 是否处于激活状态
			parentData: {
				innerCurrent: 0,
				current: null,
				label: ''
			}
		}
	},
	created() {
		this.init()
	},
	methods: {
		init() {
			// 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环引用
			this.updateParentData()
			if (!this.parent) {
				uni.$u.error('u-tabs-item必须搭配u-tabs组件使用')
			}
			// 本子组件在u-tabs的children数组中的索引
			const index = this.parent.children.indexOf(this)
			this.isActive = index === this.parentData.innerCurrent
		},
		updateParentData() {
			// 此方法在mixin中
			this.getParentData('u-tabs')
		},
		// 此方法将会被父组件u-tabs调用
		updateFromParent() {
			// 重新初始化
			this.init()
		}
	},
}
</script>

<style lang="scss" scoped>
@import "../../libs/css/components.scss";
.u-tabs-item {
	width: 100%;
	height: 100%;
}
</style>
