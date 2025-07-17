<template>
	<view class="card">
		<view class="card-title">
			<text class="card-title__text">{{title}}</text>
		</view>
		<view class="card-content">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: String,
		},
		data() {
			
		},
		methods: {
			
		},
	}
</script>

<style lang="scss" scoped>
	.card{
		&-title{
			padding:5px 10px;
			font-size: 14px;
		}
		&-content{
			background-color: #fff;
			padding: 10px;
			margin-bottom: 10px;
		}
	}
</style>
