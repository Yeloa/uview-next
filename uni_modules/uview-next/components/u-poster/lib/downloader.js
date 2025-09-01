
import { isValidUrl, isOnlineUrl, isDataUrl } from './util';

function transformBase64File(base64data) {
    return new Promise((resolve, reject) => {
        const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
        if (!format) {
            console.error('base parse failed');
            reject();
            return;
        }
        
        const path = `${uni.env.USER_DATA_PATH}/temp_${Date.now()}.${format}`;
        const buffer = uni.base64ToArrayBuffer(bodyData.replace(/[\r\n]/g, ''));
        
        uni.getFileSystemManager().writeFile({
            filePath: path,
            data: buffer,
            encoding: 'binary',
            success() {
                resolve(path);
            },
            fail(err) {
                console.log(err);
                reject(err);
            }
        });
    });
}

function downloadFile(url) {
    return new Promise((resolve, reject) => {
        uni.downloadFile({
            url: url,
            success: function (res) {
                if (res.statusCode !== 200) {
                    console.error(`downloadFile ${url} failed res.statusCode is not 200`);
                    reject();
                    return;
                }
                resolve(res.tempFilePath);
            },
            fail: function (error) {
                console.error(`downloadFile failed, ${JSON.stringify(error)} `);
                reject();
            }
        });
    });
}

/**
 * 下载文件
 * @param {String} url 文件的 url
 */
 export function download(url) {
    return new Promise((resolve, reject) => {
        if (!(url && isValidUrl(url))) {
            resolve(url);
            return;
        }
        
        if (isOnlineUrl(url)) {
            downloadFile(url).then(
                (path) => {
                    resolve(path);
                },
                () => {
                    reject();
                }
            );
        } else if (isDataUrl(url)) {
            transformBase64File(url).then(
                (path) => {
                    resolve(path);
                },
                () => {
                    reject();
                }
            );
        } else {
            resolve(url);
        }
    });
}
