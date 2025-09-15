<template>
	<view>
		<view class="m-box shadow newsList">

			<u-tabs :swipeable="true" :animated="true" :height="200">
				<u-tabs-item label="标签1">
					<view class="tab-content">
						<text>这是标签1的内容</text>
					</view>
				</u-tabs-item>
				<u-tabs-item label="标签2">
					<view class="tab-content">
						<text>这是标签2的内容</text>
					</view>
				</u-tabs-item>
				<u-tabs-item label="标签3">
					<view class="tab-content">
						<text>这是标签3的内容</text>
					</view>
				</u-tabs-item>
			</u-tabs>

		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style>


</style>