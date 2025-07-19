/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:52:43
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/calendar.js
 */

import theme from '../theme.js'

export default {
    // calendar 组件
    calendar: {
        title: '',
        showTitle: true,
        showSubtitle: true,
        mode: 'single',
        startText: '',
        endText: '',
        customList: [],
        shape: 'square',
        color: theme.primary,
        minDate: 0,
        maxDate: 0,
        defaultDate: null,
        maxCount: Number.MAX_SAFE_INTEGER, // Infinity
        rowHeight: 56,
        showLunar: false,
        showMark: true,
        confirmText: '',
        confirmDisabledText: '',
        show: false,
        closeOnClickOverlay: true,
        readonly: false,
        showConfirm: true,
        maxRange: Number.MAX_SAFE_INTEGER, // Infinity
        rangePrompt: '',
        showRangePrompt: true,
        allowSameDay: false,
		round: 0,
		monthNum: 3,
		insert: false,
        disabledDate: null
    }
}
