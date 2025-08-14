import { defineProps } from '../../libs/util/props';

export default defineProps('wxAuth', {
    show: {
		type: Boolean,
		default: false
	},
	logo: {
		type: String,
		default: ''
	},
	title: {
		type: String,
		default: ''
	},
	appName: {
		type: String,
		default: ''
	},
	showHeader:{
		type: Boolean,
		default: true
	},
	content: {
		type: String,
		default: '获取您的昵称、头像'
	},
	tips: {
		type: String,
		default: '以便为您提供更优质的服务'
	},
	round:{
		type: [Number, String],
		default: 10
	},
	closeable:{
		type: Boolean,
		default: true
	},
	maskCloseable:{
		type: Boolean,
		default: false
	},
	confirmText: {
		type: String,
		default: '保存'
	}
})