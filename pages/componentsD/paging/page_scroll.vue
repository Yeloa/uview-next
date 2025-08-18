<template>
    <view class="">
        <u-paging
            bgColor="#f5f5f5"
            ref="paging"
            usePageScroll
            v-model="dataList"
            @query="queryList"
        >
            <template #top>
                <view style="padding: 5px 0;background-color: #f5f5f5;">
                    <u-tabs :list="list1" :scrollable="false"></u-tabs>
                </view>
            </template>
            <view class="list-item" v-for="(item, index) in dataList" :key="index">
                <text class="item-title">{{ item.title }}</text>
                <text class="item-content">{{ item.content }}</text>
            </view>
        </u-paging>
    </view>
</template>

<script>
    export default {
        name: 'PagingExample',
        data() {
            return {
                dataList: [],
                list1: [
                    {
                        name: '关注',
                    },
                    {
                        name: '推荐',
                    },
                    {
                        name: '电影',
                    },
                    {
                        name: '科技',
                    }
                ],
            };
        },
        onLoad() {
        },
        onReachBottom(e) {
            this.$refs.paging.pageReachBottom()
        },
        methods: {
            reload() {
                this.$refs.paging.reload()
            },
            // 请求数据，调用this.$refs.paging.complete()方法后，会把结果传递给dataList变量
            queryList(pageNo, pageSize) {
                // 此处请求仅为演示，请替换为自己项目中的请求
                this.mockApiRequest(pageNo, pageSize)
                    .then((res) => {
                        console.log('queryList', res)
                        // 将请求结果通过complete传给u-paging处理，同时也代表请求结束，这一行必须调用
                        this.$refs.paging.complete(
                            res.data.list,
                            res.data.hasMore,
                        );
                    })
                    .catch((res) => {
                        // 如果请求失败写this.$refs.paging.complete(false)，会自动展示错误页面
                        this.$refs.paging.complete(false);
                    });
            },

            // 模拟API请求
            mockApiRequest(pageNo, pageSize) {
                return new Promise((resolve) => {
                    setTimeout(
                        () => {
                            const startIndex = (pageNo - 1) * pageSize;
                            const data = [];

                            for (let i = 0; i < 10; i++) {
                                data.push({
                                    id: startIndex + i + 1,
                                    title: `列表项 ${startIndex + i + 1}`,
                                    content: `这是第 ${
                                        startIndex + i + 1
                                    } 个列表项的内容，展示了如何使用u-paging组件的下拉刷新和上拉加载更多功能。`,
                                });
                            }

                            resolve({
                                data: {
                                    list: data,
                                    hasMore: pageNo < 5, // 模拟只有5页数据
                                },
                            });
                        },
                        pageNo == 1 ? 1000 : 1000,
                    );
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .list-item {
        background-color: #fff;
        margin: 20rpx;
        padding: 30rpx;
        border-radius: 10rpx;
        box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);

        .item-title {
            display: block;
            font-size: 32rpx;
            font-weight: bold;
            color: #333;
            margin-bottom: 10rpx;
        }

        .item-content {
            display: block;
            font-size: 28rpx;
            color: #666;
            line-height: 1.5;
        }
    }
</style>
