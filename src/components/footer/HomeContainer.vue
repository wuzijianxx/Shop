<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in SwiperArry" :key=index><img :src=item></mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
    export default {
        data(){
            return{
                SwiperArry:[]
            }
        },
        created(){
            this.getLunbotu()
        },
        methods:{
            getLunbotu(){
                this.$http.get("getcover").then(result =>{
                        if(result.body.status === 1 ){
                            this.SwiperArry = result.body.imgs;
                            console.log(result.body);
                        }else{
                            alert("获取失败")
                        }
                    })
            }
        }
    }

</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    line-height: 200px;
    color: white;
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: blue;
    }
    &:nth-child(3) {
      background-color: pink;
    }
  }
}
</style>