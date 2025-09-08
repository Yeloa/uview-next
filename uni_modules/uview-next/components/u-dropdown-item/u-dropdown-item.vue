<template>
	<view class="u-dropdown-item" @touchmove.stop.prevent @tap.stop.prevent>
		<view class="u-dropdown-item__menu" @tap="handleClick">
			<slot name="label" :active="active">
				<text class="u-dropdown-item__menu--label" :style="[labelStyle]">
					{{ title }}
				</text>
				<view class="u-dropdown-item__menu--icon" :class="{ 'u-dropdown-item__menu--icon__active': active }">
					<u-icon 
						:name="parentData.menuIcon" 
						:size="parentData.menuIconSize" 
						:color="active ? parentData.activeColor : parentData.disabledColor"
					></u-icon>
				</view>
			</slot>
		</view>
		<view 
			class="u-dropdown-item__wrapper" 
			:style="[{ 
				top: $u.addUnit(parentData.height - 1),
				height: $u.addUnit(parentData.contentHeight)
			 }]"
			@touchmove.stop.prevent="() => {}"
			@tap.stop.prevent="() => {}"
		>
			<view v-if="active && parentData.overlay" class="u-dropdown-item__mask" @tap="handleMaskClick" @touchmove.stop.prevent></view>
			<u-transition
				mode="slide-down"
				zIndex="10099"
				:show="active"
				:duration="parentData.duration" 
				@afterEnter="afterEnter"
				@afterLeave="afterLeave"
			>
				<view @tap.stop.prevent class="u-dropdown-item__popup" :style="[popupStyle]">
					<slot>
						<scroll-view scroll-y="true" :style="[{height: $u.addUnit(height)}]">
							<view class="u-dropdown-item__options">
								<view v-for="(item, index) in options" :key="index" 
									class="u-dropdown-item__options__item"
									:class="{
										'u-dropdown-item__options__item--active': currentValue == item.value
									}"
									@click="handleOptionClick(item)"
									:style="[{
										color: currentValue == item.value ? parentData.activeColor : parentData.inactiveColor
									}]"
								>
									<text>{{ item.label }}</text>
									<u-icon v-if="currentValue == item.value" name="checkbox-mark" :color="parentData.activeColor"></u-icon>
								</view>
							</view>
						</scroll-view>
					</slot>
				</view>
			</u-transition>
		</view>
	</view>
</template>

<script>
import props from './props.js';
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin';
/**
 * dropdown-item 下拉菜单项
 * @description 该组件一般用于向下展开菜单，同时可切换多个选项卡的场景
 * @tutorial http://uviewui.com/components/dropdown.html
 * @property {String | Number} v-model 双向绑定选项卡选择值
 * @property {String} title 菜单项标题
 * @property {Array} options 选项数据
 * @property {Boolean} disabled 是否禁用此菜单项
 * @property {Number|String} height 下拉弹窗的高度
 * @property {Boolean} disabledClick 禁用默认的点击事件

 * @event {Function()} change 		点击选项导致值变化时触发
 * @event {Function()} close 		关闭菜单项时触发
 * @event {Function()} open 		打开菜单项时触发
 * @event {Function()} opened 		打开菜单栏且动画结束后触发
 * @event {Function()} closed 		关闭菜单栏且动画结束后触发
 * 
 * @slot {String}		default			菜单内容
 * @slot {String}		label			自定义菜单项标题
 * 
 * @example <u-dropdown-item title="标题"></u-dropdown-item>
 */
export default {
	name: 'u-dropdown-item',
	mixins: [mixin, mpMixin, props],
	data() {
		return {
			active: false,
			parent: null,
			internalValue: '',
			parentData: {
				overlay: true,
				height: 44,
				contentHeight: 0,
				inactiveColor: '#333',
				activeColor: '#2979ff',
				disabledColor: '#ccc',
				duration: 220,
				closeOnClickMask: true,
				closeOnClickSelf: true,
				titleSize: 14,
				borderRadius: 10,
				menuIcon: 'caret-down',
				menuIconSize: 16
			}
		}
	},
	computed: {
		// 当前值
		currentValue() {
			// #ifdef VUE2
			return this.value;
			// #endif
			// #ifdef VUE3
			return this.modelValue;
			// #endif
		},
		popupStyle() {
			let style = {};

			if(this.parentData.borderRadius) {
				style.borderRadius = `0 0 ${this.$u.addUnit(this.parentData.borderRadius)} ${this.$u.addUnit(this.parentData.borderRadius)}`;
			}
			return style;
		},
		labelStyle() {
			return {
				fontSize: this.$u.addUnit(this.parentData.titleSize),
				color: this.disabled ? this.parentData.disabledColor : (this.active ? this.parentData.activeColor : this.parentData.inactiveColor)
			}
		},
	},
	mounted() {
		this.init();
	},
	// #ifdef VUE3
	emits: ["update:modelValue","change","opened","closed","open","close"],
	// #endif
	methods: {
		init() {
			this.updateParentData()
			if (!this.parent) {
				return uni.$u.error('u-dropdown-item必须要搭配u-dropdown组件使用')
			}
		},
		updateParentData() {
			this.getParentData('u-dropdown')
		},
		handleMaskClick() {
			if (this.parentData.closeOnClickMask) {
				this.close();
			}
		},
		handleClick() {
			if (this.disabled || this.disabledClick) return;
			// 如果当前菜单已激活，则关闭
			if (this.active && this.parentData.closeOnClickSelf) {
				this.close();
			} else {
				// 关闭其他菜单项
				this.parent.closeOtherItems(this);
				// 打开当前菜单
				this.open();
			}
		},
		// 处理选项点击
		handleOptionClick(option) {
			if (option.disabled) return;
			// #ifdef VUE2
			this.$emit('input', option.value);
			// #endif
			// #ifdef VUE3
			this.$emit('update:modelValue',option.value);
			// #endif
			// 发出事件，抛出当前勾选项的value
			this.$emit('change', option.value);
			this.close();
		},
		afterEnter() {
			this.$emit('opened')
		},
		afterLeave() {
			this.$emit('closed')
		},
		open() {
			if (this.disabled || this.active) return;
			this.active = true;
			this.parent.openItem(this);
			this.$emit('open');
		},
		close(index) {
			if (!this.active) return;
			this.active = false;
			this.$emit('close');
			this.parent.closeItem(index);
		}
	}
}
</script>
<style scoped lang="scss">
@import '../../libs/css/components.scss';

.u-dropdown-item {
	position: static;
	height: 44px;
	flex: 1;
	width: 100%;
	@include flex(row);
	justify-content: center;
	
	&__menu {
		@include flex(row);
		justify-content: center;
		align-items: center;

		&--label {
			@include flex(row);
			align-items: center;
		}

		&--icon {
			margin-left: 2px;
			transition: transform .3s;
			align-items: center;
			@include flex(row);

			&__active {
				transform: rotate(180deg);
			}
		}
	}

	&__wrapper {
		position: absolute;
		left: 0;
		right: 0;
		overflow: hidden;
	}

	&__mask {
		position: absolute;
		z-index: 10000;
		background: rgba(0, 0, 0, .3);
		right: 0;
		left: 0;
		top: 0;
		bottom: 0;
		width: 100%;
	}

	&__popup {
		background-color: #fff;
	}

	&__options {
		&__item {
			@include flex(row);
			justify-content: space-between;
			align-items: center;
			height: 50px;
			padding: 0 15px;
			color: $u-content-color;
			font-size: 14px;
			&--active {
				color: $u-primary;
			}
		}
	}	
}

</style>