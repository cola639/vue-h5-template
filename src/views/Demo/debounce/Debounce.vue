<template>
  <div class="demo">
    <van-search v-model="query" @input="debounceSearch" />
  </div>
</template>

<script>
import { debounce } from '@/utils/index'
export default {
  name: 'Debounce',
  components: {},
  data() {
    return { debounceSearch: undefined }
  },
  props: {},
  created() {
    // 创建防抖函数
    this.debounceSearch = debounce(this.search, 1000)
  },
  mounted() {},
  beforeDestroy() {},
  computed: {},
  watch: {},
  methods: {
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
