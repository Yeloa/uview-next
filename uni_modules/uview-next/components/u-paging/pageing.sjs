// 全局数据存储 - 优化状态管理
var refreshState = {
	startY: 0,
	startTime: 0,
	refreshStatus: 1, // 1: 下拉刷新, 2: 释放刷新, 3: 刷新中, 4: 刷新完成
	refreshShow: false,
	readyRefresh: false,
	refresherThreshold: 40,
	currentReadyRefresh: true,
	isDragging: false,
	lastMoveY: 0,
	dragDistance: 0,
	velocity: 0,
	isTouchStarted: false,
	refresherEnabled: true
};

// 常量定义
var CONSTANTS = {
	MIN_DRAG_DISTANCE: 10,
	MAX_DRAG_DISTANCE: 150,
	ANIMATION_DURATION: '0.3s',
	BOUNCE_DURATION: '0.2s',
	VELOCITY_THRESHOLD: 0.5,
	RESISTANCE_FACTOR: 0.6,
	EASING_FUNCTION: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
};



// 计算阻力效果
function calculateResistance(distance, maxDistance) {
	if (distance <= maxDistance) {
		return distance;
	}
	return maxDistance + (distance - maxDistance) * CONSTANTS.RESISTANCE_FACTOR;
}

// 重置拖拽相关状态
function resetDragState(state) {
	state.refreshShow = false;
	state.readyRefresh = false;
	state.isDragging = false;
	state.dragDistance = 0;
	state.velocity = 0;
	state.isTouchStarted = false;
}

// 设置容器样式
function setContainerStyle(ins, transform, transition) {
	var container = ins.selectComponent('.u-paging__body');
	if (container) {
		container.setStyle({
			'transform': transform,
			'transition': transition
		});
	}
}

// 重置容器位置
function resetContainerPosition(ins, useEasing) {
	var transition = useEasing ? CONSTANTS.ANIMATION_DURATION + ' ' + CONSTANTS.EASING_FUNCTION : CONSTANTS.ANIMATION_DURATION + ' ease-out';
	setContainerStyle(ins, 'translateY(0px)', transition);
}

// 触摸开始
function touchstart(e, ins) {
	if (!refreshState.refresherEnabled) return;
	
	var touch = e.touches[0];
	
	// 重置状态
	refreshState.startY = touch.pageY;
	refreshState.startTime = Date.now();
	refreshState.isDragging = false;
	refreshState.dragDistance = 0;
	refreshState.velocity = 0;
	refreshState.lastMoveY = touch.pageY;
	refreshState.isTouchStarted = true;

	if (refreshState.currentReadyRefresh && refreshState.refreshStatus !== 3) {
		setContainerStyle(ins, 'translateY(0px)', '0s');
	}
}

// 触摸移动
function touchmove(e, ins) {
	if (!refreshState.isTouchStarted || !refreshState.refresherEnabled || 
		!refreshState.currentReadyRefresh || refreshState.refreshStatus === 3) return;
	
	var touch = e.touches[0];
	var currentY = touch.pageY;
	var diffY = currentY - refreshState.startY;
	
	if (diffY <= 0) return;
	
	// 计算拖拽距离和速度
	refreshState.dragDistance = diffY;
	refreshState.velocity = (currentY - refreshState.lastMoveY) / (Date.now() - refreshState.startTime);
	refreshState.lastMoveY = currentY;
	refreshState.isDragging = true;
	
	// 应用阻力效果
	var resistedDistance = calculateResistance(diffY, CONSTANTS.MAX_DRAG_DISTANCE);
	var displayDistance = resistedDistance * CONSTANTS.RESISTANCE_FACTOR;
	
	// 更新状态
	if (displayDistance > CONSTANTS.MIN_DRAG_DISTANCE) {
		if (!refreshState.readyRefresh) {
			ins.callMethod('setReadyRefresh', { readyRefresh: true });
			refreshState.readyRefresh = true;
		}
		if (!refreshState.refreshShow) {
			ins.callMethod('setRefreshShow', { refreshShow: true });
			refreshState.refreshShow = true;
		}
	}
	
	// 设置变换
	setContainerStyle(ins, 'translateY(' + displayDistance + 'px)', '0s');
	
	// 更新刷新状态
	var newStatus = displayDistance >= refreshState.refresherThreshold ? 2 : 1;
	if (refreshState.refreshStatus !== newStatus) {
		ins.callMethod('setRefreshStatus', newStatus);
		refreshState.refreshStatus = newStatus;
	}
}

// 触摸结束
function touchend(e, ins) {
	if (!refreshState.refresherEnabled || !refreshState.currentReadyRefresh || !refreshState.isDragging) return;
	
	// 重置拖拽状态
	refreshState.isDragging = false;
	ins.callMethod('setReadyRefresh', { readyRefresh: false });
	refreshState.readyRefresh = false;
	
	// 判断是否应该刷新
	var shouldRefresh = refreshState.refreshStatus === 2 || 
		(Math.abs(refreshState.velocity) > CONSTANTS.VELOCITY_THRESHOLD && refreshState.dragDistance > CONSTANTS.MIN_DRAG_DISTANCE);
	
	if (shouldRefresh) {
		// 触发刷新
		ins.callMethod('setRefreshStatus', 3);
		refreshState.refreshStatus = 3;
		
		// 动画到刷新位置
		setContainerStyle(ins, 'translateY(' + refreshState.refresherThreshold + 'px)', 
			CONSTANTS.ANIMATION_DURATION + ' ' + CONSTANTS.EASING_FUNCTION);
	} else {
		// 回弹动画
		resetContainerPosition(ins, true);
		
		// 隐藏刷新指示器
		ins.callMethod('setRefreshShow', { refreshShow: false });
		refreshState.refreshShow = false;
	}
	
	// 重置拖拽相关状态
	refreshState.dragDistance = 0;
	refreshState.velocity = 0;
	refreshState.isTouchStarted = false;
}

// 刷新状态变化
function refreshStatusChange(n, o, ins) {
	refreshState.refreshStatus = n;
	
	if (n === 4) {
		resetContainerPosition(ins, true);
		resetDragState(refreshState);
	}
}

// 刷新显示状态变化
function refreshShowChange(n, o, ins) {
	refreshState.refreshShow = n;
}

// 准备刷新状态变化
function readyRefreshChange(n, o, ins) {
	refreshState.readyRefresh = n;
}

// 刷新距离变化
function refresherThresholdChange(n, o, ins) {
	refreshState.refresherThreshold = n || 40;
}

// 当前准备刷新状态变化
function curReadyRefreshChange(n, o, ins) {
	refreshState.currentReadyRefresh = n;
	
	if (!n) {
		resetDragState(refreshState);
		resetContainerPosition(ins, false);
	}
}

// 下拉刷新启用状态变化
function refresherEnabledChange(n, o, ins) {
	refreshState.refresherEnabled = n;
	
	if (!n) {
		resetDragState(refreshState);
		resetContainerPosition(ins, false);
	}
}

// 导出模块
export default {
	touchstart,
	touchmove,
	touchend,
	refreshStatusChange,
	refreshShowChange,
	readyRefreshChange,
	refresherThresholdChange,
	curReadyRefreshChange,
	refresherEnabledChange
};