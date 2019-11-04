import VueRouter from 'vue-router'

import HomeContainer from './components/footer/HomeContainer.vue'
import VipContainer from './components/footer/VipContainer.vue'
import ShopcarContainer from './components/footer/ShopcaoContainer.vue'
import SearchContainer from './components/footer/SearchContainer.vue'

//创建路由对象
var router = new VueRouter({
    routes: [
        {path:'/',redirect:'/home'},
        {path:'/home',component:HomeContainer},
        {path:'/vip',component:VipContainer},
        {path:'/shopcar',component:ShopcarContainer},
        {path:'/search',component:SearchContainer}
    ],
    linkActiveClass:'mui-active'
})

export default router