<template>
    <view class="u-page">

        <view class="u-page__item">
            <text class="u-page__item__title">基础使用</text>
            <u-table :data="tableData">
                <u-table-column type="index" label="序号"/>
                <u-table-column prop="name" label="姓名" />
                <u-table-column prop="address" label="地址" />
            </u-table>
        </view>
        
        <view class="u-page__item">
            <text class="u-page__item__title">基础使用</text>
            <u-table :data="tableData">
                <u-table-column type="index" label="序号"/>
                <u-table-column prop="name" label="姓名" />
                <u-table-column prop="address" label="地址" />
            </u-table>
        </view>

        <view class="u-page__item">
            <text class="u-page__item__title">固定表头</text>
            <u-table :data="tableData" height="250">
                <u-table-column type="index" label="序号" sortable />
                <u-table-column prop="name" label="姓名" sortable />
                <u-table-column prop="address" label="地址" sortable />
            </u-table>
        </view>

        <view class="u-page__item">
            <text class="u-page__item__title">自定义列模板</text>
            <u-table :data="tableData" height="300">
                <u-table-column type="index" label="序号大福大" sortable />
                <u-table-column prop="name" label="姓名" sortable />
                <u-table-column prop="status" label="状态" align="center">
                    <template v-slot="{ row, value, type }">
                        <u-tag v-if="value.status == 0" text="禁用" type="error" size="mini" />
                        <u-tag v-if="value.status == 1" text="正常" type="success" size="mini" />
                        <u-tag v-if="value.status == 2" text="待审核" type="warning" size="mini" />
                    </template>
                </u-table-column>
                <u-table-column prop="createTime" label="创建时间" :formatter="formatTime" sortable />
                <u-table-column label="操作" align="center">
                    <template v-slot="{ row, index }">
                        <u-button size="mini" type="primary" @click="handleEdit(row, index)">编辑</u-button>
                    </template>
                </u-table-column>
            </u-table>
        </view>

        <view class="u-page__item">
            <text class="u-page__item__title">多选</text>
            <u-table :data="tableData" :defaultSelection="defaultSelectedRows" @selection-change="handleSelectionChange"
                @selectAll="handleSelectAll" height="300">
                <u-table-column type="selection" width="55" align="center"></u-table-column>
                <u-table-column prop="name" label="姓名"></u-table-column>
                <u-table-column prop="age" label="年龄" align="center"></u-table-column>
                <u-table-column prop="status" label="状态" align="center">
                    <!-- #ifdef VUE2 -->
                    <template v-slot="{ row, value, type }">
                        <u-tag :text="row.status === 1 ? '正常' : '禁用'" :type="row.status === 1 ? 'success' : 'error'"
                            size="mini"></u-tag>
                    </template>
                    <!-- #endif -->
                    <!-- #ifdef VUE3 -->
                    <template #default="{ row, index }">
                        <u-tag :text="row.status === 1 ? '正常' : '禁用'" :type="row.status === 1 ? 'success' : 'error'"
                            size="mini"></u-tag>
                    </template>
                    <!-- #endif -->
                </u-table-column>
            </u-table>
        </view>

        <!-- 合并单元格示例 - 方法一：spanMethod 自定义合并 -->
        <view class="u-page__item">
            <text class="u-page__item__title">合并单元格 - spanMethod 自定义合并</text>
            <u-table :data="mergeTableData1" :span-method="spanMethod" border stripe>
                <u-table-column prop="department" label="部门" width="120"></u-table-column>
                <u-table-column prop="name" label="姓名" width="100"></u-table-column>
                <u-table-column prop="position" label="职位" width="120"></u-table-column>
                <u-table-column prop="salary" label="薪资" ></u-table-column>
            </u-table>
        </view>

        <!-- 合并单元格示例 - 方法二：mergeConfig 简化配置 -->
        <view class="u-page__item">
            <text class="u-page__item__title">合并单元格 - mergeConfig 简化配置</text>
            <u-table :data="mergeTableData2" :merge-config="mergeConfig" border stripe>
                <u-table-column prop="category" label="类别" width="120"></u-table-column>
                <u-table-column prop="product" label="产品" width="150"></u-table-column>
                <u-table-column prop="price" label="价格" width="100"></u-table-column>
                <u-table-column prop="stock" label="库存" width="100"></u-table-column>
            </u-table>
        </view>

        <!-- 合并单元格示例 - 方法三：动态自动合并 -->
        <view class="u-page__item">
            <text class="u-page__item__title">合并单元格 - 动态自动合并相同值</text>
            <u-table :data="mergeTableData3" border stripe>
                <u-table-column prop="region" label="地区" width="100"></u-table-column>
                <u-table-column prop="city" label="城市" width="100"></u-table-column>
                <u-table-column prop="sales" label="销售额" align="right" width="120"></u-table-column>
                <u-table-column prop="growth" label="增长率" align="center"></u-table-column>
            </u-table>
        </view>

        <!-- 表尾合计行示例 - 基础使用 -->
        <view class="u-page__item">
            <text class="u-page__item__title">表尾合计行 - 基础使用</text>
            <u-table :data="summaryTableData1" :show-summary="true" border stripe :scroll-x="false">
                <u-table-column prop="product" label="产品" width="120"></u-table-column>
                <u-table-column prop="quantity" label="数量" align="center" width="80"></u-table-column>
                <u-table-column prop="price" label="单价" align="right" width="100"></u-table-column>
                <u-table-column prop="amount" label="金额" align="right" width="100"></u-table-column>
            </u-table>
        </view>

        <!-- 表尾合计行示例 - 指定合计列 -->
        <view class="u-page__item">
            <text class="u-page__item__title">表尾合计行 - 指定合计列</text>
            <u-table :data="summaryTableData2" :show-summary="true" :summary-columns="['sales', 'profit']" sum-text="总计"
                border stripe>
                <u-table-column prop="department" label="部门" width="120"></u-table-column>
                <u-table-column prop="employee" label="员工" width="100"></u-table-column>
                <u-table-column prop="sales" label="销售额" width="120"></u-table-column>
                <u-table-column prop="profit" label="利润"  width="100"></u-table-column>
                <u-table-column prop="rate" label="利润率"></u-table-column>
            </u-table>
        </view>

        <!-- 表尾合计行示例 - 自定义合计方法 -->
        <view class="u-page__item">
            <text class="u-page__item__title">表尾合计行 - 自定义合计方法</text>
            <u-table :data="summaryTableData3" :show-summary="true" :summary-method="customSummaryMethod" border stripe>
                <u-table-column type="selection" width="55" align="center"></u-table-column>
                <u-table-column prop="category" label="类别" width="100"></u-table-column>
                <u-table-column prop="name" label="商品名称" width="150"></u-table-column>
                <u-table-column prop="cost" label="成本" align="right" width="100"></u-table-column>
                <u-table-column prop="price" label="售价" align="right" width="100"></u-table-column>
                <u-table-column prop="stock" label="库存" align="center"></u-table-column>
            </u-table>
        </view>

        <view class="u-page__item">
            <text class="u-page__item__title">自定义空状态</text>
            <u-table :data="[]">
                <u-table-column prop="name" label="姓名"></u-table-column>
                <u-table-column prop="age" label="年龄"></u-table-column>
                <u-table-column prop="address" label="地址"></u-table-column>
                <template #empty>
                    <view style="text-align: center; padding: 40px;">
                        <u-icon name="order" size="60" color="#c0c4cc"></u-icon>
                        <text style="display: block; margin-top: 10px; color: #909399;">暂无数据</text>
                    </view>
                </template>
            </u-table>
        </view>

        <u-gap height="50"></u-gap>
    </view>
