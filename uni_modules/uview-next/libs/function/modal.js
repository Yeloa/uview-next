let globalModalRef = null;

/**
 * 设置全局Modal引用
 * @param {Object} ref - u-Modal组件的引用
 */
function setModalRef(ref) {
    globalModalRef = ref;
}

/**
 * 显示Modal
 * @param {Object} options - Modal配置选项
 * @param {Object} options.config - Modal配置选项

 */
function showModal(options = {}) {
    // #ifdef VUE2
    console.warn('showModal方法仅支持VUE3使用');
    // #endif

    // #ifdef VUE3
    if (!globalModalRef) {
        console.warn('Modal组件未初始化，请确保u-Modal组件已挂载');
        return;
    }
    globalModalRef.open(options);
    // #endif
}


// 导出函数
export { setModalRef, showModal };
