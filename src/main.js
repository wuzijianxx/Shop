//入口文件
import Vue from 'vue'

import app from './app.vue'
//获取  Mint-UI 组件
// import { Header, Swipe, SwipeItem,Button,Lazyload} from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
//导入vue-router 路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//导入路由组件
import router from './router.js'
//导入vue-resource 异步请求
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 设置获取Ajax获取数据的默认路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// Vue.http.options.root = 'http://120.77.181.41:3000/api';
// 设置以 post 方式发送数据时候采用表单格式提交
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};
//导入格式化时间的插件
import moment from 'moment'
Vue.filter('dataFormat',function (dataStr,pattern="YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
  })

  //导入图片缩略图
  import VuePreview from 'vue-preview'
  Vue.use(VuePreview)
  // Vue.use(VuePreview, {
  //   mainClass: 'pswp--minimal--dark',
  //   barsSize: {top: 0, bottom: 0},
  //   captionEl: false,
  //   fullscreenEl: false,
  //   shareEl: false,
  //   bgOpacity: 0.85,
  //   tapToClose: true,
  //   tapToToggleControls: false
  // })
var vm=new Vue({
    el:'#app',
    render:c=> c(app),
    router
})