// 下拉刷新 mixin
export default {
	data() {
		return {
			// 触摸相关状态
			startY: 0,
			startTime: 0,
			isDragging: false,
			lastMoveY: 0,
			dragDistance: 0,
			velocity: 0,
			isTouchStarted: false,
		}
	},
	methods: {
		// 触摸开始
		touchStartHandler(e) {
			
			if (!this.refresherEnabled) return;
			
			const touch = e.touches[0];
			
			// 重置状态
			this.startY = touch.pageY;
			this.startTime = Date.now();
			this.isDragging = false;
			this.dragDistance = 0;
			this.velocity = 0;
			this.lastMoveY = touch.pageY;
			this.isTouchStarted = true;

			if (this.curReadyRefresh && this.refreshStatus !== 3) {
				this.updateContainerStyle('translateY(0px)', '0s');
			}
		},
		
		// 触摸移动
		touchMoveHandler(e) {
			
			if (!this.isTouchStarted || !this.refresherEnabled || 
				!this.curReadyRefresh || this.refreshStatus === 3) return;
			
			const touch = e.touches[0];
			const currentY = touch.pageY;
			const diffY = currentY - this.startY;
			
			if (diffY <= 0) return;
			
			// 计算拖拽距离和速度
			this.dragDistance = diffY;
			this.velocity = (currentY - this.lastMoveY) / (Date.now() - this.startTime);
			this.lastMoveY = currentY;
			this.isDragging = true;
			
			// 应用阻力效果
			const resistedDistance = this.calculateResistance(diffY, 150);
			const displayDistance = resistedDistance * 0.6;
			
			// 更新状态
			if (displayDistance > 10) {
				if (!this.readyRefresh) {
					this.setReadyRefresh({ readyRefresh: true });
					this.readyRefresh = true;
				}
				if (!this.refreshShow) {
					this.setRefreshShow({ refreshShow: true });
					this.refreshShow = true;
				}
			}
			
			// 设置变换
			this.updateContainerStyle('translateY(' + displayDistance + 'px)', '0s');
		
			// 更新刷新状态
			const newStatus = displayDistance >= this.refresherThreshold ? 2 : 1;
			if (this.refreshStatus !== newStatus) {
				this.setRefreshStatus(newStatus);
			}
		},
		
		// 触摸结束
		touchEndHandler(e) {
			if (!this.refresherEnabled || !this.curReadyRefresh || !this.isDragging) return;
			
			// 重置拖拽状态
			this.isDragging = false;
			this.setReadyRefresh({ readyRefresh: false });
			this.readyRefresh = false;
			
			// 判断是否应该刷新
			const shouldRefresh = this.refreshStatus === 2 || 
				(Math.abs(this.velocity) > 0.5 && this.dragDistance > 10);
			
			if (shouldRefresh) {
				// 触发刷新
				this.setRefreshStatus(3);
				
				// 动画到刷新位置
				this.updateContainerStyle('translateY(' + this.refresherThreshold + 'px)', '0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)');
			} else {
				// 回弹动画
				this.updateContainerStyle('translateY(0px)', '0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)');
				
				// 隐藏刷新指示器
				this.setRefreshShow({ refreshShow: false });
				this.refreshShow = false;
			}
			
			// 重置拖拽相关状态
			this.dragDistance = 0;
			this.velocity = 0;
			this.isTouchStarted = false;
		},
		
		// 更新容器样式
		updateContainerStyle(transform, transition) {
			const container = this.$refs['refresh-container'];
			if (container) {
				container.style.transform = transform;
				container.style.transition = transition;
			}
		},
		
		// 计算阻力效果
		calculateResistance(distance, maxDistance) {
			if (distance <= maxDistance) {
				return distance;
			}
			return maxDistance + (distance - maxDistance) * 0.6;
		},
		
		// 重置拖拽状态
		resetDragState() {
			this.refreshShow = false;
			this.readyRefresh = false;
			this.isDragging = false;
			this.dragDistance = 0;
			this.velocity = 0;
			this.isTouchStarted = false;
		},
		
		// 重置容器位置
		resetContainerPosition(useEasing = true) {
			const transition = useEasing ? '0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : '0.3s ease-out';
			this.updateContainerStyle('translateY(0px)', transition);
		}
	}
};