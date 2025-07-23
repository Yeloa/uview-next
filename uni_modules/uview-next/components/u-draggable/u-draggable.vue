<template>
	<view class="u-draggable" ref="uDraggable">
		<movable-area class="u-draggable__area" :style="[areaStyles]">
			<movable-view
				v-for="(item, index) in cloneList"
				direction="all"
				class="u-draggable__view"
				:key="index"
				:style="[{
					width: $u.addUnit(width),
					height: $u.addUnit(height)
				}]"
				:class="[{ 
					'u-draggable__active': index == activeIndex,
					'u-draggable__disabled': disabled || item.disabled,
				}]"
				:x="item.x"
				:y="item.y"
				:friction="friction"
				:damping="damping"
				:disabled="item.disabled || (longpress && !longPressStarted) || !isDrag"
				@change="handleTouchMove($event, index)"
				@longpress="handleLongPress($event, index)"
				@touchstart="handleTouchStart($event, index)"
				@touchend="handleTouchEnd"
				@touchcancel="handleTouchEnd"
			>
				<slot
					name="item"
					:index="index"
					:startIndex="item.startIndex"
					:item="item.item"
					:active="!item.disabled && index == activeIndex"
					:disabled="item.disabled"
				/>
				
				<view class="u-draggable__close" v-if="closeable && !item.disabled" @click.stop="closeItem(index)">
					<slot name="close">
						<view class="u-draggable__close-inner">
							<u-icon name="close" size="12" color="#fff"></u-icon>
						</view>
					</slot>
				</view>
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
// #ifdef APP-NVUE
const dom = weex.requireModule('dom');
// #endif
import props from './props.js';
import mixin from '../../libs/mixin/mixin';
import mpMixin from '../../libs/mixin/mpMixin';

/**
 * u-draggable 拖拽排序
 * @description 拖拽排序组件，支持多列拖拽排序，可关闭，手柄拖拽，长按拖拽。
 * @tutorial https://uveiw.bdxmz.cn/components/draggable.html
 * @property {Array}			list			数据列表 （默认 [] ）
 * @property {Number}			column			列数 （默认 2 ）
 * @property {Number}			aspectRatio		宽高比，填写这项时gridHeight失效 （默认 null ）
 * @property {Number}			itemHeight		项目高度 （默认 60 ）
 * @property {Number}			damping			阻尼系数 （默认 50 ）
 * @property {Number}			friction		摩擦系数 （默认 2 ）
 * @property {Boolean}			handle			是否使用手柄拖拽 （默认 false ）
 * @property {Boolean}			disabled			是否禁用 （默认 false ）
 * @property {Boolean}			longpress			是否长按拖拽 （默认 false ）
 * @property {Boolean}			closeable			是否显示关闭按钮 （默认 false ）
 *
 * @event {Function}	change	拖拽排序组件被点击时触发
 * @event {Function}	close	拖拽排序组件被关闭时触发
 * @example <u-draggable :list="list" @change="change"></u-draggable>
 */

