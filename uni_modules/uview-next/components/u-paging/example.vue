<template>
	<view class="example-container">
		<u-paging 
			:hasRefresh="true" 
			:hasLoadMore="true"
			:refreshDistance="90"
			:loadMoreDistance="50"
			:beforRefreshText="'下拉刷新'"
			:releaseRefreshText="'松开刷新'"
			:isRefreshingText="'刷新中...'"
			:successRefreshText="'刷新成功'"
			:failRefreshText="'刷新失败'"
			:completeRefreshText="'刷新完毕'"
			:loadMoreText="'加载更多...'"
			:noMoreText="'没有更多数据了'"
			@onRefresh="handleRefresh"
			@onLoadMore="handleLoadMore"
		>
			<view v-for="(item, index) in list" :key="index" class="list-item">
				<text class="item-title">{{ item.title }}</text>
				<text class="item-content">{{ item.content }}</text>
			</view>
		</u-paging>
	</view>
</template>

<script>
export default {
	name: 'PagingExample',
	data() {
		return {
			list: [],
			page: 1,
			pageSize: 20,
			hasMore: true
		}
	},
	mounted() {
		this.loadData()
	},
	methods: {
		// 加载数据
		async loadData(isRefresh = false) {
			try {
				// 模拟API请求
				const response = await this.mockApiRequest(isRefresh ? 1 : this.page)
				
				if (isRefresh) {
					this.list = response.data
					this.page = 2
				} else {
					this.list = [...this.list, ...response.data]
					this.page++
				}
				
				this.hasMore = response.hasMore
				
				return this.hasMore
			} catch (error) {
				console.error('加载数据失败:', error)
				return false
			}
		},
		
		// 模拟API请求
		mockApiRequest(page) {
			return new Promise((resolve) => {
				setTimeout(() => {
					const startIndex = (page - 1) * this.pageSize
					const data = []
					
					for (let i = 0; i < this.pageSize; i++) {
						data.push({
							id: startIndex + i + 1,
							title: `列表项 ${startIndex + i + 1}`,
							content: `这是第 ${startIndex + i + 1} 个列表项的内容`
						})
					}
					
					resolve({
						data,
						hasMore: page < 5 // 模拟只有5页数据
					})
				}, 1000)
			})
		},
		
		// 下拉刷新
		async handleRefresh(callback) {
			try {
				const hasMore = await this.loadData(true)
				callback(true) // 刷新成功
			} catch (error) {
				callback(false) // 刷新失败
			}
		},
		
		// 下滑加载更多
		async handleLoadMore(callback) {
			try {
				const hasMore = await this.loadData(false)
				callback(hasMore) // 传递是否还有更多数据
			} catch (error) {
				callback(false) // 加载失败
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.example-container {
	height: 100vh;
	background-color: #f5f5f5;
}

.list-item {
	background-color: #fff;
	margin: 20rpx;
	padding: 30rpx;
	border-radius: 10rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);

	.item-title {
		display: block;
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
	}

	.item-content {
		display: block;
		font-size: 28rpx;
		color: #666;
		line-height: 1.5;
	}
}
</style> 