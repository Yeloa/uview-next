/*
 * @Author       : LQ
 * @Description  : sidebarItem组件配置文件
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:03:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/sidebarItem.js
 */

import theme from '../theme.js'

export default {
    // sidebarItem组件
    sidebarItem: {
        // 内容
        label: '',
        // 值，用于标识该项
        value: '',
        // 图标名称
        icon: '',
        // 图标大小
        iconSize: '20px',
        // 图标颜色
        iconColor: '#666',
        // 图标位置，支持 left 和 top
        iconPosition: 'left',
        // 右上角的角标提示信息
        badge: '',
        // 是否显示圆点，将会覆盖badge参数
        dot: false,
        // 是否禁用该项
        disabled: false
    }
}
