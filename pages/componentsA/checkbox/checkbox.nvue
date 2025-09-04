<template>
	<view class="u-page">
		<card title="基本案例">
			<text class="u-block__title">苹果、香蕉和橙子哪个最甜？</text>
			<u-checkbox-group
				v-model="checkboxValue1"
				placement="column"
				@change="checkboxChange"
			>
				<u-checkbox
					:customStyle="{marginBottom: '8px'}"
					v-for="(item, index) in checkboxList1"
					:key="index"
					:label="item.name"
					:name="item.name"
				>
				</u-checkbox>
			</u-checkbox-group>
		</card>
		
		<card title="自定义形状">
			<text class="u-block__title">中国四大名著是？</text>
			<u-checkbox-group
				v-model="checkboxValue2"
				placement="column"
				@change="checkboxChange"
				shape="circle"
			>
				<u-checkbox
					:customStyle="{marginBottom: '8px'}"
					v-for="(item, index) in checkboxList2"
					:key="index"
					:label="item.name"
					:name="item.name"
				>
				</u-checkbox>
			</u-checkbox-group>
		</card>
		
		<card title="按钮形状">
			<text class="u-block__title">选择你喜欢的频道？</text>
			<u-checkbox-group
				v-model="checkboxValue8"
				@change="checkboxChange"
				shape="button"
				:plain="false"
				inactiveColor="#f1f1f1"
			>
				<u-checkbox
					v-for="(item, index) in checkboxList8"
					:key="index"
					:label="item.name"
					:name="item.name"
				>
				</u-checkbox>
			</u-checkbox-group>
		</card>
		
		<card title="独立使用">
			<u-checkbox v-model:checked="checkboxValue9">
				<view style="display: flex; flex-direction: row; align-items: center;">
					<text>我已经阅读并同意</text>
					<text style="color:#007AFF" @click.stop="handleClick">《用户协议》</text>	
					<text>和</text>
					<text style="color:#007AFF" @click.stop="handleClick">《隐私政策》</text>
				</view>
			</u-checkbox>
			<view>
				状态：{{checkboxValue9}}
			</view>
		</card>
		
		<card title="中间状态">
			<u-checkbox :indeterminate="isIndeterminate" v-model:checked="checkboxValue9" label="全选"></u-checkbox>
		</card>
		
		<card title="是否禁用">
			<text class="u-block__title">下面什么东西不能吃？</text>
			<u-checkbox-group
				v-model="checkboxValue3"
				placement="column"
				@change="checkboxChange"
			>
				<u-checkbox
					:customStyle="{marginBottom: '8px'}"
					v-for="(item, index) in checkboxList3"
					:key="index"
					:label="item.name"
					:name="item.name"
					:disabled="index===0"
				>
				</u-checkbox>
			</u-checkbox-group>
		</card>
		
		<card title="是否禁止点击提示语选中复选框">
			<text class="u-block__title">北宋四大家是谁？</text>
			<u-checkbox-group
				v-model="checkboxValue4"
				placement="column"
				@change="checkboxChange"
				:labelDisabled="true"
			>
				<u-checkbox
					:customStyle="{marginBottom: '8px'}"
					v-for="(item, index) in checkboxList4"
					:key="index"
					:label="item.name"
					:name="item.name"
				>
				</u-checkbox>
			</u-checkbox-group>
		</card>
		
		<card title="自定义颜色">
			<text class="u-block__title">哪个颜色最好看？</text>
			<u-checkbox-group
				v-model="checkboxValue5"
				placement="column"
				@change="checkboxChange"
				activeColor="#19be6b"
			>
				<u-checkbox
					:customStyle="{marginBottom: '8px'}"
					v-for="(item, index) in checkboxList5"
					:key="index"
					:label="item.name"
					:name="item.name"
				>
				</u-checkbox>
			</u-checkbox-group>
		</card>
		
		<card title="横向排列形式">
			<text class="u-block__title">什么东西不能飞？</text>
			<u-checkbox-group
				v-model="checkboxValue6"
				@change="checkboxChange"
			>
				<u-checkbox
					:customStyle="{marginRight: '16px'}"
					v-for="(item, index) in checkboxList6"
					:key="index"
					:label="item.name"
					:name="item.name"
				>
				</u-checkbox>
			</u-checkbox-group>
		</card>
		
		<card title="横向两端排列形式">
			<text class="u-block__title">什么东西不能吃？</text>
			<u-checkbox-group
				v-model="checkboxValue7"
				@change="checkboxChange"
				:borderBottom="true"
				placement="column"
				iconPlacement="right"
			>
				<u-checkbox
					:customStyle="{marginBottom: '16px'}"
					v-for="(item, index) in checkboxList7"
					:key="index"
					:label="item.name"
					:name="item.name"
				>
				</u-checkbox>
			</u-checkbox-group>
		</card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isIndeterminate: true,
				// 基本案列数据
				checkboxList1: [{
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
					}
				],
				// u-checkbox-group的v-model绑定的值如果设置为某个checkbox的name，就会被默认选中
				checkboxValue1: ['苹果', '橙子'],

				// 自定义形状数据
				checkboxList2: [{
						name: '西游记',
						disabled: false
					},
					{
						name: '红楼梦',
						disabled: false
					},
					{
						name: '三国演义',
						disabled: false
					},
					{
						name: '水浒传',
						disabled: false
					}
				],
				// u-checkbox-group的v-model绑定的值如果设置为某个checkbox的name，就会被默认选中
				checkboxValue2: ['西游记', '红楼梦', '三国演义', '水浒传'],

				// 是否禁用数据
				checkboxList3: [{
						name: '冬瓜',
						disabled: false
					},
					{
						name: '西瓜',
						disabled: false
					},
					{
						name: '黄瓜',
						disabled: false
					},
					{
						name: '傻瓜',
						disabled: false
					}
				],
				// u-checkbox-group的v-model绑定的值如果设置为某个checkbox的name，就会被默认选中
				checkboxValue3: ['傻瓜'],

				// 是否禁止点击提示语选中复选框数据
				checkboxList4: [{
						name: '黄庭坚',
						disabled: false
					},
					{
						name: '欧阳修',
						disabled: false
					},
					{
						name: '苏小宝',
						disabled: false
					},
					{
						name: '王安石',
						disabled: false
					}
				],
				// u-checkbox-group的v-model绑定的值如果设置为某个checkbox的name，就会被默认选中
				checkboxValue4: ['黄庭坚', '欧阳修', '王安石'],

				//自定义颜色数据
				checkboxList5: [{
						name: '红色',
						disabled: false
					},
					{
						name: '黄色',
						disabled: false
					},
					{
						name: '绿色',
						disabled: false
					},
					{
						name: '蓝色',
						disabled: false
					}
				],
				// u-checkbox-group的v-model绑定的值如果设置为某个checkbox的name，就会被默认选中
				checkboxValue5: ['绿色'],

				//横向排列形式数据
				checkboxList6: [{
						name: '小鸟',
						disabled: false
					},
					{
						name: '游艇',
						disabled: false
					},
					{
						name: '轮船',
						disabled: false
					},
					{
						name: '飞机',
						disabled: false
					}
				],
				// u-checkbox-group的v-model绑定的值如果设置为某个checkbox的name，就会被默认选中
				checkboxValue6: ['游艇', '轮船'],

				//横向两端排列形式
				checkboxList7: [{
						name: '汽车',
						disabled: false
					},
					{
						name: '蒸汽机',
						disabled: false
					},
					{
						name: '猪肉',
						disabled: false
					},
					{
						name: '抄手',
						disabled: false
					}
				],
				// u-checkbox-group的v-model绑定的值如果设置为某个checkbox的name，就会被默认选中
				checkboxValue7: ['汽车', '蒸汽机'],

				checkboxList8: [{
						name: '汽车',
						disabled: false
					},
					{
						name: '亲子',
						disabled: false
					},
					{
						name: '教育',
						disabled: false
					},
					{
						name: '科技',
						disabled: false
					}
				],
				checkboxValue8: ['汽车', '教育'],
				checkboxValue9: true
			}

		},
		watch: {
			checkboxValue1(newValue, oldValue) {
				console.log('v-model', newValue);
			}
		},
		methods: {
			handleClick() {
				uni.navigateTo({
					url: '/pages/example/components'
				})
			},
			checkboxChange(n) {
				 console.log('change', n);
			}
		}
	}
</script>

<style lang="scss">
	.u-page {}
</style>
