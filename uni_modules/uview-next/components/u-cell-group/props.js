export default {
    props: {
        // 分组标题
        title: {
            type: String,
            default: ()=> uni.$u.props.cellGroup.title
        },
        // 是否显示外边框
        border: {
            type: Boolean,
            default: ()=> uni.$u.props.cellGroup.border
        },
        // 背景颜色
		backgroundColor: {
			type: String,
			default: ()=> uni.$u.props.cellGroup.backgroundColor
		},
		// 边框圆角
		round: {
			type: String,
			default: ()=> uni.$u.props.cellGroup.round
		},
		// 边框颜色
		borderColor: {	
			type: String,
			default: ()=> uni.$u.props.cellGroup.borderColor
		}
    }
}
