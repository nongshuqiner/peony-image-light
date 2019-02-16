<template lang="html">
  <!-- 图片缩略导航 -->
  <div class="peony-image-thumbsnav" :style="thumbsNavStyle">
    <!-- 向右滚动 -->
    <div class="thumbsnav-arrow thumbsnav-arrow-left"
      :class="shape"
      @click.stop="rightArrow"
    >
      <!-- disable -->
      <i v-if="isArrow && arrowDistance < (thumbsListItemWidth - thumbsListWidth)"
        class="disable fas fa-angle-left"
      ></i>
      <!-- click -->
      <i v-if="isArrow && arrowDistance > 0" class="fas fa-angle-left"></i>
    </div>
    <!-- 图片缩略导航列表 -->
    <div class="peony-image-thumbsnav__list" ref="peony-image-thumbsnav__list">
      <ul :style="thumbsArrowStyle" ref="thumbsnav-ul-box">
        <li
          v-for="(item, idx) in list"
          :key="idx"
          :class="{'select-scale': index === idx}"
          class="picture-thumbs-item peony-adaptbox-container"
          :style="[{
            'background-image': 'url('+ getPhotoUrl(action, item[props.url]) + ')'
          }, thumbsItemStyle]"
          @click="$emit('seleteItem', idx)"
        >
          <template v-if="item[props.url] !== null && item[props.url] !== undefined">
            <img
              :src="getPhotoUrl(action, item[props.url])"
              :alt="item[props.name]"
              :data-src="item[props.url]"
              class="peony-adaptbox"
              @error="imageError"
            />
          </template>
          <img v-else :src="notpic" alt="暂无图片">
        </li>
      </ul>
    </div>
    <!-- 向左滚动 -->
    <div class="thumbsnav-arrow thumbsnav-arrow-right"
      :class="shape"
      @click.stop="leftArrow"
    >
      <!-- disable -->
      <i v-if="isArrow && arrowDistance > 0" class="disable fas fa-angle-right"></i>
      <i v-if="isArrow && arrowDistance < (thumbsListItemWidth - thumbsListWidth)" class="fas fa-angle-right"></i>
    </div>
  </div>
</template>

<script>
import notpic from './image/not-pic.png'
import error from './image/error.png'

