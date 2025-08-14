import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js'

export default defineProps('dateStrip', {
    // #ifdef VUE2
    value: {
        type: Number,
        default: 0,
    },
    // #endif
    // #ifdef VUE3
    modelValue: {
        type: Number,
        default: 0,
    },
    // #endif
    // 默认选中的日期
    defaultDate: {
        type: [String, Number],
        default: '',
    },
    // 切换模式：none 平铺展示所有日期，不展示切换按钮，week 按周方式切换
    mode: {
        type: String,
        default: 'week',
    },

    // 可选择的最小日期
    minDate: {
        type: Number,
        default: 0,
    },
    // 可选择的最大日期
    maxDate: {
        type: Number,
        default: 0,
    },
    // 插件高度
    height: {
        type: String,
        default: '55px',
    },
    // 每格日期宽度，
    itemWidth: {
        type: String,
        default: '50px',
    },
    // 每格日期圆角，
    itemRound: {
        type: String,
        default: '6px',
    },
    // 选中框背景色
    activeBgColor: {
        type: String,
        default: theme.primary,
    },
    // 选中框文本色
    activeColor: {
        type: String,
        default: '#ffffff',
    },
    // 选中框样式
    activeStyle: {
        type: Object,
        default: () => ({})
    },
    // 横条背景色
    bgColor: {
        type: String,
        default: '',
    },
    // 选中框圆角
    round: {
        type: String,
        default: '',
    },
    // 第一天从星期几开始，默认 0 = 周日
    firstDayOfWeek: {
        type: Number,
        default: 0,
    },
    // 高亮模式：'both' 同时高亮星期和日期，'date' 只高亮日期，'text' 只高亮文本
    activeMode: {
        type: String,
        default: 'both',
    },
    // 日期格式化函数
    formatter: {
        type: [Function, null],
        default: null,
    },
    // 最多展示月份数量
	monthNum: {
		type: [Number, String],
		default: 1
	},
    // 禁止选择的日期函数
    disabledFun: {
        type: [Function, null],
        default: null
    },
    // 禁止选择的日期
    disabledDate: {
        type: [Array, String, null],
        default: null
    },
    // 禁用日期的文字颜色
    disabledColor: {
        type: String,
        default: theme.disabledColor
    },
    // 是否显示农历
    showLunar: {
        type: Boolean,
        default: false
    },
    // 是否对小于10的数字补0
    padZero: {
        type: Boolean,
        default: false
    }
})
