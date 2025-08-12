<template>
	<u-popup :show="show" mode="bottom" :round="round" :mask-close-able="maskCloseable" :closeable="closeable" @close="handleClose">
		<view class="u-wx-auth">
			<view v-if="showHeader" class="u-wx-auth__header">
				<u-image :src="logo" width="50rpx" height="50rpx" shape="circle"></u-image>
				<text class="u-wx-auth__title">{{ appName || title }} 申请</text>
			</view>
			<view class="u-wx-auth__body">
				<view class="u-wx-auth__content">{{ content }}</view>
				<view class="u-wx-auth__tips">{{ tips }}</view>
				<view class="u-wx-auth__form">
					<u-form label-width="50">
						<u-form-item label="头像" :border-bottom="true">
							<button
								class="u-reset-button"
								style="margin: 0; padding: 0; width: auto"
								hover-class="none"
								open-type="chooseAvatar"
								@click="chooseAvatar"
								@chooseavatar="chooseAvatar"
							>
								<u-avatar :src="avatarUrl"></u-avatar>
							</button>
						</u-form-item>
						<u-form-item label="昵称" :border-bottom="true">
							<input v-model="nickname" class="h-80rpx" type="nickname" placeholder="请输入昵称" />
						</u-form-item>
					</u-form>
				</view>
			</view>
			<view class="u-wx-auth__footer">
				<u-button :disabled="!avatarUrl || !nickname" :throttle-time="1000" shape="circle" type="primary" hover-class="none" @click="handleSubmit">{{ confirmText }}</u-button>
			</view>
		</view>
	</u-popup>
</template>

<script>
import props from './props.js';
import mixin from '../../libs/mixin/mixin';
import mpMixin from '../../libs/mixin/mpMixin';

/**
 * WxAuth 微信授权组件
 * @description 微信授权组件，用于获取用户基本信息和权限设置
 * @property {Boolean}		show				是否显示授权弹窗（默认 false ）
 * @property {String}		logo				应用logo（默认 '' ）
 * @property {String}		title				应用标题（默认 '' ）
 * @property {String}		content				内容（默认 '获取您的昵称、头像' ）
 * @property {String}		tips				提示（默认 '以便为您提供更优质的服务' ）
 * @property {String}		confirmText			确认按钮文本（默认 '保存' ）
 * @property {Number}		round				圆角大小（默认 10 ）
 * @property {Boolean}		closeable			是否可关闭（默认 true ）
 * @property {Boolean}		maskCloseable		是否可点击遮罩关闭（默认 false ）
 * @event {Function}		confirm				确认授权时触发
 * @event {Function}		close				关闭弹窗时触发
 * @example <u-wx-auth :show="show" :logo="logo" :title="title" @confirm="onConfirm"></u-wx-auth>
 */
export default {
	name: 'u-wx-auth',
	mixins: [mpMixin, mixin, props],
	data() {
		return {
			avatarUrl: '',
			nickname: '',
		}
	},
	// #ifdef VUE3
	emits: ['update:show', 'confirm', 'close', 'chooseAvatar'],
	// #endif
	methods: {
		chooseAvatar(e) {
			const path = e.detail?.avatarUrl;
			if (path) {
				this.avatarUrl = path;
				this.$emit('chooseAvatar', path);
			}
		},
		// 关闭弹窗
		handleClose() {
			this.$emit('close');
		},
		// 提交处理
		handleSubmit() {
			// 基本信息验证
			if (!this.avatarUrl) {
				return uni.$u.toast('请上传头像');
			}
			if (!this.nickname) {
				return uni.$u.toast('请输入昵称');
			}
	
			this.$emit('confirm', {
				avatar: this.avatarUrl,
				nickname: this.nickname
			});
		}
	}
}
</script>
<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.u-wx-auth{
	padding: 20px;
	&__header{
		@include flex(row);
		align-items: center;
	}

	&__title{
		font-size: 15px;
		margin-left: 10px;
		font-weight: bold;
	}

	&__footer{
		margin-top: 30px;
	}

	&__form{
		margin-top: 30px;
	}

	&__content{
		margin-top: 10px;
		font-weight: bold;
		font-size: 14px;
	}

	&__tips{	
		margin-top: 5px;
		color: $u-tips-color;
		font-size: 13px;
	}

}

</style>