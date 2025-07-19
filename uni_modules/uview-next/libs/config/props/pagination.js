/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-23 19:51:50
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/pagination.js
 */
export default {
    // pagination
    pagination: {
        // 当前页码
        modelValue: 1,
        // 总记录数
        total: 0,
        // 每页显示的记录数
        pageSize: 3,
        // 显示的页码按钮数量
        pagerCount: 3,
        // 是否禁用分页
        disabled: false,
        // 是否显示省略号
        forceEllipses: false,
        // 是否为简单分页
        simple: false,
        // 是否展示上一页按钮
        showPrevButton: true,
        // 是否展示下一页按钮
        showNextButton: true,
        // 上一页按钮文字
        prevText: '上一页',
        // 下一页按钮文字
        nextText: '下一页',
        // 背景色
        bgColor: '#f7f7f7',
        // 文本色
        color: '#606266',
        // 激活背景色
        activeBgColor: '#2979ff',
        // 激活文本色
        activeColor: '#ffffff',
        // 字体尺寸
        fontSize: '14px',
        // 圆角
        round: '4px',
        // 描边色
        borderColor: '',
        // 每项宽度
        itemWidth: '34px',
        // 每项高度
        itemHeight: '34px'
    }
}
