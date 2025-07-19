/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:15:59
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/modal.js
 */

import theme from '../theme.js'

export default {
    // modal 组件
    modal: {
        show: false,
        title: '',
        content: '',
        confirmText: '',
        cancelText: '',
        showConfirmButton: true,
        showCancelButton: false,
        confirmColor: theme.primary,
        confirmBgColor: theme.primary,
        cancelColor: theme.contentColor,
        cancelBgColor: theme.infoLight,
        buttonRound: '100px',
        buttonReverse: false,
        zoom: true,
        asyncClose: false,
        closeOnClickOverlay: false,
        negativeTop: 0,
        width: '650rpx',
        confirmButtonShape: '',
		duration: 200,
		round: '6px',
        buttonModel: 'text',
    }
}
