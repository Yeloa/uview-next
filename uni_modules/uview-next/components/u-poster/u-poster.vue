<template>
    <view class="u-poster">
        <view class="u-poster__preview" v-if="showPreview">
            <image
                :src="previewUrl"
                class="u-poster__preview-image"
                :mode="mode"
                :style="[
                    {
                        width: $u.addUnit(width),
                        height: $u.addUnit(height),
                    },
                ]"
            />
        </view> 
        <u-canvas
            ref="canvasRef"
            :width="canvasWidth"
            :height="canvasHeight"
            :customStyle="{
                position: 'absolute',
                left: '-9999px',
                top: '-9999px',
            }"
        />
    </view>
</template>

<script>
    import Painter from './lib/painter';
    import { download } from './lib/downloader';
    import { equal, toPx } from './lib/util';
    import props from './props.js';
    import mixin from '../../libs/mixin/mixin';
    import mpMixin from '../../libs/mixin/mpMixin';

    /**
     * u-poster 海报生成器
     * @description 基于Painter(https://github.com/Kujiale-Mobile/Painter)的海报生成器，支持使用json格式配置生成各种定制化图片和二维码
     * @tutorial https://uview.d3u.cn/components/poster.html
     * @property {Boolean}			showPreview		是否显示预览
     * @property {Number}			width			预览宽度
     * @property {Number}			height			预览高度
     * @property {String}			mode			预览模式
     * @property {String}			type			画布类型
     * @property {Object}			palette			palette
     * @property {Number}			scaleRatio		缩放比
     * @property {Number}			widthPixels		宽度像素
     * @property {Boolean}			dirty			是否启用脏检查
     * @property {String}			fileType		文件类型
     * @property {Number}			quality			质量
     *
     * @event {Function} success 图片生成成功时触发
     * @event {Function} error 图片生成失败时触发
     * @example <u-poster :palette="palette" @success="success" @error="error" />
     */

    export default {
        name: 'u-poster',
        mixins: [mpMixin, mixin, props],
        data() {
            return {
                canvasWidth: 0,
                canvasHeight: 0,
                screenK: 1,
                paintCount: 0,
                maxPaintCount: 5,
                ratioTolerance: 0.01,
                previewUrl: '',
            };
        },
        watch: {
            palette: {
                immediate: true,
                deep: true,
                handler(newVal, oldVal) {
                    if (this.isNeedRefresh(newVal, oldVal)) {
                        this.render();
                    }
                },
            },
        },
        // #ifdef VUE3
        emits: ['success', 'error'],
        // #endif
        methods: {
            isEmpty(object) {
                return !object || Object.keys(object).length === 0;
            },
            isNeedRefresh(newVal, oldVal) {
                if (
                    !newVal ||
                    this.isEmpty(newVal) ||
                    (this.dirty && equal(newVal, oldVal))
                ) {
                    return false;
                }
                return true;
            },
            //渲染
            async render(data) {
                this.paintCount = 0;

                const { pixelRatio } = uni.$u.window();

                const { width, height } = data || this.palette;

                if (!width || !height) {
                    console.error(
                        `You should set width and height correctly for painter, width: ${width}, height: ${height}`,
                    );
                    return;
                }

                if (
                    toPx(width, this.screenK, this.scaleRatio) !==
                    this.canvasWidth
                ) {
                    this.canvasWidth = toPx(
                        width,
                        this.screenK,
                        this.scaleRatio,
                    );
                }

                if (this.widthPixels) {
                    const newScreenK = this.widthPixels / this.canvasWidth;
                    this.canvasWidth = this.widthPixels;
                }

                if (
                    this.canvasHeight !==
                    toPx(height, this.screenK, this.scaleRatio)
                ) {
                    this.canvasHeight = toPx(
                        height,
                        this.screenK,
                        this.scaleRatio,
                    );
                }

                try {
                    await this.$nextTick();

                    const processedPalette = await this.downloadImages(
                        this.palette,
                    );
                    const { canvas } = await this.$refs.canvasRef.getCanvasContext();
                    const painter = new Painter(canvas, processedPalette, pixelRatio);
                    painter.draw(() => {
                        this.$refs.canvasRef.canvasToTempFilePath({
                            width: this.canvasWidth,
                            height: this.canvasHeight,
                            fileType: this.fileType,
                            quality: this.quality,
                        }).then((tempFilePath) => {
                            this.getImageInfo(tempFilePath);
                        }).catch((error) => {
                            this.$emit('error', error);
                        });
                    });
                } catch (error) {
                    this.$emit('error', error);
                }
            },

            downloadImages(palette) {
                return new Promise((resolve, reject) => {
                    const paletteCopy = JSON.parse(JSON.stringify(palette));
                    const downloadTasks = [];
                    let completedCount = 0;

                    // 预处理：转换所有尺寸单位为像素值
                    this.preprocessPalette(paletteCopy);

                    // 处理背景图片
                    if (paletteCopy.background) {
                        downloadTasks.push(
                            download(paletteCopy.background, this.lru)
                                .then((path) => {
                                    paletteCopy.background = path;
                                    completedCount++;
                                })
                                .catch(() => {
                                    completedCount++;
                                }),
                        );
                    }

                    // 处理视图中的图片
                    if (paletteCopy.views) {
                        paletteCopy.views.forEach((view) => {
                            if (view.type === 'image' && view.url) {
                                downloadTasks.push(
                                    download(view.url, this.lru)
                                        .then(async (path) => {
                                            view.originUrl = view.url;
                                            view.url = path;

                                            try {
                                                const imageInfo =
                                                    await this.getImageInfoAsync(
                                                        path,
                                                    );
                                                view.sWidth = imageInfo.width;
                                                view.sHeight = imageInfo.height;
                                            } catch (error) {
                                                console.warn(
                                                    `getImageInfo ${view.originUrl} failed:`,
                                                    error,
                                                );
                                                view.url = '';
                                            }

                                            completedCount++;
                                        })
                                        .catch(() => {
                                            completedCount++;
                                        }),
                                );
                            }
                        });
                    }

                    // 如果没有下载任务，直接返回
                    if (downloadTasks.length === 0) {
                        resolve(paletteCopy);
                    }

                    // 等待所有下载任务完成
                    Promise.allSettled(downloadTasks).then(() => {
                        resolve(paletteCopy);
                    });
                });
            },

            // 预处理palette，转换所有尺寸单位为像素值
            preprocessPalette(palette) {
                // 转换主尺寸
                ['width', 'height'].forEach((item) => {
                    palette[item] = toPx(
                        palette[item],
                        this.screenK,
                        this.scaleRatio,
                    );
                });

                if (palette.views && palette.views.length > 0) {
                    palette.views.forEach((view) => {
                        if (view.style) {
                            this.preprocessViewStyle(
                                view.style,
                                palette.width,
                                palette.height,
                            );
                        }
                    });
                }
            },

            // 预处理单个view的style
            preprocessViewStyle(style, parentWidth, parentHeight) {
                [
                    'width',
                    'height',
                    'left',
                    'right',
                    'top',
                    'bottom',
                    'fontSize',
                    'borderWidth',
                ].forEach((item) => {
                    style[item] = toPx(
                        style[item],
                        this.screenK,
                        this.scaleRatio,
                    );
                });

                // 转换边框相关属性
                if (style.borderRadius) {
                    if (Array.isArray(style.borderRadius)) {
                        style.borderRadius = style.borderRadius.map((radius) =>
                            toPx(
                                radius,
                                this.screenK,
                                this.scaleRatio,
                                Math.min(parentWidth, parentHeight),
                            ),
                        );
                    } else {
                        style.borderRadius = toPx(
                            style.borderRadius,
                            this.screenK,
                            this.scaleRatio,
                        );
                    }
                }

                ['borderRadius', 'padding'].forEach((item) => {
                    if (style[item]) {
                        let list = style[item].toString().split(/\s+/);
                        style[item] = list
                            .map((it) =>
                                toPx(it, this.screenK, this.scaleRatio),
                            )
                            .join(' ');
                    }
                });

                if (style.lineHeight) {
                    style.lineHeight = parseFloat(style.lineHeight);
                }
            },

            getImageInfoAsync(src) {
                return new Promise((resolve, reject) => {
                    uni.getImageInfo({
                        src,
                        success: resolve,
                        fail: reject,
                    });
                });
            },
            getImageInfo(filePath) {
                uni.getImageInfo({
                    src: filePath,
                    success: (infoRes) => {
                        if (this.paintCount > this.maxPaintCount) {
                            this.$emit('error', error);
                            return;
                        }

                        // 检查比例是否相符
                        const ratioDiff = Math.abs(
                            (infoRes.width * this.canvasHeight -
                                this.canvasWidth * infoRes.height) /
                                (infoRes.height * this.canvasHeight),
                        );

                        if (ratioDiff < this.ratioTolerance) {
                            this.previewUrl = filePath;
                            this.$emit('success', filePath);
                        } else {
                            this.startPaint();
                        }

                        this.paintCount++;
                    },
                    fail: (error) => {
                        this.$emit('error', error);
                    },
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .u-poster {
        position: relative;
    }
</style>
