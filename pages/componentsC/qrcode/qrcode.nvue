<template>
	<view class="u-page">
		<card title="基础使用" bg-color="none">
			<view class="qrcode">
				<u-qrcode value="http://uview.d3u.cn/"></u-qrcode>
			</view>
		</card>

		<card title="增加logo" bg-color="none">
			<view class="qrcode">
				<u-qrcode value="http://uview.d3u.cn/" icon="https://uview.d3u.cn/common/logo.png"></u-qrcode>
			</view>
		</card>

		<card title="加载中状态" bg-color="none">
			<view class="qrcode">
				<u-qrcode value="http://uview.d3u.cn/" status="loading"></u-qrcode>
			</view>
		</card>

		<card title="过期状态" bg-color="none">
			<view class="qrcode">
				<u-qrcode value="http://uview.d3u.cn/" :status="status"></u-qrcode>
			</view>
		</card>

		<card title="已扫描" bg-color="none">
			<view class="qrcode">
				<u-qrcode value="http://uview.d3u.cn/" status="scanned"></u-qrcode>
			</view>
		</card>
		
		<card title="改变颜色和样式" bg-color="none">
			<view class="qrcode">
				<u-qrcode value="http://uview.d3u.cn/" foreground="#3eaf7c" pdground="#3eaf7c"></u-qrcode>
			</view>
		</card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				status: '',
			}
		},
		onLoad() {
			setTimeout(() => {
				this.status ='expired';
			}, 2000);
		},
		methods: {
				
		},
	}
</script>
<style lang="scss">
	.qrcode {
		background-color: #fff;
		border-radius: 8px;
		padding: 10px;
		width: 160px;
	}
</style>