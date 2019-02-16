<template lang="html">
  <div class="examples-item">
    <div class="image-thumbsnav-examples">
      <peony-image-thumbsnav
        :index="index"
        :list="list"
        action=""
        :props="{ url: 'url', name: 'name' }"
        shape="rectangle"
        :thumbsItemSpace="thumbsItemSpace"
        :changeSpeed="changeSpeed"
        :isCarousel="isCarousel"
        :carouselSpeed="carouselSpeed"
        :height="height"
        :handle-url-method="handleUrlMethod"
        @seleteItem="changeIndex"
      ></peony-image-thumbsnav>
    </div>
    <div>
      <p>index: {{index}}</p>
      <button v-if="thumbsItemSpace === 10" @click="thumbsItemSpace = 25">列表间隔当前为{{thumbsItemSpace}},设为25</button>
      <button v-else @click="thumbsItemSpace = 10">列表间隔当前为{{thumbsItemSpace}},设为10</button>
      <button v-if="!isCarousel" @click="isCarousel = true">开启轮播</button>
      <button v-else @click="isCarousel = false">关闭轮播</button>
      <button v-if="height === 130" @click="height = 250">整体高度当前为{{height}},设为250</button>
      <button v-else @click="height = 130">整体高度当前为{{height}},设为130</button>
    </div>
  </div>
</template>

<script>
import image0 from './image/0.jpg'
import image1 from './image/1.jpg'
import image2 from './image/2.jpg'
import image3 from './image/3.jpg'
import image4 from './image/4.jpg'
import image5 from './image/5.jpg'
import image6 from './image/6.jpg'
import image7 from './image/7.jpg'

export default {
  methods: {
    handleUrlMethod (action, url) {
      return action + url
    },
    changeIndex (index) {
      console.log(index)
      this.index = index
    }
  },
  data () {
    return {
      index: 0,
      list: [
        {
          name: '0.jpg', // 图片名称
          url: image0 // 图片url路径
        },
        {
          name: '1.jpg', // 图片名称
          url: image1 // 图片url路径
        },
        {
          name: '2.jpg', // 图片名称
          url: image2 // 图片url路径
        },
        {
          name: '3.jpg', // 图片名称
          url: image3 // 图片url路径
        },
        {
          name: '4.jpg', // 图片名称
          url: image4 // 图片url路径
        },
        {
          name: '5.jpg', // 图片名称
          url: image5 // 图片url路径
        },
        {
          name: '6', // 图片名称
          url: image6 // 图片url路径
        },
        {
          name: '7', // 图片名称
          url: image7 // 图片url路径
        },
        {
          name: '不存在的地址', // 图片名称
          url: '不存在的地址.jpg' // 图片url路径
        }
      ],
      thumbsItemSpace: 25, // 列表之间的间隔，px
      changeSpeed: 500, // 滚动速度，毫秒
      isCarousel: false, // 是否需要轮播
      carouselSpeed: 3000, // 轮播速度，毫秒
      height: 130 // 整体高度 [String, Number]
    }
  }
}
</script>

<style lang="css" scoped>
.image-thumbsnav-examples {
  background: #909399;
  width: 750px;
}
</style>
