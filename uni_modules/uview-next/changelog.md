## 3.2.7（2025-07-19）
1. 新增`draggable`拖拽排序组件
2. 修复`popover`组件边界计算不准确的问题
3. 修复几处语法错误导致的小程序无法上传
4. 优化`pagination`组件
5. 优化`card`组件

## 3.2.6（2025-07-18）
1. 新增`I18n国际化`功能，内置8种语言切换
2. 其他一些细节优化

## 3.2.5（2025-07-17）
1. 新增`datetimePicker`组件新增showInput属性
1. 新增`areaPicker`组件新增showInput属性
3. 修复`calendar`组件`readonly`属性错误

## 3.2.4（2025-07-16）
1. 新增`Ellipsis 文本省略`组件
2. 修复`Button`组件主题色问题

## 3.2.3（2025-07-15）
1. 新增`Fab 悬浮按钮`组件
2. 新增`upload`组件 `round` 属性，可设置圆角数值
3. 其他一些细节优化

## 3.2.2（2025-07-14）
更新文档

## 3.2.1（2025-07-14）
1. 新增`Cascader 级联选择器`组件
2. 新增`Tabs`组件使用`u-tab-item`子组件定义方式
3. 新增`Radio`组件value支持布尔值
## 3.2.0（2025-07-12）
1. 修复微信小程序 `{"es6" : false} ` 引发的报错

## 3.1.9（2025-07-11）
1. 优化示例

## 3.1.8（2025-07-11）
1. 新增`pagination`组件

## 3.1.7（2025-07-10）
1. 新增`popover`组件

## 3.1.6（2025-07-08）
1. 修复`scroll-list`组件微信小程序编译后会有警告
2. 修复`cell`组件required属性不生效的问题
3. 修复`tabs`组件index小于0时自动设置为0
4. 修复`keyboard`组件名称冲突的问题
5. 修复`datetime-picker`组件日期判断不准确的问题
6. 删除`theme.scss`中的flex
7. 其他一些修复

## 3.1.5（2025-07-07）
1. 新增`button`组件 `round` 属性，可设置圆角数值
2. 新增`modal`组件 `buttonModel` 属性，可以设置按钮样式

## 3.1.4（2025-07-06）
1. 修复vue2和vue3兼容性
2. 其他一些修复

## 3.1.3（2025-07-02）
1. 修复 vue2 引入报错
2. 新增`tag`组件增加默认 slot
3. 其他一些修复

## 3.1.2（2025-07-01）

1. 修复`tab`组件文字换行
2. 修复`readMore`组件兼容性
3. 其他一些修复

## 3.1.1（2025-07-01）

1. 新增`calendar`组件新增 shape 属性

## 3.1.0（2025-06-30）

1. 新增`calendar`组件新增日期是否被禁用的属性
2. 其他一些修复

## 3.0.9（2025-06-30）

1. 优化`$u.toast`支持关闭后回调

## 3.0.8（2025-06-30）

1. 优化`parse`组件支持解析音频
2. 新增`calendar`组件新增插入模式
3. 新增`markdown`组件用于 markdown 文档
4. 其他一些修复

## 3.0.7（2025-06-29）

1. 修改`keyboard`组件键盘自定义样式无效的问题
2. 修复`number-box`组件解决输入数字的问题，同时解决小数无法输入的问题
3. 修复`claendar`组件选择相同日期重新打开滚动定位错误问题
4. 修复`form-item`组件 marginBottom 取值问题
5. 修复`textarea`组件字数统计不限制时，会出现/-1
6. 修复`input`组件在 h5 平台设置 readonly 时 click 事件失效的问题
7. 新增`swiper-action-item`组件的 name 属性可以支持传递对象
8. 新增`input`组件增加 always-embed 属性
9. 新增`code-input`组件输入框新增 type 属性
10. 新增 test.image 函数支持判断 base64 格式的图片

## 3.0.6（2025-06-28）

1. 修复`search`在 h5 环境下的点击失效
2. 修复`number-box` focus 问题
3. 修复倒计时组件样例代码的运行错误
4. 修复`index-list`设置 customNavHeight 值问题
5. 修复`upload`组件视频无法预览问题
6. 修复`datetime-picker` 首次点击 confirm 回调无法获取最新值的问题,新增年，月选择
7. 修复`textarea`安卓微信实际输入字数超过限制问题，placeholderClass 和 placeholderStyle 不生效

