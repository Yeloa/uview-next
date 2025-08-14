import { defineProps } from '../../libs/util/props';

export default defineProps('select', {
    // 默认值
    value: {
        type: [String, Number],
        default: ''
    },
    // 本地数据，格式 [{text:'',value:''}]
    list: {
        type: Array,
       default: () => []
    },
    // 选项对象中，需要展示的属性键名
    keyName: {
        type: String,
        default: 'text'
    },
    // 选项对象中，需要展示的属性键名
    valueName: {
        type: String,
        default: 'value'
    },
    // 是否显示清除控件
    clearable: {
        type: Boolean,
        default: true
    },
    // 没有数据时显示的文字，本地数据无效
    emptyText: {
        type: String,
        default: '暂无数据'
    },
    // 左侧标题
    label: {
        type: String,
        default: ''
    },
    // 输入框的提示文字
    placeholder: {
        type: String,
        default: '请选择'
    },
    // placeholder的样式
    placeholderStyle: {
        type: [String, Object],
        default: ''
    },
    // 背景颜色
    backgroundColor: {
        type: String,
        default: '#ffffff'
    },
    // 圆角值
    round: {
        type: [String, Number],
        default: 4
    },
    // 边框颜色
    borderColor: {
        type: String,
        default: '#dcdfe6'
    },
    // 是否禁用
    disabled: {
        type: Boolean,
        default: false
    },
    // 禁用状态时的背景色
    disabledColor: {
        type: String,
        default: '#f5f7fa'
    },
    // 是否允许选中文本换行显示
    wrap: {
        type: Boolean,
        default: false
    },
    // 弹出位置
    placement: {
        type: String,
        default: 'bottom'
    },
    // 选择文字的位置
    align: {
        type: String,
        default: 'left'
    },
    // 是否显示箭头
    showArrow: {
        type: Boolean,
        default: false
    },
    // 边框样式
    border: {
        type: String,
        default: 'surround'
    },
    // 自定义样式
    customStyle: {
        type: [Object, String],
        default: () => ({})
    }
})
