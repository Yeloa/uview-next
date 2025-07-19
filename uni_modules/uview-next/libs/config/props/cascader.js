/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:55:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/cascader.js
 */

import theme from '../theme.js'

export default {
    // cascader 组件
    cascader: {
        // 是否显示级联选择器
        show: false,
        // 选择器标题
        title: '',
        // 选项数据
        options: [],
        // 当前选中值
        modelValue: '',
        // v-model 的别名
        value: '',
        // 占位符文本
        placeholder: '',
        // 自定义字段名
        field: {
            text: 'label',
            value: 'value', 
            children: 'children'
        },
        // 是否显示关闭按钮
        closeable: true,
        // 是否点击遮罩关闭
        closeOnClickOverlay: true,
        // 背景色
        bgColor: '#fff',
        // 主题色
        activeColor: theme.primary,
        // 选中背景色
        activeBgColor: '',
        // 选中文本加粗
        activeBold: false,
        // 文本色
        color: theme.mainColor,
        // 图标颜色
        iconColor: '',
        // 字体大小
        fontSize: '15px',
        // 标题字体大小
        titleFontSize: '18px',
        // 标题颜色
        titleColor: theme.mainColor,
        // 圆角值
        round: 0,
        // 层级
        zIndex: 10075,
        // 是否安全区域
        safeAreaInsetBottom: true,
        // 选项高度
        itemHeight: '40px'
    }
}
