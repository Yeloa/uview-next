/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:44:35
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/actionSheet.js
 */

import theme from '../theme.js'

export default {
    // area-picker组件
    areaPicker: {
        value: '',
        province: true,
        city: true,
        county: true,
        show: false,
        showToolbar: true,
        title: '',
        loading: false,
        itemHeight: 44,
        cancelText: '取消',
        confirmText: '确定',
        cancelColor: theme.lightColor,
        confirmColor: theme.primary,
        visibleItemCount: 5,
        closeOnClickOverlay: false,
		immediateChange: false,
        round: '',
    }
}
