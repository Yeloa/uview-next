<template>
  <view :id="attrs.id" :class="'_block _'+name+' '+attrs.class" :style="attrs.style">
    <block v-for="(n, i) in childs" v-bind:key="i">
      <!-- 图片 -->
      <!-- 占位图 -->
      <image v-if="n.name==='img'&&!n.t&&((opts[1]&&!ctrl[i])||ctrl[i]<0)" class="_img" :style="n.attrs.style" :src="ctrl[i]<0?opts[2]:opts[1]" mode="widthFix" />
      <!-- 显示图片 -->
      <!-- #ifdef H5 || (APP-PLUS && VUE2) -->
      <img v-if="n.name==='img'" :id="n.attrs.id" :class="'_img '+n.attrs.class" :style="(ctrl[i]===-1?'display:none;':'')+n.attrs.style" :src="n.attrs.src||(ctrl.load?n.attrs['data-src']:'')" :data-i="i" @load="imgLoad" @error="mediaError" @tap.stop="imgTap" @longpress="imgLongTap" />
      <!-- #endif -->
      <!-- #ifndef H5 || (APP-PLUS && VUE2) -->
      <!-- 表格中的图片，使用 rich-text 防止大小不正确 -->
      <rich-text v-if="n.name==='img'&&n.t" :style="'display:'+n.t" :nodes="[{attrs:{style:n.attrs.style||'',src:n.attrs.src},name:'img'}]" :data-i="i" @tap.stop="imgTap" />
      <!-- #endif -->
      <!-- #ifdef APP-HARMONY -->
      <image v-else-if="n.name==='img'" :id="n.attrs.id" :class="'_img '+n.attrs.class" :style="(ctrl[i]===-1?'display:none;':'')+'width:'+ctrl[i]+'px;'+n.attrs.style" :src="n.attrs.src||(ctrl.load?n.attrs['data-src']:'')" :mode="!n.h?'widthFix':(!n.w?'heightFix':(n.m||'scaleToFill'))" :data-i="i" @load="imgLoad" @error="mediaError" @tap.stop="imgTap" @longpress="imgLongTap" />
      <!-- #endif -->
      <!-- #ifndef H5 || APP-PLUS || MP-KUAISHOU -->
      <image v-else-if="n.name==='img'" :id="n.attrs.id" :class="'_img '+n.attrs.class" :style="(ctrl[i]===-1?'display:none;':'')+'width:'+(ctrl[i]||1)+'px;height:1px;'+n.attrs.style" :src="n.attrs.src" :mode="!n.h?'widthFix':(!n.w?'heightFix':(n.m||'scaleToFill'))" :lazy-load="opts[0]" :webp="n.webp" :show-menu-by-longpress="opts[3]&&!n.attrs.ignore" :image-menu-prevent="!opts[3]||n.attrs.ignore" :data-i="i" @load="imgLoad" @error="mediaError" @tap.stop="imgTap" @longpress="imgLongTap" />
      <!-- #endif -->
      <!-- #ifdef MP-KUAISHOU -->
      <image v-else-if="n.name==='img'" :id="n.attrs.id" :class="'_img '+n.attrs.class" :style="(ctrl[i]===-1?'display:none;':'')+n.attrs.style" :src="n.attrs.src" :lazy-load="opts[0]" :data-i="i" @load="imgLoad" @error="mediaError" @tap.stop="imgTap"></image>
      <!-- #endif -->
      <!-- #ifdef APP-PLUS && VUE3 -->
      <image v-else-if="n.name==='img'" :id="n.attrs.id" :class="'_img '+n.attrs.class" :style="(ctrl[i]===-1?'display:none;':'')+'width:'+(ctrl[i]||1)+'px;'+n.attrs.style" :src="n.attrs.src||(ctrl.load?n.attrs['data-src']:'')" :mode="!n.h?'widthFix':(!n.w?'heightFix':(n.m||''))" :data-i="i" @load="imgLoad" @error="mediaError" @tap.stop="imgTap" @longpress="imgLongTap" />
      <!-- #endif -->
      <!-- 文本 -->
      <!-- #ifdef MP-WEIXIN -->
      <text v-else-if="n.text" :user-select="opts[4]=='force'&&isiOS" decode>{{n.text}}</text>
      <!-- #endif -->
      <!-- #ifndef MP-WEIXIN || MP-BAIDU || MP-ALIPAY || MP-TOUTIAO -->
      <text v-else-if="n.text" decode>{{n.text}}</text>
      <!-- #endif -->
      <text v-else-if="n.name==='br'">{{'\n'}}</text>
      <!-- 链接 -->
      <view v-else-if="n.name==='a'" :id="n.attrs.id" :class="(n.attrs.href?'_a ':'')+n.attrs.class" hover-class="_hover" :style="'display:inline;'+n.attrs.style" :data-i="i" @tap.stop="linkTap">
        <node name="span" :childs="n.children" :opts="opts" style="display:inherit" />
      </view>
      <!-- 视频 -->
      <!-- #ifdef APP-PLUS -->
      <view v-else-if="n.html" :id="n.attrs.id" :class="'_video '+n.attrs.class" :style="n.attrs.style" v-html="n.html" :data-i="i" @vplay.stop="play" />
      <!-- #endif -->
      <!-- #ifndef APP-PLUS -->
      <video v-else-if="n.name==='video'" :id="n.attrs.id" :class="n.attrs.class" :style="n.attrs.style" :autoplay="n.attrs.autoplay" :controls="n.attrs.controls" :loop="n.attrs.loop" :muted="n.attrs.muted" :object-fit="n.attrs['object-fit']" :poster="n.attrs.poster" :src="n.src[ctrl[i]||0]" :data-i="i" @play="play" @error="mediaError" />
      <!-- #endif -->
      <!-- #ifdef H5 || APP-PLUS -->
      <iframe v-else-if="n.name==='iframe'" :style="n.attrs.style" :allowfullscreen="n.attrs.allowfullscreen" :frameborder="n.attrs.frameborder" :src="n.attrs.src" />
      <embed v-else-if="n.name==='embed'" :style="n.attrs.style" :src="n.attrs.src" />
      <!-- #endif -->
      <!-- #ifndef MP-TOUTIAO || ((H5 || APP-PLUS) && VUE3) -->
      <!-- 音频 -->
      <audio v-else-if="n.name==='audio'" :id="n.attrs.id" :class="n.attrs.class" :style="n.attrs.style" :author="n.attrs.author" :controls="n.attrs.controls" :loop="n.attrs.loop" :name="n.attrs.name" :poster="n.attrs.poster" :src="n.src[ctrl[i]||0]" :data-i="i" @play="play" @error="mediaError" />
      <!-- #endif -->
      <view v-else-if="(n.name==='table'&&n.c)||n.name==='li'" :id="n.attrs.id" :class="'_'+n.name+' '+n.attrs.class" :style="n.attrs.style">
        <node v-if="n.name==='li'" :childs="n.children" :opts="opts" />
        <view v-else v-for="(tbody, x) in n.children" v-bind:key="x" :class="'_'+tbody.name+' '+tbody.attrs.class" :style="tbody.attrs.style">
          <node v-if="tbody.name==='td'||tbody.name==='th'" :childs="tbody.children" :opts="opts" />
          <block v-else v-for="(tr, y) in tbody.children" v-bind:key="y">
            <view v-if="tr.name==='td'||tr.name==='th'" :class="'_'+tr.name+' '+tr.attrs.class" :style="tr.attrs.style">
              <node :childs="tr.children" :opts="opts" />
            </view>
            <view v-else :class="'_'+tr.name+' '+tr.attrs.class" :style="tr.attrs.style">
              <view v-for="(td, z) in tr.children" v-bind:key="z" :class="'_'+td.name+' '+td.attrs.class" :style="td.attrs.style">
                <node :childs="td.children" :opts="opts" />
              </view>
            </view>
          </block>
        </view>
      </view>
      <!-- insert -->
      <!-- 富文本 -->
      <!-- #ifdef H5 || ((MP-WEIXIN || MP-QQ || APP-PLUS || MP-360) && VUE2) -->
      <rich-text v-else-if="!n.c&&!handler.isInline(n.name, n.attrs.style)" :id="n.attrs.id" :style="n.f" :user-select="opts[4]" :nodes="[n]" />
      <!-- #endif -->
      <!-- #ifndef H5 || ((MP-WEIXIN || MP-QQ || APP-PLUS || MP-360) && VUE2) -->
      <rich-text v-else-if="!n.c" :id="n.attrs.id" :style="'display:inline;'+n.f" :preview="false" :selectable="opts[4]" :user-select="opts[4]" :nodes="[n]" />
      <!-- #endif -->
      <!-- 继续递归 -->
      <view v-else-if="n.c===2" :id="n.attrs.id" :class="'_block _'+n.name+' '+n.attrs.class" :style="n.f+';'+n.attrs.style">
        <node v-for="(n2, j) in n.children" v-bind:key="j" :style="n2.f" :name="n2.name" :attrs="n2.attrs" :childs="n2.children" :opts="opts" />
      </view>
      <node v-else :style="n.f" :name="n.name" :attrs="n.attrs" :childs="n.children" :opts="opts" />
    </block>
  </view>
