export default {
    props: {
        // #ifdef VUE2
		value: {
			// 瀑布流数据
			type: Array,
			default: () => uni.$u.props.waterfall.value
        },
		// #endif
		// #ifdef VUE3
		modelValue: {
			// 瀑布流数据
			type: Array,
			default: () => uni.$u.props.waterfall.value
        },
		// #endif
		// 每次向结构插入数据的时间间隔，间隔越长，越能保证两列高度相近，但是对用户体验越不好
		// 单位ms
		addTime: {
			type: [Number, String],
			default: () => uni.$u.props.waterfall.addTime
        },
		// id值，用于清除某一条数据时，根据此idKey名称找到并移除，如数据为{idx: 22, name: 'lisa'}
		// 那么该把idKey设置为idx
		idKey: {
			type: String,
			default: () => uni.$u.props.waterfall.idKey
        },
		// 瀑布流的列数，不可动态修改
		column: {
			type: [Number, String],
			default: () => uni.$u.props.waterfall.column
		}
    }
}