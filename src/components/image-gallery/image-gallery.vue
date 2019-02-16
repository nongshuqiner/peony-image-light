<template lang="html">
  <!-- 画廊 -->
  <ul class="peony-image-gallery">
    <template v-for="(item, index) in list">
      <!-- 在 HTML 文档中使用 title 属性，title 属性规定关于元素的额外信息 -->
      <li v-if="item.displayable === undefined || item.displayable"
        :title="item.name"
        :key="index"
        :style="imageLiStyle"
      >
        <!-- 工具盒子 -->
        <div class="peony-image-gallery__tools" v-if="!optional">
          <!-- 删除关闭 -->
          <i v-if="deletable && !(item.deletable === false)"
            class="icon delete fas fa-trash-alt"
            @click.stop="removeEvent(index, item)"
          ></i>
          <a class="download-file"
            :download="item.url"
            :href="getPhotoUrl(action, item.url)"
          >
            <i class="icon download fas fa-download"></i>
          </a>
        </div>
        <!-- 判断是否开启选中 -->
        <peony-selectbox
          :show="optional"
          :disabled="item.optional === false"
          :changeEvent="selectEvent(index, item)"
        ></peony-selectbox>
        <!-- 图片标记 -->
        <template v-if="item.badge && showBadge">
          <span v-if="item.badge.type || item.badge.content"
            class="peony-image-gallery__badge"
            :class="'is-type-' + item.badge.type"
            v-html="item.badge.content"
          ></span>
        </template>
        <div class="peony-image-gallery__photo peony-image-gallery__images-adaptbox"
          @click.stop="openEvent(index, item)"
          :style="Object.assign({}, {
            'background-image': 'url('+ getPhotoUrl(action, item.url) +')'
          }, imageGalleryBoxStyle)"
        >
          <template v-if="item.url !== null && item.url !== undefined">
            <img :src="getPhotoUrl(action, item.url)"
              :alt="item.name"
              :data-src="item.url"
              class="light-img"
              @error="imageError"
            />
          </template>
          <img v-else :src="notpic" alt="暂无图片">
        </div>
        <!-- 图片字幕 -->
        <p class="peony-image-gallery__caption" v-if="item.name" v-text="item.name"></p>
        <template v-if="item.describe !== null && item.describe !== undefined">
          <div class="peony-image-gallery__describe" v-html="item.describe ? item.describe : '暂无'"></div>
        </template>
      </li>
    </template>
  </ul>
</template>

<script>
import PeonySelectbox from '../selectbox/selectbox.vue' // Selectbox 选择组件

import notpic from './image/not-pic.png'
import error from './image/error.png'

export default {
  name: 'PeonyImageGallery',
  components: { PeonySelectbox },
  props: {
    // 基本属性
    list: { type: Array, required: true }, // 图片列表
    action: { type: String, default: '' }, // 图片地址前缀
    optional: {type: Boolean, default: false}, // 是否开启选中
    deletable: {type: Boolean, default: false}, // 是否可删除
    handleUrlMethod: Function, // 图片处理方法，Function (action, url) {}
    // 样式
    imageWidth: {type: [String, Number], default: 200}, // 图片盒子的宽度
    imageHeight: {type: [String, Number], default: 200}, // 图片盒子的高度
    showBadge: {type: Boolean, default: true}, // 是否显示标记
    // 反馈事件
    openFeedback: Function, // 打开反馈事件 Function (index, item) {}
    selectHandle: Function, // 选中时的处理函数 Function (index, item, event) {}
    removeHandle: Function // 删除时的处理函数 Function (index, item) {}
  },
  data () {
    return {
      notpic,
      error
    }
  },
  computed: {
    imageLiStyle () {
      let style = {}
      if (this.imageWidth) {
        if (Object.prototype.toString.call(this.imageWidth) === '[object Number]') {
          style.width = this.imageWidth + 'px'
        } else {
          style.width = this.imageWidth
        }
      }
      return style
    },
    imageGalleryBoxStyle () {
      let style = {}
      if (this.imageWidth) {
        if (Object.prototype.toString.call(this.imageWidth) === '[object Number]') {
          style.width = this.imageWidth + 'px'
        } else {
          style.width = this.imageWidth
        }
      }
      if (this.imageHeight) {
        if (Object.prototype.toString.call(this.imageHeight) === '[object Number]') {
          style.height = this.imageHeight + 'px'
        } else {
          style.height = this.imageHeight
        }
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
    imageError (event) { // 图片加载失败处理
      event.target.src = error
      event.target.style.opacity = 1
    },
    openEvent (idx, item) { // 打开
      if (this.$props.openFeedback !== undefined) {
        this.$props.openFeedback(idx, item)
      }
      // this.$emit('openEvent', idx, item)
    },
    removeEvent (idx, item) { // 删除
      if (this.$props.removeHandle !== undefined) {
        this.$props.removeHandle(idx, item)
      }
      // this.$emit('removeEvent', idx, item)
    },
    selectEvent (idx, item) { // 选择
      return (event) => {
        if (this.$props.selectHandle !== undefined) {
          this.$props.selectHandle(idx, item, event)
        }
        // this.$emit('selectEvent', idx, item, event)
      }
    }
  }
}
</script>
