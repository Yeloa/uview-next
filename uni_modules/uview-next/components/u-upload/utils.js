// #ifdef H5
function compressImageForH5(options) {
    return new Promise((resolve, reject) => {
        const {
            src,
            quality = 0.8,
            width = 'auto',
            height = 'auto',
            compressedWidth,
            compressedHeight
        } = options;

        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = function() {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // 计算压缩后的尺寸
                let targetWidth = img.width;
                let targetHeight = img.height;
                
                // 优先使用 compressedWidth 和 compressedHeight
                if (compressedWidth && compressedHeight) {
                    targetWidth = compressedWidth;
                    targetHeight = compressedHeight;
                } else if (compressedWidth) {
                    targetWidth = compressedWidth;
                    targetHeight = (img.height * compressedWidth) / img.width;
                } else if (compressedHeight) {
                    targetHeight = compressedHeight;
                    targetWidth = (img.width * compressedHeight) / img.height;
                } else {
                    // 处理 width 和 height 参数
                    if (width !== 'auto') {
                        if (width.includes('px')) {
                            targetWidth = parseInt(width);
                        } else if (width.includes('%')) {
                            targetWidth = img.width * (parseInt(width) / 100);
                        }
                    }
                    
                    if (height !== 'auto') {
                        if (height.includes('px')) {
                            targetHeight = parseInt(height);
                        } else if (height.includes('%')) {
                            targetHeight = img.height * (parseInt(height) / 100);
                        }
                    }
                    
                    // 如果只设置了一个维度，等比缩放
                    if (width !== 'auto' && height === 'auto') {
                        targetHeight = (img.height * targetWidth) / img.width;
                    } else if (height !== 'auto' && width === 'auto') {
                        targetWidth = (img.width * targetHeight) / img.height;
                    }
                }
                
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                
                // 绘制压缩后的图片
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
                
                // 转换为 blob
                canvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        resolve(url);
                    } else {
                        reject(new Error('图片压缩失败'));
                    }
                }, 'image/jpeg', quality);
                
            } catch (error) {
                reject(error);
            }
        };
        
        img.onerror = function() {
            reject(new Error('图片加载失败'));
        };
        
        img.src = src;
    });
}
// #endif

function pickExclude(obj, keys) {
	// 某些情况下，type可能会为
    if (!['[object Object]', '[object File]'].includes(Object.prototype.toString.call(obj))) {
        return {}
    }
    return Object.keys(obj).reduce((prev, key) => {
        if (!keys.includes(key)) {
            prev[key] = obj[key]
        }
        return prev
    }, {})
}

async function compressImages(config, files) {
   
    if( config === false){
        return files;
    }

    for(let i = 0; i < files.length; i++) {
        let tempFilePath;

        // #ifndef H5
        const result = await uni.compressImage({
            ...config,
            src: files[i].url
        });
        tempFilePath = result.tempFilePath;
        // #endif

        // #ifdef H5
        tempFilePath = await compressImageForH5({
            ...config,
            src: files[i].url
        });
        // #endif

        files[i].url = tempFilePath;
        files[i].thumb = tempFilePath;
    }
   
    return files;
}

function formatImage(res) {
    return res.tempFiles.map((item) => ({
        ...pickExclude(item, ['path']),
        type: 'image',
        url: item.path,
        thumb: item.path,
		size: item.size,
		// #ifdef H5
		name: item.name
		// #endif
    }))
}

function formatVideo(res) {
    return [
        {
            ...pickExclude(res, ['tempFilePath', 'thumbTempFilePath', 'errMsg']),
            type: 'video',
            url: res.tempFilePath,
            thumb: res.thumbTempFilePath,
			size: res.size,
			// #ifdef H5
			name: res.name
			// #endif
        }
    ]
}

function formatMedia(res) {
    return res.tempFiles.map((item) => ({
        ...pickExclude(item, ['fileType', 'thumbTempFilePath', 'tempFilePath']),
        type: res.type,
        url: item.tempFilePath,
        thumb: res.type === 'video' ? item.thumbTempFilePath : item.tempFilePath,
		size: item.size
    }))
}

function formatFile(res) {
    return res.tempFiles.map((item) => ({ 
		...pickExclude(item, ['path']), 
		url: item.path, 
		size:item.size,
		// #ifdef H5
		name: item.name,
		type: item.type
		// #endif 
	}))
}
export function chooseFile({
    accept,
    multiple,
    capture,
    compressed,
    compressImage,
    maxDuration,
    sizeType,
    camera,
    maxCount
}) {
    return new Promise((resolve, reject) => {
        
        switch (accept) {
        case 'image':
            uni.chooseImage({
                count: multiple ? Math.min(maxCount, 9) : 1,
                sourceType: capture,
                sizeType,
                success: (res) => resolve(compressImages(compressImage,formatImage(res))),
                fail: reject
            })
            break
            // #ifdef MP-WEIXIN
            // 只有微信小程序才支持chooseMedia接口
        case 'media':
            wx.chooseMedia({
                count: multiple ? Math.min(maxCount, 9) : 1,
                sourceType: capture,
                maxDuration,
                sizeType,
                camera,
                success: (res) => resolve(formatMedia(res)),
                fail: reject
            })
            break
            // #endif
        case 'video':
            uni.chooseVideo({
                sourceType: capture,
                compressed,
                maxDuration,
                camera,
                success: (res) => resolve(formatVideo(res)),
                fail: reject
            })
            break
            // #ifdef MP-WEIXIN || H5
            // 只有微信小程序才支持chooseMessageFile接口
        case 'file':
            // #ifdef MP-WEIXIN
            wx.chooseMessageFile({
                count: multiple ? maxCount : 1,
                type: accept,
                success: (res) => resolve(formatFile(res)),
                fail: reject
            })
            // #endif
            // #ifdef H5
            // 需要hx2.9.9以上才支持uni.chooseFile
            uni.chooseFile({
                count: multiple ? maxCount : 1,
                type: accept,
                success: (res) => resolve(formatFile(res)),
                fail: reject
            })
            // #endif
            break
				// #endif
		default: 
			// 此为保底选项，在accept不为上面任意一项的时候选取全部文件
			// #ifdef MP-WEIXIN
			wx.chooseMessageFile({
			    count: multiple ? maxCount : 1,
			    type: 'all',
			    success: (res) => resolve(formatFile(res)),
			    fail: reject
			})
			// #endif
			// #ifdef H5
			// 需要hx2.9.9以上才支持uni.chooseFile
			uni.chooseFile({
				count: multiple ? maxCount : 1,
				type: 'all',
				success: (res) => resolve(formatFile(res)),
				fail: reject
			})
			// #endif
        }
    })
}
