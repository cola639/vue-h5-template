<template>
  <div class="EchartBottomCenterPie">
    <div id="EchartBottomCenterPie" :style="{ width: '100%', height: '100%' }"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'EchartBottomCenterPie',
  components: {},
  data() {
    return {
      echartInstance: null,
      timerId: null
    }
  },
  props: { echartData: { type: Array, required: true } },
  created() {},
  mounted() {
    this.initEchart()
  },
  beforeDestroy() {
    this.timerId ? clearInterval(this.timerId) : null
  },
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
      const chartDom = document.getElementById('EchartBottomCenterPie')
      this.echartInstance = echarts.init(chartDom)
      const colorList = ['#2e61ff', '#44ffff', '#47b7fd']
      const data = this.echartData
      const sum = this.calSum(this.echartData)
      console.log('🚀 >> initEchart >> data:', data)

      const option = {
        tooltip: {
          trigger: 'item'
        },

        title: {
          text: '{styleA|总计}' + '\n' + '\n' + `{styleA|${sum}}`,
          left: '35%',
          top: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 25,
            fontFamily: 'FZFont',
            fontWeight: 'bold',
            rich: {
              styleA: {
                color: '#08FFFF',
                fontSize: 25,
                fontWeight: 'bold',
                align: 'center'
              }
            }
          }
        },

        legend: {
          show: true,
          data,
          top: '50',
          right: '-10',
          itemWidth: 20,
          itemHeight: 20,
          width: 20,
          padding: [0, 10],
          formatter: function(name) {
            let temp = data.find(ele => name === ele.name)
            return `{styleA|${temp.name}}` + '\n' + '\n' + `{styleB|${temp.value}}`
          },

          itemGap: 60,
          textStyle: {
            color: '#fff',
            fontFamily: 'FZFont',
            fontWeight: 'bold',
            rich: {
              styleA: {
                fontSize: 18,
                fontWeight: 'bold'
              },
              styleB: {
                fontSize: 22,
                fontWeight: 'bold'
              }
            }
          }
        },

        series: [
          {
            data,
            name: '',
            type: 'pie',
            radius: ['50%', '60%'],
            color: colorList,
            left: '-20%',
            avoidLabelOverlap: false,
            label: {
              show: true,
              color: '#fff',
              fontSize: 15,
              fontFamily: 'FZFont'
            },
            emphasis: {
              label: {
                show: true
              }
            },
            label: {
              show: true
            },
            labelLine: {
              show: true
            }
          }
        ]
      }

      this.echartInstance.setOption(option)
      this.intervalPlay(option, data)
    },

    intervalPlay(option, data) {
      const delay = 3 // 播报间隔时间
      const length = this.echartData.length // 数据长度
      let index = 0

      this.timerId = setInterval(() => {
        // const title = data[index].name
        // option.title.text = title
        // this.echartInstance.setOption(option)

        // 取消提示框
        this.echartInstance.dispatchAction({
          type: 'hideTip',
          seriesIndex: 0,
          dataIndex: index
        })
        // 取消高亮指定的数据图形
        this.echartInstance.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index === 0 ? length - 1 : index - 1
        })

        // 显示提示框
        this.echartInstance.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        })
        // 显示高亮的数据图形
        this.echartInstance.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index
        })

        index++
        if (index === length) index = 0
      }, delay * 1000)
    },

    calSum(echartData) {
      let sum = 0

      // 遍历求和
      for (let i = 0; i < echartData.length; i++) {
        sum += parseInt(echartData[i].value)
      }

      return sum
    }
  }
}
</script>

<style lang="scss" scoped>
.EchartBottomCenterPie {
  width: 627px;
  height: 516px;
}
</style>