</template>

<script>
export default {
    data() {
        return {
            defaultSelectedRows: [],
            tableData: [
                {
                    id: 1,
                    name: '张三',
                    age: 25,
                    email: 'zhangsan@example.com',
                    status: 1,
                    createTime: new Date('2024-01-15'),
                    address: '北京市朝阳区北京市朝阳区北京市朝阳区北京市朝阳区'
                },
                {
                    id: 2,
                    name: '李四',
                    age: 30,
                    email: 'lisi@example.com',
                    status: 2,
                    createTime: new Date('2024-01-16'),
                    address: '上海市浦东新区'
                },
                {
                    id: 3,
                    name: '王五',
                    age: 28,
                    email: 'wangwu@example.com',
                    status: 1,
                    createTime: new Date('2024-01-17'),
                    address: '广州市天河区'
                },
                {
                    id: 4,
                    name: '赵六',
                    age: 35,
                    email: 'zhaoliu@example.com',
                    status: 0,
                    createTime: new Date('2024-01-18'),
                    address: '深圳市南山区'
                },
                {
                    id: 5,
                    name: '孙七',
                    age: 40,
                    email: 'sunqi@example.com',
                    status: 1,
                    createTime: new Date('2024-01-19'),
                    address: '北京市海淀区'
                },
                {
                    id: 6,
                    name: '周八',
                    age: 45,
                    email: 'zhouba@example.com',
                    status: 0,
                    createTime: new Date('2024-01-20'),
                    address: '北京市昌平区'
                },
                {
                    id: 7,
                    name: '吴九',
                    age: 50,
                    email: 'wujiu@example.com',
                    status: 1,
                    createTime: new Date('2024-01-21'),
                    address: '北京市顺义区'
                },
                {
                    id: 8,
                    name: '郑十',
                    age: 55,
                    email: 'zhengshi@example.com',
                    status: 0,
                    createTime: new Date('2024-01-22'),
                    address: '北京市大兴区'
                },
                {
                    id: 9,
                    name: '孙十一',
                    age: 60,
                    email: 'sunshi@example.com',
                    status: 1,
                    createTime: new Date('2024-01-23'),
                    address: '北京市海淀区'
                },
                {
                    id: 10,
                    name: '周十二',
                    age: 65,
                    email: 'zhoushi@example.com',
                    status: 0,
                    createTime: new Date('2024-01-24'),
                    address: '北京市昌平区'
                },
                {
                    id: 11,
                    name: '吴十三',
                    age: 70,
                    email: 'wushisan@example.com',
                    status: 1,
                    createTime: new Date('2024-01-25'),
                    address: '北京市海淀区'
                }
            ],

            // 合并单元格示例数据1：员工信息
            mergeTableData1: [
                { department: '技术部', name: '张三', position: '前端工程师', salary: '15000' },
                { department: '技术部', name: '李四', position: '后端工程师', salary: '16000' },
                { department: '技术部', name: '王五', position: '架构师', salary: '25000' },
                { department: '产品部', name: '赵六', position: '产品经理', salary: '18000' },
                { department: '产品部', name: '钱七', position: '产品助理', salary: '12000' },
                { department: '设计部', name: '孙八', position: 'UI设计师', salary: '14000' }
            ],

            // 合并单元格示例数据2：产品信息
            mergeTableData2: [
                { category: '电子产品', product: 'iPhone 15', price: '5999', stock: '100' },
                { category: '电子产品', product: '小米14', price: '3999', stock: '150' },
                { category: '电子产品', product: '华为Mate60', price: '6999', stock: '80' },
                { category: '电子产品', product: 'MacBook Pro', price: '12999', stock: '40' },
                { category: '电子产品', product: 'iPad Air', price: '4399', stock: '120' },
                { category: '家居用品', product: '沙发', price: '3000', stock: '50' },
                { category: '家居用品', product: '餐桌', price: '1500', stock: '30' },
                { category: '家居用品', product: '床垫', price: '2200', stock: '25' },
                { category: '家居用品', product: '椅子', price: '299', stock: '200' },
                { category: '服装', product: 'T恤', price: '99', stock: '200' },
                { category: '服装', product: '卫衣', price: '199', stock: '160' },
                { category: '服装', product: '夹克', price: '399', stock: '120' },
                { category: '图书', product: '编程大全', price: '129', stock: '80' },
                { category: '图书', product: '设计心理学', price: '89', stock: '95' },
                { category: '食品', product: '精品咖啡豆', price: '79', stock: '300' },
                { category: '食品', product: '龙井茶叶', price: '159', stock: '150' }
            ],

            // 合并单元格示例数据3：销售数据
            mergeTableData3: [
                { region: '华东', city: '上海', sales: '1000000', growth: '15%' },
                { region: '华东', city: '杭州', sales: '800000', growth: '20%' },
                { region: '华东', city: '南京', sales: '600000', growth: '10%' },
                { region: '华南', city: '深圳', sales: '1200000', growth: '25%' },
                { region: '华南', city: '广州', sales: '900000', growth: '18%' },
                { region: '华北', city: '北京', sales: '1500000', growth: '12%' }
            ],

            // 简化配置方式
            mergeConfig: [
                {
                    prop: 'category',  // 要合并的列
                    ranges: [
                        { startRow: 0, endRow: 4 },  // 电子产品 5 行合并
                        { startRow: 5, endRow: 8 },  // 家居用品 4 行合并
                        { startRow: 9, endRow: 11 }, // 服装 3 行合并
                        { startRow: 12, endRow: 13 }, // 图书 2 行合并
                        { startRow: 14, endRow: 15 }  // 食品 2 行合并
                    ]
                }
            ],

            // 表尾合计行示例数据1：基础使用（自动合计数字列）
            summaryTableData1: [
                { product: 'iPhone 15', quantity: 10, price: 5999, amount: 59990 },
                { product: '小米14', quantity: 15, price: 3999, amount: 59985 },
                { product: '华为Mate60', quantity: 8, price: 6999, amount: 55992 },
                { product: 'MacBook Pro', quantity: 5, price: 12999, amount: 64995 },
                { product: 'iPad Air', quantity: 12, price: 4399, amount: 52788 }
            ],

            // 表尾合计行示例数据2：指定合计列
            summaryTableData2: [
                { department: '销售部', employee: '张三', sales: 120000, profit: 24000, rate: '20%' },
                { department: '销售部', employee: '李四', sales: 95000, profit: 19000, rate: '20%' },
                { department: '市场部', employee: '王五', sales: 80000, profit: 12000, rate: '15%' },
                { department: '市场部', employee: '赵六', sales: 110000, profit: 16500, rate: '15%' },
                { department: '技术部', employee: '钱七', sales: 0, profit: 0, rate: '0%' }
            ],

            // 表尾合计行示例数据3：自定义合计方法
            summaryTableData3: [
                { category: '数码', name: 'iPhone 15', cost: 4500, price: 5999, stock: 50 },
                { category: '数码', name: '小米14', cost: 2800, price: 3999, stock: 80 },
                { category: '家电', name: '电视', cost: 2000, price: 2999, stock: 30 },
                { category: '家电', name: '洗衣机', cost: 1500, price: 2299, stock: 25 },
                { category: '服装', name: 'T恤', cost: 30, price: 99, stock: 200 },
                { category: '服装', name: '牛仔裤', cost: 80, price: 199, stock: 150 }
            ]
        }
    },

    methods: {
        handleSelectionChange(selection) {
            console.log('选择变化：', selection)
        },
        handleSelectAll(selection) {
            console.log('全选变化：', selection)
        },
        // 获取状态文本
        getStatusText(status) {
            const statusMap = {
                0: '禁用',
                1: '正常',
                2: '待审核'
            }
            return statusMap[status] || '未知'
        },

        // 获取状态类型
        getStatusType(status) {
            const typeMap = {
                0: 'error',
                1: 'success',
                2: 'warning'
            }
            return typeMap[status] || 'info'
        },

        // 格式化时间
        formatTime(value) {
            if (!value) return ''
            const date = new Date(value)
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
        },

        // 处理行点击
        handleRowClick({ row, index }) {
            console.log('行点击:', row, index)
            uni.showToast({
                title: `点击了第${index + 1}行`,
                icon: 'none'
            })
        },

        // 处理排序变化
        handleSortChange({ prop, order, column }) {
            console.log('排序变化:', prop, order, column)
            uni.showToast({
                title: `按${column.label}${order === 'asc' ? '升序' : '降序'}排序`,
                icon: 'none'
            })
        },

        // 处理编辑
        handleEdit(row, index) {
            console.log('编辑:', row, index)
            uni.showToast({
                title: `编辑${row.name}`,
                icon: 'none'
            })
        },

        // 合并单元格方法一：自定义合并逻辑
        spanMethod({ row, column, rowIndex, columnIndex }) {
            // 合并部门列
            if (column.prop === 'department') {
                // 技术部：前3行合并
                if (rowIndex <= 2) {
                    if (rowIndex === 0) {
                        return { rowspan: 3, colspan: 1 }
                    } else {
                        return { rowspan: 0, colspan: 0 }
                    }
                }
                // 产品部：第3-4行合并
                else if (rowIndex >= 3 && rowIndex <= 4) {
                    if (rowIndex === 3) {
                        return { rowspan: 2, colspan: 1 }
                    } else {
                        return { rowspan: 0, colspan: 0 }
                    }
                }
                // 设计部：第5行独立
                else if (rowIndex === 5) {
                    return { rowspan: 1, colspan: 1 }
                }
            }

            // 默认不合并
            return { rowspan: 1, colspan: 1 }
        },

        // 合并单元格方法三：自动合并相同值的单元格
        autoMergeMethod({ row, column, rowIndex, columnIndex }) {
            if (column.prop === 'region') {
                // 计算相同地区的连续行数
                const currentValue = row[column.prop]
                let startIndex = rowIndex
                let endIndex = rowIndex
                console.log('currentValue', this.mergeTableData3)
                // 向前找到开始位置
                while (startIndex > 0 && this.mergeTableData3[startIndex - 1][column.prop] === currentValue) {
                    startIndex--
                }

                // 向后找到结束位置
                while (endIndex < this.mergeTableData3.length - 1 && this.mergeTableData3[endIndex + 1][column.prop] === currentValue) {
                    endIndex++
                }

                const spanCount = endIndex - startIndex + 1

                if (spanCount > 1) {
                    if (rowIndex === startIndex) {
                        // 第一行显示合并的单元格
                        return { rowspan: spanCount, colspan: 1 }
                    } else {
                        // 其他行隐藏
                        return { rowspan: 0, colspan: 0 }
                    }
                }
            }

            return { rowspan: 1, colspan: 1 }
        },

        // 自定义合计方法
        customSummaryMethod({ columns, data }) {
            const summaryData = []

            columns.forEach((column, index) => {
                if (index === 0) {
                    // 第一列显示自定义文本
                    summaryData[index] = '统计汇总'
                } else if (column.prop === 'cost') {
                    // 成本列：计算总成本
                    const totalCost = data.reduce((sum, row) => {
                        return sum + (parseFloat(row.cost) || 0)
                    }, 0)
                    summaryData[index] = `￥${totalCost.toLocaleString()}`
                } else if (column.prop === 'price') {
                    // 售价列：计算平均售价
                    const totalPrice = data.reduce((sum, row) => {
                        return sum + (parseFloat(row.price) || 0)
                    }, 0)
                    const avgPrice = totalPrice / data.length
                    summaryData[index] = `平均: ￥${avgPrice.toFixed(2)}`
                } else if (column.prop === 'stock') {
                    // 库存列：计算总库存
                    const totalStock = data.reduce((sum, row) => {
                        return sum + (parseInt(row.stock) || 0)
                    }, 0)
                    summaryData[index] = `${totalStock} 件`
                } else if (column.prop === 'category') {
                    // 类别列：显示种类数量
                    const categories = [...new Set(data.map(row => row.category))]
                    summaryData[index] = `${categories.length} 类`
                } else {
                    summaryData[index] = ''
                }
            })

            return summaryData
        }
    }
}
</script>

<style lang="scss" scoped>
.u-page {

    &__item {

        &__title {
            display: block;
            color: $u-tips-color;
            padding: 15px 0;
            font-size: 15px;

            &__slot-title {
                color: $u-primary;
                font-size: 14px;
            }
        }
    }
}
</style>