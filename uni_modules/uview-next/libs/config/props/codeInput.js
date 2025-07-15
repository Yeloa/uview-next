/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:55:58
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/codeInput.js
 */

import theme from '../theme.js';

export default {
	// codeInput 组件
	codeInput: {
		type: 'number',
		adjustPosition: true,
		maxlength: 6,
		confirmType: 'done',
		confirmHold: false,
		dot: false,
		mode: 'box',
		hairline: false,
		space: 10,
		value: '',
		focus: false,
		bold: false,
		color: theme.contentColor,
		fontSize: 18,
		size: 35,
		disabledKeyboard: false,
		borderColor: theme.borderColor,
		disabledDot: true,
		bgColor: '',
		round: 4
	}
};
