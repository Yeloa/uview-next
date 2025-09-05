import { defineProps } from '../../libs/util/props';

export default defineProps('grid', {
    // 分成几列
    col: {
        type: [String, Number],
        default: 3
    },
    // 是否显示边框
    border: {
        type: Boolean,
        default: false
    },
    // 宫格对齐方式，表现为数量少的时候，靠左，居中，还是靠右
    align: {
        type: String,
        default: 'left'
    },
    // 背景颜色
	bgColor: {
		type: String,
		default: ''
	},
	// 边框圆角
	round: {
		type: [String, Number],
		default: ''
	},
    // 给col添加间距，左右边距各占一半
    gutter: {
        type: [String, Number],
        default: 0
    }
})
