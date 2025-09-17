<template>
    <view class="u-page">
        <card title="基本绘制">
            <view class="canvas-container">
                <u-canvas :width="300" :height="200" ref="basicCanvas"></u-canvas>
                <view class="button-group">
                    <u-button type="primary" size="small" @click="drawBasicShapes">绘制基本图形</u-button>
                    <u-button type="success" size="small" @click="clearCanvas">清空画布</u-button>
                </view>
            </view>
        </card>

        <card title="文字绘制">
            <view class="canvas-container">
                <u-canvas :width="300" :height="200" ref="textCanvas"></u-canvas>
                <view class="button-group">
                    <u-button type="primary" size="small" @click="drawText">绘制文字</u-button>
                    <u-button type="success" size="small" @click="clearTextCanvas">清空画布</u-button>
                </view>
            </view>
        </card>


        <card title="图表绘制">
            <view class="canvas-container">
                <u-canvas :width="300" :height="200" ref="chartCanvas"></u-canvas>
                <view class="button-group">
                    <u-button type="primary" size="small" @click="drawChart">绘制柱状图</u-button>
                    <u-button type="info" size="small" @click="drawPieChart">绘制饼图</u-button>
                </view>
            </view>
        </card>

        <card title="图片处理">
            <view class="canvas-container">
                <u-canvas :width="300" :height="200" ref="imageCanvas"></u-canvas>
                <view class="button-group">
                    <u-button type="primary" size="small" @click="drawImage">绘制图片</u-button>
                    <u-button type="success" size="small" @click="exportImage">导出图片</u-button>
                </view>
            </view>
        </card>
    </view>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        onLoad() {
            this.$nextTick(() => {
                this.drawImage();
                this.drawChart();
                this.drawPieChart();
                this.drawText();
                this.drawBasicShapes();
            });
        },
        methods: {
            // 绘制基本图形
            async drawBasicShapes() {
                const canvasContext = await this.$refs.basicCanvas.getCanvasContext();
                const { canvas } = canvasContext;
                
                // 绘制矩形
                canvas.fillStyle = '#ff6b6b';
                canvas.fillRect(20, 20, 80, 60);
                
                // 绘制描边矩形
                canvas.strokeStyle = '#4ecdc4';
                canvas.lineWidth = 3;
                canvas.strokeRect(120, 20, 80, 60);
                
                // 绘制圆形
                canvas.fillStyle = '#45b7d1';
                canvas.beginPath();
                canvas.arc(60, 120, 30, 0, 2 * Math.PI);
                canvas.fill();
                
                // 绘制线条
                canvas.strokeStyle = '#f9ca24';
                canvas.lineWidth = 4;
                canvas.beginPath();
                canvas.moveTo(120, 120);
                canvas.lineTo(200, 120);
                canvas.lineTo(160, 160);
                canvas.closePath();
                canvas.stroke();
                
                canvas.draw();
            },
            
            // 清空基本画布
            async clearCanvas() {
                const canvasContext = await this.$refs.basicCanvas.getCanvasContext();
                const { canvas, width, height } = canvasContext;
                canvas.clearRect(0, 0, width, height);
                canvas.draw();
            },
            
            // 绘制文字
            async drawText() {
                const canvasContext = await this.$refs.textCanvas.getCanvasContext();
                const { canvas } = canvasContext;
                
                // 设置字体样式
                canvas.font = '20px Arial';
                canvas.fillStyle = '#333';
                canvas.textAlign = 'center';
                canvas.textBaseline = 'middle';
                
                // 绘制填充文字
                canvas.fillText('Hello uView Canvas', 150, 50);
                
                // 绘制描边文字
                canvas.strokeStyle = '#ff6b6b';
                canvas.lineWidth = 2;
                canvas.strokeText('Stroke Text', 150, 100);
                
                // 设置阴影
                canvas.shadowColor = 'rgba(0,0,0,0.3)';
                canvas.shadowBlur = 8;
                canvas.shadowOffsetX = 2;
                canvas.shadowOffsetY = 2;
                canvas.fillStyle = '#4ecdc4';
                canvas.fillText('Shadow Text', 150, 150);
                
                canvas.draw();
            },
            
            // 清空文字画布
            async clearTextCanvas() {
                const canvasContext = await this.$refs.textCanvas.getCanvasContext();
                const { canvas, width, height } = canvasContext;
                canvas.clearRect(0, 0, width, height);
                canvas.draw();
            },
            
            
            // 绘制柱状图
            async drawChart() {
                const canvasContext = await this.$refs.chartCanvas.getCanvasContext();
                const { canvas, width, height } = canvasContext;
                
                const data = [60, 80, 45, 90, 70];
                const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
                const barWidth = 30;
                const barSpacing = 20;
                const startX = 30;
                const maxHeight = 120;
                
                // 清空画布
                canvas.clearRect(0, 0, width, height);
                
                // 绘制柱状图
                data.forEach((value, index) => {
                    const barHeight = (value / 100) * maxHeight;
                    const x = startX + index * (barWidth + barSpacing);
                    const y = height - 30 - barHeight;
                    
                    canvas.fillStyle = colors[index];
                    canvas.fillRect(x, y, barWidth, barHeight);
                    
                    // 绘制数值标签
                    canvas.fillStyle = '#333';
                    canvas.font = '12px Arial';
                    canvas.textAlign = 'center';
                    canvas.fillText(value.toString(), x + barWidth / 2, y - 5);
                });
                
                canvas.draw();
            },
            
            // 绘制饼图
            async drawPieChart() {
                const canvasContext = await this.$refs.chartCanvas.getCanvasContext();
                const { canvas, width, height } = canvasContext;
                
                const data = [30, 25, 20, 15, 10];
                const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
                const centerX = width / 2;
                const centerY = height / 2;
                const radius = 60;
                
                // 清空画布
                canvas.clearRect(0, 0, width, height);
                
                let currentAngle = -Math.PI / 2; // 从顶部开始
                
                data.forEach((value, index) => {
                    const sliceAngle = (value / 100) * 2 * Math.PI;
                    
                    // 绘制扇形
                    canvas.fillStyle = colors[index];
                    canvas.beginPath();
                    canvas.moveTo(centerX, centerY);
                    canvas.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
                    canvas.closePath();
                    canvas.fill();
                    
                    // 绘制标签
                    const labelAngle = currentAngle + sliceAngle / 2;
                    const labelX = centerX + Math.cos(labelAngle) * (radius + 20);
                    const labelY = centerY + Math.sin(labelAngle) * (radius + 20);
                    
                    canvas.fillStyle = '#333';
                    canvas.font = '12px Arial';
                    canvas.textAlign = 'center';
                    canvas.fillText(`${value}%`, labelX, labelY);
                    
                    currentAngle += sliceAngle;
                });
                
                canvas.draw();
            },
            
            // 绘制图片
            async drawImage() {
                const canvasContext = await this.$refs.imageCanvas.getCanvasContext();
                const { canvas, width, height } = canvasContext;
                
                // 清空画布
                canvas.clearRect(0, 0, width, height);
                
                // 绘制真实图片
                const imageUrl = 'https://uview.d3u.cn/web/static/uview/common/50c02fb7gy1i0vn1f8mbuj20qo13eal2.jpg';
                canvas.drawImage(imageUrl, 27, 0, 246, 364);
                
                canvas.draw();
            },
            
            // 导出图片
            async exportImage() {
                try {
                    const tempFilePath = await this.$refs.imageCanvas.canvasToTempFilePath({
                        width: 300,
                        height: 200,
                    });
                    
                    uni.showToast({
                        title: '图片导出成功',
                        icon: 'success'
                    });
                    console.log('图片保存路径:', tempFilePath);
                } catch (error) {
                    console.error('导出失败:', error);
                    uni.showToast({
                        title: '导出失败',
                        icon: 'error'
                    });
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
.canvas-container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.button-group {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
