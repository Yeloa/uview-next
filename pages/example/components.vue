<template>
	<view class="u-page">
		<view class="nav-wrap">
			<view class="nav-lang" @click="showLang = true">
				<u--image :showLoading="true" src="/static/uview/example/lang.png" width="18px" height="18px" />
			</view>
			<view class="nav-title">
				<u--image :showLoading="true" src="/static/uview/common/logo.png" width="70px" height="70px" />
				<view class="nav-info">
					<view class="nav-info__title">
						<text class="nav-info__title__text">uView Next</text>
						<text class="nav-info__title__version">{{ $u.config.version }}</text>
					</view>
					<view class="nav-slogan">企业级、高质量、更贴近业务场景</view>
				</view>
			</view>
			<text class="nav-desc">{{$t('index.desc')}}</text>
		</view>
		<view class="list-wrap">
			<view class="group" v-for="(item, index) in list" :key="index">
				<view class="group-title">{{ item.groupName }}</view>
				<u-row gutter="10" wrap>
					<u-col v-for="(item1, index1) in item.list" :key="index1" span="3" @click="openPage({ name: item1.path })">
						<view class="item">
							<u-icon :name="getIcon(item1.icon)" size="20" mode="widthFix"></u-icon>
							<text class="text">{{ item1.title }}</text>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<u-action-sheet round="10" title="选择语言" :actions="langList" :show="showLang" @select="changeLanguage"></u-action-sheet>
	</view>
</template>

<script >
	import list from "./components.config.js";
	import { fetchTest } from '@/common/api.js';

	export default {
		data() {
			return {
				shopData:[],
				list: list,
				desc: '',
				showLang: false,
				langList: [
					{
						name: '中文',
						lang: "zh-Hans",
					},
					{
						name: '繁体中文',
						lang: "zh-HK",
					},
					{
						name: '英文',
						lang: "en-US",
					},
					{
						name: '阿拉伯文',
						lang: "ar-SA",
					},
					{
						name: '德语',
						lang: "de-DE",
					},
					{
						name: '西班牙语',
						lang: "es-ES",
					},
					{
						name: '法语',
						lang: "fr-FR",
					},
					{
						name: '日语',
						lang: "ja-JP",
					},
					{
						name: '韩语',
						lang: "ko-KR",
					}
				]
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
			customSummaryMethod(){
				return ['合计', '合计1', '合计2', '合计3', '合计4'];
			},
			changeLanguage(event) {
				uni.$u.setLocale(event.lang)
				this.showLang = false
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

<style lang="scss" >
	.nav-wrap {
		padding: 15px;
		position: relative;
	}

	.nav-lang {
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
		margin-bottom: 5px;
	}

	.nav-info {
		margin-left: 15px;
		
		&__title {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			align-items: flex-end;
			
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
				background: linear-gradient(135deg, #6a8cff, #7ec8ff); 
				-webkit-background-clip: text; 
				color: transparent;
			}

			&__version {
				font-size: 12px;
				color: #888686;
				font-weight: normal;
				margin-left: 5px;
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
		font-size: 12px;
	}

	.nav-desc {
		font-size: 14px;
		color: $u-content-color;
		line-height: 20px;
	}

	.group-title {
		font-size: 13px;
		color: $u-content-color;
		margin-bottom: 5px;
		margin-left: 5px;
		margin-top: 15px;
	}

	.title {
		font-size: 14px;
		color: #ddd;
		line-height: 20px;
	}

	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: #fff;
		border-radius: 10px;
		height: 80px;
		margin-bottom: 10px;
		.text {
			margin-top: 5px;
			font-size: 13px;
			color: $u-content-color;
		}
	}
</style>
