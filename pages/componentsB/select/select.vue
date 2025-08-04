<template>
	<view class="u-page">
		<view class="u-demo-block">
			<text class="u-demo-block__title">基础用法</text>
			<view class="u-demo-block__content">
				<u-select 
					v-model="value1" 
					:list="options1" 
					placeholder="请选择城市"
					@change="onChange1"
				></u-select>
				<text class="u-result">选中值: {{ value1 }}</text>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">带标签</text>
			<view class="u-demo-block__content">
				<u-select 
					v-model="value2" 
					:list="options2" 
					label="选择性别"
					placeholder="请选择性别"
					@change="onChange2"
				></u-select>
				<text class="u-result">选中值: {{ value2 }}</text>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">不同边框样式</text>
			<view class="u-demo-block__content">
				<u-select 
					v-model="value5" 
					:list="options1" 
					border="bottom"
					placeholder="下边框"
					@change="onChange5"
				></u-select>
				<view style="height: 10px;"></view>
				<u-select 
					v-model="value6" 
					:list="options1" 
					border="none"
					placeholder="无边框"
					@change="onChange6"
				></u-select>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">文字对齐方式</text>
			<view class="u-demo-block__content">
				<u-select 
					v-model="value7" 
					:list="options1" 
					align="left"
					placeholder="左对齐"
					@change="onChange7"
				></u-select>
				<view style="height: 10px;"></view>
				<u-select 
					v-model="value8" 
					:list="options1" 
					align="center"
					placeholder="居中对齐"
					@change="onChange8"
				></u-select>
				<view style="height: 10px;"></view>
				<u-select 
					v-model="value9" 
					:list="options1" 
					align="right"
					placeholder="右对齐"
					@change="onChange9"
				></u-select>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">弹出位置</text>
			<view class="u-demo-block__content">
				<u-select 
					v-model="value14" 
					:list="options1" 
					placement="bottom"
					placeholder="底部弹出"
					@change="onChange14"
				></u-select>
				<view style="height: 10px;"></view>
				<u-select 
					v-model="value15" 
					:list="options1" 
					placement="top"
					placeholder="顶部弹出"
					@change="onChange15"
				></u-select>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">禁用状态</text>
			<view class="u-demo-block__content">
				<u-select 
					v-model="value10" 
					:list="options1" 
					:disabled="true"
					placeholder="禁用状态"
				></u-select>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">隐藏右侧按钮</text>
			<view class="u-demo-block__content">
				<u-select 
					v-model="value11" 
					:list="options1" 
					:showArrow="true"
					placeholder="隐藏右侧按钮"
					@change="onChange11"
				></u-select>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">文本换行</text>
			<view class="u-demo-block__content">
				<u-select 
					v-model="value12" 
					:list="options4" 
					:wrap="true"
					placeholder="长文本换行显示"
					@change="onChange12"
				></u-select>
			</view>
		</view>

		<view class="u-demo-block">
			<text class="u-demo-block__title">禁用选项</text>
			<view class="u-demo-block__content">
				<u-select 
					v-model="value16" 
					:list="options5" 
					placeholder="包含禁用选项"
					@change="onChange16"
				></u-select>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 基础用法
				value1: '',
				options1: [
					{ text: '北京', value: 'beijing' },
					{ text: '上海', value: 'shanghai' },
					{ text: '广州', value: 'guangzhou' },
					{ text: '深圳', value: 'shenzhen' },
					{ text: '杭州', value: 'hangzhou' }
				],
				
				// 带标签
				value2: '',
				options2: [
					{ text: '男', value: 'male' },
					{ text: '女', value: 'female' }
				],
				
				// 边框样式
				value4: '',
				value5: '',
				value6: '',
				
				// 文字对齐
				value7: '',
				value8: '',
				value9: '',
				
				// 弹出位置
				value14: '',
				value15: '',
				
				// 禁用状态
				value10: 'beijing',
				
				// 隐藏右侧按钮
				value11: '',
				
				// 文本换行
				value12: '',
				options4: [
					{ text: '这是一个很长的选项文本，用来测试换行功能是否正常工作', value: 'long1' },
					{ text: '另一个很长的选项，包含更多的文字内容，确保能够正确换行显示', value: 'long2' },
					{ text: '短选项', value: 'short' }
				],
				
				// 禁用选项
				value16: '',
				options5: [
					{ text: '选项1', value: 'option1' },
					{ text: '选项2', value: 'option2', disabled: true },
					{ text: '选项3', value: 'option3' },
					{ text: '选项4', value: 'option4', disabled: true }
				],
				
				// 事件监听
				value13: '',
				eventLogs: []
			}
		},
		methods: {
			// 基础用法
			onChange1(value) {
				console.log('基础用法变化:', value)
			},
			
			// 带标签
			onChange2(value) {
				console.log('性别选择变化:', value)
			},
			
			// 边框样式
			onChange4(value) {
				console.log('默认边框变化:', value)
			},
			onChange5(value) {
				console.log('下边框变化:', value)
			},
			onChange6(value) {
				console.log('无边框变化:', value)
			},
			
			// 文字对齐
			onChange7(value) {
				console.log('左对齐变化:', value)
			},
			onChange8(value) {
				console.log('居中对齐变化:', value)
			},
			onChange9(value) {
				console.log('右对齐变化:', value)
			},
			
			// 弹出位置
			onChange14(value) {
				console.log('底部弹出变化:', value)
			},
			onChange15(value) {
				console.log('顶部弹出变化:', value)
			},
			
			// 隐藏右侧按钮
			onChange11(value) {
				console.log('隐藏右侧按钮变化:', value)
			},
			
			// 文本换行
			onChange12(value) {
				console.log('文本换行变化:', value)
			},
			
			// 禁用选项
			onChange16(value) {
				console.log('禁用选项变化:', value)
			},
			
			// 事件监听
			onChange13(value) {
				this.addEventLog(`change事件: ${JSON.stringify(value)}`)
			},
			onOpen() {
				this.addEventLog('open事件: 下拉列表打开')
			},
			onClose() {
				this.addEventLog('close事件: 下拉列表关闭')
			},
			onClear(oldValue) {
				this.addEventLog(`clear事件: 清空选择，原值: ${JSON.stringify(oldValue)}`)
			}
		}
	}
</script>

<style lang="scss">
	.u-result {
		font-size: 12px;
		color: #909399;
		margin-top: 8px;
	}
	
	.u-demo-block__content {
		flex-direction: column !important;
		align-items: stretch;
	}
</style>
