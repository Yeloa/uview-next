<template>
	<u-picker 
		ref="areaPicker"
		keyName="label"
		valueName="value" 
		:show="show"
		:columns="columns" 
		:showToolbar="showToolbar"
		:title="title"
		:loading="loading"
		:itemHeight="itemHeight"
		:cancelText="cancelText"
		:confirmText="confirmText"
		:cancelColor="cancelColor"
		:confirmColor="confirmColor"
		:visibleItemCount="visibleItemCount"
		:closeOnClickOverlay="closeOnClickOverlay"
		:defaultIndex="innerDefaultIndex"
		:immediateChange="immediateChange"
		:round="round"
		@close="close"
		@cancel="cancel"
		@confirm="confirm"
		@change="change"
	>
		<template v-slot:trigger>
			<slot name="trigger">
				<u-input 
					v-if="showInput"
					:value="inputValue"
					:clearable="inputProps.clearable"
					:placeholder="inputProps.placeholder"
					:disabled="inputProps.disabled"
					:border="inputProps.border"
					:round="inputProps.round"
					:backgroundColor="inputProps.disabled ? '' : inputProps.backgroundColor"
					:disabledColor="inputProps.disabled ? inputProps.backgroundColor : ''"
					:placeholderClass="inputProps.placeholderClass"
					:placeholderStyle="inputProps.placeholderStyle"
					:confirmType="inputProps.confirmType"
					:focus="inputProps.focus"
					:inputAlign="inputProps.inputAlign"
					:fontSize="inputProps.fontSize"
					:color="inputProps.color"
					:borderColor="inputProps.borderColor"
					:prefixIcon="inputProps.prefixIcon"
					:suffixIcon="inputProps.suffixIcon"
					:suffixIconStyle="inputProps.suffixIconStyle"
					:prefixIconStyle="inputProps.prefixIconStyle"
					:shape="inputProps.shape"
					:customStyle="inputProps.customStyle"
				 />
			</slot>
		</template>
	</u-picker>
</template>

<script>

import area from '../../libs/util/area.js'
import props from './props.js'
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin'

