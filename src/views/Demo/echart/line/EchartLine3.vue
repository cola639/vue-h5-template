<template>
  <div class="EchartMidRightLine" id="EchartMidRightLine"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'EchartMidRightLine',
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
        this.initEchart()
      },
      deep: true
    }
  },
  methods: {
    initEchart() {
      const { months, intoNums, outNums } = this.extraData(this.echartData)
      if (months.length === 0) return

      console.log('🚀 >> initEchart >> months, intoNums, outNums :', months, intoNums, outNums)
      const chartDom = document.getElementById('EchartMidRightLine')
      this.echartInstance = echarts.init(chartDom)

      const option = {
        color: ['#138ffc', '#53cc5f'], // 没设置颜色都会继承这个颜色值

        grid: {
          bottom: '8%',
          left: '8%',
          right: '3%'
        },
        legend: {
          data: ['近一年入矫', '近一年出矫'],
          icon: 'rect',
          top: 20,
          itemGap: 25,
          textStyle: {
            color: '#fff',
            fontSize: 20,
            fontFamily: 'FZFont',
            fontWeight: 'bold'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: months,
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
              show: true,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff', // y轴文字
                fontSize: 15,
                fontFamily: 'FZFont',
                fontWeight: 'bold'
              }
            }
          }
        ],
        series: [
          {
            name: '近一年入矫',
            data: intoNums,
            type: 'line',
            itemStyle: {
              // 折线拐点标志的样式
              opacity: 0
            },
            lineStyle: { width: 3, color: '#138ffc' },
            areaStyle: {
              color: '#0d2d4c'
            }
          },
          {
            name: '近一年出矫',
            data: outNums,
            type: 'line',
            itemStyle: {
              // 折线拐点标志的样式
              opacity: 0
            },
            lineStyle: { width: 3, color: '#53cc5f' },
            areaStyle: {
              color: '#1e4f42'
            }
          }
        ]
      }
      this.echartInstance.setOption(option)
    },
    extraData(echartData) {
      const months = []
      const intoNums = []
      const outNums = []
      for (let i = 0; i < echartData.length; i++) {
        months.push(echartData[i].name)
        intoNums.push(echartData[i].intoNum)
        outNums.push(echartData[i].outNum)
      }

      return {
        months,
        intoNums,
        outNums
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.EchartMidRightLine {
  width: 771px;
  height: 340px;
}
</style>
