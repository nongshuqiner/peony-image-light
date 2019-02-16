import ImageGallery from './image-gallery.vue'

ImageGallery.install = function (Vue) {
  Vue.component(ImageGallery.name, ImageGallery)
}

export default ImageGallery
