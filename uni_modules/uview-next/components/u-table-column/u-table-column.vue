<template>
    <view v-if="show" class="u-table__column" :style="[columnStyle]">
        <block v-for="(row, index) in tableData" :key="index">
            <view class="u-table__cell" :style="[cellStyle(row, index)]" :class="[cellClasses(row, index)]"
                @click="handleCellClick(row, index)" v-if="!isCellHidden(row, index)">
                <view class="u-table__value" :class="{ 'is-ellipsis': isEllipsis }">

                    <slot :row="row" :column="columnConfig" :index="index" :value="row">
                        <template v-if="type === 'index'">
                            {{ index + 1 }}
                        </template>
                        <template v-else-if="type === 'selection'">
                            <u-checkbox :checked="isSelectionSelected(row)"
                                @change="(checked) => handleSelectionChange(row, checked)"></u-checkbox>
                        </template>
                        <template v-else>
                            {{ getCellValue(row) }}
                        </template>
                    </slot>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
import props from './props.js';
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin';

/**
 * table-col 表格列
 * @description 表格列组件，需要与u-table组件配合使用
 * @tutorial https://www.uviewui.com/components/table.html
 * @property {String}             prop              字段名称，对应列内容的字段名 (默认 '' )
 * @property {String}             label             显示的标题 (默认 '' )
 * @property {String|Number}      width             列宽度 (默认 '' )
 * @property {String|Number}      minWidth          列最小宽度 (默认 '' )
 * @property {Boolean}            sortable          是否可排序 (默认 false )
 * @property {Boolean}            fixed             是否固定列 (默认 false )
 * @property {String}             align             对齐方式 (默认 'left' )
 * @property {String}             type              列类型：selection/index (默认 '' )
 * @property {Function}           formatter         格式化函数 (默认 null )
 * @property {Boolean}            show              是否显示 (默认 true )
 * @property {String}             columnKey         列的key (默认 '' )
 * @property {String}             className         列的类名 (默认 '' )
 * @property {Object}             customStyle       定义需要用到的外部样式
 * @example  <u-table-column prop="name" label="姓名" width="100"></u-table-column>
 */
