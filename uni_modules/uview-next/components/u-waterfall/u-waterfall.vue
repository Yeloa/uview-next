<template>
	<view class="u-waterfall">
		<view 
			v-for="(columnList, columnIndex) in columns" 
			:key="columnIndex"
			:id="`u-column-${columnIndex}`" 
			class="u-column"
		>
			<slot :columnList="columnList" :columnIndex="columnIndex"></slot>
		</view>
	</view>
</template>

<script>
import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';
/**
 * waterfall 瀑布流
 * @description 这是一个瀑布流形式的组件，内容分为多列，结合uView的懒加载组件效果更佳。
 * 或者没有利用vue作用域插槽的做法，uView的瀑布流实现了真正的 组件化，
 * 搭配LazyLoad 懒加载和loadMore 加载更多组件，让您开箱即用，眼前一亮。
 * @tutorial https://uveiw.bdxmz.cn/components/waterfall.html
 * @property {Array} value/modelValue 用于渲染的数据
 * @property {String Number} add-time 单条数据添加到队列的时间间隔，单位ms，见上方注意事项说明（默认200）
 * @property {String Number} column 瀑布流列数（默认2）
 * @example <u-waterfall v-model="list" :column="2"></u-waterfall>
 */
export default {
	name: "u-waterfall",
	mixins: [mpMixin, mixin, props],
	data() {
		return {
			columns: [], // 动态列数组
			tempList: [],
			children: []
		}
	},
	watch: {
		copyFlowList(nVal, oVal) {
			// 取差值，即这一次数组变化新增的部分
			let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0;
			// 拼接上原有数据
			this.tempList = this.tempList.concat(this.cloneData(nVal.slice(startIndex)));
			this.splitData();
		}
	},
	mounted() {
		this.initColumns();
		this.tempList = this.cloneData(this.copyFlowList);
		this.$nextTick(() => {
			uni.$u.sleep(10).then(() => {
				this.splitData();
			})
		})
	},
	computed: {
		// 破坏flowList变量的引用，否则watch的结果新旧值是一样的
		copyFlowList() {
			return this.cloneData(this.flowList);
		},
		flowList() {
			// #ifdef VUE2
			return this.value;
			// #endif
			// #ifdef VUE3
			return this.modelValue;
			// #endif
		},
	},
	// #ifdef VUE3
	emits: ['update:modelValue'],
	// #endif
	methods: {
		// 初始化列数组
		initColumns() {
			const columnCount = parseInt(this.column);
			this.columns = [];
			for (let i = 0; i < columnCount; i++) {
				this.columns.push([]);
			}
		},
		async splitData() {

			if (!this.tempList.length) {
				return;
			}
		
			if(!this.columns.length) {
				return;
			}
			
			// 获取所有列的高度
			const columnHeights = [];
			for (let i = 0; i < this.columns.length; i++) {
				try {
					const rect = await this.$uGetRect(`#u-column-${i}`);
					columnHeights.push(rect ? rect.height : 0);
				} catch (error) {
					columnHeights.push(0);
				}
			}
		
			// 找到最短的列
			let minHeight = Math.min(...columnHeights);
			let minIndex = columnHeights.indexOf(minHeight);
			
			// 如果所有列高度相同，使用轮询分配
			if (columnHeights.every(height => height === minHeight)) {
				minIndex = this.getShortestColumnIndex();
			}
			
			let item = this.tempList[0];
			// 解决多次快速上拉后，可能数据会乱的问题
			if (!item){
				return;
			}
			
			// 将数据添加到最短的列
			this.columns[minIndex].push(item);
			
			// 移除临时列表的第一项
			this.tempList.splice(0, 1);
			// 如果临时数组还有数据，继续循环
			if (this.tempList.length) {
				setTimeout(() => {
					this.splitData();
				}, this.addTime)
			}
		},
		// 获取元素最少的列索引（用于高度相同时的轮询分配）
		getShortestColumnIndex() {
			let minLength = Math.min(...this.columns.map(col => col.length));
			return this.columns.findIndex(col => col.length === minLength);
		},
		// 复制而不是引用对象和数组
		cloneData(data) {
			return JSON.parse(JSON.stringify(data));
		},
		// 清空数据列表
		clear() {
			for (let i = 0; i < this.columns.length; i++) {
				this.columns[i] = [];
			}
			// 同时清除父组件列表中的数据
			// #ifdef VUE2
			this.$emit('input', []);
			// #endif
			// #ifdef VUE3
			this.$emit('update:modelValue', []);
			// #endif
			this.tempList = [];
		},
		// 清除某一条指定的数据，根据id实现
		remove(id) {
			// 如果findIndex找不到合适的条件，就会返回-1
			let index = -1;
			let columnIndex = -1;
			
			// 在所有列中查找要删除的数据
			for (let i = 0; i < this.columns.length; i++) {
				index = this.columns[i].findIndex(val => val[this.idKey] == id);
				if (index !== -1) {
					columnIndex = i;
					break;
				}
			}
			
			// 如果找到了，删除对应的数据
			if (index !== -1 && columnIndex !== -1) {
				this.columns[columnIndex].splice(index, 1);
			}
			
			// 同时清除父组件的数据中的对应id的条目
			index = this.flowList.findIndex(val => val[this.idKey] == id);
			if (index !== -1) {
				// #ifdef VUE2
				this.$emit('input', this.flowList.splice(index, 1));
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue', this.flowList.splice(index, 1));
				// #endif
			}
		},
		// 修改某条数据的某个属性
		modify(id, key, value) {
			// 如果findIndex找不到合适的条件，就会返回-1
			let index = -1;
			let columnIndex = -1;
			
			// 在所有列中查找要修改的数据
			for (let i = 0; i < this.columns.length; i++) {
				index = this.columns[i].findIndex(val => val[this.idKey] == id);
				if (index !== -1) {
					columnIndex = i;
					break;
				}
			}
			
			// 如果找到了，修改对应的数据
			if (index !== -1 && columnIndex !== -1) {
				this.columns[columnIndex][index][key] = value;
			}
			
			// 修改父组件的数据中的对应id的条目
			index = this.flowList.findIndex(val => val[this.idKey] == id);
			if (index !== -1) {
				// 首先复制一份value的数据
				let data = this.cloneData(this.flowList);
				// 修改对应索引的key属性的值为value
				data[index][key] = value;
				// 修改父组件通过v-model绑定的变量的值
				// #ifdef VUE2
				this.$emit('input', data);
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue', data);
				// #endif
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.u-waterfall {
	@include flex(row);
	align-items: flex-start;
}

.u-column {
	@include flex(column);
	flex: 1;
	height: auto;
}

.u-image {
	width: 100%;
}
</style>
