export default {
    props: {
        // tab的数据
        list: {
            type: Array,
            default() {
                return uni.$u.props.subsection.list
            }
        },
        // 当前活动的tab的index
        current: {
            type: [String, Number],
            default() {
                return uni.$u.props.subsection.current
            }
        },
        // 激活的颜色
        activeColor: {
            type: String,
            default() {
                return uni.$u.props.subsection.activeColor
            }
        },
        // 未激活的颜色
        inactiveColor: {
            type: String,
            default() {
                return uni.$u.props.subsection.inactiveColor
            }
        },
        // 模式选择，mode=button为按钮形式，mode=subsection时为分段模式
        mode: {
            type: String,
            default() {
                return uni.$u.props.subsection.mode
            }
        },
        // 字体大小
        fontSize: {
            type: [String, Number],
            default() {
                return uni.$u.props.subsection.fontSize
            }
        },
        // 激活tab的字体是否加粗
        bold: {
            type: Boolean,
            default() {
                return uni.$u.props.subsection.bold
            }
        },
        // mode = button时，组件背景颜色
        bgColor: {
            type: String,
            default() {
                return uni.$u.props.subsection.bgColor
            }
        },
		// 从list元素对象中读取的键名
		keyName: {
			type: String,
			default() {
                return uni.$u.props.subsection.keyName
		    }
        },
        shape: {
			type: String,
			default() {
                return uni.$u.props.subsection.shape
		    }
        },
        height: {
			type: [String, Number],
            default() {
                return uni.$u.props.subsection.height
		    }
        },
        barColor: {
			type: String,
			default() {
                return uni.$u.props.subsection.barColor
		    }
        },
    }
}
