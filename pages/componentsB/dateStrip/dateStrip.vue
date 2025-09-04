<template>
	<view class="u-page">
		<card title="基础用法">
			<u-date-strip v-model="value1" @change="onChange" />
		</card>

		<card title="平铺模式">
			<u-date-strip v-model="value3" mode="none" :min-date="minDate" :max-date="maxDate" />
		</card>

		<card title="圆形选中框">
			<u-date-strip v-model="value5" active-mode="date" height="80px" item-width="45px" item-round="100px"/>
		</card>

		<card title="文本高亮">
			<u-date-strip v-model="value6" active-mode="text" />
		</card>

		<card title="显示农历">
			<u-date-strip 
				v-model="value11" 
				:show-lunar="true"
				height="70px"
			/>
		</card>

		<card title="小于10的日期补0显示">
			<u-date-strip 
				v-model="value12" 
				:pad-zero="true"
				mode="none"
			/>
		</card>

		<card title="自定义样式">
			<u-date-strip 
				v-model="value7" 
				bg-color="#f5f5f5" 
				active-bg-color="#ff6b35" 
				active-color="#fff"
				round="10px"
			/>
		</card>

		<card title="限制在最近7天">
			<u-date-strip 
				v-model="value9" 
				:min-date="todayTime" 
				:max-date="maxDateLimit" 
				mode="none"
			/>
		</card>
		 
		<card title="禁用特定日期">
			<u-date-strip 
				v-model="value10" 
				@change="onChange"
				:disabled-date="disabledDates"
				:disabled-fun="disabledFun"
				mode="none"
			/>
		</card>
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
				value12: new Date().getTime(),
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
			disabledFun(day) {
				if(day.weekday == '二'){
					return [
						true,
						'星期二'
					];
				}
				return false;
			},
			onChange(item) {
				this.selectedDate = item.timestamp;
				console.log('选中日期:', this.formatDate(item.timestamp));
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
