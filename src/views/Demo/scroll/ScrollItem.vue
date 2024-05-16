<template>
  <div :class="[isEven ? 'isEven' : '', 'ScrollItem']">
    <div class="wrap"><div class="num">1000</div></div>
    <div class="name">湾仔码头</div>
    <div class="status">报道可能有问题</div>
    <div class="time">2024年04月12日</div>
    <el-tooltip placement="top-start" content="Top Left 提示文字" effect="light">
      <div slot="content" :style="{ fontSize: '25px' }">
        香港特别行政区深水街道100号丸子码头发廊店
      </div>
      <div class="address">香港特别行政区深水街道100号丸子码头发廊店</div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'ScrollItem',
  components: {},
  data() {
    return {}
  },
  props: {
    isEven: { type: Boolean }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.isEven {
  background-color: #123665;
}

.ScrollItem {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  line-height: 70px;
  color: #ffffff;

  font-size: 18px;
  font-weight: 700;

  .wrap {
    width: 10%;
    display: flex;
    justify-content: center;
  }

  .num {
    padding: 3px;
    text-align: center;
    min-width: 35px;
    height: 35px;
    line-height: 35px;
    border-radius: 50%;
    background-color: #2db0ff;
  }
  .name {
    width: 20%;
    height: 100%;
  }
  .status {
    width: 20%;
    height: 100%;
  }
  .time {
    width: 20%;
    height: 100%;
  }
  .address {
    width: 30%;
    height: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
}
</style>
