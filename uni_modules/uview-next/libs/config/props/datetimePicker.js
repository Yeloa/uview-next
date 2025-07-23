/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:57:48
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/datetimePicker.js
 */

import theme from '../theme.js'

export default {
    // datetimePicker 组件
    datetimePicker: {
        show: false,
        showToolbar: true,
        value: '',
        title: '',
        mode: 'datetime',
        maxDate: new Date(new Date().getFullYear() + 10, 0, 1).getTime(),
        minDate: new Date(new Date().getFullYear() - 10, 0, 1).getTime(),
        minHour: 0,
        maxHour: 23,
        minMinute: 0,
        maxMinute: 59,
        loading: false,
        itemHeight: 44,
        cancelText: '',
        confirmText: '',
        cancelColor: theme.tipsColor,
        confirmColor: theme.primary,
        visibleItemCount: 5,
        closeOnClickOverlay: true,
		immediateChange: false,
        round: '',
        defaultIndex: [],
        format: '',
        valueFormat: '',
		showInput: false,
        inputProps: {
            placeholder: '请选择日期时间',
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
        },
    }
}
