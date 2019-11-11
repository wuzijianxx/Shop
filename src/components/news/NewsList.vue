<template>
  <div class="newlist-container">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="(item,index) in newsList" :key="index">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h5>{{ item.title }}</h5>
            <p class="mui-ellipsis">
              <span>发表时间:{{item.add_time | dataFormat}}</span>
              <span>点击:{{item.click}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newsList:[]
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$http.get('api/getnewslist').then(result => {
        if (result.body.status === 0) {
        //   if (!result.body.news) {
        //     Toast("没有更多的新闻了~~");
        //     return;
        //   }
          
          this.newsList = result.body.message;
          console.log(result.body.news);
        //   this.pageIdx++;
        } else {
          Toast("获取失败!");
        }
      });
    }
  },
//   filters:{
//        time() {
//                     let dt = new Date();
//                     let y = dt.getFullYear();
//                     let m = dt.getMonth() + 1;
//                     let r = dt.getDate();
//                     let xq = dt.getDay();
//                     let aWeekTxt = ['周日', '星期一', '星期二', '星期三', '星期四', '星期五', '周六'];
//                     return `${y}-${m}-${r} ${aWeekTxt[xq]}`;
//                 }
//   }
};
</script>

<style lang="scss" scoped>

.newlist-container{
    padding-bottom: 50px;
    position: relative;
.mui-table-view {
  li {
    .mui-ellipsis {
      display: flex;
      justify-content: space-between;
      color: #226aff;
      font-size: 12px;
    }
  }
}
}

</style>