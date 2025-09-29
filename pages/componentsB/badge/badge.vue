<template>
	<view class="u-page">
		<card title="直角边形状" flex>
			<view class="u-page__tag-item">
				<u-badge v-model="value" shape="horn"></u-badge>
			</view>
		</card>

		<card title="徽标数显示方式" flex>
			<view class="u-page__tag-item">
				<u-badge :value="5132" numberType="ellipsis"></u-badge>
			</view>
			<view class="u-page__tag-item">
				<u-badge :value="1011" numberType="overflow"></u-badge>
			</view>
			<view class="u-page__tag-item">
				<u-badge :value="1500" numberType="limit"></u-badge>
			</view>
			<view class="u-page__tag-item">
				<u-badge :value="45187" numberType="limit"></u-badge>
			</view>
		</card>

		<card title="显示圆点" flex>
			<view class="u-page__tag-item">
				<u-badge :value="1011" numberType="overflow" isDot></u-badge>
			</view>
		</card>

		<card title="自定义主题" flex>
			<view class="u-page__tag-item">
				<u-badge :value="9" type="error"></u-badge>
			</view>
			<view class="u-page__tag-item">
				<u-badge :value="9" type="warning"></u-badge>
			</view>
			<view class="u-page__tag-item">
				<u-badge :value="9" type="success"></u-badge>
			</view>
			<view class="u-page__tag-item">
				<u-badge :value="9" type="primary"></u-badge>
			</view>
		</card>

		<card title="反转色" flex>
			<view class="u-page__tag-item">
				<u-badge :value="9" type="error" inverted></u-badge>
			</view>
			<view class="u-page__tag-item">
				<u-badge :value="1532" inverted type="warning"></u-badge>
			</view>
			<view class="u-page__tag-item">
				<u-badge :value="12" inverted type="success"></u-badge>
			</view>
			<view class="u-page__tag-item">
				<u-badge :value="999" inverted type="primary"></u-badge>
			</view>
		</card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			value: 333
		}
	},
	onLoad() {
		setTimeout(() => {
			this.value = 55
		}, 3000)
	}
}
</script>

<style lang="scss">
.u-page__tag-item {
	margin-right: 40px;
}
</style>
