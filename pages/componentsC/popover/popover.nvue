<template>
	<view class="u-page" @click="closeOutside">
		<card title="顶部" flex justifyBetween>
			<u-popover position="top-left" :content="text1">
				<u-button type="primary">顶部居左</u-button>
			</u-popover>
			<u-popover position="top" :content="text1">
				<u-button type="primary">顶部居中</u-button>
			</u-popover>

			<u-popover position="top-right" :content="text1">
				<u-button type="primary">顶部居右</u-button>
			</u-popover>
		</card>

		<card title="底部" flex justifyBetween>
			<u-popover position="bottom-left" :content="text1">
				<u-button type="primary">底部居左</u-button>
			</u-popover>

			<u-popover position="bottom" bgColor="#3c9cff" width="200px">
				<u-button type="primary">底部居中</u-button>
				<template v-slot:content>
					<view class="u-line">
						<text>我是自定义内容</text>
					</view>
					<view class="u-line">
						<text>我是自定义内容</text>
					</view>
				</template>
			</u-popover>

			<u-popover position="bottom-right" :content="text1">
				<u-button type="primary">底部居右</u-button>
			</u-popover>
		</card>

		<card title="左侧" flex justifyEnd>
			<view>
				<u-popover position="left-top" :content="text1">
					<u-button type="primary" :customStyle="{height: '100px',width: '200px'}">左侧顶</u-button>
				</u-popover>
				<view style="margin-top: 20px;">
					<u-popover position="left" :content="text1">
						<u-button type="primary" :customStyle="{height: '100px',width: '200px'}">左侧中</u-button>
					</u-popover>
				</view>
				<view style="margin-top: 20px;">
					<u-popover position="left-bottom" :content="text1">
						<u-button type="primary" :customStyle="{height: '100px',width: '200px'}">左侧底</u-button>
					</u-popover>
				</view>
			</view>
		</card>
		
		<card title="右侧" flex>
			<view>
				<u-popover position="right-top" :content="text1">
					<u-button type="primary" :customStyle="{height: '100px',width: '200px'}">右侧顶</u-button>
				</u-popover>
				<view style="margin-top: 20px;">
					<u-popover position="right" :content="text1">
						<u-button type="primary" :customStyle="{height: '100px',width: '200px'}">右侧中</u-button>
					</u-popover>
				</view>
				<view style="margin-top: 20px;">
					<u-popover position="right-bottom" :content="text1">
						<u-button type="primary" :customStyle="{height: '100px',width: '200px'}">右侧底</u-button>
					</u-popover>
				</view>
			</view>
		</card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text1: '我是气泡的内容',
			}
		},
		onLoad() {
			
		},
		methods: {
			closeOutside(){
				uni.$emit('u-popover-close')
			},
			click(index) {
				console.log('index', index);
			}
		}
	}
</script>

<style lang="scss">
	.u-page {
		
	}
</style>