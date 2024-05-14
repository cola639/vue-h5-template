<template>
  <div class="demo">
    <van-search v-model="query" @input="onChange" />
  </div>
</template>

<script>
import { debounce } from '@/utils/index'
export default {
  name: 'demo',
  components: {},
  data() {
    return { debounceSearch: undefined }
  },
  props: {},
  created() {},
  mounted() {
    // 创建防抖函数
    this.debounceSearch = debounce(this.search, 1000)
  },
  beforeDestroy() {},
  computed: {},
  watch: {},
  methods: {
    onChange() {
      this.debounceSearch() // 使用防抖函数
    },
    search() {
      console.log('Ajax request')
    }
  }
}
</script>

<style lang="scss" scoped>
.demo {
}
</style>
