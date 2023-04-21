<template>
  <div class="flex-column">
    <m-card />
    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
    >
      <template #tags>
        <van-tag plain type="danger">标签</van-tag>
        <van-tag plain type="danger">标签</van-tag>
      </template>
      <template #footer>
        <van-button size="mini" @click="handleTotast">按钮1</van-button>
        <van-button size="mini">按钮2</van-button>
      </template>
    </van-card>
  </div>
</template>
<script>
import MCard from '@/components/mCard'

export default {
  name: 'Home',
  components: { MCard },
  data() {
    return {}
  },

  methods: {}
}
</script>
<style lang="scss" scoped></style>
