<template>
	<view 
		class="u-sidebar-item"
		:class="[`u-sidebar-item-${index}`]"
		:style="[itemStyle]"
		@click="handleClick"
		hover-class="none"
	>
		<view class="u-sidebar-item__content" :class="[`u-sidebar-item__icon-${iconPosition}`]">
			<slot>
				<u-icon
					v-if="icon"
					:name="icon"
					:size="iconSize"
					:color="iconColor"
					class="u-sidebar-item__icon"
				></u-icon>
				<text class="u-sidebar-item__text" >
					{{ label }}
				</text>
				<u-badge
					:isDot="propsBadge.isDot"
					:value="propsBadge.value"
					:type="propsBadge.type"
					:max="propsBadge.max"
					:showZero="propsBadge.showZero"
					:bgColor="propsBadge.bgColor"
					:color="propsBadge.color"
					:shape="propsBadge.shape"
					:numberType="propsBadge.numberType"
					:inverted="propsBadge.inverted"
					:customStyle="{
						position: 'absolute', 
						right: '0', 
						top: '0', 
						transform: 'translate(50%, -50%)'
					}"
				></u-badge>
			</slot>
		</view>
		<view
			v-if="active && parentData.showLine"
			class="u-sidebar-item__line"
			:style="[lineStyle]"
		></view>
	</view>
</template>

<script>
import props from './props.js';
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin';

/**
 * SidebarItem 侧边栏项
 * @description 侧边栏的子组件，用于定义侧边栏的每一项
 * @tutorial https://uview.d3u.cn/components/sidebar.html
 * 
 * @property {String} label 内容
 * @property {String | Number} value 值，用于标识该项
 * @property {String} icon 图标名称
 * @property {String | Number} iconSize 图标大小
 * @property {String} iconColor 图标颜色
 * @property {String} iconPosition 图标位置，支持 left 和 top
 * @property {String | Number | Object} badge 右上角的角标提示信息，支持字符串、数字、对象类型
 * @property {Boolean} dot 是否显示圆点，将会覆盖badge参数
 * @property {Boolean} disabled 是否禁用该项
 * 
 * @example
 * <u-sidebar-item 
 *   label="标签名称" 
 *   icon="home" 
 *   iconPosition="top" 
 *   :badge="{ isDot: true, value: '5', type: 'error' }" 
 * />
 */
export default {
	name: 'u-sidebar-item',
	mixins: [mpMixin, mixin, props],
	data() {
		return {
			index: 0,
			parent: false, // 父组件实例
			propsBadge: {
				isDot: false,
				value: '',
				type: 'error',
				max: 99,
				showZero: false,
				bgColor: '',
				color: '',
				shape: 'circle',
				numberType: 'number',
				inverted: false,
			},
			parentData: {
				innerCurrent: 0,
				width: '100px',
				fontSize: '14px',
				lineHeight: '22px',
				textColor: '',
				disabledColor: '',
				disabledBgColor: '',
				bgColor: '',
				activeColor: '',
				activeBgColor: 'white',
				activeBold: true,
				activeStyle: {},
				inactiveStyle: {},
				lineWidth: '4px',
				lineHeight: '16px',
				lineColor: '#1677ff',
				lineBgSize: 'cover',
				showLine: true,
			}
		}
	},
	watch: {
		'parentData'(newValue, oldValue) {
			// 父组件数据变化时的处理
		},
		badge: {
			immediate: true,
			handler(newVal) {
				if (uni.$u.test.object(this.badge)) {
					this.propsBadge = uni.$u.deepMerge(uni.$u.props.badge, this.badge);
				} else {
					this.propsBadge.value = this.badge || '';
				}
			}
		}
	},
	created() {
		// 父组件的实例
		this.parent = false;
	},
	computed: {
		active() {
			return this.index === this.parentData.innerCurrent
		},
		itemStyle() {
			const style = {}
			
			if (this.disabled) {
				// 禁用状态样式
				if (this.parentData.disabledColor) style.color = this.parentData.disabledColor
				if (this.parentData.disabledBgColor) style.backgroundColor = this.parentData.disabledBgColor
			} else if (this.active) {
				// 激活状态样式
				if (this.parentData.activeBold) style.fontWeight = 'bold'
				if (this.parentData.activeColor) style.color = this.parentData.activeColor
				if (this.parentData.activeBgColor) style.backgroundColor = this.parentData.activeBgColor
				return uni.$u.deepMerge(style, uni.$u.addStyle(this.parentData.activeStyle));
			} else {
				// 非激活状态样式
				if (this.parentData.textColor) style.color = this.parentData.textColor
				return uni.$u.deepMerge(style, uni.$u.addStyle(this.parentData.inactiveStyle));
			}
			
			return style
		},
		lineStyle() {
			const style = {}
			style.width = this.$u.addUnit(this.parentData.lineWidth)
			style.height = this.$u.addUnit(this.parentData.lineHeight )
			style.backgroundColor = this.parentData.lineColor
			if (this.parentData.lineBgSize) {
				style.backgroundSize = this.parentData.lineBgSize
			}
			return style
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			// 获取父组件u-sidebar
			let parent = this.$u.$parent.call(this, 'u-sidebar');
			if (parent) {
				this.parent = parent;
				// 将本组件的this，放入到父组件的children数组中，让父组件可以操作本(子)组件的方法和属性
				// push进去前，显判断是否已经存在了本实例，因为在子组件内部数据变化时，会通过父组件重新初始化子组件
				let exist = parent.children.find(val => {
					return this === val;
				})
				if (!exist) parent.children.push(this);
				
				// 更新父组件数据
				this.updateParentData();
				
				// 设置当前项的索引
				this.index = parent.children.indexOf(this);
			} else {
				uni.$u.error('u-sidebar-item必须要搭配u-sidebar组件使用');
			}
		},
		updateParentData() {
			// 此方法在mixin中
			this.getParentData('u-sidebar');
		},
		// 父组件数据发生变化
		updateFromParent() {
			this.init();
		},
		handleClick() {
			if (this.disabled) return
			// 优先使用value，如果没有value则使用index
			const clickValue = this.value !== '' ? this.value : this.index;
			// 通知父组件，参考u-dropdown-item的实现方式
			if (this.parent && this.parent.handleItemClick) {
				this.parent.handleItemClick(this.index);
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.u-sidebar-item {
	position: relative;
	padding: 20px 10px;
	cursor: pointer;
	-webkit-tap-highlight-color: transparent;
	user-select: none;
	
	&__content {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	&__icon {
		flex-shrink: 0;
	}

	&__icon-top {
		flex-direction: column;
	}

	&__icon-left {
		flex-direction: row;
	}
	
	&__text {
		text-align: center;
	}
	
	&__line {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 4px;
		height: 16px;
		border-radius: 2px;
	}
}
</style>
