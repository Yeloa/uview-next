# u-paging 分页组件

支持下拉刷新和下滑加载更多的分页组件，基于wxs技术实现，性能优异。

## 功能特性

- ✅ 下拉刷新
- ✅ 下滑加载更多
- ✅ 基于wxs技术，性能优异
- ✅ 支持自定义样式和文字
- ✅ 支持刷新和加载状态管理
- ✅ 支持多平台（微信小程序、H5、APP等）

## 基本用法

```vue
<template>
  <u-paging 
    :hasRefresh="true" 
    :hasLoadMore="true"
    @onRefresh="handleRefresh"
    @onLoadMore="handleLoadMore"
  >
    <view v-for="(item, index) in list" :key="index" class="list-item">
      <text>{{ item.title }}</text>
    </view>
  </u-paging>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      page: 1
    }
  },
  methods: {
    // 下拉刷新
    async handleRefresh(callback) {
      try {
        // 重新加载第一页数据
        const data = await this.loadData(1)
        this.list = data
        this.page = 2
        callback(true) // 刷新成功
      } catch (error) {
        callback(false) // 刷新失败
      }
    },
    
    // 下滑加载更多
    async handleLoadMore(callback) {
      try {
        const data = await this.loadData(this.page)
        this.list = [...this.list, ...data]
        this.page++
        callback(true) // 还有更多数据
      } catch (error) {
        callback(false) // 没有更多数据或加载失败
      }
    },
    
    // 加载数据
    async loadData(page) {
      // 你的API请求逻辑
      return []
    }
  }
}
</script>
```

## API

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| hasRefresh | Boolean | false | 是否启用下拉刷新 |
| hasLoadMore | Boolean | false | 是否启用下滑加载更多 |
| refreshDistance | Number | 90 | 下拉刷新触发距离（px） |
| loadMoreDistance | Number | 50 | 距离底部多少px时触发加载更多 |
| beforRefreshText | String | '下拉刷新' | 下拉刷新前文字 |
| releaseRefreshText | String | '松开刷新' | 释放刷新文字 |
| isRefreshingText | String | '刷新中...' | 刷新中文字 |
| successRefreshText | String | '刷新成功' | 刷新成功文字 |
| failRefreshText | String | '刷新失败' | 刷新失败文字 |
| completeRefreshText | String | '刷新完毕' | 刷新完成文字 |
| loadMoreText | String | '加载更多...' | 加载更多文字 |
| noMoreText | String | '没有更多数据了' | 没有更多数据文字 |
| refreshTextColor | String | '#666' | 刷新文字颜色 |
| refreshTextFontSize | String | '25rpx' | 刷新文字大小 |
| loadMoreTextColor | String | '#666' | 加载更多文字颜色 |
| loadMoreTextFontSize | String | '25rpx' | 加载更多文字大小 |
| noMoreTextColor | String | '#999' | 没有更多数据文字颜色 |
| noMoreTextFontSize | String | '25rpx' | 没有更多数据文字大小 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| onRefresh | 下拉刷新触发 | callback(success) - success: 是否刷新成功 |
| onLoadMore | 下滑加载更多触发 | callback(hasMore) - hasMore: 是否还有更多数据 |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| resetLoadMoreState | 重置加载更多状态 | - |
| resetRefreshState | 重置刷新状态 | - |

## 刷新状态说明

刷新状态分为6个阶段：

1. **状态1**: 下拉刷新 - 用户开始下拉
2. **状态2**: 释放刷新 - 达到触发距离，提示释放
3. **状态3**: 刷新中 - 正在执行刷新逻辑
4. **状态4**: 刷新成功 - 刷新成功
5. **状态5**: 刷新失败 - 刷新失败
6. **状态6**: 刷新完成 - 刷新完成，回到初始状态

## 注意事项

1. 组件基于wxs技术实现，确保在支持的平台上使用
2. 下拉刷新和下滑加载更多可以独立启用
3. 回调函数必须调用以通知组件操作完成
4. 建议在数据加载完成后调用回调函数

## 示例

完整的使用示例请参考 `example.vue` 文件。 