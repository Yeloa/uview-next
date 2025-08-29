import { defineProps } from '../../libs/util/props';

export default defineProps('cropper', {
    // 是否显示
    show: {
    	type: Boolean,
    	default: false
    },
    // 裁剪框形状，circle-圆形，square-方形
    shape: {
        type: String,
        default: 'square'
    },
    // 每次显示时是否自动打开选择图片
    autoChoose: {
        type: Boolean,
    	default: true
    },
    // 裁剪框宽度，单位px
    rectWidth: {
    	type: [String, Number],
    	default: 300
    },
    // 裁剪框高度，单位px
    rectHeight: {
    	type: [String, Number],
    	default: 300
    },
    // 输出图片宽度，单位px
    width: {
    	type: [String, Number],
    	default: 400
    },
    // 输出图片高度，单位px
    height: {
    	type: [String, Number],
    	default: 400
    },
    // 输出的图片类型，如果发现裁剪的图片很大，可能是因为设置为了"png"，改成"jpg"即可
    fileType: {
    	type: String,
    	default: 'jpg'
    },
    // 输出图片质量，0-1
    quality: {
        type: [String, Number],
        default: 0.9
    },
    // 是否显示网格线
    showGrid: {
        type: Boolean,
        default: true
    },
    // 水印文字
    watermark: {
        type: Object,
        default: () => ({
            text: '',
            text: '',
            bold: false,
            color: 'rgba(0, 0, 0, 0.2)',
            fontSize: 16,
            fontFamily: 'Arial',
            rotate: -30,
            spacing: 100,
            single: false
        })
    }
})