export default {
  name: 'PeonyImageThumbsnav',
  props: {
    index: { type: Number, required: true }, // 当前图片索引
    list: { type: Array, required: true }, // 图片数组
    action: { type: String, default: '' }, // 图片地址前缀
    props: {
      type: Object,
      default () {
        return {
          url: 'url', // 图片url路径
          name: 'name' // 图片的name
        }
      }
    }, // 图片数组内容约定
    shape: { // 形状:rectangle-矩形、circle-圆形
      validator (value) {
        return ['circle', 'rectangle'].indexOf(value) !== -1
      },
      default: 'rectangle'
    }, // 形状控制
    thumbsItemSpace: {type: Number, default: 10}, // 列表之间的间隔，px
    changeSpeed: {type: Number, default: 500}, // 滚动速度，毫秒
    isCarousel: {type: Boolean, default: false}, // 是否需要轮播
    carouselSpeed: {type: Number, default: 3000}, // 轮播速度，毫秒
    height: {type: [String, Number], default: 130}, // 整体高度
    handleUrlMethod: Function // 图片地址处理方法，Function (action, url) {}
  },
  data () {
    return {
      notpic,
      error,
      carouselTimer: null,
      thumbsListWidth: 0, // 获取列表容器的宽
      thumbsListHeight: 0, // 获取列表容器的高
      thumbsItemWidth: 0, // item 的宽
      thumbsListItemWidth: 0, // item 的总宽
      isArrow: true, // 是否出现箭头
      arrowDistance: 0 // 滚动的距离
    }
  },
  mounted () {
    if (this.isCarousel) {
      this.carouselPlay()
    }
    this.controlArrow()
    var v = this
    window.onresize = function () {
      v.controlArrow()
    }
  },
  destroyed () {
    if (this.carouselTimer) {
      window.clearInterval(this.carouselTimer)
    }
    this.rmResizeEvent()
  },
  watch: {
    index (newIndex, oldIndex) { // 当 index 变化时需要的选中定位即动画
      let frequency = Math.abs(newIndex - oldIndex)
      for (var i = 0; i < frequency; i++) {
        if (this.isArrow) {
          if ((newIndex - oldIndex) > 0) {
            this.leftArrow()
          } else {
            this.rightArrow()
          }
        }
      }
    },
    isCarousel () {
      if (this.isCarousel) {
        this.carouselPlay()
      } else {
        this.carouselPause()
      }
    },
    thumbsItemSpace () {
      this.controlArrow()
    },
    height () {
      this.controlArrow()
    }
  },
  computed: {
    thumbsNavStyle () { // peony-image-thumbsnav
      let style = {}
      if (this.height) {
        if (Object.prototype.toString.call(this.height) === '[object Number]') {
          style.height = this.height + 'px'
        } else {
          style.height = this.height
        }
      }
      return style
    },
    thumbsArrowStyle () { // peony-image-thumbsnav__list > ul
      let style = {}
      if (this.arrowDistance) {
        style.marginLeft = -this.arrowDistance + 'px'
      }
      return style
    },
    thumbsItemStyle () {
      let style = {}
      if (this.thumbsItemWidth) {
        style.width = this.thumbsItemWidth + 'px'
      }
      if (this.thumbsItemSpace) {
        style.marginLeft = this.thumbsItemSpace + 'px'
      }
      return style
    },
    constDistance () { // 每次滚动的距离
      // return this.thumbsListWidth
      let compare = this.arrowDistance + this.thumbsListWidth
      // console.log('dqwdqw:', this.thumbsListItemWidth - compare)
      if ((this.thumbsListItemWidth - compare) < (this.thumbsItemWidth + 10) && (this.thumbsListItemWidth - compare) > 0) {
        return this.thumbsListItemWidth - compare
      } else {
        return this.thumbsItemWidth
      }
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
    rmResizeEvent () { // 清除重置onresize
      window.onresize = ''
    },
    carouselPlay () { // 轮播播放
      this.carouselTimer = setInterval(() => { // 轮播计时器
        let carouselIndex = this.index + 1
        if (carouselIndex > this.list.length - 1) {
          carouselIndex = 0
        }
        this.$emit('seleteItem', carouselIndex)
      }, this.carouselSpeed)
      this.$emit('play')
    },
    carouselPause () { // 轮播暂停
      window.clearInterval(this.carouselTimer)
      this.$emit('pause')
    },
    leftArrow () { // 向左滚动
      let compare = this.arrowDistance + this.thumbsListWidth
      if (compare < this.thumbsListItemWidth) {
        this.arrowDistance += this.constDistance
      } else {
        this.arrowDistance = this.thumbsListItemWidth - this.thumbsListWidth // 80的左右内填充
      }
      // console.log(compare, this.thumbsListItemWidth, this.arrowDistance, this.constDistance)
    },
    rightArrow () { // 向右滚动
      if (this.arrowDistance >= this.thumbsItemWidth + this.thumbsItemSpace) {
        this.arrowDistance -= this.constDistance
      } else {
        this.arrowDistance = 0
      }
      console.log(this.arrowDistance, this.constDistance)
    },
    controlArrow () { // 控制是否出现箭头
      this.$nextTick(() => {
        let container = this.$refs['peony-image-thumbsnav__list']
        // console.log(container.offsetWidth, container.offsetHeight)
        this.thumbsListWidth = container.offsetWidth // 获取列表容器的宽-parseInt(getStyle(container, 'width'))
        this.thumbsListHeight = container.offsetHeight // 获取列表容器的高-parseInt(getStyle(container, 'height'))
        this.thumbsItemWidth = this.thumbsListHeight
        this.thumbsListItemWidth = this.thumbsItemWidth * this.list.length + (this.list.length - 1) * this.thumbsItemSpace // 需要加上边距
        // console.log(this.thumbsListWidth, this.thumbsListItemWidth)
        if (this.thumbsListWidth < this.thumbsListItemWidth) {
          this.isArrow = true
        } else {
          this.isArrow = false
        }
      })
    }
  }
}
</script>
