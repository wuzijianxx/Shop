<template>
  <div class="newsinfo-container">
    <h4 class="title">{{newsinfo.title}}</h4>
    <p class="subtitle">
      <span>发表时间:{{newsinfo.add_time | dataFormat}}</span>
      <span>点击:{{newsinfo.click}}</span>
    </p>

    <hr />

    <div class="content" v-html="newsinfo.content"></div>
 
    <combox :id="id"></combox>

  </div>
</template>


<script>
import comment from '../subcomponents/comment.vue'

import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsinfo:''
    }
  },
  created(){
      this.getNewsInfo()
  },
  methods:{
      getNewsInfo(){
          this.$http.get('api/getnew/'+this.id).then(result =>{
              if (result.body.status === 0) {
                  this.newsinfo =result.body.message[0];
              }else{
                  Toast("获取失败!");
              }
          })
      }
  },
  components:{
      'combox':comment
  }
};
</script>

<style lang="scss" scoped>
.newsinfo-container {
    padding: 0 4px;
  .title {
    color: red;
    text-align: center;
    }
    .subtitle {
        display: flex;
        justify-content: space-between;
      span {
        color: #22aaff;
      }
  }
}
</style>