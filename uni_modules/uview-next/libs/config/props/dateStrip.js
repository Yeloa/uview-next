/*
 * @Author       : AI Assistant
 * @Description  : dateStrip 日期横条组件默认配置
 * @version      : 1.0
 * @Date         : 2025-06-19
 * @FilePath     : /uview3.0/ui/src/uni_modules/uview-next/libs/config/props/dateStrip.js
 */
import theme from '../theme.js'

export default {
    // dateStrip组件
    dateStrip: {
        value: 0,
        modelValue: 0,
        defaultDate: '',
        mode: 'week',
        minDate: 0,
        maxDate: 0,
        height: '55px',
        monthNum: 1,
        itemWidth: '50px',
        itemRound: '6px',
        activeMode: 'both',
        activeBgColor: theme.primary,
        activeColor: '#ffffff',
        activeStyle: {},
        bgColor: '',
        round: '',
        firstDayOfWeek: 0,
        disabledDate: null,
        disabledColor: theme.disabledColor,
        showLunar: false
    }
} 