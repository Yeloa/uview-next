/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:23:14
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tabs.js
 */

import theme from '../theme.js'

export default {
    //
    tabs: {
        duration: 300,
        list: [],
        lineColor: theme.primary,
        activeStyle: {
            color: theme.contentColor
        },
        inactiveStyle: {
            color: theme.lightColor
        },
        lineWidth: 20,
        lineHeight: 3,
        lineBgSize: 'cover',
        itemStyle: {
            height: '44px'
        },
        scrollable: true,
		current: 0,
		keyName: 'name'
    }
}
