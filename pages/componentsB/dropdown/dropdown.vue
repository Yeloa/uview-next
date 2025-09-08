<template>
	<view>
		<view class="u-demo-block">
			<text class="u-demo-block__title" style="margin-left: 15px;margin-top: 15px;">基础功能</text>
			<view class="u-demo-block__content">
				<u-dropdown>
					<u-dropdown-item v-model="value1" title="距离" :options="options1"></u-dropdown-item>
					<u-dropdown-item v-model="value2" title="温度" :options="options2"></u-dropdown-item>
					<u-dropdown-item title="属性">
						<view style="padding: 15px;">

							<u-slider v-model="rangeValue" @change="onChange" max="500" :showValue="true" :range="true"></u-slider>
							
							<u-radio-group v-model="radiovalue1" shape="button" activeBorderColor="#f00">
								<u-radio
									:customStyle="{marginRight: '8px'}"
									v-for="(item, index) in radiolist1"
									:key="index"
									:label="item.name"
									:name="item.name"
								>
								</u-radio>
							</u-radio-group>
							<view style="margin-top: 20px;">
								<u-button type="primary" shape="circle" size="small">确定</u-button>
							</view>
						</view>
					</u-dropdown-item>
				</u-dropdown>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title" style="margin-left: 15px;margin-top: 15px;">自定义菜单</text>
			<view class="u-demo-block__content">
				<u-dropdown activeColor="#f00">
					<u-dropdown-item v-model="value1" title="距离" :options="options1"></u-dropdown-item>
					<u-dropdown-item v-model="value2" :options="options2">
						<template #label="{active}">
							<text>插槽 {{active}}</text>
						</template>
					</u-dropdown-item>
					<u-dropdown-item disabledClick>
						<template #label>
							<text @click="handleClick">筛选</text>
						</template>
					</u-dropdown-item>
				</u-dropdown>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title" style="margin-left: 15px;margin-top: 15px;">自定义样式</text>
			<view class="u-demo-block__content">
				<u-dropdown activeColor="#f00">
					<u-dropdown-item v-model="value1" title="距离" :options="options1"></u-dropdown-item>
					<u-dropdown-item v-model="value2" title="温度" :options="options2"></u-dropdown-item>
				</u-dropdown>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title" style="margin-left: 15px;margin-top: 15px;">设置禁用</text>
			<view class="u-demo-block__content">
				<u-dropdown activeColor="#f00">
					<u-dropdown-item v-model="value1" title="距离" :options="options1" disabled></u-dropdown-item>
					<u-dropdown-item v-model="value2" title="温度" :options="options2" disabled></u-dropdown-item>
				</u-dropdown>
			</view>
		</view>

		<u-popup :show="show" mode="right" @close="handleClose" width="200">
			<view>
				<text>自定义筛选内容</text>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				value1: 1,
				value2: 2,
				rangeValue: [50, '500'],
				radiovalue1: '苹果',
				// 基本案列数据
				radiolist1: [{
						name: '苹果',
						disabled: false
					},
					{
						name: '香蕉',
						disabled: false
					},
					{
						name: '橙子',
						disabled: false
					}, {
						name: '榴莲',
						disabled: false
					}
				],
				options1: [{
						label: '默认排序',
						value: 1,
					},
					{
						label: '距离优先',
						value: 2,
					},
					{
						label: '价格优先',
						value: 3,
					}
				],
				options2: [{
						label: '去冰',
						value: 1,
					},
					{
						label: '加冰',
						value: 2,
					},
				],
			}
		},
		methods: {
			onChange(value) {
				console.log(value)
			},
			handleClose() {
				this.show = false
			},
			handleClick() {
				this.show = true
				console.log('handleClick')
			}
		}
	}
</script>
<style>
/* #ifndef APP-NVUE */
page {
	background-color: #f5f5f5;
	padding: 0;
}
/* #endif */
</style>
