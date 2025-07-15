/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:12:20
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/subsection.js
 */

import theme from '../theme.js'
export default {
    // subsection组件
    subsection: {
        list: [],
        current: 0,
        activeColor: theme.primary,
        inactiveColor: theme.contentColor,
        mode: 'button',
        fontSize: 12,
        bold: true,
        bgColor: theme.bgColor,
        barColor: '',
		keyName: 'name',
        shape:'square',
        height:30,
    }
}
