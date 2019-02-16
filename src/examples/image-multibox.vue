<template lang="html">
  <div class="examples-item">
    <div class="image-multibox-examples">
      <peony-image-multibox ref="image-multibox" :src="src"></peony-image-multibox>
    </div>
    <div>
      <button v-if="!isEnlarge" @click="zoomEnlarge">开启放大</button>
      <button v-else @click="zoomRestore">关闭放大</button>
      <button @click="rotateLeft">旋转-left</button>
    </div>
  </div>
</template>

<script>
import image5 from './image/5.jpg'

export default {
  data () {
    return {
      src: image5,
      isEnlarge: false
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="css" scoped>
.image-multibox-examples {
  width: 420px;
  height: 420px;
  background: #409EFF;
}
</style>
