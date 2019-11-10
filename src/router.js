import VueRouter from 'vue-router'

import HomeContainer from './components/footer/HomeContainer.vue'
import VipContainer from './components/footer/VipContainer.vue'
import ShopcarContainer from './components/footer/ShopcaoContainer.vue'
import SearchContainer from './components/footer/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photo/PhotoList.vue'

//创建路由对象
var router = new VueRouter({
    routes: [
        {path:'/',redirect:'/home'},
        {path:'/home',component:HomeContainer},
        {path:'/vip',component:VipContainer},
        {path:'/shopcar',component:ShopcarContainer},
        {path:'/search',component:SearchContainer},
        {path:'/home/newslist',component:NewsList},
        {path:'/home/Newsinfo/:id',component:NewsInfo},
        {path:'/home/PhotoList',component:PhotoList},
    ],
    linkActiveClass:'mui-active'
})

export default router