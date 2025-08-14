import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js'

export default defineProps('section', {
    // 标题信息
    title: {
        type: String,
        default: ''
    },
    // 右边副标题内容
    subTitle: {
        type: String,
        default: () => uni.$u.$t('uSection.subTitle')
    },
    // 是否显示右边的内容
    right: {
        type: Boolean,
        default: true
    },
    fontSize: {
        type: [Number, String],
        default: 15
    },
    // 主标题是否加粗
    bold: {
        type: Boolean,
        default: true
    },
    // 主标题的颜色
    color: {
        type: String,
        default: theme.mainColor
    },
    // 右边副标题的颜色
    subColor: {
        type: String,
        default: theme.lightColor
    },
    // 是否显示左边的竖条
    showLine: {
        type: Boolean,
        default: true
    },
    // 左边竖线的颜色
    lineColor: {
        type: String,
        default: ''
    },
    // 是否显示右边箭头
    arrow: {
        type: Boolean,
        default: true
    }
})