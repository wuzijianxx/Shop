<template>
  <div class="photo-container">
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class=" mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      
      >
        <div class="mui-scroll">
          <!-- <a  class="mui-control-item mui-active">全部</a> -->
          <a 
            @tap="getPhotoListByCateId(item.id)"
            v-for="(item, index) in cates"
            :key="index"
            :class="['mui-control-item',item.id==0 ?'mui-active':'']"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <ul>
      <router-link tag="li" :to="'/home/photoinfo/'+item.id" v-for="(item,index) in list" :key="index">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
import mui from "../../lib/mui/js/mui.min.js";
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      cates: [],
      list: [],
    //   pageIndex: 1
    };
  },
  created() {
    this.getAllcategory();
    this.getPhotoListByCateId(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllcategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({id:0,title:'全部'});
          this.cates = result.body.message;
           // 分类数据加载完成之后加载全部的数据
        //   this.getPhotoListByCateId(false, "");
        }
      });
    },
    // 参数 isNewType 判断是否需要分页查找还是换一个分类查找
    getPhotoListByCateId(cateId) {
         // 如果有传入type 则保存旧的type, 如果没有传入type则type就是上一次的type
    //   if (cateType != undefined) {
    //     this.cateType = cateType;
    //   }
    //   if (cateType == "全部") {
    //     append = true;
    //     cateType = "";
    //   }
    //   console.log(append);
    //   if (append) {
    //     Indicator.open("加载中...");
    //     setTimeout(() => {
    //       Indicator.close();
    //           this.pageIndex += 1;
    //     }, 500);
    //   } else {
    //     this.pageIndex = 1;
    //   }
      this.$http
        .get("api/getimages/" + cateId )
        .then(result => {
        //   if (append) {
            // if (result.body.status !== 1) {
            //   this.pageIndex = this.pageIndex - 1;
            //   return Toast("没有更多数据了");
            // }
            if (result.body.status === 0) {
            this.list = result.body.message;
            }
        //   } else {
        //     this.list = result.body.phos;
        //   }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.photo-container {
  padding: 0 5px 50px 5px;
  .mui-slider{
    touch-action: pan-y;
  }
  ul {
    li {
      list-style: none;
      text-align: center;
      background-color: #ccc;
      margin: 0 10px 10px;
      border-radius: 8px;
      box-shadow: 0 0 8px #999;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
        vertical-align: middle;
        border-radius: 8px;
      }
      img[lazy="loading"] {
        width: 40px;
        height: 200px;
        margin: auto;
      }
      .info {
        overflow: hidden;
        position: absolute;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        text-align: left;
        max-height: 80px;
        width: 100%;
        color: white;
        //  text-overflow: ellipsis;
        //  white-space: nowrap;
        .info-title {
          font-size: 14px;
        }
          .info-body {
            font-size: 13px;
          }
      }
    }
  }
}
</style>