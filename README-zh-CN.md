

# Peony Image Light 图片灯箱组件

## 概述

> 一个vue的图片灯箱组件

## 安装

您可以通过NPM安装它

``` bash
npm install --save peony-image-light
```

或者使用引用peony-image-light.js的方式

即：

``` js
import PeonyImageLight from 'peony-image-light'
// 或者 const PeonyImageLight = require('peony-image-light').default
// 或者 <script src="//unpkg.com/peony-circle@1.0.3/dist/peony-image-light.js"></script>
Vue.use(PeonyImageLight)
```

## 使用

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

## 效果展示

#### 选择效果

![run-result.gif](./examples-select.gif)

#### 幻灯片效果

![run-result.gif](./examples.gif)

## Attributes(属性)

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| list  | 必传，图片列表    | Array   | - | - |
| action  | 图片地址前缀    | String   | - | '' |
| thumbsAction  | 缩略图地址前缀    | String   | - | '' |
| optional  | 是否开启选中   | Boolean   | - | false |
| deletable  | 是否可删除    | Boolean   | - | false |
| handleUrlMethod  | 图片地址处理方法   | Function (action, url) {}   | - | undefined |
| handleUrlMethod  | 缩略图地址处理方法   | Function (action, url) {}   | - | undefined |
| showMore  | 打开图片后，是否显示更多信息栏    | Boolean   | - | true |
| imageWidth  | 图片盒子的宽度    | [String, Number]   | - | 280 |
| imageHeight  | 图片盒子的高度    | [String, Number]   | - | 172 |
| showBadge  | 是否显示图片标记    | Boolean   | - | true |
| selectHandle  | 选中时的处理函数    | Function (index, item, event) {}   | - | undefined |
| removeHandle  | 删除时的处理函数    | Function (index, item, event) {}   | - | undefined |

## Events

none

## Scoped Slot

| name      | 说明    |
|---------- |-------- |
| props | props的内容: { list: [...], index: 0 } |

## 运行

``` bash
# git clone ...
git clone https://github.com/nongshuqiner/peony-image-light.git

# enter
cd peony-image-light

# 安装依赖关系
npm install

# 启动热加载，地址: localhost:9090
npm run dev

# 生产用小型化
npm run build
```

## 捐赠

如果您发现此组件有用，您可以给我买一杯咖啡

![payment-code.png](./payment-code.png)

## 联系我

只需联系我:
- Email: ym1185509297@163.com
- 简书: [言墨儿](https://www.jianshu.com/u/319464da1cc1)

## 使用许可证

[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2018 - forever Naufal Rabbani
