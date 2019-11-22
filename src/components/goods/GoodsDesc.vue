<template>
  <div class="goodsdesc-container">
    <div class="title">{{goodsdesc.title}}</div>
    <div class="content" v-html="goodsdesc.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsdesc: [],
      id: this.$route.params.id
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      this.$http.get("api/goods/getdesc/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsdesc = result.body.message[0];
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.goodsdesc-container {
  .title {
    height: 50px;
    border-bottom: 2px solid #ddd;
    text-align: center;
    line-height: 50px;
    color: #24a2ff;
    font-size: 15px;
  }
  /deep/ .content {
    margin: 0 5px;
    img{
        width: 100%;
    }
      p{
      margin-bottom: 0;
      img {
        width: 100%;
        height: 100%;
        display: block;
    }
    }
   table{
      width: 100%;
      img{
        width: 100%;
        height: 150px;
        display: block;
      }
    }
    .ke-zeroborder{
      td{
        width: 10%;
      }
    }
  }
}
</style>