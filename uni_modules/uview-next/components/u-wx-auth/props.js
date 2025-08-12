export default {
    props: {
        show: {
			type: Boolean,
			default: () => uni.$u.props.wxAuth.show
		},
		logo: {
			type: String,
			default: () => uni.$u.props.wxAuth.logo
		},
		title: {
			type: String,
			default: () => uni.$u.props.wxAuth.title
		},
		appName: {
			type: String,
			default: () => uni.$u.props.wxAuth.appName
		},
		showHeader:{
			type: Boolean,
			default: () => uni.$u.props.wxAuth.showHeader
		},
		content: {
			type: String,
			default: () => uni.$u.props.wxAuth.content
		},
		tips: {
			type: String,
			default: () => uni.$u.props.wxAuth.tips
		},
		round:{
			type: [Number, String],
			default: () => uni.$u.props.wxAuth.round
		},
		closeable:{
			type: Boolean,
			default: () => uni.$u.props.wxAuth.closeable
		},
		maskCloseable:{
			type: Boolean,
			default: () => uni.$u.props.wxAuth.maskCloseable
		},
		confirmText: {
			type: String,
			default: () => uni.$u.props.wxAuth.confirmText
		}
    }
}