import { defineProps } from '../../libs/util/props';

export default defineProps('qrcode', {
    // 二维码内容
    value: {
        type: [String, Number],
        default: ''
    },
    // 选项
    options: {
        type: Object,
        default: () => ({}) 
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
    // 导出的文件类型
    fileType: {
        type: String,
        default: 'png'
    },
    // 是否初始化组件后就开始生成
    start: {
        type: Boolean,
        default: true
    },
    // 是否数据发生改变自动重绘
    auto: {
        type: Boolean,
        default: true
    },
    // 队列绘制，主要针对NVue端
    queue: {
        type: Boolean,
        default: false
    },
    // 是否队列加载图片，可减少canvas发起的网络资源请求，节省服务器资源
    isQueueLoadImage: {
        type: Boolean,
        default: false
    },
    // loading态
    loading: {
        type: Boolean,
        default: undefined
    },
    // H5保存即自动下载（在支持的环境下），默认false为仅弹层提示用户需要长按图片保存，不会自动下载
    h5SaveIsDownload: {
        type: Boolean,
        default: false
    },
    // H5下载名称
    h5DownloadName: {
        type: String,
        default: 'QRCode'
    }
});
    