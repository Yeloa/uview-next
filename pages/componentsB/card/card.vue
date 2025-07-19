<template>
	<view class="">
		<view class="u-card-wrap">
			<u-card @click="click" @head-click="headClick" :title="title" :sub-title="subTitle" :thumb="thumb" :padding="padding" :border="border">
				<template #body> 
					<view class="u-body-item">
						<view class="u-body-item-title u-line-2" style="flex: 1;">
							瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半
						</view>
						<view>
							<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
						</view>
					</view>
					<view class="u-body-item">
						<view class="u-body-item-title u-line-2" style="flex: 1;">
							釉色渲染仕女图韵味被私藏，而你嫣然的一笑如含苞待放
						</view>
						<image src="https://img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg" mode="aspectFill"></image>
					</view>
				</template>
				<template #foot>
					<u-icon v-if="bottomSlot" name="chat-fill" size="20" label="30评论"></u-icon>
				</template>
			</u-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				padding:10,
				title: '素胚勾勒出青花，笔锋浓转淡素胚勾勒出青花，笔锋浓转淡',
				subTitle: '2020-05-15',
				thumb: 'https://img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
				bottomSlot: true,
			}
		},
		methods: {
			thumbChange(index) {
				this.thumb = index == 0 ? 'https://img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg' : '';
			},
			paddingChange(index) {
				this.padding = [20, 30, 40][index];
			},
			bottomChange(index) {
				this.bottomSlot = !index;
			},
			borderChange(index) {
				this.border = !index;
			},
			click(index) {
				console.log(index);
			},
			headClick(index) {
				console.log(index);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {
		padding-top: 0;
	}
	
	.u-card-wrap { 
		background-color: $u-bg-color;
		padding: 20px;
	}
	
	.u-body-item {
		font-size: 15px;
		color: #333;
		padding: 10px 5px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
		
	.u-body-item image {
		width:60px;
		flex: 0 0 60px;
		height: 60px;
		border-radius: 3px;
		margin-left: 6px;
	}
</style>
