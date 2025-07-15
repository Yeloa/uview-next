/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:03:12
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/radioGroup.js
 */

import theme from '../theme.js'

export default {
    // radio-group组件
    radioGroup: {
        value: '',
        disabled: false,
        shape: 'circle',
        activeColor: theme.primary,
        inactiveColor: theme.lightColor,
        name: '',
        size: 18,
        placement: 'row',
        label: '',
        labelColor: theme.mainColor,
        labelSize: 14,
        labelDisabled: false,
        activeLabelColor: null,
        iconColor: '#ffffff',
        iconSize: 12,
        borderBottom: false,
        iconPlacement: 'left',
        plain: true
    }
}
