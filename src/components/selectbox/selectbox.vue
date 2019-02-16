<template lang="html">
  <label v-if="show" class="peony-selectbox" :style="selectboxStyle">
    <input v-if="!disabled" type="checkbox" class="peony-selectbox__input" @change="changeEvent">
    <!-- 选中开启的遮罩层 -->
    <div class="peony-selectbox__mask" :class="{'is-disabled': disabled, 'no-disabled': !disabled}"></div>
    <template v-if="!disabled">
      <!-- 复选框盒子 -->
      <span class="peony-selectbox__check">
        <!-- 复选框 -->
        <span class="peony-selectbox__check_tick"></span>
      </span>
    </template>
  </label>
</template>

<script>
import { getStyle, getChildNodeElMaxZIndex } from '../../utils/Dom.js'

export default {
  name: 'PeonySelectbox',
  props: {
    show: { type: Boolean, default: false }, // 是否显示
    disabled: { type: Boolean, default: false }, // 是否禁用
    changeEvent: { type: Function, default ($event) {} }
  },
  data () {
    return {
      currMaxZIndex: null
    }
  },
  // 获取父元素的所有子孩子的z-index,并做 + 1，遮罩层 + 2
  mounted () {
    this.$nextTick(() => {
      let parentNode = this.$el.parentNode
      let parentPosition = getStyle(parentNode, 'position')
      // console.log([parentNode], parentPosition)
      if (parentPosition === 'static') {
        parentNode.style.position = 'relative'
      }
      // console.log(getChildNodeElMaxZIndex(parentNode))
      this.currMaxZIndex = getChildNodeElMaxZIndex(parentNode)
    })
  },
  computed: {
    selectboxStyle () {
      let style = {}
      if (this.currMaxZIndex) {
        if (Object.prototype.toString.call(this.currMaxZIndex) === '[object Number]') {
          style['z-index'] = this.currMaxZIndex + 1
        }
      }
      // console.log(style)
      return style
    }
  }
}
</script>
