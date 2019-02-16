// Peony Image Gallery 图片画廊组件
import ImageGallery from './components/image-gallery/index.js'

// Peony Image Light 图片灯箱组件
import ImageLight from './components/image-light/index.js'

// Peony Image Magicbox 图片魔法盒组件
import ImageMagicbox from './components/image-magicbox/index.js'

// Peony Image multibox 图片多功能盒组件
import ImageMultibox from './components/image-multibox/index.js'

// Peony Image Slider 图片滑动视图组件
import ImageSlider from './components/image-slider/index.js'

// Peony Image Thumbanav 图片缩略导航组件
import ImageThumbanav from './components/image-thumbsnav/index.js'

// Selectbox 选择组件
import Selectbox from './components/selectbox/index.js'
// ...如果还有的话继续添加

// 样式
import './style/index.scss'

const components = [
  ImageGallery,
  ImageLight,
  ImageMagicbox,
  ImageMultibox,
  ImageSlider,
  ImageThumbanav,
  Selectbox
  // ...如果还有的话继续添加
]

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '1.0.0', // 版本
  // install
  install,
  // 组件
  ImageGallery,
  ImageLight,
  ImageMagicbox,
  ImageMultibox,
  ImageSlider,
  ImageThumbanav,
  Selectbox
  // ...如果还有的话继续添加
}
