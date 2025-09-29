<template>
	<view class="u-page">
		<card title="基础使用">
			<u-input
				placeholder="请输入内容"
				border="surround"
				v-model="value"
				@change="change"
				readonly
			></u-input>
		</card>
		
		<card title="可清空内容">
			<u-input
				placeholder="请输入内容"
				border="surround"
				clearable
			></u-input>
		</card>
		
		<card title="数字键盘">
			<u-input
				placeholder="请输入内容"
				border="surround"
				type="number"
				clearable
			></u-input>
		</card>
		
		<card title="密码类型">
			<u-input
				placeholder="请输入内容"
				border="surround"
				password
				clearable
			></u-input>
		</card>
		
		<card title="自定义样式">
			<u-input
				placeholder="请输入内容"
				backgroundColor="#f5f5f5"
				border="none"
				clearable
			></u-input>
		</card>
		
		<card title="显示下划线">
			<u-input
				placeholder="请输入内容"
				border="bottom"
				clearable
			></u-input>
		</card>
		
		<card title="禁用状态">
			<u-input
				placeholder="禁用状态"
				border="surround"
				disabled
			></u-input>
		</card>
		
		<card title="圆形">
			<u-input
				placeholder="请输入内容"
				border="surround"
				shape="circle"
			></u-input>
		</card>
		
		<card title="前置图标">
			<u-input
				placeholder="前置图标"
				prefixIcon="search"
				prefixIconStyle="font-size: 22px;color: #909399"
			></u-input>
		</card>
		
		<card title="后置图标">
			<u-input
				placeholder="后置图标"
				suffixIcon="map-fill"
				suffixIconStyle="color: #909399"
			></u-input>
		</card>
		
		<card title="前置插槽">
			<u-input placeholder="前置插槽">
				<template #prefix>
					<u-text
						text="http://"
						margin="0 3px 0 0"
						type="tips"
					></u-text>
				</template>
			</u-input>
		</card>
		
		<card title="后置插槽">
			<u-input placeholder="后置插槽" v-model="smscode">
				<template #suffix>
					<u-code
						ref="uCode"
						@change="codeChange"
						seconds="20"
						changeText="X秒重新获取"
					></u-code>
					<u-button
						@tap="getCode"
						:text="tips"
						type="success"
						size="mini"
					></u-button>
				</template>
			</u-input>
		</card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips: '',
				value: '',
				smscode:''
			}
		},
		watch: {
			value(newValue, oldValue) {
				// console.log('v-model', newValue);
			}
		},
		methods: {
			
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			change(e) {
				console.log('change', e);
			}
		}
	}
</script>