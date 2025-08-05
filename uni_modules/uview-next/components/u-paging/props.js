export default {
    props: {
        tabsPosition: {	//tabs位置 top: 上, bottom: 下
            type: String,
            default: 'top'
        },
        minWidth: { //tab最小宽度
            type: String,
            default: '250rpx'
        },
        space: { //tab间距, 左右padding值
            type: String,
            default: '10px'
        },
        tabHeight: { //tabs高度
            type: String,
            default: '44px'
        },
        height: { //组件总高度, 需外部计算并传入
            type: [Number, String],
            default: 500
        },
        lineWidth: { //线条宽度，若小于1则当做百分比计算
            type: [Number, String],
            default: .7
        },
        lineHieght: { //线条高度
            type: String,
            default: '2px'
        },
        lineColor: { //线条颜色
            type: String,
            default: '#f1505c'
        },
        lineMarginBottom: { //线条距离底部距离
            type: [Number, String],
            default: 0
        },
        defCurrent: { //默认当前项
            type: [Number, String],
            default: 0
        },
        autoCenter: { //scrollview自动居中
            type: [Boolean, String],
            default: true
        },
        tapTabRefresh: { //点击当前项tab触发组件内部init函数
            type: [Boolean, String],
            default: true
        },
        fontSize: { //tab默认字体大小
            type: String,
            default: '28rpx'
        },
        activeFontSize: { //当前项字体大小
            type: String,
            default: '32rpx'
        },
        swiperBackgroundColor: { //swiper背景颜色
            type: String,
            default: '#f8f8f8'
        },
        tabsBackgroundColor: { //tabs背景颜色
            type: String,
            default: '#fff'
        },
        tabsFontColor: { //tabs默认字体颜色
            type: String,
            default: '#999'
        },
        activeFontColor: { //tabs当前项字体颜色
            type: String,
            default: '#000'
        },
        activeBold: { //当前项字体加粗
            type: [Boolean, String],
            default: true
        },
        initFnName: { //初始调用函数名称(组件内部)
            type: String,
            default: 'init'
        },
        type: { //用于区分展示不同列表模板的标识
            type: String,
            default: 'default'
        },
        zIndex: { //z-index属性值
            type: [String, Number],
            default: 99
        },
        tabsSticky: { //tabs是否sticky定位(粘贴组件顶部)
            type: [Boolean, String],
            default: false
        },
        hasRefresh: {
            type: [Boolean, String],
            default: false
        },
        refreshImage: { //刷新动画图片
            type: String,
            default: ''
        },
        refreshDistance: { //刷新距离
            type: [Number, String],
            default: 90
        },
        beforRefreshText: { //刷新前文字
            type: String,
            default: '下拉刷新'
        },
        releaseRefreshText: { //释放刷新文字
            type: String,
            default: '松开刷新'
        },
        isRefreshingText: { //刷新中文字
            type: String,
            default: '刷新中...'
        },
        successRefreshText: {//刷新成功
            type: String,
            default: '刷新成功'
        },
        failRefreshText: {//刷新失败
            type: String,
            default: '刷新失败'
        },
        completeRefreshText: { //刷新完成文字
            type: String,
            default: '刷新完毕'
        },
        refreshTextColor: { //刷新文字的颜色
            type: String,
            default: '#666'
        },
        refreshTextFontSize: { //刷新文字的大小
            type: String,
            default: '25rpx'
        },
        // 新增：下滑加载相关属性
        hasLoadMore: { //是否启用下滑加载更多
            type: [Boolean, String],
            default: false
        },
        loadMoreDistance: { //距离底部多少px时触发加载更多
            type: [Number, String],
            default: 50
        },
        loadMoreText: { //加载更多文字
            type: String,
            default: '加载更多...'
        },
        loadMoreTextColor: { //加载更多文字颜色
            type: String,
            default: '#666'
        },
        loadMoreTextFontSize: { //加载更多文字大小
            type: String,
            default: '25rpx'
        },
        noMoreText: { //没有更多数据文字
            type: String,
            default: '没有更多数据了'
        },
        noMoreTextColor: { //没有更多数据文字颜色
            type: String,
            default: '#999'
        },
        noMoreTextFontSize: { //没有更多数据文字大小
            type: String,
            default: '25rpx'
        },
        restrictSlider: {	//限制用户只能滑动一块
            type: [Boolean, String],
            default: true
        },
        contentMode: {	//content展示模式, default、swiper、vShow, 若传default, 则会根据config.js中的checkContentMode返回相应模式, 安卓平台下传default或swiper都会经过checkContentMode的检测
            type: String,
            default: 'default'
        },
        customData: {	//自定义数据，最终传至列表vue中
            type: [Object, String, Number, Array, Boolean],
            default: ()=>{ return {} }
        }
    }
}
