/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:55:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/code.js
 */

export default {
    // select组件
    select: {
        // 默认值
        value: '',
        // 本地数据，格式 [{text:'',value:''}]
        list: [],
        // 是否显示清除控件
        clearable: true,
        // 没有数据时显示的文字，本地数据无效
        emptyText: '暂无数据',
        // 左侧标题
        label: '',
        // 输入框的提示文字
        placeholder: '请选择',
        // placeholder的样式
        placeholderStyle: '',
        // 背景颜色
        backgroundColor: '#ffffff',
        // 圆角值
        round: 4,
        // 边框颜色
        borderColor: '#dcdfe6',
        // 是否禁用
        disabled: false,
        // 禁用状态时的背景色
        disabledColor: '#f5f7fa',
        // 是否允许选中文本换行显示
        wrap: false,
        // 弹出位置
        placement: 'bottom',
        // 选择文字的位置
        align: 'left',
        // 是否显示箭头
        showArrow: false,
        // 边框样式
        border: 'surround',
        // 自定义样式
        customStyle: {}
    }
}
