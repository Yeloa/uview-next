export default {
    props: {
        index: {
			type: [Number, String],
			default: ()=> uni.$u.props.lazyLoad.index
		},
		// 要显示的图片
		image: {
			type: String,
			default: ()=> uni.$u.props.lazyLoad.image
		},
		// 图片裁剪模式
		mode: {
			type: String,
			default: ()=> uni.$u.props.lazyLoad.mode
		},
		// 占位图片路径
		loadingImg: {
			type: String,
			default: ()=> uni.$u.props.lazyLoad.loadingImg
		},
		// 加载失败的错误占位图
		errorImg: {
			type: String,	
			default: ()=> uni.$u.props.lazyLoad.errorImg
		},
		// 图片进入可见区域前多少像素时，单位rpx，开始加载图片
		// 负数为图片超出屏幕底部多少距离后触发懒加载，正数为图片顶部距离屏幕底部多少距离时触发(图片还没出现在屏幕上)
		threshold: {
			type: [Number, String],
			default: ()=> uni.$u.props.lazyLoad.threshold
		},
		// 淡入淡出动画的过渡时间
		duration: {
			type: [Number, String],
			default: ()=> uni.$u.props.lazyLoad.duration
		},
		// 渡效果的速度曲线，各个之间差别不大，因为这是淡入淡出，且时间很短，不是那些变形或者移动的情况，会明显
		// linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);
		effect: {
			type: String,
			default: ()=> uni.$u.props.lazyLoad.effect
		},
		// 是否使用过渡效果
		isEffect: {
			type: Boolean,
			default: ()=> uni.$u.props.lazyLoad.isEffect
		},
		// 圆角值
		round: {
			type: [Number, String],
			default: ()=> uni.$u.props.lazyLoad.round
		},
		// 图片高度，单位rpx
		height: {
			type: [Number, String],
			default: ()=> uni.$u.props.lazyLoad.height
		}
    }
}
