<template>
  <div class="cmt-container">
    <h4>发表评论</h4>
    <hr />
    <textarea placeholder="请输入要BB的内容(最多吐槽120字)" maxlength="120" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in comments" :key="index">
        <div class="cmt-title">
          <span>第{{index+1}}楼</span>
          <span>用户:{{item.user_name}}</span>
          <span>发表时间:{{item.add_time | dataFormat}}</span>
        </div>
        <div class="cmt-body">{{item.content=="" ? '此用户很懒,嘛都没说' : item.content}}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      comments: [],
      pageIndex: 1,
      msg: ""
    };
  },
  created() {
    this.getNewsCom();
  },
  methods: {
    getNewsCom() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            Indicator.open("加载中...");
            setTimeout(() => {
              Indicator.close();
              this.comments = this.comments.concat(result.body.message);
            }, 500);
          } else {
            Toast("没有评论了哟~");
          }
        });
    },
    getMore() {
      this.pageIndex++;
      this.getNewsCom();
    },
    postComment() {
      if (this.msg.trim().length == "") {
        return Toast("评论内容不能为空");
      }
      this.$http
        .post("api/postcomment/" + this.id, {
          content: this.msg
        })
        .then(result => {
          if (result.body.status === 0) {
            this.comments.unshift({ user_name:"匿名用户", content: this.msg.trim() });
            this.msg = "";
          }else{
              Toast("发表评论失败");
          }
        });
    }
  },
  props: ["id"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
  padding-bottom: 60px;
  textarea {
    height: 85px;
    font-size: 14px;
    margin: 0;
  }
}
.cmt-list {
  margin-top: 5px;
  .cmt-item {
    .cmt-title {
      font-size: 13px;
      background-color: #ccc;
      line-height: 30px;
      text-indent: 1em;
      span:nth-child(2) {
        padding: 0 5px;
      }
    }
    .cmt-body {
      font-size: 14px;
      text-indent: 2em;
      line-height: 35px;
    }
  }
}
</style>