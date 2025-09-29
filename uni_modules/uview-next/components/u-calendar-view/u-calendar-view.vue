<template>
    <view class="u-calendar">
        <uHeader
            :title="title"
            :subtitle="subtitle"
            :showSubtitle="showSubtitle"
            :showTitle="showTitle"
            :weekdays="weekdays"
        ></uHeader>
        <scroll-view
            :style="{
                height: $u.addUnit(listHeight),
            }"
            enable-flex
            scroll-y
            @scroll="onScroll"
            :scroll-top="scrollTop"
            :scrollIntoView="scrollIntoView"
        >
            <uMonth
                ref="month"
                :shape="shape"
                :color="color"
                :rowHeight="rowHeight"
                :showMark="showMark"
                :months="months"
                :mode="mode"
                :maxCount="maxCount"
                :startText="startText"
                :endText="endText"
                :defaultDate="defaultDate"
                :minDate="innerMinDate"
                :maxDate="innerMaxDate"
                :maxMonth="monthNum"
                :readonly="readonly"
                :maxRange="maxRange"
                :rangePrompt="rangePrompt"
                :showRangePrompt="showRangePrompt"
                :allowSameDay="allowSameDay"
                @change="monthChange"
                @updateMonthTop="updateMonthTop"
            ></uMonth>
        </scroll-view>
    </view>
</template>

