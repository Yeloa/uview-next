<template>
    <view class="u-calendar-header u-border-bottom">
        <text class="u-calendar-header__title" v-if="showTitle">
            {{ title }}
        </text>
        <text class="u-calendar-header__subtitle" v-if="showSubtitle">
            {{ subtitle }}
        </text>
        <view class="u-calendar-header__weekdays">
            <text
                v-for="(item, index) in weekdaysList"
                :key="index"
                class="u-calendar-header__weekdays__weekday"
            >
                {{ item }}
            </text>
        </view>
    </view>
</template>

<script>
    import mixin from '../../libs/mixin/mixin';
    import mpMixin from '../../libs/mixin/mpMixin';
    export default {
        name: 'u-calendar-header',
        mixins: [mpMixin, mixin],
        props: {
            // 标题
            title: {
                type: String,
                default: '',
            },
            // 副标题
            subtitle: {
                type: String,
                default: '',
            },
            // 是否显示标题
            showTitle: {
                type: Boolean,
                default: true,
            },
            // 是否显示副标题
            showSubtitle: {
                type: Boolean,
                default: true,
            },
            // 星期几
            weekdays: {
                type: String,
                default: '',
            },
        },
        data() {
            return {};
        },
        computed: {
            weekdaysList() {
                return this.weekdays.split(',');
            },
        },
        methods: {
            name() {},
        },
    };
</script>

<style lang="scss" scoped>
    @import '../../libs/css/components.scss';

    .u-calendar-header {
        padding-bottom: 4px;

        &__title {
            font-size: 16px;
            color: $u-main-color;
            text-align: center;
            height: 42px;
            line-height: 42px;
            font-weight: bold;
        }

        &__subtitle {
            font-size: 14px;
            color: $u-main-color;
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-weight: bold;
        }

        &__weekdays {
            @include flex;
            justify-content: space-between;

            &__weekday {
                font-size: 13px;
                color: $u-main-color;
                line-height: 30px;
                flex: 1;
                text-align: center;
            }
        }
    }
</style>
