let globalActionSheetRef = null;

/**
 * 设置全局ActionSheet引用
 * @param {Object} ref - u-ActionSheet组件的引用
 */
function setActionSheetRef(ref) {
    globalActionSheetRef = ref;
}

/**
 * 显示ActionSheet
 * @param {Object} options - ActionSheet配置选项
 * @param {String} options.title - 操作菜单标题
 * @param {String} options.description - 选项上方的描述信息
 * @param {Array} options.actions - 按钮的文字数组
 * @param {String} options.cancelText - 取消按钮的提示文字
 * @param {Boolean} options.closeOnClickAction - 点击某个菜单项时是否关闭弹窗
 * @param {Boolean} options.safeAreaInsetBottom - 处理底部安全区
 * @param {Boolean} options.closeOnClickOverlay - 点击遮罩是否允许关闭
 * @param {Number|String} options.round - 圆角值
 * @param {Number|String} options.height - 高度
 * @param {Function} options.success - 成功回调函数
 * @param {Function} options.fail - 失败回调函数
 */
function showActionSheet(options = {}) {
    // #ifdef VUE2
    console.warn('showActionSheet方法仅支持VUE3使用');
    // #endif

    // #ifdef VUE3
    if (!globalActionSheetRef) {
        console.warn('ActionSheet组件未初始化，请确保u-ActionSheet组件已挂载');
        return;
    }
    globalActionSheetRef.open(options);
    // #endif
}

// 导出函数
export { setActionSheetRef, showActionSheet };
