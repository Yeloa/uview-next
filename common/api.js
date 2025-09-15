import { http } from '@/uni_modules/uview-next';

export const fetchTest = () => http.get('https://httpbin.org/get')
export const uploadFile = (data) => http.upload('https://uview.d3u.cn/upload.php', data)