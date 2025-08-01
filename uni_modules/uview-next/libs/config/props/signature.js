export default {
    // signature组件
    signature: {
        // 标题
        title: '',
        // 是否显示标题
        showTitle: true,
        // 是否显示工具栏
        showToolbar: true,
        // 是否显示颜色列表
        showColorList: true,
        // 是否显示清空按钮
        showClear: true,
        // 是否显示撤销按钮
        showUndo: true,
        // 清空按钮的文本
        clearText: '',
        // 撤销按钮的文本
        undoText: '',
        // 完成按钮的文本
        confirmText: '',
        //是否固定标题栏和工具栏
        fixed: false,
        // 画笔大小
        penSize: 2,
        // 线条最小宽度
        minLineWidth: 2,
        // 线条最大宽度
        maxLineWidth: 6,
        // 画笔颜色
        penColor: '#333333',
        // 画笔颜色列表
        penColorList: ['#333333', '#FF1E10', '#FFBE00', '#1A9BFF', '#1AAD19'],
        // 背景颜色
        backgroundColor: '#ffffff',
        // canvas类型
        // #ifdef MP-WEIXIN
        type: '2d',
        // #endif
        // #ifndef MP-WEIXIN
        type: '',
        // #endif
        // 是否开启压感
        openSmooth: false,
        // 最大历史记录数
        maxHistoryLength: 20,
        // 是否横屏
        landscape: false,
        // 是否禁用滚动
        disableScroll: true,
        // 是否禁用
        disabled: false,
        // 只生成内容区域
        boundingBox: false,
        // 是否优先使用toDataURL
        preferToDataURL: false,
        // 工具栏自定义样式
        toolbarStyle: {},
        // 图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理
        quality: 1,
        // 输出图片类型，png-png格式，jpg-jpg格式
        fileType: 'png',
        // 是否显示水印
        showWatermark: false,
        // 水印配置对象
        watermark: {
            showOnSave: true,
            text: '',
            color: 'rgba(0, 0, 0, 0.2)',
            fontSize: 16,
            fontFamily: 'Arial',
            rotate: -30,
            spacing: 100,
            single: false
        },
    }
} 