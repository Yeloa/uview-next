import QRCode from '../../../libs/util/qrcode.js';
import { isGradient, doGradient } from './gradient.js';

export default class Painter {
	constructor(ctx, data, pixelRatio = 2) {
	    this.ctx = ctx;
		this.height = data.height
		this.width = data.width
		this.views = data.views
		this.background = data.background
        this.pixelRatio = pixelRatio;
	}
    draw(callback) {
        this.style = {
            width: this.width,
            height: this.height
        };
        this._background();
        for (const view of this.views) {
            this._drawAbsolute(view);
        }
	
        this.ctx.draw(false, () => {
            if (callback) {
                callback();
            }
        });
    }
    _background() {
        this.ctx.save();
        const { width, height } = this.style;
        const bg = this.background;
        this.ctx.translate(width / 2, height / 2);
        this._doClip(this.borderRadius, width, height);
        if (!bg) {
            // 如果未设置背景，则默认使用透明色
            this.ctx.fillStyle = 'transparent';
            this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
        } else if (bg.startsWith('#') || bg.startsWith('rgba') || bg.toLowerCase() === 'transparent') {
            // 背景填充颜色
            this.ctx.fillStyle = bg;
            this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
        } else if (isGradient(bg)) {
            doGradient(bg, width, height, this.ctx);
            this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
        } else {
            // 背景填充图片
            this.ctx.drawImage(bg, -(width / 2), -(height / 2), width, height);
        }
        this.ctx.restore();
    }
    _drawAbsolute(view) {
        if (!(view && view.type)) {
            // 过滤无效 view
            return;
        }
        // 证明 style 为数组形式，需要合并
        if (view.style && view.style.length) {
            /* eslint-disable no-param-reassign */
            view.style = Object.assign(...view.style);
        }
        switch (view.type) {
            case 'image':
                this._drawAbsImage(view);
                break;
            case 'text':
                this._fillAbsText(view);
                break;
            case 'rect':
                this._drawAbsRect(view);
                break;
            case 'qrcode':
                this._drawQRCode(view);
                break;
            default:
                break;
        }
    }
    _border({ borderRadius = 0, width, height, borderWidth = 0, borderStyle = 'solid' }) {
        let r1 = 0;
        let r2 = 0;
        let r3 = 0;
        let r4 = 0;
        const minSize = Math.min(width, height);
        if (borderRadius) {
            if (Array.isArray(borderRadius)) {
                if (borderRadius.length === 4) {
                    r1 = Math.min(borderRadius[0], width / 2, height / 2);
                    r2 = Math.min(borderRadius[1], width / 2, height / 2);
                    r3 = Math.min(borderRadius[2], width / 2, height / 2);
                    r4 = Math.min(borderRadius[3], width / 2, height / 2);
                } else {
                    r1 = r2 = r3 = r4 = Math.min(borderRadius[0] || 0, width / 2, height / 2);
                }
            } else {
                r1 = r2 = r3 = r4 = Math.min(borderRadius || 0, width / 2, height / 2);
            }
        }
        const lineWidth = borderWidth || 0;
        this.ctx.lineWidth = lineWidth;
        if (borderStyle === 'dashed') {
            this.ctx.setLineDash([(lineWidth * 4) / 3, (lineWidth * 4) / 3]);
            // this.ctx.lineDashOffset = 2 * lineWidth
        } else if (borderStyle === 'dotted') {
            this.ctx.setLineDash([lineWidth, lineWidth]);
        }
        const notSolid = borderStyle !== 'solid';
        this.ctx.beginPath();
        if (notSolid && r1 === 0) {
            this.ctx.moveTo(-width / 2 - lineWidth, -height / 2 - lineWidth / 2);
        } // 顶边虚线规避重叠规则
        if (r1 !== 0) {
            this.ctx.arc(-width / 2 + r1, -height / 2 + r1, r1 + lineWidth / 2, 1 * Math.PI, 1.5 * Math.PI);
        } //左上角圆弧
        this.ctx.lineTo(r2 === 0 ? (notSolid ? width / 2 : width / 2 + lineWidth / 2) : width / 2 - r2, -height / 2 - lineWidth / 2); // 顶边线
        if (notSolid && r2 === 0) {
            this.ctx.moveTo(width / 2 + lineWidth / 2, -height / 2 - lineWidth);
        } // 右边虚线规避重叠规则
        if (r2 !== 0) {
            this.ctx.arc(width / 2 - r2, -height / 2 + r2, r2 + lineWidth / 2, 1.5 * Math.PI, 2 * Math.PI);
        } // 右上角圆弧
        this.ctx.lineTo(width / 2 + lineWidth / 2, r3 === 0 ? (notSolid ? height / 2 : height / 2 + lineWidth / 2) : height / 2 - r3); // 右边线
        if (notSolid && r3 === 0) {
            this.ctx.moveTo(width / 2 + lineWidth, height / 2 + lineWidth / 2);
        } // 底边虚线规避重叠规则
        if (r3 !== 0) {
            this.ctx.arc(width / 2 - r3, height / 2 - r3, r3 + lineWidth / 2, 0, 0.5 * Math.PI);
        } // 右下角圆弧
        this.ctx.lineTo(r4 === 0 ? (notSolid ? -width / 2 : -width / 2 - lineWidth / 2) : -width / 2 + r4, height / 2 + lineWidth / 2); // 底边线
        if (notSolid && r4 === 0) {
            this.ctx.moveTo(-width / 2 - lineWidth / 2, height / 2 + lineWidth);
        } // 左边虚线规避重叠规则
        if (r4 !== 0) {
            this.ctx.arc(-width / 2 + r4, height / 2 - r4, r4 + lineWidth / 2, 0.5 * Math.PI, 1 * Math.PI);
        } // 左下角圆弧
        this.ctx.lineTo(-width / 2 - lineWidth / 2, r1 === 0 ? (notSolid ? -height / 2 : -height / 2 - lineWidth / 2) : -height / 2 + r1); // 左边线
        if (notSolid && r1 === 0) {
            this.ctx.moveTo(-width / 2 - lineWidth, -height / 2 - lineWidth / 2);
        } // 顶边虚线规避重叠规则
        if (!notSolid) {
            this.ctx.closePath();
        }
    }

