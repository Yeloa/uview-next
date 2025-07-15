// 参考：https://eslint.bootcss.com/docs/rules/
// 参考：https://blog.csdn.net/x550392236/article/details/89497202
// 参考：https://blog.csdn.net/brokenkay/article/details/111106266

module.exports = {
	root: true,
	/**环境提供预定义的全局变量 */
	env: {
		/**Node.js全局变量和Node.js范围 */
		node: true,
		/**浏览器全局变量 */
		browser: true,
	},
	/**定义ESLint的解析器 */
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		parser: '@typescript-eslint/parser',
	},
	/**定义文件继承的子规范 */
	extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended', './.eslintrc-auto-import.json'],
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		'no-var': 'error', // 要求使用 let 或 const 而不是 var
		//'prettier/prettier': 'off',
		'vue/multi-word-component-names': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'no-undef': 'off',
		'vue/prefer-import-from-vue': 'off',
		'no-prototype-builtins': 'off',
		'prefer-spread': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
		'semi': ['error', 'always'] //行尾需要有分号
	},
	globals: {
		//可以定义全局中的变量的权限（只读，可读可写）
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineExpose: 'readonly',
		withDefaults: 'readonly',
		uni: 'readonly',
	},
	ignorePatterns: [
		// # 忽略目录
		'/dist',
		'/public',
		'/src/public',
		'/src/static',
		'/node_modules',
		// # 忽略文件
		'**/*-min.js',
		'**/*.min.js',
		'**/*-min.css',
		'**/*.min.css',
		'**/*.tsbuildinfo',
		'**/*.config.js',
		'**/*.config.ts',
		'/src/manifest.json',
	],
};
