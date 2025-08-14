import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js';

export default defineProps('cascader', {
    // 是否显示级联选择器
    show: {
        type: Boolean,
        default: false
    },
    // 选择器标题
    title: {
        type: String,
        default: () => uni.$u.$t('uCascader.title')
    },
    // 标题样式
    titleStyle: {
        type: [Object, String],
        default: () => ({})
    },
    // 选项数据
    options: {
        type: Array,
       default: () => []
    },
    // #ifdef VUE3
    // 当前选中值
    modelValue: {
        type: [String, Number, Array],
        default: ''
    },
    // #endif
    // v-model 的别名
    value: {
        type: [String, Number, Array],
        default: ''
    },
    // 占位符文本
    placeholder: {
        type: String,
        default: () => uni.$u.$t('uCascader.placeholder')
    },
    // 自定义字段名
    field: {
        type: Object,
        default: () => ({
            text: 'label',
            value: 'value', 
            children: 'children'
        })
    },
    // 是否显示关闭按钮
    closeable: {
        type: Boolean,
        default: true
    },
    // 是否点击遮罩关闭
    closeOnClickOverlay: {
        type: Boolean,
        default: true
    },
    // 背景色
    bgColor: {
        type: String,
        default: '#fff'
    },
    // 主题色
    activeColor: {
        type: String,
        default: theme.primary
    },
    // 选中背景色
    activeBgColor: {
        type: String,
        default: ''
    },
    // 选中文本加粗
    activeBold: {
        type: Boolean,
        default: false
    },
    // 图标颜色
    iconColor: {
        type: String,
        default: ''
    },
    // 文本色
    color: {
        type: String,
        default: theme.mainColor
    },
    // 字体大小
    fontSize: {
        type: String,
        default: '15px'
    },
    // 标题字体大小
    titleFontSize: {
        type: String,
        default: '18px'
    },
    // 标题颜色
    titleColor: {
        type: String,
        default: theme.mainColor
    },
    // 圆角
    round: {
        type: [String, Number],
        default: 0
    },
    // 层级
    zIndex: {
        type: [String, Number],
        default: 10075
    },
    // 是否安全区域
    safeAreaInsetBottom: {
        type: Boolean,
        default: true
    },
    // 选项高度
    itemHeight: {
        type: String,
        default: '40px'
    }
})
