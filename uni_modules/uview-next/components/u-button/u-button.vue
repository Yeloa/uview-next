<template>
    <button 
        class="u-button u-reset-button"
        :hover-class="hoverClass" 
        :style="[baseColor, $u.addStyle(customStyle)]" 
        :class="buttonClass"
        :hover-start-time="Number(hoverStartTime)" 
        :hover-stay-time="Number(hoverStayTime)" 
        :form-type="formType"
        :open-type="openType" 
        :app-parameter="appParameter" 
        :hover-stop-propagation="hoverStopPropagation"
        :send-message-title="sendMessageTitle" 
        :send-message-path="sendMessagePath" 
        :lang="lang" 
        :data-name="dataName"
        :session-from="sessionFrom" 
        :send-message-img="sendMessageImg" 
        :show-message-card="showMessageCard"
        @getphonenumber="getphonenumber" 
        @getuserinfo="getuserinfo" 
        @error="error" 
        @opensetting="opensetting"
        @launchapp="launchapp" 
        @agreeprivacyauthorization="agreeprivacyauthorization" 
        @chooseavatar="chooseavatar"
        @tap="clickHandler" 
    >
        <template v-if="loading">
            <u-loading-icon :mode="loadingMode" :size="loadingSize * 1.15" :color="loadingColor"></u-loading-icon>
            <text class="u-button__loading-text" :style="[textStyle]">{{ loadingText || text}}</text>
        </template>
        <template v-else>
            <u-icon v-if="icon" :name="icon" :color="iconColorCom" :size="textSize * 1.35"></u-icon>
            <slot>
                <text class="u-button__text" :style="[textStyle]">{{ text }}</text>
            </slot>
        </template>
    </button>
</template>

<script>
import button from "../../libs/mixin/button.js"
import openType from "../../libs/mixin/openType.js"
import props from "./props.js"
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin'

/**
 * button 按钮
 * @description Button 按钮
 * @tutorial https://www.uviewui.com/components/button.html
 *
 * @property {Boolean}			hairline				是否显示按钮的细边框 (默认 true )
 * @property {String}			type					按钮的预置样式，info，primary，error，warning，success (默认 'info' )
 * @property {String}			size					按钮尺寸，large，normal，mini （默认 normal）
 * @property {String}			shape					按钮形状，circle（两边为半圆），square（带圆角） （默认 'square' ）
 * @property {Boolean}			plain					按钮是否镂空，背景色透明 （默认 false）
 * @property {Boolean}			disabled				是否禁用 （默认 false）
 * @property {Boolean}			loading					按钮名称前是否带 loading 图标（默认 false）
 * @property {String | Number}	loadingText				加载中提示文字
 * @property {String}			loadingMode				加载状态图标类型 （默认 'spinner' ）
 * @property {String | Number}	loadingSize				加载图标大小 （默认 15 ）
 * @property {String}			openType				开放能力，具体请看uniapp稳定关于button组件部分说明
 * @property {String}			formType				用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
 * @property {String}			appParameter			打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 （注：只微信小程序、QQ小程序有效）
 * @property {Boolean}			hoverStopPropagation	指定是否阻止本节点的祖先节点出现点击态，微信小程序有效（默认 true ）
 * @property {String}			lang					指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文（默认 en ）
 * @property {String}			sessionFrom				会话来源，openType="contact"时有效
 * @property {String}			sendMessageTitle		会话内消息卡片标题，openType="contact"时有效
 * @property {String}			sendMessagePath			会话内消息卡片点击跳转小程序路径，openType="contact"时有效
 * @property {String}			sendMessageImg			会话内消息卡片图片，openType="contact"时有效
 * @property {Boolean}			showMessageCard			是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，openType="contact"时有效（默认false）
 * @property {String}			dataName				额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
 * @property {String | Number}	throttleTime			节流，一定时间内只能触发一次 （默认 0 )
 * @property {String | Number}	hoverStartTime			按住后多久出现点击态，单位毫秒 （默认 0 )
 * @property {String | Number}	hoverStayTime			手指松开后点击态保留时间，单位毫秒 （默认 200 )
 * @property {String | Number}	text					按钮文字，之所以通过props传入，是因为slot传入的话
 * @property {String}			icon					按钮图标
 * @property {String}			iconColor				按钮图标颜色
 * @property {String}			color					按钮颜色，支持传入linear-gradient渐变色
 * @property {Object}			customStyle				定义需要用到的外部样式
 *
 * @event {Function}	click			非禁止并且非加载中，才能点击
 * @event {Function}	getphonenumber	open-type="getPhoneNumber"时有效
 * @event {Function}	getuserinfo		用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo
 * @event {Function}	error			当使用开放能力时，发生错误的回调
 * @event {Function}	opensetting		在打开授权设置页并关闭后回调
 * @event {Function}	launchapp		打开 APP 成功的回调
 * @event {Function}	chooseavatar	选择头像回调，openType="chooseAvatar"时有效
 * @event {Function}	agreeprivacyauthorization	用户同意隐私协议事件回调
 * @example <u-button>月落</u-button>
 */
