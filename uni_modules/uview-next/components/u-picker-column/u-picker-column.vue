<template>
	<picker-view-column>
		<view class="u-picker-column">

		</view>
	</picker-view-column>
</template>

<script>
	import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';
	/**
	 * PickerColumn 
	 * @description 
	 * @tutorial url
	 * @property {String}
	 * @event {Function}
	 * @example
	 */
	export default {
		name: 'u-picker-column',
		mixins: [mpMixin, mixin, props],
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";
</style>