    /**
     * 根据 borderRadius 进行裁减
     */
    _doClip(borderRadius, width, height, borderStyle) {
        if (borderRadius && width && height) {
            // 防止在某些机型上周边有黑框现象，此处如果直接设置 fillStyle 为透明，在 Android 机型上会导致被裁减的图片也变为透明， iOS 和 IDE 上不会
            // globalAlpha 在 1.9.90 起支持，低版本下无效，但把 fillStyle 设为了 white，相对默认的 black 要好点
            this.ctx.globalAlpha = 0;
            this.ctx.fillStyle = 'white';
            this._border({
                borderRadius,
                width,
                height,
                borderStyle
            });
            this.ctx.fill();
            // 在 ios 的 6.6.6 版本上 clip 有 bug，禁掉此类型上的 clip，也就意味着，在此版本微信的 ios 设备下无法使用 border 属性
            if (!(getApp().globalData.systemInfo && getApp().globalData.systemInfo.version <= '6.6.6' && getApp().globalData.systemInfo.platform === 'ios')) {
                this.ctx.clip();
            }
            this.ctx.globalAlpha = 1;
        }
    }

    /**
     * 画边框
     */
    _doBorder(view, width, height) {
        if (!view.style) {
            return;
        }
        const { borderRadius, borderWidth, borderColor, borderStyle } = view.style;
        if (!borderWidth) {
            return;
        }
        this.ctx.save();
        this._preProcess(view, true);
        this.ctx.strokeStyle = borderColor || 'black';
        this._border({
            borderRadius,
            width,
            height,
            borderWidth,
            borderStyle
        });
        this.ctx.stroke();
        this.ctx.restore();
    }
    _preProcess(view, notClip) {
        let width = 0;
        let height;
        let extra;
        const paddings = this._doPaddings(view);
        switch (view.type) {
            case 'text': {
                const textArray = String(view.text).split('\n');
                // 处理多个连续的'\n'
                for (let i = 0; i < textArray.length; ++i) {
                    if (textArray[i] === '') {
                        textArray[i] = ' ';
                    }
                }
                const fontWeight = view.style.fontWeight || '400';
                const textStyle = view.style.textStyle || 'normal';
                if (!view.style.fontSize) {
                    view.style.fontSize = 15;
                }
                this.ctx.font = `${textStyle} ${fontWeight} ${view.style.fontSize}px "${view.style.fontFamily || 'sans-serif'}"`;
                // 计算行数
                let lines = 0;
                const linesArray = [];
                for (let i = 0; i < textArray.length; ++i) {
                    const textLength = this.ctx.measureText(textArray[i]).width;
                    const minWidth = view.style.fontSize + paddings[1] + paddings[3];
                    let partWidth = view.style.width ? view.style.width - paddings[1] - paddings[3] : textLength;
                    if (partWidth < minWidth) {
                        partWidth = minWidth;
                    }
                    const calLines = Math.ceil(textLength / partWidth);
                    // 取最长的作为 width
                    width = partWidth > width ? partWidth : width;
                    lines += calLines;
                    linesArray[i] = calLines;
                }
                lines = view.style.maxLines < lines ? view.style.maxLines : lines;

                const fontSize = view.style.fontSize;
                const lineHeight = view.style.lineHeight ? fontSize * view.style.lineHeight * 1.2  : fontSize;
                height = lineHeight * lines;
                extra = {
                    lines: lines,
                    lineHeight: lineHeight,
                    textArray: textArray,
                    linesArray: linesArray
                };
                break;
            }
            case 'image': {
                // image的长宽设置成auto的逻辑处理
                const ratio = this.pixelRatio;
                // 有style却未设置width或height，则默认为auto
                if (view.style) {
                    if (!view.style.width) {
                        view.style.width = 'auto';
                    }
                    if (!view.style.height) {
                        view.style.height = 'auto';
                    }
                }
                if (!view.style || (view.style.width === 'auto' && view.style.height === 'auto')) {
                    width = Math.round(view.sWidth / ratio);
                    height = Math.round(view.sHeight / ratio);
                } else if (view.style.width === 'auto') {
                    height = view.style.height;
                    width = (view.sWidth / view.sHeight) * height;
                } else if (view.style.height === 'auto') {
                    width = view.style.width;
                    height = (view.sHeight / view.sWidth) * width;
                } else {
                    width = view.style.width;
                    height = view.style.height;
                }
                break;
            }
            default:
                if (!(view.style.width && view.style.height)) {
                    console.error('You should set width and height');
                    return;
                }
                width = view.style.width;
                height = view.style.height;
                break;
        }
        let x;
        if (view.style && view.style.right) {
            if (typeof view.style.right === 'number') {
                x = this.style.width - view.style.right;
            } else {
                // 数组方式暂不支持，使用第一个值作为right值
                const rights = view.style.right;
                x = this.style.width - rights[0];
            }
        } else if (view.style && view.style.left) {
            if (typeof view.style.left === 'number') {
                x = view.style.left;
            } else {
                // 数组方式暂不支持，使用第一个值作为left值
                const lefts = view.style.left;
                x = lefts[0];
            }
        } else {
            x = 0;
        }
        //const y = view.style && view.style.bottom ? this.style.height - height - view.style.bottom.toPx(true) : (view.style && view.style.top ? view.style.top.toPx(true) : 0);
        let y;
        if (view.style && view.style.bottom) {
            y = this.style.height - height - view.style.bottom;
        } else {
            if (view.style && view.style.top) {
                if (typeof view.style.top === 'number') {
                    y = view.style.top;
                } else {
                    // 数组方式暂不支持，使用第一个值作为top值
                    const tops = view.style.top;
                    y = tops[0];
                }
            } else {
                y = 0;
            }
        }
        const angle = view.style && view.style.rotate ? this._getAngle(view.style.rotate) : 0;
        // 当设置了 right 时，默认 align 用 right，反之用 left
        const align = view.style && view.style.align ? view.style.align : view.style && view.style.right ? 'right' : 'left';
        const verticalAlign = view.style && view.style.verticalAlign ? view.style.verticalAlign : 'top';
        // 记录绘制时的画布
        let xa = 0;
        switch (align) {
            case 'center':
                xa = x;
                break;
            case 'right':
                xa = x - width / 2;
                break;
            default:
                xa = x + width / 2;
                break;
        }
        let ya = 0;
        switch (verticalAlign) {
            case 'center':
                ya = y;
                break;
            case 'bottom':
                ya = y - height / 2;
                break;
            default:
                ya = y + height / 2;
                break;
        }
        this.ctx.translate(xa, ya);
        // 记录该 view 的有效点击区域
        // TODO ，旋转和裁剪的判断
        // 记录在真实画布上的左侧
        let left = x;
        if (align === 'center') {
            left = x - width / 2;
        } else if (align === 'right') {
            left = x - width;
        }
        var top = y;
        if (verticalAlign === 'center') {
            top = y - height / 2;
        } else if (verticalAlign === 'bottom') {
            top = y - height;
        }
        if (view.rect) {
            view.rect.left = left;
            view.rect.top = top;
            view.rect.right = left + width;
            view.rect.bottom = top + height;
            view.rect.x = view.style && view.style.right ? x - width : x;
            view.rect.y = y;
        } else {
            view.rect = {
                left: left,
                top: top,
                right: left + width,
                bottom: top + height,
                x: view.style && view.style.right ? x - width : x,
                y: y
            };
        }
        view.rect.left = view.rect.left - paddings[3];
        view.rect.top = view.rect.top - paddings[0];
        view.rect.right = view.rect.right + paddings[1];
        view.rect.bottom = view.rect.bottom + paddings[2];
        if (view.type === 'text') {
            view.rect.minWidth = view.style.fontSize + paddings[1] + paddings[3];
        }
        this.ctx.rotate(angle);
        if (!notClip && view.style && view.style.borderRadius && view.type !== 'rect') {
            this._doClip(view.style.borderRadius, width, height, view.style.borderStyle);
        }
        this._doShadow(view);
        return {
            width: width,
            height: height,
            x: x,
            y: y,
            extra: extra
        };
    }
    _doPaddings(view) {
        const { padding } = view.style ? view.style : {};
        let pd = [0, 0, 0, 0];
        if (padding) {
            if (typeof padding === 'string') {
                const pdg = padding.split(/\s+/);
                if (pdg.length === 1) {
                    const x = parseFloat(pdg[0]);
                    pd = [x, x, x, x];
                }
                if (pdg.length === 2) {
                    const x = parseFloat(pdg[0]);
                    const y = parseFloat(pdg[1]);
                    pd = [x, y, x, y];
                }
                if (pdg.length === 3) {
                    const x = parseFloat(pdg[0]);
                    const y = parseFloat(pdg[1]);
                    const z = parseFloat(pdg[2]);
                    pd = [x, y, z, y];
                }
                if (pdg.length === 4) {
                    const x = parseFloat(pdg[0]);
                    const y = parseFloat(pdg[1]);
                    const z = parseFloat(pdg[2]);
                    const a = parseFloat(pdg[3]);
                    pd = [x, y, z, a];
                }
            } else if (Array.isArray(padding)) {
                if (padding.length === 1) {
                    pd = [padding[0], padding[0], padding[0], padding[0]];
                } else if (padding.length === 2) {
                    pd = [padding[0], padding[1], padding[0], padding[1]];
                } else if (padding.length === 3) {
                    pd = [padding[0], padding[1], padding[2], padding[1]];
                } else if (padding.length === 4) {
                    pd = [padding[0], padding[1], padding[2], padding[3]];
                }
            }
        }
        return pd;
    }