## 3.0.5（2025-06-27）

1. search 组件新增右侧插槽

## 3.0.4（2025-06-27）

1. 优化 cell 组件示例

## 3.0.3（2025-06-26）

1. 优化懒加载

## 3.0.0

1. 兼容 vue3
2. 新增组件
3. 修改官方 github 大量 bug

## 2.0.38（2024-10-29）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 修复`picker`组件和`datetime-picker`组件的头条小程序循环引用问题
2. 修复`image`组件的`bgColor`属性不生效问题
3. 修复`textarea`组件部分回调事件参数丢失问题
4. 修复`input`组件部分回调事件参数丢失问题
5. `datetime-picker`组件支持`immediateChange`属性
6. 修复`datetime-picker`组件`v-model`绑定异步设置无效问题
7. 修复`popup`组件设置`duration`属性为字符串值时，遮罩的打开、关闭很缓慢问题
8. 修复`radio`参数`iconColor`属性不生效问题
9. 修复`tooltip`组件`size`属性不生效的问题
10. 修复`image`组件当`src`为空时，loading 状态问题
11. 其他一些修复

## 2.0.37（2024-03-17）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 修复表单校验`trigger`触发器参数无效问题
2. 修复`u-input`组件的`password`属性在动态切换为`false`时失效的问题
3. 添加微信小程序用户同意隐私协议事件回调
4. 修复支付宝小程序 picker 样式问题
5. `u-modal`添加`duration`字段控制动画过度时间
6. 修复`picker` `lastIndex`异常导致的`column`异常问题
7. `tabs`增加长按事件支持
8. 修复`u-avatar` `square`属性在小程序`open-data`下无效问题
9. 其他一些修复

## 2.0.36（2023-03-27）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 重构`deepClone` & `deepMerge`方法
2. 其他优化

