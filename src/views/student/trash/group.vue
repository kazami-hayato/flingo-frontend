<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="groupList" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="分组名称">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.sub_school" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.sub_school }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="总人数">
        <template slot-scope="{row}">
          <span>{{ row.total_num }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="{row}">
          <span>{{ row.create_date | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            确定
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    import { fetchAllGroups } from '@/api/group'

    export default {
        name: 'group',
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'info',
                    deleted: 'danger'
                }
                return statusMap[status]
            }
        },
        data() {
            return {
                groupList: null,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 10
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            async getList() {
                this.listLoading = true
                const { data } = await fetchAllGroups(this.listQuery)
                const items = data.items

                this.groupList = items.map(v => {
                    this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
                    v.originalSchool = v.sub_school //  will be used when user click the cancel botton
                    return v
                })
                console.log(this.groupList)
                this.listLoading = false
            },
            cancelEdit(row) {
                row.sub_school = row.originalSchool
                row.edit = false
                this.$message({
                    message: '未更改',
                    type: 'warning'
                })
            },
            confirmEdit(row) {
                row.edit = false
                row.originalSchool = row.sub_school
                console.log(row)
                this.$message({
                    message: '更新成功',
                    type: 'success'
                })
            }
        }
    }
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
