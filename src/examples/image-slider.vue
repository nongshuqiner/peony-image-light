<template lang="html">
  <div class="examples-item">
    <div class="image-slider-examples">
      <peony-image-slider
        ref="image-slider"
        :list="list"
        v-model="index"
        :image-mode="imageMode"
        action=""
        thumbsAction=""
        :carouselSpeed="carouselSpeed"
        :showThumbsNav="showThumbsNav"
        :show-more="showMore"
        :handle-url-method="handleUrlMethod"
        :handle-thumbs-url-method="handleThumbsUrlMethod"
      >
        <template slot-scope="props">
          {{ printSlotScope(props) }}
          <h3 class="title">图片更多信息</h3>
          <ul class="more">
            <li v-for="(item, key) in props.list[props.index]" :key="key">
              <label>{{key}}:</label>
              <span v-if="item !== null && item !== undefined && item !== ''" v-html="item"></span>
              <span class="no-data" v-else>暂无数据</span>
            </li>
          </ul>
        </template>
      </peony-image-slider>
    </div>
    <div>
      <button @click="btnClick"> open打开 </button>
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
  data () {
    return {
      index: 0,
      showMore: true,
      imageMode: 'both',
      carouselSpeed: 3000, // 幻灯片播放间隔时间-毫秒
      showThumbsNav: true, // 是否显示缩略图导航
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
      ]
    }
  },
  methods: {
    btnClick () { // openSlider
      this.$refs['image-slider'].openSlider()
    },
    handleThumbsUrlMethod (action, url) {
      return action + url
    },
    handleUrlMethod (action, url) {
      return action + url
    },
    printSlotScope (data) {
      console.log('image-magicbox组件的slot-scope:', data)
    }
  }
}
</script>

<style lang="scss" scoped>
h3.title {
  color: #333;
  font-size: 16px;
  margin: 18.7px 0;
  padding-left: 15px;
  position: relative;
  height: 24px;
  line-height: 24px;
  border-left: 2px solid #409EFF;
  text-align: left;
}
ul.more {
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: left;
  li {
    line-height: 24px;
    & > label {
      color: #58B7FF;
      margin-right: 5px;
      font-size: 14px;
      font-weight: 500;
    }
    & > span {
      color: #5e6d82;
      font-size: 14px;
    }
    .no-data { color: #ca3634; }
  }
}
</style>
