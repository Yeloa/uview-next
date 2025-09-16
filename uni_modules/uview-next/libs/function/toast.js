let globalToastRef = null;

/**
 * 设置全局Toast引用
 * @param {Object} ref - u-toast组件的引用
 */
function setToastRef(ref) {
    globalToastRef = ref;
}

/**
 * 显示Toast
 * @param {Object} options - Toast配置选项
 * @param {string} options.message - 显示的消息
 * @param {string} options.type - Toast类型: default, primary, success, error, warning, loading
 * @param {number} options.duration - 显示时长(毫秒)
 * @param {string} options.position - 位置: top, center, bottom
 * @param {boolean} options.overlay - 是否显示遮罩
 * @param {Function} options.complete - 完成回调
 */
function showToast(options = {}) {
    // #ifdef VUE2
    console.warn('showToast方法仅支持VUE3使用');
    // #endif
    // #ifdef VUE3
    if (!globalToastRef) {
        console.warn('Toast组件未初始化，请确保u-toast组件已挂载');
        return;
    }
    globalToastRef.open(options);
    // #endif
}

/**
 * 隐藏Toast
 */
function hideToast() {
    // #ifdef VUE2
    console.warn('hideToast方法仅支持VUE3使用');
    // #endif
     // #ifdef VUE3
    if (!globalToastRef) {
        console.warn('Toast组件未初始化，请确保u-toast组件已挂载');
        return;
    }
    globalToastRef.close();
    // #endif
}

/**
 * 获取全局Toast引用
 * @returns {Object} - u-toast组件的引用
 */
function showLoading(options = {}) {
    showToast({
        title: '加载中...',
        duration: 0,
        ...options,
        type: 'loading'
    });
}

/**
 * 隐藏Loading
 */
function hideLoading() {
    hideToast();
}

// 导出函数
export { setToastRef, showToast, hideToast, showLoading, hideLoading };
