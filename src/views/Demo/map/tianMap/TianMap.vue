<template>
  <div class="TianMap" :id="id"></div>
</template>

<script>
export default {
  name: 'TianMap',
  components: {},
  data() {
    return {
      map: undefined
    }
  },
  props: {
    id: { type: String, required: true },
    marks: { type: Array, required: true }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  watch: {
    marks: {
      handler(newVal, oldVal) {
        console.log('🚀 >> handler >> newVal:', newVal, oldVal)
        this.initMap()
      },
      deep: true
    }
  },
  methods: {
    initMap() {
      const zoom = 12
      //初始化地图对象
      this.map = new window.T.Map(this.id)
      //设置显示地图的中心点和级别
      this.map.centerAndZoom(new window.T.LngLat(113.57, 22.27), zoom)

      // 创建图片对象
      const icon = new window.T.Icon({
        iconUrl: 'http://api.tianditu.gov.cn/img/map/markerA.png',
        iconSize: new window.T.Point(19, 27),
        iconAnchor: new window.T.Point(10, 25)
      })

      // 添加标注点
      for (let index = 0; index < this.marks.length; index++) {
        // const mark = new window.T.Marker(
        //   new window.T.LngLat(this.marks[index].longitude, this.marks[index].latitude),
        //   {
        //     icon: icon
        //   }
        // )

        const mark = new window.T.Marker(new window.T.LngLat(113.57, 22.27), {
          icon: icon
        })

        // 向地图上添加自定义标注
        this.map.addOverLay(mark)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.TianMap {
  width: 100%;
  height: 100%;
}
</style>
