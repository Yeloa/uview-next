<template>
    <view class="u-cropper">
        <view class="u-cropper__container" 
            @touchstart.prevent="handleTouchStart"
            @touchmove.prevent="handleTouchMove"
            @touchend.prevent="handleTouchEnd">
            <!-- 遮罩层和裁剪框 -->
            <view class="u-cropper__mask">
                <!-- 裁剪框边框 -->
                <view class="u-cropper__cropbox" :class="[showGrid && 'u-cropper__cropbox_grid', `u-cropper__cropbox_${shape}`]" :style="cropBoxStyle">
                    <view v-if="shape === 'square'" class="u-cropper__edge u-cropper__edge--1"></view>
                    <view v-if="shape === 'square'" class="u-cropper__edge u-cropper__edge--2"></view>
                    <view v-if="shape === 'square'" class="u-cropper__edge u-cropper__edge--3"></view>
                    <view v-if="shape === 'square'" class="u-cropper__edge u-cropper__edge--4"></view>
                </view>
            </view>
            
            <!-- 图片层 -->
            <image 
                v-if="viewData.imageLoaded && viewData.imageSrc"
                class="u-cropper__image"
                :src="viewData.imageSrc"
                :style="imageStyle"
                mode="aspectFit"
                @error="onImageError"
            />
            
        </view>
        
        <!-- 工具栏 -->
        <view class="u-cropper__tools">
            <view class="u-cropper__button__cancel" @click="close">
                <text>取消</text>
            </view>
            <view class="cropper__button__choose" @click="chooseImage">
                <u-icon name="photo" size="36" color="#fff"/>
            </view>
            <view class="cropper__button__rotate" @click="rotateImage">
                <u-icon name="rotate" size="36" color="#fff"/>
            </view>
            <view class="u-cropper__button__confirm" @click="confirmCrop(false)">
                <text>确定</text>
            </view>
        </view>
        <!-- Canvas层 -->
        <canvas
            <!-- #ifdef MP-WEIXIN -->
            type="2d"
            <!-- #endif -->
            canvas-id="cropper"
            id="cropper"
            class="u-cropper__canvas" :style="canvasStyle"></canvas>
    </view>
</template>

<script>
import props from './props.js';
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin';
import ImageCropper from './cropper.js';

/**
 * Cropper 图片裁剪组件
 * @description 封装的图片裁剪组件，支持图片选择、裁剪、旋转等功能，适用于头像上传、图片编辑等场景
 * @tutorial https://uveiw.bdxmz.cn/components/cropper.html
 * 
 * @property {Boolean}			autoChoose		每次显示时是否自动打开选择图片（默认 false ）
 * @property {String | Number}	rectWidth		裁剪框宽度，单位px（默认 200 ）
 * @property {String | Number}	rectHeight		裁剪框高度，单位px（默认 200 ）
 * @property {String | Number}	width			输出图片宽度，单位px（默认 200 ）
 * @property {String | Number}	height			输出图片高度，单位px（默认 200 ）
 * @property {String}			fileType		输出图片格式，支持jpg/png，建议使用jpg减小文件大小（默认 'jpg' ）
 * @property {Boolean}			showGrid		是否显示网格线（默认 true ）
 * @property {String}			shape					输入框形状，circle-圆形，square-方形 （ 默认 'square' ）
 * @event {Function}	change		选择图片时触发，返回原始图片路径
 * @event {Function}	open		打开裁剪弹窗时触发
 * @event {Function}	close		关闭裁剪弹窗时触发
 * @event {Function}	confirm		确认裁剪时触发，返回裁剪后的图片临时路径
 * @example <u-cropper @confirm="onCropperConfirm"></u-cropper>
 */
