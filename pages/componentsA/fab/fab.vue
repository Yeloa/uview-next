<template>
	<view class="u-page">
		<card title="按钮颜色">
			<u-radio-group v-model="type">
				<u-radio 
					v-for="item in typeOptions" 
					:key="item" 
					:name="item"
					:label="item"
					:custom-style="radioStyle"
				>
				</u-radio>
			</u-radio-group>
		</card>

		<card title="按钮位置">
			<u-radio-group v-model="position" direction="row">
				<u-radio 
					v-for="item in positionOptions" 
					:key="item" 
					:name="item"
					:label="item"
					:custom-style="radioStyle"
				>
				</u-radio>
			</u-radio-group>
		</card>

		<card title="菜单弹出方向">
			<u-radio-group v-model="direction" direction="row">
				<u-radio 
					v-for="item in directionOptions" 
					:key="item" 
					:name="item"
					:label="item"
					:custom-style="radioStyle"
				>
				</u-radio>
			</u-radio-group>
		</card>

		<card title="可拖动按钮">
			<u-radio-group v-model="draggable" direction="row">
				<u-radio name="auto" label="自动吸附" :custom-style="radioStyle"></u-radio>
				<u-radio name="free" label="自由拖动" :custom-style="radioStyle"></u-radio>
				<u-radio name="none" label="不可拖动" :custom-style="radioStyle"></u-radio>
			</u-radio-group>
		</card>

		<card title="展开/收起控制">
			<u-switch v-model="active1" ></u-switch>
		</card>

		<card title="禁用状态">
			<u-switch v-model="disabled" ></u-switch>
		</card>

		<card title="自定义触发器">
			<u-switch v-model="customTrigger" ></u-switch>
		</card>
		
		<u-fab 
			v-if="customTrigger"
			:active="active1"
			:type="type" 
			:draggable="draggable"
			:position="position" 
			:direction="direction"
			:disabled="disabled"
			@click="handleCustomClick"
		>
			<template v-slot:trigger>
				<u-button type="error" shape="circle">
					<text>自定义按钮</text>
				</u-button>
			</template>
		</u-fab>

		<u-fab
			v-else
			:active="active1"
			:type="type" 
			:draggable="draggable"
			:position="position" 
			:direction="direction"
			:disabled="disabled"
		>
			<u-button 
				@click="showToast('分享')" 
				:disabled="disabled" 
				type="primary" 
				shape="circle"
				icon="share-fill"
				:custom-style="buttonStyle"
			>
			</u-button>
			<u-button 
				@click="showToast('收藏')" 
				:disabled="disabled" 
				type="success" 
				shape="circle"
				icon="star-fill"
				:custom-style="buttonStyle"
			>
			</u-button>
			<u-button 
				@click="showToast('打赏')" 
				:disabled="disabled" 
				type="error" 
				shape="circle"
				icon="rmb-circle-fill" 
				:custom-style="buttonStyle"
			>
			</u-button>
			<u-button 
				@click="showToast('点赞')" 
				:disabled="disabled" 
				type="warning" 
				shape="circle"
				icon="thumb-up-fill"
				:custom-style="buttonStyle"
			>
			</u-button>
		</u-fab>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active1: false,
				type: 'primary',
				position: 'right-bottom',
				direction: 'top',
				disabled: false,
				draggable: 'auto',
				typeOptions: ['primary', 'success', 'info', 'warning', 'error'],
				positionOptions: ['left-top', 'right-top', 'left-bottom', 'right-bottom', 'left-center', 'right-center', 'top-center', 'bottom-center'],
				directionOptions: ['top', 'right', 'bottom', 'left'],
				customTrigger: false,
				buttonStyle: {
					width: '40px',
					height: '40px',
					borderRadius: '20px',
					margin: '4px'
				},
				radioStyle: {
					marginRight: '16px',
					marginBottom: '8px'
				},
				checkboxStyle: {
					marginTop: '8px'
				}
			}
		},
		methods: {
			showToast(message) {
				uni.$u.toast(message)
			},
			
			openFab() {
				this.active2 = true
			},
			
			closeFab() {
				this.active2 = false
			},
			
			handleCustomClick() {
				this.showToast('自定义触发器被点击')
			}
		}
	}
</script>
