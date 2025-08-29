<template>
	<view class="wrap">
		<view class="nav-wrap">
			<view class="nav-title">
				<u--image :showLoading="true" src="https://cdn.uviewui.com/uview/common/logo.png" width="70px" height="70px" />
				<view class="nav-info">
					<view class="nav-info__title">
						<text class="nav-info__title__text">uView Next {{ $u.config.version }}</text>
					</view>
					<text class="nav-slogan">企业级、高质量、更贴近业务场景的UI框架</text>
					<view class="nav-info__title__language">
						<view>切换语言：</view>
						<view @click="changeLanguage('zh-CN')"><text>中文</text></view>
						<view style="margin:0 10px;">|</view>
						<view @click="changeLanguage('en-US')"><text>英文</text></view>
					</view>
				</view>
			</view>
			<text class="nav-desc">{{$t('index.desc')}}</text>
		</view>
	
		<view class="list-wrap">
			<u-cell-group title-bg-color="rgb(243, 244, 246)" :title="item.groupName" v-for="(item, index) in list" :key="index">
				<u-cell :titleStyle="{fontWeight: 500}" :title="item1.title" v-for="(item1, index1) in item.list" :key="index1" isLink @click="openPage" :name="item1.path">
					<template #icon>
						<u-icon :name="getIcon(item1.icon)" size="16" mode="widthFix"></u-icon>
					</template>
				</u-cell>
			</u-cell-group>
		</view>
		<u-gap height="30" bgColor="#fff"></u-gap>
	</view>
</template>

<script >
	import list from "./components.config.js";
	import { fetchTest } from '@/common/api.js';

	export default {
		data() {
			return {
				list: list,
				desc: '',
			}
		},
		computed: {
			getIcon() {
				return path => {
					return '/static/uview/example/' + path + '.png';
				}
			},
		},
		onLoad(){
			// fetchTest().then((res)=>{
			// 	console.log('fetchTest 请求示例',res)
			// })
		},
		methods: {
			changeLanguage(lang) {
				uni.$u.setLocale(lang)
				uni.$u.toast('语言切换成功')
			},
			openPage(detail) {
				const path = detail.name
				// #ifdef APP-NVUE
				// 目前安卓nvue下，由于overflow只能为hidden，所以布局上的原因，暂不支持steps和tooltip等组件
				if(uni.$u.os() === 'android') {
					const noSupportForAndroid = ['steps']
					for(let i = 0; i < noSupportForAndroid.length; i ++) {
						if(path.indexOf(noSupportForAndroid[i]) > -1) {
							return uni.$u.toast('安卓nvue下暂不支持此组件')
						}
					}
				}
				// #endif
				uni.$u.route({
					url: path
				})
			},
		}
	}
</script>

<style>
	/* page {
		background-color: rgb(240, 242, 244);
	} */
</style>

<style lang="scss" >
	.u-cell-group__title__text {
		font-weight: bold;
	}

	.nav-wrap {
		padding: 15px;
		position: relative;
	}

	.lang {
		position: absolute;
		top: 15px;
		right: 15px;
	}

	.nav-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.nav-info {
		margin-left: 15px;
		
		&__title {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			
			&__language {
				margin-top: 15px;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;
			}
			
			&__text {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				color: $u-main-color;
				font-size: 25px;
				font-weight: bold;
				text-align: left;
			}
			
			&__jump {
				font-size: 12px;
				color: $u-primary;
				font-weight: normal;
				margin-left: 20px;
			}
		}
	}

	.logo {
		width: 70px;
		height: 70px;
		/* #ifndef APP-NVUE */
		height: auto;
		/* #endif */
	}

	.nav-slogan {
		color: $u-tips-color;
		font-size: 14px;
	}

	.nav-desc {
		margin-top: 10px;
		font-size: 14px;
		color: $u-content-color;
		line-height: 20px;
	}
</style>
