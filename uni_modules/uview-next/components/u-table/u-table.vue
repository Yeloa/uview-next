<template>
    <u-scroll-list :indicator="false" :scroll="scrollX">
        <view class="u-table" :class="[customClass, border ? 'is-border' : '']" :style="tableStyle">
            <!-- 表头 -->
            <view v-if="showHeader" class="u-table__header" ref="u-table__header">
                <block v-for="(column, index) in childrenData" :key="index">
                    <view v-if="column.show" class="u-table__header__column" :style="[cellStyle(column)]"
                        @click="handleHeaderClick(column, index)">
                        <view class="u-table__cell" :class="[cellClasses(column, index)]"
                            :style="{ height: $u.addUnit(rowHeight) }">
                            <!-- 多选表头复选框 -->
                            <template v-if="column.type === 'selection'">
                                <u-checkbox :checked="isAllSelected" :indeterminate="isIndeterminate"
                                    @change="handleSelectAll"></u-checkbox>
                            </template>
                            <!-- 普通表头 -->
                            <template v-else>
                                <text class="u-table__value">{{ column.label }}</text>
                                <view v-if="column.sortable && column.type != 'index'" class="u-table__sort-icon">
                                    <view class="u-table__sort-arrow u-table__sort-arrow--up"
                                        :class="{ 'is-active': sortColumn === column.prop && sortOrder === 'asc' }">
                                    </view>
                                    <view class="u-table__sort-arrow u-table__sort-arrow--down"
                                        :class="{ 'is-active': sortColumn === column.prop && sortOrder === 'desc' }">
                                    </view>
                                </view>
                            </template>
                        </view>
                    </view>
                </block>
            </view>

            <!-- 表体 -->
            <scroll-view class="u-table__body" :style="bodyStyle" :scroll-y="true">
                <!-- 数据行容器 -->
                <view class="u-table__rows">
                    <slot></slot>
                </view>

                <!-- 空数据提示 -->
                <view v-if="!data || data.length === 0" class="u-table__empty"
                    :style="{ height: $u.addUnit(emptyHeight) }">
                    <slot name="empty">
                        <view class="u-table__empty-content">
                            <text class="u-table__empty-text">{{ emptyText }}</text>
                        </view>
                    </slot>
                </view>
            </scroll-view>

            <!-- 表尾合计行 -->
            <view v-if="showSummary && data && data.length > 0" class="u-table__footer" ref="u-table__footer">
                <block v-for="(column, index) in children" :key="index">
                    <view v-if="column.show" class="u-table__footer__column" :style="[cellStyle(column)]">
                        <view class="u-table__cell u-table__summary-cell" :class="[cellClasses(column, index)]"
                            :style="{ height: $u.addUnit(rowHeight) }">
                            <text class="u-table__value">{{ getSummaryValue(column, index) }}</text>
                        </view>
                    </view>
                </block>
            </view>
        </view>
    </u-scroll-list>
</template>

<script>
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom')
// #endif
import props from './props.js';
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin'

/**
 * table 表格
 * @description 用于展示多条结构类似的数据，可对数据进行排序等操作
 * @tutorial https://www.uviewui.com/components/table.html
 * @property {Array}              data              显示的数据 (默认 [] )
 * @property {Boolean}            border            是否带有边框 (默认 true )
 * @property {Boolean}			  scrollX			是否允许横向滚动 (默认 true )
 * @property {String|Number}      round             设置圆角值 (默认 0 )
 * @property {Boolean}            stripe            是否为斑马纹表 (默认 true )
 * @property {String|Number}      height            Table 的高度 (默认 null )
 * @property {String|Number}      rowHeight         行高 (默认 50 )
 * @property {Boolean}            showHeader        是否显示表头 (默认 true )
 * @property {Boolean}            ellipsis          是否超出2行隐藏 (默认 true )
 * @property {String}             emptyText         空数据时显示的文本 (默认 '暂无数据' )
 * @property {String|Number}      emptyHeight       空数据区域高度 (默认 200 )
 * @property {String}             rowKey            行数据的Key，用于优化Table的渲染 (默认 'id' )
 * @property {Array}              defaultSelection  默认选中的行 (默认 [] )
 * @property {Boolean}            showSummary       是否显示表尾合计行 (默认 false )
 * @property {String}             sumText           表尾合计行第一列的文本 (默认 '合计' )
 * @property {Function}           summaryMethod     自定义的合计计算方法 (默认 null )
 * @property {Array}              summaryColumns    需要合计的列（prop数组） (默认 [] )
 * @property {Object}             customStyle       定义需要用到的外部样式
 * @event    {Function}           sort-change       排序变化事件
 * @event    {Function}           row-click         行点击事件
 * @event    {Function}           cell-click        单元格点击事件
 * @event    {Function}           selection-change  选择项发生变化时会触发该事件
 * @event    {Function}           select            用户手动勾选数据行的 Checkbox 时触发的事件
 * @event    {Function}           select-all        用户手动勾选全选 Checkbox 时触发的事件
 * @example  <u-table :data="dataList" :columns="columns"></u-table>
 */
