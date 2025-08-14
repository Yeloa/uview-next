import { defineProps } from '../../libs/util/props';

export default defineProps('fab', {
    // 是否激活
    active: {
        type: Boolean,
        default: false
    },
    // 类型
    type: {
        type: String,
        default: 'primary'
    },
    // 悬浮按钮位置
    position: {
        type: String,
        default: 'right-bottom'
    },
    // 按钮拖动模式：'auto'(自动吸附)、'free'(自由拖动)、'none'(不可拖动)
    draggable: {
        type: String,
        default: 'auto'
    },
    // 悬浮按钮菜单弹出方向
    direction: {
        type: String,
        default: 'top'
    },
    // 是否禁用
    disabled: {
        type: Boolean,
        default: false
    },
    // 悬浮按钮未展开时的图标
    inactiveIcon: {
        type: String,
        default: 'plus'
    },
    // 悬浮按钮展开时的图标
    activeIcon: {
        type: String,
        default: 'close'
    },
    // 悬浮按钮大小
    size: {
        type: [String, Number],
        default: 56
    },
    // 自定义悬浮按钮层级
    zIndex: {
        type: [String, Number],
        default: 9999
    },
    // 自定义悬浮按钮与可视区域边缘的间距
    gap: {
        type: Object,
        default: () => ({
            top: 16,
            left: 16,
            right: 16,
            bottom: 16
        })
    },
    // 用于控制点击时是否展开菜单
    expandable: {
        type: Boolean,
        default: true
    }
})
