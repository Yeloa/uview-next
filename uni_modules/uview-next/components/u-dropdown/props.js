export default {
    props: {
        // 未激活时的颜色
        inactiveColor: {
            type: String,
            default: ()=> uni.$u.props.dropdown.inactiveColor
        },
        // 激活时的颜色
        activeColor: {
            type: String,
            default: ()=> uni.$u.props.dropdown.activeColor
        },
        // 菜单的背景颜色
        bgColor: {
            type: String,
            default: ()=> uni.$u.props.dropdown.bgColor
        },
        // 菜单的圆角值
        round: {
            type: [Number, String],
            default: ()=> uni.$u.props.dropdown.round
        },
        // 点击遮罩是否关闭菜单
        closeOnClickMask: {
            type: Boolean,
            default: ()=> uni.$u.props.dropdown.closeOnClickMask
        },
        // 点击当前激活项标题是否关闭菜单
        closeOnClickSelf: {
            type: Boolean,
            default: ()=> uni.$u.props.dropdown.closeOnClickSelf
        },
        // 过渡时间
        duration: {
            type: [Number, String],
            default: ()=> uni.$u.props.dropdown.duration
        },
        // 标题菜单的高度
        height: {
            type: [Number, String],
            default: ()=> uni.$u.props.dropdown.height
        },
        // 是否显示下边框
        borderBottom: {
            type: Boolean,
            default: ()=> uni.$u.props.dropdown.borderBottom
        },
        // 标题的字体大小
        titleSize: {
            type: [Number, String],
            default: ()=> uni.$u.props.dropdown.titleSize
        },
        // 下拉出来的内容部分的圆角值
        borderRadius: {
            type: [Number, String],
            default: ()=> uni.$u.props.dropdown.borderRadius
        },
        // 菜单右侧的icon图标
        menuIcon: {
            type: String,
            default: ()=> uni.$u.props.dropdown.menuIcon
        },
        // 菜单右侧图标的大小
        menuIconSize: {
            type: [Number, String],
            default: ()=> uni.$u.props.dropdown.menuIconSize
        }
    }
}
