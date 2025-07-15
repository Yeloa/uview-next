<template>
	<view 
		class="u-pagination" 
		:class="[disabled && 'u-pagination--disabled', simple && 'u-pagination--simple']"
		:style="[$u.addStyle(customStyle)]"
	>
		<!-- 上一页按钮 -->
		<view 
			v-if="showPrevButton"
			class="u-pagination__prev"
			:class="[{ 'u-pagination__item--disabled': isFirstPage || disabled }]"
			:style="[itemStyle()]"
			@click="prevPage"
		>
			<slot name="prev" :disabled="isFirstPage || disabled">
				<text :style="[textStyle]">{{ prevText }}</text>
			</slot>
		</view>

		<!-- 简单模式 -->
		<text v-if="simple" class="u-pagination__simple" :style="[textStyle]">
			{{ innerValue }} / {{ totalPages }}
		</text>

		<!-- 完整模式页码列表 -->
		<template v-if="!simple">
			<view 
				v-for="(page, index) in pageItems" 
				:key="index"
				class="u-pagination__item"
				:class="[{ 
					'u-pagination__item--active': page.isActive,
					'u-pagination__item--disabled': disabled,
					'u-pagination__item--ellipsis': page.type == 'ellipsis'
				}]"
				:style="[page.isActive ? activeItemStyle(true) : itemStyle(true)]"
				@click="handlePageClick(page)"
			>
				<slot name="page" :label="page.label" :active="page.isActive">
					<text :style="[page.isActive ? activeTextStyle : textStyle]">{{ page.label }}</text>
				</slot>
			</view>
		</template>

		<!-- 下一页按钮 -->
		<view 
			v-if="showNextButton"
			class="u-pagination__next"
			:class="{ 'u-pagination__item--disabled': isLastPage || disabled }"
			:style="[itemStyle()]"
			@click="nextPage"
		>
			<slot name="next" :disabled="isLastPage || disabled">
				<text :style="textStyle">{{ nextText }}</text>
			</slot>
		</view>
	</view>
</template>

<script>

import props from './props.js';
import mixin from '../../libs/mixin/mixin';
import mpMixin from '../../libs/mixin/mpMixin';

/**
 * Pagination 分页
 * @description 分页器用于分隔长列表，每次只加载一个页面
 * @tutorial https://uveiw.bdxmz.cn/components/pagination.html
 * @property {Number}			modelValue		当前页码（默认 1 ）
 * @property {Number}			total			总记录数（默认 0 ）
 * @property {Number}			pageSize		每页显示的记录数（默认 10 ）
 * @property {Number}			pagerCount		显示的页码按钮数量（默认 5 ）
 * @property {Boolean}			disabled		是否禁用分页（默认 false ）
 * @property {Boolean}			forceEllipses	是否显示省略号（默认 false ）
 * @property {Boolean}			simple			是否为简单分页（默认 false ）
 * @property {Boolean}			showPrevButton	是否展示上一页按钮（默认 true ）
 * @property {Boolean}			showNextButton	是否展示下一页按钮（默认 true ）
 * @property {String}			prevText		上一页按钮文字（默认 '上一页' ）
 * @property {String}			nextText		下一页按钮文字（默认 '下一页' ）
 * @property {String}			bgColor			背景色（默认 '#f7f7f7' ）
 * @property {String}			color			文本色（默认 '#606266' ）
 * @property {String}			activeBgColor	激活背景色（默认 '#2979ff' ）
 * @property {String}			activeColor		激活文本色（默认 '#ffffff' ）
 * @property {String}			fontSize		字体尺寸（默认 '14px' ）
 * @property {String}			round			圆角（默认 '4px' ）
 * @property {String}			borderColor		描边色（默认 '#e4e7ed' ）
 * @property {String}			itemWidth		每项宽度（默认 '40px' ）
 * @property {String}			itemHeight		每项高度（默认 '40px' ）
 * @property {Object}			customStyle		自定义样式
 * @event {Function} change 切换分页触发
 * @example <u-pagination v-model="currentPage" :total="100" :page-size="10"></u-pagination>
 */
