<template>
	<view class="u-page">
		<card title="基础功能">
			<u-circle-progress 
				:percent="percentage1" 
				:width="120" 
				:height="120"
			>
				{{ percentage1 }}%
			</u-circle-progress>
		</card>
		
		<card title="多彩样式" flex>
			<u-circle-progress 
				:percent="percentage2" 
				:width="120" 
				:height="120"
				:stroke-width="6"
				active-color="#ff6b6b"
				inactive-color="#ffe0e0"
				:show-percent="true"
				:font-size="14"
				font-color="#ff6b6b"
			></u-circle-progress>
		
			<u-circle-progress 
				:percent="percentage3" 
				:width="120" 
				:height="120"
				:stroke-width="6"
				active-color="#4ecdc4"
				inactive-color="#e0f7f5"
				:show-percent="true"
				:font-size="14"
				font-color="#4ecdc4"
			></u-circle-progress>
		
			<u-circle-progress 
				:percent="percentage4" 
				:width="120" 
				:height="120"
				:stroke-width="6"
				active-color="#ffa726"
				inactive-color="#fff3e0"
				:show-percent="true"
				:font-size="14"
				font-color="#ffa726"
			></u-circle-progress>
		</card>
		<card title="交互控制">
			<u-circle-progress 
				:percent="percentage6" 
				active-color="#9c27b0"
				inactive-color="#f3e5f5"
				:show-percent="true"
				font-color="#9c27b0"
			></u-circle-progress>

			<view class="button-group">
				<view class="button-group__circle" hover-class="u-hover-class" @click="computedWidth('minus')">
					<text class="button-group__circle__text">减少</text>
				</view>
				<view class="button-group__circle" hover-class="u-hover-class" @click="computedWidth('plus')">
					<text class="button-group__circle__text">增加</text>
				</view>
			</view>
		</card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				androidNvue: false,
				percentage1: 30,
				percentage2: 40,
				percentage3: 50,
				percentage4: 60,
				percentage5: 70,
				percentage6: 50,
			}
		},
		onLoad() {
			uni.$u.sleep(2500).then(() => {
				this.percentage1 = 100
			})
		},
		methods: {
			computedWidth(type) {
				if(type === 'plus') {
					this.percentage6 = uni.$u.range(0, 100, this.percentage6 + 10)
				} else {
					this.percentage6 = uni.$u.range(0, 100, this.percentage6 - 10)
				}
			}
		},
	}
</script>

<style lang="scss">

.button-group {
	display: flex;
	flex-direction: row;
	justify-content: center;
	
	&__circle {
		width: 50px;
		height: 50px;
		background-color: #dbfbdb;
		border-radius: 100px;
		justify-content: center;
		align-items: center;
		margin: 30px 30px;
	
		&__text {
			color: rgb(25, 190, 107);
			font-size: 13px;
		}
	}
}
</style>
