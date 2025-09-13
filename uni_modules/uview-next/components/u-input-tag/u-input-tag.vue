<template>
	<view class="u-input-tag" :class="[
		tagInside ? 'u-input-tag__inside' : 'u-input-tag__outside' , 
		disabled ? 'is-disabled' : ''
	]" :style="[tagStyle]">
		<view class="u-input-tag__tags">
			<u-tag
				v-for="(item, index) in tagsList"
				:key="index"
				:text="item"
				:bgColor="elTagBgColor"
				:borderColor="elTagBgColor"
				:color="elTagColor"
				:animation="false"
				:closeInside="true"
				:shape="shape"
				:plain="plain"
				:gutter="8"
				:closable="!disabled"
				@close="removeTag(index)"
			/>
			<u-tag 
				v-if="collapsedHiddenCount > 0" 
				:text="'+' + collapsedHiddenCount" 
				:bgColor="elTagBgColor"
				:borderColor="elTagBgColor"
				:color="elTagColor"
				:plain="plain"
				:customStyle="{marginTop: '8px'}"
				:animation="false"
				:closeInside="true"
			/>
		</view>
		<view class="u-input-tag__input-wrapper">
			<input class="u-input-tag__input"
				:placeholder-style="$u.addStyle(placeholderStyle)"
				:style="[$u.addStyle(inputStyle)]"
				:placeholder="placeholder" 
				:value="draft" 
				:disabled="disabled" 
				confirm-type="done" 
				@input="onInput" 
				@confirm="onConfirm" 
				@blur="onBlur" 
			/>
			<view v-if="!tagInside && confirmButtonText" >
				<u-button type="primary" :disabled="disabled" @click="appendFromDraft" :text="confirmButtonText" />
			</view>
		</view>
	</view>
</template>

<script>
	import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';

	export default {
		name: 'u-input-tag',
		mixins: [mpMixin, mixin, props],
		data() {
			return {
				draft: '',
				innerTags: [],
				innerTagColor: ''
			}
		},
		computed: {
			tagStyle() {
				const style = {}

				if(this.round) {
					style.borderRadius = uni.$u.addUnit(this.round)
				}

				const bgColor = this.tagInside ? this.bgColor || '#f5f5f5' : this.bgColor
				if (bgColor) {
					style.backgroundColor = bgColor
				}
				
				return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle))
			},
			tagsList() {
				if(this.collapseTags){
					const count = parseInt(this.maxCollapseTags) || 1
					return this.innerTags.slice(0, count)
				}else{
					return this.innerTags
				}
			},
			collapsedHiddenCount() {
				if(this.collapseTags) {
					const count = parseInt(this.maxCollapseTags) || 1
					return Math.max(0, this.innerTags.length - count)
				}else{
					return 0
				}
			},
			elTagColor() {
				return this.innerTagColor || this.tagColor
			},
			elTagBgColor() {
				let tagColor = this.tagInside ? '#fff' : 'infoLight';
				
				if(this.tagBgColor) {
					tagColor = this.tagBgColor
				}

				if(uni.$u.type.indexOf(tagColor) === -1) {
					this.innerTagColor = '#333'
				}
				
				return tagColor
			}
		},
		watch: {
			// #ifdef VUE2
			value: {
				immediate: true,
				handler(val) {
					this.innerTags = Array.isArray(val) ? [...val] : []
				}
			},
			// #endif
			// #ifdef VUE3
			modelValue: {
				immediate: true,
				handler(val) {
					this.innerTags = Array.isArray(val) ? [...val] : []
				}
			}
			// #endif
		},
		// #ifdef VUE3
		emits: ['update:modelValue', 'change', 'addTag', 'removeTag'],
		// #endif
		methods: {
			onInput(e) {
				const value = e.detail.value
				this.draft = value
			},
			onConfirm() {
				this.appendFromDraft()
			},
			onBlur() {
				if (this.saveOnBlur && (this.tagInside || !this.showConfirmButton)){
					this.appendFromDraft()
				}
			},
			appendFromDraft() {
				let text = this.draft.trim()
				if (!text) return
				this.appendTag(text)
				this.draft = ''
			},
			appendTag(value) {
				if (this.max != null && this.innerTags.length >= parseInt(this.max)) return
				if (this.innerTags.includes(value)) return
				this.innerTags.push(value)
				this.$emit('addTag', value)
				this.emitEvent()
			},
			removeTag(index) {
				if (this.disabled) return
				const removed = this.innerTags.splice(index, 1)[0]
				this.$emit('removeTag', removed)
				this.emitEvent()
			},
			emitEvent() {
				// #ifdef VUE2
				this.$emit('input', [...this.innerTags])
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue', [...this.innerTags])
				// #endif
				this.$emit('change', this.innerTags)
			},
		}
	}
</script>

<style lang="scss" scoped>
@import "../../libs/css/components.scss";

.u-input-tag {
	position: relative;

	&__tags {
		@include flex(row);
		align-items: center;
		flex-wrap: wrap;
	}

	&__outside {
		@include flex(column);
		gap: 10px;

		.u-input-tag__input {
			height: 40px;
			padding: 0 10px;
			border-radius: 4px;
		}
	}

	&__inside {
		@include flex(row);
		align-items: center;
		flex-wrap: wrap;
		padding: 0px 8px 8px 8px;

		.u-input-tag__input {
			height: 28px;
			margin-top: 8px;
		}
	}

	&__input-wrapper {
		flex: 1;
		min-width: 80px;
		@include flex(row);
		align-items: center;
		gap: 10px;
	}

	&__input {
		flex: 1;
		min-width: 80px;
		font-size: 14px;
		background: #f5f5f5;
	}
}
</style>
