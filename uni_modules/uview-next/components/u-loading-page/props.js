import { defineProps } from '../../libs/util/props';

export default defineProps('loadingPage', {
    // 提示内容
    loadingText: {
        type: [String, Number],
        default: () => uni.$u.$t('uLoadingPage.loadingText')
    },
    // 文字上方用于替换loading动画的图片
    image: {
        type: String,
        default: ''
    },
    // 加载动画的模式，circle-圆形，spinner-花朵形，semicircle-半圆形
    loadingMode: {
        type: String,
        default: 'circle'
    },
    // 是否加载中
    loading: {
        type: Boolean,
        default: false
    },
    // 背景色
    bgColor: {
        type: String,
        default: '#ffffff'
    },
    // 文字颜色
    color: {
        type: String,
        default: '#C8C8C8'
    },
    // 文字大小
    fontSize: {
        type: [String, Number], 
        default: 19
    },
	// 图标大小
	iconSize: {
	    type: [String, Number],
	    default: 28
	},
    // 加载中图标的颜色，只能rgb或者十六进制颜色值
    loadingColor: {
        type: [String, null],
        default: '#C8C8C8'
    }
})