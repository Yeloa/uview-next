<template>
    <view class="u-page">
        <card title="基本使用">
            <u-slider v-model="value1" @change="onChange"></u-slider>
        </card>
        <card title="自定义范围(0—50)">
            <u-slider v-model="value2" :min="0" :max="50" @change="onChange"></u-slider>
        </card>
        <card title="指定步长(每次步进5)">
            <u-slider v-model="value3" :step="5" @change="onChange"></u-slider>
        </card>
        <card title="双滑块模式">
            <u-slider v-model="rangeValue" :range="true" @change="onChange"></u-slider>
        </card>
        <card title="禁止交叉的双滑块">
            <u-slider v-model="rangeValue2" :range="true" :noCross="true" @change="onChange"></u-slider>
        </card>
        <card title="显示数值">
            <u-slider v-model="value5" :showValue="true" @change="onChange"></u-slider>
        </card>
        <card title="自定义样式">
            <u-slider v-model="value6" railSize="20px" railRadius="100px" @change="onChange"></u-slider>
        </card>
        <card title="反向滑块">
            <u-slider v-model="value8" :reverse="true" @change="onChange"></u-slider>
        </card>
        <card title="禁用状态">
            <u-slider v-model="value9" :disabled="true"></u-slider>
        </card>
        <card title="垂直方向">
            <view class="vertical-slider">
                <u-slider v-model="value4" :vertical="true" @change="onChange"></u-slider>
                <u-slider v-model="rangeValue" :range="true" :vertical="true" @change="onChange"></u-slider>
            </view>
        </card>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                value1: 30,
                value2: 25,
                value3: 30,
                value4: 50,
                value5: 40,
                value6: 35,
                value7: 45,
                value8: 60,
                value9: 70,
                rangeValue: [20, 80],
                rangeValue2: [30, 70],
            };
        },
        watch: {
            value1(n) {
                console.log('value1 changed:', n);
            },
        },
        methods: {
            onChange(value) {
                console.log('slider changed:', value);
            },
        },
    };
</script>

<style lang="scss">

    .vertical-slider {
        height: 300px;
        display: flex;
        flex-direction: row;
        gap: 50px;
    }
</style>
