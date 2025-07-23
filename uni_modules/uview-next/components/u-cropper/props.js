export default {
    props: {
        // 是否显示
        show: {
        	type: Boolean,
        	default: ()=> uni.$u.props.cropper.show
        },
        // 裁剪框形状，circle-圆形，square-方形
        shape: {
            type: String,
            default: ()=> uni.$u.props.cropper.shape
        },
        // 每次显示时是否自动打开选择图片
        autoChoose: {
            type: Boolean,
        	default: ()=> uni.$u.props.cropper.autoChoose
        },
        // 裁剪框宽度，单位px
        rectWidth: {
        	type: [String, Number],
        	default: ()=> uni.$u.props.cropper.rectWidth
        },
        // 裁剪框高度，单位px
        rectHeight: {
        	type: [String, Number],
        	default: ()=> uni.$u.props.cropper.rectHeight
        },
        // 输出图片宽度，单位px
        width: {
        	type: [String, Number],
        	default: ()=> uni.$u.props.cropper.width
        },
        // 输出图片高度，单位px
        height: {
        	type: [String, Number],
        	default: ()=> uni.$u.props.cropper.height
        },
        // 输出的图片类型，如果发现裁剪的图片很大，可能是因为设置为了"png"，改成"jpg"即可
        fileType: {
        	type: String,
        	default: ()=> uni.$u.props.cropper.fileType
        },
        // 是否显示网格线
        showGrid: {
            type: Boolean,
            default: ()=> uni.$u.props.cropper.showGrid
        }
    },
}
