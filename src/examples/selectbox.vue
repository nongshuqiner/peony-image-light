<template lang="html">
  <div class="examples-item">
    <div class="selectbox-examples">
      <peony-selectbox :show="show" :disabled="disabled" :changeEvent="changeEventDefault"></peony-selectbox>
    </div>
    <div class="selectbox-examples">
      <div style="background-color: #E6A23C;position: relative;z-index: 100;width: 100%; height: 100%;"></div>
      <peony-selectbox :show="show" :disabled="disabled" :changeEvent="changeEvent('这里是需要传入其他参数')"></peony-selectbox>
    </div>
    <button v-if="!show" @click="show = true">显示</button>
    <button v-else @click="show = false">隐藏</button>
    <button v-if="!disabled" @click="disabled = true">开启禁用</button>
    <button v-else @click="disabled = false">关闭禁用</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      disabled: false,
      show: true
    }
  },
  methods: {
    changeEventDefault (event) {
      console.log('default:', event.target.checked)
    },
    changeEvent (str) {
      return function (event) {
        console.log('需要传入其他参数时:', str, event.target.checked)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.selectbox-examples {
  display: inline-block;
  width: 200px;
  height: 200px;
  background-color: #409EFF;
}
</style>
