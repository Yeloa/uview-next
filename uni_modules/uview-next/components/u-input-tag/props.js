import { defineProps } from '../../libs/util/props';

// InputTag 输入标签 Props（移动端友好）
export default defineProps('inputTag', {
    // #ifdef VUE2
    value: {
        type: Array,
        default: () => []
    },
    // #endif
    // #ifdef VUE3
    modelValue: {
        type: Array,
        default: () => []
    },
    // #endif
    // 占位符
    placeholder: {
        type: String,
        default: '请输入内容，回车添加'
    },
    // 最大可添加数量
    max: {
        type: [Number, String],
        default: null
    },
    // 折叠显示
    collapseTags: {
        type: Boolean,
        default: false
    },
    // 折叠时最多展示的标签数量
    maxCollapseTags: {
        type: [Number, String],
        default: 1
    },
    inputStyle: {
        type: [Object, String],
        default: ''
    },
    placeholderStyle: {
        type: [Object, String],
        default: ''
    },
    // 是否禁用
    disabled: {
        type: Boolean,
        default: false
    },
    showConfirmButton: {
        type: Boolean,
        default: true
    },
    confirmButtonText: {
        type: String,
        default: '添加标签'
    },
    // 输入框失焦是否保存输入到标签
    saveOnBlur: {
        type: Boolean,
        default: true
    },
    // 标签风格类型：primary/success/info/warning/danger/plain
    tagBgColor: {
        type: String,
        default: ''
    },
    // 标签是不是内嵌在标签内
    tagInside: {
        type: [Boolean],
        default: false
    },
    // 标签字体颜色
    tagColor: {
        type: String,
        default: ''
    },
    // 是否镂空
    plain: {
        type: Boolean,
        default: false
    },
    // 标签形状：circle/square
    shape: {
        type: String,
        default: 'square'
    },
    // 背景颜色
    bgColor: {
        type: String,
        default: '' //#f5f5f5
    },
    round: {
        type: [Number, String],
        default: 5
    }
})
