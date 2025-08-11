<template>
    <view class="u-page">
        <view class="u-demo-block">
            <view class="u-demo-block__content">
                <view class="wraper">
                    <u-sidebar v-model="active" @change="handleChange">
                        <u-sidebar-item 
                            v-for="(item, index) in categories" 
                            :key="index" 
                            :value="index" 
                            :label="item.label" 
                        />
                    </u-sidebar>
                    <scroll-view 
                        class="content" 
                        scroll-y 
                        scroll-with-animation 
                        :scroll-top="scrollTop" 
                        :throttle="false" 
                        @scroll="onScroll"
                    >
                        <view 
                            v-for="(item, index) in categories" 
                            :key="index" 
                            class="category"
                        >
                            <view class="category-title">{{ item.title }}</view>
                            <view class="category-content">
                                <view 
                                    v-for="(cell, cellIndex) in item.items" 
                                    :key="cellIndex" 
                                    class="category-item"
                                >
                                    <text class="item-title">{{ cell.title }}</text>
                                    <text class="item-label">{{ cell.label }}</text>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                scrollTop: 0,
                itemScrollTop: [],
                // 模拟数据
                subCategories: new Array(24).fill({ 
                    title: '标题文字', 
                    label: '这是描述这是描述' 
                }, 0, 24),
                categories: [
                    {
                        label: '分类一',
                        title: '标题一',
                        items: []
                    },
                    {
                        label: '分类二',
                        title: '标题二',
                        items: []
                    },
                    {
                        label: '分类三',
                        title: '标题三',
                        items: []
                    },
                    {
                        label: '分类四',
                        title: '标题四',
                        items: []
                    },
                    {
                        label: '分类五',
                        title: '标题五',
                        items: []
                    },
                    {
                        label: '分类六',
                        title: '标题六',
                        items: []
                    },
                    {
                        label: '分类七',
                        title: '标题七',
                        items: []
                    }
                ]
            };
        },
        mounted() {
            // 初始化数据
            this.initData();
            // 获取元素位置信息
            this.$nextTick(() => {
                this.getRectInfo();
            });
        },
        methods: {
            initData() {
                // 为每个分类生成随机数量的项目
                this.categories.forEach((category, index) => {
                    const count = Math.floor(Math.random() * 20) + 10; // 10-30个项目
                    category.items = this.subCategories.slice(0, count);
                });
            },
            getRectInfo() {
                // 获取每个分类的位置信息
                const query = uni.createSelectorQuery().in(this);
                query.selectAll('.category').boundingClientRect((rects) => {
                    if (rects && rects.length > 0) {
                        this.itemScrollTop = rects.map((item) => item.top || 0);
                        // 设置初始滚动位置
                        if (this.itemScrollTop[this.active]) {
                            this.scrollTop = this.itemScrollTop[this.active];
                        }
                    }
                }).exec();
            },
            handleChange({ index, label, value }) {
                this.active = index;
                // 滚动到对应位置
                if (this.itemScrollTop[index] !== undefined) {
                    this.scrollTop = this.itemScrollTop[index];
                }
                
                uni.showToast({
                    title: `切换到：${label}`,
                    icon: 'none',
                });
            },
            onScroll(e) {
                const { scrollTop } = e.detail;
                const threshold = 50; // 下一个标题与顶部的距离
                
                if (scrollTop < threshold) {
                    this.active = 0;
                    return;
                }
                
                // 根据滚动位置确定当前激活的分类
                const index = this.itemScrollTop.findIndex((top) => 
                    top > scrollTop && top - scrollTop <= threshold
                );
                
                if (index > -1 && this.active !== index) {
                    this.active = index;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .u-page {
        padding: 0;
        background-color: #f5f5f5;
    }

    .u-demo-block__content {
        background-color: #fff;
        height: 600px;
    }

    .wraper {
        display: flex;
        flex-direction: row;
        height: 100%;
    }

    .content {
        flex: 1;
        background: #fff;
        height: 100%;
    }

    .category {
        padding: 20px;
        border-bottom: 1px solid #f0f0f0;
        
        &:last-child {
            border-bottom: none;
        }
    }

    .category-title {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin-bottom: 15px;
        padding: 10px 0;
        border-bottom: 2px solid #e0e0e0;
    }

    .category-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .category-item {
        display: flex;
        align-items: center;
        padding: 12px;
    }

    .item-title {
        font-size: 14px;
        color: #495057;
        margin-right: 10px;
        min-width: 80px;
    }

    .item-label {
        font-size: 12px;
        color: #6c757d;
        flex: 1;
    }
</style>
