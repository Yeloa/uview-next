export default {
    props: {
        // 右边锚点非激活的颜色
        inactiveColor: {
            type: String,
            default() {
                return uni.$u.props.indexList.inactiveColor
            }
        },
        // 右边锚点激活的颜色
        activeColor: {
            type: String,
            default() {
                return uni.$u.props.indexList.activeColor
            }
        },
        // 索引字符列表，数组形式
        indexList: {
            type: Array,
            default() {
                return uni.$u.props.indexList.indexList
            }
        },
        // 是否开启锚点自动吸顶
        sticky: {
            type: Boolean,
            default() {
                return uni.$u.props.indexList.sticky
            }
        },
        // 自定义导航栏的高度
        customNavHeight: {
            type: [String, Number],
            default() {
                return uni.$u.props.indexList.customNavHeight
            }
        }
    }
}
