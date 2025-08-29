import App from './App';
import zhCN from './locale/zh-Hans.json';
import enUS from './locale/en-US.json';
import uView, { VueI18n, createI18n } from '@/uni_modules/uview-next';

// #ifndef VUE3
import Vue from 'vue';
Vue.use(VueI18n)
// #endif

const i18n = createI18n({
	locale: 'zh-CN', // 默认显示语言
	fallbackLocale: 'en-US',
	messages: {
		'zh-CN': zhCN,
		'en-US': enUS
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
