<template>
	<view class="u-page">
		<card title="基础使用">
			<u-section title="红豆生南国"></u-section>
		</card>
		<card title="隐藏右边">
			<u-section title="红豆生南国" :right="false"></u-section>
		</card>

		<card title="主题颜色">
			<u-section title="红豆生南国" color="primary"></u-section>
		</card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			titleChange(index) {
				if(index == 0) this.title = '春来发几枝';
				else  this.title = '红豆生南国';
			},
			rightChange(index) {
				this.right = index == 0 ? true : false;
			},
			boldChange(index) {
				this.bold = index == 0 ? true : false;
			},
			colorChange(index) {
				this.color = index == 0 ? this.$u.color['mainColor'] : this.$u.color['primary'];
			},
			showLineChange(index) {
				this.showLine = !index;
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