export default {
    name: "u-button",
    mixins: [
        mpMixin,
        mixin,
        props,
        // #ifdef MP
        button,
        openType
        // #endif
    ],
    computed: {
        hoverClass() {
            return this.disabled || this.loading ? '' : 'u-button--active';
        },
        buttonClass() {
            let classes = [
                'u-button--' + this.type,
                'u-button--' + this.shape, 
                'u-button--' + this.size
            ]
       
            if (this.disabled) {
                classes.push('u-button--disabled')
            }
            if (this.plain) {
                classes.push('u-button--plain')
            }
            if (this.hairline) {
                classes.push('u-button--hairline')
            }
            // 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
            // #ifdef MP-ALIPAY || MP-TOUTIAO
            classes = classes.join(' ')
            // #endif
            return classes
        },
        loadingColor() {
            if (this.plain) {
                // 如果有设置color值，则用color值，否则使用type主题颜色
                return this.color ? this.color : this.$u.theme[this.type];
            }
            if (this.type === "info") {
                return "#c9c9c9";
            }
            return "rgb(200, 200, 200)";
        },
        iconColorCom() {
            // 如果是镂空状态，设置了color就用color值，否则使用主题颜色，
            // u-icon的color能接受一个主题颜色的值
			if (this.iconColor) return this.iconColor;
			if (this.plain) {
                return this.color ? this.color : this.type;
            } else {
                return this.type === "info" ? "#000000" : "#ffffff";
            }
        },
        baseColor() {
            let style = {};
            if (this.color) {
                // 针对自定义了color颜色的情况，镂空状态下，就是用自定义的颜色
                style.color = this.plain ? this.color : "white";
                if (!this.plain) {
                    // 非镂空，背景色使用自定义的颜色
                    style["background-color"] = this.color;
                }
                if (this.color.indexOf("gradient") !== -1) {
                    style.borderWidth = 0;
                    if (!this.plain) {
                        style.backgroundImage = this.color;
                    }
                } else {
                    style.border = '1px solid ' + this.color;
                }
            }

            let radius = this.shape == 'circle' ? 100 : this.round
            if(radius) {
                style.borderRadius = uni.$u.addUnit(radius)
            }

            if(this.icon && this.iconPosition === 'right'){
                style.flexDirection = 'row-reverse';
            }

            return style;
        },
        textStyle() {
            let style = {};
            style.fontSize = uni.$u.addUnit(this.textSize);

            if(this.icon){
                if(this.iconPosition === 'left'){
                    style.marginLeft =  uni.$u.addUnit(2);
                }else{
                    style.marginRight = uni.$u.addUnit(2);
                }
            }
            
            return style;
        },
        // 字体大小
        textSize() {
            let fontSize = 14,
                { size } = this;
            if (size === "large") fontSize = 16;
            if (size === "normal") fontSize = 14;
            if (size === "small") fontSize = 12;
            if (size === "mini") fontSize = 10;
            return fontSize;
        },
    },
  
    // #ifdef VUE3
    emits: ['click', 'error', 'launchapp', 'opensetting', 'getuserinfo', 'getphonenumber', 'agreeprivacyauthorization', 'chooseavatar'],
    // #endif
    methods: {
        clickHandler(e) {
            // 非禁止并且非加载中，才能点击
            if (!this.disabled && !this.loading) {
                // 进行节流控制，每this.throttle毫秒内，只在开始处执行
                uni.$u.throttle(() => {
                    this.$emit("click", e);
                }, this.throttleTime);
            }
        },
        // 下面为对接uniapp官方按钮开放能力事件回调的对接
        getphonenumber(res) {
            this.$emit("getphonenumber", res);
        },
        getuserinfo(res) {
            this.$emit("getuserinfo", res);
        },
        error(res) {
            this.$emit("error", res);
        },
        opensetting(res) {
            this.$emit("opensetting", res);
        },
        launchapp(res) {
            this.$emit("launchapp", res);
        },
        agreeprivacyauthorization(res) {
            this.$emit("agreeprivacyauthorization", res);
        },
        chooseavatar(res) {
            this.$emit("chooseavatar", res);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/components.scss";

$u-button-before-top:50% !default;
$u-button-before-left:50% !default;
$u-button-before-width:100% !default;
$u-button-before-height:100% !default;
$u-button-before-transform:translate(-50%, -50%) !default;
$u-button-before-opacity:0 !default;
$u-button-before-background-color:#000 !default;
$u-button-before-border-color:#000 !default;
$u-button-active-before-opacity:.15 !default;
$u-button-icon-margin-left:4px !default;
$u-button-plain-u-button-info-color:$u-info;
$u-button-plain-u-button-success-color:$u-success;
$u-button-plain-u-button-error-color:$u-error;
$u-button-plain-u-button-warning-color:$u-error;

$u-button-u-button-height: 40px !default;
$u-button-text-font-size: 15px !default;
$u-button-loading-text-font-size: 15px !default;
$u-button-loading-text-margin-left: 4px !default;
$u-button-large-width: 100% !default;
$u-button-large-height: 50px !default;
$u-button-normal-padding: 0 12px !default;
$u-button-large-padding: 0 15px !default;
$u-button-normal-font-size: 14px !default;
$u-button-small-min-width: 60px !default;
$u-button-small-height: 30px !default;
$u-button-small-padding: 0px 8px !default;
$u-button-mini-padding: 0px 8px !default;
$u-button-small-font-size: 12px !default;
$u-button-mini-height: 22px !default;
$u-button-mini-font-size: 10px !default;
$u-button-mini-min-width: 50px !default;
$u-button-disabled-opacity: 0.5 !default;
$u-button-info-color: #323233 !default;
$u-button-info-background-color: $u-info-light !default;
$u-button-info-border-color: $u-info-light !default;
$u-button-info-border-width: 1px !default;
$u-button-info-border-style: solid !default;
$u-button-success-color: #fff !default;
$u-button-success-background-color: $u-success !default;
$u-button-success-border-color: $u-button-success-background-color !default;
$u-button-success-border-width: 1px !default;
$u-button-success-border-style: solid !default;
$u-button-primary-color: #fff !default;
$u-button-primary-background-color: $u-primary !default;
$u-button-primary-border-color: $u-button-primary-background-color !default;
$u-button-primary-border-width: 1px !default;
$u-button-primary-border-style: solid !default;
$u-button-error-color: #fff !default;
$u-button-error-background-color: $u-error !default;
$u-button-error-border-color: $u-button-error-background-color !default;
$u-button-error-border-width: 1px !default;
$u-button-error-border-style: solid !default;
$u-button-warning-color: #fff !default;
$u-button-warning-background-color: $u-warning !default;
$u-button-warning-border-color: $u-button-warning-background-color !default;
$u-button-warning-border-width: 1px !default;
$u-button-warning-border-style: solid !default;
$u-button-block-width: 100% !default;
$u-button-icon-min-width: 1em !default;
$u-button-plain-background-color: #fff !default;
$u-button-hairline-border-width: 0.5px !default;

.u-button {
    position: relative;
    align-items: center;
    justify-content: center;
    @include flex;
    box-sizing: border-box;
    flex-direction: row;
    width: 100%;
    
    &:before {
        position: absolute;
        top:$u-button-before-top;
        left:$u-button-before-left;
        width:$u-button-before-width;
        height:$u-button-before-height;
        border: inherit;
        border-radius: inherit;
        transform:$u-button-before-transform;
        opacity:$u-button-before-opacity;
        content: " ";
        background-color:$u-button-before-background-color;
        border-color:$u-button-before-border-color;
    }
    
    &--active {
        &:before {
            opacity: .15
        }
    }
    
    &__icon+&__text:not(:empty),
    &__loading-text {
        margin-left:$u-button-icon-margin-left;
    }
    
    &--plain {
        &.u-button--primary {
            color: $u-primary;
        }
    }
    
    &--plain {
        &.u-button--info {
            color:$u-button-plain-u-button-info-color;
        }
    }
    
    &--plain {
        &.u-button--success {
            color:$u-button-plain-u-button-success-color;
        }
    }
    
    &--plain {
        &.u-button--error {
            color:$u-button-plain-u-button-error-color;
        }
    }
    
    &--plain {
        &.u-button--warning {
            color:$u-button-plain-u-button-warning-color;
        }
    }

    &__text {
        font-size: $u-button-text-font-size;
        white-space: nowrap;
        line-height: 1;
    }

    &__loading-text {
        font-size: $u-button-loading-text-font-size;
        margin-left: $u-button-loading-text-margin-left;
    }

    &--large {
        width: $u-button-large-width;
        height: $u-button-large-height;
        padding: $u-button-large-padding;
    }

    &--normal {
		height: $u-button-u-button-height;
        padding: $u-button-normal-padding;
        font-size: $u-button-normal-font-size;
    }

    &--small {
        min-width: $u-button-small-min-width;
        height: $u-button-small-height;
        padding: $u-button-small-padding;
        font-size: $u-button-small-font-size;
    }

    &--mini {
        height: $u-button-mini-height;
        font-size: $u-button-mini-font-size;
        min-width: $u-button-mini-min-width;
        padding: $u-button-mini-padding;
    }

    &--disabled {
        opacity: $u-button-disabled-opacity;
    }

    &--info {
        color: $u-button-info-color;
        background-color: $u-button-info-background-color;
        border-color: $u-button-info-border-color;
        border-width: $u-button-info-border-width;
        border-style: $u-button-info-border-style;
    }

    &--success {
        color: $u-button-success-color;
        background-color: $u-button-success-background-color;
        border-color: $u-button-success-border-color;
        border-width: $u-button-success-border-width;
        border-style: $u-button-success-border-style;
    }

    &--primary {
        color: $u-button-primary-color;
        background-color: $u-button-primary-background-color;
        border-color: $u-button-primary-border-color;
        border-width: $u-button-primary-border-width;
        border-style: $u-button-primary-border-style;
    }

    &--error {
        color: $u-button-error-color;
        background-color: $u-button-error-background-color;
        border-color: $u-button-error-border-color;
        border-width: $u-button-error-border-width;
        border-style: $u-button-error-border-style;
    }

    &--warning {
        color: $u-button-warning-color;
        background-color: $u-button-warning-background-color;
        border-color: $u-button-warning-border-color;
        border-width: $u-button-warning-border-width;
        border-style: $u-button-warning-border-style;
    }

    &--block {
        @include flex;
        width: $u-button-block-width;
    }

    &--circle {
        
    }

    &--square {
       
    }

    &__icon {
        min-width: $u-button-icon-min-width;
        line-height: inherit !important;
        vertical-align: top;
    }

    &--plain {
        background-color: $u-button-plain-background-color;
    }

    &--hairline {
        border-width: $u-button-hairline-border-width !important;
    }
}
</style>
