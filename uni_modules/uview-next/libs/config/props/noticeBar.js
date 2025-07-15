/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:17:13
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/noticeBar.js
 */

import theme from '../theme.js'

export default {
    // noticeBar
    noticeBar: {
        text: [],
        direction: 'row',
        step: false,
        icon: 'volume',
        mode: '',
        color: theme.warning,
        bgColor: theme.bgColor,
        speed: 80,
        fontSize: 14,
        duration: 2000,
        disableTouch: true,
        url: '',
        linkType: 'navigateTo'
    }
}
