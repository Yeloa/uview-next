export default {
    props: {
        // #ifdef APP-PLUS-NVUE
        bgColor: {
            type: String,
            default() {
                return uni.$u.props.parse.bgColor
            }
        },
        // #endif
        containerStyle: {
			type: String,
			default() {
                return uni.$u.props.parse.containerStyle
            }
		},
		content: {
			type: String,
			default() {
                return uni.$u.props.parse.content
            }
		},
        copyLink: {
		  type: Boolean,
		  default() {
                return uni.$u.props.parse.copyLink
            }
        },
        domain: {
            type: String,
            default() {
                return uni.$u.props.parse.domain
            }
        },
        errorImg: {
		  type: String,
		  default() {
                return uni.$u.props.parse.errorImg
            }
        },
        lazyLoad: {
		  type: Boolean,
		  default() {
                return uni.$u.props.parse.lazyLoad
            }
        },
        loadingImg: {
		  type: String,
		  default() {
                return uni.$u.props.parse.loadingImg
            }
        },
        pauseVideo: {
		  type: Boolean,
		  default() {
                return uni.$u.props.parse.pauseVideo
            }
        },
        previewImg: {
		  type: Boolean,
		  default() {
                return uni.$u.props.parse.previewImg
            }
        },
        scrollTable: {
            type: Boolean,
            default() {
                return uni.$u.props.parse.scrollTable
            }
        },
        selectable: {
            type: Boolean,
            default() {
                return uni.$u.props.parse.selectable
            }
        },
        setTitle: {
		  type: Boolean,
		  default() {
                return uni.$u.props.parse.setTitle
            }
        },
        showImgMenu: {
		  type: Boolean,
		  default() {
                return uni.$u.props.parse.showImgMenu
            }
        },
        tagStyle: {
            type: Object,
            default() {
                return uni.$u.props.parse.tagStyle
            }
        },
        useAnchor: {
            type: [Boolean, Number],
            default() {
                return uni.$u.props.parse.useAnchor
            }
        }
	}
}
