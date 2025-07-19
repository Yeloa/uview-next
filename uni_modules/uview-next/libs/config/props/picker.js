/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:18:20
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/picker.js
 */

import theme from '../theme.js'

export default {
    // picker
    picker: {
        value: '',
        show: false,
        showToolbar: true,
        title: '',
        columns: [],
        loading: false,
        itemHeight: 44,
        cancelText: '',
        confirmText: '',
        cancelColor: theme.lightColor,
        confirmColor: theme.primary,
        visibleItemCount: 5,
        keyName: 'text',
        valueName:'value',
        closeOnClickOverlay: true,
        defaultIndex: [],
		immediateChange: false,
        round: '',
    }
}
