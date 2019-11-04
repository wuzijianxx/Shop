//入口文件
import Vue from 'vue'

import app from './app.vue'

import { Header, Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import router from './router.js'

import VueResource from 'vue-resource'
Vue.use(VueResource)

// 设置获取Ajax获取数据的默认路径
Vue.http.options.root = 'http://120.77.181.41:3000/api';
// 设置以 post 方式发送数据时候采用表单格式提交
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};




var vm=new Vue({
    el:'#app',
    render:c=> c(app),
    router
})