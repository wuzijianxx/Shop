import VueRouter from 'vue-router'

import HomeContainer from './components/footer/HomeContainer.vue'
import VipContainer from './components/footer/VipContainer.vue'
import ShopcarContainer from './components/footer/ShopcaoContainer.vue'
import SearchContainer from './components/footer/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

//创建路由对象
var router = new VueRouter({
    routes: [
        {path:'/',redirect:'/home'},
        {path:'/home',component:HomeContainer},
        {path:'/vip',component:VipContainer},
        {path:'/shopcar',component:ShopcarContainer},
        {path:'/search',component:SearchContainer},
        {path:'/home/newslist',component:NewsList},
        {path:'/home/newsinfo/:id',component:NewsInfo},
        {path:'/home/photolist',component:PhotoList},
        {path:'/home/photoinfo/:id',component:PhotoInfo},
        {path:'/home/goodslist',component:GoodsList},
        {path:'/home/goodsinfo/:id',component:GoodsInfo,name:'goodsinfo'},
        {path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'},
        {path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'},
    ],
    linkActiveClass:'mui-active'
})

export default router