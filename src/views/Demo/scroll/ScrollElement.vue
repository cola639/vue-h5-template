<template>
  <div class="ScrollElement">
    <div class="banner">
      <div class="name">姓名</div>
      <div class="status">报道情况</div>
      <div class="time">报到时间</div>
      <div class="address">报到地点</div>
    </div>
    <div class="scroll_parent_box" @mouseenter="mEnter" @mouseleave="mLeave">
      <div class="scroll_list" :style="{ transform: `translate(0px,-${scrollTop}px)` }">
        <div ref="scrollItemBox">
          <ScrollItem />
          <ScrollItem :isEven="true" />
          <ScrollItem />
          <ScrollItem :isEven="true" />
          <ScrollItem />
          <ScrollItem :isEven="true" />
        </div>
        <!-- <div v-html="copyHtml" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import ScrollItem from './ScrollItem.vue'
export default {
  name: 'ScrollElement',
  data() {
    return {
      scrollTop: 0, // 列表滚动高度
      speed: 50, // 滚动的速度
      timer: null, // 定时器
      listData: [], // 表示有多少个列表项
      copyHtml: '' // 复制多一份防止滚动到后面出现空白
    }
  },
  components: {
    ScrollItem
  },
  mounted() {
    // 如果列表数据是异步获取的，记得初始化在获取数据后再调用
    this.initScroll()
  },
  methods: {
    initScroll() {
      this.$nextTick(() => {
        // this.copyHtml = this.$refs.scrollItemBox.innerHTML // 不留空白
        this.startScroll()
      })
    },
    // 开始滚动
    startScroll() {
      this.timer = setInterval(this.scroll, this.speed)
    },
    // 滚动处理方法
    scroll() {
      this.scrollTop++
      // 获取需要滚动的盒子的高度
      let scrollItemBox = this.$refs.scrollItemBox.offsetHeight
      // 当判断滚动的高度大于等于盒子高度时，从头开始滚动
      if (this.scrollTop >= scrollItemBox) {
        this.scrollTop = 0
      }
    },
    // 鼠标移入停止滚动
    mEnter() {
      clearInterval(this.timer)
    },
    // 鼠标移出继续滚动
    mLeave() {
      this.startScroll()
    }
  }
}
</script>

<style lang="scss" scoped>
.ScrollElement {
  width: 100%;
  height: 438px;
  margin-top: 10px;
  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45px;
    line-height: 45px;
    color: #ffffff;

    font-size: 18px;
    font-weight: 700;
    background-color: #123665;
    .name {
      width: 30%;
      text-align: center;
    }
    .status {
      width: 20%;
    }
    .time {
      width: 20%;
    }
    .address {
      width: 30%;
    }
  }
}

.scroll_parent_box {
  width: 100%;
  height: 400px;
  overflow: hidden;
  box-sizing: border-box;
}

.scroll_list {
  transition: all 0ms ease-in 0s;
}

.scroll_item {
  color: #fff;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
}
</style>
