import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js'

export default defineProps('cellGroup', {
    // 分组标题
    title: {
        type: String,
        default: ''
    },
    // 是否显示外边框
    border: {
        type: Boolean,
        default: true
    },
    // 背景颜色
	backgroundColor: {
		type: String,
		default: ''
	},
	// 边框圆角
	round: {
		type: String,
		default: ''
	},
	// 边框颜色
	borderColor: {	
		type: String,
		default: theme.borderColor
	}
})
