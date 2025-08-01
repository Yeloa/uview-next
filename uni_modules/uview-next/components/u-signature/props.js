export default {
    props: {
        // 标题
        title: {
            type: String,
            default: () => uni.$u.$t('uSignature.title'),
        },
        // 是否显示标题
        showTitle: {
            type: Boolean,
            default: () => uni.$u.props.signature.showTitle,
        },
        // 是否显示工具栏
        showToolbar: {
            type: Boolean,
            default: () => uni.$u.props.signature.showToolbar,
        },
        // 是否显示颜色列表
        showColorList: {
            type: Boolean,
            default: () => uni.$u.props.signature.showColorList,
        },
        // 是否显示清空按钮
        showClear: {
            type: Boolean,
            default: () => uni.$u.props.signature.showClear,
        },
        // 是否显示撤销按钮
        showUndo: {
            type: Boolean,
            default: () => uni.$u.props.signature.showUndo,
        },
        // 清空按钮的文本
        clearText: {
            type: String,
            default: () => uni.$u.$t('uSignature.clearText'),
        },
        // 撤销按钮的文本
        undoText: {
            type: String,
            default: () => uni.$u.$t('uSignature.undoText'),
        },
        // 完成按钮的文本
        confirmText: {
            type: String,
            default: () => uni.$u.$t('uSignature.confirmText'),
        },
        // 工具栏对齐方式
        toolbarStyle: {
            type: Object,
            default: () => uni.$u.props.signature.toolbarStyle,
        },
        // 是否固定标题栏和工具栏
        fixed: {
            type: Boolean,
            default: () => uni.$u.props.signature.fixed,
        },
        // 线条最小宽度
        minLineWidth: {
            type: [String, Number],
            default: () => uni.$u.props.signature.minLineWidth,
        },
        // 线条最大宽度
        maxLineWidth: {
            type: [String, Number],
            default: () => uni.$u.props.signature.maxLineWidth,
        },
        // 画笔颜色
        penColor: {
            type: String,
            default: () => uni.$u.props.signature.penColor,
        },
        // 画笔颜色列表
        penColorList: {
            type: Array,
            default: () => uni.$u.props.signature.penColorList,
        },
        // 画笔大小
        penSize: {
            type: [String, Number],
            default: () => uni.$u.props.signature.penSize,
        },
        // 背景颜色
        backgroundColor: {
            type: String,
            default: () => uni.$u.props.signature.backgroundColor,
        },
        // canvas类型
        type: {
            type: String,
            default: () => uni.$u.props.signature.type,
        },
        // 是否开启压感
        openSmooth: {
            type: Boolean,
            default: () => uni.$u.props.signature.openSmooth,
        },
        // 最大历史记录数
        maxHistoryLength: {
            type: [String, Number],
            default: () => uni.$u.props.signature.maxHistoryLength,
        },
        // 是否横屏
        landscape: {
            type: Boolean,
            default: () => uni.$u.props.signature.landscape,
        },
        // 是否禁用滚动
        disableScroll: {
            type: Boolean,
            default: () => uni.$u.props.signature.disableScroll,
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: () => uni.$u.props.signature.disabled,
        },
        // 只生成内容区域
        boundingBox: {
            type: Boolean,
            default: () => uni.$u.props.signature.boundingBox,
        },

        // 输出的图片类型，如果发现裁剪的图片很大，可能是因为设置为了"png"，改成"jpg"即可
        fileType: {
            type: String,
            default: () => uni.$u.props.signature.fileType,
        },
        // 图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理
        quality: {
            type: Number,
            default: () => uni.$u.props.signature.quality,
        },
        // 是否显示水印
        showWatermark: {
            type: Boolean,
            default: () => uni.$u.props.signature.showWatermark,
        },
        // 水印配置对象
        watermark: {
            type: Object,
            default: () => uni.$u.props.signature.watermark,
        },
    },
};