export default {
	name: 'u-draggable',
	mixins: [mpMixin, mixin, props],
	data() {
		return {
			isDrag: false,
			isInit: false,
			maxIndex: -1,
			activeIndex: -1,
			isDisabled: false,
			positions: [],
			cloneList: [],
			containerWidth: 0,
			positionMap: [],
			longPressStarted: false,
			dragState: {
				item: null,     // 当前拖拽的元素
				index: 0,       // 当前索引位置
				oldIndex: -1,   // 开始拖拽时的索引位置
				sortableIndex: -1 // 在可排序数组中的索引
			}
		};
	},
	computed: {
		rows() {
			return Math.ceil((this.isInit ? this.cloneList.length : this.list.length) / this.column);
		},
		height() {
			if (this.aspectRatio) {
				return this.width / this.aspectRatio;
			}
			return this.$u.getPx(this.itemHeight);
		},
		width() {
			return this.containerWidth / this.column;
		},
		areaStyles() {
			return {
				// #ifdef APP-NVUE
				width: this.$u.addUnit(this.containerWidth),
				// #endif
				height: this.$u.addUnit((this.rows) * this.height)
			};
		}
	},
	mounted() {
		this.init();
	},
	watch: {
		list: {
			handler(newVal) {
				this.init();
			},
			deep: true
		}
	},
	// #ifdef VUE3
	emits: ['change', 'close'],
	// #endif
	methods: {
		async init() {
			// 清除旧数据
			this.clear();
			await this.$nextTick();
			const res = await this.getContainerRect();
			
			if (res && res.width) {
				this.containerWidth = res.width;
				this.positions = [];
				this.positionMap = [];
				
				let sortableIndex = 0;
				this.cloneList = this.list.map((item, listIndex) => {
					this.maxIndex++;
					
					// 计算网格位置
					const row = Math.floor(listIndex / this.column);
					const col = listIndex % this.column;
					const x = col * this.width;
					const y = row * this.height;
					
					// 创建位置信息
					this.positions[listIndex] = {
						row,
						x,
						y,
						x1: x + this.width,
						y1: y + this.height,
						disabled: item.disabled,
						oldIndex: listIndex
					};
					
					// 处理禁用和可排序项的映射
					if (item.disabled) {
						this.positionMap.push({ index: listIndex, disabled: true, sortableIndex: -1 });
					} else {
						this.positionMap.push({ index: listIndex, disabled: false, sortableIndex: sortableIndex });
						sortableIndex++;
					}
					
					// 创建克隆项
					return {
						index: listIndex,
						item,
						x: x,
						y: y,
						startIndex: listIndex,
						disabled: item.disabled,
						oldIndex: listIndex
					};
				});

				this.isInit = true;
			}
		},

		getContainerRect() {
			return new Promise(resolve => {
				// #ifndef APP-NVUE
				this.$uGetRect('.u-draggable').then(res => {
					resolve(res);
				});
				// #endif

				// #ifdef APP-NVUE
				const ref = this.$refs['uDraggable'];
				if (ref) {
					dom.getComponentRect(ref, (res) => {
						resolve({
							height: res.size.height,
							width: res.size.width
						});
					});
				} else {
					resolve({ height: 0, width: 0 });
				}
				// #endif
			});
		},

		handleTouchStart(event, index) {

			const { handle } = event.target.dataset || {}
			if(this.handle && !handle) {
				return;
			}
	
			// 如果启用了长按模式且未长按，不允许拖拽
			if (this.longpress && !this.longPressStarted) {
				return;
			}

			// 获取目标元素并进行验证
			const targetItem = this.cloneList[index];
			if (!targetItem || targetItem.disabled || this.disabled) return;
			
			// 检查positionMap是否存在对应的数据
			const positionData = this.positionMap[targetItem.oldIndex];
			if (!positionData) return;
			
			// 设置拖拽状态
			this.isDrag = true;
			this.activeIndex = index;
			
			this.dragState.item = targetItem;
			this.dragState.index = targetItem.index;
			this.dragState.oldIndex = targetItem.index;
			this.dragState.sortableIndex = positionData.sortableIndex;
		},

		handleTouchMove(event, index) {
			
			// 如果不在拖拽状态，直接返回
			if (!this.isDrag) return;

			// 如果不是当前激活的元素，直接返回
			if (index !== this.activeIndex) return;

			// 获取当前位置
			const {x, y} = event.detail;
			
			// 计算中心点坐标
			const centerX = x + this.width / 2;
			const centerY = y + this.height / 2;
			
			this.detectCollision(centerX, centerY, index);
		},

		handleLongPress(event, index) {
			// 标记长按已开始
			this.longPressStarted = true;
			// 触发拖拽开始
			this.handleTouchStart(event, index);
			// 震动反馈（如果支持）
			if (uni.vibrateShort) {
				uni.vibrateShort();
			}
		},

		handleTouchEnd(event) {
			this.longPressStarted = false;
			// 如果没有激活的元素或全局禁用，直接返回
			if (this.activeIndex === -1 || this.disabled) return;

			// 结束拖拽状态
			this.isDrag = false;

			// 判断是否需要触发变更事件（只有当位置发生变化时）
			const hasPositionChanged = this.dragState.index !== this.dragState.oldIndex && this.dragState.oldIndex > -1;
			
			// 获取最后拖拽的元素和目标位置
			const lastDraggedItem = this.cloneList[this.activeIndex];
			const targetPosition = this.positions[this.dragState.index];

			// 验证元素和位置
			if (!lastDraggedItem || this.positionMap[this.dragState.index].disabled) {
				this.activeIndex = -1;
				return;
			}

			// 添加微小偏移以确保动画效果
			lastDraggedItem.x = targetPosition.x + 0.001;
			lastDraggedItem.y = targetPosition.y + 0.001;

			// 延迟设置最终位置并触发事件
			uni.$u.sleep(30).then(() => {
				// 设置最终位置
				lastDraggedItem.x = targetPosition.x;
				lastDraggedItem.y = targetPosition.y;
				
				// 如果位置发生变化，触发事件并重置状态
				if (hasPositionChanged) {
					this.dragState.oldIndex = -1;
					this.activeIndex = -1;
					this.triggerEmits();
				} else {
					// 即使位置没有变化，也需要重置激活状态
					this.activeIndex = -1;
				}
			});
		},
		
		detectCollision(centerX, centerY, activeIndex) {
			// 如果全局禁用，直接返回
			if (this.disabled) return;
			
			// 快速边界检查
			if (centerX < 0 || centerY < 0 || 
				centerX > this.containerWidth || 
				centerY > this.rows * this.height) {
				return;
			}
			
			// 获取当前行和列
			const currentRow = Math.floor(centerY / this.height);
			const currentCol = Math.floor(centerX / this.width);
			
			// 计算可能的目标索引
			const possibleIndex = currentRow * this.column + currentCol;
		
			// 验证索引是否有效且不是禁用位置
			if (possibleIndex >= 0 && 
				possibleIndex < this.positions.length && 
				possibleIndex !== this.dragState.index &&
				!this.positionMap[possibleIndex].disabled) {
				
				const targetPos = this.positions[possibleIndex];
				// 检查是否在目标区域内
				if (
					centerX >= targetPos.x && 
					centerX <= targetPos.x1 && 
					centerY >= targetPos.y && 
					centerY <= targetPos.y1
				) {
					// 执行交换（只在可排序项之间）
					this.swapSortableItems(activeIndex, possibleIndex);
				}
			}
		},
		
		swapSortableItems(fromIndex, toIndex) {
			// 快速边界检查
			if (toIndex < 0 || toIndex >= this.positions.length) return;
			
			// 如果全局禁用或目标位置是禁用位置，直接返回
			if (this.disabled || this.positionMap[toIndex].disabled) return;

			// 获取拖拽元素
			const draggedItem = this.cloneList[fromIndex];
			if (!draggedItem || draggedItem.disabled) return;
			
			// 查找目标位置的元素
			const targetItem = this.cloneList.find(item => item.index === toIndex);
			if (!targetItem || targetItem.disabled) return;

			// 获取目标元素在cloneList中的索引
			const targetCloneIndex = this.cloneList.findIndex(item => item.index === toIndex);
			if (targetCloneIndex === -1) return;

			// 交换位置信息
			const draggedPosition = this.positions[this.dragState.index];
			const targetPosition = this.positions[toIndex];

			// 更新目标元素位置
			targetItem.x = draggedPosition.x;
			targetItem.y = draggedPosition.y;
			targetItem.index = this.dragState.index;

			// 更新拖拽元素索引
			draggedItem.index = toIndex;
			
			// 如果是拖拽状态，更新dragState的索引
			if (this.isDrag) {
				this.dragState.index = toIndex;
			}
		},

		triggerEmits() {
			// 按位置索引排序所有剩余项目
			const sortedItems = [...this.cloneList].sort((a, b) => a.index - b.index);
			
			// 创建最终结果数组
			const result = sortedItems.map(item => item.item);
			
			// 触发变更事件
			this.$emit('change', result);
		},

		closeItem(index) {
			// 如果全局禁用或项目禁用，直接返回
			if (this.disabled || (this.cloneList[index] && this.cloneList[index].disabled)) return;
			
			// 重置拖拽状态
			this.activeIndex = -1;
			this.isDrag = false;

			// 获取要删除的项目并验证
			const itemToRemove = this.cloneList[index];
			if (!itemToRemove) return;

			// 获取被删除项目的位置索引
			const removedPosition = itemToRemove.index;
			
			// 从列表中移除项目
			this.cloneList.splice(index, 1);
			
			// 重新计算所有项目的位置
			this.cloneList.forEach((item, idx) => {
				// 如果项目的位置索引大于被删除项目的位置，需要前移
				if (item.index > removedPosition) {
					item.index--;
					
					// 重新计算网格位置
					const row = Math.floor(item.index / this.column);
					const col = item.index % this.column;
					const x = col * this.width;
					const y = row * this.height;
					
					// 更新位置
					item.x = x;
					item.y = y;
					
					// 更新positions数组
					this.positions[item.index] = {
						row,
						x,
						y,
						x1: x + this.width,
						y1: y + this.height,
						disabled: item.disabled,
						oldIndex: item.index
					};
				}
			});
			
			// 重建位置映射表
			this.rebuildPositionMap();
			
			// 删除多余的位置信息
			if (this.positions.length > this.cloneList.length) {
				this.positions.splice(this.cloneList.length);
			}
			
			this.$emit('close', index);
		},

		
		rebuildPositionMap() {
			this.positionMap = [];
			let sortableIndex = 0;
			
			this.cloneList.forEach((item) => {
				if (item.disabled) {
					this.positionMap.push({ 
						index: item.index, 
						disabled: true, 
						sortableIndex: -1 
					});
				} else {
					this.positionMap.push({ 
						index: item.index, 
						disabled: false, 
						sortableIndex: sortableIndex 
					});
					sortableIndex++;
				}
			});
		},

		clear() {
			this.isInit = false;
			this.isDrag = false;
			this.maxIndex = -1;
			this.activeIndex = -1;
			this.cloneList = [];
			this.positions = [];
			this.positionMap = [];
		}
	},
	// #ifdef VUE2
	beforeDestroy() {
		this.clear();
	}
	// #endif
	// #ifdef VUE3
	beforeUnmount() {
		this.clear();
	}
	// #endif
};
</script>

<style lang="scss" scoped>
.u-draggable {
	overflow: hidden;
	/* #ifdef APP-NVUE */
	flex: 1;
	/*  #endif */
	/* #ifndef APP-NVUE */
	width: 100%;
	/*  #endif */

	&__area {
		/* #ifdef APP-NVUE */
		flex: 1;
		/*  #endif */
		/* #ifndef APP-NVUE */
		width: 100%;
		/*  #endif */
	}

	&__handle {
		position: absolute;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		right: 0;
		top: 0;
		
		&-inner {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60px;
			height: 60px;
			background-color: #000;
		
		}
	}

	&__close {
		position: absolute;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		right: 0;
		top: 0;
		&-inner {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 20px;
			height: 20px;
			background-color: #000;
			border-radius: 50%;
			opacity: 0.8;
		}
	}

	&__view {
		z-index: 2;
		transition: opacity 300ms ease;
		box-sizing: border-box;
		
	}

	&__active {
		z-index: 9999;
		transition: transform 100ms ease;
	}

		
	&__disabled {
		opacity: 0.5;
		cursor: not-allowed;
		/* #ifndef APP-NVUE */
		pointer-events: none;
		/*  #endif */
	}

}

</style>