export default {
	name: 'u-region-picker',
	mixins: [mpMixin, mixin, props],
	data() {
		return {
			inputValue: '',
			columns: [],
			innerDefaultIndex: [],
			selectedValue:[]
		}
	},
	watch: {
		// #ifdef VUE2
		value(newValue) {
			if(newValue){
				this.init()
			}
		},
		// #endif
		// #ifdef VUE3
		modelValue(newValue) {
			if(newValue){
				this.init()
			}
		},
		// #endif
	},
	mounted() {
		this.init();
	},
	// #ifdef VUE3
	emits: ['update:modelValue','init', 'confirm', 'change', 'close', 'cancel'],
	// #endif
	methods: {
		// 初始化数据
		init() {
			const columns = [];
			const innerDefaultIndex = [];
			const innerDefaultLabel = []
			
			// 获取当前值
			const currentValue = this.getCurrentValue();
		
			// 处理省份列
			let selectedProvince;
			if (this.province) {
				const province = this.getProvinceList();
				columns.push(province);
				
				selectedProvince = this.getSelectedValue(0, province);
				let provinceIndex = province.findIndex(item => item.value == selectedProvince);
				innerDefaultIndex.push(provinceIndex >= 0 ? provinceIndex : 0);
				innerDefaultLabel.push(province[provinceIndex].label)
			}

			// 处理城市列
			let selectedCity;
			if (this.city) {
				const city = this.getCityList(selectedProvince);
				columns.push(city);
				
				const cityIndex = this.province ? 1 : 0;
				selectedCity = this.getSelectedValue(cityIndex, city);
				let cityIndexValue = city.findIndex(item => item.value == selectedCity);
				innerDefaultIndex.push(cityIndexValue >= 0 ? cityIndexValue : 0);
				innerDefaultLabel.push(city[cityIndexValue].label)
			}
			
			// 处理县区列
			if (this.county && selectedCity) {
				const county = this.getCountyList(selectedCity);
				columns.push(county);
				
				const countyIndex = (this.province ? 1 : 0) + (this.city ? 1 : 0);
				const selectedCounty = this.getSelectedValue(countyIndex, county);
				let countyIndexValue = county.findIndex(item => item.value == selectedCounty);
				innerDefaultIndex.push(countyIndexValue >= 0 ? countyIndexValue : 0);
				innerDefaultLabel.push(county[countyIndexValue].label)
			}
			
			// 设置列数据
			this.columns = columns;
			this.innerDefaultIndex = innerDefaultIndex;
			if(this.showInput && currentValue.length > 0){
				this.inputValue = innerDefaultLabel.join(this.inputProps.separator)
			}
		
		},
		
		// 获取选中值
		getSelectedValue(index, list) {
			const currentValue = this.getCurrentValue();
			// 如果有默认值且列表不为空，则使用默认值，否则使用第一个值
			return (currentValue && currentValue[index] && list.length > 0) 
				? currentValue[index] 
				: list[0]?.value;
		},
		
		// 获取当前值，兼容 Vue2 和 Vue3
		getCurrentValue() {
			// #ifdef VUE2
			return this.value;
			// #endif
			// #ifdef VUE3
			return this.modelValue;
			// #endif
		},

		// 获取省份数据
		getProvinceList() {
			let list = [];
			Object.entries(area.province_list).forEach(([value, label],idx) => {
				list.push({ value, label });
			});
			return list;
		},
		
		// 获取城市数据
		getCityList(cityCode) {
			let list = [];
			Object.entries(area.city_list).forEach(([value, label],idx) => {
				if(cityCode){
					if (value.startsWith(String(cityCode).substring(0, 2))) {
						list.push({ value, label });
					}
				}else{
					list.push({ value, label });
				}
			});
			return list;
		},
		
		// 获取区县数据
		getCountyList(countyCode) {
			let list = [];
			Object.entries(area.county_list).forEach(([value, label],idx) => {
				if(countyCode){
					if (value.startsWith(String(countyCode).substring(0, 4))) {
						list.push({ value, label });
					}
				}else{
					list.push({ value, label });
				}
			});
			return list;
		},
		
		// 选择器变化事件
		change(e) {
			const { columnIndex, value } = e;
			
			// 计算实际的列索引（考虑可能跳过的列）
			let actualColumnIndex = columnIndex;
			let valueIndex = columnIndex;
			
			// 省份列变化
			if ((this.province && actualColumnIndex === 0) && this.city) {
				// 选择省份时更新城市列表
				const cityList = this.getCityList(value[valueIndex].value);
				const cityColumnIndex = this.province ? 1 : 0;
				this.$refs.areaPicker.setColumnValues(cityColumnIndex, cityList);

				// 如果显示区县列，同时更新区县列表
				if (this.county && cityList.length > 0) {
					const countyList = this.getCountyList(cityList[0].value);
					const countyColumnIndex = (this.province ? 1 : 0) + (this.city ? 1 : 0);
					this.$refs.areaPicker.setColumnValues(countyColumnIndex, countyList);
				}
			} 
			// 城市列变化
			else if (this.city && 
				((this.province && actualColumnIndex === 1) || 
				(!this.province && actualColumnIndex === 0)) && 
				this.county) {
				// 选择城市时更新区县列表
				const cityValueIndex = this.province ? 1 : 0;
				let countyList = this.getCountyList(value[cityValueIndex].value);
				const countyColumnIndex = (this.province ? 1 : 0) + (this.city ? 1 : 0) - 1;
				this.$refs.areaPicker.setColumnValues(countyColumnIndex + 1, countyList);
			}

			this.$emit('change', e);
		},
		// 关闭选择器
		close() {
			if (this.closeOnClickOverlay) {
				this.$emit('close')
			}
		},
		// 确认选择
		confirm(e) {
			this.$emit('confirm', e);
			let value = e.value.map(item => item.value)

			if(this.showInput){
				let label = e.value.map(item => item.label)
				this.inputValue = label.join(this.inputProps.separator)
			}
			
			// #ifdef VUE2
			this.$emit('input', value)
			// #endif
			// #ifdef VUE3
			this.$emit('update:modelValue', value)
			// #endif
		},
		// 取消选择
		cancel() {
			this.$emit('cancel');
		}
	},
}
</script>

<style lang="scss" scoped>
@import "../../libs/css/components.scss";
</style>
