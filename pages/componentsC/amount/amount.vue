<template>
	<view class="u-page">
		<view class="u-demo-block">
			<text class="u-demo-block__title">基础用法</text>
			<view class="u-demo-block__content">
				<view class="u-demo-item">
					<u-amount v-model="value1" />
				</view>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">动效</text>
			<view class="u-demo-block__content">
				<view class="u-demo-item">
					<u-amount :value="animationValue" :transition="true" />
					<u-button type="primary" text="开始动画" @click="startAnimation" style="margin-top: 20rpx;"></u-button>
				</view>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">分隔符</text>
			<view class="u-demo-block__content">
				<view class="u-demo-item">
					<text class="u-demo-item__title">万分位分隔符：</text>
					<u-amount :value="123456.123" :show-separator="true" />
				</view>
				<view class="u-demo-item">
					<text class="u-demo-item__title">千分位分隔符：</text>
					<u-amount :value="123456.123" :show-separator="true" :separator-digits="3" />
				</view>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">样式</text>
			<view class="u-demo-block__content">
				<view class="u-demo-item">
					<u-amount :value="123456.123" font-size="30px" font-size-ratio="15px" color="red" />
				</view>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">金融符号</text>
			<view class="u-demo-block__content">
				<view class="u-demo-item">
					<text class="u-demo-item__title">前置符号：</text>
					<u-amount :value="123456.123" symbol="￥" />
				</view>
				<view class="u-demo-item">
					<text class="u-demo-item__title">后置符号：</text>
					<u-amount :value="123456.123" symbol="￥" :reverse="true" />
				</view>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">插槽</text>
			<view class="u-demo-block__content">
				<view class="u-demo-item">
					<u-amount :value="12345.125" :show-separator="true">
						<template #default="{integer, decimal}">
							<text>{{integer}}.{{decimal}}</text>
						</template>
					</u-amount>
				</view>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">大写中文</text>
			<view class="u-demo-block__content">
				<view class="u-demo-item">
					<u-amount :value="11.123" :capital="true" />
				</view>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">精度控制</text>
			<view class="u-demo-block__content">
				<view class="u-demo-item">
					<text class="u-demo-item__title">保留1位小数：</text>
					<u-amount :value="123456.789" :precision="1" />
				</view>
				<view class="u-demo-item">
					<text class="u-demo-item__title">保留3位小数：</text>
					<u-amount :value="123456.123" :precision="3" />
				</view>
				<view class="u-demo-item">
					<text class="u-demo-item__title">不显示小数：</text>
					<u-amount :value="123456.789" :show-decimal="false" />
				</view>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">符号控制</text>
			<view class="u-demo-block__content">
				<view class="u-demo-item">
					<text class="u-demo-item__title">不显示符号：</text>
					<u-amount :value="123456.123" :show-symbol="false" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				animationValue: 0,
				value1: 1234.125
			}
		},
		methods: {
			startAnimation() {
				this.animationValue = Math.floor(Math.random() * 1000000);
			}
		},
		onLoad() {
			setTimeout(()=>{
				this.value1 = 2234.125
			},3000)
		}
	}
</script>

<style lang="scss" scoped>

	.u-page{
		padding: 0px;
	}
	.u-demo-block {
		margin-bottom: 40rpx;

		&__title {
			padding:30rpx 30rpx 10rpx 30rpx;
			font-size: 30rpx;
			color: $u-content-color;
			margin-bottom: 20rpx;
			display: block;
			background-color: #f5f5f5;
		}

		&__content {
			background-color: #fff;
			border-radius: 10rpx;
			padding: 20rpx;
		}
	}

	.u-demo-item {
		margin-bottom: 30rpx;

		&:last-child {
			margin-bottom: 0;
		}

		&__title {
			font-size: 28rpx;
			color: #606266;
			margin-bottom: 10rpx;
			display: block;
		}
	}
</style> 