import { defineProps } from '../../libs/util/props';

export default defineProps('qrcode', {
    // 二维码内容
    value: {
        type: [String, Number],
        default: ''
    },
    // 背景色
    background: {
        type: String,
        default: '#fff'
    },
    // 前景色
    foreground: {
        type: String,
        default: '#000'
    },
    // 定位角点颜色
    pdground: {
        type: String,
        default: '#000'
    },
    //容错级别
    level: {
        type: String,
        default: 'H'
    },
    //二维码图标
    icon: {
        type: String,
        default: ''
    },
    //二维码图标大小
    iconSize: {
        type: Number,
        default: 30
    },
    // 状态
    status: {
        type: String,
        default: ''
    },
    expiredText:{
        type: String,
        default: '二维码已过期'
    },
    scannedText:{
        type: String,
        default: '已扫描'
    },
    refreshText:{
        type: String,
        default: '点击刷新'
    },
    // 二维码大小
    size: {
        type: [String, Number],
        default: 140
    },
    // 显示模式 (image/canvas)
    mode: {
        type: String,
        default: 'image'
    }
});
    