<template lang="html">
  <div class="examples-item">
    <div class="image-gallery-examples">
      <peony-image-gallery
        :list="list"
        action=""
        :optional="optional"
        :deletable="deletable"
        :handle-url-method="handleUrlMethod"
        :image-width="imageWidth"
        :image-height="imageHeight"
        :show-badge="showBadge"
        :openFeedback="openFeedback"
        :selectHandle="selectHandle"
        :removeHandle="removeHandle"
      ></peony-image-gallery>
    </div>
    <div v-if="select_list.length">
      选中的图片有：{{select_list.map((item, index) => item.name || '图片:' + item.url).join('、')}}
      <br>
      {{select_list}}
    </div>
    <div>
      <button v-if="!optional" @click="optional = true">开启选中</button>
      <button v-else @click="optional = false">关闭选中</button>
      <button v-if="!deletable" @click="deletable = true">开启删除</button>
      <button v-else @click="deletable = false">关闭删除</button>
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
      imageWidth: 200,
      imageHeight: 200,
      showBadge: true,
      list: [
        {
          name: '0.jpg', // 图片名称
          url: image0, // 图片url路径
          describe: '这是一段描述', // 描述
          displayable: true, // 是否可显示
          optional: true, // 是否开启选中
          deletable: true, // 是否可删除
          badge: {
            type: 'info', // 标记的颜色类型：info hot danger warning success
            content: '原' // 标记的内容-有限制不能过多
          } // 照片的标记
        },
        {
          name: '1.jpg', // 图片名称
          url: image1, // 图片url路径
          displayable: true, // 是否可显示
          optional: true, // 是否开启选中
          deletable: true, // 是否可删除
          badge: {
            type: 'warning', // 标记的颜色类型：info hot danger warning success
            content: '原' // 标记的内容-有限制不能过多
          } // 照片的标记
        },
        {
          name: '2.jpg', // 图片名称
          url: image2, // 图片url路径
          displayable: true, // 是否可显示
          optional: true, // 是否开启选中
          deletable: true // 是否可删除
        },
        {
          name: '3.jpg', // 图片名称
          url: image3, // 图片url路径
          displayable: true, // 是否可显示
          optional: false, // 是否开启选中
          deletable: false // 是否可删除
        },
        {
          name: '4.jpg', // 图片名称
          url: image4, // 图片url路径
          optional: false, // 是否开启选中
          deletable: false // 是否可删除
        },
        {
          name: '5.jpg', // 图片名称
          url: image5 // 图片url路径
        },
        {
          name: null, // 图片名称
          url: image6 // 图片url路径
        },
        {
          url: image7 // 图片url路径
        },
        {
          url: '不存在的地址.jpg' // 图片url路径
        }
      ],
      optional: false,
      deletable: false,
      select_list: []
    }
  },
  methods: {
    handleUrlMethod (action, url) {
      return action + url
    },
    openFeedback (index, item) {
      console.log('openFeedback', index, item)
    },
    selectHandle (index, item, event) {
      console.log('selectHandle', index, item, event)
      if (event.target.checked) {
        this.select_list.splice(index, 0, item)
      } else {
        let currIndex = this.select_list.findIndex(c => c === item)
        this.select_list.splice(currIndex, 1)
      }
    },
    removeHandle (index, item) {
      console.log('removeHandle', index, item)
      this.list.splice(index, 1)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
