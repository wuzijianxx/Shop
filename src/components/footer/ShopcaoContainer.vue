<template>
  <div class="shopcar-container">
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="goodslist" v-for="(item, index) in goodslist" :key="index">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectChanged(item.id,$store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <div class="goodslist-right">
              <img :src="item.thumb_path" />
              <div class="info">
                <h1>{{item.title}}</h1>
                <p>
                  <span class="price">￥{{item.sell_price}}</span>
                  <numbox :initCount="item.id" :goodsid="item.id"></numbox>
                  <a href="#" @click.prevent="remove(item.id,index)">删除</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="account">
            <div class="account-left">
              <span>总计（不含运费）</span>
              <p>
                已勾选商品
                <span>{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价:
                <span>￥{{$store.getters.getGoodsCountAndAmount.amount}}</span>
              </p>
            </div>
            <div class="account-right">
              <mt-button type="danger" size="small">去结算</mt-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../subcomponents/shopCar_numbox.vue";
export default {
  data() {
    return {
        goodslist:[]
    };
  },
  created(){
      this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join())
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          }
        });
    },
    remove(id,index){
        this.goodslist.splice(index,1);
        this.$store.commit('removeFormCar',id)
    },
    selectChanged(id,val){
        this.$store.commit('updateGoodsSelected',{id,selected:val})
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goodslist {
    display: flex;
    justify-content: space-between;
    align-items: center;
      margin-bottom: 15px;
    .goodslist-right {
      display: flex;
      justify-content: space-around;
      width: 250px;
      img {
        width: 60px;
        height: 60px;
      }
    }
    h1 {
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 170px;
      height: 20px;
      line-height: 20px;
      white-space: nowrap;
    }
    .info {
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      height: 65px;
      p {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 170px;
        margin: 0;
        .price {
          color: red;
          font-weight: bold;
        }
      }
    }
  }
  .account {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .account-left {
      > span {
        color: #8f8f94;
      }
      p {
        margin: 10px 0 0 0;
        span {
          color: red;
          font-weight: bold;
          font-size: 18px;
          padding: 0 3px;
        }
      }
    }
  }
}
</style>