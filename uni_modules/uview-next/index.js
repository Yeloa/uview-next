// 引入全局mixin
import mixin from './libs/mixin/mixin.js';
// 小程序特有的mixin
import mpMixin from './libs/mixin/mpMixin.js';
// 全局挂载引入http相关请求拦截插件
import Request from './libs/luch-request';

// 路由封装
import route from './libs/util/route.js';
// 颜色渐变相关,colorGradient-颜色渐变,hexToRgb-十六进制颜色转rgb颜色,rgbToHex-rgb转十六进制
import colorGradient from './libs/function/colorGradient.js';

// 规则检验
import test from './libs/function/test.js';
// 防抖方法
import debounce from './libs/function/debounce.js';
// 节流方法
import throttle from './libs/function/throttle.js';
// 公共文件写入的方法
import index from './libs/function/index.js';

// 配置信息
import config from './libs/config/config.js';

// 主题配置
import theme from './libs/config/theme.js';
// 平台
import platform from './libs/function/platform';

// 国际化
import { $t, VueI18n, createI18n } from './locale';

const http = new Request();

const $u = {
	date: index.timeFormat, // 另名date
	colorGradient: colorGradient.colorGradient,
	hexToRgb: colorGradient.hexToRgb,
	rgbToHex: colorGradient.rgbToHex,
	colorToRgba: colorGradient.colorToRgba,
	darkenColor: colorGradient.darkenColor,
	route,
	test,
	type: ['primary', 'success', 'error', 'warning', 'info'],
	http,
	config, // uView配置信息相关，比如版本号
	debounce,
	throttle,
	mixin,
	mpMixin,
	theme,
	platform,
	$t,
	...index
};

// $u挂载到uni对象上
uni.$u = $u;

const install = (Vue, Params) => {

	// #ifdef VUE2
	// 时间格式化，同时两个名称，date和timeFormat
	Vue.filter('timeFormat', (timestamp, format) => uni.$u.timeFormat(timestamp, format));
	Vue.filter('date', (timestamp, format) => uni.$u.timeFormat(timestamp, format));
	// 将多久以前的方法，注入到全局过滤器
	Vue.filter('timeFrom', (timestamp, format) => uni.$u.timeFrom(timestamp, format));
	
	Vue.prototype.$t = uni.$u.$t;

	// 同时挂载到uni和Vue.prototype中
	// #ifndef APP-NVUE
	Vue.prototype.$u = $u;
	Vue.mixin(mixin);
	// #endif
	// #endif

	// 同时挂载到uni和app.config.globalProperties中
	// #ifdef VUE3
	Vue.config.globalProperties.$timeFormat = (timestamp, format) => uni.$u.timeFormat(timestamp, format);
	Vue.config.globalProperties.$date = (timestamp, format) => uni.$u.timeFormat(timestamp, format);
	Vue.config.globalProperties.$timeFrom = (timestamp, format) => uni.$u.timeFrom(timestamp, format);
	// #ifndef APP-NVUE
	
	Vue.mixin(mixin);
	// #endif
	// #endif

	if (Params) {
		uni.$u.setConfig(Params);
	}
};

export { VueI18n, createI18n, http, route, debounce, throttle, theme, platform };

export default {
	install
};
