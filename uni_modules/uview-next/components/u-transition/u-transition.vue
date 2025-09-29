<template>
	<view
		v-if="inited"
		class="u-transition"
		ref="u-transition"
		@tap="clickHandler"
		:class="[classes, customClass]"
		:style="[mergeStyle]"
		@touchmove="noop"
	>
		<slot />
	</view>
</template>

<script>
import props from './props.js';
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin';

/**
 * transition  动画组件
 * @description
 * @tutorial
 * @property {String}			show			是否展示组件 （默认 false ）
 * @property {String}			mode			使用的动画模式 （默认 'fade' ）
 * @property {String | Number}	duration		动画的执行时间，单位ms （默认 '300' ）
 * @property {String}			timingFunction	使用的动画过渡函数 （默认 'ease-out' ）
 * @property {Object}			customStyle		自定义样式
 * @event {Function} before-enter	进入前触发
 * @event {Function} enter			进入中触发
 * @event {Function} after-enter	进入后触发
 * @event {Function} before-leave	离开前触发
 * @event {Function} leave			离开中触发
 * @event {Function} after-leave	离开后触发
 * @example
 */
export default {
	name: 'u-transition',
	// 将mixin挂在到组件中，mixin实际上为一个vue格式对象
	mixins: [mpMixin, mixin, props],
	data() {
		return {
			inited: false, // 是否显示/隐藏组件
			viewStyle: {}, // 组件内部的样式
			status: '', // 记录组件动画的状态
			transitionEnded: false, // 组件是否结束的标记
			display: false, // 组件是否展示
			classes: '', // 应用的类名
		}
	},
	computed: {
	    mergeStyle() {
	        const { viewStyle, customStyle } = this
	        return {
				zIndex: this.zIndex,
	            transitionDuration: `${this.duration}ms`,
				transitionTimingFunction: this.timingFunction,
				// 避免自定义样式影响到动画属性，所以写在viewStyle前面
	            ...uni.$u.addStyle(customStyle),
	            ...viewStyle
	        }
	    }
	},
	
	watch: {
		show: {
			handler(newVal) {
				newVal ? this.onEnter() : this.onLeave()
			},
			// 表示同时监听初始化时的props的show的意思
			immediate: true
		}
	},
	emits: ["beforeEnter", "enter", "afterEnter", "beforeLeave", "leave", "afterLeave", "click"],
    methods: {
		// 定义类名，通过给元素动态切换类名，赋予元素一定的css动画样式
		getClassNames(name) {
			return {
				enter: `u-${name}-enter u-${name}-enter-active`,
				'enter-to': `u-${name}-enter-to u-${name}-enter-active`,
				leave: `u-${name}-leave u-${name}-leave-active`,
				'leave-to': `u-${name}-leave-to u-${name}-leave-active`
			}
		},
        // 组件被点击发出事件
        clickHandler(e) {
            this.$emit('click', e)
        },
        onEnter() {
            // 动画进入时的类名
            const classNames = this.getClassNames(this.mode)
            // 定义状态和发出动画进入前事件
            this.status = 'enter'
            this.$emit('beforeEnter')
            this.inited = true
            this.display = true
            this.classes = classNames.enter
           
            this.$nextTick(async () => {
                await uni.$u.sleep(20)
                // 标识动画尚未结束
                this.$emit('enter')
                this.transitionEnded = false
				// 组件动画进入后触发的事件
                this.$emit('afterEnter')
                // 赋予组件enter-to类名
                this.classes = classNames['enter-to']
            })
        },
        // 动画离场处理
        onLeave() {
            // 如果不是展示状态，无需执行逻辑
            if (!this.display) return
            const classNames = this.getClassNames(this.mode)
            // 标记离开状态和发出事件
            this.status = 'leave'
            this.$emit('beforeLeave')
            // 获得类名
            this.classes = classNames.leave

            this.$nextTick(() => {
               // 动画正在离场的状态
               this.transitionEnded = false
               this.$emit('leave')
                // 组件执行动画，到了执行的执行时间后，执行一些额外处理
                setTimeout(this.onTransitionEnd, this.duration)
                this.classes = classNames['leave-to']
            })
        },
        // 完成过渡后触发
        onTransitionEnd() {
            // 如果已经是结束的状态，无需再处理
            if (this.transitionEnded) return
            this.transitionEnded = true
            // 发出组件动画执行后的事件
            this.$emit(this.status === 'leave' ? 'afterLeave' : 'afterEnter')
            if (!this.show && this.display) {
                this.display = false
                this.inited = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../libs/css/components.scss";

.u-fade-enter-active,
.u-fade-leave-active {
	transition-property: opacity;
}

.u-fade-enter,
.u-fade-leave-to {
	opacity: 0
}

.u-fade-zoom-enter,
.u-fade-zoom-leave-to {
	transform: scale(0.95);
	opacity: 0;
}

.u-fade-zoom-enter-active,
.u-fade-zoom-leave-active {
	transition-property: transform, opacity;
}

.u-fade-down-enter-active,
.u-fade-down-leave-active,
.u-fade-left-enter-active,
.u-fade-left-leave-active,
.u-fade-right-enter-active,
.u-fade-right-leave-active,
.u-fade-up-enter-active,
.u-fade-up-leave-active {
	transition-property: opacity, transform;
}

.u-fade-up-enter,
.u-fade-up-leave-to {
	transform: translate3d(0, 100%, 0);
	opacity: 0
}

.u-fade-down-enter,
.u-fade-down-leave-to {
	transform: translate3d(0, -100%, 0);
	opacity: 0
}

.u-fade-left-enter,
.u-fade-left-leave-to {
	transform: translate3d(-100%, 0, 0);
	opacity: 0
}

.u-fade-right-enter,
.u-fade-right-leave-to {
	transform: translate3d(100%, 0, 0);
	opacity: 0
}

.u-slide-down-enter-active,
.u-slide-down-leave-active,
.u-slide-left-enter-active,
.u-slide-left-leave-active,
.u-slide-right-enter-active,
.u-slide-right-leave-active,
.u-slide-up-enter-active,
.u-slide-up-leave-active {
	transition-property: transform;
}

.u-slide-up-enter,
.u-slide-up-leave-to {
	transform: translate3d(0, 100%, 0)
}

.u-slide-down-enter,
.u-slide-down-leave-to {
	transform: translate3d(0, -100%, 0)
}

.u-slide-left-enter,
.u-slide-left-leave-to {
	transform: translate3d(-100%, 0, 0)
}

.u-slide-right-enter,
.u-slide-right-leave-to {
	transform: translate3d(100%, 0, 0)
}

.u-zoom-enter-active,
.u-zoom-leave-active {
	transition-property: transform
}

.u-zoom-enter,
.u-zoom-leave-to {
	transform: scale(0.95)
}

.u-transition {
	display: flex;
		flex-direction: column;
	position: relative;
}
</style>
