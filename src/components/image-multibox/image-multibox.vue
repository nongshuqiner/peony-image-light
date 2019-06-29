<template lang="html">
  <!-- 图片盒子 -->
  <div
    class="peony-image-multibox"
    ref="peony-image-multibox"
    :class="{
      'peony-adaptbox-container': isadaptbox,
      'is-magnifier': ismagnifier
    }"
  >
    <img
      class="peony-image-multibox__img peony-adaptbox"
      ref="multibox-img"
      :src="src"
      :style="imageStyle"
      @load="loaded"
      @error="imageError"
    />
    <!-- 放大所需事件遮罩层 -->
    <div class="peony-image-multibox__mask" ref="multibox-mask" v-show="showEventMask"></div>
  </div>
</template>

<script>
import { getStyle } from '../../utils/Dom.js'
import error from './error.png'

export default {
  name: 'PeonyImageMultibox',
  props: {
    src: String
  },
  data () {
    return {
      isadaptbox: true, // 判断是否是图片适应盒子
      ismagnifier: false, // 判断是否是图片放大盒子
      showEventMask: false, // 是否显示
      // dom--------------------------------------------------------------------
      $pictureBox: null, // 获取盒子
      $pictureImg: null, // 获取图片
      $pictureMaskbox: null, // 获取事件遮罩层
      // 盒子
      picBoxInfor: {
        width: 0, // 宽
        height: 0 // 高
      },
      // img
      imgInfor: {
        pX: 0, // position-left
        pY: 0, // position-top
        real_width: 0, // 真实的宽
        real_height: 0, // 真实的高
        enlarge_width: 0, // 放大的宽
        enlarge_height: 0 // 放大的高
      },
      // 事件
      eventInfor: {
        mousedownX: null, // 鼠标按下时的x
        mousedownY: null, // 鼠标按下时的y
        mousedownTop: null, // 获取鼠标按下时的top用于减偏移
        mousedownLeft: null, // 获取鼠标按下时的left用于减偏移
        mousemoveX: null, // 鼠标移动的x
        mousemoveY: null, // 鼠标移动的y
        mousemove_top: null, // 获取鼠标按下时的top用于减偏移
        mousemove_left: null // 获取鼠标按下时的left用于减偏移
      },
      // 样式--------------------------------------------------------------------
      imageStyleData: {},
      rotateAngle: 0 // 旋转角度
    }
  },
  watch: {
    src () { // 当index变化时,相关数据重置
      this.getRelationDom() // 获取相关dom
      this.clearRotate() // 清除旋转
      this.zoomRestore() // 还原放大查看
    }
  },
  computed: {
    imageStyle () {
      return this.imageStyleData
    }
  },
  mounted () {
    this.getRelationDom()
  },
  methods: {
    imageError (event) { // 图片加载失败处理
      event.target.src = error
    },
    // 其他
    getRelationDom () { // 获取相关dom
      this.$pictureBox = this.$refs['peony-image-multibox'] // 获取盒子
      this.$pictureImg = this.$refs['multibox-img'] // 获取盒子
      this.$pictureMaskbox = this.$refs['multibox-mask'] // 获取盒子
    },
    loaded () {
      this.getImgRealWH().then(() => {
        this.$emit('loadedEvent', this.src)
      })
    },
    getImgRealWH () { // 获取图片的实际宽高
      return new Promise((resolve, reject) => {
        var theImage = new Image()
        theImage.src = this.$pictureImg.src
        var v = this
        // 必须Image对象加载完毕
        theImage.onload = function () {
          v.imgInfor.real_width = theImage.width
          v.imgInfor.real_height = theImage.height
          // console.log('图片实际的宽：' + v.imgInfor.real_width + ',图片实际的高：' + v.imgInfor.real_height)
          resolve()
        }
      })
    },
    // 旋转
    rotateRelationSet () { // 旋转相关设置
      this.showEventMask = false // 隐藏事件遮罩层
      // class
      this.isadaptbox = true
      this.ismagnifier = false
      // 样式
      this.imageStyleData = { position: 'static' }
    },
    rotateLeft () { // 左向右旋转
      this.rotateRelationSet()
      this.rotateAngle = this.rotateAngle + 90
      if (this.rotateAngle >= 360) { this.rotateAngle = 0 }
      this.$pictureImg.style.transform = 'rotate(' + -(this.rotateAngle) + 'deg)'
    },
    clearRotate () { // 清除旋转
      this.rotateAngle = 0
      this.$pictureImg.style.transform = 'rotate(' + -(this.rotateAngle) + 'deg)'
    },
    // 还原\放大查看
    zoomEnlargeRelationSet () { // 放大相关设置
      this.clearRotate() // 清除旋转
      this.showEventMask = true // 开启事件遮罩层
      // class
      this.isadaptbox = false
      this.ismagnifier = true
      // 获取放大的宽高
      this.picBoxInfor.height = this.$pictureBox.offsetHeight // 获取盒子的高
      this.picBoxInfor.width = this.$pictureBox.offsetWidth // 获取盒子的宽
      // console.log('盒子的高：' + this.picBoxInfor.height + ',盒子的宽：' + this.picBoxInfor.width)
      if (this.imgInfor.real_width <= this.picBoxInfor.width || this.imgInfor.real_height <= this.picBoxInfor.height) {
        let widthRatio = this.picBoxInfor.height / this.imgInfor.real_width
        let heightRatio = this.picBoxInfor.width / this.imgInfor.real_height
        let multiple = 1
        if (widthRatio > heightRatio) { // 取最大比
          multiple = Math.ceil(widthRatio)
        } else {
          multiple = Math.ceil(heightRatio)
        }
        this.imgInfor.enlarge_width = this.imgInfor.real_width * multiple
        this.imgInfor.enlarge_height = this.imgInfor.real_height * multiple
      } else {
        this.imgInfor.enlarge_width = this.imgInfor.real_width
        this.imgInfor.enlarge_height = this.imgInfor.real_height
      }
      // console.log(this.imgInfor)
      // 样式：定位图片
      this.imgInfor.pX = (this.imgInfor.enlarge_width - this.picBoxInfor.width) / 2
      this.imgInfor.pY = (this.imgInfor.enlarge_height - this.picBoxInfor.height) / 2
      this.imageStyleData = { position: 'absolute', top: -this.imgInfor.pY + 'px', left: -this.imgInfor.pX + 'px', width: this.imgInfor.enlarge_width + 'px', height: this.imgInfor.enlarge_height + 'px' }
      // console.log('图片的左上距离盒子左上的距离：左' + this.imgInfor.pX + ',上：' + this.imgInfor.pY)
    },
    zoomEnlarge () { // 放大
      this.zoomEnlargeRelationSet()
      this.$pictureMaskbox.addEventListener('mousedown', this.mousedownEvent)
    },
    zoomRestore () { // 还原
      this.clearRotate() // 清除旋转
      this.showEventMask = false // 隐藏事件遮罩层
      // class
      this.isadaptbox = true
      this.ismagnifier = false
      // 样式
      this.imageStyleData = { position: 'static' }
    },
    mousedownEvent (event) { // 鼠标按下事件
      var el = event.target || event.srcElement // el
      this.eventInfor.mousedownX = event.pageX // 记录鼠标按下时的X位置
      this.eventInfor.mousedownY = event.pageY // 记录鼠标按下时的Y位置
      // 获取鼠标按下时的top和left用于减偏移
      this.eventInfor.mousedownTop = parseFloat(getStyle(this.$pictureImg, 'top'))
      this.eventInfor.mousedownLeft = parseFloat(getStyle(this.$pictureImg, 'left'))
      // console.log(parseFloat(getStyle(this.$pictureImg, 'top')), parseFloat(getStyle(this.$pictureImg, 'left')))
      el.addEventListener('mousemove', this.mousemoveEvent) // 鼠标按下之后监听鼠标移动事件
    },
    mousemoveEvent (event) { // 鼠标移动事件
      var el = event.target || event.srcElement // el
      this.eventInfor.mousemoveX = event.pageX - this.eventInfor.mousedownX // 鼠标移动的x
      this.eventInfor.mousemoveY = event.pageY - this.eventInfor.mousedownY // 鼠标移动的y
      // console.log('鼠标移动的距离:left:' + this.eventInfor.mousemoveX + ',top:' + this.eventInfor.mousemoveY)
      // 根据鼠标按下时的top和left 和 移动距离，决定图片其定位
      // top 的限制 -(this.imgInfor.enlarge_height - this.picBoxInfor.height) -> 0
      let preTop = this.eventInfor.mousedownTop + this.eventInfor.mousemoveY
      let topMinLimit = -(this.imgInfor.enlarge_height - this.picBoxInfor.height)
      // console.log(preTop, topMinLimit)
      if (preTop < topMinLimit) {
        this.$pictureImg.style.top = topMinLimit + 'px'
      } else if (preTop > 0) {
        this.$pictureImg.style.top = '0px'
      } else {
        this.$pictureImg.style.top = preTop + 'px'
      }
      // left 的限制 -(this.imgInfor.enlarge_width - this.picBoxInfor.width) -> 0
      let preLeft = this.eventInfor.mousedownLeft + this.eventInfor.mousemoveX
      let leftMinLimit = -(this.imgInfor.enlarge_width - this.picBoxInfor.width)
      // console.log(preLeft, leftMinLimit)
      if (preLeft < leftMinLimit) {
        this.$pictureImg.style.left = leftMinLimit + 'px'
      } else if (preLeft > 0) {
        this.$pictureImg.style.left = '0px'
      } else {
        this.$pictureImg.style.left = preLeft + 'px'
      }
      // 松开 以及 离开 处理
      el.addEventListener('mouseup', this.mouseupEvent) // 鼠标移动之后监听鼠标松开事件
      el.addEventListener('mouseout', this.mouseoutEvent) // 鼠标移动之后监听鼠标离开事件
    },
    mouseupEvent (event) { // 鼠标松开事件
      var el = event.target || event.srcElement // el
      el.removeEventListener('mousemove', this.mousemoveEvent)
      // console.log('鼠标松开事件: 需要removeEventListener鼠标移动事件')
    },
    mouseoutEvent (event) { // 鼠标离开事件
      var el = event.target || event.srcElement // el
      el.removeEventListener('mousemove', this.mousemoveEvent)
      // console.log('鼠标离开事件: 需要removeEventListener鼠标移动事件')
    }
  }
}
</script>
