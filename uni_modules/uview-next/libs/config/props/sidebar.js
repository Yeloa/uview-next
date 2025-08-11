/*
 * @Author       : LQ
 * @Description  : sidebar组件配置文件
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:03:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/sidebar.js
 */

import theme from '../theme.js'

export default {
    // sidebar组件
    sidebar: {
        // 当前导航项的索引
        modelValue: 0,
        // 宽度
        width: '100px',
        // 字体大小
        fontSize: '14px',
        // 行高
        lineHeight: '22px',
        // 文本颜色
        textColor: theme.mainColor,
        // 禁用文本颜色
        disabledColor: theme.disabledColor,
        // 禁用背景颜色
        disabledBgColor: '',
        // 背景色
        bgColor: theme.bgColor,
        // 激活时文本颜色
        activeColor: theme.mainColor,
        // 激活时背景颜色
        activeBgColor: 'white',
        // 激活时是否加粗
        activeBold: true,
        // 激活时的样式
        activeStyle: {},
        // 非激活时的样式
        inactiveStyle: {},
        // 是否显示滑块
        showLine: true,
        // 滑块长度
        lineWidth: '4px',
        // 滑块高度
        lineHeight: '16px',
        // 滑块颜色
        lineColor: theme.primary,
        // 滑块背景显示大小，当滑块背景设置为图片时使用
        lineBgSize: 'cover',
    }
}
