<template>
  <div :class="[isEven ? 'isEven' : '', 'ScrollItem']">
    <div class="wrap">
      <div class="num">{{ order }}</div>
    </div>
    <div class="name">{{ item.name }}</div>
    <div class="status">{{ item.reason }}</div>
    <div class="time">{{ item.time }}</div>
    <el-tooltip placement="top-start" effect="light">
      <div slot="content" :style="{ fontSize: '25px' }">
        {{ item.address }}
      </div>
      <div class="address">{{ item.address }}</div>
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
    item: { type: Object, required: true },
    isEven: { type: Boolean },
    order: { type: Number }
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
    width: 10%;
    height: 100%;
  }
  .status {
    width: 20%;
    height: 100%;
  }
  .time {
    width: 30%;
    height: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
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