    // 画文字的背景图片
    _doBackground(view) {
        this.ctx.save();
        const { width: rawWidth, height: rawHeight } = this._preProcess(view, true);
        const { background } = view.style;
        let pd = this._doPaddings(view);
        const width = rawWidth + pd[1] + pd[3];
        const height = rawHeight + pd[0] + pd[2];
        this._doClip(view.style.borderRadius, width, height, view.style.borderStyle);
        if (isGradient(background)) {
            doGradient(background, width, height, this.ctx);
        } else {
            this.ctx.fillStyle = background;
        }
        this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
        this.ctx.restore();
    }
    _drawQRCode(view) {
        this.ctx.save();
        const { width, height } = this._preProcess(view);
        new QRCode({
            canvas: this.ctx,
            text: view.content,
            size: width,
            offsetX: width / 2, 
            offsetY: height / 2,
            background: view.style.background,
            foreground: view.style.color,
            draw: false
        });
        this.ctx.restore();
        this._doBorder(view, width, height);
    }
    _drawAbsImage(view) {
        if (!view.url) {
            return;
        }
        this.ctx.save();
        const { width, height } = this._preProcess(view);
        // 获得缩放到图片大小级别的裁减框
        let rWidth = view.sWidth;
        let rHeight = view.sHeight;
        let startX = 0;
        let startY = 0;
        // 绘画区域比例
        const cp = width / height;
        // 原图比例
        const op = view.sWidth / view.sHeight;
        if (cp >= op) {
            rHeight = rWidth / cp;
            startY = Math.round((view.sHeight - rHeight) / 2);
        } else {
            rWidth = rHeight * cp;
            startX = Math.round((view.sWidth - rWidth) / 2);
        }
        if (view.style && view.style.mode === 'scaleToFill') {
            this.ctx.drawImage(view.url, -(width / 2), -(height / 2), width, height);
        } else {
            this.ctx.drawImage(view.url, startX, startY, rWidth, rHeight, -(width / 2), -(height / 2), width, height);
            view.rect.startX = startX / view.sWidth;
            view.rect.startY = startY / view.sHeight;
            view.rect.endX = (startX + rWidth) / view.sWidth;
            view.rect.endY = (startY + rHeight) / view.sHeight;
        }
        this.ctx.restore();
        this._doBorder(view, width, height);
    }
    _fillAbsText(view) {
        if (!view.text) {
            return;
        }
        if (view.style.background) {
            // 生成背景
            this._doBackground(view);
        }
        this.ctx.save();
        const { width, height, extra } = this._preProcess(view, view.style.background && view.style.borderRadius);
        this.ctx.fillStyle = view.style.color || 'black';
       
        const { lines, lineHeight, textArray, linesArray } = extra;
        // 如果设置了id，则保留 text 的长度
        if (view.id) {
            let textWidth = 0;
            for (let i = 0; i < textArray.length; ++i) {
                const _w = this.ctx.measureText(textArray[i]).width;
                textWidth = _w > textWidth ? _w : textWidth;
            }

        }
        let lineIndex = 0;
        for (let j = 0; j < textArray.length; ++j) {
            const preLineLength = Math.ceil(textArray[j].length / linesArray[j]);
            let start = 0;
            let alreadyCount = 0;
            for (let i = 0; i < linesArray[j]; ++i) {
                // 绘制行数大于最大行数，则直接跳出循环
                if (lineIndex >= lines) {
                    break;
                }
                alreadyCount = preLineLength;
                let text = textArray[j].substr(start, alreadyCount);
                let measuredWith = this.ctx.measureText(text).width;
                // 如果测量大小小于width一个字符的大小，则进行补齐，如果测量大小超出 width，则进行减除
                // 如果已经到文本末尾，也不要进行该循环
                while (start + alreadyCount <= textArray[j].length && (width - measuredWith > view.style.fontSize || measuredWith - width > view.style.fontSize)) {
                    if (measuredWith < width) {
                        text = textArray[j].substr(start, ++alreadyCount);
                    } else {
                        if (text.length <= 1) {
                            // 如果只有一个字符时，直接跳出循环
                            break;
                        }
                        text = textArray[j].substr(start, --alreadyCount);
                        // break;
                    }
                    measuredWith = this.ctx.measureText(text).width;
                }
                start += text.length;
                // 如果是最后一行了，发现还有未绘制完的内容，则加...
                if (lineIndex === lines - 1 && (j < textArray.length - 1 || start < textArray[j].length)) {
                    while (this.ctx.measureText(`${text}...`).width > width) {
                        if (text.length <= 1) {
                            // 如果只有一个字符时，直接跳出循环
                            break;
                        }
                        text = text.substring(0, text.length - 1);
                    }
                    text += '...';
                    measuredWith = this.ctx.measureText(text).width;
                }
                this.ctx.textAlign = view.style.textAlign ? view.style.textAlign : 'left';
                let x;
                let lineX;
                switch (view.style.textAlign) {
                    case 'center':
                        x = 0;
                        lineX = x - measuredWith / 2;
                        break;
                    case 'right':
                        x = width / 2;
                        lineX = x - measuredWith;
                        break;
                    default:
                        x = -(width / 2);
                        lineX = x;
                        break;
                }

                const y = -(height / 2) + (lineIndex === 0 ? view.style.fontSize : view.style.fontSize + lineIndex * lineHeight);
                lineIndex++;
                if (view.style.textStyle === 'stroke') {
                    this.ctx.strokeText(text, x, y, measuredWith);
                } else {
                    this.ctx.fillText(text, x, y, measuredWith);
                }
                const fontSize = view.style.fontSize;
                let textDecoration;
                if (view.style.textDecoration) {
                    this.ctx.lineWidth = fontSize / 13;
                    this.ctx.beginPath();
                    if (/\bunderline\b/.test(view.style.textDecoration)) {
                        this.ctx.moveTo(lineX, y);
                        this.ctx.lineTo(lineX + measuredWith, y);
                        textDecoration = {
                            moveTo: [lineX, y],
                            lineTo: [lineX + measuredWith, y]
                        };
                    }
                    if (/\boverline\b/.test(view.style.textDecoration)) {
                        this.ctx.moveTo(lineX, y - fontSize);
                        this.ctx.lineTo(lineX + measuredWith, y - fontSize);
                        textDecoration = {
                            moveTo: [lineX, y - fontSize],
                            lineTo: [lineX + measuredWith, y - fontSize]
                        };
                    }
                    if (/\bline-through\b/.test(view.style.textDecoration)) {
                        this.ctx.moveTo(lineX, y - fontSize / 3);
                        this.ctx.lineTo(lineX + measuredWith, y - fontSize / 3);
                        textDecoration = {
                            moveTo: [lineX, y - fontSize / 3],
                            lineTo: [lineX + measuredWith, y - fontSize / 3]
                        };
                    }
                    this.ctx.closePath();
                    this.ctx.strokeStyle = view.style.color;
                    this.ctx.stroke();
                }
            }
        }
    
        this.ctx.restore();
        this._doBorder(view, width, height);
    }
    _drawAbsRect(view) {
        this.ctx.save();
        const { width, height } = this._preProcess(view);
        if (isGradient(view.style.color)) {
            doGradient(view.style.color, width, height, this.ctx);
        } else {
            this.ctx.fillStyle = view.style.color;
        }
        const { borderRadius, borderStyle, borderWidth } = view.style;
        this._border({
            borderRadius,
            width,
            height,
            borderWidth,
            borderStyle
        });
        this.ctx.fill();
        this.ctx.restore();
        this._doBorder(view, width, height);
    }

    // shadow 支持 (x, y, blur, color), 不支持 spread
    // shadow:0px 0px 10px rgba(0,0,0,0.1);
    _doShadow(view) {
        if (!view.style || !view.style.shadow) {
            return;
        }
        const box = view.style.shadow.replace(/,\s+/g, ',').split(/\s+/);
        if (box.length > 4) {
            console.error("shadow don't spread option");
            return;
        }
        this.ctx.shadowOffsetX = parseInt(box[0], 10);
        this.ctx.shadowOffsetY = parseInt(box[1], 10);
        this.ctx.shadowBlur = parseInt(box[2], 10);
        this.ctx.shadowColor = box[3];
    }
    _getAngle(angle) {
        return (Number(angle) * Math.PI) / 180;
    }
}
