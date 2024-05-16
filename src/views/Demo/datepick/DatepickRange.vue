<template>
  <div class="DialogTrace">
    <div class="top">
      <span class="title">轨迹查询</span>
      <el-date-picker
        class="pointer search"
        v-model="queryDate"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </div>

    <TitleProgress class="progress" title="" :number="30" color="#3d444a" />
    <TianMapTrace class="map" id="TianMapTrace" />
  </div>
</template>

<script>
import TitleProgress from './TitleProgress.vue'
import TianMapTrace from './TianMapTrace.vue'
import { getTrack } from '@/api/communityCorrection_v2.js'
export default {
  name: 'DatepickRange',
  components: { TitleProgress, TianMapTrace },
  data() {
    return {
      queryDate: undefined,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  props: {
    queryId: { type: [String, Number], default: undefined }
  },
  created() {},
  mounted() {
    // 初始化 默认1周日期范围
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    this.queryDate = [start, end]
    this.queryTrace()
  },
  beforeDestroy() {},
  computed: {},
  watch: {
    queryId: {
      handler(newVal, oldVal) {
        this.queryTrace()
      },
      deep: true
    },

    queryDate: {
      handler(newVal, oldVal) {
        this.queryTrace()
      },
      deep: true
    }
  },
  methods: {
    async queryTrace() {
      console.log('🚀 >> queryTrace >> :', this.queryId, this.queryDate)
      if (!this.queryId || this.queryDate.length === 0) return
      const startTime = this.transformDate(this.queryDate[0])
      const endTime = this.transformDate(this.queryDate[1])

      const res = await getTrack({
        id: this.queryId,
        startTime,
        endTime
      })

      console.log('queryTrace res', startTime, endTime, res)
    },
    transformDate(date) {
      // 使用 toISOString() 方法获取 ISO 格式的日期时间，然后截取前 10 个字符获取日期部分
      const formattedDate = date.toISOString().substring(0, 10)
      return formattedDate
    },
    resetData() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      this.queryDate = [start, end]
    }
  }
}
</script>

<style lang="scss" scoped>
.DialogTrace {
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    box-sizing: border-box;
    padding-top: 15px;
    color: #ffffff;
    text-align: center;
    font-size: 30px;
    font-weight: 400;
    letter-spacing: 2px;
  }

  .search {
    width: 442.5px;
    height: 50px;
    border-radius: 6px;
    // padding: 0;
    // border: 0;
  }

  .map {
    width: 100%;
    height: 690px;
    margin-top: 25px;
  }
}

/deep/ .el-input__icon {
  font-size: 24px;
  font-family: 'FZFont';
  font-weight: 600;
}
/deep/ .el-range-separator {
  font-size: 20px;
  font-family: 'FZFont';
  font-weight: 600;
  padding-top: 5px;
}
/deep/ .el-range-input {
  font-size: 20px;
  font-family: 'FZFont';
  font-weight: 600;
}
/deep/ .el-date-range-picker {
  width: 1200px;
}
// /deep/ .el-date-table {
//   font-size: 20px;
//   font-family: 'FZFont';
//   font-weight: 600;
// }
// /deep/ .el-date-range-picker__header {
//   font-size: 20px;
//   font-family: 'FZFont';
//   font-weight: 600;
// }
// /deep/ .el-picker-panel__shortcut {
//   font-size: 20px;
//   font-family: 'FZFont';
//   font-weight: 600;
// }
// /deep/ .el-picker-panel__sidebar {
//   width: 120px;
// }
</style>
