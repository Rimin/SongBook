// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// vue-cli项目使用的一个主js文件,这是在webpack配置的时候定义的,是主js入口
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import fastclick from 'fastclick'

import 'common/less/base.less'
import 'common/css/font-awesome.min.css'

fastclick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App }, // 主组件的模板
  template: '<App/>' // 使用导入的App,es6对象写法
})
