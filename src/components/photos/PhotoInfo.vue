<template>
  <div class="photoinfo-container">
    <h4 class="title">{{photoinfo.title}}</h4>
    <p class="subtitle">
      <span>发表时间:{{photoinfo.add_time | dataFormat}}</span>
      <span>点击:{{photoinfo.click}}</span>
    </p>
    <hr />
    <div class="preview-img">
      <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
    </div>

    <div class="content" v-html="photoinfo.content"></div>
    <combox :id="id"></combox>
  </div>
</template>

<script>
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: [],
      slide1:[]
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        }
      });
    },
     getThumbs(){
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
           result.body.message.forEach(element => {
             element.w=600;
             element.h=400;
             element.msrc=element.src;
           });
          this.slide1 = result.body.message;
        }
        })
     },
     handleClose(){
          console.log('close event');
      }
    },
  components:{
    combox: comment
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
  .content {
    font-size: 13px;
  }
  .preview-img{
      /deep/ .my-gallery{
       display: flex;
       flex-wrap: wrap;
       figure{
         width: 30%;
         margin: 5px;
           img{
           width: 100%;
         }
     }
     }
  }
}
</style>