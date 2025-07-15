/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:03:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/ellipsis.js
 */

import theme from '../theme.js'

export default {
    // ellipsis组件
    ellipsis: {
        // 文本内容
        content: '',
        // 省略方向：start, end, middle
        position: 'end',
        // 行数
        rows: 1,
        // 展开文本
        expandText: '',
        // 收起文本
        collapseText: '',
        // 省略符号
        symbol: '...',
        // 行高
        lineHeight: 20,
        // 文本颜色
        color: theme.mainColor,
        // 文本大小
        fontSize: 14,
        // 展开/收起按钮颜色
        actionColor: theme.primary
    }
}
