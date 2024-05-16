<template>
  <div class="EchartBottomLeftLine" id="EchartBottomLeftLine"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'EchartLine2',
  components: {},
  data() {
    return {
      echartInstance: null
    }
  },
  props: {
    echartData: { type: Array, required: true }
  },
  created() {},
  mounted() {},
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
    // 图表初始化
    initEchart() {
      const { max, source } = this.extraData(this.echartData)

      const chartDom = document.getElementById('EchartBottomLeftLine')
      this.echartInstance = echarts.init(chartDom)

      const option = {
        grid: {
          left: '4%',
          right: '5%',
          top: '1%',
          bottom: '38%',
          containLabel: true
        },

        dataset: {
          source
        },

        xAxis: {
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 18,
              fontFamily: 'FZFont',
              fontWeight: 'bold'
            }
          }
        },
        yAxis: {
          type: 'category',
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 18,
              fontFamily: 'FZFont',
              fontWeight: 'bold'
            }
          }
        },

        series: [
          {
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 24,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: '#0583ff'
                  },
                  {
                    offset: 1,
                    color: '#0583ff'
                  }
                ])
              }
            },
            barWidth: '18', //柱子宽度，可设置像素值或百分比
            encode: {
              x: 'amount', // Map the "amount" column to X axis.
              y: 'product' // Map the "product" column to Y axis
            }
          },
          {
            name: '背景柱',
            type: 'bar',
            barWidth: '18',
            barGap: '-100%',
            data: max,
            itemStyle: {
              normal: {
                color: '#0b0f12',
                barBorderRadius: 30
              }
            }
          }
        ]
      }

      this.echartInstance.setOption(option)
    },
    // 组装数据函数
    extraData(echartData) {
      console.log('🚀 >> extraData >> echartData:', echartData)
      const maxValue = this.findMax(echartData)
      console.log('🚀 >> maxValue >> maxValue:', maxValue)
      let max = []
      let source = [['amount', 'product']]
      for (let i = 0; i < echartData.length; i++) {
        max.push(maxValue)
        source.push([echartData[i].value, echartData[i].name])
      }
      console.log('🚀 >> extraData >> source:', source)
      console.log('🚀 >> extraData >> max:', max)

      return { max, source }
    },

    // 找出对象数组最大值
    findMax(echartData) {
      const maxValue = echartData.reduce((max, current) => {
        const currentValue = parseInt(current.value, 10) // 将字符串转换为整数
        return currentValue > max ? currentValue : max
      }, 0)

      return maxValue
    }
  }
}
</script>

<style lang="scss" scoped>
.EchartBottomLeftLine {
  width: 800px;
  height: 800px;
}
</style>
