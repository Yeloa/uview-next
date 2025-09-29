import { defineProps } from '../../libs/util/props';

export default defineProps('parse', {
    containerStyle: {
		type: String,
		default: ''
	},
	content: {
		type: String,
		default: ''
	},
    copyLink: {
	  type: Boolean,
	  default: true
    },
    domain: {
        type: String,
        default: ''
    },
    errorImg: {
	  type: String,
	  default: ''
    },
    lazyLoad: {
	  type: Boolean,
	  default: false
    },
    loadingImg: {
	  type: String,
	  default: ''
    },
    pauseVideo: {
	  type: Boolean,
	  default: true
    },
    previewImg: {
	  type: Boolean,
	  default: true
    },
    scrollTable: {
        type: Boolean,
        default: false
    },
    selectable: {
        type: Boolean,
        default: false
    },
    setTitle: {
	  type: Boolean,
	  default: true
    },
    showImgMenu: {
	  type: Boolean,
	  default: true
    },
    tagStyle: {
        type: Object,
        default: () => ({})
    },
    useAnchor: {
        type: [Boolean, Number],
        default: null
    }
})
