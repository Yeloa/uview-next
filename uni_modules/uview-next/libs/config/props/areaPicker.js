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
        cancelText: '',
        confirmText: '',
        cancelColor: theme.lightColor,
        confirmColor: theme.primary,
        visibleItemCount: 5,
        closeOnClickOverlay: true,
		immediateChange: false,
        round: '',
        showInput: false,
        inputProps: {
            placeholder: '请选择地区',
            separator: '/',
            clearable: true,
            disabled: true,
            backgroundColor: 'transparent',
            disabledColor: '#f5f7fa',
            placeholderClass: 'input-placeholder',
		    placeholderStyle: 'color: #c0c4cc',
            confirmType: 'done',
            focus: false,
            inputAlign: 'left',
            fontSize: '15px',
            color: theme.contentColor,
            prefixIcon: '',
            prefixIconStyle: '',
            suffixIcon: '',
            suffixIconStyle: '',
            border: 'surround',
            shape: 'square',
            round: '4px',
            borderColor: '',
        }
    }
}
