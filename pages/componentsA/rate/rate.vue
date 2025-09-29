<template>
	<view class="u-page">
		<card title="基本案例" flex>
			<u-rate size="20"></u-rate>
		</card>
		
		<card title="自定义选中星星数量" flex>
			<u-rate
				size="20"
				v-model="value"
				@change="change"
			></u-rate>
		</card>
		
		<card title="自定义星星大小" flex>
			<u-rate size="30" count="4"></u-rate>
		</card>
		
		<card title="是否禁用评分" flex>
			<u-rate size="20" disabled></u-rate>
		</card>
		
		<card title="是否只读评分" flex>
			<u-rate size="20" readonly></u-rate>
		</card>
		
		<card title="自定义选中星星颜色" flex>
			<u-rate
				size="20"
				v-model="activeColorValue"
				activeColor="#2979ff"
			></u-rate>
		</card>
		
		<card title="自定义未选中星星颜色" flex>
			<u-rate
				size="20"
				v-model="value1"
				inactiveColor="#2979ff"
			></u-rate>
		</card>
		
		<card title="禁止触摸选择" flex>
			<u-rate size="20" :touchable="false"></u-rate>
		</card>
		
		<card title="允许触摸选择" flex>
			<u-rate size="20" :touchable="true"></u-rate>
		</card>
		
		<card title="是否允许半星" flex>
			<u-rate
				size="20"
				v-model="HalfValue"
				:allowHalf="true"
				@change="change"
			></u-rate>
		</card>
		
		<card title="自定义选中的图标" flex>
			<u-rate
				size="20"
				v-model="activeIconValue"
				inactiveIcon="heart"
				activeIcon="heart-fill"
			></u-rate>
		</card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//自定义星星的个数
				value: 3,
				value1: 2,
				// 自定义选择星星颜色个数
				activeColorValue: 3,
				// 是否允许半星的个数
				HalfValue: 3.5,
				// 自定义图标星星个数
				activeIconValue: 3,
			}
		},
		watch: {
			value(newValue, oldValue) {
				// console.log(newValue);
			}
		},
		methods: {
			change(e) {
				// console.log('change', e);
			}
		},
	}
</script>