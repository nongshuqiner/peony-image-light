<template lang="html">
  <div class="peony-image-slider peony-adaptbox-container" v-if="showSlider" :style="sliderStyle">
    <!-- 遮罩层 -->
    <div class="peony-image-slider__maskbox" @click="closeSlider"></div>
    <!-- 关闭 -->
    <div class="close" @click.stop="closeSlider">
      <i class="fas fa-times"></i>
    </div>
    <!-- 上翻页 -->
    <div v-if="index > 0" class="arrow arrow-left">
      <i class="fas fa-angle-left" @click.stop="lastIndex"></i>
    </div>
    <!-- 下翻页 -->
    <div v-if="index < list.length - 1" class="arrow arrow-right">
      <i class="fas fa-angle-right" @click.stop="nextIndex"></i>
    </div>
    <!-- 图片多功能盒子 v-on="$listeners" -->
    <!-- style="width: 75%; height: 98%; max-width: 1148px; max-height: 760px;" -->
    <image-magicbox
      ref="image-magicbox"
      class="peony-adaptbox"
      :list="list"
      :index="index"
      :image-mode="imageMode"
      :action="action"
      :thumbsAction="thumbsAction"
      :carouselSpeed="carouselSpeed"
      :showThumbsNav="showThumbsNav"
      :show-more="showMore"
      :handle-url-method="handleUrlMethod"
      :handle-thumbs-url-method="handleThumbsUrlMethod"
      @change="changeIndex"
    >
      <template slot-scope="props">
        <slot v-bind="props"></slot>
      </template>
    </image-magicbox>
  </div>
</template>

<script>
import { getPageElMaxZIndex } from '../../utils/Dom.js'
import ImageMagicbox from '../image-magicbox/image-magicbox.vue' // 多功能图片盒子

export default {
  name: 'PeonyImageSlider',
  components: { ImageMagicbox },
  model: {
    prop: 'index',
    event: 'change'
  },
  // props 同image-magicbox
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
      showSlider: false, // 是否开启
      ZIndex: 'auto' // z-index层级
    }
  },
  created () {},
  watch: {
    index () { // 当index变化时,相关数据重置
      // this.$emit('change', this.index, this.list)
    }
  },
  computed: {
    sliderStyle () {
      let style = {}
      if (this.ZIndex) {
        style['z-index'] = this.ZIndex
      }
      return style
    }
  },
  methods: {
    lastIndex () { // 上翻页
      let currIndex
      if ((this.index - 1) < 0) {
        currIndex = this.list.length - 1
      } else {
        currIndex = this.index - 1
      }
      this.changeIndex(currIndex)
    },
    nextIndex () { // 下翻页
      let currIndex
      if ((this.index + 1) > this.list.length - 1) {
        currIndex = 0
      } else {
        currIndex = this.index + 1
      }
      this.changeIndex(currIndex)
    },
    changeIndex (currIndex) { // 改变index
      this.$emit('change', currIndex)
    },
    openSlider () { // 开启-打开调用开启方法
      this.showSlider = true
      this.$emit('open')
      this.$nextTick(() => {
        this.ZIndex = getPageElMaxZIndex() + 1
        // console.log(this.ZIndex)
      })
    },
    closeSlider () { // 关闭
      // this.pause()
      // this.$refs['image-magicbox'].$refs['image-thumbsnav'].rmResizeEvent()
      this.showSlider = false
      this.$emit('close')
      this.$nextTick(() => {
        this.ZIndex = 'auto'
      })
    }
  }
}
</script>
