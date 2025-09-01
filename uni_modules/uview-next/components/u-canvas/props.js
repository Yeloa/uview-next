import { defineProps } from '../../libs/util/props';

export default defineProps('canvas', {
    // 宽度
    width: {
        type: [Number, String],
        default: 375
    },
    // 高度
    height: {
        type: [Number, String],
        default: ''
    },
    // canvas类型
    type: {
        type: String,
        // #ifdef MP-WEIXIN || MP-TOUTIAO
        default: '2d',
        // #endif
        //#ifndef MP-WEIXIN || MP-TOUTIAO
        default: 'webgl',
        // #endif
    },
    // 是否禁用滚动
    disableScroll: {
        type: Boolean,
        default: false
    },
    // 是否启用高清
    hidpi: {
        type: Boolean,
        default: true
    }
})
