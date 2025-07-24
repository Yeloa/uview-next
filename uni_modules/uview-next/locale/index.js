import enUS from './en-US.json'
import zhCN from './zh-Hans.json'
import zhHK from './zh-HK.json'

// #ifdef VUE2
import VueI18n from 'vue-i18n'
// #endif

// #ifdef VUE3
import { createI18n as createI18nVue3 } from 'vue-i18n'
const VueI18n = {}
// #endif

function $t(key){
	return zhCN[key]
}

function createI18n(config) {
    
    const defaultConfig = {
        locale: 'zh-CN', // 默认显示语言
        fallbackLocale: 'en-US',
        messages: {
            'zh-CN': zhCN,
            'en-US': enUS,
            'zh-HK': zhHK
        }
    }

    config = uni.$u.deepMerge(defaultConfig, config)

    let i18n = null
    // #ifdef VUE2
    i18n = new VueI18n(config)
    uni.$u.$t = i18n.t.bind(i18n)
    // #endif

    // #ifdef VUE3
    i18n = createI18nVue3(config)
    uni.$u.$t = i18n.global.t.bind(i18n.global)
    // #endif
	
    uni.$u.setLocale = (locale) => {
        // #ifdef VUE2
        i18n.locale = locale
        // #endif
        // #ifdef VUE3
        i18n.global.locale = locale
        // #endif
        uni.setStorageSync('locale', locale)
    }
	
    return i18n
}

export {
    $t,
    VueI18n,
    createI18n
}
