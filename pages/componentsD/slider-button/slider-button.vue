<template>
	<view class="u-page">
		<card title="基础用法">
			<view class="u-demo-area">
				<u-slider-button 
					:text="'滑动解锁'"
					@success="onSliderSuccess"
					@reset="onSliderReset"
				/>
			</view>
		</card>
		
		<card title="自定义样式">
			<view class="u-demo-area">
				<u-slider-button
					:text="sliderData.text"
					:successText="sliderData.successText"
					:bgColor="sliderData.bgColor"
					:railColor="sliderData.railColor"
					:height="45"
					textColor="#ffffff"
					:textBold="true"
					railIndex="10"
					threshold="150"
					autoReset
					@reset="onCustomSuccess"
				/>
			</view>
		</card>
		
		<card title="禁用状态">
			<view class="u-demo-area">
				<u-slider-button 
					:text="'已禁用'"
					:width="300"
					:height="50"
					:disabled="true"
				/>
			</view>
		</card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sliderRef: null,
				sliderData: {
					text: '开始出发',
					successText: '开始出发',
					bgColor: 'rgb(230, 27, 47)',
					railColor: 'rgba(230, 27, 47, 0.85)'
				}
			}
		},
		methods: {
			// 基础用法 - 滑动成功
			onSliderSuccess() {
				uni.showToast({
					title: '滑动验证成功！',
					icon: 'success'
				});
			},
			
			// 基础用法 - 重置
			onSliderReset() {
				console.log('滑动按钮已重置');
			},
			
			// 自定义样式 - 滑动成功
			onCustomSuccess() {
				this.sliderData = {
					text: '接到乘客',
					successText: '接到乘客',
					bgColor: 'rgb(47, 230, 117)',
					railColor: 'rgba(47, 230, 117, 0.85)'
				}
			}
		},
	}
</script>

<style lang="scss">
.u-demo-area{
	padding: 20px 0;
}
</style>
