<template lang="html">
  <div class="examples">
    <h1>ImageLight</h1>
    <h2>selectbox</h2>
    <selectbox />
    <h2>image-gallery</h2>
    <image-gallery></image-gallery>
    <h2>image-thumbsnav</h2>
    <image-thumbsnav></image-thumbsnav>
    <h2>image-multibox</h2>
    <image-multibox></image-multibox>
    <h2>image-magicbox</h2>
    <image-magicbox></image-magicbox>
    <h2>image-slider</h2>
    <image-slider></image-slider>
    <h2>image-light</h2>
    <image-light></image-light>
  </div>
</template>

<script>
import Selectbox from './selectbox.vue'
import ImageGallery from './image-gallery.vue'
import ImageThumbsnav from './image-thumbsnav.vue'
import ImageMultibox from './image-multibox.vue'
import ImageMagicbox from './image-magicbox.vue'
import ImageSlider from './image-slider.vue'
import ImageLight from './image-light.vue'

export default {
  components: { Selectbox, ImageGallery, ImageThumbsnav, ImageMultibox, ImageMagicbox, ImageSlider, ImageLight },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="css">
</style>
