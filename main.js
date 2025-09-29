import App from './App';
import en from './locale/en.json';
import es from './locale/es.json';
import fr from './locale/fr.json';
import zhHans from './locale/zh-Hans.json';
import zhHK from './locale/zh-Hant.json';
import arSA from './locale/ar-SA.json';
import deDE from './locale/de-DE.json';
import jaJP from './locale/ja-JP.json';
import koKR from './locale/ko-KR.json';
import uView, { VueI18n, createI18n } from '@/uni_modules/uview-next';

// #ifndef VUE3
import Vue from 'vue';
Vue.use(VueI18n)
// #endif
const locale = uni.getLocale();

const i18n = createI18n({
	locale: uni.getLocale(), // 默认显示语言
	fallbackLocale: 'en',
	messages: {
		'en': en,
		'es': es,
		'fr': fr,
		'zh-Hans': zhHans,
		'zh-Hant': zhHK,
		'ar-SA': arSA,
		'de-DE': deDE,
		'ja-JP': jaJP,
		'ko-KR': koKR
	}
})

// #ifndef VUE3
import './uni.promisify.adaptor';

Vue.config.productionTip = false;
Vue.use(uView);
App.mpType = 'app';
const app = new Vue({
	i18n,
	...App
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';
export function createApp() {
	const app = createSSRApp(App);
	
	app.use(uView);
	app.use(i18n);
	
	return {
		app
	};
}
// #endif
