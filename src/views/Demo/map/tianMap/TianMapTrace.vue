<template>
  <div class="TianMapTrace" :id="id"></div>
</template>

<script>
export default {
  name: 'TianMapTrace',
  components: {},
  data() {
    return {
      map: undefined
    }
  },
  props: {
    id: { type: String, required: true }
  },

  created() {},
  mounted() {
    this.initMap()
  },
  beforeDestroy() {},
  computed: {},
  watch: {},
  methods: {
    initMap() {
      // 缩放大小
      const zoom = 12
      // 初始化地图对象
      const map = new window.T.Map(this.id)
      // 经纬度集合
      const coordinates = [
        { lng: 116.41239, lat: 39.97569 },
        { lng: 116.412799, lat: 39.9068 },
        { lng: 116.3297, lat: 39.9294 },
        { lng: 116.38544, lat: 39.9061 }
      ]
      // 设置显示地图的中心点和级别
      map.centerAndZoom(new window.T.LngLat(116.40969, 39.9494), zoom)
      // 添加连线点
      const points = []
      for (let index = 0; index < coordinates.length; index++) {
        points.push(new window.T.LngLat(coordinates[index].lng, coordinates[index].lat))
      }
      // 创建线对象
      const line = new window.T.Polyline(points)
      // 向地图上添加线
      map.addOverLay(line)

      const startIconUrl = 'http://lbs.tianditu.gov.cn/images/bus/start.png' // 起点图标
      const progressIconUrl = 'http://api.tianditu.gov.cn/img/map/markerA.png' // 过程点
      const endIconUrl = 'http://lbs.tianditu.gov.cn/images/bus/end.png' // 终点图标

      // 向地图上添加自定义标注
      for (let index = 0; index < coordinates.length; index++) {
        let icon
        if (index !== 0 || index !== coordinates.length - 1) {
          icon = new window.T.Icon({
            iconUrl: progressIconUrl,
            iconSize: new T.Point(40, 40),
            iconAnchor: new T.Point(12, 31)
          })
        }
        if (index === 0) {
          icon = new window.T.Icon({
            iconUrl: startIconUrl,
            iconSize: new T.Point(50, 50),
            iconAnchor: new T.Point(12, 31)
          })
        }
        if (index === coordinates.length - 1) {
          icon = new window.T.Icon({
            iconUrl: endIconUrl,
            iconSize: new T.Point(50, 50),
            iconAnchor: new T.Point(12, 31)
          })
        }

        const maker = new window.T.Marker(
          new window.T.LngLat(coordinates[index].lng, coordinates[index].lat),
          { icon: icon }
        )
        map.addOverLay(maker)
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
