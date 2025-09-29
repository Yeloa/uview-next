<template>
	<view class="u-page">
		<card title="基础使用">
			<u-code-input
				v-model="value1"
				:maxlength="4"
				@change="change"
				@finish="finish"
			></u-code-input>
		</card>
		
		<card title="横线模式">
			<u-code-input
				v-model="value2"
				mode="line"
				:maxlength="4"
				:bold="true"
			></u-code-input>
		</card>
		
		<card title="设置长度">
			<u-code-input
				v-model="value3"
				:maxlength="6"
			></u-code-input>
		</card>
		
		<card title="设置间距">
			<u-code-input
				v-model="value4"
				mode="box"
				:space="0"
				:maxlength="4"
			></u-code-input>
		</card>
		
		<card title="细边框">
			<u-code-input
				v-model="value5"
				mode="box"
				:space="0"
				:maxlength="4"
				hairline
			></u-code-input>
			<view style="margin-top: 10px;">
				<u-code-input
					v-model="value6"
					mode="line"
					:space="10"
					:maxlength="4"
					hairline
				></u-code-input>
			</view>
		</card>
		
		<card title="调整颜色">
			<u-code-input
				v-model="value7"
				mode="box"
				:space="0"
				:maxlength="4"
				hairline
				color="#f56c6c"
				borderColor="#f56c6c"
			></u-code-input>
			
			<view style="margin-top: 10px;">
				<u-code-input
					v-model="value11"
					size="40"
					:maxlength="4"
					round="5"
					bgColor="#f3f3f3"
					borderColor="none"
				></u-code-input>
			</view>

			<view style="margin-top: 10px;">
				<u-code-input
					v-model="value10"
					mode="line"
					size="30"
					:maxlength="4"
					hairline
					color="#3c9cff"
					borderColor="#3c9cff"
				></u-code-input>
			</view>
		</card>
		
		<card title="点模式">
			<u-code-input
				v-model="value8"
				mode="box"
				dot
				:space="0"
				:maxlength="4"
				hairline
			></u-code-input>
		</card>
		
		<card title="预置内容">
			<u-code-input
				v-model="value9"
				mode="box"
				:space="0"
				:maxlength="4"
				hairline
				fontSize="17"
			></u-code-input>
		</card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value1: '',
				value2: '',
				value3: '',
				value4: '',
				value5: '',
				value6: '',
				value7: '',
				value8: '',
				value9: '123',
				value10: '34',
				value11:'',
			}
		},
		methods: {
			change(e) {
				console.log('change', e);
			},
			finish(e) {
				console.log('finish', e);
			}
		},
	}
</script>

<style lang="scss">

</style>
