import Vue from 'vue'
import App from './App.vue'

import PeonyImageLight from './index.js'
Vue.use(PeonyImageLight)

new Vue({
  el: '#app',
  render: h => h(App)
})
