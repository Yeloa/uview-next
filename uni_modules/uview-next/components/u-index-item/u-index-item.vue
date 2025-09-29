<template>
	<view
		class="u-index-item"
		:id="`u-index-item-${id}`"
		:class="[`u-index-item-${id}`]"
	>
		<slot />
	</view>
</template>

<script>
	import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';
	
	/**
	 * IndexItem 
	 * @description 
	 * @tutorial https://uviewui.com/components/indexList.html
	 * @property {String}
	 * @event {Function}
	 * @example
	 */
	export default {
		name: 'u-index-item',
		mixins: [mpMixin, mixin, props],
		data() {
			return {
				// 本组件到滚动条顶部的距离
				top: 0,
				height: 0,
				id: ''
			}
		},
		created() {
			// 子组件u-index-anchor的实例
			this.anchor = {}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				// 此处会活动父组件实例，并赋值给实例的parent属性
				this.getParentData('u-index-list')
				if (!this.parent) {
					return uni.$u.error('u-index-item必须要搭配u-index-list组件使用')
				}
				uni.$u.sleep().then(() =>{
					this.getIndexItemRect().then(size => {
						// 由于对象的引用特性，此处会同时生效到父组件的children数组的本实例的top属性中，供父组件判断读取
						this.top = Math.ceil(size.top)
						this.height = Math.ceil(size.height)
					})
				})
			},
			getIndexItemRect() {
				return new Promise(resolve => {
					this.$uGetRect('.u-index-item').then(size => {
						resolve(size)
					})
				}) 
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";
	
</style>
