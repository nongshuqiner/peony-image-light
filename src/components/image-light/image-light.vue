<template lang="html">
  <div class="peony-image-light">
    <image-gallery
      :list="list"
      :action="action"
      :optional="optional"
      :deletable="deletable"
      :handle-url-method="handleUrlMethod"
      :image-width="imageWidth"
      :image-height="imageHeight"
      :show-badge="showBadge"
      :openFeedback="openEvent"
      :selectHandle="selectEvent"
      :removeHandle="removeEvent"
    ></image-gallery>
    <image-slider
      ref="image-slider"
      v-model="index"
      :list="list"
      image-mode="both"
      :action="action"
      :thumbsAction="thumbsAction"
      :show-more="showMore"
      :handle-url-method="handleUrlMethod"
      :handle-thumbs-url-method="handleThumbsUrlMethod"
    >
      <template slot-scope="props">
        <slot v-bind="props"></slot>
      </template>
    </image-slider>
  </div>
</template>

<script>
import ImageGallery from '../image-gallery/image-gallery.vue' // 画廊
import ImageSlider from '../image-slider/image-slider.vue' // 画廊

export default {
  name: 'PeonyImageLight',
  components: { ImageGallery, ImageSlider },
  props: {
    // 基本属性
    list: { type: Array, required: true }, // 图片列表
    action: { type: String, default: '' }, // 图片地址前缀
    thumbsAction: { type: String, default: '' }, // 缩略图地址前缀
    optional: {type: Boolean, default: false}, // 是否开启选中
    deletable: {type: Boolean, default: false}, // 是否可删除
    handleUrlMethod: Function, // 图片地址处理方法 Function (action, url) {}，不写则为 undefined
    handleThumbsUrlMethod: Function, // 缩略图地址处理方法 Function (action, url) {}，不写则为 undefined
    showMore: {type: Boolean, default: true}, // 是否显示更多信息
    // 样式
    imageWidth: {type: [String, Number], default: 280}, // 图片盒子的宽度: 200
    imageHeight: {type: [String, Number], default: 172}, // 图片盒子的高度: 164
    showBadge: {type: Boolean, default: true}, // 是否显示标记
    // 反馈事件
    selectHandle: Function, // 选中时的处理函数 Function (index, item, event) {}
    removeHandle: Function // 删除时的处理函数 Function (index, item) {}
  },
  data () {
    return {
      index: 0 // 图片索引
    }
  },
  methods: {
    openEvent (index, item) {
      console.log('openEvent', index, item)
      this.index = index
      this.$refs['image-slider'].openSlider()
    },
    removeEvent (index, item) { // 删除
      if (this.$props.removeHandle !== undefined) {
        this.$props.removeHandle(index, item)
      }
      // this.$emit('removeEvent', index, item)
    },
    selectEvent (index, item, event) { // 选择
      if (this.$props.selectHandle !== undefined) {
        this.$props.selectHandle(index, item, event)
      }
      // this.$emit('selectEvent', index, item, event)
    }
  }
}
</script>
