<template>
  <div class="goodslist-container">
    <transition @beforeEnter="beforeEnter" @enter="enter" @afterEnter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :SwiperImage="SwiperImage"></swiper>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="price">
            市场价:
            <span class="old">￥{{goodsinfo.market_price}}</span>销售价:
            <span class="now">￥{{goodsinfo.sell_price}}</span>
          </div>
          <div class="numbox">
            购买数量:
            <numbox @getcount="getSelectCount" :max="goodsinfo.stock_quantity"></numbox>
          </div>
          <div class="btn">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{goodsinfo.goods_no}}</p>
          <p>库存情况:{{goodsinfo.stock_quantity}}件</p>
          <p>上架时间:{{goodsinfo.add_time | dataFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="small" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="small" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodsinfo_numbox.vue";
export default {
  data() {
    return {
      SwiperImage: [],
      id: this.$route.params.id,
      goodsinfo: [],
      ballFlag: false,
      selectCount: 1
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(element => {
            element.img = element.src;
          });
          this.SwiperImage = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
      var goodsinfo = {
        id: this.id,
        count: this.selectCount,
        price: this.goodsinfo.sell_price,
        selected: true
      };
      this.$store.commit('addToCar',goodsinfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      el.offsetWidth;
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all .7s cubic-bezier(.56,-0.26,1,.46)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectCount(count) {
      this.selectCount = count;
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodslist-container {
  background-color: #eee;
  overflow: hidden;
  position: relative;
  /deep/ .mint-swipe {
    height: 300px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .price {
    color: #8f8f94;
    .old {
      text-decoration: line-through;
      padding: 0 15px 0 0;
    }
    .now {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .numbox {
    display: flex;
    height: 40px;
    align-items: center;
    color: #8f8f94;
    margin: 10px 0;
  }
  .mui-card-footer {
    display: flex;
    flex-flow: column;
    height: 120px;
    button {
      width: 80%;
      height: 40px;
    }
  }
  .ball {
    width: 13px;
    height: 13px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: 454px;
    left: 139px;
    z-index: 100;
  }
}
</style>