import { defineProps } from '../../libs/util/props';

export default defineProps('dropdownItem', {
    // 当前选中项的value值
    // #ifdef VUE2
    value: {
        type: [Number, String, Array],
        default: ''
    },
    // #endif
    // #ifdef VUE3
    modelValue: {
        type: [Number, String, Array],
        default: ''
    },
    // #endif
    // 菜单项标题
    title: {
        type: [String, Number],
        default: ''
    },
    // 选项数据，如果传入了默认slot，此参数无效
    options: {
        type: Array,
       default: () => [] 
    },
    // 是否禁用此菜单项
    disabled: {
        type: Boolean,
        default: false
    },
    // 下拉弹窗的高度
    height: {
        type: [Number, String],
        default: 'auto'
    }
})