import { defineProps } from '../../libs/util/props';

export default defineProps('tabbarItem', {
    // item标签的名称，作为与u-tabbar的value参数匹配的标识符
    name: {
        type: [String, Number, null],
        default: null
    },
    // uView内置图标或者绝对路径的图片
    icon: {
        type: String,
        default: ''
    },
    // 右上角的角标提示信息
    badge: {
        type: [String, Number, null],
        default: null
    },
    // 是否显示圆点，将会覆盖badge参数
    dot: {
        type: Boolean,
        default: false
    },
    // 描述文本
    text: {
        type: String,
        default: ''
    },
    // 控制徽标的位置，对象或者字符串形式，可以设置top和right属性
    badgeStyle: {
        type: [Object, String],
        default: 'top: 6px;right:2px;'
    }
})