<template>
    <view
        class="u-signature"
        :style="[containerStyle, $u.addStyle(customStyle)]"
        @touchmove.prevent.stop
        @wheel.prevent.stop
    >
		<view v-if="showTitle" class="u-signature__title" :class="[{'u-signature__title-fixed': fixed}]">
            <slot name="title">
                {{ title }}
            </slot>
        </view>

		<view class="u-signature__canvas">
			<canvas
				:type="type"
				:canvas-id="canvasId" 
				:id="canvasId" 
				:style="canvasStyle"
				:class="['u-signature__canvas']" 
				:disable-scroll="disableScroll"
				@touchstart="onCanvasTouchStart" 
				@touchmove="onCanvasTouchMove"
				@touchend="onCanvasTouchEnd" 
				@touchcancel="onCanvasTouchCancel" >
			</canvas>
		</view>

		<view v-if="showToolbar" 
            class="u-signature__toolbar" 
            :class="[{'u-signature__toolbar-fixed': fixed}]"
            :style="[$u.addStyle(toolbarStyle)]"
        >
            <slot name="toolbar">
                <view class="u-signature__toolbar-left">
                    <view v-if="showColorList" class="u-signature__toolbar-item">
                        <view class="u-signature__toolbar-color-list">
                            <view
                                v-for="(item, index) in penColorList"
                                :key="index"
                                class="u-signature__toolbar-color"
                                :style="[
                                    {
                                        backgroundColor: penColorInner === item ? 'transparent' : item,
                                        borderColor: item,
                                    },
                                ]"
                                @click="handlePenColor(item)"
                            ></view>
                        </view>
                    </view>
                </view>
                <view class="u-signature__toolbar-right">
                    <view class="u-signature__toolbar-item">
                        <u-button
                            size="small"
                            type="info"
                            icon="trash"
                            @click="handleClear"
                        >
                            {{ clearText }}
                        </u-button>
                    </view>
                    <view class="u-signature__toolbar-item">
                        <u-button
                            size="small"
                            type="info"
                            icon="back"
                            @click="handleUndo"
                        >
                            {{ undoText }}
                        </u-button>
                    </view>
                    <view class="u-signature__toolbar-item">
                        <u-button
                            size="small"
                            type="primary"
                            @click="handleConfirm"
                        >
                            {{ confirmText }}
                        </u-button>
                    </view>
                </view>
            </slot>
        </view>
    </view>
</template>

