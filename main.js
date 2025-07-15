import App from './App';
import uView from '@/uni_modules/uview-next';

// #ifndef VUE3
import Vue from 'vue';
import './uni.promisify.adaptor';
import store from './store';
import mixin from './common/mixin';

Vue.prototype.$store = store;
Vue.config.productionTip = false;
Vue.use(uView);
Vue.mixin(mixin);
App.mpType = 'app';
const app = new Vue({
	...App
});
app.$mount();
// 引入请求封装
require('./util/request/index')(app);
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';
export function createApp() {
	const app = createSSRApp(App);
	app.use(uView);

	return {
		app
	};
}
// #endif
