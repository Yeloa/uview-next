/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:12:37
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/steps.js
 */

import theme from '../theme.js'

export default {
    // steps组件
    steps: {
        direction: 'row',
        current: 0,
        activeColor: theme.primary,
        inactiveColor: theme.lightColor,
        activeIcon: '',
        inactiveIcon: '',
        dot: false
    }
}
