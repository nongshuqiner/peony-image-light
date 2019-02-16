<template lang="html">
  <!-- 图片多功能盒子 -->
  <div class="peony-image-magicbox" :style="pictureMultiStyle">
    <!-- 内容 -->
    <div class="peony-image-magicbox__wrap" :style="pictureMultiWrapStyle">
      <!-- 画布 -->
      <div class="peony-image-magicbox__canvas" :title="list[index].name ? list[index].name : '图片'">
        <!-- 背景图片盒子 -->
        <div
          v-if="isBgWrap && (imageMode === 'both' || imageMode === 'bg')"
          class="magicbox__canvas-warp"
          :style="'background-image: url('+ getPhotoUrl(action, list[index].url) +')'"
        ></div>
        <!-- 图片盒子 -->
        <image-multibox
          v-if="!isBgWrap && (imageMode === 'both' || imageMode === 'multi')"
          ref="image-multibox"
          :src="getPhotoUrl(action, list[index].url)"
        ></image-multibox>
        <!-- 图片字幕 -->
        <p class="magicbox__canvas-caption" v-if="list[index].name" v-text="list[index].name"></p>
        <!-- 转换 -->
        <template v-if="imageMode === 'both'">
          <i v-if="isBgWrap" class="magicbox__canvas-convert fa fa-hourglass-start" @click="isBgWrap = !isBgWrap"></i>
          <i v-else class="magicbox__canvas-convert fa fa-hourglass-end" @click="isBgWrap = !isBgWrap"></i>
        </template>
        <!-- 图片工具 -->
        <div v-if="!isBgWrap" class="magicbox__canvas-utils">
          <!-- 旋转-left -->
          <!-- <i class="icon fa fa-rotate-left" @click="rotateLeft"></i> -->
          <i class="icon fa fa-undo" @click="rotateLeft"></i>
          <!-- 下载 -->
          <a :download="list[index].url" :href="getPhotoUrl(action, list[index].url)"> <i class="icon fa fa-download"></i> </a>
          <!-- 还原\放大查看 -->
          <i v-if="!isEnlarge" class="icon fa fa-search-plus" @click="zoomEnlarge"></i>
          <i v-else class="icon fa fa-search-minus" @click="zoomRestore"></i>
          <!-- play\pause幻灯片 -->
          <i v-if="isPlay" class="icon fa fa-pause" @click="pause"></i>
          <i v-else class="icon fa fa-play" @click="play"></i>
          <!-- 控制图片缩略导航 -->
          <i v-if="showThumbsNav && controlShowNav" class="icon fa fa-th-large" @click="hiddThumbsNavEvent"></i>
          <i v-else class="icon fa fa-th-large" style="color:rgba(255, 255, 255, .4)" @click="showThumbsNavEvent"></i>
        </div>
      </div>
      <!-- 图片缩略导航 -->
      <image-thumbsnav
        ref="image-thumbsnav"
        v-show="showThumbsNav && controlShowNav"
        :index="index"
        :list="list"
        :action="thumbsAction"
        :carouselSpeed="carouselSpeed"
        :height="thumbsNavHeight"
        :handle-url-method="handleThumbsUrlMethod"
        @seleteItem="changeIndex"
      ></image-thumbsnav>
    </div>
    <!-- 显示更多信息 -->
    <div v-if="showMore" class="peony-image-magicbox__more">
      <slot :list="list" :index="index" ></slot>
    </div>
  </div>
</template>

<script>
import ImageMultibox from '../image-multibox/image-multibox.vue' // 画廊
import ImageThumbsnav from '../image-thumbsnav/image-thumbsnav.vue' // 画廊

