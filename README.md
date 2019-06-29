# Peony Image Light

## Summary

> A Vue image light Component

中文文档请移步:[Peony Image Light 图片灯箱组件](./README-zh-CN.md)

## Install

You can install it via NPM:

``` bash
npm install --save peony-image-light
```

or,just include `peony-image-light.js` to your view like this.

Namely：

``` js
import PeonyImageLight from 'peony-image-light'
// 或者 const PeonyImageLight = require('peony-image-light').default
// 或者 <script src="//unpkg.com/peony-circle@1.0.3/dist/peony-image-light.js"></script>
Vue.use(PeonyImageLight)
```

## Usage

``` html
<!-- 代码 -->
<peony-image-light
  :list="list"
  action=""
  :optional="optional"
  :deletable="deletable"
  :handle-url-method="handleUrlMethod"
  :show-more="showMore"
  :image-width="imageWidth"
  :image-height="imageHeight"
  :show-badge="showBadge"
  :selectHandle="selectHandle"
  :removeHandle="removeHandle"
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
</peony-image-light>
```

``` js
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
      imageWidth: 280,
      imageHeight: 172,
      showBadge: true,
      list: [
        {
          name: '0.jpg', // 图片名称
          url: image0, // 图片url路径
          // describe: '这是一段描述', // 描述
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
      showMore: true,
      select_list: []
    }
  },
  methods: {
    handleUrlMethod (action, url) {
      return action + url
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
    },
    printSlotScope (data) {
      console.log('image-magicbox组件的slot-scope:', data)
    }
  }
}
```

## result

#### selecting

![run-result.gif](./examples-select.gif)

#### open light

![run-result.gif](./examples.gif)

## Attributes

| param      | Explain    | Type      | Optional       | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| list  | Required,Picture list    | Array   | - | - |
| action  | Picture Address Prefix    | String   | - | '' |
| thumbsAction  | thumbs Picture Address Prefix    | String   | - | '' |
| optional  | optional    | Boolean   | - | false |
| deletable  | deletable    | Boolean   | - | false |
| handleUrlMethod  | Image Address Handle Method    | Function (action, url) {}   | - | undefined |
| handleUrlMethod  | Thumbs Image Address Handle Method    | Function (action, url) {}   | - | undefined |
| showMore  | Whether to display more information bar after opening the picture    | Boolean   | - | true |
| imageWidth  | Width of picture box  | [String, Number]   | - | 280 |
| imageHeight  | Height of picture box  | [String, Number]   | - | 172 |
| showBadge  | Is Show Picture Markers  | Boolean   | - | true |
| selectHandle  | Handle function when selected  | Function (index, item, event) {}   | - | undefined |
| removeHandle  | Handle function when removed  | Function (index, item, event) {}   | - | undefined |

## Events

none

## Scoped Slot

| name      | Explain    |
|---------- |-------- |
| props | props’s content: { list: [...], index: 0 } |

## run

``` bash
# git clone ...
git clone https://github.com/nongshuqiner/peony-image-light.git

# enter
cd peony-image-light

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Donation

If you find component useful, you can buy me a cup of coffee.

![payment-code.png](./payment-code.png)

## Contact me

Just Contact Me At:
- Email: ym1185509297@163.com
- 简书: [言墨儿](https://www.jianshu.com/u/319464da1cc1)

## License

[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2018 - forever Naufal Rabbani
