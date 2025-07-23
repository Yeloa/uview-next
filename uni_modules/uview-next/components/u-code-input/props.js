export default {
    props: {
		// 输入框类型
		type: {
			type: String,
			default: ()=> uni.$u.props.codeInput.type
		},
        // 设置右下角按钮的文字，有效值：send|search|next|go|done，兼容性详见uni-app文档
		// https://uniapp.dcloud.io/component/input
		// https://uniapp.dcloud.io/component/textarea
		confirmType: {
			type: String,
			default: ()=> uni.$u.props.codeInput.confirmType
		},
		// 点击键盘右下角按钮时是否保持键盘不收起，H5无效
		confirmHold: {
			type: Boolean,
			default: ()=> uni.$u.props.codeInput.confirmHold
		},
		// 键盘弹起时，是否自动上推页面
		adjustPosition: {
			type: Boolean,
            default: ()=> uni.$u.props.codeInput.adjustPosition
		},
        // 最大输入长度
        maxlength: {
            type: [String, Number],
            default: ()=> uni.$u.props.codeInput.maxlength
        },
        // 是否用圆点填充
        dot: {
            type: Boolean,
            default: ()=> uni.$u.props.codeInput.dot
        },
        // 显示模式，box-盒子模式，line-底部横线模式
        mode: {
            type: String,
            default: ()=> uni.$u.props.codeInput.mode
        },
        // 是否细边框
        hairline: {
            type: Boolean,
            default: ()=> uni.$u.props.codeInput.hairline
        },
        // 字符间的距离
        space: {
            type: [String, Number],
            default: ()=> uni.$u.props.codeInput.space
        },
        // 预置值
        // #ifdef VUE2
        value: {
            type: [String, Number],
            default: ()=> uni.$u.props.codeInput.value
        },
        // #endif
        // #ifdef VUE3
        modelValue: {
            type: [String, Number],
            default: ()=> uni.$u.props.codeInput.modelValue
        },
        // #endif
        // 是否自动获取焦点
        focus: {
            type: Boolean,
            default: ()=> uni.$u.props.codeInput.focus
        },
        // 字体是否加粗
        bold: {
            type: Boolean,
            default: ()=> uni.$u.props.codeInput.bold
        },
        // 字体颜色
        color: {
            type: String,
            default: ()=> uni.$u.props.codeInput.color
        },
        // 字体大小
        fontSize: {
            type: [String, Number],
            default: ()=> uni.$u.props.codeInput.fontSize
        },
        // 输入框的大小，宽等于高
        size: {
            type: [String, Number],
            default: ()=> uni.$u.props.codeInput.size
        },
        // 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true
        disabledKeyboard: {
            type: Boolean,
            default: ()=> uni.$u.props.codeInput.disabledKeyboard
        },
        // 边框和线条颜色
        borderColor: {
            type: String,
            default: ()=> uni.$u.props.codeInput.borderColor
        },
		// 是否禁止输入"."符号
		disabledDot: {
			type: Boolean,
			default: ()=> uni.$u.props.codeInput.disabledDot
		},
        // 背景颜色
        bgColor: {
            type: String,
            default: ()=> uni.$u.props.codeInput.bgColor
        },
        //设置圆角值
        round: {
            type: [String, Number],
            default: ()=> uni.$u.props.codeInput.round
        }
    }
}
