<template>
	<view class="u-page">
		<u-alert type="error" description="PC端需开启仿真模式测试"></u-alert>

		<view class="u-demo-block" style="margin-top: 10px;">
			<text class="u-demo-block__title">基础使用 - 禁用</text>
			<view class="u-demo-block__content">
				<u-draggable :list="dragList" >
					<template #item="{item, active}">
						<view class="grid-item">
							<text class="grid-text" :class="{'text-active': active}">{{item.text}}</text>
						</view>
					</template>
				</u-draggable>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">多列拖拽排序 - 可关闭</text>
			<view class="u-demo-block__content">
				<u-draggable 
					:list="multiColumnList" 
					:column="3"
					:closeable="true"
				>
					<template #item="{item, active}">
						<view class="grid-item square" :class="{active}">
							<text class="grid-text" :class="{'text-active': active}">{{item.text}}</text>
						</view>
					</template>
				</u-draggable>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">垂直排序 - 手柄拖拽</text>
			<view class="u-demo-block__content">
				<u-draggable 
					:list="verticalList" 
					:handle="true"
					:column="1"
				>
					<template #item="{oindex, item, active}">
						<view class="vertical-item" :class="{active}">
							<view class="vertical-icon">
								<text class="icon-text">{{item.icon}}</text>
							</view>
							<view class="vertical-content">
								<text class="vertical-title">{{item.title}}</text>
								<text class="vertical-desc">{{item.desc}}</text>
							</view>
							<view class="vertical-handle">
								<text class="handle-text" data-handle="true">⋮⋮</text>
							</view>
						</view>
					</template>
				</u-draggable>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">长按拖拽</text>
			<view class="u-demo-block__content">
				<u-draggable 
					:list="longpressList" 
					:column="2"
					longpress
				>
					<template #item="{oindex, item, active}">
						<view class="grid-item" :class="{active}">
							<text class="grid-text">{{item.text}}</text>
							<text class="grid-hint">长按拖拽</text>
						</view>
					</template>
				</u-draggable>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dragList: [
				{ id: 1, text: "微信" },
				{ id: 2, text: "支付宝", disabled: true },
				{ id: 3, text: "建设银行" },
				{ id: 4, text: "工商银行" },
				{ id: 5, text: "农业银行" },
				{ id: 6, text: "中国银行", disabled: true  },
				{ id: 7, text: "招商银行" },
				{ id: 8, text: "交通银行" }
			],
			multiColumnList: [
				{ id: 1, text: "A" },
				{ id: 2, text: "B" },
				{ id: 3, text: "C" },
				{ id: 4, text: "D" },
				{ id: 5, text: "E" },
				{ id: 6, text: "F" }
			],
			longpressList: [
				{ id: 1, text: "北京" },
				{ id: 2, text: "上海" },
				{ id: 3, text: "广州" },
				{ id: 4, text: "深圳" }
			],
			verticalList: [
				{ id: 1, icon: "📱", title: "手机设置", desc: "管理手机基本设置" },
				{ id: 2, icon: "🔔", title: "通知中心", desc: "查看和管理通知" },
				{ id: 3, icon: "🔒", title: "隐私安全", desc: "隐私和安全设置" },
				{ id: 4, icon: "💾", title: "存储空间", desc: "管理设备存储" },
				{ id: 5, icon: "🔋", title: "电池管理", desc: "电池使用情况" },
				{ id: 6, icon: "📶", title: "网络设置", desc: "WiFi和移动网络" }
			],
			itemCounter: 9,
			deleteList: [
				{ id: 1, text: "项目1" },
				{ id: 2, text: "项目2" },
				{ id: 3, text: "项目3" },
				{ id: 4, text: "项目4" },
				{ id: 5, text: "项目5" }
			],
			deletePosition: 'top-right'
		}
	},
	methods: {
		onListUpdate(newList) {
			console.log('基础列表更新:', newList)
			this.dragList = newList
		},
		onListChange(changeInfo) {
			console.log('基础拖拽变化:', changeInfo)
			uni.showToast({
				title: `从第${changeInfo[0].oldindex + 1}位移动到第${changeInfo[0].index + 1}位`,
				icon: 'none',
				duration: 1500
			})
		},
		onMultiColumnUpdate(newList) {
			console.log('多列列表更新:', newList)
			this.multiColumnList = newList
		},
		onMultiColumnChange(changeInfo) {
			console.log('多列拖拽变化:', changeInfo)
		},
		onVerticalUpdate(newList) {
			console.log('垂直列表更新:', newList)
			this.verticalList = newList
		},
		onVerticalChange(changeInfo) {
			console.log('垂直拖拽变化:', changeInfo)
		},
		onLongpressUpdate(newList) {
			console.log('长按列表更新:', newList)
			this.longpressList = newList
		},
		onLongpressChange(changeInfo) {
			console.log('长按拖拽变化:', changeInfo)
		}
		
	}
}
</script>

<style lang="scss" scoped>
.u-page {
	padding: 20rpx;
	background-color: #f5f5f5;
}

.grid-item {
	height: 48px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: white;
	font-weight: bold;
	color: #333;
	border-radius: 8rpx;
	margin:10rpx;
}


.grid-hint {
	font-size: 20rpx;
	color: #999;
	margin-top: 8rpx;
	font-weight: normal;
}

.result-text {
	flex: 1;
	font-size: 28rpx;
	color: #333;
}

.vertical-item {
	height: 55px;
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: white;
	border: 1rpx solid #eee;
	border-radius: 12rpx;
	padding:0 20rpx;
	transition: all 300ms ease;
	position: relative;
}

.vertical-icon {
	width: 80rpx;
	height: 80rpx;
	background: #f0f0f0;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20rpx;
	
	.icon-text {
		font-size: 40rpx;
	}
}

.vertical-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.vertical-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 8rpx;
}

.vertical-desc {
	font-size: 24rpx;
	color: #666;
}

.vertical-handle {
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	
	.handle-text {
		font-size: 32rpx;
		color: #999;
		font-weight: bold;
		transform: rotate(90deg);
	}
}

</style>