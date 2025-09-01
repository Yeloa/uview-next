
export function isValidUrl(url) {
    return isOnlineUrl(url) || isDataUrl(url);
}

export function isOnlineUrl(url) {
    return /(ht|f)tp(s?):\/\/([^ \\/]*\.)+[^ \\/]*(:[0-9]+)?\/?/.test(url);
}

export function isDataUrl(url) {
    return /data:image\/(\w+);base64,(.*)/.test(url);
}

/**
 * 深度对比两个对象是否一致
 * from: https://github.com/epoberezkin/fast-deep-equal
 * @param  {Object} a 对象a
 * @param  {Object} b 对象b
 * @return {Boolean}   是否相同
 */
/* eslint-disable */
export function equal(a, b) {
    if (a === b) {
        return true;
    }
    if (a && b && typeof a == 'object' && typeof b == 'object') {
        var arrA = Array.isArray(a);
        var arrB = Array.isArray(b);
        var i;
        var length;
        var key;
        if (arrA && arrB) {
            length = a.length;
            if (length != b.length) {
                return false;
            }
            for (i = length; i-- !== 0; ) {
                if (!equal(a[i], b[i])) {
                    return false;
                }
            }
            return true;
        }
        if (arrA != arrB) {
            return false;
        }
        var dateA = a instanceof Date;
        var dateB = b instanceof Date;
        if (dateA != dateB) {
            return false;
        }
        if (dateA && dateB) {
            return a.getTime() == b.getTime();
        }
        var regexpA = a instanceof RegExp;
        var regexpB = b instanceof RegExp;
        if (regexpA != regexpB) {
            return false;
        }
        if (regexpA && regexpB) {
            return a.toString() == b.toString();
        }
        var keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) {
            return false;
        }
        for (i = length; i-- !== 0; ) {
            if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
                return false;
            }
        }
        for (i = length; i-- !== 0; ) {
            key = keys[i];
            if (!equal(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }
    return a !== a && b !== b;
}

/**
 * 简单的四则运算计算函数
 * @param {String} expression 数学表达式字符串
 * @return {Number} 计算结果
 */
export function calc(expression) {
    try {
        // 移除所有空格
        expression = expression.replace(/\s/g, '');
        
        // 简单的四则运算实现
        const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/|\(|\))/g) || [];
        const output = [];
        const operators = [];
        
        const precedence = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2
        };
        
        for (let token of tokens) {
            if (/\d/.test(token)) {
                output.push(parseFloat(token));
            } else if (token === '(') {
                operators.push(token);
            } else if (token === ')') {
                while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                    output.push(operators.pop());
                }
                if (operators.length > 0 && operators[operators.length - 1] === '(') {
                    operators.pop();
                }
            } else if (['+', '-', '*', '/'].includes(token)) {
                while (operators.length > 0 && 
                       operators[operators.length - 1] !== '(' && 
                       precedence[operators[operators.length - 1]] >= precedence[token]) {
                    output.push(operators.pop());
                }
                operators.push(token);
            }
        }
        
        while (operators.length > 0) {
            output.push(operators.pop());
        }
        
        // 计算后缀表达式
        const stack = [];
        for (let token of output) {
            if (typeof token === 'number') {
                stack.push(token);
            } else {
                const b = stack.pop();
                const a = stack.pop();
                switch (token) {
                    case '+': stack.push(a + b); break;
                    case '-': stack.push(a - b); break;
                    case '*': stack.push(a * b); break;
                    case '/': stack.push(a / b); break;
                }
            }
        }
        
        return stack[0] || 0;
    } catch (error) {
        console.error('Calc error:', error);
        return 0;
    }
}

/**
 * 将带单位的字符串转换为像素值
 * @param {String} origin 原始字符串，支持 rpx、px、% 单位和 calc() 表达式
 * @param {Number} screenK 屏幕比例，默认为 0.5
 * @param {Number} scale 缩放比例，默认为 1
 * @param {Number} baseSize 当设置了 % 号时，设置的基准值
 * @param {Object} viewRect 视图矩形信息，用于 calc() 表达式中的属性引用
 * @return {Number} 转换后的像素值
 */
export function toPx(origin, screenK = 0.5, scale = 1, baseSize = 0, viewRect = {}) {

    const REG = /-?[0-9]+(\.[0-9]+)?(rpx|px|%)/;
    
    const parsePx = (origin) => {
        const results = new RegExp(REG).exec(origin);
        if (!origin || !results) {
            return origin;
        }

        const unit = results[2];
        const value = parseFloat(origin);
        let res = 0;

        if (unit === 'rpx' || unit === 'px') {
            res = Math.round(value * (screenK || 0.5) * (scale || 1));
        } else if (unit === '%') {
            res = Math.round((value * baseSize) / 100);
        }

        return res;
    };

    const formula = /^calc\((.+)\)$/.exec(origin);
    if (formula && formula[1]) {
        // 进行 calc 计算
        const afterOne = formula[1].replace(
            /([^\s\(\+\-\*\/]+)\.(left|right|bottom|top|width|height)/g, 
            (word) => {
                const [id, attr] = word.split('.');
                return viewRect[id][attr] || 0;
            }
        );
        const afterTwo = afterOne.replace(new RegExp(REG, 'g'), parsePx);
        return calc(afterTwo);
    } else {
        return parsePx(origin);
    }
}