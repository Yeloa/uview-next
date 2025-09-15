<template>
	<view class="u-page">
		<card title="基础功能">
			<u-collapse @change="change" @close="close" @open="open">
				<u-collapse-item title="文档指南" name="Docs guide">
					<text class="u-collapse-content">涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川</text>
				</u-collapse-item>
				<u-collapse-item title="组件全面" name="Variety components">
					<text class="u-collapse-content">众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用</text>
				</u-collapse-item>
				<u-collapse-item title="众多利器" name="Numerous tools">
					<text class="u-collapse-content">众多的贴心小工具，是您开发过程中召之即来的利器，让您飞镖在手，百步穿杨</text>
				</u-collapse-item>
			</u-collapse>
		</card>
		<card title="展开和禁用">
			<u-collapse :value="['2']">
				<u-collapse-item title="文档指南">
					<text class="u-collapse-content">涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川</text>
				</u-collapse-item>
				<u-collapse-item disabled title="组件全面">
					<text class="u-collapse-content">众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用</text>
				</u-collapse-item>
				<u-collapse-item name="2" title="众多利器">
					<text class="u-collapse-content">众多的贴心小工具，是您开发过程中召之即来的利器，让您飞镖在手，百步穿杨</text>
				</u-collapse-item>
			</u-collapse>
		</card>
		<card title="手风琴模式">
			<u-collapse accordion>
				<u-collapse-item title="文档指南">
					<text class="u-collapse-content">涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川</text>
				</u-collapse-item>
				<u-collapse-item title="组件全面">
					<text class="u-collapse-content">众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用</text>
				</u-collapse-item>
				<u-collapse-item title="众多利器">
					<text class="u-collapse-content">众多的贴心小工具，是您开发过程中召之即来的利器，让您飞镖在手，百步穿杨</text>
				</u-collapse-item>
			</u-collapse>
		</card>
		<card title="移除下划线">
			<u-collapse accordion :border="false">
				<u-collapse-item title="文档指南">
					<text class="u-collapse-content">涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川</text>
				</u-collapse-item>
				<u-collapse-item title="组件全面">
					<text class="u-collapse-content">众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用</text>
				</u-collapse-item>
				<u-collapse-item title="众多利器">
					<text class="u-collapse-content">众多的贴心小工具，是您开发过程中召之即来的利器，让您飞镖在手，百步穿杨</text>
				</u-collapse-item>
			</u-collapse>
		</card>
		<!-- 微信小程序不支持，因为微信中不支持 <slot name="title" slot="title" />的写法 -->
		<!-- #ifndef MP-WEIXIN -->
		<card title="自定义标题和内容">
			<u-collapse accordion>
				<u-collapse-item>
					<template #title>
						<text class="u-page__item__title__slot-title">文档指南</text>
					</template>
					<text class="u-collapse-content">涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川</text>
				</u-collapse-item>
				<!-- <u-collapse-item
					:isLink="false"
				>
					<text slot="title" class="u-page__item__title__slot-title">文档指南</text>
					<text class="u-collapse-content">涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川</text>
				</u-collapse-item> -->
				<u-collapse-item title="组件全面">
					<template #icon>
						<u-icon name="tags-fill" size="20"></u-icon>
					</template>
					<text class="u-collapse-content">众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用</text>
				</u-collapse-item>
				<u-collapse-item title="众多利器">
					<text slot="value" class="u-page__item__title__slot-title">自定义内容</text>
					<text class="u-collapse-content">众多的贴心小工具，是您开发过程中召之即来的利器，让您飞镖在手，百步穿杨</text>
				</u-collapse-item>
			</u-collapse>
		</card>
		<!-- #endif -->
	</view>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	methods: {
		open(e) {
			// console.log('open', e)
		},
		close(e) {
			// console.log('close', e)
		},
		change(e) {
			// console.log('change', e)
		}
	}
}
</script>