</template>
<script module="handler" lang="wxs">
// 行内标签列表
var inlineTags = {
  abbr: true,
  b: true,
  big: true,
  code: true,
  del: true,
  em: true,
  i: true,
  ins: true,
  label: true,
  q: true,
  small: true,
  span: true,
  strong: true,
  sub: true,
  sup: true
}
/**
 * @description 判断是否为行内标签
 */
module.exports = {
  isInline: function (tagName, style) {
    return inlineTags[tagName] || (style || '').indexOf('display:inline') !== -1
  }
}
</script>
<script>
import node from './node'
export default {
  name: 'node',
  options: {
    // #ifdef MP-WEIXIN
    virtualHost: true,
    // #endif
    // #ifdef MP-TOUTIAO
    addGlobalClass: false
    // #endif
  },
  data () {
    return {
      ctrl: {},
      // #ifdef MP-WEIXIN
      isiOS: uni.$u.os() === 'ios'
      // #endif
    }
  },
  props: {
    name: String,
    attrs: {
      type: Object,
      default () {
        return {}
      }
    },
    childs: Array,
    opts: Array
  },
  components: {
    // #ifndef ((H5 || APP-PLUS) && VUE3) || APP-HARMONY
    node
    // #endif
  },
  mounted () {
    this.$nextTick(() => {
      for (this.root = this.$parent; this.root.$options.name !== 'u-parse'; this.root = this.root.$parent);
    })
    // #ifdef H5 || APP-PLUS
    if (this.opts[0]) {
      let i
      for (i = this.childs.length; i--;) {
        if (this.childs[i].name === 'img') break
      }
      if (i !== -1) {
        this.observer = uni.createIntersectionObserver(this).relativeToViewport({
          top: 500,
          bottom: 500
        })
        this.observer.observe('._img', res => {
          if (res.intersectionRatio) {
            this.$set(this.ctrl, 'load', 1)
            this.observer.disconnect()
          }
        })
      }
    }
    // #endif
  },
  beforeDestroy () {
    // #ifdef H5 || APP-PLUS
    if (this.observer) {
      this.observer.disconnect()
    }
    // #endif
  },
  methods: {
    // #ifdef MP-WEIXIN
    toJSON () { return this },
    // #endif
    /**
     * @description 播放视频事件
     * @param {Event} e
     */
    play (e) {
      const i = e.currentTarget.dataset.i
      const node = this.childs[i]
      this.root.$emit('play', {
        source: node.name,
        attrs: {
          ...node.attrs,
          src: node.src[this.ctrl[i] || 0]
        }
      })
      // #ifndef APP-PLUS
      if (this.root.pauseVideo) {
        let flag = false
        const id = e.target.id
        for (let i = this.root._videos.length; i--;) {
          if (this.root._videos[i].id === id) {
            flag = true
          } else {
            this.root._videos[i].pause() // 自动暂停其他视频
          }
        }
        // 将自己加入列表
        if (!flag) {
          const ctx = uni.createVideoContext(id
            // #ifndef MP-BAIDU
            , this
            // #endif
          )
          ctx.id = id
          if (this.root.playbackRate) {
            ctx.playbackRate(this.root.playbackRate)
          }
          this.root._videos.push(ctx)
        }
      }
      // #endif
    },

    /**
     * @description 图片点击事件
     * @param {Event} e
     */
    imgTap (e) {
      const node = this.childs[e.currentTarget.dataset.i]
      if (node.a) {
        this.linkTap(node.a)
        return
      }
      if (node.attrs.ignore) return
      // #ifdef H5 || APP-PLUS
      node.attrs.src = node.attrs.src || node.attrs['data-src']
      // #endif
      // #ifndef APP-HARMONY
      this.root.$emit('imgtap', node.attrs)
      // #endif
      // #ifdef APP-HARMONY
      this.root.$emit('imgtap', {
        ...node.attrs
      })
      // #endif
      // 自动预览图片
      if (this.root.previewImg) {
        uni.previewImage({
          // #ifdef MP-WEIXIN
          showmenu: this.root.showImgMenu,
          // #endif
          // #ifdef MP-ALIPAY
          enablesavephoto: this.root.showImgMenu,
          enableShowPhotoDownload: this.root.showImgMenu,
          // #endif
          current: parseInt(node.attrs.i),
          urls: this.root.imgList
        })
      }
    },

    /**
     * @description 图片长按
     */
    imgLongTap (e) {
      // #ifdef APP-PLUS
      const attrs = this.childs[e.currentTarget.dataset.i].attrs
      if (this.opts[3] && !attrs.ignore) {
        uni.showActionSheet({
          itemList: ['保存图片'],
          success: () => {
            const save = path => {
              uni.saveImageToPhotosAlbum({
                filePath: path,
                success () {
                  uni.showToast({
                    title: '保存成功'
                  })
                }
              })
            }
            if (this.root.imgList[attrs.i].startsWith('http')) {
              uni.downloadFile({
                url: this.root.imgList[attrs.i],
                success: res => save(res.tempFilePath)
              })
            } else {
              save(this.root.imgList[attrs.i])
            }
          }
        })
      }
      // #endif
    },

    /**
     * @description 图片加载完成事件
     * @param {Event} e
     */
    imgLoad (e) {
      const i = e.currentTarget.dataset.i
      /* #ifndef H5 || (APP-PLUS && VUE2) */
      if (!this.childs[i].w) {
        // 设置原宽度
        this.$set(this.ctrl, i, e.detail.width)
      } else /* #endif */ if ((this.opts[1] && !this.ctrl[i]) || this.ctrl[i] === -1) {
        // 加载完毕，取消加载中占位图
        this.$set(this.ctrl, i, 1)
      }
      this.checkReady()
    },

    /**
     * @description 检查是否所有图片加载完毕
     */
    checkReady () {
      if (this.root && !this.root.lazyLoad) {
        this.root._unloadimgs -= 1
        if (!this.root._unloadimgs) {
          setTimeout(() => {
            this.root.getRect().then(rect => {
              this.root.$emit('ready', rect)
            }).catch(() => {
              this.root.$emit('ready', {})
            })
          }, 350)
        }
      }
    },

    /**
     * @description 链接点击事件
     * @param {Event} e
     */
    linkTap (e) {
      const node = e.currentTarget ? this.childs[e.currentTarget.dataset.i] : {}
      const attrs = node.attrs || e
      const href = attrs.href
      this.root.$emit('linktap', Object.assign({
        innerText: this.root.getText(node.children || []) // 链接内的文本内容
      }, attrs))
      if (href) {
        if (href[0] === '#') {
          // 跳转锚点
          this.root.navigateTo(href.substring(1)).catch(() => { })
        } else if (href.split('?')[0].includes('://')) {
          // 复制外部链接
          if (this.root.copyLink) {
            // #ifdef H5
            window.open(href)
            // #endif
            // #ifdef MP
            uni.setClipboardData({
              data: href,
              success: () =>
                uni.showToast({
                  title: '链接已复制'
                })
            })
            // #endif
            // #ifdef APP-PLUS
            plus.runtime.openWeb(href)
            // #endif
          }
        } else {
          // 跳转页面
          uni.navigateTo({
            url: href,
            fail () {
              uni.switchTab({
                url: href,
                fail () { }
              })
            }
          })
        }
      }
    },

    /**
     * @description 错误事件
     * @param {Event} e
     */
    mediaError (e) {
      const i = e.currentTarget.dataset.i
      const node = this.childs[i]
      // 加载其他源
      if (node.name === 'video' || node.name === 'audio') {
        let index = (this.ctrl[i] || 0) + 1
        if (index > node.src.length) {
          index = 0
        }
        if (index < node.src.length) {
          this.$set(this.ctrl, i, index)
          return
        }
      } else if (node.name === 'img') {
        // #ifdef H5 && VUE3
        if (this.opts[0] && !this.ctrl.load) return
        // #endif
        // 显示错误占位图
        if (this.opts[2]) {
          this.$set(this.ctrl, i, -1)
        }
        this.checkReady()
      }
      if (this.root) {
        this.root.$emit('error', {
          source: node.name,
          attrs: node.attrs,
          // #ifndef H5 && VUE3
          errMsg: e.detail.errMsg
          // #endif
        })
      }
    }
  }
}
</script>
<style>
/* a 标签默认效果 */
._a {
  padding: 1.5px 0 1.5px 0;
  color: #366092;
  word-break: break-all;
}

