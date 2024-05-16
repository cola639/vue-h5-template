<template>
  <div class="EchartBottomCenterLine" id="EchartBottomCenterLine"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'EchartLine1',
  components: {},
  data() {
    return { echartInstance: null }
  },
  props: { echartData: { type: Array, required: true } },
  created() {},
  mounted() {
    this.initEchart()
  },
  beforeDestroy() {},
  computed: {},
  watch: {
    echartData: {
      handler(newVal, oldVal) {
        console.log('🚀 >> handler >> newVal:', newVal, oldVal)
        this.initEchart()
      },
      deep: true
    }
  },
  methods: {
    initEchart() {
      const chartDom = document.getElementById('EchartBottomCenterLine')
      this.echartInstance = echarts.init(chartDom)
      const { hours, events } = this.extraData(this.echartData)
      console.log('🚀 >> initEchart >> hours, events:', hours, events)

      // const hours = ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
      // const events = [820, 932, 901, 934, 1290, 1330, 1320]
      const option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: hours,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff', //X轴文字颜色
              fontSize: 18,
              fontFamily: 'FZFont',
              fontWeight: 'bold'
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            nameTextStyle: {
              color: '#ebf8ac'
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: true
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff', //X轴文字颜色
                fontSize: 18,
                fontFamily: 'FZFont',
                fontWeight: 'bold'
              }
            }
          }
        ],
        series: [
          {
            data: events,
            type: 'line',
            itemStyle: {
              //折线拐点标志的样式
              // color: '#058cff'
              opacity: 0 // 不绘制
            },
            lineStyle: {
              width: 5,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
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
            }
          }
        ]
      }
      this.echartInstance.setOption(option)
    },
    extraData(echartData) {
      const hours = []
      const events = []

      for (let i = 0; i < echartData.length; i++) {
        const hour = echartData[i].Hour
        const count = echartData[i].EventCount || 0

        hours.push(hour)
        events.push(count)
      }

      return { hours, events }
    }
  }
}
</script>
<style lang="scss" scoped>
.EchartBottomCenterLine {
  width: 627px;
  height: 516px;
}
</style>
