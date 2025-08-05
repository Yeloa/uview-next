<template>
	<view class="u-paging-container" :style="{ height: height + 'px' }">
		<!-- 下拉刷新区域 -->
		<view 
			class="refresh-wrapper"
			id="refresh-container"
			@touchstart="REFRESHWXS.touchstart"
			@touchmove="REFRESHWXS.touchmove"
			@touchend="REFRESHWXS.touchend"
			:refreshdistance="refreshDistance"
			:readyrefresh="readyRefresh"
			:refreshshow="refreshShow"
			:refreshstatus="refreshStatus"
			:curreadyrefresh="curReadyRefresh"
			:change:refreshstatus="REFRESHWXS.refreshStatusChange"
			:change:refreshshow="REFRESHWXS.refreshShowChange"
			:change:readyrefresh="REFRESHWXS.readyRefreshChange"
			:change:refreshdistance="REFRESHWXS.refreshDistanceChange"
			:change:curreadyrefresh="REFRESHWXS.curReadyRefreshChange"
		>
			<!-- 刷新指示器 -->
			<view class="refresh-indicator" :style="{ height: refreshDistance + 'px' }">
				<view class="refresh-content">
					<view class="refresh-icon" :class="{ 'rotating': isRefreshing }">
						<text v-if="!isRefreshing">↓</text>
						<text v-else>⟳</text>
					</view>
					<text class="refresh-text">{{ refreshText }}</text>
				</view>
			</view>
			
			<!-- 主要内容区域 -->
			<view class="content-wrapper" id="swiper" :data-componentid="componentId">
				<scroll-view 
					class="scroll-content"
					:scroll-y="true"
					:scroll-top="scrollTop"
					@scroll="onScroll"
					@scrolltolower="onScrollToLower"
				>
					<slot></slot>
					
					<!-- 加载更多提示 -->
					<view v-if="hasLoadMore" class="load-more-wrapper">
						<view v-if="isLoadingMore" class="loading-more">
							<text class="loading-icon">⏳</text>
							<text class="loading-text">{{ loadMoreText }}</text>
						</view>
						<view v-else-if="!hasMoreData" class="no-more">
							<text class="no-more-text">{{ noMoreText }}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script lang="wxs" module="REFRESHWXS" src="./refresh-wxs.wxs"></script>
<script>
	import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';
	
	/**
	 * u-paging 分页组件
	 * @description 支持下拉刷新和下滑加载更多的分页组件，基于wxs技术实现
	 * @tutorial https://uview.d3u.cn/components/paging.html
	 * 
	 * @property {Boolean}			hasRefresh       是否启用下拉刷新  （默认 false ）
	 * @property {Boolean}			hasLoadMore      是否启用下滑加载更多  （默认 false ）
	 * @property {String}			refreshText      刷新相关文字
	 * @property {String}			loadMoreText     加载更多相关文字
	 * @event    {Function}        onRefresh        下拉刷新触发
	 * @event    {Function}        onLoadMore       下滑加载更多触发
	 * @example  <u-paging :hasRefresh="true" :hasLoadMore="true" @onRefresh="refresh" @onLoadMore="loadMore"></u-paging>
	 */
	export default {
		name: 'u-paging',
		mixins: [mpMixin, mixin, props],
		data() {
			return {
				scrollTop: 0,
				refreshStatus: 1, // 1: 下拉刷新, 2: 释放刷新, 3: 刷新中, 4: 刷新成功, 5: 刷新失败, 6: 刷新完成
				refreshShow: false,
				readyRefresh: false,
				curReadyRefresh: true,
				isLoadingMore: false,
				hasMoreData: true,
			
			}
		},
		computed: {
			// 计算刷新状态文字
			refreshText() {
				const statusMap = {
					1: this.beforRefreshText,
					2: this.releaseRefreshText,
					3: this.isRefreshingText,
					4: this.successRefreshText,
					5: this.failRefreshText,
					6: this.completeRefreshText
				}
				return statusMap[this.refreshStatus] || this.beforRefreshText
			},
			// 计算是否正在刷新
			isRefreshing() {
				return this.refreshStatus === 3
			}
		},
		methods: {
			
			// 设置刷新状态
			setRefreshStatus(status) {
				this.refreshStatus = status
				if (status === 3) {
					// 触发刷新事件
					this.$emit('onRefresh', (success = true) => {
						// 刷新完成回调
						this.refreshComplete(success)
					})
				}
			},
			
			// 设置刷新显示状态
			setRefreshShow(data) {
				this.refreshShow = data.refreshShow
			},
			
			// 设置准备刷新状态
			setReadyRefresh(data) {
				this.readyRefresh = data.readyRefresh
			},
			
			// 刷新完成
			refreshComplete(success = true) {
				this.refreshStatus = success ? 4 : 5
				// 延迟重置状态
				setTimeout(() => {
					this.refreshStatus = 6
					this.refreshShow = false
				}, 1000)
			},
			
			// 下滑加载更多
			onLoadMore() {
				if (this.isLoadingMore || !this.hasMoreData) return
				
				this.isLoadingMore = true
				this.$emit('onLoadMore', (hasMore = true) => {
					// 加载完成回调
					this.loadMoreComplete(hasMore)
				})
			},
			
			// 加载更多完成
			loadMoreComplete(hasMore = true) {
				this.isLoadingMore = false
				this.hasMoreData = hasMore
			},
			
			// 滚动事件处理
			onScroll(e) {
				this.scrollTop = e.detail.scrollTop;
			},

			// 滚动到底部触发加载更多
			onScrollToLower() {
				if (this.hasLoadMore) {
					this.onLoadMore();
				}
			},
			
			// 重置加载更多状态
			resetLoadMoreState() {
				this.isLoadingMore = false
				this.hasMoreData = true
			},
			
			// 重置刷新状态
			resetRefreshState() {
				this.refreshStatus = 1
				this.refreshShow = false
				this.readyRefresh = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";

	.u-paging-container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #fff;
	}

	.refresh-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.refresh-indicator {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
		z-index: 10;
		overflow: hidden;
		transform: translateY(-100%);
	}

	.refresh-content {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 20rpx 0;
		min-height: 80rpx;
	}

	.refresh-icon {
		font-size: 40rpx;
		margin-bottom: 10rpx;
		transition: transform 0.3s ease;
		color: #666;

		&.rotating {
			animation: rotate 1s linear infinite;
		}
	}

	.refresh-text {
		font-size: 25rpx;
		color: #666;
		text-align: center;
		line-height: 1.4;
	}

	.content-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.scroll-content {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	// 加载更多样式
	.load-more-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 30rpx 0;
		background-color: #f8f8f8;
		min-height: 80rpx;
	}

	.loading-more {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loading-icon {
		font-size: 30rpx;
		margin-right: 10rpx;
		animation: rotate 1s linear infinite;
		color: #666;
	}

	.loading-text {
		font-size: 25rpx;
		color: #666;
		line-height: 1.4;
	}

	.no-more {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.no-more-text {
		font-size: 25rpx;
		color: #999;
		line-height: 1.4;
	}

	// 旋转动画
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
