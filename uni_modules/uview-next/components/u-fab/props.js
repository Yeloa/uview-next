export default {
    props: {
        // 是否激活
        active: {
            type: Boolean,
            default: ()=> uni.$u.props.fab.active
        },
        // 类型
        type: {
            type: String,
            default: ()=> uni.$u.props.fab.type
        },
        // 悬浮按钮位置
        position: {
            type: String,
            default: ()=> uni.$u.props.fab.position
        },
        // 按钮拖动模式：'auto'(自动吸附)、'free'(自由拖动)、'none'(不可拖动)
        draggable: {
            type: String,
            default: ()=> uni.$u.props.fab.draggable
        },
        // 悬浮按钮菜单弹出方向
        direction: {
            type: String,
            default: ()=> uni.$u.props.fab.direction
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: ()=> uni.$u.props.fab.disabled
        },
        // 悬浮按钮未展开时的图标
        inactiveIcon: {
            type: String,
            default: ()=> uni.$u.props.fab.inactiveIcon
        },
        // 悬浮按钮展开时的图标
        activeIcon: {
            type: String,
            default: ()=> uni.$u.props.fab.activeIcon
        },
        // 悬浮按钮大小
        size: {
            type: [String, Number],
            default: ()=> uni.$u.props.fab.size
        },
        // 自定义悬浮按钮层级
        zIndex: {
            type: [String, Number],
            default: ()=> uni.$u.props.fab.zIndex
        },
        // 自定义悬浮按钮与可视区域边缘的间距
        gap: {
            type: Object,
            default: ()=> uni.$u.props.fab.gap
        },
        // 用于控制点击时是否展开菜单
        expandable: {
            type: Boolean,
            default: ()=> uni.$u.props.fab.expandable
        }
    }
}
