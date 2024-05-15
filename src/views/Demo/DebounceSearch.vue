<template>
  <div class="midCenter">
    <div class="midCenter_top">
      <TitleProgress class="midCenter_progress" title="全市报道" :number="30" color="#3d444a" />

      <el-autocomplete
        class="midCenter_search"
        v-model="query"
        :fetch-suggestions="debouncedNameSearch"
        @select="handleSelect"
        placeholder="请输入内容"
        :popper-append-to-body="false"
        :trigger-on-focus="false"
      >
        <template slot="append">
          <div class="pointer" @click="querySearch">查询</div>
        </template>
        <template slot-scope="{ item }">
          <div>{{ item.name }}</div>
        </template>
      </el-autocomplete>
    </div>
    <TianMap class="midCenter_bottom" id="TianMap" />

    <el-dialog width="0" :visible.sync="dialogVisible" :modal="false">
      <DialogDetail ref="dialogDetail" @change-data="closeDialog" />
    </el-dialog>
  </div>
</template>

<script>
import DialogDetail from './DialogDetail.vue'
import TitleProgress from './components/TitleProgress.vue'
import TianMap from './components/TianMap.vue'
import { debounce } from '@/utils/utils'
import { getCityReport, getName } from '@/api/communityCorrection_v2.js'
export default {
  name: 'DebounceSearch',
  components: { TitleProgress, DialogDetail, TianMap },
  data() {
    return {
      query: '',
      dialogVisible: false,
      restaurants: [],
      debouncedNameSearch: null
    }
  },
  props: {},
  created() {
    // 初始化防抖搜索
    this.debouncedNameSearch = debounce(this.nameSearch, 1000)
  },
  mounted() {},
  beforeDestroy() {},
  computed: {},
  watch: {},
  methods: {
    async nameSearch(name, cb) {
      console.log('🚀 >> nameSearch >> name:', name)
      // 这里是实际的搜索逻辑，确保处理空字符串等边缘情况
      if (!name.trim()) return
      const res = await getName({ personName: name })
      cb(res)
    },
    async querySearch() {
      this.dialogVisible = true
      console.log('search')
    },
    handleSelect(item) {
      console.log(item)
    },
    closeDialog(value) {
      this.dialogVisible = value
    }
  }
}
</script>
<style lang="scss" scoped>
.midCenter {
  width: 1276px;
  height: 714px;
  &_top {
    display: flex;
    justify-content: space-between;
  }

  &_progress {
    width: 800px;
  }

  &_search {
    width: 442.5px;
    height: 50px;
    border-radius: 6px;
    padding: 0;
    border: 0;
    height: 50px;
  }
}

.midCenter_bottom {
  width: 100%;
  height: 630px;
  margin-top: 30px;
}

/deep/.el-input-group--append {
  margin-top: 20px;
  height: 48px;
  .el-input__inner,
  .el-input-group__append {
    border: 0;
    padding: 0;
    height: 100%;
  }

  .el-input__inner {
    text-indent: 1em;
    background: #123665e0;
    color: #ffffff;

    font-size: 21px;
    font-style: normal;
    font-weight: 400;
    height: 48px;
    line-height: 48px;
    letter-spacing: 1.68px;

    &::placeholder {
      color: #ffffff;

      font-size: 21px;
      font-style: normal;
      font-weight: 400;
      height: 48px;
      line-height: 48px;
      letter-spacing: 1.68px;
    }
  }

  .el-input-group__append {
    width: 30%;
    text-align: center;
    background-color: #1391ff;
    color: #fff;
    font-size: 21px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.68px;
  }
}

/deep/ .el-autocomplete-suggestion {
  margin-top: 18px;
  margin-left: 10px;
  border-radius: 6px;
  border: 1px solid #ffffff;
  background: #ffffff;
  color: #606266;

  .popper__arrow {
    top: -8px;
    border-bottom-color: #ffffff;
  }
  .popper__arrow::after {
    border-bottom-color: #ffffff;
  }
  .el-autocomplete-suggestion__wrap {
    padding: 2px;
  }
}

/deep/ .el-autocomplete-suggestion li {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  color: #606266;
  font-family: 'FZFont';
}

/deep/ .el-autocomplete-suggestion li:hover {
  background-color: #f5f7fa;
  border-radius: 6px;
}
</style>
