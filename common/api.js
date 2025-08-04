import { http } from '@/uni_modules/uview-next';

export const fetchTest = () => http.get('https://httpbin.org/get')

