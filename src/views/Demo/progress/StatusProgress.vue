<template>
  <div class="statusProgress">
    <div class="title">{{ item.title }}</div>
    <div class="wrap">
      <el-progress
        :width="300"
        :stroke-width="20"
        :percentage="item.number"
        color="#3f85ff"
        :format="format"
        text-inside
      ></el-progress>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StatusProgress',
  components: {},
  data() {
    return {}
  },
  props: {
    item: { type: Object, required: true }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  watch: {},
  methods: {
    format(percentage) {
      return percentage
    }
  }
}
</script>
<style lang="scss" scoped>
.statusProgress {
  width: 400px;
  display: flex;
  margin-top: 18px;
}

.title {
  color: #ffffff;

  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 1.44px;
  line-height: normal;
  margin-right: 18px;
  text-align: right;
  display: inline-block;
  width: 130px;
}

.wrap {
  width: 330px;
  margin-left: 12px;
}

/deep/.el-progress {
  .el-progress-bar__outer {
    background-color: #0c0f12;
  }

  .el-progress-bar__innerText {
    font-size: 16px;
    font-weight: 500;
    margin: 0 -30px;
    padding-bottom: 1px;
  }
}
</style>