## 2.0.34（2022-09-24）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. `u-input`、`u-textarea`增加`ignoreCompositionEvent`属性
2. 修复`route`方法调用可能报错的问题
3. 修复`u-no-network`组件`z-index`无效的问题
4. 修复`textarea`组件在 h5 上 confirmType=""报错的问题
5. `u-rate`适配`nvue`
6. 优化验证手机号码的正则表达式(根据工信部发布的《电信网编号计划（2017 年版）》进行修改。)
7. `form-item`添加`labelPosition`属性
8. `u-calendar`修复`maxDate`设置为当前日期，并且当前时间大于 08：00 时无法显示日期列表的问题 (#724)
9. `u-radio`增加一个默认插槽用于自定义修改 label 内容 (#680)
10. 修复`timeFormat`函数在 safari 重的兼容性问题 (#664)

## 2.0.33（2022-06-17）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 修复`loadmore`组件`lineColor`类型错误问题
2. 修复`u-parse`组件`imgtap`、`linktap`不生效问题

## 2.0.32（2022-06-16）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. `u-loadmore`新增自定义颜色、虚/实线
2. 修复`u-swiper-action`组件部分平台不能上下滑动的问题
3. 修复`u-list`回弹问题
4. 修复`notice-bar`组件动画在低端安卓机可能会抖动的问题
5. `u-loading-page`添加控制图标大小的属性`iconSize`
6. 修复`u-tooltip`组件`color`参数不生效的问题
7. 修复`u--input`组件使用`blur`事件输出为`undefined`的 bug
8. `u-code-input`组件新增键盘弹起时，是否自动上推页面参数`adjustPosition`
9. 修复`image`组件`load`事件无回调对象问题
10. 修复`button`组件`loadingSize`设置无效问题
11. 其他修复

## 2.0.31（2022-04-19）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 修复`upload`在`vue`页面上传成功后没有成功标志的问题
2. 解决演示项目中微信小程序模拟上传图片一直出于上传中问题
3. 修复`u-code-input`组件在`nvue`页面编译到`app`平台上光标异常问题（`app`去除此功能）
4. 修复`actionSheet`组件标题关闭按钮点击事件名称错误的问题
5. 其他修复

## 2.0.30（2022-04-04）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. `u-rate`增加`readonly`属性
2. `tabs`滑块支持设置背景图片
3. 修复`u-subsection` `mode`为`subsection`时，滑块样式不正确的问题
4. `u-code-input`添加光标效果动画
5. 修复`popup`的`open`事件不触发
6. 修复`u-flex-column`无效的问题
7. 修复`u-datetime-picker`索引在特定场合异常问题
8. 修复`u-datetime-picker`最小时间字符串模板错误问题
9. `u-swiper`添加`m3u8`验证
10. `u-swiper`修改判断 image 和 video 逻辑
11. 修复`swiper`无法使用本地图片问题，增加`type`参数
12. 修复`u-row-notice`格式错误问题
13. 修复`u-switch`组件当`unit`为`rpx`时,`nodeStyle`消失的问题
14. 修复`datetime-picker`组件`showToolbar`与`visibleItemCount`属性无效的问题
15. 修复`upload`组件条件编译位置判断错误，导致`previewImage`属性设置为`false`时，整个组件都会被隐藏的问题
16. 修复`u-checkbox-group`设置`shape`属性无效的问题
17. 修复`u-upload`的`capture`传入字符串的时候不生效的问题
18. 修复`u-action-sheet`组件，关闭事件逻辑错误的问题
19. 修复`u-list`触顶事件的触发错误的问题
20. 修复`u-text`只有手机号可拨打的问题
21. 修复`u-textarea`不能换行的问题
22. 其他修复

## 2.0.29（2022-03-13）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 修复`u--text`组件设置`decoration`属性未生效的问题
2. 修复`u-datetime-picker`使用`formatter`后返回值不正确
3. 修复`u-datetime-picker` `intercept` 可能为 undefined
4. 修复已设置单位 uni..config.unit = 'rpx'时，线型指示器 `transform` 的位置翻倍，导致指示器超出宽度
5. 修复 mixin 中 bem 方法生成的类名在支付宝和字节小程序中失效
6. 修复默认值传值为空的时候，打开`u-datetime-picker`报错，不能选中第一列时间的 bug
7. 修复`u-datetime-picker`使用`formatter`后返回值不正确
8. 修复`u-image`组件`loading`无效果的问题
9. 修复`config.unit`属性设为`rpx`时，导航栏占用高度不足导致塌陷的问题
10. 修复`u-datetime-picker`组件`itemHeight`无效问题
11. 其他修复

## 2.0.28（2022-02-22）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. search 组件新增 searchIconSize 属性
2. 兼容 Safari/Webkit 中传入时间格式如 2022-02-17 12:00:56
3. 修复 text value.js 判断日期出 format 错误问题
4. priceFormat 格式化金额出现精度错误
5. priceFormat 在部分情况下出现精度损失问题
6. 优化表单 rules 提示
7. 修复 avatar 组件 src 为空时，展示状态不对
8. 其他修复

## 2.0.27（2022-01-28）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1.样式修复

## 2.0.26（2022-01-28）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1.样式修复

## 2.0.25（2022-01-27）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 修复 text 组件 mode=price 时，可能会导致精度错误的问题
2. 添加$u.setConfig()方法，可设置 uView 内置的 config, props, zIndex, color 属性，详见：[修改 uView 内置配置方案](https://uviewui.com/components/setting.html#%E9%BB%98%E8%AE%A4%E5%8D%95%E4%BD%8D%E9%85%8D%E7%BD%AE)
3. 优化 form 组件在 errorType=toast 时，如果输入错误页面会有抖动的问题
4. 修复$u.addUnit()对配置默认单位可能无效的问题

## 2.0.24（2022-01-25）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 修复 swiper 在 current 指定非 0 时缩放有误
2. 修复 u-icon 添加 stop 属性的时候报错
3. 优化遗留的通过正则判断 rpx 单位的问题
4. 优化 Layout 布局 vue 使用 gutter 时，会超出固定区域
5. 优化 search 组件高度单位问题（rpx -> px）
6. 修复 u-image slot 加载和错误的图片失去了高度
7. 修复 u-index-list 中 footer 插槽与 header 插槽存在性判断错误
8. 修复部分机型下 u-popup 关闭时会闪烁
9. 修复 u-image 在 nvue-app 下失去宽高
10. 修复 u-popup 运行报错
11. 修复 u-tooltip 报错
12. 修复 box-sizing 在 app 下的警告
13. 修复 u-navbar 在小程序中报运行时错误
14. 其他修复

## 2.0.23（2022-01-24）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 修复 image 组件在 hx3.3.9 的 nvue 下可能会显示异常的问题
2. 修复 col 组件 gutter 参数带 rpx 单位处理不正确的问题
3. 修复 text 组件单行时无法显示省略号的问题
4. navbar 添加 titleStyle 参数
5. 升级到 hx3.3.9 可消除 nvue 下控制台样式警告的问题

## 2.0.22（2022-01-19）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. $u.page()方法优化，避免在特殊场景可能报错的问题
2. picker 组件添加 immediateChange 参数
3. 新增$u.pages()方法

## 2.0.21（2022-01-19）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 优化：form 组件在用户设置 rules 的时候提示用户 model 必传
2. 优化遗留的通过正则判断 rpx 单位的问题
3. 修复微信小程序环境中 tabbar 组件开启 safeAreaInsetBottom 属性后，placeholder 高度填充不正确
4. 修复 swiper 在 current 指定非 0 时缩放有误
5. 修复 u-icon 添加 stop 属性的时候报错
6. 修复 upload 组件在 accept=all 的时候没有作用
7. 修复在 text 组件 mode 为 phone 时 call 属性无效的问题
8. 处理 u-form clearValidate 方法
9. 其他修复

## 2.0.20（2022-01-14）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 修复 calendar 默认会选择一个日期，如果直接点确定的话，无法取到值的问题
2. 修复 Slider 缺少 disabled props 还有注释
3. 修复 u-notice-bar 点击事件无法拿到 index 索引值的问题
4. 修复 u-collapse-item 在 vue 文件下，app 端自定义插槽不生效的问题
5. 优化头像为空时显示默认头像
6. 修复图片地址赋值后判断加载状态为完成问题
7. 修复日历滚动到默认日期月份区域
8. search 组件暴露点击左边 icon 事件
9. 修复 u-form clearValidate 方法不生效
10. upload h5 端增加返回文件参数（文件的 name 参数）
11. 处理 upload 选择文件后 url 为 blob 类型无法预览的问题
12. u-code-input 修复输入框没有往左移出一半屏幕
13. 修复 Upload 上传 disabled 为 true 时，控制台报 hoverClass 类型错误
14. 临时处理 ios app 下 grid 点击坍塌问题
15. 其他修复

## 2.0.19（2021-12-29）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 优化微信小程序包体积可在微信中预览，请升级 HbuilderX3.3.4，同时在“运行->运行到小程序模拟器”中勾选“运行时是否压缩代码”
2. 优化微信小程序 setData 性能，处理某些方法如$u.route()无法在模板中使用的问题
3. navbar 添加 autoBack 参数
4. 允许 avatar 组件的事件冒泡
5. 修复 cell 组件报错问题
6. 其他修复

## 2.0.18（2021-12-28）

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 修复 app 端编译报错问题
2. 重新处理微信小程序端 setData 过大的性能问题
3. 修复边框问题
4. 修复最大最小月份不大于 0 则没有数据出现的问题
5. 修复 SwipeAction 微信小程序端无法上下滑动问题
6. 修复 input 的 placeholder 在小程序端默认显示为 true 问题
7. 修复 divider 组件 click 事件无效问题
8. 修复 u-code-input maxlength 属性值为 String 类型时显示异常
9. 修复当 grid 只有 1 到 2 时 在小程序端 algin 设置无效的问题
10. 处理 form-item 的 label 为 top 时，取消错误提示的左边距
11. 其他修复

## 2.0.17（2021-12-26）

## uView 正在参与开源中国的“年度最佳项目”评选，之前投过票的现在也可以投票，恳请同学们投一票，[点此帮助 uView](https://www.oschina.net/project/top_cn_2021/?id=583)

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 解决 HBuilderX3.3.3.20211225 版本导致的样式问题
2. calendar 日历添加 monthNum 参数
3. navbar 添加 center slot

## 2.0.16（2021-12-25）

## uView 正在参与开源中国的“年度最佳项目”评选，之前投过票的现在也可以投票，恳请同学们投一票，[点此帮助 uView](https://www.oschina.net/project/top_cn_2021/?id=583)

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 解决微信小程序 setData 性能问题
2. 修复 count-down 组件 change 事件不触发问题

## 2.0.15（2021-12-21）

## uView 正在参与开源中国的“年度最佳项目”评选，之前投过票的现在也可以投票，恳请同学们投一票，[点此帮助 uView](https://www.oschina.net/project/top_cn_2021/?id=583)

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 修复 Cell 单元格 titleWidth 无效
2. 修复 cheakbox 组件 ischecked 不更新
3. 修复 keyboard 是否显示"."按键默认值问题
4. 修复 number-keyboard 是否显示键盘的"."符号问题
5. 修复 Input 输入框 readonly 无效
6. 修复 u-avatar 导致打包 app、H5 时候报错问题
7. 修复 Upload 上传 deletable 无效
8. 修复 upload 当设置 maxSize 时无效的问题
9. 修复 tabs lineWidth 传入带单位的字符串的时候偏移量计算错误问题
10. 修复 rate 组件在有 padding 的 view 内，显示的星星位置和可触摸区域不匹配，无法正常选中星星

## 2.0.13（2021-12-14）

## [点击加群交流反馈：364463526](https://jq.qq.com/?_chanwv=1027&k=mCxS3TGY)

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 修复配置默认单位为 rpx 可能会导致自定义导航栏高度异常的问题

## 2.0.12（2021-12-14）

## [点击加群交流反馈：364463526](https://jq.qq.com/?_chanwv=1027&k=mCxS3TGY)

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 修复 tabs 组件在 vue 环境下划线消失的问题
2. 修复 upload 组件在安卓小程序无法选择视频的问题
3. 添加 uni.$u.config.unit 配置，用于配置参数默认单位，详见：[默认单位配置](https://uveiw.bdxmz.cn/components/setting.html#%E9%BB%98%E8%AE%A4%E5%8D%95%E4%BD%8D%E9%85%8D%E7%BD%AE)
4. 修复 textarea 组件在没绑定 v-model 时，字符统计不生效问题
5. 修复 nvue 下控制是否出现滚动条失效问题

## 2.0.11（2021-12-13）

## [点击加群交流反馈：364463526](https://jq.qq.com/?_chanwv=1027&k=mCxS3TGY)

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. text 组件 align 参数无效的问题
2. subsection 组件添加 keyName 参数
3. upload 组件无法判断[Object file]类型的问题
4. 处理 notify 层级过低问题
5. codeInput 组件添加 disabledDot 参数
6. 处理 actionSheet 组件 round 参数无效的问题
7. calendar 组件添加 round 参数用于控制圆角值
8. 处理 swipeAction 组件在 vue 环境下默认被打开的问题
9. button 组件的 throttleTime 节流参数无效的问题
10. 解决 u-notify 手动关闭方法 close()无效的问题
11. input 组件 readonly 不生效问题
12. tag 组件 type 参数为 info 不生效问题

## 2.0.10（2021-12-08）

## [点击加群交流反馈：364463526](https://jq.qq.com/?_chanwv=1027&k=mCxS3TGY)

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 修复 button sendMessagePath 属性不生效
2. 修复 DatetimePicker 选择器 title 无效
3. 修复 u-toast 设置 loading=true 不生效
4. 修复 u-text 金额模式传 0 报错
5. 修复 u-toast 组件的 icon 属性配置不生效
6. button 的 icon 在特殊场景下的颜色优化
7. IndexList 优化，增加#

## 2.0.9（2021-12-01）

## [点击加群交流反馈：232041042](https://jq.qq.com/?_wv=1027&k=KnbeceDU)

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 优化 swiper 的 height 支持 100%值(仅 vue 有效)，修复嵌入视频时 click 事件无法触发的问题
2. 优化 tabs 组件对 list 值为空的判断，或者动态变化 list 时重新计算相关尺寸的问题
3. 优化 datetime-picker 组件逻辑，让其后续打开的默认值为上一次的选中值，需要通过 v-model 绑定值才有效
4. 修复 upload 内嵌在其他组件中，选择图片可能不会换行的问题

## 2.0.8（2021-12-01）

## [点击加群交流反馈：232041042](https://jq.qq.com/?_wv=1027&k=KnbeceDU)

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 修复 toast 的 position 参数无效问题
2. 处理 input 在 ios nvue 上无法获得焦点的问题
3. avatar-group 组件添加 extraValue 参数，让剩余展示数量可手动控制
4. tabs 组件添加 keyName 参数用于配置从对象中读取的键名
5. 处理 text 组件名字脱敏默认配置无效的问题
6. 处理 picker 组件 item 文本太长换行问题

## 2.0.7（2021-11-30）

## [点击加群交流反馈：232041042](https://jq.qq.com/?_wv=1027&k=KnbeceDU)

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 修复 radio 和 checkbox 动态改变 v-model 无效的问题。
2. 优化 form 规则 validator 在微信小程序用法
3. 修复 backtop 组件 mode 参数在微信小程序无效的问题
4. 处理 Album 的 previewFullImage 属性无效的问题
5. 处理 u-datetime-picker 组件 mode='time'在选择改变时间时，控制台报错的问题

## 2.0.6（2021-11-27）

## [点击加群交流反馈：232041042](https://jq.qq.com/?_wv=1027&k=KnbeceDU)

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. 处理 tag 组件在 vue 下边框无效的问题。
2. 处理 popup 组件圆角参数可能无效的问题。
3. 处理 tabs 组件 lineColor 参数可能无效的问题。
4. propgress 组件在值很小时，显示异常的问题。

## 2.0.5（2021-11-25）

## [点击加群交流反馈：232041042](https://jq.qq.com/?_wv=1027&k=KnbeceDU)

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. calendar 在 vue 下显示异常问题。
2. form 组件 labelPosition 和 errorType 参数无效的问题
3. input 组件 inputAlign 无效的问题
4. 其他一些修复

## 2.0.4（2021-11-23）

## [点击加群交流反馈：232041042](https://jq.qq.com/?_wv=1027&k=KnbeceDU)

# uView2.0 重磅发布，利剑出鞘，一统江湖

0. input 组件缺失@confirm 事件，以及 subfix 和 prefix 无效问题
1. component.scss 文件样式在 vue 下干扰全局布局问题
2. 修复 subsection 在 vue 环境下表现异常的问题
3. tag 组件的 bgColor 等参数无效的问题
4. upload 组件不换行的问题
5. 其他的一些修复处理

## 2.0.3（2021-11-16）

## [点击加群交流反馈：1129077272](https://jq.qq.com/?_wv=1027&k=KnbeceDU)

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. uView2.0 已实现全面兼容 nvue
2. uView2.0 对 1.x 进行了架构重构，细节和性能都有极大提升
3. 目前 uView2.0 为公测阶段，相关细节可能会有变动
4. 我们写了一份与 1.x 的对比指南，详见[对比 1.x](https://uveiw.bdxmz.cn/components/diff1.x.html)
5. 处理 modal 的 confirm 回调事件拼写错误问题
6. 处理 input 组件@input 事件参数错误问题
7. 其他一些修复

## 2.0.2（2021-11-16）

## [点击加群交流反馈：1129077272](https://jq.qq.com/?_wv=1027&k=KnbeceDU)

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. uView2.0 已实现全面兼容 nvue
2. uView2.0 对 1.x 进行了架构重构，细节和性能都有极大提升
3. 目前 uView2.0 为公测阶段，相关细节可能会有变动
4. 我们写了一份与 1.x 的对比指南，详见[对比 1.x](https://uveiw.bdxmz.cn/components/diff1.x.html)
5. 修复 input 组件 formatter 参数缺失问题
6. 优化 loading-icon 组件的 scss 写法问题，防止不兼容新版本 scss

## 2.0.0(2020-11-15)

## [点击加群交流反馈：1129077272](https://jq.qq.com/?_wv=1027&k=KnbeceDU)

# uView2.0 重磅发布，利剑出鞘，一统江湖

1. uView2.0 已实现全面兼容 nvue
2. uView2.0 对 1.x 进行了架构重构，细节和性能都有极大提升
3. 目前 uView2.0 为公测阶段，相关细节可能会有变动
4. 我们写了一份与 1.x 的对比指南，详见[对比 1.x](https://uveiw.bdxmz.cn/components/diff1.x.html)
5. 修复 input 组件 formatter 参数缺失问题
