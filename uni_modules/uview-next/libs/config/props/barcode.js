/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:55:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/barcode.js
 */

export default {
    // barcode组件
    barcode: {
        // 条形码内容
        value: '',
        // 条形码类型
        format: 'CODE128',
        // 条形码宽度
        width: 2,
        // 条形码高度
        height: 80,
        // 条形码颜色
        color: '#000000',
        // 背景颜色
        backgroundColor: 'transparent',
        // 是否显示文本
        displayValue: true,
        // 文本位置
        textPosition: 'bottom',
        // 字体选项
        fontOptions: '',
        // 字体
        font: 'monospace',
        // 文本对齐方式
        textAlign: 'center',
        // 文本边距
        textMargin: 2,
        // 字体大小
        fontSize: 20,
        //#ifdef MP-WEIXIN
        // 画布类型
        canvasType: '2d',
        //#endif
        //#ifndef MP-WEIXIN
        canvasType: ''
        //#endif
    }
}
