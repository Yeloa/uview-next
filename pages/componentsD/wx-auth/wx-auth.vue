<template>
	<view class="u-page">
		<u-button type="primary" @click="show = true">打开授权</u-button>
		<u-wx-auth ref="wxAuthRef" :show="show" :logo="logo" :title="title" @close="close" @chooseAvatar="chooseAvatar" @confirm="confirm"></u-wx-auth>
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
			chooseAvatar(url){
				//this.$refs.wxAuthRef.avatar = "";
			},
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
