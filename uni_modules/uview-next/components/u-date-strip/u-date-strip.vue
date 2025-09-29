<template>
    <view class="u-date-strip" :style="[containerStyle]">
        <!-- 周模式 - swiper切换 -->
        <template v-if="mode === 'week'">
            <swiper
                class="u-date-strip__swiper"
                :current="currentIndex"
                @change="onSwiperChange"
            >
                <swiper-item v-for="(week, index) in weekList" :key="index">
                    <view class="u-date-strip__wrapper">
                        <view
                            v-for="(item, idx) in week"
                            :key="idx"
                            class="u-date-strip__item"
                        >
                            <view class="u-date-strip__item-content" :style="[itemStyle('week',item)]" @click="selectDate(item)">
                                <view class="u-date-strip__weekday">
                                    {{ item.weekday }}
                                </view>
                                <view class="u-date-strip__date" :style="[itemStyle('date',item)]">
                                    <text class="u-date-strip__date-text">{{ item.date }}</text>
                                    <text v-if="showLunar && item.bottomInfo" class="u-date-strip__lunar" :style="[itemStyle('lunar',item)]">{{ item.bottomInfo }}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </swiper-item>
            </swiper>
        </template>

        <!-- 平铺模式 - scroll-view -->
        <template v-else>
            <scroll-view
                class="u-date-strip__scroll"
                scroll-x
                :scroll-into-view="scrollIntoView"
            >
                <view class="u-date-strip__scroll-wrapper">
                    <view
                        v-for="(item, index) in allDays"
                        :key="index"
                        :id="`item-${index}`"
                        class="u-date-strip__item"
                    >
                        <view class="u-date-strip__item-content" :style="[itemStyle('week',item)]" @click="selectDate(item)">
                            <text class="u-date-strip__weekday" :style="[itemStyle('weekday',item)]">
                                {{ item.weekday }}
                            </text>
                            <view class="u-date-strip__date" :style="[itemStyle('date',item)]">
                                <text class="u-date-strip__date-text">{{ item.date }}</text>
                                <text v-if="item.bottomInfo" class="u-date-strip__lunar" :style="[itemStyle('lunar',item)]">{{ item.bottomInfo }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </template>
    </view>
</template>

<script>
	import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';
	import dayjs from '../../libs/util/dayjs.js';
	import Calendar from '../../libs/util/calendar.js';

    /**
     * dateStrip 日期横条
     * @description 用于展示周日历或一组日历信息
     * @tutorial https://uviewui.com/components/dateStrip.html
     *
     * @property {Number} 		v-model/modelValue 	选中的日期时间戳
     * @property {Number} 		defaultDate 		默认选中的日期时间戳
     * @property {String} 		mode 			切换模式 week|none （默认 'week' ）
     * @property {String} 		activeMode 		高亮模式 both|date|text （默认 'both' ）
     * @property {Number} 		minDate 			可选择的最小日期时间戳
     * @property {Number} 		maxDate 			可选择的最大日期时间戳
     * @property {String} 		height 				组件高度 （默认 '86px' ）
     * @property {String} 		itemWidth 			每格日期宽度 （默认 '50px' ）
     * @property {String} 		itemRound 			每格日期圆角 （默认 '6px' ）
     * @property {String} 		activeBgColor 		选中框背景色
     * @property {String} 		activeColor 		选中框文本色
     * @property {String} 		bgColor 			横条背景色
     * @property {String} 		round 				选中框圆角
     * @property {Number} 		firstDayOfWeek 		第一天从星期几开始 0-6 （默认 0 ）
     * @property {Number} 		monthNum 			最多展示月份数量 （默认 3 ）
     * @property {Array|String} disabledDate 		禁止选择的日期
     * @property {Function} 	disabledFun 		禁止选择的日期函数
     * @property {String} 		disabledColor 		禁用日期的文字颜色
     * @property {Boolean} 		showLunar 			是否显示农历
     * @property {Boolean} 		padZero 			是否对小于10的数字补0
     * @property {Function} 	formatter 			日期格式化函数
     * @property {Object}		customStyle			定义需要用到的外部样式
     * @event {Function} change 点击日期时触发
     * @example <u-date-strip v-model="date" @change="onChange"></u-date-strip>
     */
    export default {
        name: 'u-date-strip',
        mixins: [mpMixin, mixin, props],
        data() {
            return {
                currentIndex: 0,
                weekList: [],
                allDays: [],
                scrollIntoView: '',
                weekdays: ['日', '一', '二', '三', '四', '五', '六'],
                innerSelected: null, // 内部选中的时间戳
                innerFormatter: (value) => value
            };
        },
        computed: {
            // 当前选中的值
            currentValue() {
                // #ifdef VUE2
                return this.value || this.defaultDate;
                // #endif
                // #ifdef VUE3
                return this.modelValue || this.defaultDate;
                // #endif
            },

            // 容器样式
            containerStyle() {
                const style = {};
                if (this.bgColor) {
                    style.backgroundColor = this.bgColor;
                }
                if (this.height) {
                   style.height = this.height;
                }

                if(this.round){
                    style.borderRadius = this.round;
                }
                
                return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
            },

            // 获取日期数字样式的计算属性
            itemStyle() {
                return (type, item) => {
                    let style = {};
                   
                    if(type == 'week'){
                        style.width = this.itemWidth;
                    }

                    // 禁用日期的样式
                    if (item.disabled) {
                        style.color = this.disabledColor;
                        style.pointerEvents = 'none';
                    }
                    
                    if (this.isSameDay(dayjs(this.innerSelected), dayjs(item.timestamp))) {
                        style.borderRadius = this.itemRound;

                        if(type == 'week'){
                            // 整个容器的高亮样式
                            if (this.activeMode == 'both') {
                                style.backgroundColor = this.activeBgColor;
                                style.color = this.activeColor;
                                style = uni.$u.deepMerge(style, uni.$u.addStyle(this.activeStyle))
                            }else if(this.activeMode == 'text'){
                                style.color = this.activeBgColor;
                            }
                        }

                        if(type == 'date'){
                            if (this.activeMode == 'date') {
                                //只高亮日期部分
                                style.backgroundColor = this.activeBgColor;
                                style.color = this.activeColor;
                                style = uni.$u.deepMerge(style, uni.$u.addStyle(this.activeStyle))
                            } else if (this.activeMode == 'both') {
                                // 只高亮文字颜色
                                style.color = this.activeColor;
                            }else if(this.activeMode == 'text'){
                                style.color = this.activeBgColor;
                            }
                        }

                        if(type == 'lunar'){
                            style.color = this.activeColor;
                        }
                    }
                 
                    return style;
                };
            },
        },
        watch: {
            currentValue: {
                immediate: true,
                handler(newVal) {
                    this.innerSelected = newVal;
                },
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.init();
            });
        },
        methods: {
            // 初始化
            init() {
                if (this.mode === 'week') {
                    this.initWeekMode();
                } else {
                    this.initScrollMode();
                }
            },

            // 获取日期范围
            getDateRange() {
                const monthNum = parseInt(this.monthNum);
                const minDate = this.minDate ? dayjs(this.minDate) : dayjs().subtract(monthNum, 'month');
                const maxDate = this.maxDate ? dayjs(this.maxDate) : dayjs().add(monthNum, 'month');
                return { minDate, maxDate };
            },

            // 初始化周模式
            initWeekMode() {
                this.weekList = [];
                const current = dayjs(this.currentValue);
               
                const currentWeekStart = this.getWeekStart(current);
                const { minDate, maxDate } = this.getDateRange();

                // 计算需要生成的周数
                const startWeek = this.getWeekStart(minDate);
                const endWeek = this.getWeekStart(maxDate);
                const totalWeeks = endWeek.diff(startWeek, 'week') + 1;
               
                // 生成指定范围内的周数据
                for (let i = 0; i < totalWeeks; i++) {
                    const weekStart = startWeek.add(i, 'week');
                    const week = this.generateWeek(weekStart);
                    
                    this.weekList.push(week);
                }

                // 设置当前周的索引
                const currentWeekIndex = currentWeekStart.diff(startWeek, 'week');
                this.currentIndex = Math.max(0, currentWeekIndex + 1);
            },

            // 初始化滚动模式
            initScrollMode() {
                this.allDays = [];
                const { minDate, maxDate } = this.getDateRange();

                let currentDate = minDate;
                let index = 0;
                let selectedIndex = -1;

                while (currentDate.isBefore(maxDate) || currentDate.isSame(maxDate, 'day')) {
                    const day = this.generateDay(currentDate);
                    this.allDays.push(day);

                    // 记录选中日期的索引
                    if (this.isSameDay(currentDate, dayjs(this.currentValue))) {
                        selectedIndex = index;
                    }

                    currentDate = currentDate.add(1, 'day');
                    index++;
                }

                // 滚动到选中的日期
                if (selectedIndex >= 0) {
                    this.$nextTick(() => {
                        this.scrollIntoView = `item-${selectedIndex}`;
                    });
                }
            },

            // 获取周的开始日期
            getWeekStart(date) {
                const day = date.day();
                const diff = (day - this.firstDayOfWeek + 7) % 7;
                return date.subtract(diff, 'day');
            },

            // 生成一周的数据
            generateWeek(weekStart) {
                const week = [];
                for (let i = 0; i < 7; i++) {
                    const date = weekStart.add(i, 'day');
                  
                    week.push(this.generateDay(date));
                }
                return week;
            },

            // 生成单天数据
            generateDay(date) {
                const day = {
                    date: this.padZero && date.date() < 10 ? `0${date.date()}` : date.date(),
                    weekday: this.weekdays[date.day()],
                    timestamp: date.valueOf(),
                    disabled: false,
                    bottomInfo: '',
                };
                
                // 计算农历
                if (this.showLunar) {
                 
                    const lunar = Calendar.solar2lunar(
                        date.year(),
                        date.month() + 1,
                        date.date(),
                    );
                    day.bottomInfo = lunar.IDayCn;
                }

                // 检查是否在可选范围内
                if (this.minDate && date.isBefore(this.minDate)) {
                    day.disabled = true;
                }
                if (this.maxDate && date.isAfter(this.maxDate)) {
                    day.disabled = true;
                }

                // 检查是否在禁用日期列表中
                if (this.disabledDate) {
                    if (uni.$u.test.string(this.disabledDate)) {
                        this.disabledDate = [
                            this.disabledDate,
                        ];
                    }
                   
                    this.disabledDate.forEach((item) => {
                        if (this.isSameDay(dayjs(item), date)) {
                            day.disabled = true;
                        }
                    });
                }

                if (this.disabledFun && uni.$u.test.func(this.disabledFun)) {
                    let result = this.disabledFun(day);
                    if (uni.$u.test.array(result)) {
                        day.disabled = result[0];
                        day.bottomInfo = result[1];
                    } else {
                        day.disabled = result;
                    }
                }

                // 应用格式化函数
                const formatter = this.formatter || this.innerFormatter;
                return formatter(day);
            },

            // 判断是否是同一天
            isSameDay(date1, date2) {
                return date1.isSame(date2, 'day');
            },

            // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
            setFormatter(e) {
                this.innerFormatter = e
            },

            // 选择日期
            selectDate(item) {
                if (item.disabled) return;

                this.innerSelected = item.timestamp;

                // #ifdef VUE2
                this.$emit('input', item.timestamp);
                // #endif

                // #ifdef VUE3
                this.$emit('update:modelValue', item.timestamp);
                // #endif
            
                this.$emit('change', {
                    weekday: item.weekday, 
                    date: item.date, 
                    timestamp: item.timestamp, 
                    lunar: item.lunar
                });
            },

            onSwiperChange(e) {
                this.currentIndex = e.detail.current;
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import '../../libs/css/components.scss';

    .u-date-strip {
        padding: 8px 0;
        &__swiper {
            width: 100%;
            height: 100%;
        }

        &__scroll {
            width: 100%;
            height: 100%;
            white-space: nowrap;
            &-wrapper {
                @include flex(row);
                align-items: center;
                height: 100%;
            }
        }

        &__wrapper {
            @include flex(row);
            align-items: center;
            box-sizing: border-box;
            height: 100%;
        }

        &__item {
            flex: 1;
            height: 100%;
            @include flex(column);
            align-items: center;
            justify-content: center;
            &-content{
                @include flex(column);
                align-items: center;
                flex-shrink: 0;
                box-sizing: border-box;
                padding: 5px 0;
                height: 100%;
            }
        }

        &__weekday {
            font-size: 14px;
            padding-bottom: 5px;
        }

        &__date {
            flex: 1;
            @include flex(column);
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: 100%;
            &-text{
                font-size: 16px;
                font-weight: bold;
                text-align: center;
            }
        }

        &__lunar {
            font-size: 12px;
            color: #909399;
            text-align: center;
            margin-bottom: 5px;
        }
    }
</style>
