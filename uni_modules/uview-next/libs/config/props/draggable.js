export default {
    // 拖拽排序组件
    draggable: {
       // 数据列表
		list: [],
		// 列数
		column: 2,
		// 宽高比，填写这项时gridHeight失效
		aspectRatio: null,
		// 项目高度
		itemHeight: 60,
		// 阻尼系数
		damping: 50,
		// 摩擦系数
		friction: 2,
		// 是否使用手柄拖拽
		handle: false,
		// 是否禁用
		disabled: false,
		// 是否长按拖拽
		longpress: false,
		// 是否显示关闭按钮
		closeable: false
	}
}
