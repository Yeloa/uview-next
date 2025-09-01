<template>
    <view class="u-page">
        <u-poster :palette="palette" :width="375"></u-poster>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                imgUrl: '',
                palette: {},
			}
        },
		onLoad() {
			this.palette = {
				width: '375px',
				height: '500px',
				background: '#fdbb2d',
				views: [
					{
						type: 'text',
						text: '￥60.59',
						style: {
							width: '180px',
							height: '20px',
							top: '367px',
							left: '120px',
							background: 'transparent',
							borderColor: 'transparent',
							zindex: 1,
							color: '#888',
							fontSize: '18px',
							textDecoration: 'linethrough',
							fontFamily: 'Arial',
						},
					},
					{
						type: 'rect',
						style: {
							width: '356px',
							height: '473px',
							top: '11px',
							left: '8px',
							background: '#fff',
							borderRadius: '10px',
							zindex: 1,
							color: '#fff',
						},
					},
					{
						type: 'text',
						text: '￥',
						style: {
							width: '180px',
							height: '20px',
							top: '367px',
							left: '32px',
							background: 'transparent',
							borderColor: 'transparent',
							zindex: 5,
							color: '#f00',
							fontSize: '18px',
							fontFamily: 'Arial',
						},
					},
					{
						type: 'text',
						text: '49',
						style: {
							width: '180px',
							height: '31px',
							top: '360px',
							left: '52px',
							background: 'transparent',
							borderColor: 'transparent',
							zindex: 10,
							color: '#f00',
							fontSize: '28px',
							fontFamily: 'Arial',
						},
					},
					{
						type: 'text',
						text: '.99',
						style: {
							width: '180px',
							height: '20px',
							top: '368px',
							left: '87px',
							background: 'transparent',
							borderColor: 'transparent',
							zindex: 10,
							color: '#f00',
							fontSize: '18px',
							fontFamily: 'Arial',
						},
					},
					{
						type: 'image',
						url: 'https://img20.360buyimg.com/jdcms/s480x480_jfs/t1/234533/3/36568/214409/67d7da40F3d017a82/842a9f77bc14485c.jpg',
						style: {
							width: '321px',
							height: '321px',
							top: '30px',
							left: '25px',
							borderColor: 'transparent',
							borderRadius: '10px',
							zindex: 10,
							mode: 'scaleToFill',
						},
					},
					{
						type: 'text',
						text: '吕梁野山坡 沙棘原浆原液 100%沙棘汁  20ml*15袋（新老包装随机发货）',
						style: {
							width: '252px',
							height: '59px',
							top: '404px',
							left: '24px',
							background: 'transparent',
							borderColor: 'transparent',
							zindex: 11,
							color: '#000000',
							fontSize: '18px',
							lineHeight: 1.5,
							maxLines: 2,
							fontFamily: 'Arial',
						},
					},
					{
						type: 'qrcode',
						content: 'undefined',
						style: {
							width: '58px',
							height: '58px',
							top: '404px',
							left: '286px',
							background: '#ffffff',
							color: '#000000',
							zindex: 100,
						},
					},
				]
			}
		},
        methods: {
            success(path) {}
        },
    };
</script>

<style lang="scss"></style>
