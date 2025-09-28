import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import zhCN from './zh-Hans.json'
import zhHK from './zh-Hant.json'
import arSA from './ar-SA.json'
import deDE from './de-DE.json'
import jaJP from './ja-JP.json'
import koKR from './ko-KR.json'
import ruRU from './ru-RU.json'


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
            'en': en, //英文
            'fr': fr, //法文
            'es': es, //西班牙文
            'zh-Hans': zhCN, //简体中文
            'zh-Hant': zhHK, //繁体中文（香港）
            'ja-JP': jaJP,  //日文
            'ko-KR': koKR, //韩文
            'de-DE': deDE, //德文
            'ru-RU': ruRU, //俄文
            'ar-SA': arSA, //阿拉伯文
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
