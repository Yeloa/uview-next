<template>
    <view class="u-page">
        <card title="基础使用">
            <u-row customStyle="margin-bottom: 10px">
                <u-col span="6">
                    <view class="demo-layout bg-purple-light"></view>
                </u-col>
                <u-col span="6">
                    <view class="demo-layout bg-purple"></view>
                </u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10px">
                <u-col span="4">
                    <view class="demo-layout bg-purple"></view>
                </u-col>
                <u-col span="4">
                    <view class="demo-layout bg-purple-light"></view>
                </u-col>
                <u-col span="4">
                    <view class="demo-layout bg-purple-dark"></view>
                </u-col>
            </u-row>
            <u-row justify="space-between">
                <u-col span="3">
                    <view class="demo-layout bg-purple"></view>
                </u-col>
                <u-col span="3">
                    <view class="demo-layout bg-purple-light"></view>
                </u-col>
                <u-col span="3">
                    <view class="demo-layout bg-purple"></view>
                </u-col>
                <u-col span="3">
                    <view class="demo-layout bg-purple-light"></view>
                </u-col>
            </u-row>
        </card>

        <card title="分栏间隔">
            <u-row justify="space-between" gutter="10">
                <u-col span="3">
                    <view class="demo-layout bg-purple"></view>
                </u-col>
                <u-col span="3">
                    <view class="demo-layout bg-purple-light"></view>
                </u-col>
                <u-col span="3">
                    <view class="demo-layout bg-purple"></view>
                </u-col>
                <u-col span="3">
                    <view class="demo-layout bg-purple-light"></view>
                </u-col>
            </u-row>
        </card>

        <card title="混合布局">
            <u-row justify="space-between" gutter="10">
                <u-col span="2">
                    <view class="demo-layout bg-purple-light"></view>
                </u-col>
                <u-col span="4">
                    <view class="demo-layout bg-purple"></view>
                </u-col>
                <u-col span="6">
                    <view class="demo-layout bg-purple-dark"></view>
                </u-col>
            </u-row>
        </card>

        <card title="分栏偏移">
            <u-row justify="space-between" customStyle="margin-bottom: 10px">
                <u-col span="3" offset="3">
                    <view class="demo-layout bg-purple-light"></view>
                </u-col>
                <u-col span="3" offset="3">
                    <view class="demo-layout bg-purple"></view>
                </u-col>
            </u-row>
            <u-row>
                <u-col span="3">
                    <view class="demo-layout bg-purple-light"></view>
                </u-col>
                <u-col span="3" offset="3">
                    <view class="demo-layout bg-purple"></view>
                </u-col>
            </u-row>
        </card>

        <card title="对齐方式">
            <u-row justify="space-between" customStyle="margin-bottom: 10px">
                <u-col span="3">
                    <view class="demo-layout bg-purple-light"></view>
                </u-col>
                <u-col span="3">
                    <view class="demo-layout bg-purple"></view>
                </u-col>
            </u-row>
            <u-row>
                <u-col span="3">
                    <view class="demo-layout bg-purple-light"></view>
                </u-col>
                <u-col span="3">
                    <view class="demo-layout bg-purple"></view>
                </u-col>
            </u-row>
        </card>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
};
</script>

<style lang="scss">
.wrap {
    padding: 12px;
}

.demo-layout {
    height: 25px;
    border-radius: 4px;
}

.bg-purple {
    background: #ced7e1;
}

.bg-purple-light {
    background: #e5e9f2;
}

.bg-purple-dark {
    background: #99a9bf;
}
</style>
