<template>
  <div class="app-container">
    <!-- header 头部区域 -->
    <mt-header :title="title">
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <!-- main 路由区域 -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- footer 底部区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-list" to="/home" id="defaultTab">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-list" to="/vip">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-list" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-list" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      title: "首页"
    };
  },
  created() {
    this.flag = this.$route.path === "/home" ? false : true;
    console.log(this.flag);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  watch: {
    "$route.path"(newVal) {
      if (newVal === "/home") {
        this.flag = !this.flag;
      } else {
        this.flag = true;
      }
      if (newVal === "/home") {
        this.title = "首页";
      } else if (newVal === "/vip") {
        this.title = "会员";
      } else if (newVal === "/shopcar") {
        this.title = "购物车";
      } else {
        this.title = "搜索";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-header {
  position: fixed;
  width: 100%;
  z-index: 102;
  top: 0;
}
.app-container {
  padding-top: 40px;
  overflow-x: hidden;
  padding-bottom: 50px;
  touch-action: pan-y;
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.mui-bar-tab .mui-tab-item-list.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item-list {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mui-tab-item-list .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-list .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
