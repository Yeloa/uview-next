<template>
	<view class="u-ellipsis" :style="customStyle">
		<view class="u-ellipsis__content">
			<text :style="[textStyle]">
				{{ expanded ? content : text }}
				<text v-if="hasAction" class="u-ellipsis__action" @click="handleToggle"
					:style="[{
						color: actionColor
					}]">
					{{ expanded ? collapseText : expandText }}
				</text>
			</text>
		</view>
		<text class="measureBox"  :class="[measureId]" :style="[textStyle]"> {{ measureContent }}</text>
	</view>
</template>

<script>
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom')
// #endif
import props from './props.js';
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin';

/**
 * ellipsis 文本省略
 * @description 文本过长时，自动省略多余的文本。支持展开/收起功能。
 * @tutorial https://uveiw.bdxmz.cn/components/ellipsis.html
 * @property {String}			content			文本内容
 * @property {String}			position		省略位置，可选值为 start、end、middle （默认 'end' ）
 * @property {String | Number}	rows			行数 （默认 1 ）
 * @property {String}			expandText		展开文本
 * @property {String}			collapseText	收起文本
 * @property {String}			symbol			省略符号 （默认 '...' ）
 * @property {String}			color			文本颜色
 * @property {String | Number}	fontSize		文本大小 （默认 14 ）
 * @property {String}			actionColor		展开/收起按钮颜色
 * @property {Object}			customStyle		定义需要用到的外部样式
 * 
 * @event {Function} click 点击文本时触发
 * @event {Function} change 展开/收起状态改变时触发
 * @example <u-ellipsis content="这是一段很长的文本内容..." :rows="2" expand-text="展开" collapse-text="收起"></u-ellipsis>
 */
export default {
	name: "u-ellipsis",
	mixins: [mpMixin, mixin, props],
	data() {
		return {
			text: '',
			expanded: false,
			hasAction: false,
			measureBoxVisible: false,
			measureContent: '',
			measureId: uni.$u.guid() // 生成唯一class
		}
	},
	computed: {
		textStyle() {
			return {
				color: this.color,
				fontSize: this.$u.addUnit(this.fontSize),
				lineHeight: this.$u.addUnit(this.lineHeight)
			}
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.calcEllipsised()
		})
	},

	// #ifdef VUE3
	emits: ["click", "change"],
	// #endif
	methods: {
		getMeasureBox() {
			return new Promise(resolve => {
				// #ifndef APP-NVUE
				this.$uGetRect('.' + this.measureId).then(res => {
					resolve(res)
				})
				// #endif

				// #ifdef APP-NVUE
				const ref = this.$refs['measureBox']
				if (ref) {
					dom.getComponentRect(ref, (res) => {
						resolve({
							height: res.size.height,
							width: res.size.width
						})
					})
				} else {
					resolve({ height: 0, width: 0 })
				}
				// #endif
			})
		},

		async calcEllipsised() {
			if (!this.content || !this.content.length) return
			
			// 初始化测量容器
			this.measureBoxVisible = true
			
			try {
				// 计算基准行高和最大允许高度
				const sampleText = this.content.slice(0, 1)
				const { height, width } = await this.measureTextHeight(sampleText)
				const maxAllowedHeight = (height || 20) * Number(this.rows)
				
				// 检查原文本是否需要省略
				const originalTextHeight = await this.measureTextHeight(this.content)
				
				if (originalTextHeight <= maxAllowedHeight) {
					this.text = this.content
					this.hasAction = false
					return
				}
				
				// 执行文本截断处理
				this.hasAction = true
				this.text = await this.performTextTruncation(maxAllowedHeight)
				
			} catch (error) {
				this.text = this.content
				this.hasAction = false
			} finally {
				this.measureBoxVisible = false
			}
		},

		// 测量文本高度
		async measureTextHeight(text) {
			this.measureContent = text
			await this.$nextTick()
			return this.getMeasureBox()
		},

		// 执行文本截断处理
		async performTextTruncation(maxHeight) {
			if (this.position === 'middle') {
				return await this.truncateMiddle(maxHeight, this.symbol, this.expandText)
			} else {
				return await this.truncateEdge(maxHeight, this.symbol, this.expandText, this.position)
			}
		},

		// 中间截断处理
		async truncateMiddle(maxHeight, symbol, actionText) {
			const text = this.content
			const textLength = text.length
			const centerPoint = Math.floor(textLength / 2)
			
			let leftBoundary = [0, centerPoint]
			let rightBoundary = [centerPoint, textLength]
			
			while (this.shouldContinueTruncation(leftBoundary, rightBoundary)) {
				const leftMidpoint = Math.floor((leftBoundary[0] + leftBoundary[1]) / 2)
				const rightMidpoint = Math.ceil((rightBoundary[0] + rightBoundary[1]) / 2)
				
				const testText = text.slice(0, leftMidpoint) + symbol + text.slice(rightMidpoint) + actionText
				const { height } = await this.measureTextHeight(testText)
				
				if (height >= maxHeight) {
					// 文本过长，缩小范围
					leftBoundary = [leftBoundary[0], leftMidpoint]
					rightBoundary = [rightMidpoint, rightBoundary[1]]
				} else {
					// 文本适中，扩大范围
					leftBoundary = [leftMidpoint, leftBoundary[1]]
					rightBoundary = [rightBoundary[0], rightMidpoint]
				}
			}
			
			return text.slice(0, leftBoundary[0]) + symbol + text.slice(rightBoundary[1])
		},

		// 边缘截断处理（开始或结束）
		async truncateEdge(maxHeight, symbol, actionText, direction) {
			const text = this.content
			const isStartTruncation = direction === 'start'
			
			let searchStart = 0
			let searchEnd = text.length
			let bestPosition = -1
			
			while (searchStart <= searchEnd) {
				const midPosition = Math.floor((searchStart + searchEnd) / 2)
				
				const testText = isStartTruncation 
					? symbol + text.slice(midPosition) + actionText
					: text.slice(0, midPosition) + symbol + actionText
				
				const { height } = await this.measureTextHeight(testText)
				
				if (height <= maxHeight) {
					bestPosition = midPosition
					if (isStartTruncation) {
						searchEnd = midPosition - 1
					} else {
						searchStart = midPosition + 1
					}
				} else {
					if (isStartTruncation) {
						searchStart = midPosition + 1
					} else {
						searchEnd = midPosition - 1
					}
				}
			}
			
			return isStartTruncation 
				? symbol + text.slice(bestPosition)
				: text.slice(0, bestPosition) + symbol
		},

		shouldContinueTruncation(leftBoundary, rightBoundary) {
			return (leftBoundary[1] - leftBoundary[0] > 1) || (rightBoundary[1] - rightBoundary[0] > 1)
		},

		handleToggle(event) {
			this.expanded = this.expanded ? false : true;
			this.$emit('change', {
				expanded: this.expanded,
				content: this.expanded ? this.content : this.text
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.u-ellipsis {
	position: relative;

	.measureBox {
		position: absolute;
		top: -9999px;
		left: -9999px;
		
		/* #ifndef APP-NVUE */
		white-space: normal;
		word-wrap: break-word;
		visibility: hidden;
		width: 100%;
		/* #endif */
	}

	&__content {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		flex-wrap: wrap;
	}

	&__action {
		/* #ifndef APP-NVUE */
		flex-shrink: 0;
		cursor: pointer;
		user-select: none;
		/* #endif */
		&:hover {
			opacity: 0.8;
		}
	}
}
</style>
