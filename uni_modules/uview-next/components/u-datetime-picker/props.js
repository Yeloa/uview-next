import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js';

export default defineProps('datetimePicker', {
    // 是否打开组件
    show: {
        type: Boolean,
        default: false,
    },
    // 是否展示顶部的操作栏
    showToolbar: {
        type: Boolean,
        default: true,
    },
    // 绑定值
    // #ifdef VUE2
    value: {
        type: [String, Number],
        default: '',
    },
    // #endif
    // #ifdef VUE3
    modelValue: {
        type: [String, Number],
        default: '',
    },
    // #endif
    // 顶部标题
    title: {
        type: String,
        default: '',
    },
    // 展示格式，mode=date为日期选择，mode=time为时间选择，mode=year-month为年月选择，mode=datetime为日期时间选择
    mode: {
        type: String,
        default: 'datetime',
    },
    // 可选的最大时间
    maxDate: {
        type: Number,
        // 最大默认值为后10年
        default: new Date(new Date().getFullYear() + 10, 0, 1).getTime(),
    },
    // 可选的最小时间
    minDate: {
        type: Number,
        // 最小默认值为前10年
        default: new Date(new Date().getFullYear() - 10, 0, 1).getTime(),
    },
    // 可选的最小小时，仅mode=time有效
    minHour: {
        type: Number,
        default: 0,
    },
    // 可选的最大小时，仅mode=time有效
    maxHour: {
        type: Number,
        default: 23,
    },
    // 可选的最小分钟，仅mode=time有效
    minMinute: {
        type: Number,
        default: 0,
    },
    // 可选的最大分钟，仅mode=time有效
    maxMinute: {
        type: Number,
        default: 59,
    },
    // 选项过滤函数
    filter: {
        type: [Function, null],
        default: null,
    },
    // 选项格式化函数
    formatter: {
        type: [Function, null],
        default: null,
    },
    // 是否显示加载中状态
    loading: {
        type: Boolean,
        default: false,
    },
    // 各列中，单个选项的高度
    itemHeight: {
        type: [String, Number],
        default: 44,
    },
    // 取消按钮的文字
    cancelText: {
        type: String,
        default: () => uni.$u.$t('uDatetimePicker.cancelText'),
    },
    // 确认按钮的文字
    confirmText: {
        type: String,
        default: () => uni.$u.$t('uDatetimePicker.confirmText'),
    },
    // 取消按钮的颜色
    cancelColor: {
        type: String,
        default: theme.tipsColor,
    },
    // 确认按钮的颜色
    confirmColor: {
        type: String,
        default: theme.primary,
    },
    // 每列中可见选项的数量
    visibleItemCount: {
        type: [String, Number],
        default: 5,
    },
    // 是否允许点击遮罩关闭选择器
    closeOnClickOverlay: {
        type: Boolean,
        default: true,
    },
    // 各列的默认索引
    defaultIndex: {
        type: Array,
       default: () => [],
    },
    immediateChange: {
        type: Boolean,
        default: false,
    },
    round: {
        type: [String, Number],
        default: '',
    },
    format: {
        type: String,
        default: '',
    },
    valueFormat: {
        type: String,
        default: '',
    },
    showInput: {
        type: Boolean,
        default: false,
    },
    inputProps: {
        type: Object,
        default: () => ({  
            placeholder: '请选择日期时间',
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
    },
});
