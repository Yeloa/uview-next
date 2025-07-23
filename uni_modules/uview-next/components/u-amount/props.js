export default {
    props: {
        // 金额数值
		value: {
			type: Number,
            default: ()=> uni.$u.props.amount.value
		},
		// #ifdef VUE3
		modelValue: {
			type: Number,
            default: ()=> uni.$u.props.amount.value
		},
		// #endif
        // 金融符号
        symbol: {
            type: String,
            default: ()=> uni.$u.props.amount.symbol
        },
        // 是否置后金额符号位置
        reverse: {
            type: Boolean,
            default: ()=> uni.$u.props.amount.reverse
        },
        // 数字精度，小数点后保留几位
        precision: {
            type: Number,
            default: ()=> uni.$u.props.amount.precision
        },
        // 数字精度取舍是否四舍五入
        roundUp: {
            type: Boolean,
            default: ()=> uni.$u.props.amount.roundUp
        },
        // 数字变化是否使用动画
        transition: {
            type: Boolean,
            default: ()=> uni.$u.props.amount.transition
        },
        // 数字变化动画时长
        duration: {
            type: Number,
            default: ()=> uni.$u.props.amount.duration
        },
        // 分隔符位置 (3为千分位，4为万分位)
        separatorDigits: {
            type: Number,
            default: ()=> uni.$u.props.amount.separatorDigits
        },
        // 分隔符
        separator: {
            type: String,
            default: ()=> uni.$u.props.amount.separator
        },
        // 是否显示金融符号
        showSymbol: {
            type: Boolean,
            default: ()=> uni.$u.props.amount.showSymbol
        },
        // 是否显示小数
        showDecimal: {
            type: Boolean,  
            default: ()=> uni.$u.props.amount.showDecimal
        },
        // 是否显示分隔符
        showSeparator: {
            type: Boolean,
            default: ()=> uni.$u.props.amount.showSeparator
        },
        // 数字是否转换为大写中文
        capital: {
            type: Boolean,
            default: ()=> uni.$u.props.amount.capital
        },
        // 整数字体大小
        fontSize: {
            type: String,
            default: ()=> uni.$u.props.amount.fontSize
        },
        // 金融符号小数与整数的比例或字体大小
        fontSizeRatio: {
            type: [String, Number],
            default: ()=> uni.$u.props.amount.fontSizeRatio
        },
        // 颜色
        color: {
            type: String,
            default: ()=> uni.$u.props.amount.color
        },
        // 金融符号与小数字体颜色
        colorRatio: {
            type: String,
            default: ()=> uni.$u.props.amount.colorRatio
        },
        // 自定义样式
        customStyle: {
            type: Object,
            default: ()=> uni.$u.props.amount.customStyle
        }
    }
} 