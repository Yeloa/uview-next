/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-23 20:53:09
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/card.js
 */

import theme from '../theme.js'

export default {
	// card组件的props
	card: {
		// 与屏幕两侧是否留空隙
		full: false,
		// 标题
		title: '',
		// 标题颜色
		titleColor: theme.mainColor,
		// 标题字体大小，单位rpx
		titleSize: 15,
		// 副标题
		subTitle: '',
		// 副标题颜色
		subTitleColor: theme.info,
		// 副标题字体大小，单位rpx
		subTitleSize: 13,
		// 是否显示外部边框，只对full=false时有效(卡片与边框有空隙时)
		border: false,
		// 用于标识点击了第几个
		index: '',
		// 用于隔开上下左右的边距，带单位的写法，如："30rpx 30rpx"，"20rpx 20rpx 30rpx 30rpx"
		margin: '7px',
		// card卡片的圆角
		round: 8,
		// 头部自定义样式，对象形式
		headStyle: {},
		// 主体自定义样式，对象形式
		bodyStyle: {},
		// 底部自定义样式，对象形式
		footStyle: {},
		// 头部是否下边框
		headBorderBottom: true,
		// 底部是否有上边框
		footBorderTop: true,
		// 标题左边的缩略图
		thumb: '',
		// 缩略图宽高，单位rpx
		thumbWidth: 30,
		// 缩略图是否为圆形
		thumbCircle: false,
		// 缩略图圆角值
		thumbRadius: 3,
		// 给head，body，foot的内边距
		padding: 10,
		// 是否显示头部
		showHead: true,
		// 是否显示尾部
		showFoot: true,
		// 卡片外围阴影，字符串形式
		boxShadow: 'none'
	}
}
