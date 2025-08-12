<template>
	<view class="u-page">
		<u-button type="primary" @click="show = true">打开授权</u-button>
		<u-wx-auth :show="show" :logo="logo" :title="title" @close="close" @confirm="confirm"></u-wx-auth>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				logo: 'https://uview.d3u.cn/common/logo.png',
				title: 'uView Next',
				index: 0,
			}
		},
		methods: {
			close(data) {
				this.show = false;
			},
			confirm(data) {
				this.show = false;
				console.log(data);
			}
		},
	}
</script>

<style lang="scss">
</style>
