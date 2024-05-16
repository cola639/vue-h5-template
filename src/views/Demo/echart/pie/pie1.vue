<template>
  <div class="EchartMidRightPie">
    <div class="fz-font title">{{ title }}</div>
    <div class="echartPie" :id="id"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'EchartMidRightPie',
  components: {},
  data() {
    return {
      echartInstance: null,
      timer: null
    }
  },
  props: {
    title: { type: String, required: true },
    id: { type: String, required: true },
    echartData: { type: Array, required: true }
  },
  created() {},
  mounted() {
    this.initEchart()
  },

  beforeDestroy() {
    this.timer ? clearInterval(this.timer) : null
  },
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
      const chartDom = document.getElementById(this.id)
      this.echartInstance = echarts.init(chartDom)

      const data = this.extraData(this.echartData)
      const sum = this.calSum(this.echartData)
      const colorList = ['#2e61ff', '#4affff', '#47b7fd']

      const option = {
        tooltip: {
          trigger: 'item'
        },

        color: colorList,
        series: [
          {
            name: this.title,
            type: 'pie',
            radius: '93%',
            label: {
              position: 'inner',
              color: '#fff',
              fontSize: 15,
              fontWeight: 'bold',
              fontFamily: 'FZFont',
              formatter: function({ name }) {
                const temp = data.find(ele => ele.name === name)
                const rate = ((temp.value / sum) * 100).toFixed(2)
                return temp.name + '\n' + '\n' + rate + '%'
              }
            },
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.echartInstance.setOption(option)
      this.intervalPlay()
    },

    intervalPlay() {
      const delay = 3 // 播报间隔时间
      const length = this.echartData.length // 数据长度
      let index = 0

      this.timerId = setInterval(() => {
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

    extraData(echartData) {
      let data = []
      for (let i = 0; i < echartData.length; i++) {
        data.push({ name: echartData[i].name, value: parseInt(echartData[i].value) })
      }
      return data
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
.EchartMidRightPie {
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: -20px;
  .title {
    color: #ffffff;
    font-size: 22px;
    font-weight: 400;
  }
  .echartPie {
    padding: 20px;
    margin-top: 8px;
    width: 90%;
    height: 290px;
  }
}
</style>
