export default {
    props: {
		// 圆环进度百分比值
		percent: {
			type: Number,
			default: ()=> uni.$u.props.circleProgress.percent,
			// 限制值在0到100之间
			validator: val => {
				return val >= 0 && val <= 100;
			}
		},
		// 底部圆环的颜色（灰色的圆环）
		inactiveColor: {
			type: String,
			default: ()=> uni.$u.props.circleProgress.inactiveColor,
		},
		// 圆环激活部分的颜色
		activeColor: {
			type: String,
			default: ()=> uni.$u.props.circleProgress.activeColor,
		},
		// 圆环线条的宽度，单位rpx
		borderWidth: {
			type: [Number, String],
			default: ()=> uni.$u.props.circleProgress.borderWidth
		},
		// 整个圆形的宽度，单位rpx
		width: {
			type: [Number, String],
			default: ()=> uni.$u.props.circleProgress.width
		},
		// 整个圆环执行一圈的时间，单位ms
		duration: {
			type: [Number, String],
			default: ()=> uni.$u.props.circleProgress.duration
		},
		// 主题类型
		type: {
			type: String,
			default: ()=> uni.$u.props.circleProgress.type
		},
		// 整个圆环进度区域的背景色
		bgColor: {
			type: String,
			default: ()=> uni.$u.props.circleProgress.bgColor
		}
    }
}
