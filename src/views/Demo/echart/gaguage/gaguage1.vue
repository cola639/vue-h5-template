<template>
  <div id="EchartHeadRightPie"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'EchartHeadRightPie',
  components: {},
  data() {
    return { echartInstance: null }
  },
  props: {
    echartData: { type: Number, required: true, default: 0 }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  watch: {
    echartData: {
      handler(newVal, oldVal) {
        this.initEchart()
      },
      deep: true
    }
  },
  methods: {
    // 图表初始化
    initEchart() {
      const chartDom = document.getElementById('EchartHeadRightPie')
      this.echartInstance = echarts.init(chartDom)
      const dataArr = [
        {
          value: this.echartData
        }
      ]
      const color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: '#6defff' // 0% 处的颜色
        },
        {
          offset: 0.17,
          color: '#24a2ff' // 100% 处的颜色
        },
        {
          offset: 0.9,
          color: '#0f8dff' // 100% 处的颜色
        },
        {
          offset: 1,
          color: '#6defff' // 100% 处的颜色
        }
      ])
      const colorSet = [[1, color]]
      const rich = {
        white: {
          fontSize: 30,
          color: '#fff',
          fontWeight: '500'
          // padding: [-150, 0, 0, 0]
        },
        bule: {
          fontSize: 22,
          fontFamily: 'DINBold',
          color: '#fff',
          fontWeight: '700'
        },
        radius: {
          width: 360,
          height: 180,
          borderWidth: 10,
          borderColor: '#0092F2',
          // fontSize: 50,
          color: '#fff',
          backgroundColor: '#1B215B',
          borderRadius: 20,
          textAlign: 'center'
        },
        size: {
          height: 400,
          padding: [100, 0, 0, 0]
        }
      }
      const option = {
        title: [
          {
            text: '报到率',
            x: 'center',
            top: '30%',
            textStyle: {
              color: '#fff',
              fontSize: 20,
              fontWeight: '700'
            }
          },
          {
            text: `${this.echartData}%`,
            x: 'center',
            top: '50%',
            textStyle: {
              color: '#fff',
              fontSize: 25,
              fontWeight: '700'
            }
          }
        ],
        series: [
          {
            type: 'gauge',
            radius: '100%',
            // startAngle: '180',
            // endAngle: '0',
            // 指针
            pointer: {
              show: true
            },
            data: dataArr,
            title: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: colorSet,
                width: 25,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            animationDuration: 4000
          },
          {
            name: '白色圈刻度',
            type: 'gauge',
            radius: '95%',
            min: 0,
            max: 100,
            splitNumber: 4,
            // z: 4,
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              color: 'rgba(255,255,255,8)',
              fontSize: 18
            }, //刻度节点文字颜色
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 0,
                name: ''
              }
            ]
          }
        ]
      }
      this.echartInstance.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
#EchartHeadRightPie {
  width: 380px;
  height: 300px;
}
</style>
