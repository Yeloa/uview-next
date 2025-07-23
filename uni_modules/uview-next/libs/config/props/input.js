/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:13:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/input.js
 */

import theme from '../theme.js'

export default {
	// index 组件
	input: {
		value: '',
		type: 'text',
		fixed: false,
		disabled: false,
		disabledColor: '#f5f7fa',
		clearable: false,
		password: false,
		maxlength: -1,
		placeholder: '',
		placeholderClass: 'input-placeholder',
		placeholderStyle: 'color: #c0c4cc',
		confirmType: 'done',
		confirmHold: false,
		holdKeyboard: false,
		focus: false,
		autoBlur: false,
		disableDefaultPadding: false,
		alwaysEmbed: false,
		cursor: -1,
		cursorSpacing: 30,
		selectionStart: -1,
		selectionEnd: -1,
		adjustPosition: true,
		inputAlign: 'left',
		fontSize: '15px',
		color: theme.contentColor,
		prefixIcon: '',
		prefixIconStyle: '',
		suffixIcon: '',
		suffixIconStyle: '',
		border: 'surround',
		readonly: false,
		shape: 'square',
		backgroundColor: '',
		round: '4px',
		borderColor: '',
	}
}