export default {
    name: "u-cropper",
	mixins: [mpMixin, mixin, props],
    data() {
        return {
            cropper: null,
            canvasId: uni.$u.guid(),
            viewData: {
                imageLoaded: false,
                imageSrc: '',
                imageData: {},
                canvasWidth: 0,
                canvasHeight: 0,
                rectWidth: 0,
                rectHeight: 0
            }
        };
    },
    computed: {
        
        // 图片样式 - 从原始数据计算
        imageStyle() {
            const imageData = this.viewData.imageData;
            if (!this.viewData.imageLoaded || !imageData || !imageData.width) return {};
            
            let duration = '0s';
            let transform = `translate3d(${imageData.x}px, ${imageData.y}px,0)`;
            if (imageData.angle && imageData.angle !== 0) {
                duration = '0.3s';
                transform += ` rotate(${imageData.angle}deg)`;
            }

            return {
                width: uni.$u.addUnit(imageData.width),
                height: uni.$u.addUnit(imageData.height),
                transform: transform,
                transitionDuration: duration
            };
        },
        
        // 裁剪框样式 - 从原始数据计算
        cropBoxStyle() {
            if (!this.viewData.canvasWidth) return {};
            
            const rectX = (this.viewData.canvasWidth - this.viewData.rectWidth) / 2;
            const rectY = (this.viewData.canvasHeight - this.viewData.rectHeight) / 2;
       
            return {
                boxShadow: '0 0 0 '+ this.viewData.canvasWidth +'px rgba(0, 0, 0, 0.5)',
                left: uni.$u.addUnit(rectX),
                top: uni.$u.addUnit(rectY),
                width: uni.$u.addUnit(this.viewData.rectWidth),
                height: uni.$u.addUnit(this.viewData.rectHeight)
            };
        },

        canvasStyle() {
            return {
                width: uni.$u.addUnit(this.width),
                height: uni.$u.addUnit(this.height)
            }
        }
    },
    mounted() {
        this.$nextTick(async ()=>{
            await uni.$u.sleep(30)
            this.initCropper();
        })
    },
    watch: {
      
    },
    // #ifdef VUE3
    emits: ['change', 'open', 'close','confirm'],
    // #endif
    methods: {
        // 初始化裁剪器
        async initCropper() {

            const options = {
                canvasId: 'cropper',
                width: uni.$u.getPx(this.width),
                height: uni.$u.getPx(this.height),
                rectWidth: uni.$u.getPx(this.rectWidth),
                rectHeight: uni.$u.getPx(this.rectHeight),
                fileType: 'jpg',
                quality: 0.8,
                onUpdate: (viewData) => {
                    this.viewData = viewData;
                }
            };

            // #ifdef MP-WEIXIN
            options.type = '2d';
            // #endif

            this.cropper = new ImageCropper(this, options);

            this.$emit('open');
            if(this.autoChoose) {
                this.chooseImage();
            }
        },
        
        // 加载图片
        loadImage(src) {
            if (!this.cropper) return;
            this.cropper.setImage(src).catch(err => {
                console.error('图片加载失败:', err);
                uni.showToast({
                    title: '图片加载失败',
                    icon: 'none'
                });
            });
        },
        
        // 选择图片
        chooseImage() {
            uni.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: (res) => {
                    const imagePath = res.tempFilePaths[0];
                    this.$emit('change', imagePath);
                    this.loadImage(imagePath);
                },
                fail: () => {
                    uni.showToast({
                        title: '选择图片失败',
                        icon: 'none'
                    });
                }
            });
        },
        
        // 图片加载失败
        onImageError(e) {
            console.error('图片加载失败', e);
            uni.showToast({
                title: '图片加载失败',
                icon: 'none'
            });
        },
        
        // 旋转图片
        rotateImage() {
            if (this.cropper) {
                this.cropper.rotate(90);
            }
        },
        
        // 重置图片
        resetImage() {
            if (this.cropper) {
                this.cropper.reset();
            }
        },
        
        // 确认裁剪
        async confirmCrop() {
            if (!this.cropper || !this.viewData.imageLoaded) {
                uni.showToast({
                    title: '请先选择图片',
                    icon: 'none'
                });
                return;
            }
            
            uni.showLoading({
                title: '裁剪中...',
                mask: true
            });

            this.cropper.getCropperImage().then((res)=>{
                this.$emit('confirm',res);
                this.close();
            }).catch(err => {
                console.error('裁剪失败:', err);
                uni.showToast({
                    title: '裁剪失败',
                    icon: 'none'
                });
            }).finally(()=>{
                uni.hideLoading();
            });
        },
        
        // 关闭裁剪器
        close() {
            if (this.cropper) {
                this.cropper.destroy();
                this.cropper = null;
            }
            this.viewData = {};
            this.$emit('close');
        },
        
        // 处理触摸开始 - 兼容各平台
        handleTouchStart(e) {
            if (!this.cropper) return;
            
            // 阻止默认行为和事件冒泡
            e.preventDefault && e.preventDefault();
            e.stopPropagation && e.stopPropagation();
            
            // 兼容不同平台的触摸事件
            let touch;
            // #ifdef H5
            touch = e.touches ? e.touches[0] : e;
            // #endif
            // #ifndef H5
            touch = e.touches && e.touches[0] ? e.touches[0] : e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] : e;
            // #endif
            
            const event = {
                touches: [{
                    clientX: touch.clientX || touch.x || touch.pageX,
                    clientY: touch.clientY || touch.y || touch.pageY
                }]
            };
            
            this.cropper.touchStart(event);
        },
        
        // 处理触摸移动 - 兼容各平台
        handleTouchMove(e) {
            if (!this.cropper) return;
            
            // 阻止默认行为和事件冒泡
            e.preventDefault && e.preventDefault();
            e.stopPropagation && e.stopPropagation();
            
            // 兼容不同平台的触摸事件
            let touch;
            // #ifdef H5
            touch = e.touches ? e.touches[0] : e;
            // #endif
            // #ifndef H5
            touch = e.touches && e.touches[0] ? e.touches[0] : e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] : e;
            // #endif
            
            const event = {
                touches: [{
                    clientX: touch.clientX || touch.x || touch.pageX,
                    clientY: touch.clientY || touch.y || touch.pageY
                }],
                preventDefault: () => {}
            };
            
            this.cropper.touchMove(event);
        },
        
        // 处理触摸结束 - 兼容各平台
        handleTouchEnd(e) {
            if (!this.cropper) return;
            
            // 阻止默认行为和事件冒泡
            e.preventDefault && e.preventDefault();
            e.stopPropagation && e.stopPropagation();
            
            this.cropper.touchEnd(e);
        }
    },
    
     // #ifdef VUE2
    beforeDestroy() {
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = null;
        }
    }
    // #endif
    
    // #ifdef VUE3
    beforeUnmount() {
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = null;
        }
    }
    // #endif
};
</script>

