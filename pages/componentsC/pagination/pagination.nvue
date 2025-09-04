<template>
	<view class="u-page">
	
		<card title="基础使用">
			<u-pagination v-model="currentPage1" :total="100"/>
		</card>
		
		<card title="简单模式">
			<u-pagination v-model="currentPage2" :total="24" :simple="true"/>
		</card>

		<card title="显示省略号">
			<u-pagination 
				v-model="currentPage3" 
				:total="100" 
				:pageSize="5" 
				:pagerCount="5" 
				:show-prev-button="true"
				:show-next-button="true"
				:force-ellipses="true"
			/>
		</card>

		<card title="禁用状态">
			<u-pagination 
				v-model="currentPage4" 
				:total="100" 
				:page-size="5" 
				:pager-count="5" 
				:show-prev-button="true"
				:show-next-button="true"
				:disabled="true"
				:force-ellipses="true"
			/>
		</card>

		<card title="自定义样式">
			<u-pagination 
				v-model="currentPage5" 
				:total="100" 
				:page-size="10" 
				:pager-count="3"
				bg-color="#f0f0f0"
				active-bg-color="#ff6b6b"
				active-color="#ffffff"
				color="#333333"
				border-color="#ddd"
				round="8px"
				item-width="45px"
				item-height="45px"
				font-size="16px"
			/>
		</card>

		<card title="自定义插槽">
			<u-pagination
				v-model="currentPage7" 
				:total="204" 
				:page-size="5" 
				:pager-count="3" 
				:force-ellipses="true"
				:border-color="false"
				:bg-color="false"
				:active-bg-color="false"
			>
				<template v-slot:prev="{disabled}">
					<text class="custom-btn" :class="{ 'custom-btn--disabled': disabled }">👈</text>
				</template>
				<template v-slot:page="{label, active}">
					<text class="custom-page" :class="{ 'custom-page--active': active }">{{label}}</text>
				</template>
				<template v-slot:next="{disabled}">
					<text class="custom-btn" :class="{ 'custom-btn--disabled': disabled }">👉</text>
				</template>
			</u-pagination>
		</card>

		<card title="事件监听">
			<view class="event-info">
				<text>当前页: {{ currentPage8 }}</text>
			</view>
			<u-pagination 
				v-model="currentPage8" 
				:total="100" 
				:page-size="10"
				@change="onPageChange"
			/>
		</card>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentPage1: 1,
				currentPage2: 1,
				currentPage3: 1,
				currentPage4: 1,
				currentPage5: 1,
				currentPage6: 1,
				currentPage7: 1,
				currentPage8: 1
			}
		},
		onLoad() {
			
		},
		methods: {
			onPageChange(page) {
				console.log('页码变化:', page);
				uni.showToast({
					title: `切换到第${page}页`,
					icon: 'none',
					duration: 1500
				});
			}
		}
	}
</script>

<style lang="scss">
	.custom-btn {
		width: 40px;
		height: 40px;
		background-color: #ddd;
		border-radius: 50px;
		color: white;
		text-align: center;
		line-height: 40px;
		font-size: 16px;
		
		&--disabled {
			opacity: 0.5;
		}
	}

	.custom-page {
		width: 40px;
		height: 40px;
		background-color: #ddd;
		border-radius: 50px;
		color: white;
		text-align: center;
		line-height: 40px;
		font-size: 14px;
		
		&--active {
			background-color: #ff6b6b;
		}
	}
</style> 