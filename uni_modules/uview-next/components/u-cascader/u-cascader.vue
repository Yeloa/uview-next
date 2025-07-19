<template>
	<u-popup 
		:show="show" 
		mode="bottom" 
		:closeOnClickOverlay="closeOnClickOverlay"
		:zIndex="zIndex"
		:closeable="closeable"
		:safeAreaInsetBottom="safeAreaInsetBottom"
		:bgColor="bgColor"
		:round="round"
		@close="onClose"
	>
		<view class="u-cascader">
			<!-- 头部 -->
			<view class="u-cascader__header">
				<text class="u-cascader__title" :style="[{
					color: titleColor,
					fontSize: titleFontSize
				}]">{{ title }}</text>
			</view>
			
			<!-- 标签页 -->
			<view class="u-cascader__tabs">
				<u-tabs 
					:list="tabsList"
					:current="activeTabIndex"
					:scrollable="true"
					:activeStyle="{ color: activeColor, fontWeight: '600' }"
					:inactiveStyle="{ color: color }"
					:lineColor="activeColor"
					:keyName="'name'"
					@change="switchTab"
				></u-tabs>
			</view>
			
			<!-- 选项列表 -->
			<scroll-view class="u-cascader__content" scroll-y>
				<view class="u-cascader__list">
					<view 
						v-for="(item, index) in currentOptions" 
						:key="index"
						class="u-cascader__item"
						:class="{ 'u-cascader__item--selected': isSelected(item) }"
						:style="[{
							backgroundColor: isSelected(item) ? activeBgColor : '',
							height: $u.addUnit(itemHeight), 
						}]"
						@tap="selectItem(item)"
					>
						<text class="u-cascader__item-text" :style="[{ 
							fontWeight: isSelected(item) && activeBold ? '800' : '400',
							fontSize: $u.addUnit(fontSize)
						}]">
							{{ getLabel(item) }}
						</text>
						<view v-if="isSelected(item)"  class="u-cascader__item-right">
							<u-icon name="checkmark" size="18" :color="iconColor || activeColor"></u-icon>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</u-popup>
</template>

<script>
import props from './props.js';
import mixin from '../../libs/mixin/mixin';
import mpMixin from '../../libs/mixin/mpMixin';

/**
 * Cascader 级联选择器
 * @description 级联选择器，用于多级数据的选择，支持单选和多选模式
 * @tutorial https://uveiw.bdxmz.cn/components/cascader.html
 * @property {Boolean}		show				是否显示级联选择器（默认 false ）
 * @property {String}		title				选择器标题（默认 '请选择' ）
 * @property {Array}		options				选项数据（默认 [] ）
 * @property {String|Number|Array} modelValue	当前选中值
 * @property {String}		placeholder			占位符文本（默认 '请选择' ）
 * @property {Object}		field			自定义字段名（默认 {text: 'text', value: 'value', children: 'children'} ）
 * @property {Boolean}		closeable			是否显示关闭按钮（默认 true ）
 * @property {Boolean}		closeOnClickOverlay	是否点击遮罩关闭（默认 true ）
 * @property {String}		bgColor				背景色（默认 '#ffffff' ）
 * @property {String}		activeColor			主题色（默认 '#3c9cff' ）
 * @property {String}		color				文本色（默认 '#303133' ）
 * @property {String}		fontSize			字体大小（默认 '16px' ）
 * @property {String}		titleFontSize		标题字体大小（默认 '18px' ）
 * @property {String}		borderRadius		圆角（默认 '12px' ）
 * @property {String|Number} zIndex			层级（默认 10075 ）
 * @property {Boolean}		safeAreaInsetBottom	是否安全区域（默认 true ）
 * @property {String}		itemHeight			选项高度（默认 '50px' ）
 * 
 * @event {Function} change 选择改变时触发
 * @event {Function} close 关闭时触发
 * @event {Function} confirm 确认选择时触发
 * @event {Function} selected 选择时触发
 * @example <u-cascader :show="show" :options="options" @change="onChange"></u-cascader>
 */
