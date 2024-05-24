<template>
  <div class="flex-column-space-around consultation">
    <div class="flex-space-around consultation_top">
      <img class="consultation_top_img" src="../../assets/erwei3.png" />
    </div>
    <div class="consultation_bottom">
      <el-button class="flex-column consultation_bottom_btn" type="primary" @click="openConsult">
        立即咨询
      </el-button>
    </div>
    <chat-box class="chatbox_wrap" v-if="chatboxVisible" :closeConsult="closeConsult" />
  </div>
</template>
<script>
import ChatBox from './ChatBox.vue'

export default {
  name: 'Consultation',
  components: { ChatBox },
  data() {
    return {
      chatboxVisible: false
    }
  },
  props: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  watch: {},
  methods: {
    openConsult() {
      this.chatboxVisible = true
    },
    closeConsult() {
      this.chatboxVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.consultation {
  background-color: #fff;
  // width: 10.5rem;
  width: 6.6rem;
  /* height: 7.25rem; */
  padding: 2px 2px;
  cursor: pointer;
  &_top {
    /* width: 100%;
    height: 68%; */
    &_img {
      width: 100%;
      /* height: 3.75rem; */
    }
    &_info {
      width: 5.625rem;
      height: 3.875rem;
      font-size: 0.75rem;
      font-weight: 700;
      p {
        margin-top: 1px;
      }
    }
  }
  .consultation_bottom {
    width: 100%;
    height: 30%;
    &_btn {
      width: 100%;
      height: 100%;
    }
  }
}
.chatbox_wrap {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
</style>