export default {
    name: 'u-table',
    mixins: [mpMixin, mixin, props],
    data() {
        return {
            children: [],
            childrenData: [],
            sortColumn: null,
            sortOrder: null,
            headerList: [],
            headerHeight: 0,
            footerHeight: 0,
            // 多选相关状态
            selectedRows: [], // 当前选中的行数据
            selectedRowKeys: [], // 当前选中的行Key
            expandedRowKeys: [] // 当前展开的行Key
        }
    },
    computed: {
        parentData() {
            return [
                this.data,
                this.border,
                this.stripe,
                this.rowHeight,
                this.ellipsis,
                this.selectedRowKeys,
                this.toggleRowSelection,
                this.mergeInfo
            ]
        },
        // 排序后的数据
        sortedData() {
            if (!this.sortColumn || !this.sortOrder) {
                return this.data || []
            }

            const dataToSort = [...(this.data || [])]
            return dataToSort.sort((a, b) => {
                const aVal = this.getValueByPath(a, this.sortColumn)
                const bVal = this.getValueByPath(b, this.sortColumn)

                // 处理不同数据类型的比较
                let result = 0

                // 数字比较
                if (typeof aVal === 'number' && typeof bVal === 'number') {
                    result = aVal - bVal
                }
                // 字符串比较
                else if (typeof aVal === 'string' && typeof bVal === 'string') {
                    result = aVal.localeCompare(bVal)
                }
                // 日期比较
                else if (aVal instanceof Date && bVal instanceof Date) {
                    result = aVal.getTime() - bVal.getTime()
                }
                // 其他类型转换为字符串比较
                else {
                    const aStr = String(aVal || '')
                    const bStr = String(bVal || '')
                    result = aStr.localeCompare(bStr)
                }

                return this.sortOrder === 'asc' ? result : -result
            })
        },

        // 合并单元格信息
        mergeInfo() {
            if (!this.spanMethod && (!this.mergeConfig || this.mergeConfig.length === 0)) {
                return {}
            }

            const info = {}
            const data = this.sortedData

            // 使用自定义合并方法
            if (this.spanMethod && uni.$u.test.func(this.spanMethod)) {
                data.forEach((row, rowIndex) => {
                    this.childrenData.forEach((column, columnIndex) => {
                        if (!column.prop) return

                        const spanResult = this.spanMethod({
                            row,
                            column: column,
                            rowIndex,
                            columnIndex
                        })

                        if (spanResult && (spanResult.rowspan !== 1 || spanResult.colspan !== 1)) {
                            const key = `${rowIndex}-${column.prop}`
                            info[key] = {
                                rowspan: spanResult.rowspan || 1,
                                colspan: spanResult.colspan || 1,
                                display: spanResult.rowspan === 0 || spanResult.colspan === 0 ? 'none' : 'block'
                            }
                        }
                    })
                })
            }
            // 使用简化配置
            else if (this.mergeConfig && this.mergeConfig.length > 0) {
                this.mergeConfig.forEach(config => {
                    if (!config.prop || !config.ranges) return

                    config.ranges.forEach(range => {
                        if (range.startRow !== undefined && range.endRow !== undefined) {
                            const rowspan = range.endRow - range.startRow + 1
                            // 第一行显示合并的单元格
                            const firstRowKey = `${range.startRow}-${config.prop}`
                            info[firstRowKey] = {
                                rowspan: rowspan,
                                colspan: range.colspan || 1,
                                display: 'block'
                            }

                            // 其他行隐藏
                            for (let i = range.startRow + 1; i <= range.endRow; i++) {
                                const key = `${i}-${config.prop}`
                                info[key] = {
                                    rowspan: 0,
                                    colspan: 0,
                                    display: 'none'
                                }
                            }
                        }
                    })
                })
            }

            return info
        },
        // 是否全选
        isAllSelected() {
            return this.data.length > 0 && this.selectedRowKeys.length === this.data.length
        },
        // 是否半选状态
        isIndeterminate() {
            return this.selectedRowKeys.length > 0 && this.selectedRowKeys.length < this.data.length
        },
        tableStyle() {
            const style = {}
            if (this.height) {
                style.height = this.$u.addUnit(this.height)
                style.display = 'flex'
                style.flexDirection = 'column'
            }

            if (this.round) {
                style.borderRadius = this.$u.addUnit(this.round)
            }
            return this.$u.addStyle(style, this.customStyle)
        },
        bodyStyle() {
            const style = {}
            if (this.height) {
                if (this.showHeader || this.showSummary) {
                    // 表体高度 = 总高度 - 表头高度 - 表尾高度
                    const totalHeight = parseInt(this.height) || 0
                    let usedHeight = 0
                    if (this.showHeader) usedHeight += this.headerHeight
                    if (this.showSummary && this.data && this.data.length > 0) usedHeight += this.footerHeight

                    if (totalHeight > usedHeight) {
                        style.height = this.$u.addUnit(totalHeight - usedHeight)
                    }
                } else {
                    style.height = this.$u.addUnit(this.height)
                }
                style.flex = 1
            }
            return this.$u.addStyle(style)
        },
        cellClasses(column, index) {
            return (column, index) => {
                let classes = [
                    `is-${column.align || 'left'}`,
                ];

                if (this.border) {
                    classes.push('is-border');
                }

                // #ifdef MP-ALIPAY || MP-TOUTIAO
                classes = classes.join(' ')
                // #endif

                return classes;
            }
        },
        cellStyle(column) {
            return (column) => {
                const style = {}
                if (column.width) {
                    style.width = this.$u.addUnit(column.width)
                } else if (column.minWidth) {
                    style.minWidth = this.$u.addUnit(column.minWidth)
                } else {
                    style.flex = 1;
                }
                return this.$u.addStyle(style)
            }
        }
    },
    created() {
        //this.children = []
        // 初始化默认选中项
        this.initDefaultSelection()
    },
    mounted() {
        this.getHeaderHeight()
        this.getFooterHeight()
    },
    watch: {
        // 监听排序状态变化，更新子组件数据
        sortedData: {
            handler() {
                this.updateChildrenData()
            },
            immediate: true
        },
        // 监听原始数据变化
        data: {
            handler() {
                this.updateChildrenData()
                // 数据变化时重新检查选中状态
                this.validateSelection()
            },
            immediate: true
        },
        // 监听默认选中项变化
        defaultSelection: {
            handler() {
                this.initDefaultSelection()
            },
            immediate: true
        },
        // 监听showSummary变化，重新计算布局
        showSummary: {
            handler() {
                this.$nextTick(() => {
                    this.getFooterHeight()
                })
            }
        },
        // 监听parentData变化
        parentData: {
            handler() {
                if (this.children.length) {
                    this.children.map(child => {
                        child.init()
                    })
                }
            }
        },
        // 监听children变化，兼容vue2微信小程序
        children: {
            // #ifdef VUE3
            deep: true, // 兼容微信小程序vue3写法
            // #endif
            handler(newval) {
                if (newval && newval.length > 0) {
                    this.childrenData = newval.map(item => {
                        return {
                            show: item.show,
                            label: item.label,
                            prop: item.prop,
                            align: item.align,
                            width: item.width,
                            minWidth: item.minWidth,
                            sortable: item.sortable,
                            type: item.type,
                            fixed: item.fixed,
                            columnKey: item.columnKey,
                            className: item.className,
                            customStyle: item.customStyle,
                            formatter: item.formatter,
                        }
                    })
                }
            }
        }
    },
    // #ifdef VUE3
    emits: ['cellClick', 'sortChange', 'selectionChange', 'select', 'selectAll'],
    // #endif
    methods: {
        // 获取合计行的值
        getSummaryValue(column, index) {

            // 如果使用自定义合计方法
            if (this.summaryMethod && uni.$u.test.func(this.summaryMethod)) {
                const summaryData = this.summaryMethod({
                    columns: this.childrenData,
                    data: this.sortedData,
                    column,
                    index
                })

                if (Array.isArray(summaryData)) {
                    return summaryData[index] || ''
                } else if (typeof summaryData === 'object' && summaryData[column.prop]) {
                    return summaryData[column.prop]
                }
            }

            // 默认合计逻辑
            if (index === 0) {
                // 第一列显示合计文本
                return this.sumText
            }

            // 检查该列是否需要合计
            if (column.prop && this.summaryColumns.includes(column.prop)) {
                return this.calculateColumnSum(column.prop)
            }

            // 如果summaryColumns为空数组，则自动合计数字列
            if (this.summaryColumns.length === 0 && column.prop && column.type !== 'selection' && column.type !== 'index') {
                const isNumericColumn = this.sortedData.every(row => {
                    const value = this.getValueByPath(row, column.prop)
                    return value === null || value === undefined || value === '' || !isNaN(Number(value))
                })

                if (isNumericColumn) {
                    return this.calculateColumnSum(column.prop)
                }
            }

            return ''
        },

        // 计算列的合计值
        calculateColumnSum(prop) {
            if (!prop || !this.sortedData || this.sortedData.length === 0) {
                return '0'
            }

            let sum = 0
            let hasValidNumber = false

            this.sortedData.forEach(row => {
                const value = this.getValueByPath(row, prop)
                const numValue = parseFloat(value)

                if (!isNaN(numValue)) {
                    sum += numValue
                    hasValidNumber = true
                }
            })

            if (!hasValidNumber) {
                return ''
            }

            // 保留两位小数并去除多余的0
            return parseFloat(sum.toFixed(2)).toString()
        },

        // 初始化默认选中项
        initDefaultSelection() {
            if (this.defaultSelection && this.defaultSelection.length > 0) {
                this.selectedRows = [...this.defaultSelection]
                this.selectedRowKeys = this.defaultSelection.map(row => this.getRowKey(row))
            }
        },

        // 验证选中状态（数据变化时调用）
        validateSelection() {
            if (!this.sortedData || this.sortedData.length === 0) {
                this.clearSelection()
                return
            }

            // 过滤出仍然存在的选中项
            const validSelectedRows = []
            const validSelectedRowKeys = []

            this.selectedRows.forEach(selectedRow => {
                const rowKey = this.getRowKey(selectedRow)
                const stillExists = this.sortedData.some(row => this.getRowKey(row) === rowKey)
                if (stillExists) {
                    validSelectedRows.push(selectedRow)
                    validSelectedRowKeys.push(rowKey)
                }
            })

            if (validSelectedRows.length !== this.selectedRows.length) {
                this.selectedRows = validSelectedRows
                this.selectedRowKeys = validSelectedRowKeys
                this.$emit('selectionChange', this.selectedRows)
            }
        },

        // 获取行的唯一标识
        getRowKey(row) {
            if (!row) return ''
            return this.rowKey ? this.getValueByPath(row, this.rowKey) : JSON.stringify(row)
        },

        // 切换行选中状态
        toggleRowSelection(row, selected) {

            const rowKey = this.getRowKey(row)
            const index = this.selectedRowKeys.indexOf(rowKey)

            if (selected === undefined) {
                selected = index === -1
            }

            if (selected && index === -1) {
                // 选中
                this.selectedRows.push(row)
                this.selectedRowKeys.push(rowKey)
            } else if (!selected && index !== -1) {
                // 取消选中
                this.selectedRows.splice(index, 1)
                this.selectedRowKeys.splice(index, 1)
            }

            this.$emit('select', this.selectedRows, row)
            this.$emit('selectionChange', this.selectedRows)
        },

        // 全选/取消全选
        handleSelectAll(checked) {
            if (checked) {
                // 全选
                this.selectedRows = [...this.sortedData]
                this.selectedRowKeys = this.sortedData.map(row => this.getRowKey(row))
            } else {
                // 取消全选
                this.selectedRows = []
                this.selectedRowKeys = []
            }

            // 强制更新子组件数据，确保复选框状态同步
            this.updateChildrenData()

            this.$emit('selectAll', this.selectedRows)
            this.$emit('selectionChange', this.selectedRows)
        },

        // 清空选择
        clearSelection() {
            this.selectedRows = []
            this.selectedRowKeys = []
            this.$emit('selectionChange', this.selectedRows)
        },

        // 获取当前选中的行
        getSelectionRows() {
            return this.selectedRows
        },

        // 获取嵌套属性值
        getValueByPath(obj, path) {
            if (!path || !obj) return ''

            const keys = path.split('.')
            let value = obj

            for (const key of keys) {
                if (value && typeof value === 'object') {
                    value = value[key]
                } else {
                    value = ''
                    break
                }
            }

            return value
        },

        // 更新子组件数据
        updateChildrenData() {
            if (this.children && this.children.length > 0) {
                this.children.forEach(child => {
                    if (child.parentData) {
                        // 传递排序后的数据给子组件
                        child.parentData.data = this.sortedData
                        child.parentData.border = this.border
                        child.parentData.stripe = this.stripe

                        // 传递合并信息
                        child.parentData.mergeInfo = this.mergeInfo

                        // 传递选中状态
                        if (child.type === 'selection') {
                            child.parentData.selectedRowKeys = this.selectedRowKeys
                            child.parentData.toggleRowSelection = this.toggleRowSelection.bind(this)
                        }
                    }
                })
            }
        },

        // 获取下拉菜单内容的高度
        async getHeaderHeight() {
            await uni.$u.sleep(30);
            // #ifndef APP-NVUE
            this.$uGetRect('.u-table__header').then(res => {
                this.headerHeight = res.height;
            });
            // #endif

            // #ifdef APP-NVUE
            const ref = this.$refs['u-table__header']
            ref && dom.getComponentRect(ref, (res) => {
                this.headerHeight = res.size.height
            });
            // #endif
        },

        // 获取表尾高度
        async getFooterHeight() {
            if (!this.showSummary) {
                this.footerHeight = 0
                return
            }

            await uni.$u.sleep(30);
            // #ifndef APP-NVUE
            this.$uGetRect('.u-table__footer').then(res => {
                this.footerHeight = res.height || 0;
            });
            // #endif

            // #ifdef APP-NVUE
            const ref = this.$refs['u-table__footer']
            ref && dom.getComponentRect(ref, (res) => {
                this.footerHeight = res.size.height || 0
            });
            // #endif
        },

        // 表头点击事件处理
        handleHeaderClick(column, index) {
            if (column.type === 'selection') {
                // 多选列不处理排序
                return
            }
            this.handleSort(column, index)
        },

        handleSort(column, index) {
            if (!column.sortable || column.type === 'index') return

            let newOrder = 'asc'

            // 如果点击的是当前排序列
            if (this.sortColumn === column.prop) {
                if (this.sortOrder === 'asc') {
                    // 当前是升序，切换到降序
                    newOrder = 'desc'
                } else if (this.sortOrder === 'desc') {
                    // 当前是降序，取消排序
                    this.sortColumn = null
                    this.sortOrder = null
                    this.$emit('sortChange', {
                        prop: null,
                        order: null,
                        column: column,
                        index: index
                    })
                    return
                }
            }

            // 设置新的排序状态
            this.sortColumn = column.prop
            this.sortOrder = newOrder

            // 触发排序变化事件
            this.$emit('sortChange', {
                prop: this.sortColumn,
                order: this.sortOrder,
                column: column,
                index: index
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../libs/css/components.scss";

.u-table {
    position: relative;
    font-size: 14px;
    overflow: hidden;
    min-width: 100%;

    &__header {
        @include flex(row);
        background-color: $u-bg-color;
        flex-shrink: 0;

        &__column {
            @include flex(row);
            flex-shrink: 0;

            &:last-child .is-border {
                border-right: none;
            }
        }
    }

    &__footer {
        @include flex(row);
        background-color: $u-bg-color;
        flex-shrink: 0;
        border-top: 1px solid $u-border-color;

        &__column {
            @include flex(row);
            flex-shrink: 0;

            &:last-child .is-border {
                border-right: none;
            }
        }
    }

    &__body {
        flex: 1;
        width: 100%;
    }

    &__rows {
        @include flex(row);
        width: 100%;
    }

    &__cell {
        @include flex(row);
        flex: 1;
        padding: 0px 10px;
        align-items: center;
        position: relative;

        &.is-left {
            justify-content: flex-start;
        }

        &.is-center {
            justify-content: center;
        }

        &.is-right {
            justify-content: flex-end;
        }

        &.is-border {
            border-right: 1px solid $u-border-color;
            border-bottom: 1px solid $u-border-color;
        }
    }

    &__summary-cell {
        font-weight: 500;
        color: $u-main-color;
        background-color: #fafafa;

        &.is-border {
            border-bottom: none;
        }
    }

    &__value {
        font-size: 13px;
        line-height: 15px;
    }

    &.is-border {
        border: 1px solid $u-border-color;
    }
}

.u-table__sort-icon {
    @include flex(column);
    margin-left: 4px;
    gap: 2px;
}

.u-table__sort-arrow {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    transition: border-color 0.3s ease;

    &--up {
        border-bottom: 5px solid #c0c4cc;

        &.is-active {
            border-bottom-color: $u-primary;
        }
    }

    &--down {
        border-top: 5px solid #c0c4cc;

        &.is-active {
            border-top-color: $u-primary;
        }
    }
}

.u-table__empty {
    @include flex(column);
    align-items: center;
    justify-content: center;
    color: #909399;
    font-size: 14px;
    width: 100%;
}

.u-table__empty-content {
    text-align: center;
}

.u-table__empty-text {
    color: #909399;
}
</style>