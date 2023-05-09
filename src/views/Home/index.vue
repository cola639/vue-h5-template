<template>
  <div class="flex-column wrap"><m-card /> <m-card /> <m-card /></div>
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
<style lang="scss" scoped>
.wrap {
  background-color: #ed9426;
}
</style>
