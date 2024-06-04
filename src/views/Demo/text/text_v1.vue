<template>
  <!-- 当一个div使用 -->
  <el-tooltip placement="top-start" effect="light">
    <div slot="content" :style="{ fontSize: '25px' }">
      {{ item.address }}
    </div>
    <div class="address">{{ item.address }}</div>
  </el-tooltip>
</template>

<script>
export default {
  name: 'text_v1',
  components: {},
  data() {
    return {}
  },
  props: {
    width: { type: Number, required: true }
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
.address {
  width: 30%;
  height: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>
