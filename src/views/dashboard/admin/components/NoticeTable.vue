<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="通知编号" min-width="200">
      <template slot-scope="scope">
        <a :href="scope.row.notice_href">{{ scope.row.notice_title}}</a>
      </template>
    </el-table-column>

    <el-table-column label="日期" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.udate}}
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
import { transactionList } from '@/api/remote-search'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      transactionList().then(response => {
        this.list = response.data.items.slice(0, 8)
      })
    }
  }
}
</script>
