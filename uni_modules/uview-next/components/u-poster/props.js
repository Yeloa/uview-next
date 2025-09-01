import { defineProps } from '../../libs/util/props';

export default defineProps('poster', {
    // 是否显示预览
    showPreview: {
        type: Boolean,
        default: true
    },
    // 预览宽度
    width: {
        type: [Number, String],
        default: 375
    },
    // 预览高度
    height: {
        type: [Number, String],
        default: ''
    },
    // 预览模式
    mode: {
        type: String,
        default: 'widthFix'
    },
    // 画布
    palette: {
        type: Object,
        default: () => []
    },
    // 缩放比，会在传入的 palette 中统一乘以该缩放比
    scaleRatio: {
        type: Number,
        default: 1
    },
    // 宽度像素
    widthPixels: {
        type: Number,
        default: 0
    },
    // 启用脏检查，默认 false
    dirty: {
        type: Boolean,
        default: false
    },
    // 文件类型
    fileType: {
        type: String,
        default: 'jpg'
    },
    // 质量
    quality: {
        type: Number,
        default: 1
    }
});
