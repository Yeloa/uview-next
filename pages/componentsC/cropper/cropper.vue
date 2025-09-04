<template>
    <view class="u-page">
        <card title="基础用法">
            <u-button @click="showBasicCropper" type="primary">打开图片裁剪</u-button>
            <view v-if="basicResult" class="result-box">
                <text class="result-title">裁剪结果：</text>
                <image :src="basicResult" class="result-image" mode="widthFix"></image>
            </view>
        </card>
        
        <card title="自定义裁剪尺寸">
            <view class="demo-box">
                <u-button @tap="showCustomCropper" type="primary">方形裁剪 (300x100)</u-button>
                <view v-if="customResult" class="result-box">
                    <text class="result-title">裁剪结果：</text>
                    <image :src="customResult" class="result-image" mode="widthFix"></image>
                </view>
            </view>
        </card>
        
        <!-- 圆形剪裁框 -->
        <card title="圆形剪裁框">
            <u-button @tap="showCircleCropper" type="primary">圆形剪裁框</u-button>
            <view v-if="circleResult" class="result-box">
                <text class="result-title">裁剪结果：</text>
                <image :src="circleResult" class="result-image" mode="widthFix"></image>
            </view>
        </card>
      
        
        <u-cropper
            openType="chooseAvatar"
            v-if="showCropper"
            :shape="shape"
            :image="selectedImage" 
            :auto-choose="autoChoose"
            :width="width"
            :height="height"
            :rect-width="rectWidth"
            :rect-height="rectHeight"
            :file-type="fileType"
            :watermark="watermark"
            @change="onImageChange"
            @confirm="onCropConfirm"
            @close="onCropperClose"
            @error="onCropperError"
        ></u-cropper>
    </view>
</template>

<script>


export default {
    
    data() {
        return {
            shape:'square',
            showCropper: false,
            selectedImage: '',
            autoChoose: true,
            rectWidth: 300,
            rectHeight: 300,
            fileType: 'jpg',
            flag:0,
            basicResult: '',
            customResult: '',
            circleResult: '',
            watermark:{
                text:'测试水印',
                bold:true,
            }
        };
    },
    methods: {
        // 显示基础裁剪器
        showBasicCropper() {
            this.resetConfig();
            this.flag = 1;
            this.showCropper = true;
        },
        
        showCustomCropper() {
            this.resetConfig();
            this.flag = 2;
            this.rectWidth = 300;
            this.rectHeight = 100;
            this.width=300;
            this.height=100;
            this.showCropper = true;
        },
        
        // 显示矩形裁剪器
        showCircleCropper() {
            this.resetConfig();
            this.flag = 3;
            this.shape = 'circle';
            this.showCropper = true;
        },
        
        // 重置配置
        resetConfig() {
            this.shape = 'square';
            this.selectedImage = '';
            this.width=400;
            this.height=400;
            this.rectWidth = 300;
            this.rectHeight = 300;
        },
        
        // 图片选择回调
        onImageChange(imagePath) {
            console.log('选择的图片:', imagePath);
        },
        
        // 裁剪确认回调
        onCropConfirm(result) {
            switch(this.flag){
                case 1:
                    this.basicResult = result;
                    break;
                case 2:
                    this.customResult = result;
                    break;
                case 3:
                    this.circleResult = result;
                    break;
            }
        },
        
        // 裁剪器关闭回调
        onCropperClose() {
            this.showCropper = false;
        },
        onCropperError(error) {
            uni.showToast({
                title: error,
                icon: 'none'
            });
            this.showCropper = false;
        }
    }
};
</script>

<style scoped lang="scss">

.result-box {
    margin-top: 40rpx;
    padding: 32rpx;
    background-color: #f8f9fa;
    border-radius: 12rpx;
    border: 2rpx dashed #ddd;
}

.result-title {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
    display: block;
    margin-bottom: 20rpx;
}

.result-image{
    width: 100%;
    height: 100%;
}

</style> 