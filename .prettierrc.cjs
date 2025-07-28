module.exports = {
	// 核心配置：控制换行的关键
	printWidth: 80,               // 单行代码最大长度，超过则自动换行
	tabWidth: 4,                  // 缩进宽度为4个空格
	useTabs: false,               // 使用空格而非制表符
	
	// 代码风格配置
	singleQuote: true,            // 使用单引号
	semi: true,                   // 语句结尾加分号
	trailingComma: 'all',         // 多行结构中添加尾逗号
	bracketSpacing: true,         // 对象字面量括号间加空格 { foo: bar }
	
	// Vue 相关配置
	vueIndentScriptAndStyle: true, // Vue文件中缩进script和style内容
	htmlWhitespaceSensitivity: 'ignore', // 忽略HTML空白敏感度检查
	
	// 其他配置
	arrowParens: 'always',        // 箭头函数参数始终带括号 (x) => x
	endOfLine: 'auto',            // 自动适配系统换行符
	proseWrap: 'preserve',        // 保持markdown文本换行
	bracketSameLine: false        // 标签闭合括号不与内容同一行
  };
  