/* eslint-disable */
// 当ctx传入当前文件，const grd = ctx.createCircularGradient() 和
// const grd = this.ctx.createLinearGradient() 无效，因此只能分开处理
// 先分析，在外部创建grd，再传入使用就可以

/**
 * 分析渐变字符串，提取颜色和百分比
 * @param {string} string - 渐变字符串
 * @returns {object} 包含colors和percents的对象
 */
function analizeGrad(string) {
    const colorPercents = string.substring(0, string.length - 1).split('%,');
    const colors = [];
    const percents = [];
    for (let colorPercent of colorPercents) {
        colors.push(colorPercent.substring(0, colorPercent.lastIndexOf(' ')).trim());
        percents.push(colorPercent.substring(colorPercent.lastIndexOf(' '), colorPercent.length) / 100);
    }
    return {
        colors: colors,
        percents: percents
    };
}

/**
 * 分析线性渐变的方向参数
 * @param {string} bg - 渐变背景字符串
 * @param {number} width - 宽度
 * @param {number} height - 高度
 * @returns {Array} 坐标数组
 */
function analizeLinear(bg, width, height) {
    const direction = bg.match(/([-]?\d{1,3})deg/);
    const dir = direction && direction[1] ? parseFloat(direction[1]) : 0;
    let coordinate;
    
    switch (dir) {
        case 0:
            coordinate = [0, -height / 2, 0, height / 2];
            break;
        case 90:
            coordinate = [width / 2, 0, -width / 2, 0];
            break;
        case -90:
            coordinate = [-width / 2, 0, width / 2, 0];
            break;
        case 180:
            coordinate = [0, height / 2, 0, -height / 2];
            break;
        case -180:
            coordinate = [0, -height / 2, 0, height / 2];
            break;
        default:
            let x1 = 0;
            let y1 = 0;
            let x2 = 0;
            let y2 = 0;
            if (direction[1] > 0 && direction[1] < 90) {
                x1 =
                    width / 2 -
                    (((width / 2) * Math.tan(((90 - direction[1]) * Math.PI * 2) / 360) - height / 2) * Math.sin((2 * (90 - direction[1]) * Math.PI * 2) / 360)) / 2;
                y2 = Math.tan(((90 - direction[1]) * Math.PI * 2) / 360) * x1;
                x2 = -x1;
                y1 = -y2;
            } else if (direction[1] > -180 && direction[1] < -90) {
                x1 =
                    -(width / 2) +
                    (((width / 2) * Math.tan(((90 - direction[1]) * Math.PI * 2) / 360) - height / 2) * Math.sin((2 * (90 - direction[1]) * Math.PI * 2) / 360)) / 2;
                y2 = Math.tan(((90 - direction[1]) * Math.PI * 2) / 360) * x1;
                x2 = -x1;
                y1 = -y2;
            } else if (direction[1] > 90 && direction[1] < 180) {
                x1 =
                    width / 2 +
                    ((-(width / 2) * Math.tan(((90 - direction[1]) * Math.PI * 2) / 360) - height / 2) * Math.sin((2 * (90 - direction[1]) * Math.PI * 2) / 360)) / 2;
                y2 = Math.tan(((90 - direction[1]) * Math.PI * 2) / 360) * x1;
                x2 = -x1;
                y1 = -y2;
            } else {
                x1 =
                    -(width / 2) -
                    ((-(width / 2) * Math.tan(((90 - direction[1]) * Math.PI * 2) / 360) - height / 2) * Math.sin((2 * (90 - direction[1]) * Math.PI * 2) / 360)) / 2;
                y2 = Math.tan(((90 - direction[1]) * Math.PI * 2) / 360) * x1;
                x2 = -x1;
                y1 = -y2;
            }
            coordinate = [x1, y1, x2, y2];
            break;
    }
    return coordinate;
}

/**
 * 创建径向渐变效果
 * @param {number} width - 宽度
 * @param {number} height - 高度
 * @param {string} bg - 渐变背景字符串
 * @param {CanvasRenderingContext2D} ctx - Canvas上下文
 */
function radialEffect(width, height, bg, ctx) {
    const colorPer = analizeGrad(bg.match(/radial-gradient\((.+)\)/)[1]);
    const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, width < height ? height / 2 : width / 2);
    for (let i = 0; i < colorPer.colors.length; i++) {
        grd.addColorStop(colorPer.percents[i], colorPer.colors[i]);
    }
    ctx.fillStyle = grd;
    //ctx.fillRect(-(width / 2), -(height / 2), width, height);
}

/**
 * 创建线性渐变效果
 * @param {number} width - 宽度
 * @param {number} height - 高度
 * @param {string} bg - 渐变背景字符串
 * @param {CanvasRenderingContext2D} ctx - Canvas上下文
 */
function linearEffect(width, height, bg, ctx) {
    const param = analizeLinear(bg, width, height);
    const grd = ctx.createLinearGradient(param[0], param[1], param[2], param[3]);
    const content = bg.match(/linear-gradient\((.+)\)/)[1];
    const colorPer = analizeGrad(content.substring(content.indexOf(',') + 1));
    for (let i = 0; i < colorPer.colors.length; i++) {
        grd.addColorStop(colorPer.percents[i], colorPer.colors[i]);
    }
    ctx.fillStyle = grd;
    //ctx.fillRect(-(width / 2), -(height / 2), width, height);
}

/**
 * 判断是否为渐变背景
 * @param {string} bg - 背景字符串
 * @returns {boolean} 是否为渐变
 */
export function isGradient(bg) {
    if (bg && (bg.startsWith('linear') || bg.startsWith('radial'))) {
        return true;
    }
    return false;
}

/**
 * 执行渐变效果
 * @param {string} bg - 渐变背景字符串
 * @param {number} width - 宽度
 * @param {number} height - 高度
 * @param {CanvasRenderingContext2D} ctx - Canvas上下文
 */
export function doGradient(bg, width, height, ctx) {
    if (bg.startsWith('linear')) {
        linearEffect(width, height, bg, ctx);
    } else if (bg.startsWith('radial')) {
        radialEffect(width, height, bg, ctx);
    }
}