export default {
    name: 'u-table-column',
    mixins: [mpMixin, mixin, props],
    data() {
        return {
            parentData: {
                data: [],
                border: false,
                stripe: false,
                rowHeight: null,
                ellipsis: true,
                selectedRowKeys: [],
                toggleRowSelection: null,
                mergeInfo: {}
            },
            sortDirection: 0,
            innerFormatter: (value) => value
        };
    },
    computed: {
        columnConfig() {
            return {
                prop: this.prop,
                type: this.type,
                label: this.label,
                width: this.width,
                minWidth: this.minWidth,
                sortable: this.sortable,
                align: this.align,
                type: this.type,
                formatter: this.formatter,
                sortDirection: this.sortDirection
            };
        },
        tableData() {
            return this.parentData.data || [];
        },
        isEllipsis() {
            return this.parentData.ellipsis;
        },

        columnStyle() {
            const style = {};

            if (this.width) {
                style.width = this.$u.addUnit(this.width);
            } else if (this.minWidth) {
                style.minWidth = this.$u.addUnit(this.minWidth);
            } else {
                style.flex = 1;
            }

            return style;
        },
        // 响应式的行选中状态映射
        isSelectionSelected() {
            return (row) => {
                if (this.parentData.selectedRowKeys && this.parentData.selectedRowKeys.length > 0) {
                    const rowKey = this.getRowKey(row);
                    return this.parentData.selectedRowKeys.includes(rowKey);
                }
                return false;
            }
        },
        cellStyle(row, index) {
            return (row, index) => {
                const style = {};

                if (this.parentData.rowHeight) {
                    style.height = this.$u.addUnit(this.parentData.rowHeight);
                }

                // 处理合并单元格样式
                if (this.parentData.mergeInfo && this.prop) {
                    const mergeKey = `${index}-${this.prop}`;
                    const mergeData = this.parentData.mergeInfo[mergeKey];

                    if (mergeData) {
                        // 设置合并单元格的高度
                        if (mergeData.rowspan > 1) {
                            const rowHeight = parseInt(this.parentData.rowHeight);
                            style.height = this.$u.addUnit(rowHeight * mergeData.rowspan + 1);
                        }

                        // 设置显示状态
                        if (mergeData.display === 'none') {
                            style.display = 'none';
                        }
                    }
                }

                return style;
            }
        },
        cellClasses(row, index) {
            return (row, index) => {
                let classes = [
                    this.className,
                    `is-${this.align || 'left'}`,
                ];

                if (this.parentData.border) {
                    classes.push('is-border');
                }

                if (this.parentData.fixed) {
                    classes.push('is-fixed');
                }

                if (this.parentData.stripe && index % 2 === 1) {
                    classes.push('is-stripe');
                }

                // 添加合并单元格的样式类
                if (this.parentData.mergeInfo && this.prop) {
                    const mergeKey = `${index}-${this.prop}`;
                    const mergeData = this.parentData.mergeInfo[mergeKey];

                    if (mergeData && mergeData.rowspan > 1) {
                        classes.push('is-merged');
                    }
                }

                // #ifdef MP-ALIPAY || MP-TOUTIAO
                classes = classes.join(' ')
                // #endif

                return classes;
            }
        },
    },
    mounted() {
        this.init()
    },
    // #ifdef VUE3
    emits: ['cellClick'],
    // #endif
    methods: {
        init() {
            this.updateParentData();
            if (!this.parent) {
                uni.$u.error('u-table-column必须搭配u-table组件使用');
                return;
            }
        },
        updateParentData() {
            this.getParentData('u-table');
        },

        // 获取行的唯一标识（与父组件保持一致）
        getRowKey(row) {
            if (!row) return '';
            // 这里需要与父组件的rowKey属性保持一致
            const rowKeyProp = this.parent?.rowKey || 'id';
            return this.getValueByPath(row, rowKeyProp) || JSON.stringify(row);
        },

        // 获取嵌套属性值
        getValueByPath(obj, path) {
            if (!path || !obj) return '';

            const keys = path.split('.');
            let value = obj;

            for (const key of keys) {
                if (value && typeof value === 'object') {
                    value = value[key];
                } else {
                    value = '';
                    break;
                }
            }

            return value;
        },

        // 处理选择状态变化
        handleSelectionChange(row, checked) {
            if (typeof this.parentData.toggleRowSelection === 'function') {
                this.parentData.toggleRowSelection(row, checked);
            }
        },

        // 处理展开点击
        handleExpandClick(row) {
            if (typeof this.parentData.toggleRowExpansion === 'function') {
                this.parentData.toggleRowExpansion(row);
            }
        },

        handleCellClick(row, rowIndex) {
            // 如果是selection或expand类型，不触发cell-click事件
            if (this.type === 'selection' || this.type === 'expand') {
                return;
            }

            const cellData = {
                row,
                column: this.columnConfig,
                rowIndex,
                columnIndex: this.getColumnIndex(),
                value: this.getCellValue(row)
            };

            this.$emit('cellClick', cellData);

            if (this.parent) {
                this.parent.$emit('cellClick', cellData);
            }
        },
        getCellValue(row) {
            if (!this.prop) return '';
            const keys = this.prop.split('.');
            let value = row;

            for (const key of keys) {
                if (value && typeof value === 'object') {
                    value = value[key];
                } else {
                    value = '';
                    break;
                }
            }

            const formatter = this.formatter || this.innerFormatter;
            return formatter(value);
        },
        getColumnIndex() {
            if (!this.parent || !this.parent.children) return 0;
            return this.parent.children.findIndex(col => col.prop === this.prop);
        },

        isCellHidden(row, index) {
            // 检查合并信息，如果该单元格被合并到其他单元格中，则隐藏
            if (this.parentData.mergeInfo && this.prop) {
                const mergeKey = `${index}-${this.prop}`;
                const mergeData = this.parentData.mergeInfo[mergeKey];

                if (mergeData && mergeData.display === 'none') {
                    return true;
                }
            }

            return false;
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.u-table {
    &__column {
        @include flex(column);
        flex-shrink: 0;

        &:last-child .is-border {
            border-right: none;
        }
    }

    &__cell {
        @include flex(column);
        padding: 0px 10px;
        align-items: center;
        justify-content: center;
        position: relative;

        &.is-left {
            align-items: flex-start;
        }

        &.is-center {
            align-items: center;
        }

        &.is-right {
            align-items: flex-end;
        }

        &.is-border {
            border-right: 1px solid $u-border-color;
            border-bottom: 1px solid $u-border-color;

            &:last-child {
                border-bottom: none;
            }
        }

        &.is-stripe {
            background-color: $u-bg-color;
        }

        &.is-merged {
            position: relative;
            z-index: 1;
            background-color: inherit;
        }
    }

    &__value {
        font-size: 13px;
        line-height: 15px;

        &.is-ellipsis {
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
    }

    &__expand-icon {
        @include flex(row);
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        cursor: pointer;
        transition: transform 0.2s ease;

        &.is-expanded {
            transform: rotate(90deg);
        }

        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 2px;
        }
    }
}
</style>
