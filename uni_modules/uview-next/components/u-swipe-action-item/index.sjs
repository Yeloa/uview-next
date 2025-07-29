/**
 * 此为sjs模块，专门为支付宝小程序设计
 * sjs语法与wxs基本相同，但有一些细微差别
 */

// 开始触摸
function touchstart(event, ownerInstance) {
    // 获取触发事件的组件实例
    var instance = event.instance;
    // 获取组件状态
    var state = instance.getState();
    if (state.disabled) return;
    
    var touches = event.touches;
    // 如果是多指触控，不允许操作
    if (touches && touches.length > 1) return;
    
    // 标识当前为滑动中状态
    state.moving = true;
    // 记录触摸开始点的坐标
    state.startX = touches[0].pageX;
    state.startY = touches[0].pageY;
    
    ownerInstance.callMethod('closeOther');
}

// 触摸滑动
function touchmove(event, ownerInstance) {
    var instance = event.instance;
    var state = instance.getState();
    if (state.disabled || !state.moving) return;
    
    var touches = event.touches;
    var pageX = touches[0].pageX;
    var pageY = touches[0].pageY;
    var moveX = pageX - state.startX;
    var moveY = pageY - state.startY;
    var buttonsWidth = state.buttonsWidth;
    
    // 移动的X轴距离大于Y轴距离时，禁止页面滚动
    if (Math.abs(moveX) > Math.abs(moveY) || Math.abs(moveX) > state.threshold) {
        // 支付宝小程序阻止事件传播
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
    }
    
    // 如果Y轴移动距离大于X轴，认为是上下滑动
    if (Math.abs(moveX) < Math.abs(moveY)) return;
    
    // 限制滑动范围
    if (state.status === 'open') {
        // 开启状态下向左滑动需要忽略
        if (moveX < 0) moveX = 0;
        // 最大移动距离为按钮总宽度
        if (moveX > buttonsWidth) moveX = buttonsWidth;
        // 移动收起菜单
        moveSwipeAction(-buttonsWidth + moveX, instance, ownerInstance);
    } else {
        // 关闭状态下右滑需要忽略
        if (moveX > 0) moveX = 0;
        // 限制最大滑动距离
        if (Math.abs(moveX) > buttonsWidth) moveX = -buttonsWidth;
        // 移动显示菜单
        moveSwipeAction(moveX, instance, ownerInstance);
    }
}

// 触摸结束
function touchend(event, ownerInstance) {
    var instance = event.instance;
    var state = instance.getState();
    if (!state.moving || state.disabled) return;
    
    var touches = event.changedTouches ? event.changedTouches[0] : {};
    var pageX = touches.pageX;
    var moveX = pageX - state.startX;
    
    if (state.status === 'open') {
        // 展开状态下继续左滑无需操作
        if (moveX < 0) return;
        // 点击内容区域收起菜单
        if (moveX === 0) {
            return closeSwipeAction(instance, ownerInstance);
        }
        // 根据滑动距离决定是否关闭
        if (Math.abs(moveX) < state.threshold) {
            openSwipeAction(instance, ownerInstance);
        } else {
            closeSwipeAction(instance, ownerInstance);
        }
    } else {
        // 关闭状态下右滑无需操作
        if (moveX > 0) return;
        // 根据滑动距离决定是否打开
        if (Math.abs(moveX) < state.threshold) {
            closeSwipeAction(instance, ownerInstance);
        } else {
            openSwipeAction(instance, ownerInstance);
        }
    }
}

// 获取过渡时间
function getDuration(value) {
    if (value.toString().indexOf('s') >= 0) return value;
    return value > 30 ? value + 'ms' : value + 's';
}

// 移动滑动选择器内容区域
function moveSwipeAction(moveX, instance, ownerInstance) {
    var state = instance.getState();
    // 支付宝小程序获取按钮实例
    var buttons = ownerInstance.selectAllComponents('.u-swipe-action-item__right__button');
    
    // 设置内容部分的偏移
    instance.requestAnimationFrame(function() {
        instance.setStyle({
            transition: 'none',
            transform: 'translateX(' + moveX + 'px)',
            '-webkit-transform': 'translateX(' + moveX + 'px)'
        });
    });
}

// 展开滑动菜单
function openSwipeAction(instance, ownerInstance) {
    var state = instance.getState();
    var buttons = ownerInstance.selectAllComponents('.u-swipe-action-item__right__button');
    var duration = getDuration(state.duration);
    var buttonsWidth = -state.buttonsWidth;
    
    instance.requestAnimationFrame(function() {
        instance.setStyle({
            transition: 'transform ' + duration,
            transform: 'translateX(' + buttonsWidth + 'px)',
            '-webkit-transform': 'translateX(' + buttonsWidth + 'px)'
        });
    });
    setStatus('open', instance, ownerInstance);
}

// 设置菜单状态
function setStatus(status, instance, ownerInstance) {
    var state = instance.getState();
    state.status = status;
    ownerInstance.callMethod('setState', status);
}

// 收起滑动菜单
function closeSwipeAction(instance, ownerInstance) {
    var state = instance.getState();
    var buttons = ownerInstance.selectAllComponents('.u-swipe-action-item__right__button');
    var len = buttons.length;
    var duration = getDuration(state.duration);
    
    instance.requestAnimationFrame(function() {
        // 设置菜单主体内容
        instance.setStyle({
            transition: 'transform ' + duration,
            transform: 'translateX(0px)',
            '-webkit-transform': 'translateX(0px)'
        });
        // 设置按钮为收起状态
        for (var i = len - 1; i >= 0; i--) {
            buttons[i].setStyle({
                transition: 'transform ' + duration,
                transform: 'translateX(0px)',
                '-webkit-transform': 'translateX(0px)'
            });
        }
    });
    setStatus('close', instance, ownerInstance);
}

// status状态变化处理
function statusChange(newValue, oldValue, ownerInstance, instance) {
    var state = instance.getState();
    if (state.disabled) return;
    
    if (newValue === 'close' && state.status === 'open') {
        closeSwipeAction(instance, ownerInstance);
    } else if (newValue === 'open' && state.status === 'close') {
        openSwipeAction(instance, ownerInstance);
    }
}

// 菜单尺寸变化处理
function sizeChange(newValue, oldValue, ownerInstance, instance) {
    var state = instance.getState();
    state.disabled = newValue.disabled;
    state.duration = newValue.duration;
    state.show = newValue.show;
    state.threshold = newValue.threshold;
    state.buttons = newValue.buttons;
    
    if (state.buttons) {
        var len = state.buttons.length;
        var buttonsWidth = 0;
        var buttons = newValue.buttons;
        for (var i = 0; i < len; i++) {
            buttonsWidth += buttons[i].width;
        }
        state.buttonsWidth = buttonsWidth;
    }
}

export default {
    touchstart,
    touchmove,
    touchend,
    statusChange,
    sizeChange
};