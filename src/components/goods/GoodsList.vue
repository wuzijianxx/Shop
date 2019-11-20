<template>
  <div class="goods-container">
    <div
      class="goods-list"
      v-for="(item,index) in goodslist"
      :key="index"
      @click="getDetail(item.id)"
    >
      <img :src="item.img_url" alt />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getGoodsList">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodslist: [],
      pageIndex: 1
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$http
        .get("api/getgoods?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = this.goodslist.concat(result.body.message);
            this.pageIndex++;
          }
        });
    },
    getDetail(id) {
      this.$router.push({ name: "goodsinfo", params: { id } });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.goods-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 5px;
  .goods-list {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    width: 49%;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-shadow: 0 0 3px #ccc;
    margin-bottom: 5px;
    img {
      width: 100%;
      margin: 0 auto;
    }
    h1 {
      height: 20px;
      line-height: 20px;
      font-size: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-left: 4px;
    }
    .info {
      background-color: #eee;
      margin: 0 3px 3px;
      height: 70px;
      .price {
        height: 40px;
        line-height: 40px;
        margin-left: 8px;
        .now {
          font-size: 18px;
          color: red;
          font-weight: bold;
        }
        .old {
          margin-left: 10px;
          font-size: 12px;
          text-decoration: line-through;
        }
      }
      .sell {
        height: 30px;
        margin: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>