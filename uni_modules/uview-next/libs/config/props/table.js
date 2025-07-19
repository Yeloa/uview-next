/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:48:53
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/table.js
 */
import theme from '../theme.js';

export default {
	// table组件
	table: {
		data: [],
		border: true,
		round: 0,
		stripe: false,
		scrollX: true,
		height: null,
		rowHeight: 40,
		showHeader: true,
		ellipsis: true,
		emptyText: '',
		emptyHeight: 200,
		rowKey: 'id',
		defaultSelection: [],
		customClass: '',
		customStyle: {},
		mergeConfig: [],
		showSummary: false,
		sumText: '合计',
		summaryColumns: []
	}
};
