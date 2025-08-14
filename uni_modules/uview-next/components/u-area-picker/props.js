import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js';

export default defineProps('areaPicker', {
    // 输入的值
    // #ifdef VUE2
	value: {
		type: [Array, String, Number],
        default: ''
	},
	// #endif
	// #ifdef VUE3
	modelValue: {
		type: [Array, String, Number],
        default: ''
	},
	// #endif
    // 是否展示picker弹窗
    show: {
        type: Boolean,
        default: false
    },
    // 是否显示省份
    province: {
        type: Boolean,
        default: true
    },
    // 是否显示城市
    city: {
        type: Boolean,
        default: true
    },
    // 是否显示区县
    county: {
        type: Boolean,
        default: true
    },
    // 是否展示顶部的操作栏
    showToolbar: {
        type: Boolean,
        default: true
    },
    // 顶部标题
    title: {
        type: String,
        default: ''
    },
    // 是否显示加载中状态
    loading: {
        type: Boolean,
        default: false
    },
    // 各列中，单个选项的高度
    itemHeight: {
        type: [String, Number],
        default: 44
    },
    // 取消按钮的文字
    cancelText: {
        type: String,
        default: () => uni.$u.$t('uAreaPicker.cancelText')
    },
    // 确认按钮的文字
    confirmText: {
        type: String,
        default: () => uni.$u.$t('uAreaPicker.confirmText')
    },
    // 取消按钮的颜色
    cancelColor: {
        type: String,
        default: theme.lightColor
    },
    // 确认按钮的颜色
    confirmColor: {
        type: String,
        default: theme.primary
    },
    // 每列中可见选项的数量
    visibleItemCount: {
        type: [String, Number],
        default: 5
    },
    // 是否允许点击遮罩关闭选择器
    closeOnClickOverlay: {
        type: Boolean,
        default: true
    },
	// 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，只在微信2.21.1及以上有效
	immediateChange: {
		type: Boolean,
		default: false
	},
	// 设置圆角值
	round: {
		type: String,
		default: ''
	},
	showInput: {
		type: Boolean,
		default: false
	},
    inputProps:{
        type: Object,
        default: () => ({
            placeholder: '请选择地区',
            separator: '/',
            clearable: true,
            disabled: true,
            backgroundColor: 'transparent',
            disabledColor: '#f5f7fa',
            placeholderClass: 'input-placeholder',
		    placeholderStyle: 'color: #c0c4cc',
            confirmType: 'done',
            focus: false,
            inputAlign: 'left',
            fontSize: '15px',
            color: theme.contentColor,
            prefixIcon: '',
            prefixIconStyle: '',
            suffixIcon: '',
            suffixIconStyle: '',
            border: 'surround',
            shape: 'square',
            round: '4px',
            borderColor: '',
        })
    }
})
