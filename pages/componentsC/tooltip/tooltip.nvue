<template>
	<view class="u-page">
		<card title="基础使用">
			<u-tooltip
			    :text="text1"
				overlay
			></u-tooltip>
		</card>
		<card title="下方显示">
			<view style="padding-bottom: 30px;">
				<u-tooltip
				    :text="text2"
					direction="bottom"
				></u-tooltip>
			</view>
		</card>
		<card title="扩展按钮">
			<u-tooltip
			    :text="text3"
				:buttons="buttons1"
				@click="click"
			></u-tooltip>
		</card>
		<card title="自动调整位置">
			<u-tooltip
			    :text="text4"
				:buttons="buttons2"
			></u-tooltip>
		</card>
		<card title="高亮选中文本背景色">
			<u-tooltip
			    :text="text5"
				:buttons="buttons3"
				bgColor="#e3e4e6"
			></u-tooltip>
		</card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text1: '长按文本，上方提示',
				text2: '长按文本，下方提示',
				text3: '显示多个扩展按钮',
				text4: '自动调整气泡位置',
				text5: '长按文本，显示背景色',
				buttons1: ['扩展'],
				buttons2: ['扩展', '搜索', '翻译'],
				buttons3: ['扩展', '搜索', '翻译']
			}
		},
		onLoad() {
			
		},
		methods: {
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
