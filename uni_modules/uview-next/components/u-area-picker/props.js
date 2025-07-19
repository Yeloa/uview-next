export default {
    props: {
        // 输入的值
        // #ifdef VUE2
		value: {
			type: [Array, String, Number],
            default() {
				return uni.$u.props.areaPicker.value
			}
		},
		// #endif
		// #ifdef VUE3
		modelValue: {
			type: [Array, String, Number],
            default() {
				return uni.$u.props.areaPicker.value
			}
		},
		// #endif
        // 是否展示picker弹窗
        show: {
            type: Boolean,
            default() {
				return uni.$u.props.areaPicker.show
			}
        },
        // 是否显示省份
        province: {
            type: Boolean,
            default() {
				return uni.$u.props.areaPicker.province
			}
        },
        // 是否显示城市
        city: {
            type: Boolean,
            default() {
				return uni.$u.props.areaPicker.city
			}
        },
        // 是否显示区县
        county: {
            type: Boolean,
            default() {
				return uni.$u.props.areaPicker.county
			}
        },
        // 是否展示顶部的操作栏
        showToolbar: {
            type: Boolean,
            default() {
				return uni.$u.props.areaPicker.showToolbar
			}
        },
        // 顶部标题
        title: {
            type: String,
            default() {
				return uni.$u.props.areaPicker.title
			}
        },
        // 是否显示加载中状态
        loading: {
            type: Boolean,
            default() {
				return uni.$u.props.areaPicker.loading
			}
        },
        // 各列中，单个选项的高度
        itemHeight: {
            type: [String, Number],
            default() {
				return uni.$u.props.areaPicker.itemHeight
			}
        },
        // 取消按钮的文字
        cancelText: {
            type: String,
            default() {	
                return uni.$u.$t('uAreaPicker.cancelText')
			}
        },
        // 确认按钮的文字
        confirmText: {
            type: String,
            default() {
                return uni.$u.$t('uAreaPicker.confirmText')
			}
        },
        // 取消按钮的颜色
        cancelColor: {
            type: String,
            default() {
				return uni.$u.props.areaPicker.cancelColor
			}
        },
        // 确认按钮的颜色
        confirmColor: {
            type: String,
            default() {
				return uni.$u.props.areaPicker.confirmColor
			}
        },
        // 每列中可见选项的数量
        visibleItemCount: {
            type: [String, Number],
            default() {
				return uni.$u.props.areaPicker.visibleItemCount
			}
        },
        // 是否允许点击遮罩关闭选择器
        closeOnClickOverlay: {
            type: Boolean,
            default() {
				return uni.$u.props.areaPicker.closeOnClickOverlay
			}
        },
		// 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，只在微信2.21.1及以上有效
		immediateChange: {
			type: Boolean,
			default() {
				return uni.$u.props.areaPicker.immediateChange
			}
		},
		// 设置圆角值
		round: {
			type: String,
			default() {
				return uni.$u.props.areaPicker.round
			}
		},
		showInput: {
			type: Boolean,
			default() {
                return uni.$u.props.areaPicker.showInput
            }
		},
		separator: {
            type: String,
            default() {
                return uni.$u.props.areaPicker.separator
            }
        },
        placeholder: {
            type: String,
            default() {
                return uni.$u.$t('uAreaPicker.placeholder')
            }
        },
        disabled: {
            type: Boolean,
            default() {
                return uni.$u.props.areaPicker.disabled
            }
        },
        // 背景颜色
		backgroundColor: {
			type: String,
			default() {
				return uni.$u.props.areaPicker.backgroundColor
			}
		},
		// 边框圆角
		borderRadius: {
			type: String,
			default() {
				return uni.$u.props.areaPicker.borderRadius
			}
		},
        // 边框类型，surround-四周边框，bottom-底部边框，none-无边框
		border: {
			type: String,
			default() {
				return uni.$u.props.areaPicker.border
			}
		},
        clearable: {
            type: Boolean,
            default() {
                return uni.$u.props.areaPicker.clearable
            }
        },
        inputProps:{
            type: Object,
            default() {
                return uni.$u.props.areaPicker.inputProps
            }
        }
    }
}
