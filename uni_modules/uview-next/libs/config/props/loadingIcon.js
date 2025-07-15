/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:45:47
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/loadingIcon.js
 */

import theme from '../theme.js'

export default {
    // loading-icon加载中图标组件
    loadingIcon: {
        show: true,
        color: theme.tipsColor,
        textColor: theme.tipsColor,
        vertical: false,
        mode: 'spinner',
        size: 24,
        textSize: 15,
        text: '',
        timingFunction: 'ease-in-out',
        duration: 1200,
        inactiveColor: ''
    }
}
