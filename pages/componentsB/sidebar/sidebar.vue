<template>
    <view class="u-page">
        <view class="u-demo-column">
            <view class="u-demo-block">
                <text class="u-demo-block__title">基础用法</text>
                <view class="u-demo-block__content">
                    <u-sidebar
                        v-model="active1"
                        borderLeftWidth="10px"
                        @change="onChange"
                    >
                        <u-sidebar-item label="标签名称1" />
                        <u-sidebar-item label="标签名称2" />
                        <u-sidebar-item label="标签名称3" />
                    </u-sidebar>
                </view>
            </view>

            <view class="u-demo-block">
                <text class="u-demo-block__title">徽标提示</text>
                <view class="u-demo-block__content">
                    <u-sidebar v-model="active2" @change="onChange">
                        <u-sidebar-item label="标签名称" dot />
                        <u-sidebar-item label="标签名称" badge="5" />
                        <u-sidebar-item label="标签名称" />
                    </u-sidebar>
                </view>
            </view>
        </view>
        <view class="u-demo-column">
            <view class="u-demo-block">
                <text class="u-demo-block__title">禁用选项</text>
                <view class="u-demo-block__content">
                    <u-sidebar v-model="active3" @change="onChange">
                        <u-sidebar-item label="标签名称" />
                        <u-sidebar-item label="标签名称" disabled />
                        <u-sidebar-item label="标签名称" />
                    </u-sidebar>
                </view>
            </view>

            <view class="u-demo-block">
                <text class="u-demo-block__title">自定义样式</text>
                <view class="u-demo-block__content">
                    <u-sidebar
                        v-model="active4"
                        @change="onChange"
                        lineColor="#ff6b6b"
                        activeColor="#ff6b6b"
                    >
                        <u-sidebar-item label="自定义样式1" />
                        <u-sidebar-item label="自定义样式2" />
                        <u-sidebar-item label="自定义样式3" />
                    </u-sidebar>
                </view>
            </view>
        </view>

        <view  style="margin-top: 20px;">
            <u-button type="primary" @click="gotoAnchor">锚点用法</u-button>
        </view>
        <view  style="margin-top: 20px;">
            <u-button type="primary" @click="gotoSwitch">切换页面用法</u-button>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                active1: 0,
                active2: 0,
                active3: 0,
                active4: 0,
                active5: 0,
                sidebarList: [
                    { title: '数据项1', dot: true },
                    { title: '数据项2', badge: '99+' },
                    { title: '数据项3' },
                    { title: '数据项4', disabled: true },
                ],
            };
        },
        methods: {
            gotoAnchor() {
                uni.navigateTo({
                    url: '/pages/componentsB/sidebar/anchor'
                });
            },
            gotoSwitch() {
                uni.navigateTo({
                    url: '/pages/componentsB/sidebar/switch'
                });
            },
            onChange(data) {
                // 处理新的数据结构，支持 index、label、value
                if (data && typeof data === 'object') {
                    const { index, label, value } = data;
                    uni.showToast({
                        title: `选中了第${index + 1}项，标签：${label}，值：${value}`,
                        icon: 'none',
                    });
                } else {
                    // 兼容旧的数据结构
                    uni.showToast({
                        title: `选中了第${data + 1}项`,
                        icon: 'none',
                    });
                }
            },
        },
    };
</script>

<style lang="scss" scoped>
    .u-page {
        background-color: #f5f5f5;
    }

    .u-demo-column{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 10px;
    }
    .u-demo-block {
      
        flex: 1;
    }
    .u-demo-block__content {
        background-color: #fff;
    }
</style>
