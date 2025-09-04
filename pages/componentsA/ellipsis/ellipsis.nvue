<template>
	<view class="u-page">
		<card title="基础使用">
			<u-ellipsis 
				content="这是一段很长的文本内容，用来演示省略号组件的基本功能。当文本超出指定行数时，会自动显示省略号。"
			/>
		</card>

		<card title="展开收起">
			<u-ellipsis 
				expand-text="展开"
				collapse-text="收起"
				content="这是一段很长的文本内容，用来演示省略号组件的展开收起功能。当文本超出指定行数时，会自动显示省略号，点击展开按钮可以查看完整内容，点击收起按钮可以重新收起。支持自定义展开和收起的文本内容。"
				:rows="2"
			/>
		</card>
		
		<card title="头部省略">
			<u-ellipsis 
				content="这是一段很长的文本内容，用来演示省略号组件的头部省略功能。当direction设置为start时，会从头部开始省略文本。"
				:rows="2"
				direction="start"
				expand-text="展开"
				collapse-text="收起"
			/>
		</card>

		<card title="中间省略">
			<u-ellipsis 
				content="这是一段很长的文本内容，用来演示省略号组件的中间省略功能。当direction设置为middle时，会从中间开始省略文本，保留头部和尾部的内容。"
				:rows="2"
				direction="middle"
				expand-text="展开"
				collapse-text="收起"
			/>
		</card>

		<card title="自定义省略符号">
			<u-ellipsis 
				content="这是一段很长的文本内容，用来演示省略号组件的自定义省略符号功能。可以通过symbol属性自定义省略符号。"
				:rows="2"
				symbol="***"
				expand-text="查看更多"
				collapse-text="收起"
			/>
		</card>

		<card title="自定义样式">
			<u-ellipsis 
				content="这是一段很长的文本内容，用来演示省略号组件的自定义样式功能。可以自定义文本颜色、字体大小、行高等样式属性。"
				:rows="3"
				color="#666666"
				:font-size="16"
				:line-height="24"
				action-color="#ff6b6b"
				expand-text="展开"
				collapse-text="收起"
			/>
		</card>

		<card title="点击事件">
			<u-ellipsis 
				content="这是一段支持点击事件的文本内容，点击文本会触发click事件。"
				:rows="1"
				expand-text="展开"
				collapse-text="收起"
				@change="onExpandChange"
			/>
		</card>

		<card title="长文本测试">
			<u-ellipsis 
				:content="longText"
				:rows="4"
				expand-text="展开全部"
				collapse-text="收起"
			/>
		</card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longText: '这是一段非常长的文本内容，用来测试省略号组件在处理大量文本时的性能和效果。文本内容包含多个段落和丰富的信息，可以用来验证组件的各种功能特性。在实际项目中，我们经常需要处理这样的长文本内容，比如文章摘要、产品描述、用户评论等。省略号组件可以帮助我们优化页面布局，提升用户体验。用户可以根据需要选择是否查看完整内容，这样既节省了页面空间，又保持了良好的可读性。组件支持多种省略方式，包括尾部省略、头部省略和中间省略，可以满足不同场景的需求。同时，组件还提供了丰富的自定义选项，开发者可以根据项目需要调整样式和行为。'
			}
		},
		methods: {
			onExpandChange(type) {
				uni.$u.toast('展开状态变化:' + type.expanded)
				console.log('展开状态变化:', type)
			}
		}
	}
</script>