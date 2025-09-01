export default class WxCanvas {
    ctx;
    type;
    canvasId;
    canvasNode;
    stepList = [];
    canvasPrototype = {};
    
    constructor(type, ctx, canvasId, isNew, canvasNode) {
        this.ctx = ctx;
        this.canvasId = canvasId;
        this.type = type;
        if (isNew) {
            this.canvasNode = canvasNode || {};
        }
    }

     // 通用的属性设置器
     _setProperty(name, value) {
        this.canvasPrototype[name] = value;
        this.stepList.push({ action: name, args: value, actionType: 'set' });
    }

    // 通用的方法调用器
    _callMethod(name, ...args) {
        this.stepList.push({ action: name, args, actionType: 'func' });
    }


    // 简化的属性访问器
    get width() { return this.canvasNode?.width || 0; }
    set width(w) { if (this.canvasNode) this.canvasNode.width = w; }
    get height() { return this.canvasNode?.height || 0; }
    set height(h) { if (this.canvasNode) this.canvasNode.height = h; }
   
    // 简化的属性访问器
    get lineWidth() { return this.canvasPrototype.lineWidth; }
    set lineWidth(v) { this._setProperty('lineWidth', v); }
    
    get lineCap() { return this.canvasPrototype.lineCap; }
    set lineCap(v) { this._setProperty('lineCap', v); }
    
    get lineJoin() { return this.canvasPrototype.lineJoin; }
    set lineJoin(v) { this._setProperty('lineJoin', v); }
    
    get miterLimit() { return this.canvasPrototype.miterLimit; }
    set miterLimit(v) { this._setProperty('miterLimit', v); }
    
    get lineDashOffset() { return this.canvasPrototype.lineDashOffset; }
    set lineDashOffset(v) { this._setProperty('lineDashOffset', v); }
    
    get font() { return this.canvasPrototype.font; }
    set font(v) { this.ctx.font = v; this._setProperty('font', v); }
    
    get textAlign() { return this.canvasPrototype.textAlign; }
    set textAlign(v) { this._setProperty('textAlign', v); }
    
    get textBaseline() { return this.canvasPrototype.textBaseline; }
    set textBaseline(v) { this._setProperty('textBaseline', v); }
    
    get fillStyle() { return this.canvasPrototype.fillStyle; }
    set fillStyle(v) { this._setProperty('fillStyle', v); }
    
    get strokeStyle() { return this.canvasPrototype.strokeStyle; }
    set strokeStyle(v) { this._setProperty('strokeStyle', v); }
    
    get globalAlpha() { return this.canvasPrototype.globalAlpha; }
    set globalAlpha(v) { this._setProperty('globalAlpha', v); }
    
    get globalCompositeOperation() { return this.canvasPrototype.globalCompositeOperation; }
    set globalCompositeOperation(v) { this._setProperty('globalCompositeOperation', v); }
    
    get shadowColor() { return this.canvasPrototype.shadowColor; }
    set shadowColor(v) { this._setProperty('shadowColor', v); }
    
    get shadowOffsetX() { return this.canvasPrototype.shadowOffsetX; }
    set shadowOffsetX(v) { this._setProperty('shadowOffsetX', v); }
    
    get shadowOffsetY() { return this.canvasPrototype.shadowOffsetY; }
    set shadowOffsetY(v) { this._setProperty('shadowOffsetY', v); }
    
    get shadowBlur() { return this.canvasPrototype.shadowBlur; }
    set shadowBlur(v) { this._setProperty('shadowBlur', v); }

    // 简化的方法调用
    save() { this._callMethod('save'); }
    restore() { this._callMethod('restore'); }
    setLineDash(...args) { this.canvasPrototype.lineDash = args; this._callMethod('setLineDash', ...args); }
    moveTo(...args) { this._callMethod('moveTo', ...args); }
    closePath() { this._callMethod('closePath'); }
    lineTo(...args) { this._callMethod('lineTo', ...args); }
    quadraticCurveTo(...args) { this._callMethod('quadraticCurveTo', ...args); }
    bezierCurveTo(...args) { this._callMethod('bezierCurveTo', ...args); }
    arcTo(...args) { this._callMethod('arcTo', ...args); }
    arc(...args) { this._callMethod('arc', ...args); }
    rect(...args) { this._callMethod('rect', ...args); }
    scale(...args) { this._callMethod('scale', ...args); }
    rotate(...args) { this._callMethod('rotate', ...args); }
    translate(...args) { this._callMethod('translate', ...args); }
    transform(...args) { this._callMethod('transform', ...args); }
    setTransform(...args) { this._callMethod('setTransform', ...args); }
    clearRect(...args) { this._callMethod('clearRect', ...args); }
    fillRect(...args) { this._callMethod('fillRect', ...args); }
    strokeRect(...args) { this._callMethod('strokeRect', ...args); }
    fillText(...args) { this._callMethod('fillText', ...args); }
    strokeText(...args) { this._callMethod('strokeText', ...args); }
    beginPath() { this._callMethod('beginPath'); }
    fill() { this._callMethod('fill'); }
    stroke() { this._callMethod('stroke'); }
    drawFocusIfNeeded(...args) { this._callMethod('drawFocusIfNeeded', ...args); }
    clip() { this._callMethod('clip'); }
    isPointInPath(...args) { this._callMethod('isPointInPath', ...args); }
    drawImage(...args) { this._callMethod('drawImage', ...args); }
    addHitRegion(...args) { this._callMethod('addHitRegion', ...args); }
    removeHitRegion(...args) { this._callMethod('removeHitRegion', ...args); }
    clearHitRegions(...args) { this._callMethod('clearHitRegions', ...args); }
    putImageData(...args) { this._callMethod('putImageData', ...args); }

    // 直接返回的方法
    getLineDash() { return this.canvasPrototype.lineDash; }
    createLinearGradient(...args) { return this.ctx.createLinearGradient(...args); }
    createRadialGradient(...args) { 
        return this.type === '2d' 
            ? this.ctx.createRadialGradient(...args)
            : this.ctx.createCircularGradient(...args.slice(3, 6));
    }
    createPattern(...args) { return this.ctx.createPattern(...args); }
    measureText(...args) { return this.ctx.measureText(...args); }
    createImageData(...args) { return this.ctx.createImageData(...args); }
    getImageData(...args) { return this.ctx.getImageData(...args); }

    async draw(reserve, func) {
        const realstepList = this.stepList.slice();
        this.stepList.length = 0;
        
        if (this.type === '2d') {
            if (!reserve) {
                this.ctx.clearRect(0, 0, this.canvasNode.width, this.canvasNode.height);
            }
            if (realstepList.length > 0) {
                for (const step of realstepList) {
                    await this.implement2DStep(step);
                }
            }
            if (func) func();
        }else {
            if (realstepList.length > 0) {
                for (const step of realstepList) {
                    this.implementMinaStep(step);
                }
            }
            this.ctx.draw(reserve, func);
        }
    }

    implementMinaStep(step) {
        if (step.action === 'textAlign') {
            this.ctx.setTextAlign(step.args);
        } else if (step.action === 'textBaseline') {
            this.ctx.setTextBaseline(step.args);
        } else if (step.actionType === 'set') {
            this.ctx[step.action] = step.args;
        } else if (step.actionType === 'func') {
            step.args ? this.ctx[step.action](...step.args) : this.ctx[step.action]();
        }
    }

    implement2DStep(step) {
        return new Promise((resolve) => {
            if (step.action === 'drawImage') {
                const img = this.canvasNode.createImage();
                img.src = step.args[0];
                img.onload = () => {
                    this.ctx.drawImage(img, ...step.args.slice(1));
                    resolve(undefined);
                };
            } else {
                if (step.actionType === 'set') {
                    this.ctx[step.action] = step.args;
                } else if (step.actionType === 'func') {
                    step.args ? this.ctx[step.action](...step.args) : this.ctx[step.action]();
                }
                resolve(undefined);
            }
        });
    }
}
