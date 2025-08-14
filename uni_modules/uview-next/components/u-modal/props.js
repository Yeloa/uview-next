import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js';

export default defineProps('modal', {
    // 是否展示modal
    show: {
        type: Boolean,
        default: false
    },
    // 标题
    title: {
        type: [String],
        default: ''
    },
    // 弹窗内容
    content: {
        type: String,
        default: ''
    },
    // 确认文案
    confirmText: {
        type: String,
        default: () => uni.$u.$t('uModal.confirmText')
    },
    // 取消文案
    cancelText: {
        type: String,
        default: () => uni.$u.$t('uModal.cancelText')
    },
    // 是否显示确认按钮
    showConfirmButton: {
        type: Boolean,
        default: true
    },
    // 是否显示取消按钮
    showCancelButton: {
        type: Boolean,
        default: false
    },
    // 确认按钮颜色
    confirmColor: {
        type: String,
        default: theme.primary
    },
    // 取消文字颜色
    cancelColor: {
        type: String,
        default: theme.contentColor
    },
    // 对调确认和取消的位置
    buttonReverse: {
        type: Boolean,
        default: false
    },
    // 确认按钮背景颜色
    confirmBgColor: {
        type: String,
        default: theme.primary
    },
    // 取消按钮背景颜色
    cancelBgColor: {
        type: String,
        default: theme.infoLight
    },
    // 确认按钮圆角
    buttonRound: {
        type: String,
        default: '100px'
    },
    // 按钮模式
    buttonModel: {
        type: String,
        default: 'text'
    },
    // 是否开启缩放效果
    zoom: {
        type: Boolean,
        default: true
    },
    // 是否异步关闭，只对确定按钮有效
    asyncClose: {
        type: Boolean,
        default: false
    },
    // 是否允许点击遮罩关闭modal
    closeOnClickOverlay: {
        type: Boolean,
        default: false
    },
    // 给一个负的margin-top，往上偏移，避免和键盘重合的情况
    negativeTop: {
        type: [String, Number],
        default: 0
    },
    // modal宽度，不支持百分比，可以数值，px，rpx单位
    width: {
        type: [String, Number],
        default: '650rpx'
    },
    // 确认按钮的样式，circle-圆形，square-方形，如设置，将不会显示取消按钮
    confirmButtonShape: {
        type: String,
        default: ''
    },
    // 弹窗动画过度时间
    duration: {
        type: [String, Number],
        default: 200
    },
    // 设置圆角值
    round: {
        type: String,
        default: '6px'
    }
})
