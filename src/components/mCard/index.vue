<template>
  <div class="flex-center card_wrap">
    <div class="card_left">
      <img src="https://img01.yzcdn.cn/vant/ipad.jpeg" />
    </div>
    <div class="card_right">
      <div class="card_title">卡片标题</div>
      <div class="card_description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa dolore perferendis magni,
        alias et officia modi dicta! Corrupti quam cum dolorem aliquam explicabo esse reiciendis.
      </div>
      <svg-icon icon-class="user" />
      <van-button class="card_btn" @click="handleTotast" type="warning"> 消息弹窗 </van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MCard',
  components: {},
  data() {
    return {}
  },
  props: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  watch: {},
  computed: {},
  methods: {
    handleTotast() {
      console.log('消息提示')
      this.$toast('消息提示')
    }
  }
}
</script>
<style lang="scss" scoped>
.card_wrap {
  width: 300px;
  height: 300px;
  padding: 6px;
  margin: 8px 0;
  background-color: #fff;
  box-shadow: 0 8px 12px #ebedf0;
  border-radius: 5px;
}

.card_left,
.card_right {
  flex: 1;
}

.card_left {
  img {
    width: 100%;
    height: 100%;
  }
}

.card_right {
  .card_title {
    font-size: 20px;
  }
  .card_description {
    margin-top: 8px;
    font-size: 16px;
  }

  .card_btn {
    margin-top: 8px;
    margin-left: 8px;
    width: 80px;
    height: 38px;
    padding: 5px;
    font-size: 16px;
  }
}
</style>
