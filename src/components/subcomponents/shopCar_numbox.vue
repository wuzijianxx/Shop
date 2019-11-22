<template>
  <div>
    <div
      class="mui-numbox"
      data-numbox-step="1"
      data-numbox-min="1"
      style="height:28px;width:80px;"
    >
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input
        id="test"
        @change="countChange"
        readonly
        class="mui-input-numbox"
        type="number"
        :value="$store.getters.getGoodsCount[initCount]"
        ref="num"
      />
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  data() {
    return {};
  },
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChange() {
      this.$store.commit("updateGoodsInfo", {
        id: this.goodsid,
        count: this.$refs.num.value
      });
    }
  },
  props: ["initCount", "goodsid"]
};
</script>

<style lang="scss" scoped>
.mui-numbox {
  padding: 0;
  button {
    width: 30px;
  }
}
</style>