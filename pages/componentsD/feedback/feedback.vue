<template>
    <view class="u-page">
        <card title="全局Toast">
            <view class="item">
                <u-button type="primary" @click="showToast">默认样式</u-button>
                <u-button type="primary" @click="showToastSuccess">成功样式</u-button>
                <u-button type="primary" @click="showToastError">错误样式</u-button>
            </view>
        </card>

        <card title="全局Loading">
            <view class="item">
                <u-button type="primary" @click="showLoading">显示loading</u-button>
                <u-button type="primary" @click="hideLoading">关闭loading</u-button>
            </view>
        </card>

        <card title="全局Modal">
            <view class="item">
                <u-button type="primary" @click="showModal">打开弹窗</u-button>
                <u-button type="primary" @click="showModal2">按钮样式</u-button>
            </view>
        </card>

        <card title="全局ActionSheet">
            <view class="item">
                <u-button type="primary" @click="showActionSheet">打开ActionSheet</u-button>
            </view>
        </card>
    </view>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            showToast() {
                uni.$u.showToast({
                    title: '灰色的天，你的脸，爱过也哭过笑过痛过之后只剩再见，我的眼泪，湿了脸，失去第一次爱的人竟然是这种感觉',
                    duration: 5000
                });
            },
            showToastSuccess() {
                uni.$u.showToast({
                    title: '全局提示',
                    type: 'success'
                });
            },
            showToastError() {
                uni.$u.showToast({
                    title: '全局提示',
                    type: 'error'
                });
            },
            showModal() {
                uni.$u.showModal({
                    title: '全局弹窗',
                    content: '全局弹窗内容',
                    success: (res) => {
                        console.log(res);
                    }
                });
            },
            showModal2() {
                uni.$u.showModal({
                    title: '全局弹窗',
                    content: '全局弹窗内容',
                    showCancelButton: true,
                    buttonModel: "button",
                    success: (res) => {
                        console.log(res);
                    }
                });
            },
            showLoading() {
                uni.$u.showLoading({
                    mask: false
                });
            },
            hideLoading() {
                uni.$u.hideLoading();
            },
            showActionSheet() {
                uni.$u.showActionSheet({
                    title: '请选择颜色',
                    cancelText: '取消',
                    actions: [{
                        name: '红色',
                        value: '#ff0000'
                    }, {
                        name: '绿色',
                        value: '#00ff00'
                    }, {
                        name: '蓝色',
                        value: '#0000ff'
                    }],
                    success: (res) => {
                        console.log(res);
                    },
                    cancel: () => {
                        console.log('取消');
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
.item {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
}
</style>
