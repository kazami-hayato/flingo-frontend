<template>
  <div class="avatar-container">
    <div class="header">
      <el-input placeholder="请输入内容" v-model="listQuery.searchText" style="max-width: 400px">
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"
                   style="background: #1890FF;color: #fff;border-radius: 0"/>
      </el-input>
    </div>
    <div class="avatar-content">
      <el-table
        v-loading="listLoading"
        :data="listData"
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="照片" align="center">
          <template slot-scope="{row}">
            <img :src="row.avatar" class="avatar-img">
          </template>
        </el-table-column>
        <el-table-column label="学号" align="center">
          <template slot-scope="{row}">
            <div>{{row.exam_id}}</div>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="{row}">
            <div>{{row.real_name}}</div>
          </template>
        </el-table-column>
        <el-table-column label="身份证" align="center">
          <template slot-scope="{row}">
            <div>{{row.id_card}}</div>
          </template>
        </el-table-column>
        <el-table-column label="主校名" align="center">
          <template slot-scope="{row}">
            <div>{{row.main_school}}</div>
          </template>
        </el-table-column>
        <el-table-column label="分校名" align="center">
          <template slot-scope="{row}">
            <div>{{row.sub_school}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" minWidth="200" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                  @pagination="getList"/>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index";
import {getStudentsAvatar} from "@/api/system_apis";

export default {
  name: 'index',
  components: { Pagination},
  data() {
    return {
      //缓冲状态
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        searchText: '',
      },
      total: 0,
      listData: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSearch() {
      this.getList()
    },
    getList() {
      this.listLoading = true
      getStudentsAvatar(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })

    },
    handleUpdate(row){
      console.log(row)
    }
  },
  props: {},
};
</script>
<style lang="scss" scoped>
.avatar-container {
  .header {
    padding: 2rem;
  }

  .avatar-content {
    padding-left: 2rem;
    width: 100%;
    height: 100%;
    .avatar-img{
      width: 8rem;
      height: 8rem;
    }
  }
}
</style>
