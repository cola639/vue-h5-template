<template>
  <span>{{ timeText }}</span>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Timer',
  components: {},
  data() {
    return { timerId: null, timeText: '' }
  },
  props: {},
  created() {},
  mounted() {
    this.timerId = setInterval(this.setTime, 1 * 1000)
  },
  beforeDestroy() {
    this.timerId ? clearInterval(this.timerId) : null
  },
  computed: {},
  watch: {},
  methods: {
    setTime() {
      this.timeText = moment().format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="scss" scoped></style>
