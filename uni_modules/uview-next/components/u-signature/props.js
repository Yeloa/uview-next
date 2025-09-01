import { defineProps } from '../../libs/util/props';

export default defineProps('signature', {
    // 标题
    title: {
        type: String,
        default: () => uni.$u.$t('uSignature.title'),
    },
    // 是否显示标题
    showTitle: {
        type: Boolean,
        default: true,
    },
    // 是否显示工具栏
    showToolbar: {
        type: Boolean,
        default: true,
    },
    // 是否显示颜色列表
    showColorList: {
        type: Boolean,
        default: true,
    },
    // 是否显示清空按钮
    showClear: {
        type: Boolean,
        default: true,
    },
    // 是否显示撤销按钮
    showUndo: {
        type: Boolean,
        default: true,
    },
    // 是否显示关闭按钮
    showClose: {
        type: Boolean,
        default: true,
    },
    // 关闭按钮的文本
    closeText: {
        type: String,
        default: () => uni.$u.$t('uSignature.closeText'),
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
        default: () => ({}),
    },
    // 是否固定标题栏和工具栏
    fixed: {
        type: Boolean,
        default: false,
    },
    // 线条最小宽度
    minLineWidth: {
        type: [String, Number],
        default: 2,
    },
    // 线条最大宽度
    maxLineWidth: {
        type: [String, Number],
        default: 6,
    },
    // 画笔颜色
    penColor: {
        type: String,
        default: '#333333',
    },
    // 画笔颜色列表
    penColorList: {
        type: Array,
        default: ['#333333', '#FF1E10', '#FFBE00', '#1A9BFF', '#1AAD19'],
    },
    // 画笔大小
    penSize: {
        type: [String, Number],
        default: 2,
    },
    // 背景颜色
    backgroundColor: {
        type: String,
        default: '#ffffff',
    },
    // 是否开启压感
    openSmooth: {
        type: Boolean,
        default: false,
    },
    // 最大历史记录数
    maxHistoryLength: {
        type: [String, Number],
        default: 20,
    },
    // 是否横屏
    landscape: {
        type: Boolean,
        default: false,
    },
    // 是否禁用滚动
    disableScroll: {
        type: Boolean,
        default: true,
    },
    // 是否禁用
    disabled: {
        type: Boolean,
        default: false,
    },
    // 只生成内容区域
    boundingBox: {
        type: Boolean,
        default: false,
    },
    // 输出的图片类型，如果发现裁剪的图片很大，可能是因为设置为了"png"，改成"jpg"即可
    fileType: {
        type: String,
        default: 'png',
    },
    // 图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理
    quality: {
        type: Number,
        default: 1,
    },
    // 是否显示水印
    showWatermark: {
        type: Boolean,
        default: false,
    },
    // 水印配置对象
    watermark: {
        type: Object,
        default: () => ({  
            showOnSave: true,
            text: '',
            color: 'rgba(0, 0, 0, 0.2)',
            fontSize: 16,
            fontFamily: 'Arial',
            rotate: -30,
            spacing: 100,
            single: false
        }),
    },
});