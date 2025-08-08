export default {
    props: {
        // #ifdef VUE2
        value: {
            type: Number,
            default: () => uni.$u.props.dateStrip.value,
        },
        // #endif
        // #ifdef VUE3
        modelValue: {
            type: Number,
            default: () => uni.$u.props.dateStrip.modelValue,
        },
        // #endif
        // 默认选中的日期
        defaultDate: {
            type: Number,
            default: () => uni.$u.props.dateStrip.defaultDate,
        },
        // 切换模式：none 平铺展示所有日期，不展示切换按钮，week 按周方式切换
        mode: {
            type: String,
            default: () => uni.$u.props.dateStrip.mode,
        },

        // 可选择的最小日期
        minDate: {
            type: Number,
            default: () => uni.$u.props.dateStrip.minDate,
        },
        // 可选择的最大日期
        maxDate: {
            type: Number,
            default: () => uni.$u.props.dateStrip.maxDate,
        },
        // 插件高度
        height: {
            type: String,
            default: () => uni.$u.props.dateStrip.height,
        },
        // 每格日期宽度，
        itemWidth: {
            type: String,
            default: () => uni.$u.props.dateStrip.itemWidth,
        },
        // 每格日期圆角，
        itemRound: {
            type: String,
            default: () => uni.$u.props.dateStrip.itemRound,
        },
        // 选中框背景色
        activeBgColor: {
            type: String,
            default: () => uni.$u.props.dateStrip.activeBgColor,
        },
        // 选中框文本色
        activeColor: {
            type: String,
            default: () => uni.$u.props.dateStrip.activeColor,
        },
        // 选中框样式
        activeStyle: {
            type: Object,
            default: () => uni.$u.props.dateStrip.activeStyle,
        },
        // 横条背景色
        bgColor: {
            type: String,
            default: () => uni.$u.props.dateStrip.bgColor,
        },
        // 选中框圆角
        round: {
            type: String,
            default: () => uni.$u.props.dateStrip.round,
        },
        // 第一天从星期几开始，默认 0 = 周日
        firstDayOfWeek: {
            type: Number,
            default: () => uni.$u.props.dateStrip.firstDayOfWeek,
        },
        // 高亮模式：'both' 同时高亮星期和日期，'date' 只高亮日期，'text' 只高亮文本
        activeMode: {
            type: String,
            default: () => uni.$u.props.dateStrip.activeMode,
        },
        // 日期格式化函数
        formatter: {
            type: [Function, null],
            default: () => uni.$u.props.dateStrip.formatter,
        },
        // 最多展示月份数量
		monthNum: {
			type: [Number, String],
			default: ()=> uni.$u.props.dateStrip.monthNum
		},
        // 禁止选择的日期
        disabledDate: {
            type: [Array, String, null],
            default: ()=> uni.$u.props.dateStrip.disabledDate
        },
        // 禁用日期的文字颜色
        disabledColor: {
            type: String,
            default: ()=> uni.$u.props.dateStrip.disabledColor
        },
        // 是否显示农历
        showLunar: {
            type: Boolean,
            default: ()=> uni.$u.props.dateStrip.showLunar
        }
    },
};
