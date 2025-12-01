<template>
	<view class="u-notice" @tap="clickHandler">
		<slot name="icon">
			<view class="u-notice__left-icon" v-if="icon">
				<u-icon :name="icon" :color="iconColor" size="19"></u-icon>
			</view>
		</slot>
		<view class="u-notice__content" ref="u-notice__content">
			<view ref="u-notice__content__text" class="u-notice__content__text" :style="[animationStyle]">
				<text v-for="(item, index) in innerText" :key="index" :style="[textStyle]">{{ item }}</text>
			</view>
		</view>
		<view class="u-notice__right-icon" v-if="['link', 'closable'].includes(mode)">
			<u-icon v-if="mode === 'link'" name="arrow-right" :size="17" :color="color"></u-icon>
			<u-icon v-if="mode === 'closable'" @click="close" name="close" :size="16" :color="color"></u-icon>
		</view>
	</view>
</template>
<script>
import props from './props.js';
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin';
/**
 * RowNotice 滚动通知中的水平滚动模式
 * @description 水平滚动
 * @tutorial https://uview.d3u.cn/components/noticeBar.html
 * @property {String | Number}	text			显示的内容，字符串
 * @property {String}			icon			是否显示左侧的音量图标 (默认 'volume' )
 * @property {String}			mode			通告模式，link-显示右箭头，closable-显示右侧关闭图标
 * @property {String}			color			文字颜色，各图标也会使用文字颜色 (默认 '#f9ae3d' )
 * @property {String}			bgColor			背景颜色 (默认 ''#fdf6ec' )
 * @property {String | Number}	fontSize		字体大小，单位px (默认 14 )
 * @property {String | Number}	speed			水平滚动时的滚动速度，即每秒滚动多少px(rpx)，这有利于控制文字无论多少时，都能有一个恒定的速度  (默认 80 )
 * 
 * @event {Function} click 点击通告文字触发
 * @event {Function} close 点击右侧关闭图标触发
 * @example 
 */
export default {
	name: 'u-row-notice',
	mixins: [mpMixin, mixin, props],
	data() {
		return {
			animationDuration: '0', // 动画执行时间
			animationPlayState: 'paused', // 动画的开始和结束执行
			show: true
		};
	},
	watch: {
		text: {
			immediate: true,
			handler(newValue, oldValue) {
				this.vue()
				if (!uni.$u.test.string(newValue)) {
					uni.$u.error('noticebar组件direction为row时，要求text参数为字符串形式')
				}
			}
		},
		fontSize() {
			this.vue()
		},
		speed() {
			this.vue()
		}
	},
	computed: {
		// 文字内容的样式
		textStyle() {
			let style = {}
			style.color = this.color
			style.fontSize = uni.$u.addUnit(this.fontSize)
			return style
		},
		animationStyle() {
			let style = {}
			style.animationDuration = this.animationDuration
			style.animationPlayState = this.animationPlayState
			return style
		},
		// 内部对用户传入的数据进一步分割，放到多个text标签循环，否则如果用户传入的字符串很长（100个字符以上）
		// 放在一个text标签中进行滚动，在低端安卓机上，动画可能会出现抖动现象，需要分割到多个text中可解决此问题
		innerText() {
			let result = [],
				// 每组text标签的字符长度
				len = 20
			const textArr = this.text.split('')
			for (let i = 0; i < textArr.length; i += len) {
				// 对拆分的后的text进行slice分割，得到的为数组再进行join拼接为字符串
				result.push(textArr.slice(i, i + len).join(''))
			}
			return result
		}
	},
	mounted() {
		// #ifdef APP-PLUS
		// 在APP上，监听当前webview是否处于隐藏状态(进入下一页时即为hide状态)
		// 如果webivew隐藏了，为了节省性能的损耗，应停止动画的执行，同时也是为了保持进入下一页返回后，滚动位置保持不变
		var pages = getCurrentPages()
		var page = pages[pages.length - 1]
		var currentWebview = page.$getAppWebview()
		currentWebview.addEventListener('hide', () => {
			this.webviewHide = true
		})
		currentWebview.addEventListener('show', () => {
			this.webviewHide = false
		})
		// #endif

		this.init()
	},
	// #ifdef VUE3
	emits: ["click", "close"],
	// #endif
	methods: {
		init() {
			this.vue()
			if (!uni.$u.test.string(this.text)) {
				uni.$u.error('noticebar组件direction为row时，要求text参数为字符串形式')
			}
		},
		async vue() {
			let boxWidth = 0,
				textWidth = 0
			// 进行一定的延时
			await uni.$u.sleep()
			// 查询盒子和文字的宽度
			textWidth = (await this.$uGetRect('.u-notice__content__text')).width
			boxWidth = (await this.$uGetRect('.u-notice__content')).width
			// 根据t=s/v(时间=路程/速度)，这里为何不需要加上#u-notice-box的宽度，因为中设置了.u-notice-content样式中设置了padding-left: 100%
			// 恰巧计算出来的结果中已经包含了#u-notice-box的宽度
			this.animationDuration = `${textWidth / uni.$u.getPx(this.speed)}s`
			// 这里必须这样开始动画，否则在APP上动画速度不会改变
			this.animationPlayState = 'paused'
			setTimeout(() => {
				this.animationPlayState = 'running'
			}, 10)
		},
		// 点击通告栏
		clickHandler(index) {
			this.$emit('click')
		},
		// 点击右侧按钮，需要判断点击的是关闭图标还是箭头图标
		close() {
			this.$emit('close')
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/components.scss";

.u-notice {
	@include flex;
	align-items: center;
	justify-content: space-between;

	&__left-icon {
		align-items: center;
		margin-right: 5px;
	}

	&__right-icon {
		margin-left: 5px;
		align-items: center;
	}

	&__content {
		text-align: right;
		flex: 1;
		@include flex;
		flex-wrap: nowrap;
		overflow: hidden;

		&__text {
			font-size: 14px;
			color: $u-warning;
			// 这一句很重要，为了能让滚动左右连接起来
			padding-left: 100%;
			word-break: keep-all;
			white-space: nowrap;
			animation: u-loop-animation 10s linear infinite both;
			@include flex(row);
			flex-shrink: 0;
		}
	}

}
@keyframes u-loop-animation {
	0% {
		transform: translate3d(0, 0, 0);
	}
	100% {
		transform: translate3d(-100%, 0, 0);
	}
}
</style>
