/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:47:24
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/cropper.js
 */
export default {
    // cropper 组件
    cropper: {
        // 是否显示
        show: false,
        // 裁剪框形状，circle-圆形，square-方形
        shape: 'square',
        // 每次显示时是否自动打开选择图片
        autoChoose: true,
        // 裁剪框宽度，单位rpx
        rectWidth: 300,
        // 裁剪框高度，单位px
        rectHeight: 300,
        // 输出图片宽度，单位px
        width: 400,
        // 输出图片高度，单位px
        height: 400,
        // 输出的图片类型，如果发现裁剪的图片很大，可能是因为设置为了"png"，改成"jpg"即可
        fileType: 'jpg',
        // 是否显示网格线
        showGrid: true,
    }
}
