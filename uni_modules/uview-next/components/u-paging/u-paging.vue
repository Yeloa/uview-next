<template>
	<view class="u-paging">
		<view class="u-paging__container" :style="[containerStyle]" :class="[{ 'u-paging__fixed':fixed && !usePageScroll, 'u-paging__full': !usePageScroll }]">
			<view class="u-paging__top" :style="[topStyle]" v-if="$slots.top">
				<slot name="top"></slot>
			</view>
			<view class="u-paging__main" :style="[{marginTop: usePageScroll && topStyle.top}]">
				<scroll-view 
					class="u-paging__scroll" 
					:class="[{ 'u-paging__scroll--absolute': usePageScroll === false }]"
					:scroll-y="!usePageScroll" 
					:scroll-top="scrollTop" 
					:lower-threshold="lowerThreshold"
					@scrolltolower="pageReachBottom"
				>
					<view class="u-paging__touch">
						<view 
							class="u-paging__body"
							id="refresh-container"
							ref="refresh-container"
							<!-- #ifdef MP-BAIDU || MP-TOUTIAO || MP-LARK || MP-KUAISHOU || MP-XHS -->
							@touchstart="touchStartHandler"
							@touchmove="touchMoveHandler"
							@touchend="touchEndHandler"
							<!-- #endif -->
							<!-- #ifdef APP-VUE || MP-WEIXIN || MP-QQ  || MP-ALIPAY || H5 -->
							@touchstart="pageing.touchstart"
							@touchmove="pageing.touchmove"
							@touchend="pageing.touchend"
							:refreshstatus="refreshStatus"
							:change:refreshstatus="pageing.refreshStatusChange"
							:refreshshow="refreshShow"
							:change:refreshshow="pageing.refreshShowChange"
							:readyrefresh="readyRefresh"
							:change:readyrefresh="pageing.readyRefreshChange"
							:refresherthreshold="refresherThreshold"
							:change:refresherthreshold="pageing.refresherThresholdChange"
							:curreadyrefresh="curReadyRefresh"
							:change:curreadyrefresh="pageing.curReadyRefreshChange"
							:refresherenabled="refresherEnabled"
							:change:refresherenabled="pageing.refresherEnabledChange"
							<!-- #endif -->
						>
							<view v-if="refresherEnabled" class="u-paging__refresh-indicator">
								<u-icon name="arrow-downward" v-if="refreshStatus === 1"></u-icon>
								<u-icon name="arrow-upward" v-if="refreshStatus === 2"></u-icon>
								<u-loading-icon size="18" v-if="refreshStatus === 3"></u-loading-icon>
								<text class="u-paging__refresh-indicator-text">{{ refreshText }}</text>
							</view>
							
							<view class="u-paging__wrapper">
								<slot></slot>
								<u-loadmore
									v-if="pageNo > 1"
									:status="loadMoreStatus"
									:load-text="loadingMoreDefaultText"
									:loadmore-text="loadingMoreDefaultText"
									:nomore-text="loadingMoreNoMoreText"
									:margin-top="0"
									:margin-bottom="0"
									:height="40"
								/>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>
<!-- #ifdef APP-VUE || MP-WEIXIN || MP-QQ || H5-->
<script lang="wxs" module="pageing" src="./pageing.wxs"></script>
<!-- #endif -->
<!-- #ifdef MP-ALIPAY -->
<script lang="sjs" module="pageing" src="./pageing.sjs"></script>
<!-- #endif -->
 
<script>
// #ifdef MP-BAIDU || MP-TOUTIAO || MP-LARK || MP-KUAISHOU || MP-XHS
import pageing from './pageing.js';
// #endif
import props from './props.js';
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin';

/**
 * u-paging 分页组件
 * @description 支持下拉刷新和下滑加载更多的分页组件，基于wxs技术实现
 * @tutorial https://uview.d3u.cn/components/paging.html
 * 
 * @property {Array}			value/modelValue       数据列表（v-model绑定值，Vue2使用value，Vue3使用modelValue）
 * @property {String}			bgColor        背景颜色，支持颜色名称、十六进制、rgb等格式
 * @property {String|Number}	height        组件高度，支持字符串或数字类型，如'100px'或100
 * @property {Boolean}			fixed        是否固定在底部，默认true
 * @property {Boolean}			usePageScroll        是否使用页面滚动，true时使用页面滚动，false时使用组件内部滚动
 * @property {Boolean}			refresherEnabled        是否启用下拉刷新功能，默认true
 * @property {Number|String}	refresherThreshold        下拉刷新触发距离，单位px，默认40
 * @property {String}			refresherDefaultText        下拉刷新前的提示文字，默认'继续下拉刷新'
 * @property {String}			refresherPullingText        下拉刷新释放时的提示文字，默认'松开立即刷新'
 * @property {String}			refresherRefreshingText        下拉刷新进行中的提示文字，默认'正在刷新'
 * @property {String}			refresherCompleteText        下拉刷新完成后的提示文字，默认'刷新成功'
 * @property {Boolean}			loadingMoreEnabled        是否启用上拉加载更多功能，默认true
 * @property {Number|String}	lowerThreshold        上拉加载更多的触发距离，距离底部多少px时触发，默认50
 * @property {String}			loadingMoreDefaultText        上拉加载更多时的默认提示文字，默认'加载更多...'
 * @property {String}			loadingMoreNoMoreText        没有更多数据时的提示文字，默认'没有更多数据了'
 * 
 * @event    {Function}        reload            刷新事件，无参数
 * @event    {Function}        complete          完成加载事件，参数：(data, hasMore)
 * @event    {Function}        clear           重置状态事件，无参数
 * 
 * @example  <u-paging v-model="dataList" @reload="reload" @complete="complete"></u-paging>
 */
