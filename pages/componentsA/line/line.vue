<template>
	<view class="u-page">
		<card title="基本案例">
			<u-line></u-line>
		</card>
		<card title="自定义颜色">
			<u-line color="#2979ff"></u-line>
		</card>
		<card title="自定义长度">
			<u-line length="200"></u-line>
		</card>
		<card title="自定义方向">
			<u-line
			    length="30"
			    color="#2979ff"
			    direction="col"
			></u-line>
		</card>
		<card title="是否显示1px粗线条">
			<u-line :hairline="false"></u-line>
		</card>
		<card title="线条与上下左右元素的间距">
			<u-line margin="20"></u-line>
		</card>
		<card title="是否虚线">
			<u-line
			    color="#2979ff"
			    :dashed="true"
			></u-line>
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

		}
	}
</script>
