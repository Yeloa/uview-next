import Uni from '@dcloudio/vite-plugin-uni'
import UniKuRoot from '@uni-ku/root'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    // 若存在改变 pages.json 的插件，请将 UniKuRoot 放置其后
    UniKuRoot(),
    Uni()
  ]
})