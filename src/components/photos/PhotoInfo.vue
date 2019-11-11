<template>
    <div class="photoinfo-container">
        <h4 class="title">{{photoinfo.title}}</h4>
    <p class="subtitle">
      <span>发表时间:{{photoinfo.add_time | dataFormat}}</span>
      <span>点击:{{photoinfo.click}}</span>
    </p>
    <hr />
    <div class="content" v-html="photoinfo.content"></div>
        <combox :id="id"></combox>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
    export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo:[]

    };
  },
  created() {
    this.getPhotoInfo()
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/"+this.id).then(result => {
        if (result.body.status === 0) {
         this.photoinfo=result.body.message[0];
        } else {
          
        }
      });
    }
  },
  components:{
      'combox':comment
  }
};
</script>

<style lang="scss" scoped>
.photoinfo-container {
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
  .content{
     font-size: 13px;
  }
}
</style>