export default {
	name: "u-pagination",
	mixins: [mpMixin, mixin, props],
	
	data() {
		return {
			innerValue: 0
		}
	},
	computed: {
		// 总页数
		totalPages() {
			return Math.max(1, Math.ceil(this.total / this.pageSize));
		},
		// 是否为第一页
		isFirstPage() {
			return this.innerValue <= 1;
		},
		// 是否为最后一页
		isLastPage() {
			return this.innerValue >= this.totalPages;
		},
		// 页码项目列表
		pageItems() {
			const pageList = [];
			const totalPageCount = this.totalPages;
			const visiblePageCount = this.pagerCount;
			const currentPageNum = this.innerValue;
			
			let firstPage = 1;
			let lastPage = totalPageCount;

			const shouldLimitPages = visiblePageCount < totalPageCount;
			
			if (shouldLimitPages) {
				const halfVisible = Math.floor(visiblePageCount / 2);
				firstPage = Math.max(currentPageNum - halfVisible, 1);
				lastPage = firstPage + visiblePageCount - 1;

				if (lastPage > totalPageCount) {
					lastPage = totalPageCount;
					firstPage = lastPage - visiblePageCount + 1;
				}
			}

			// 生成基础页码列表
			for (let pageNum = firstPage; pageNum <= lastPage; pageNum++) {
				pageList.push({
					pageNumber: pageNum,
					label: `${pageNum}`,
					isActive: pageNum === currentPageNum,
					type: 'page'
				});
			}

			// 处理省略号显示逻辑
			if (shouldLimitPages && visiblePageCount > 0 && this.forceEllipses) {
				// 添加左侧省略号和首页
				if (firstPage > 1) {
					pageList.shift();
					
					// 添加左侧省略号
					pageList.unshift({
						pageNumber: firstPage - 1,
						label: '...',
						isActive: false,
						type: 'ellipsis'
					});

					// 添加首页
					pageList.unshift({
						pageNumber: 1,
						label: '1',
						isActive: currentPageNum === 1,
						type: 'page'
					});
				}

				// 添加右侧省略号和末页
				if (lastPage < totalPageCount) {
					pageList.pop();
					
					// 添加右侧省略号
					pageList.push({
						pageNumber: lastPage + 1,
						label: '...',
						isActive: false,
						type: 'ellipsis'
					});
					
					// 添加末页
					pageList.push({
						pageNumber: totalPageCount,
						label: `${totalPageCount}`,
						isActive: currentPageNum === totalPageCount,
						type: 'page'
					});
				}
			}

			return pageList;
		},
		// 项目样式
		itemStyle(isItem) {
			return (isItem) => {

				let style = {
					height: this.itemHeight,
					borderRadius: this.round
				}

				if(this.bgColor){
					style.backgroundColor = this.bgColor
				}

				if(this.borderColor){
					style.border = '1px solid ' + this.borderColor
				}

				if(isItem){
					style.width = this.itemWidth
				}
				return style;
			}
		},
		// 激活项目样式
		activeItemStyle(isItem) {
			return (isItem) => {

				let style = {
					height: this.itemHeight,
					borderRadius: this.round
				}

				if(this.activeBgColor){
					style.backgroundColor = this.activeBgColor
				}

				if(this.activeColor){
					style.color = this.activeColor
				}

				if(isItem){
					style.width = this.itemWidth
				}
				return style;
			}
		},
		// 文本样式
		textStyle() {
			return {
				color: this.color,
				fontSize: this.fontSize
			};
		},
		// 激活文本样式
		activeTextStyle() {
			return {
				color: this.activeColor,
				fontSize: this.fontSize
			};
		}
	},
	watch: {
		// #ifdef VUE3
		modelValue: {
			immediate: true,
			handler(val) {
				// 只在初始化或外部主动改变时更新内部状态
				if (val && val !== this.innerValue) {
					this.innerValue = val;
				}
			}
		},
		// #endif
		value: {
			immediate: true,
			handler(val) {
				// 只在没有modelValue且value有效时更新
				if (val && !this.modelValue) {
					this.innerValue = val;
				}
			}
		}
	},
	// #ifdef VUE3
	emits: ["update:modelValue", "change"],
	// #endif
	methods: {
		// 更新页码
		updatePage(page) {
			if (this.disabled) return;
			const newPage = Math.max(1, Math.min(page, this.totalPages));
			if (newPage !== this.innerValue) {
				this.innerValue = newPage;
				// #ifdef VUE2
				this.$emit('input', newPage);
				// #endif
				
				// #ifdef VUE3
				this.$emit('update:modelValue', newPage);
				// #endif

				this.$emit('change', newPage);
			}
		},
		// 上一页
		prevPage() {
			if (this.isFirstPage || this.disabled) return;
			this.updatePage(this.innerValue - 1);
		},
		// 下一页
		nextPage() {
			if (this.isLastPage || this.disabled) return;
			this.updatePage(this.innerValue + 1);
		},
		// 处理页码点击
		handlePageClick(page) {
			if (this.disabled || page.isActive) return;
			this.updatePage(page.pageNumber);
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../libs/css/components.scss";

.u-pagination {
	@include flex;
	align-items: center;
	justify-content: center;
	
	&--simple {
		.u-pagination__simple {
			margin: 0 12px;
		}
	}
	
	&--disabled {
		opacity: 0.8;
		// #ifdef H5
		pointer-events: none;
		// #endif
	}
	
	&__item,
	&__prev,
	&__next {
		@include flex;
		align-items: center;
		justify-content: center;
		// #ifndef APP-NVUE
		user-select: none;
		// #endif
		// #ifdef H5
		cursor: pointer;
		// #endif
		
		&--active {
			border-color: transparent;
		}
		
		&--disabled {
			opacity: 0.5;
			// #ifdef H5
			cursor: not-allowed;
			// #endif
		}
		
		&--ellipsis {
			
			// #ifdef H5
			cursor: pointer;
			// #endif
		}
	}
	
	&__prev {
		margin-right: 3px;
	}

	&__next {
		margin-left: 3px;
	}

	&__prev,
	&__next {
		padding: 0 10px;
		&:active {
			opacity: 0.8;
		}
	}
	
	&__item {
		margin: 0 3px;
	}
}
</style>
