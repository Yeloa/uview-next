<template>
    <view class="u-page">
        <card title="基础用法">
            <u-input-tag v-model="tags" placeholder="请输入后回车添加" />
        </card>

        <card title="标签在输入框内">
            <u-input-tag v-model="tags5" tagInside placeholder="请输入后回车添加" />
        </card>

        <card title="限制数量">
            <u-input-tag v-model="tags2" :max="3" :saveOnBlur="false" placeholder="最多3个可输入" />
        </card>

        <card title="限制数量">
            <u-input-tag v-model="tags2" :max="3" :saveOnBlur="false" placeholder="最多3个可输入" />
        </card>

        <card title="折叠展示">
            <u-input-tag v-model="tags3" collapse-tags :saveOnBlur="false" :max-collapse-tags="2" />
        </card>

        <card title="禁用">
            <u-input-tag v-model="tags4" disabled />
        </card>
    </view>
</template>

<script>
    export default {
        name: 'InputTagDemo',
        data() {
            return {
                tags: ['服饰鞋包','美妆护肤'],
                tags5: ['玄幻','武侠','都市','历史','科幻'],
                tags2: ['活期理财'],
                tags3: ['苹果','香蕉','葡萄','橘子'],
                tags4: ['只读']
            };
        },
        methods: {}
    };
</script>
