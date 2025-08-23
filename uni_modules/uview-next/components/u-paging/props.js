import { defineProps } from '../../libs/util/props';

export default defineProps('paging', {
    // #ifdef VUE2
    // Vue2 兼容性：数据绑定值
    value: {
        type: Array,
        default: () => []
    },
    // #endif
    // #ifdef VUE3
    // Vue3 兼容性：数据绑定值
    modelValue: {
        type: Array,
        default: () => []
    },
    // #endif
    // 分页组件背景颜色
    bgColor: {
        type: String,
        default: ''
    },
    // 分页组件高度，支持字符串或数字类型
    height: {
        type: [String, Number],
        default: ''
    },
    // 是否固定在底部
    fixed: {
        type: Boolean,
        default: true
    },
    // 是否使用页面滚动，true时使用页面滚动，false时使用组件内部滚动
    usePageScroll: {
        type: Boolean,
        default: false
    },
    // 是否启用下拉刷新功能
    refresherEnabled: {
        type: Boolean,
        default: true
    },
    // 下拉刷新触发距离，单位px
    refresherThreshold: {
        type: [Number, String],
        default: 40
    },
    // 下拉刷新前的提示文字
    refresherDefaultText: {
        type: String,
        default: uni.$u.$t('uPaging.refresherDefaultText')
    },
    // 下拉刷新释放时的提示文字
    refresherPullingText: {
        type: String,
        default: uni.$u.$t('uPaging.refresherPullingText')
    },
    // 下拉刷新进行中的提示文字
    refresherRefreshingText: {
        type: String,
        default: uni.$u.$t('uPaging.refresherRefreshingText')
    },
    // 下拉刷新完成后的提示文字
    refresherCompleteText: {
        type: String,
        default: uni.$u.$t('uPaging.refresherCompleteText')
    },
    // 是否启用上拉加载更多功能
    loadingMoreEnabled: {
        type: Boolean,
        default: true
    },
    // 上拉加载更多的触发距离，距离底部多少px时触发
    lowerThreshold: {
        type: [Number, String],
        default: 50
    },
    // 上拉加载更多时的默认提示文字
    loadingMoreDefaultText: {
        type: String,
        default: uni.$u.$t('uPaging.loadingMoreDefaultText')
    },
    // 没有更多数据时的提示文字
    loadingMoreNoMoreText: {
        type: String,
        default: uni.$u.$t('uPaging.loadingMoreNoMoreText')
    }
})