<script>
import props from './props.js';
import uHeader from './header.vue';
import uMonth from './month.vue';
import util from './util.js';
import dayjs from '../../libs/util/dayjs.js';
import Calendar from '../../libs/util/calendar.js';
import mixin from '../../libs/mixin/mixin';
import mpMixin from '../../libs/mixin/mpMixin';

    /**
 * Calendar 日历
 * @property {String}				title				标题内容 (默认 日期选择 )
 * @property {Boolean}				showTitle			是否显示标题  (默认 true )
 * @property {Boolean}				showSubtitle		是否显示副标题	(默认 true )
 * @property {String}				mode				日期类型选择  single-选择单个日期，multiple-可以选择多个日期，range-选择日期范围 （ 默认 'single' )
 * @property {String}				startText			mode=range时，第一个日期底部的提示文字  (默认 '开始' )
 * @property {String}				endText				mode=range时，最后一个日期底部的提示文字 (默认 '结束' )
 * @property {Array}				customList			自定义列表
 * @property {String}				color				主题色，对底部按钮和选中日期有效  (默认 ‘#3c9cff' )
 * @property {String | Number}		minDate				最小的可选日期	 (默认 0 )
 * @property {String | Number}		maxDate				最大可选日期  (默认 0 )
 * @property {Array | String| Date}	defaultDate			默认选中的日期，mode为multiple或range是必须为数组格式
 * @property {String | Number}		maxCount			mode=multiple时，最多可选多少个日期  (默认 	Number.MAX_SAFE_INTEGER  )
 * @property {String | Number}		rowHeight			日期行高 (默认 56 )
 * @property {Function}				formatter			日期格式化函数
 * @property {Boolean}				showLunar			是否显示农历  (默认 false )
 * @property {Boolean}				showMark			是否显示月份背景色 (默认 true )
 * @property {Boolean}				show				是否显示日历弹窗 (默认 false )
 * @property {Boolean}				closeOnClickOverlay	是否允许点击遮罩关闭日历 (默认 false )
 * @property {Boolean}				readonly	        是否为只读状态，只读状态下禁止选择日期 (默认 false )
 * @property {String | Number}		maxRange	        日期区间最多可选天数，默认无限制，mode = range时有效
 * @property {String}				rangePrompt	        范围选择超过最多可选天数时的提示文案，mode = range时有效
 * @property {Boolean}				showRangePrompt	    范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效 (默认 true )
 * @property {Boolean}				allowSameDay	    是否允许日期范围的起止时间为同一天，mode = range时有效 (默认 false )
 * @property {Number|String}	    monthNum			最多展示的月份数量  (默认 3 )
 *
 * @event {Function()} change 		选择日期时触发
 * @example <u-calendar  :defaultDate="defaultDateMultiple" :show="show" mode="multiple" @confirm="confirm">
	</u-calendar>
 * */
    export default {
        name: 'u-calendar-view',
        mixins: [mpMixin, mixin, props],
        components: {
            uHeader,
            uMonth,
        },
        data() {
            return {
                subtitle: '',
                // 需要显示的月份的数组
                months: [],
                // 在月份滚动区域中，当前视图中月份的index索引
                monthIndex: 0,
                // 月份滚动区域的高度
                listHeight: 0,
                scrollIntoView: '',
                scrollTop: 0,
                // 过滤处理方法
                innerFormatter: (value) => value,
            
            };
        },
        watch: {
            selectedChange: {
                immediate: true,
                handler(newVal, oldVal) {
                    this.setMonth();
                },
            },
            //修复vue2微信小程序报警告
            monthIndex: {
                immediate: true,
                handler(newVal, oldVal) {
                    // 只有当月份索引真正改变时才更新副标题
                    if (newVal !== oldVal && this.months[newVal]) {
                        this.subtitle = `${this.months[newVal].year}年${this.months[newVal].month}月`;
                    }
                }
            },
        },
        computed: {
            // 由于maxDate和minDate可以为字符串(2021-10-10)，或者数值(时间戳)，但是dayjs如果接受字符串形式的时间戳会有问题，这里进行处理
            innerMaxDate() {
                return uni.$u.test.number(this.maxDate)
                    ? Number(this.maxDate)
                    : this.maxDate;
            },
            innerMinDate() {
                return uni.$u.test.number(this.minDate)
                    ? Number(this.minDate)
                    : this.minDate;
            },
            // 多个条件的变化，会引起选中日期的变化，这里统一管理监听
            selectedChange() {
                return [this.innerMinDate, this.innerMaxDate, this.defaultDate];
            },
        },
        // #ifdef VUE3
        emits: ['change'],
        // #endif
        methods: {
            // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
            setFormatter(e) {
                this.innerFormatter = e;
            },
            // month组件内部选择日期后，通过事件通知给父组件
            monthChange(e) {
                this.$emit('change', e);
            },
            init() {
                this.start = Date.now();
                // 校验maxDate，不能小于minDate
                if (
                    this.innerMaxDate &&
                    this.innerMinDate &&
                    new Date(this.innerMaxDate).getTime() <
                        new Date(this.innerMinDate).getTime()
                ) {
                    return uni.$u.error('maxDate不能小于minDate');
                }
                // 滚动区域的高度
                this.listHeight = this.rowHeight * 5 + 35
                this.setMonth();
            },
            // 获得两个日期之间的月份数
            getMonths(minDate, maxDate) {
                const minYear = dayjs(minDate).year();
                const minMonth = dayjs(minDate).month() + 1;
                const maxYear = dayjs(maxDate).year();
                const maxMonth = dayjs(maxDate).month() + 1;
                return (maxYear - minYear) * 12 + (maxMonth - minMonth) + 1;
            },
            // 设置月份数据
            setMonth() {
               
                // 最小日期的毫秒数
                const minDate = this.innerMinDate || dayjs().valueOf();
                // 如果没有指定最大日期，则往后推3个月
                const maxDate =
                    this.innerMaxDate ||
                    dayjs(minDate)
                        .add(this.monthNum - 1, 'month')
                        .valueOf();
                
                // 缓存日期格式化的结果
                const minDateStr = dayjs(minDate).format('YYYY-MM-DD');
                const maxDateStr = dayjs(maxDate).format('YYYY-MM-DD');
                
                // 最大最小月份之间的共有多少个月份，
                const months = uni.$u.range(
                    1,
                    this.monthNum,
                    this.getMonths(minDate, maxDate),
                );
                
                // 先清空数组
                let monthsArr = [];
                
                // 预处理禁用日期数组
                let disabledDates = [];
                if (this.disabledDate) {
                    if (uni.$u.test.string(this.disabledDate)) {
                        disabledDates = [this.disabledDate];
                    } else {
                        disabledDates = this.disabledDate;
                    }
                }
                
                for (let i = 0; i < months; i++) {
                    const currentMonth = dayjs(minDate).add(i, 'month');
                    const monthNum = currentMonth.month() + 1;
                    const year = currentMonth.year();
                    const daysInMonth = currentMonth.daysInMonth();
                    
                    monthsArr.push({
                        date: new Array(daysInMonth)
                            .fill(1)
                            .map((item, index) => {
                                // 日期，取值1-31
                                let day = index + 1;
                                // 星期，0-6，0为周日
                                const week = currentMonth.date(day).day();
                                const date = currentMonth.date(day).format('YYYY-MM-DD');
                                
                                let bottomInfo = '';
                                if (this.showLunar) {
                                    // 将日期转为农历格式
                                    const lunar = Calendar.solar2lunar(
                                        year,
                                        monthNum,
                                        day,
                                    );
                                    bottomInfo = lunar.IDayCn;
                                }

                                let dateObj = new Date(date);
                                let disabled = date < minDateStr || date > maxDateStr;

                                if (!disabled) {
                                    // 检查禁用日期
                                    if (disabledDates.length > 0) {
                                        disabled = disabledDates.some(item => 
                                            dayjs(item).format('YYYY-MM-DD') === date
                                        );
                                    }

                                    if (
                                        this.disabledFun &&
                                        uni.$u.test.func(this.disabledFun)
                                    ) {
                                        let result = this.disabledFun(dateObj);
                                        if (uni.$u.test.array(result)) {
                                            disabled = result[0];
                                            bottomInfo = result[1];
                                        } else {
                                            disabled = result;
                                        }
                                    }
                                }

                                let config = {
                                    day,
                                    week,
                                    // 小于最小允许的日期，或者大于最大的日期，则设置为disabled状态
                                    disabled,
                                    // 返回一个日期对象，供外部的formatter获取当前日期的年月日等信息，进行加工处理
                                    date: dateObj,
                                    bottomInfo,
                                    dot: false,
                                    month: monthNum,
                                };

                                const formatter =
                                    this.formatter || this.innerFormatter;
                                return formatter(config);
                            }),
                        // 当前所属的月份
                        month: monthNum,
                        // 当前年份
                        year: year,
                    });
                }

                this.months = monthsArr;

                if(this.$refs.month){
                    this.$refs.month.init();
                }
            },
            // 滚动到默认设置的月份
            scrollIntoDefaultMonth(selected) {
                // 查询默认日期在可选列表的下标
                const _index = this.months.findIndex(({ year, month }) => {
                    month = uni.$u.padZero(month);
                    return `${year}-${month}` === selected;
                });
                if (_index !== -1) {
                    this.$nextTick(() => {
                        // #ifndef MP-WEIXIN
                        this.scrollIntoView = `month-${_index}`;
                        // #endif
                        // #ifdef MP-WEIXIN
                        this.scrollTop = 0;
                        this.scrollTop = this.months[_index].top || 0;
                        // #endif
                    });
                }
            },
            // scroll-view滚动监听
            onScroll(event) {
                uni.$u.debounce(()=> {
                    // 不允许小于0的滚动值，如果scroll-view到顶了，继续下拉，会出现负数值
                    const scrollTop = Math.max(0, event.detail.scrollTop)
              
                    // 使用二分查找优化月份索引查找
                    let left = 0;
                    let right = this.months.length - 1;
                    let monthIndex = 0;
                  
                    while (left <= right) {
                        const mid = Math.floor((left + right) / 2);
                        const monthTop = this.months[mid].top - 20 || this.listHeight;
                        
                        if (scrollTop >= monthTop) {
                            monthIndex = mid;
                            left = mid + 1;
                        } else {
                            right = mid - 1;
                        }
                    }
                   
                    // 只有当月份索引真正改变时才更新
                    if (this.monthIndex !== monthIndex) {
                        this.monthIndex = monthIndex;
                    }
                },16)
            },
            // 更新月份的top值
            updateMonthTop(topArr = []) {
                
                // 设置对应月份的top值，用于onScroll方法更新月份
                topArr.map((item, index) => {
                    this.months[index].top = item;
                });

                // 获取默认日期的下标
                if (!this.defaultDate) {
                    // 如果没有设置默认日期，则将当天日期设置为默认选中的日期
                    const selected = dayjs().format('YYYY-MM');
                    this.scrollIntoDefaultMonth(selected);
                    return;
                }
                let selected = dayjs().format('YYYY-MM');
                // 单选模式，可以是字符串或数组，Date对象等
                if (!uni.$u.test.array(this.defaultDate)) {
                    selected = dayjs(this.defaultDate).format('YYYY-MM');
                } else {
                    selected = dayjs(this.defaultDate[0]).format('YYYY-MM');
                }
                this.scrollIntoDefaultMonth(selected);
            },
        },
    };
</script>
