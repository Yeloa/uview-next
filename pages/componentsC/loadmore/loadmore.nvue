<template>
	<view class="u-page">
		<card title="基础使用">
			<u-loadmore
				status="loading"
				:isDot="true"
				:iconSize="17"
			></u-loadmore>
		</card>
		
		<card title="无更多数据">
			<u-loadmore
				:line="true"
				status="nomore"
			></u-loadmore>
		</card>
		
		<card title="加载更多(点击触发事件)">
			<u-loadmore
				:line="true"
				status="loadmore"
				@loadmore="loadmore"
			></u-loadmore>
		</card>
		
		<card title="自定义图标">
			<u-loadmore
				status="loading"
				loadingIcon="circle"
			></u-loadmore>
		</card>
		
		<card title="显示点">
			<u-loadmore
				status="nomore"
				:isDot="true"
				:line="true"
				color="#909399"
			></u-loadmore>
		</card>
		
		<card title="自定义提示语">
			<u-loadmore
				status="loading"
				loadingText="努力加载中,先喝杯茶"
				color="#909399"
			></u-loadmore>
		</card>
		
		<card title="自定义线条颜色">
			<u-loadmore
				loadmoreText="看,我和别人不一样"
				color="#1CD29B"
				lineColor="#1CD29B"
				dashed
				:line="true"
			></u-loadmore>
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
			loadmore() {
				console.log('loadmore');
				uni.$u.toast('加载更多')
			}
		},
	}
</script>