export default {
	name: "u-cascader",
	mixins: [mpMixin, mixin, props],
	data() {
		return {
			selectedPath: [], // 选择路径
			tabs: [], // 标签页数据
			activeTabIndex: 0, // 当前激活的标签页索引
			currentOptions: [], // 当前层级的选项
			optionsStack: [] // 选项栈，存储每一级的选项
		}
	},
	
	computed: {
		// 获取字段名配置
		fieldConfig() {
			return {
				label: this.field.text || this.field.label || 'label',
				value: this.field.value || 'value',
				children: this.field.children || 'children'
			}
		},
		
		// 当前选中的值
		currentValue() {
			// #ifdef VUE2
			return this.value
			// #endif

			// #ifdef VUE3
			return this.modelValue || this.value
			// #endif
		},
		
		// 是否可以添加新标签页
		canAddTab() {
			if (this.selectedPath.length === 0) return false
			const lastSelected = this.selectedPath[this.selectedPath.length - 1]
			return this.hasChildren(lastSelected)
		},

		// 标签页列表数据
		tabsList() {
			const list = this.tabs.map(tab => ({
				name: tab.label,
				label: tab.label
			}))
			
			// 首次打开或者有子项时显示占位符
			// 首次打开：tabs为空时
			// 有子项：选择了某项且该项有子项时
			if (this.tabs.length === 0 || this.canAddTab) {
				list.push({
					name: this.placeholder,
					label: this.placeholder
				})
			}
			
			return list
		}
	},
	
	watch: {
		show: {
			handler(newVal) {
				if (newVal) {
					this.init()
				}
			},
			immediate: true
		},
		
		options: {
			handler() {
				if (this.show) {
					this.init()
				}
			},
			deep: true
		},
		
		currentValue: {
			handler() {
				if (this.show) {
					this.init()
				}
			}
		}
	},
	
	// #ifdef VUE3
	emits: ['update:modelValue', 'change', 'close', 'confirm', 'selected'],
	// #endif
	
	methods: {
		// 初始化
		init() {
			this.selectedPath = []
			this.tabs = []
			this.activeTabIndex = 0
			this.optionsStack = []
			this.currentOptions = this.options || []
			this.optionsStack.push(this.currentOptions)
			
			// 如果有初始值，则定位到对应的层级
			if (this.currentValue) {
				this.initWithValue()
			}
		},
		
		// 根据初始值初始化选择状态
		initWithValue() {
			const value = Array.isArray(this.currentValue) ? this.currentValue : [this.currentValue]
			let currentOptions = this.options || []
			
			for (let i = 0; i < value.length; i++) {
				const targetValue = value[i]
				const item = currentOptions.find(option => this.getValue(option) === targetValue)
				
				if (item) {
					this.selectedPath.push(item)
					this.tabs.push({
						label: this.getLabel(item),
						level: i
					})
					
					if (this.hasChildren(item)) {
						currentOptions = this.getChildren(item)
						this.optionsStack.push(currentOptions)
					} else {
						break
					}
				} else {
					break
				}
			}
			
			this.activeTabIndex = this.tabs.length > 0 ? this.tabs.length - 1 : 0
			this.currentOptions = this.optionsStack[this.activeTabIndex] || []
		},
		
		// 选择项目
		selectItem(item) {
			const currentLevel = this.activeTabIndex
			
			// 更新选择路径
			this.selectedPath = this.selectedPath.slice(0, currentLevel)
			this.selectedPath.push(item)
			
			// 更新标签页
			this.tabs = this.tabs.slice(0, currentLevel)
			this.tabs.push({
				label: this.getLabel(item),
				level: currentLevel
			})
			
			// 清理选项栈后续数据
			this.optionsStack = this.optionsStack.slice(0, currentLevel + 1)
			
			// 触发选择事件
			this.emitSelected(item)
			
			if (this.hasChildren(item)) {
				// 有子项，添加新的选项到栈中
				const childOptions = this.getChildren(item)
				this.optionsStack.push(childOptions)
				
				// 自动切换到下一个标签页
				this.activeTabIndex = currentLevel + 1
				this.currentOptions = childOptions
			} else {
				// 没有子项，完成选择，直接触发confirm并关闭
				this.emitChange()
				this.emitConfirm()
				this.onClose()
			}
		},
		
		// 切换标签页
		switchTab(event) {
			// u-tabs组件的change事件传递的是对象 {item, index}
			const index = event.index
			this.activeTabIndex = index
			this.currentOptions = this.optionsStack[index] || []
		},
		
		// 获取选项的显示文本
		getLabel(item) {
			return item[this.fieldConfig.label] || ''
		},
		
		// 获取选项的值
		getValue(item) {
			return item[this.fieldConfig.value]
		},
		
		// 获取选项的子项
		getChildren(item) {
			return item[this.fieldConfig.children] || []
		},
		
		// 判断是否有子项
		hasChildren(item) {
			const children = this.getChildren(item)
			return Array.isArray(children) && children.length > 0
		},
		
		// 判断选项是否被选中
		isSelected(item) {
			if (this.selectedPath.length <= this.activeTabIndex) {
				return false
			}
			const selectedItem = this.selectedPath[this.activeTabIndex]
			return selectedItem && this.getValue(selectedItem) === this.getValue(item)
		},
		
		// 获取选中的值数组
		getSelectedValues() {
			return this.selectedPath.map(item => this.getValue(item))
		},
		
		// 获取选中的标签数组
		getSelectedLabels() {
			return this.selectedPath.map(item => this.getLabel(item))
		},
		
		// 触发change事件
		emitChange() {
			const values = this.getSelectedValues()
			const labels = this.getSelectedLabels()
			const selectedItems = [...this.selectedPath]
			
			const result = {
				value: values,
				label: labels,
				selectedItems
			}
			
			// #ifdef VUE2
			this.$emit('input', values)
			// #endif

			// #ifdef VUE3
			this.$emit('update:modelValue', values)
			// #endif
			
			this.$emit('change', result)
		},
		
		// 触发selected事件
		emitSelected(item) {
			this.$emit('selected', {
				item,
				level: this.activeTabIndex,
				selectedPath: [...this.selectedPath]
			})
		},
		
		// 触发confirm事件
		emitConfirm() {
			const values = this.getSelectedValues()
			const labels = this.getSelectedLabels()
			const selectedItems = [...this.selectedPath]
			
			this.$emit('confirm', {
				value: values,
				label: labels,
				selectedItems
			})
		},
		
		// 关闭选择器
		onClose() {
			this.$emit('close')
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../libs/css/components.scss";

.u-cascader {
	@include flex(column);
	
	&__header {
		position: relative;
		padding-top: 15px;
		padding-bottom: 5px;
	}
	
	&__title {
		text-align: center;
	}
	
	&__tabs {
		
	}
	
	&__content {
		flex: 1;
		// #ifndef APP-NVUE
		min-height: 0;
		// #endif
	}
	
	&__list {
		padding: 0;
		height: 320px;
	}
	
	&__item {
		@include flex(row);
		align-items: center;
		justify-content: space-between;
		padding: 0 15px;
	}
	
	&__item-text {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 15px;
		// #ifndef APP-NVUE
		white-space: nowrap;
		// #endif
	}
	
	&__item-right {
		@include flex(row);
		align-items: center;
		margin-left: 10px;
	}
}
</style>
