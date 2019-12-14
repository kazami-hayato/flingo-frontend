<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" class="row-bg" justify="space-between">
        <router-link :to="'/school/notice/create'">
          <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                     @click="">新建通知
          </el-button>
        </router-link>
        <el-button style="margin-left: 10px;" type="danger" icon="el-icon-remove"
                   @click="deleteChosen">删除所选
        </el-button>
      </el-row>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :default-sort="{prop: 'id', order: 'descending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column width="55" type="selection" align="center"/>
      <el-table-column label="序号" type="index" align="center" width="80" sortable/>


<!--      <el-table-column label="通知号"  align="center" width="150" sortable>-->
<!--        <template slot-scope="{row}">-->
<!--          <span>{{ row.notice_id }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.pub_date | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="150px">
        <template slot-scope="{row}">
          <router-link :to="'/school/notice/'+row.notice_id">
            <span class="link-type">{{ row.notice_title }}</span>

          </router-link>
          <el-tag>{{ row.notice_type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发布者" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.notice_author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <router-link :to="'/school/notice/'+row.notice_id">
            <el-button type="primary" size="mini">
              修改
            </el-button>
          </router-link>

          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

  </div>
</template>

<script>
    // import {fetchList, fetchPv, createArticle, updateArticle} from '@/api/article'
    // import {getAllNotices, removeNoticeById} from "@/api/notice"
    import {getNotices, removeNoticeById} from "@/api/apis";
    import waves from '@/directive/waves' // waves directive
    import {parseTime} from '@/utils'
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination

    export default {
        name: 'notice',
        components: {Pagination},
        directives: {waves},
        data() {
            return {
                tableKey: 0,
                list: null,
                total: 0,
                listLoading: true,
                chosenList: [],
                listQuery: {
                    main_school: this.$store.state.user.main_school,
                    sub_school: this.$store.state.user.sub_school,
                    page: 1,
                    limit: 20,
                },
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true
                getNotices(this.listQuery).then(response => {
                    this.list = response.data
                    this.total = response.total
                    // 设置延时以便于优化
                    setTimeout(() => {
                        this.listLoading = false
                    }, 1.5 * 100)
                })
            },
            handleSelectionChange(val) {
                let temp = []
                val.forEach(item => {
                    temp.push(item.notice_id)
                });
                this.chosenList = temp
                console.log(this.chosenList)
            },
            deleteChosen() {
                for (const notice_id of this.chosenList) {
                    const query = {
                        notice_id: notice_id
                    }
                    removeNoticeById(query).then(() => {
                    })
                }
                this.$notify({
                    title: '成功',
                    message: '删除所选',
                    type: 'success',
                    duration: 2000
                })
                this.getList()
            },
            handleDelete(row) {
                const query = {
                    notice_id: row.notice_id
                }
                removeNoticeById(query).then(() => {
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success',
                        duration: 2000
                    })
                    this.getList()
                })
            },
        }
    }
</script>
