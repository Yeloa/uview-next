/**
 * 求两个颜色之间的渐变值
 * @param {string} startColor 开始的颜色
 * @param {string} endColor 结束的颜色
 * @param {number} step 颜色等分的份额
 * */
function colorGradient(startColor = 'rgb(0, 0, 0)', endColor = 'rgb(255, 255, 255)', step = 10) {
    const startRGB = hexToRgb(startColor, false) // 转换为rgb数组模式
    const startR = startRGB[0]
    const startG = startRGB[1]
    const startB = startRGB[2]

    const endRGB = hexToRgb(endColor, false)
    const endR = endRGB[0]
    const endG = endRGB[1]
    const endB = endRGB[2]

    const sR = (endR - startR) / step // 总差值
    const sG = (endG - startG) / step
    const sB = (endB - startB) / step
    const colorArr = []
    for (let i = 0; i < step; i++) {
        // 计算每一步的hex值
        let hex = rgbToHex(`rgb(${Math.round((sR * i + startR))},${Math.round((sG * i + startG))},${Math.round((sB
			* i + startB))})`)
        // 确保第一个颜色值为startColor的值
        if (i === 0) hex = rgbToHex(startColor)
        // 确保最后一个颜色值为endColor的值
        if (i === step - 1) hex = rgbToHex(endColor)
        colorArr.push(hex)
    }
    return colorArr
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor, str = true) {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    sColor = String(sColor).toLowerCase()
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = '#'
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
            }
            sColor = sColorNew
        }
        // 处理六位的颜色值
        const sColorChange = []
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`))
        }
        if (!str) {
            return sColorChange
        }
        return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`
    } if (/^(rgb|RGB)/.test(sColor)) {
        const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
        return arr.map((val) => Number(val))
    }
    return sColor
}

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
    const _this = rgb
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    if (/^(rgb|RGB)/.test(_this)) {
        const aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
        let strHex = '#'
        for (let i = 0; i < aColor.length; i++) {
            let hex = Number(aColor[i]).toString(16)
            hex = String(hex).length == 1 ? `${0}${hex}` : hex // 保证每个rgb的值为2位
            if (hex === '0') {
                hex += hex
            }
            strHex += hex
        }
        if (strHex.length !== 7) {
            strHex = _this
        }
        return strHex
    } if (reg.test(_this)) {
        const aNum = _this.replace(/#/, '').split('')
        if (aNum.length === 6) {
            return _this
        } if (aNum.length === 3) {
            let numHex = '#'
            for (let i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i])
            }
            return numHex
        }
    } else {
        return _this
    }
}

/**
* JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
* sHex为传入的十六进制的色值
* alpha为rgba的透明度
*/
function colorToRgba(color, alpha) {
    color = rgbToHex(color)
    // 十六进制颜色值的正则表达式
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    /* 16进制颜色转为RGB格式 */
    let sColor = String(color).toLowerCase()
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = '#'
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
            }
            sColor = sColorNew
        }
        // 处理六位的颜色值
        const sColorChange = []
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`))
        }
        // return sColorChange.join(',')
        return `rgba(${sColorChange.join(',')},${alpha})`
    }

    return sColor
}

/**
 * 将颜色暗化指定比例
 * @param {string} color 原始颜色值（支持十六进制和rgb格式）
 * @param {number} factor 暗化因子，范围0-1，0表示不暗化，1表示完全暗化
 * @returns {string} 暗化后的十六进制颜色值
 */
function darkenColor(color, factor = 0.1) {
    try {
        // 处理颜色值，支持带#和不带#的十六进制
        let hexColor = color.trim()
        if (!hexColor.startsWith('#')) {
            hexColor = '#' + hexColor
        }
        
        // 确保是6位十六进制
        if (hexColor.length === 4) {
            // 处理3位十六进制 #fff -> #ffffff
            hexColor = '#' + hexColor[1] + hexColor[1] + hexColor[2] + hexColor[2] + hexColor[3] + hexColor[3]
        }
        
        // 验证颜色格式
        if (!/^#[0-9A-Fa-f]{6}$/.test(hexColor)) {
            console.warn('Invalid color format:', color)
            return '#e4e7ed' // 默认边框色
        }
        
        // 将十六进制颜色转换为RGB
        const hex = hexColor.substring(1)
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)
        
        // 计算较深的颜色（减少亮度）
        const newR = Math.max(0, Math.floor(r * (1 - factor)))
        const newG = Math.max(0, Math.floor(g * (1 - factor)))
        const newB = Math.max(0, Math.floor(b * (1 - factor)))
        
        // 转换回十六进制
        const toHex = (n) => {
            const hex = n.toString(16)
            return hex.length === 1 ? '0' + hex : hex
        }
        
        return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`
    } catch (error) {
        console.warn('Error darkening color:', error)
        return '#e4e7ed' // 默认边框色
    }
}

export default {
    colorGradient,
    hexToRgb,
    rgbToHex,
    colorToRgba,
    darkenColor
}
