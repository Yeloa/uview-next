/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:51:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/fab.js
 */
export default {
    // fab组件
    fab: {
        // 是否激活
        active: false,
        // 类型
        type: 'primary',
        // 悬浮按钮位置
        position: 'right-bottom',
        // 按钮能否拖动
        draggable: 'auto',
        // 悬浮按钮菜单弹出方向
        direction: 'top',
        // 是否禁用
        disabled: false,
        // 悬浮按钮未展开时的图标
        inactiveIcon: 'plus',
        // 悬浮按钮展开时的图标
        activeIcon: 'close',
        // 悬浮按钮大小
        size: 56,
        // 自定义悬浮按钮层级
        zIndex: 9999,
        // 自定义悬浮按钮与可视区域边缘的间距
        gap: {
            top: 16,
            left: 16,
            right: 16,
            bottom: 16
        },
        // 用于控制点击时是否展开菜单
        expandable: true
    }
}
