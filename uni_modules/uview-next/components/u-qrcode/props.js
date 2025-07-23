export default {
    props: {
		// 二维码内容
		value: {
			type: [String, Number],
			default: ()=> uni.$u.props.qrcode.value
		},
		// 选项
		options: {
			type: Object,
			default: ()=> uni.$u.props.qrcode.options
		},
		// 二维码大小
		size: {
			type: [String, Number],
			default: ()=> uni.$u.props.qrcode.size
		},
		// 导出的文件类型
		fileType: {
			type: String,
			default: ()=> uni.$u.props.qrcode.fileType
		},
		// 是否初始化组件后就开始生成
		start: {
			type: Boolean,
			default: ()=> uni.$u.props.qrcode.start
		},
		// 是否数据发生改变自动重绘
		auto: {
			type: Boolean,
			default: ()=> uni.$u.props.qrcode.auto
		},
		// 队列绘制，主要针对NVue端
		queue: {
			type: Boolean,
			default: ()=> uni.$u.props.qrcode.queue
		},
		// 是否队列加载图片，可减少canvas发起的网络资源请求，节省服务器资源
		isQueueLoadImage: {
			type: Boolean,
			default: ()=> uni.$u.props.qrcode.isQueueLoadImage
		},
		// loading态
		loading: {
			type: Boolean,
			default: ()=> uni.$u.props.qrcode.loading
		},
		// H5保存即自动下载（在支持的环境下），默认false为仅弹层提示用户需要长按图片保存，不会自动下载
		h5SaveIsDownload: {
			type: Boolean,
			default: ()=> uni.$u.props.qrcode.h5SaveIsDownload
		},
		// H5下载名称
		h5DownloadName: {
			type: String,
			default: ()=> uni.$u.props.qrcode.h5DownloadName
		}
	}
}