<style scoped lang="scss">
.u-cropper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: #000;
   

    &__mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
    }
    
    &__cropbox {
        position: absolute;
        background: transparent;
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, .5);

        &_grid {
            &::before{
                content: '';
                position: absolute;
                top: 33.3333%;
                height: 33.3333%;
                left: 0;
                width: 100%;
                border: 1px dashed rgba(255, 255, 255, .5);
            }

            &::after{
                content: '';
                position: absolute;
                top: 0;
                left: 33.3333%;
                width: 33.3333%;
                height: 100%;
                border: 1px dashed rgba(255, 255, 255, .5);
            }
        }

        &_circle{
            border-radius: 100%;
            overflow: hidden;
        }

        &_square{

        }
    }
    
    &__edge {
        position: absolute;
        border:3px solid #ffffff;
        width: 15px;
        height: 15px;
        &--1 {
            top: -3px;
            left: -3px;
            border-right: 0;
            border-bottom: 0;
        }
        
        &--2 {
            top: -3px;
            right: -3px;
            border-left: 0;
            border-bottom: 0;
        }
        
        &--3 {
            bottom: -3px;
            left: -3px;
            border-right: 0;
            border-top: 0;
        }
        
        &--4 {
            bottom: -3px;
            right: -3px;
            border-left: 0;
            border-top: 0;
        }
    }
    
    &__image {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        display: block;
        transform-origin: center center;
    }
    
    // &__grid {
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     right: 0;
    //     bottom: 0;
        
    //     &-line {
    //         position: absolute;
    //         background: rgba(255, 255, 255, 0.3);
            
    //         &--v {
    //             top: 0;
    //             bottom: 0;
    //             width: 1px;
                
    //             &1 {
    //                 left: 33.33%;
    //             }
                
    //             &2 {
    //                 left: 66.67%;
    //             }
    //         }
            
    //         &--h {
    //             left: 0;
    //             right: 0;
    //             height: 1px;
                
    //             &1 {
    //                 top: 33.33%;
    //             }
                
    //             &2 {
    //                 top: 66.67%;
    //             }
    //         }
    //     }
    // }
    
    &__tools {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        padding: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    &__button{

        &__cancel{
            color:#fff;
            font-weight: 700;
            width: 70px;
            height:  40px;
            line-height: 40px;
            text-align: center;
        }
            
        &__confirm {
            color:#fff;
            font-weight: 700;
            width: 70px;
            height:  40px;
            line-height: 40px;
            background-color:  $u-primary;
            border-radius: 4px;
            text-align: center;
            
        }
    }

    
    &__canvas {
        position: absolute;
        left: -9999px;
        top: -9999px;
        opacity: 0;
    }
}
</style>