export default {
	name: 'u-paging',
	mixins: [
		mpMixin,
		mixin,
		props, 
		// #ifdef MP-BAIDU || MP-TOUTIAO || MP-LARK || MP-KUAISHOU || MP-XHS
		pageing,
		// #endif
	],
	data() {
		return {
			scrollTop: 0,
			// 1: 下拉刷新, 2: 释放刷新, 3: 刷新中, 4: 刷新完成
			refreshStatus: 1,
			refreshShow: false,
			readyRefresh: false,
			curReadyRefresh: true,
			isLoadingMore: false,
			isReload: false,
			pageNo: 1,
			pageSize: 20,
			hasMore: true,
			innerDataList: [],
			windowTop: 0
		}
	},
	computed: {
		// 计算刷新状态文字
		refreshText() {
			const statusMap = {
				1: this.refresherDefaultText,
				2: this.refresherPullingText,
				3: this.refresherRefreshingText,
				4: this.refresherCompleteText
			}
			return statusMap[this.refreshStatus]
		},
		
		// 计算加载更多状态
		loadMoreStatus() {
			if (this.isLoadingMore) {
				return 'loading'
			} else if (!this.hasMore) {
				return 'nomore'
			} else {
				return 'loadmore'
			}
		},
		
		containerStyle() {
			let style = {}

			if(this.bgColor){
				style.backgroundColor = this.bgColor
			}

			if(this.height){
				style.height = uni.$u.addUnit(this.height)
			}

			if(this.fixed && !this.usePageScroll) {
				style.top = this.windowTop
			}

			return style
		},
		topStyle(e) {
			let style = {}
			if(this.usePageScroll) {
				style.position = 'fixed'
				style.left = 0
				style.right = 0
				style.zIndex = 999
				style.top = this.windowTop
				style.width = 'auto'
			}
			return style
		},
	},
	watch: {
		// #ifdef VUE2
		value: {
			handler(newVal) {
				this.innerDataList = [...newVal]
			},
			immediate: true
		},
		// #endif
		// #ifdef VUE3
		modelValue: {
			handler(newVal) {
				this.innerDataList = [...newVal]
			},
			immediate: true
		},
		// #endif
	},
	mounted() {
		this.$nextTick(() => {
			this.init()
		})
	},
	methods: {
		init() {
			// #ifdef H5
			const pageHeadNode = document.getElementsByTagName('uni-page-head');
			if (!pageHeadNode.length){
				this.windowTop = 0;
				return;
			}

			// #endif
			const { windowTop } = uni.$u.window()
			this.windowTop = uni.$u.addUnit(windowTop);
			this.reload()
		},
		// 刷新
		reload() {
			this.triggerQuery(true)
		},
		// 完成加载
		complete(data, hasMore = true) {
			if (this.refreshStatus === 3 || this.isReload) {
				this.innerDataList = data || []
				this.refreshStatus = 4
				this.refreshShow = false
				this.hasMore = hasMore
				this.isLoadingMore = false
				if(this.isReload) {
					this.scrollTop = 0
					this.isReload = false
				}
				
			} else {
			
				if (data && data.length > 0) {
					this.innerDataList = [...this.innerDataList, ...data]
				}

				this.hasMore = hasMore
				this.isLoadingMore = false
			}

			// #ifdef VUE2
			this.$emit('input', this.innerDataList)
			// #endif

			// #ifdef VUE3
			this.$emit('update:modelValue', this.innerDataList)
			// #endif
		},
		
		// 重置状态
		clear() {
			this.pageNo = 1
			this.hasMore = true
			this.isLoadingMore = false
			this.innerDataList = []
			this.refreshStatus = 1
			this.refreshShow = false
			this.readyRefresh = false
		},
		
		// 设置刷新状态
		setRefreshStatus(status) {
			this.refreshStatus = status
			if (status === 3) {
				this.triggerQuery(false)
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

		// 触发查询
		triggerQuery(isReload) {
			this.pageNo = 1
			this.isReload = isReload
			this.$emit('query', this.pageNo, this.pageSize)
		},
		
		// 滚动到底部触发加载更多
		pageReachBottom() {
			if (!this.isLoadingMore && this.hasMore && this.loadingMoreEnabled && this.refreshStatus != 3) {
				this.isLoadingMore = true
				this.pageNo++
				this.$emit('query', this.pageNo, this.pageSize)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";

	.u-paging{
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;

		&__top{
		}

		&__main{
			flex: 1;
			overflow: hidden;
   			position: relative;
			@include flex(row);
		}

		&__container{
			position: relative;
			@include flex(column);
			overflow: hidden;
		}

		&__full {
			width: 100%;
			height: 100%;
		}

		&__fixed{
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			height: auto;
			width: auto;
		}

		&__refresh-indicator{
			@include flex(row);
			align-items: center;
			justify-content: center;
			margin-top: -30px;
			height: 30px;

			&-icon{
				
			}

			&-text{
				margin-left: 5px;
				font-size: 14px;
				color: #666;
				text-align: center;
				line-height: 1.4;
			}
		}
		
		&__scroll{
			width: 100%;
			height: 100%;

			&--absolute{
				position: absolute;
				top: 0;
				left: 0;
				display: block;
			}
		}

		&__touch{
			position: relative;
			width: 100%;
			height: 100%;
		}

		&__body{
			@include flex(column);
			position: relative;
			height: 100%;
		}

		&__wrapper{
			display: block;
		}

		&__loadmore{
			position: relative;
			margin: 5px 0;
		}

		&__item{
			position: relative;
			width: 100%;
		}
	}
</style>
