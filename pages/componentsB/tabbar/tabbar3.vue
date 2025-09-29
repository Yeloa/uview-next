<template>
	<view class="u-page">
		<view>我的</view>
		<u-tabbar>
			<u-tabbar-item text="首页" icon="home" url="/pages/componentsB/tabbar/tabbar"></u-tabbar-item>
			<u-tabbar-item text="放映厅" icon="photo" url="/pages/componentsB/tabbar/tabbar1"></u-tabbar-item>
			<u-tabbar-item text="发布" icon="plus" :middle="true" iconSize="20" ></u-tabbar-item>
			<u-tabbar-item text="直播" icon="play-right" url="/pages/componentsB/tabbar/tabbar2"></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account" url="/pages/componentsB/tabbar/tabbar3"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	onLoad() {

	},
	methods: {
		
	},
}
</script>

<style lang="scss">
.u-page {
	padding: 0;
}
</style>