export default {
  name: 'PeonyImageMagicbox',
  components: { ImageMultibox, ImageThumbsnav },
  model: {
    prop: 'index',
    event: 'change'
  },
  props: {
    list: { type: Array, required: true }, // 图片数组
    index: { type: Number, required: true }, // 当前索引
    imageMode: {type: String, default: 'both'}, // 图片显示模式: bg-全背景 multi-多功能 both-两种都支持
    action: { type: String, default: '' }, // 图片地址前缀
    thumbsAction: { type: String, default: '' }, // 缩略图地址前缀
    carouselSpeed: {type: Number, default: 3000}, // 幻灯片播放间隔时间-毫秒
    showThumbsNav: {type: Boolean, default: true}, // 是否显示缩略图导航
    showMore: {type: Boolean, default: true}, // 是否显示更多信息
    handleUrlMethod: Function, // 图片处理方法，Function (action, url) {}，不写则为 undefined
    handleThumbsUrlMethod: Function // 图片处理方法，Function (action, url) {}，不写则为 undefined
  },
  data () {
    return {
      controlShowNav: true, // 图片工具-控制图片缩略导航
      thumbsNavHeight: 130, // 图片缩略导航的高
      isBgWrap: false, // 是否为背景盒子
      isEnlarge: false, // 是否放大
      isPlay: false // 是否播放幻灯片
    }
  },
  created () {
    if (this.imageMode === 'bg') {
      this.isBgWrap = true
    }
    if (this.imageMode === 'multi') {
      this.isBgWrap = false
    }
    if (this.showThumbsNav) {
      this.thumbsNavHeight = 130
    } else {
      this.thumbsNavHeight = 0
    }
  },
  watch: {
    index () { // 当index变化时，停止放大 和 旋转
      if (!this.isBgWrap) {
        if (this.isEnlarge) {
          this.zoomRestore() // 还原放大查看
        }
        this.$refs['image-multibox'].clearRotate()
      }
    },
    isBgWrap () {
      if (this.isEnlarge) {
        this.zoomRestore() // 还原放大查看
      }
    },
    showThumbsNav () {
      if (this.showThumbsNav) {
        this.thumbsNavHeight = 130
      } else {
        this.thumbsNavHeight = 0
      }
    },
    imageMode () {
      if (this.imageMode === 'bg') {
        this.isBgWrap = true
      }
      if (this.imageMode === 'multi') {
        this.isBgWrap = false
      }
    }
  },
  computed: {
    pictureMultiStyle () {
      let style = {}
      if (this.showMore) {
        style['padding-right'] = '320px'
      }
      return style
    },
    pictureMultiWrapStyle () {
      let style = {}
      if (this.showThumbsNav && this.thumbsNavHeight) {
        style['padding-bottom'] = this.thumbsNavHeight + 'px'
      } else {
        style['padding-bottom'] = '0px'
      }
      return style
    }
  },
  methods: {
    getPhotoUrl (action, url) { // 获取图片url
      if (({}).toString.call(this.handleUrlMethod) === '[object Function]') {
        return this.handleUrlMethod(action, url)
      } else {
        return action + url
      }
    },
    changeIndex (currIndex) { // 改变index
      this.$emit('change', currIndex)
    },
    // 还原\放大查看
    zoomEnlarge () { // 放大
      this.isEnlarge = true
      this.$refs['image-multibox'].zoomEnlarge()
    },
    zoomRestore () { // 还原
      this.isEnlarge = false
      this.$refs['image-multibox'].zoomRestore()
    },
    rotateLeft () { // 旋转-left
      if (this.isEnlarge) {
        this.zoomRestore() // 还原放大查看
      }
      this.$refs['image-multibox'].rotateLeft()
    },
    // play\pause幻灯片
    play () {
      this.isPlay = true
      this.$refs['image-thumbsnav'].carouselPlay()
    },
    pause () {
      this.isPlay = false
      this.$refs['image-thumbsnav'].carouselPause()
    },
    hiddThumbsNavEvent () {
      this.zoomRestore() // 还原放大查看
      this.thumbsNavHeight = 0
      this.controlShowNav = false
    },
    showThumbsNavEvent () {
      this.thumbsNavHeight = 130
      this.controlShowNav = true
    }
  }
}
</script>
