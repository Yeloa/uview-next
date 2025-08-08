<template>
	<view class="u-page">
		<view class="u-demo-block">
			<text class="u-demo-block__title">基础用法</text>
			<view class="u-demo-block__content">
				<u-date-strip v-model="value1" @change="onChange" />
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">平铺模式：</text>
			<view class="u-demo-block__content">
				<u-date-strip v-model="value3" mode="none" :min-date="minDate" :max-date="maxDate" />
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">圆形选中框</text>
			<view class="u-demo-block__content">
				<u-date-strip v-model="value5" active-mode="date" height="80px" item-width="45px" item-round="100px"/>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">文本高亮</text>
			<view class="u-demo-block__content">
				<u-date-strip v-model="value6"  active-mode="text" />
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">显示农历</text>
			<view class="u-demo-block__content">
				<u-date-strip 
					v-model="value11" 
					:show-lunar="true"
					height="70px"
				/>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">自定义样式</text>
			<view class="u-demo-block__content" style="padding-bottom: 10px;">
				<u-date-strip 
					v-model="value7" 
					bg-color="#f5f5f5" 
					active-bg-color="#ff6b35" 
					active-color="#fff"
					round="10px"
				/>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">限制在最近7天</text>
			<view class="u-demo-block__content">
				<u-date-strip 
					v-model="value9" 
					:min-date="todayTime" 
					:max-date="maxDateLimit" 
					mode="none"
				/>
			</view>
		</view> 
		<!-- 禁用单个日期 -->
		<!-- <u-date-strip :disabled-date="'2025-01-01'" /> -->

		<!-- 禁用多个日期 -->
		<!-- <u-date-strip :disabled-date="['2025-01-01', '2025-02-14', '2025-05-01']" /> -->

		<!-- 使用时间戳 -->
		<!-- <u-date-strip :disabled-date="[1640995200000, 1707868800000]" /> -->
		 
		<view class="u-demo-block">
			<text class="u-demo-block__title">禁用特定日期</text>
			<view class="u-demo-block__content">
				<u-date-strip 
					v-model="value10" 
					 @change="onChange"
					:disabled-date="disabledDates"
					mode="none"
				/>
			</view>
		</view>

	</view> 
</template>

<script>
	export default {
		data() {
			return {
				value1: new Date().getTime(),
				value3: new Date().getTime(),
				value5: new Date().getTime(),
				value6: new Date().getTime(),
				value7: new Date().getTime(),
				value9: new Date().getTime(),
				value10: new Date().getTime(),
				value11: new Date().getTime(),
				selectedDate: new Date().getTime(),
				minDate: new Date(2025, 6, 10).getTime(),
				maxDate: new Date(2025, 7, 27).getTime(),
				todayTime: new Date().getTime(),
				maxDateLimit: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime(),
				disabledDates: [
					'2025-08-09',
					'2025-08-10',
					'2025-08-15',
				]

				
			}
		},
		methods: {
			onChange(time) {
				this.selectedDate = time;
				console.log('选中日期:', this.formatDate(time));
			},
			
			formatDate(timestamp) {
				const date = new Date(timestamp);
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const day = date.getDate().toString().padStart(2, '0');
				const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
				const weekday = weekdays[date.getDay()];
				return `${year}-${month}-${day} ${weekday}`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-page {
		padding: 0px;
	}
	
	.u-demo-block {
		margin-bottom: 0;

		&__title {
			padding: 30rpx 30rpx 10rpx 30rpx;
			font-size: 30rpx;
			color: $u-content-color;
			margin-bottom: 20rpx;
			display: block;
			background-color: #f5f5f5;
		}

		&__content {
			background-color: #fff;
			border-radius: 10rpx;
			padding:0 20rpx;
		}
	}


</style> 