<script>
    import props from './props.js';
    import mixin from '../../libs/mixin/mixin';
    import mpMixin from '../../libs/mixin/mpMixin';

    /**
     * Signature 签名组件
     * @description 可用于业务签名等场景
     * @tutorial https://uveiw.bdxmz.cn/components/signature.html
     *
     * @property {Number}			penSize         画笔大小  （默认 2 ）
     * @property {Number}			minLineWidth    线条最小宽度  （默认 2 ）
     * @property {Number}			maxLineWidth    线条最大宽度  （默认 6 ）
     * @property {String}			penColor        画笔颜色  （默认 'black' ）
     * @property {String}			backgroundColor 背景颜色  （默认 '' ）
     * @property {String}			type            canvas类型  （默认 '2d' ）
     * @property {Boolean}			openSmooth      是否开启压感  （默认 false ）
     * @property {Number}			maxHistoryLength 最大历史记录数  （默认 20 ）
     * @property {Boolean}			landscape       是否横屏  （默认 false ）
     * @property {Boolean}			disableScroll   是否禁用滚动  （默认 true ）
     * @property {Boolean}			disabled        是否禁用  （默认 false ）
     * @property {Boolean}			boundingBox     只生成内容区域  （默认 false ）
     * @property {Object}			customStyle     自定义样式
     * @event    {Function}        undo            撤销方法
     * @event    {Function}        clear           清空方法
     * @event    {Function}        getImage        保存方法
     * @example  <u-signature :penColor="penColor" :penSize="penSize" ref="signatureRef"></u-signature>
     */

    let canvasObj = {};

    export default {
        name: 'u-signature',
        mixins: [mpMixin, mixin, props],
        data() {
            return {
                canvasId: 'signatureId_' + uni.$u.guid(),
                ctx: null,
                canvas: null,
                canvasWidth: 0,
                canvasHeight: 0,
                isDrawing: false,
                lastPoint: null,
                currentStroke: [],
                history: [],
                isEmpty: true,
                velocityFilterWeight: 0.7,
                minVelocity: 0.25,
                currentVelocity: 0,
                lastTimestamp: 0,
				penColorInner: ''
            };
        },
        computed: {
            is2d() {
                // #ifdef MP-WEIXIN
                return this.type == '2d';
                // #endif
                // #ifndef MP-WEIXIN
                return false;
                // #endif
            },
            containerStyle() {
                const style = {
                    width: '100%',
                    height: '100%',
                };
                return style;
            },
            canvasStyle() {
                const style = {
                    width: '100%',
                    height: '100%',
                    display: 'block',
                };

                if (
                    this.backgroundColor &&
                    this.backgroundColor !== 'transparent'
                ) {
                    style.backgroundColor = this.backgroundColor;
                }

                return style;
            },
        },
		watch: {
			penColor: {
				immediate: true,
				handler(newVal) {
					this.penColorInner = newVal;
				},
			}
		},
        mounted() {
            this.init();
        },
        // #ifdef VUE3
        emits: ['clear', 'undo', 'confirm'],
        // #endif
        methods: {
            async init() {
                await this.$nextTick();

                const query = uni
                    .createSelectorQuery()
                    .in(this)
                    .select(`#${this.canvasId}`);

                if (this.is2d) {
                    let canvas = await new Promise((resolve) => {
                        query
                            .fields({
                                node: true,
                                size: true,
                            })
                            .exec((res) => {
                                this.canvasWidth = parseInt(res[0].width);
                                this.canvasHeight = parseInt(res[0].height);
                                resolve(res[0].node);
                            });
                    });

                    canvas.width = this.canvasWidth;
                    canvas.height = this.canvasHeight;
                    this.ctx = canvas.getContext('2d');
                    canvasObj[this.canvasId] = canvas;
                } else {
                    // 传统 canvas 模式
                    // #ifdef MP-ALIPAY
                    this.ctx = uni.createCanvasContext(this.canvasId);
                    // #endif
                    // #ifndef MP-ALIPAY
                    this.ctx = uni.createCanvasContext(this.canvasId, this);
                    // #endif

                    await new Promise((resolve) => {
                        query
                            .boundingClientRect((data) => {
                                this.canvasWidth = parseInt(data.width);
                                this.canvasHeight = parseInt(data.height);
                                resolve();
                            })
                            .exec();
                    });
                }

                // 设置画笔样式
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.strokeStyle = this.penColorInner;
                this.ctx.lineWidth = this.penSize;

                // 绘制背景和水印
                this.drawBackgroundAndWatermark();
            },

            // 开始绘制
            onCanvasTouchStart(e) {
                if (this.disabled) return;

                const touch = e.touches[0];
                const point = this.getTouchPoint(touch);

                this.isDrawing = true;
                this.lastPoint = point;
                this.currentStroke = [point];
                this.lastTimestamp = Date.now();
                this.currentVelocity = 0;
            },

            // 绘制中
            onCanvasTouchMove(e) {
                if (this.disabled || !this.isDrawing) return;

                const touch = e.touches[0];
                const point = this.getTouchPoint(touch);
                const now = Date.now();

                // 计算速度（用于压感）
                if (this.openSmooth && this.lastPoint) {
                    const distance = this.getDistance(this.lastPoint, point);
                    const timeDelta = now - this.lastTimestamp;
                    const velocity = distance / timeDelta;

                    this.currentVelocity =
                        this.velocityFilterWeight * velocity +
                        (1 - this.velocityFilterWeight) * this.currentVelocity;
                }

                this.drawLine(this.lastPoint, point);
                this.lastPoint = point;
                this.currentStroke.push(point);
                this.lastTimestamp = now;
                this.isEmpty = false;
            },

            // 结束绘制
            onCanvasTouchEnd(e) {
                if (this.disabled || !this.isDrawing) return;

                this.isDrawing = false;

                // 保存到历史记录
                if (this.currentStroke.length > 0) {
                    this.saveToHistory();
                }
            },

            // 取消绘制
            onCanvasTouchCancel(e) {
                this.onCanvasTouchEnd(e);
            },

            // 获取触摸点坐标
            getTouchPoint(touch) {
                return {
                    x: touch.x,
                    y: touch.y,
                    timestamp: Date.now(),
                };
            },

            // 绘制线条
            drawLine(from, to) {
                if (!this.ctx || !from || !to) return;

                let lineWidth = this.penSize;

                // 压感效果
                if (this.openSmooth) {
                    const velocity = Math.max(
                        this.currentVelocity,
                        this.minVelocity,
                    );
                    lineWidth = Math.max(
                        this.minLineWidth,
                        Math.min(this.maxLineWidth, this.penSize / velocity),
                    );
                }

                this.ctx.beginPath();
                this.ctx.moveTo(from.x, from.y);
                this.ctx.lineTo(to.x, to.y);
                this.ctx.strokeStyle = this.penColorInner;
                this.ctx.lineWidth = lineWidth;
                this.ctx.stroke();

                if (!this.is2d) {
                    this.ctx.draw(true);
                }
            },

            // 计算两点距离
            getDistance(p1, p2) {
                return Math.sqrt(
                    Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2),
                );
            },

            // 绘制水印
            drawWatermark() {
                if (!this.ctx || !this.watermark.text) return;

                const ctx = this.ctx;
                const text = this.watermark.text;
                const fontSize = parseInt(this.watermark.fontSize);
                const fontFamily = this.watermark.fontFamily;
                const color = this.watermark.color;
                const rotate = this.watermark.rotate;
                const spacing = this.watermark.spacing;

                // 设置水印样式
                ctx.font = `${fontSize}px ${fontFamily}`;
                ctx.fillStyle = color;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // 计算文本尺寸
                const textMetrics = ctx.measureText(text);
                const textWidth = textMetrics.width;
                const textHeight = fontSize;

                if (this.watermark.single) {
                    // 绘制单个居中水印
                    const centerX = this.canvasWidth / 2;
                    const centerY = this.canvasHeight / 2;

                    ctx.save();
                    ctx.translate(centerX, centerY);
                    ctx.rotate((rotate * Math.PI) / 180);
                    ctx.fillText(text, 0, 0);
                    ctx.restore();
                } else {
                    // 绘制网格水印
                    const cols = Math.ceil(this.canvasWidth / spacing) + 1;
                    const rows = Math.ceil(this.canvasHeight / spacing) + 1;

                    // 绘制水印网格
                    for (let row = 0; row < rows; row++) {
                        for (let col = 0; col < cols; col++) {
                            const x = col * spacing;
                            const y = row * spacing;

                            ctx.save();
                            ctx.translate(x, y);
                            ctx.rotate((rotate * Math.PI) / 180);
                            ctx.fillText(text, 0, 0);
                            ctx.restore();
                        }
                    }
                }

                // 对于非2d canvas，需要调用draw方法
                if (!this.is2d) {
                    ctx.draw(true);
                }
            },

            // 重绘历史记录
            redrawHistory() {
                if (!this.ctx || !this.history.length) return;

                this.history.forEach((item) => {
                    if (item.stroke && item.stroke.length > 1) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(item.stroke[0].x, item.stroke[0].y);

                        for (let i = 1; i < item.stroke.length; i++) {
                            this.ctx.lineTo(item.stroke[i].x, item.stroke[i].y);
                        }

                        this.ctx.strokeStyle = this.penColorInner;
                        this.ctx.lineWidth = this.penSize;
                        this.ctx.stroke();
                    }
                });
            },

            // 清空画布并设置背景
            clearCanvas() {
                if (!this.ctx) return;

                // 清空画布
                this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

                // 重新设置背景色
                if (
                    this.backgroundColor &&
                    this.backgroundColor !== 'transparent'
                ) {
                    this.ctx.fillStyle = this.backgroundColor;
                    this.ctx.fillRect(
                        0,
                        0,
                        this.canvasWidth,
                        this.canvasHeight,
                    );
                }
            },

            // 绘制背景和水印
            drawBackgroundAndWatermark() {
                this.clearCanvas();
                
                // 重新绘制水印
                if (this.showWatermark && this.watermark.text) {
                    this.drawWatermark();
                }
            },

            // 恢复水印
            restoreWatermark() {
                if (!this.ctx) return;

                // 绘制背景和水印
                this.drawBackgroundAndWatermark();

                // 重绘所有笔画
                this.redrawHistory();

                // 对于非2d canvas，需要调用draw方法
                if (!this.is2d) {
                    this.ctx.draw(true);
                }
            },

            // 保存到历史记录
            saveToHistory() {
                if (this.maxHistoryLength <= 0) return;

                const imageData = {
                    stroke: [...this.currentStroke],
                    timestamp: Date.now(),
                };

                this.history.push(imageData);

                // 限制历史记录数量
                if (this.history.length > this.maxHistoryLength) {
                    this.history.shift();
                }

                this.currentStroke = [];
            },

			handlePenColor(color){
				this.penColorInner = color;
				this.ctx.strokeStyle = color;
			},
            handleClear(){
                this.clear();
                this.$emit('clear');
            },
            handleUndo(){
                this.undo();
                this.$emit('undo');
            },
            handleConfirm(){
				this.getImage().then(res => {
					this.$emit('confirm', res);
				});
			},
            // 撤销
            undo() {
                if (this.history.length === 0) return;
                this.history.pop();
                this.redrawFromHistory();
            },

            // 重做（从历史记录重绘）
            redrawFromHistory() {
                if (!this.ctx) return;

                // 绘制背景和水印
                this.drawBackgroundAndWatermark();

                // 重绘所有笔画
                this.redrawHistory();

                // 对于非2d canvas，需要调用draw方法
                if (!this.is2d) {
                    this.ctx.draw(true);
                }

                this.isEmpty = this.history.length === 0;
            },

            // 清空
            clear() {
                if (!this.ctx) return;

                // 绘制背景和水印
                this.drawBackgroundAndWatermark();

                //对于非2d canvas，需要调用draw方法
                if (!this.is2d) {
                    this.ctx.draw(true);
                }

                this.history = [];
                this.currentStroke = [];
                this.isEmpty = true;

                // 触发清空事件
                this.$emit('clear');
            },


            // 导出图片
            getImage() {
                return new Promise((resolve, reject) => {
                    if (this.isEmpty) {
                        uni.showToast({
                            title: '签名板为空',
                            icon: 'none',
                        });
                        reject('签名板为空');
                        return;
                    }

                    // 如果保存时不显示水印，需要临时隐藏水印
                    let needRestoreWatermark = false;
                    if (this.showWatermark && !this.watermark.showOnSave) {
                        needRestoreWatermark = true;
                        // 临时隐藏水印，只绘制背景和笔画
                        this.clearCanvas();
                        this.redrawHistory();

                        // 对于非2d canvas，需要调用draw方法
                        if (!this.is2d) {
                            this.ctx.draw(true);
                        }
                    }

                    let params = {
                        canvas: canvasObj[this.canvasId],
                        canvasId: this.canvasId,
                        width: this.canvasWidth,
                        height: this.canvasHeight,
                        fileType: this.fileType,
                        quality: this.quality,
                        success: (res) => {
                            if (needRestoreWatermark) {
                                this.restoreWatermark();
                            }
                            resolve(res.tempFilePath);
                        },
                        fail: (err) => {
                            if (needRestoreWatermark) {
                                this.restoreWatermark();
                            }
                            reject(err);
                        },
                    };

                    // 处理boundingBox
                    if (this.boundingBox) {
                        params.x = 0;
                        params.y = 0;
                    }

                    // #ifdef MP-ALIPAY
                    uni.canvasToTempFilePath(params);
                    // #endif
                    // #ifndef MP-ALIPAY
                    uni.canvasToTempFilePath(params, this);
                    // #endif
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import '../../libs/css/components.scss';

    .u-signature {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
		display: flex;
		flex-direction: column;

		&__title{
			text-align: center;
			font-size: 15px;
			color: #333;
			padding: 10px;
			z-index: 9999;

            &-fixed{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                z-index: 9999;
                background-color: rgba(255, 255, 255, 0.8);
            }
		}

        &__canvas {
            width: 100%;
            display: block;
            touch-action: none;
			flex: 1;
        }

        &__toolbar {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 10px;

            &-fixed{
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 9999;
                background-color: rgba(255, 255, 255, 0.8);
            }

            &-color-list{
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            &-color{
                width: 10px;
                height: 10px;
                border-radius: 100px;
                margin: 0 3px;
                border: 6px solid #fff;
				box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
            }

			&-color_active{
				border: 2px solid #000;
			}

            &-left {
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            &-right {
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            &-item {
                margin-right: 10px;
            }

            &-item:last-child {
                margin-right: 0;
            }
        }
    }
</style>