/* a 标签点击态效果 */
._hover {
  text-decoration: underline;
  opacity: 0.7;
}

/* 图片默认效果 */
._img {
  max-width: 100%;
  -webkit-touch-callout: none;
}

/* 内部样式 */

._block {
  display: block;
}

._b,
._strong {
  font-weight: bold;
}

._code {
  font-family: monospace;
}

._del {
  text-decoration: line-through;
}

._em,
._i {
  font-style: italic;
}

._h1 {
  font-size: 2em;
}

._h2 {
  font-size: 1.5em;
}

._h3 {
  font-size: 1.17em;
}

._h5 {
  font-size: 0.83em;
}

._h6 {
  font-size: 0.67em;
}

._h1,
._h2,
._h3,
._h4,
._h5,
._h6 {
  display: block;
  font-weight: bold;
}

._image {
  height: 1px;
}

._ins {
  text-decoration: underline;
}

._li {
  display: list-item;
}

._ol {
  list-style-type: decimal;
}

._ol,
._ul {
  display: block;
  padding-left: 40px;
  margin: 1em 0;
}

._q::before {
  content: '"';
}

._q::after {
  content: '"';
}

._sub {
  font-size: smaller;
  vertical-align: sub;
}

._sup {
  font-size: smaller;
  vertical-align: super;
}

._thead,
._tbody,
._tfoot {
  display: table-row-group;
}

._tr {
  display: table-row;
}

._td,
._th {
  display: table-cell;
  vertical-align: middle;
}

._th {
  font-weight: bold;
  text-align: center;
}

._ul {
  list-style-type: disc;
}

._ul ._ul {
  margin: 0;
  list-style-type: circle;
}

._ul ._ul ._ul {
  list-style-type: square;
}

._abbr,
._b,
._code,
._del,
._em,
._i,
._ins,
._label,
._q,
._span,
._strong,
._sub,
._sup {
  display: inline;
}

/* #ifdef APP-PLUS */
._video {
  width: 300px;
  height: 225px;
}
/* #endif */
</style>