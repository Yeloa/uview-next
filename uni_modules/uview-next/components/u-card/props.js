export default {
    props: {
		// 与屏幕两侧是否留空隙
		full: {
			type: Boolean,
			default: ()=> uni.$u.props.card.full
		},
		// 标题
		title: {
			type: String,
			default: ()=> uni.$u.props.card.title
		},
		// 标题颜色
		titleColor: {
			type: String,
			default: ()=> uni.$u.props.card.titleColor
		},
		// 标题字体大小，单位rpx
		titleSize: {
			type: [Number, String],
			default: ()=> uni.$u.props.card.titleSize
		},
		// 副标题
		subTitle: {
			type: String,
			default: ()=> uni.$u.props.card.subTitle
		},
		// 副标题颜色
		subTitleColor: {
			type: String,
			default: ()=> uni.$u.props.card.subTitleColor
		},
		// 副标题字体大小，单位rpx
		subTitleSize: {
			type: [Number, String],
			default: ()=> uni.$u.props.card.subTitleSize
		},
		// 是否显示外部边框，只对full=false时有效(卡片与边框有空隙时)
		border: {
			type: Boolean,
			default: ()=> uni.$u.props.card.border
		},
		// 用于标识点击了第几个
		index: {
			type: [Number, String, Object],
			default: ()=> uni.$u.props.card.index
		},
		// 用于隔开上下左右的边距，带单位的写法，如："30rpx 30rpx"，"20rpx 20rpx 30rpx 30rpx"
		margin: {
			type: String,
			default: ()=> uni.$u.props.card.margin
		},
		// card卡片的圆角
		round: {
			type: [Number, String],
			default: ()=> uni.$u.props.card.round
		},
		// 头部自定义样式，对象形式
		headStyle: {
			type: Object,
			default: ()=> uni.$u.props.card.headStyle
		},
		// 主体自定义样式，对象形式
		bodyStyle: {
			type: Object,
			default: ()=> uni.$u.props.card.bodyStyle
		},
		// 底部自定义样式，对象形式
		footStyle: {
			type: Object,
			default: ()=> uni.$u.props.card.footStyle
		},
		// 头部是否下边框
		headBorderBottom: {
			type: Boolean,
			default: ()=> uni.$u.props.card.headBorderBottom
		},
		// 底部是否有上边框
		footBorderTop: {
			type: Boolean,
			default: ()=> uni.$u.props.card.footBorderTop
		},
		// 标题左边的缩略图
		thumb: {
			type: String,
			default: ()=> uni.$u.props.card.thumb
		},
		// 缩略图宽高，单位rpx
		thumbWidth: {
			type: [String, Number],
			default: ()=> uni.$u.props.card.thumbWidth
		},
		// 缩略图是否为圆形
		thumbCircle: {
			type: Boolean,
			default: ()=> uni.$u.props.card.thumbCircle
		},
		// 缩略图圆角值
		thumbRadius: {
			type: [String, Number],
			default: ()=> uni.$u.props.card.thumbRadius
		},
		// 给head，body，foot的内边距
		padding: {
			type: [String, Number],
			default: ()=> uni.$u.props.card.padding
		},
		// 是否显示头部
		showHead: {
			type: Boolean,
			default: ()=> uni.$u.props.card.showHead
		},
		// 是否显示尾部
		showFoot: {
			type: Boolean,
			default: ()=> uni.$u.props.card.showFoot
		},
		// 卡片外围阴影，字符串形式
		boxShadow: {
			type: String,
			default: ()=> uni.$u.props.card.boxShadow
		}
	}
}
