import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js';

export default defineProps('color-picker', {
	// 绑定值
    // #ifdef VUE2
    value: {
        type: String,
        default: '',
    },
    // #endif
    // #ifdef VUE3
    modelValue: {
        type: String,
        default: '',
    },
    // #endif
    defaultColor: {
        type: String,
        default: theme.primary,
    },
    // 是否插入模式
    insert: {
        type: Boolean,
        default: false
    },
    // 是否显示日历弹窗
    show: {
        type: Boolean,
        default: false
    },
    closeable: {
        type: Boolean,
        default: true
    },
    // 是否允许点击遮罩关闭日历
    closeOnClickOverlay: {
        type: Boolean,
        default: true
    },
    title:{
        type: String,
        default: () => uni.$u.$t('uColorPicker.title')
    },
    zIndex:{
        type: [String, Number],
        default: 10010
    },
    // 圆角值
    round: {
        type: [String, Number],
        default: 6
    },
    showPresets: {
        type: Boolean,
        default: true
    },
	// 是否禁用颜色选择器
	disabled: {
		type: Boolean,
		default: false
	},
    confirmShape: {
        type: String,
        default: 'circle'
    },
    confirmText:{
        type: String,
        default: () => uni.$u.$t('uColorPicker.confirmText')
    },
	// 预设的颜色分组
	presets: {
		type: Array,
		default: () => ([
            {
                label: '推荐颜色',
                colors: [
                    '#FF0000', // 红色
                    '#FF8C00', // 橙色
                    '#FFD700', // 金色
                    '#00FF00', // 绿色
                    '#00BFFF', // 深天蓝
                    '#0000FF', // 蓝色
                    '#8A2BE2', // 紫罗兰
                    '#FF00FF', // 洋红
                    '#000000', // 黑色
                    '#666666', // 中灰
                    '#CCCCCC', // 浅灰
                    '#1890FF', // 蓝色
                    '#52C41A', // 绿色
                    '#FAAD14', // 黄色
                    '#F5222D', // 红色
                    '#FF6B6B', // 珊瑚红
                    '#FFB366', // 浅橙色
                    '#4ECDC4' // 青绿色 
                ]
            }
        ])
	}
});
