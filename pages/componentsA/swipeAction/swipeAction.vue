<template>
	<view class="u-page">
		<view class="u-demo-block">
			<text class="u-demo-block__title">演示案例</text>
			<view class="u-page__swipe-action-item">
				<u-swipe-action>
					<u-swipe-action-item
						v-for="(item, index) in swipeItems"
						:key="index"
						:name="item.name"
						:options="item.options"
						@click="click"
						closeOnClick
					>
						<view class="swipe-action u-border-top u-border-bottom">
							<view class="swipe-action__content">
								<text class="swipe-action__content__text">{{ item.text }}</text>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
		</view>
		<view class="u-demo-block">
			<text class="u-demo-block__title">按钮组</text>
			<view class="u-page__swipe-action-item">
				<u-swipe-action>
					<u-swipe-action-item :options="options2">
						<view class="swipe-action u-border-top u-border-bottom">
							<view class="swipe-action__content">
								<text class="swipe-action__content__text">两个按钮并列</text>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
		</view>
		<view class="u-demo-block">
			<text class="u-demo-block__title">带图标</text>
			<view class="u-page__swipe-action-item">
				<u-swipe-action>
					<u-swipe-action-item :options="options3">
						<view class="swipe-action u-border-top u-border-bottom">
							<view class="swipe-action__content">
								<text class="swipe-action__content__text">自定义图标</text>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
		</view>
		<view class="u-demo-block">
			<text class="u-demo-block__title">组合使用</text>
			<view class="u-page__swipe-action-item">
				<u-swipe-action>
					<u-swipe-action-item
						:options="item.options"
						v-for="(item, index) in options4"
						:disabled="item.disabled"
						:key="index"
					>
						<view
							class="swipe-action u-border-top"
							:class="[index === options4.length - 1 && 'u-border-bottom']"
						>
							<view class="swipe-action__content">
								<text class="swipe-action__content__text">{{ item.text }}</text>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
		</view>
		<view class="u-demo-block">
			<text class="u-demo-block__title">自定义按钮形状</text>
			<view class="u-page__swipe-action-item">
				<u-swipe-action>
					<u-swipe-action-item :options="options5">
						<view class="swipe-action u-border-top u-border-bottom">
							<view class="swipe-action__content">
								<text class="swipe-action__content__text">圆形按钮</text>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show1: true,
				moveX: 0,
				showText: '当前状态：关',
				showStatus: false,
				swipeItems: [{
					text: '基础使用',
					name:'item1',
					options: [{
						text: '删除1',
						style: {
							backgroundColor: '#f56c6c'
						}
					}]
				},{
					text: '基础使用2',
					name:'item2',
					options: [{
						text: '删除2',
						style: {
							backgroundColor: '#f56c6c'
						}
					}]
				},{
					text: '基础使用3',
					name:'item3',
					options: [{
						text: '删除3',
						style: {
							backgroundColor: '#f56c6c'
						}
					}]
				}],
				options1: [{
					text: '删除',
					style: {
						backgroundColor: '#f56c6c'
					}
				}],
				options2: [{
					text: '收藏',
					style: {
						backgroundColor: '#3c9cff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#f56c6c'
					}
				}],
				options3: [{
					text: '收藏',
					icon: 'star-fill',
					iconSize: '20',
					style: {
						backgroundColor: '#f9ae3d'
					}
				}],
				options4: [{
					text: '禁用状态',
					disabled: true,
					options: [{
							text: '置顶',
							style: {
								backgroundColor: '#3c9cff',
							}
						},
						{
							text: '取消',
							style: {
								backgroundColor: '#f9ae3d',
							}
						},
					],
				}, {
					text: '正常状态',
					disabled: false,
					options: [{
							text: '置顶',
							style: {
								backgroundColor: '#3c9cff',
							}
						},
						{
							text: '取消',
							style: {
								backgroundColor: '#f9ae3d',
							}
						},
					],
				}, {
					text: '自动关闭',
					disabled: false,
					options: [{
							text: '置顶',
							style: {
								backgroundColor: '#3c9cff',
							}
						},
						{
							text: '取消',
							style: {
								backgroundColor: '#f9ae3d',
							}
						},
					],
				}],
				options5: [{
					icon: 'trash-fill',
					style: {
						backgroundColor: '#f56c6c',
						width: '40px',
						height: '40px',
						round: '100px',
						margin: '0 6px'
					}
				}, {
					icon: 'heart-fill',
					style: {
						backgroundColor: '#5ac725',
						width: '40px',
						height: '40px',
						round: '100px',
						margin: '0 6px'
					}
				}]
			}
		},
		methods: {
			click(event) {
				const idx = this.swipeItems.findIndex((item) => item.name == event.name);
				this.swipeItems.splice(idx, 1);

				// uni.showModal({
				// 	title: '温馨提示',
				// 	content: '确定要删除吗？',
				// 	success: res => {
				// 		if (res.confirm) {
				// 			// 找到对应的项目并隐藏
				// 			const idx = this.swipeItems.findIndex((item) => item.name == index.name);
				// 			if (idx) {
				// 				this.swipeItems.splice(idx, 1);
				// 			}
				// 		}
				// 	}
				// })
			}
		}
	}
</script>

<style lang="scss">
	.u-page {
		padding: 0;
	}

	.u-demo-block__title {
		padding: 10px 0 2px 15px;
	}

	.swipe-action {
		&__content {
			padding: 25rpx 0;

			&__text {
				font-size: 15px;
				color: $u-main-color;
				padding-left: 30rpx;
			}
		}
	}
</style>
