export default {
    props: {
        // 当前选中项的value值
        // #ifdef VUE2
        value: {
            type: [Number, String, Array],
            default: ()=> uni.$u.props.dropdownItem.value
        },
        // #endif
        // #ifdef VUE3
        modelValue: {
            type: [Number, String, Array],
            default: ()=> uni.$u.props.dropdownItem.value
        },
        // #endif
        // 菜单项标题
        title: {
            type: [String, Number],
            default: ()=> uni.$u.props.dropdownItem.title
        },
        // 选项数据，如果传入了默认slot，此参数无效
        options: {
            type: Array,
            default: ()=> uni.$u.props.dropdownItem.options
        },
        // 是否禁用此菜单项
        disabled: {
            type: Boolean,
            default: ()=> uni.$u.props.dropdownItem.disabled
        },
        // 下拉弹窗的高度
        height: {
            type: [Number, String],
            default: ()=> uni.$u.props.dropdownItem.height
        }
    }
}