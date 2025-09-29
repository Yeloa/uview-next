<template>
	<view class="u-page">
		<card title="基础功能" flex>
			<u-text text="我用十年青春,赴你最后之约"></u-text>
		</card>

		<card title="设置主题" flex>
			<u-text text="主色" type="primary"></u-text>
			<u-text type="error" text="错误"></u-text>
			<u-text type="success" text="成功"></u-text>
			<u-text type="warning" text="警告"></u-text>
			<u-text type="info" text="信息"></u-text>
		</card>

		<card title="拨打电话" flex>
			<u-text mode="phone" text="15019479320"></u-text>
		</card>

		<card title="日期格式化" flex>
			<u-text mode="date" text="1612959739"></u-text>
		</card>

		<card title="姓名脱敏" flex>
			<u-text mode="name" text="张三三" format="encrypt"></u-text>
		</card>

		<card title="超链接" flex>
			<u-text mode="link" text="Go to uView docs" href="https://www.uviewui.com"></u-text>
		</card>

		<card title="显示金额" flex>
			<u-text mode="price" text="728732.32"></u-text>
		</card>

		<card title="前后图标" flex>
			<u-text prefixIcon="baidu" iconStyle="font-size: 19px" text="百度一下"></u-text>
			<u-text suffixIcon="arrow-rightward" iconStyle="font-size: 18px" text="查看更多"></u-text>
		</card>

		<card title="超出隐藏" flex>
			<u-text :lines="2" text="关于uView的取名来由，首字母u来自于uni-app首字母，uni-app是基于Vue.js，Vue和View(延伸为UI、视图之意)同音，同时view组件uni-app中 最基础，最重要的组件，故取名uView，表达源于uni-app和Vue之意，同时在此也对它们表示感谢。"></u-text>
		</card>

		<card title="小程序开放能力">
			<u-text text="分享到微信" openType="share" type="success" @click="clickHandler"></u-text>
		</card>
	</view>
</template>

<script>
export default {
	onLoad() { },
	methods: {
		clickHandler() {
			// #ifndef MP-WEIXIN
			uni.$u.toast('请在微信小程序内查看效果')
			// #endif
		}
	},
}
</script>
