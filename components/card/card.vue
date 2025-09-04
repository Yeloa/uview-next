<template>
	<view class="card">
		<view class="card-title">
			<text class="card-title__text">{{title}}</text>
		</view>
		<view class="card-content" 
			:style="[contentStyle]">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '',
			},
			bgColor: {
				type: String,
				default: '#fff',
			},
			flex: {
				type: Boolean,
				default: false,
			},
			justifyBetween:{
				type: Boolean,
				default: false,
			},
			justifyEnd:{
				type: Boolean,
				default: false,
			},
			padding: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {
				
			}
		},
		computed: {
			contentStyle() {
				let style = {
					backgroundColor: this.bgColor,
				}

				if (this.flex) {
					style.display = 'flex';
					style.flexDirection = 'row';
					style.flexWrap = 'wrap';
					style.alignItems = 'center';
				}

				if (this.justifyBetween) {
					style.justifyContent = 'space-between';
				}
				if (this.justifyEnd) {
					style.justifyContent = 'flex-end';
				}
				
				if (this.padding) {
					style.padding = '10px';
					style.borderRadius = '5px';
				}

				return style;
			}
		},
		methods: {
			
		},
	}
</script>

<style lang="scss" scoped>
	.card{
		margin-top: 10px;
		&-title{
			padding: 5px;
			font-size: 14px;
			color: rgb(143, 156, 162);
		}
		&-content{
			margin-bottom: 10px;
			// box-shadow: 0 1px 10px rgba(0, 0, 0, 0.03);
			
		}
	}
</style>
