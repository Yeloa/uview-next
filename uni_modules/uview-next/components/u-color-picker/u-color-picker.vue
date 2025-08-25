<template>
    <uView
        v-if="insert"
        :value="innerValue"
        :disabled="disabled"
        :showPresets="showPresets"
        :presets="presets"
        @change="change"
        @formatChange="formatChange"
    />
    <u-popup
        v-else
        mode="bottom"
        :closeable="closeable"
		:title="title"
		:zIndex="zIndex"
        :show="show"
        :round="round"
        :closeOnClickOverlay="closeOnClickOverlay"
        @close="$emit('close')"
        @open="$emit('open')"
    >
        <view class="u-color-picker-popup">
			<uView
				ref="colorPickerView"
				:value="innerValue"
				:disabled="disabled"
				:showPresets="showPresets"
				:presets="presets"
				@change="change"
				@formatChange="formatChange"
			/>
			<view class="u-color-picker-popup-footer">
				<slot name="footer">
					<u-button type="primary" :shape="confirmShape" @click="confirm">{{ confirmText }}</u-button>
				</slot>
			</view>
		</view>
    </u-popup>
</template>

<script>
    import props from './props.js';
    import mixin from '../../libs/mixin/mixin';
    import mpMixin from '../../libs/mixin/mpMixin';
    import uView from './view.vue';

    /**
     * color-picker 颜色选择器
     * @description 一个功能强大的颜色选择器组件，支持多种颜色格式，预设颜色，可用于主题定制、样式设计等场景
     * @tutorial https://uview.d3u.cn/components/color-picker.html
     * @property {String}			value			颜色的值，支持HEX、RGB、HSB格式
     * @property {Array}			presets			预设的颜色分组
     * @property {Boolean}			showPresets		是否显示预设颜色
     * @property {Boolean}			disabled		是否禁用颜色选择器
     *
     * @event {Function}	change			颜色值变化时触发
     * @event {Function}	formatChange	颜色格式变化时触发
	 * 
     * @slot {String}		footer			自定义底部按钮
	 * 
     * @example <u-color-picker v-model="color" />
     */
    export default {
        name: 'u-color-picker',
        mixins: [mpMixin, mixin, props],
        components: {
            uView,
        },
        data() {
            return {
                innerValue: '',
            };
        },
        watch: {
            // #ifdef VUE2
            value: {
                immediate: true,
                handler(newVal) {
					if(newVal){
						this.innerValue = newVal;
					}
                    
                },
            },
            // #endif
            // #ifdef VUE3
            modelValue: {
                immediate: true,
                handler(newVal) {
                    if(newVal){
						this.innerValue = newVal;
					}
                },
            },
            // #endif
        },
		mounted() {
			this.innerValue = this.defaultColor
		},
        // #ifdef VUE3
        emits: ['change', 'formatChange', 'open', 'close', 'confirm', 'update:modelValue'],
        // #endif
        methods: {
            change(e) {
				this.innerValue = e.colorFormat
				// #ifdef VUE2
				this.$emit('input', e.colorFormat)
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue', e.colorFormat)
				// #endif
                this.$emit('change', e);
			},
            formatChange(e) {
                this.$emit('formatChange', e);
            },
			confirm() {
				this.$emit('confirm', this.innerValue);
			},
        },
    };
</script>

<style lang="scss" scoped>
.u-color-picker-popup {
	padding: 0 15px;
}
.u-color-picker-popup-footer {
	padding: 20px 0;
}
</style>
