export default {
    props: {
        // 标题信息
        title: {
            type: String,
            default() {
                return uni.$u.props.section.title
            }
        },
        // 右边副标题内容
        subTitle: {
            type: String,
            default() {
                return uni.$u.props.section.subTitle
            }
        },
        // 是否显示右边的内容
        right: {
            type: Boolean,
            default() {
                return uni.$u.props.section.right
            }
        },
        fontSize: {
            type: [Number, String],
            default() {
                return uni.$u.props.section.fontSize
            }
        },
        // 主标题是否加粗
        bold: {
            type: Boolean,
            default() {
                return uni.$u.props.section.bold
            }
        },
        // 主标题的颜色
        color: {
            type: String,
            default() {
                return uni.$u.props.section.color
            }
        },
        // 右边副标题的颜色
        subColor: {
            type: String,
            default() {
                return uni.$u.props.section.subColor
            }
        },
        // 是否显示左边的竖条
        showLine: {
            type: Boolean,
            default() {
                return uni.$u.props.section.showLine
            }
        },
        // 左边竖线的颜色
        lineColor: {
            type: String,
            default() {
                return uni.$u.props.section.lineColor
            }
        },
        // 是否显示右边箭头
        arrow: {
            type: Boolean,
            default() {
                return uni.$u.props.section.arrow
            }
        },
    }
}
