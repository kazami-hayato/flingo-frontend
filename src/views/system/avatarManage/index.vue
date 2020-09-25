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
        :data="list"
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="照片" align="center" >
          <template slot-scope="{row}"  >
            <img :src="getUsingAvatar(row)" class="avatar-img"  @click="showAvatarList(row)">
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
            <el-button type="primary"  @click="handleUpdate(row)" >
              修改照片
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                  @pagination="getList"/>
    </div>
    <div>
      <el-dialog
        title="上传照片"
        :visible.sync="photoVisible"
        width="30%"
      >
        <el-container>
          <el-header>
            <p>请上传 学号：{{tempExam_id.exam_id}} 的照片</p>
          </el-header>
          <el-main>
            <el-upload
              class="upload-demo"
              drag
              :name="'File'"
              :on-success="handleUpload"
              :file-list="fileList"
              :limit="1"
              :data="tempExam_id"
              :headers="headers"
              action="/apis/v1/system/avatars/generateAvatarStr"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture">
              <i class="el-icon-upload"/>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div slot="tip" class="el-upload__tip">只能上传jpeg文件，且不超过500kb</div>
            </el-upload>
          </el-main>
          <el-footer >
            <el-row type="flex" class="row-bg" justify="end">
              <el-button @click="closePhotoVisible">取 消</el-button>
              <el-button type="primary" @click="photoVisible = false">确 定</el-button>
            </el-row>
          </el-footer>
        </el-container>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="历史头像"
        :visible.sync="avatarsVisible"
        width="700px"
        >
        <div class="demo-image__lazy">
          <el-image v-for="url in listData" :key="url" :src="url" lazy style="width: 200px;height: 200px;margin: 10px"></el-image>
        </div>
<!--              <el-col :span="4" v-for="item in listData"  :key="item">-->
<!--                <el-card shadow="never">-->
<!--                  <img  :src="item" style="width: 200px;height: 160px">-->
<!--                </el-card>-->
<!--              </el-col>-->
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index";
import {getStudentsAvatar} from "@/api/system_apis";
import { getToken } from '@/utils/auth'

export default {
  name: 'index',
  components: { Pagination},
  data() {
    return {
      tempExam_id:{exam_id:''},
      photoVisible:false,
      avatarsVisible:false,
      fileList:[],
      //缓冲状态
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        searchText: '',
      },
      list:[],
      total: 0,
      listData: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ],
      headers:{
        'X-Token':getToken()
      },
    }
  },
  created() {
    this.getList()

  },
  methods: {
    closePhotoVisible(){
        this.photoVisible=false

    },
    showAvatarList(row){
      let avatarList=row.avatar.split("#")
      this.listData=[]
      avatarList.forEach(item=>{
        this.listData.push("/cdn/"+item)
      })
      this.listData[0]="/cdn/photos/"+avatarList[0]+".jpeg"
      this.avatarsVisible=true
    },
    getUsingAvatar(row){
      if(row.avatar===null){
        // return "https://www.hbuvt.com/cdn/photos/"+row.exam_id+".jpeg"
        return "/cdn/photos/"+row.exam_id+".jpeg"
      }
      else{
        // return "https://www.hbuvt.com/cdn/"+row.avatar.split("#").slice(-1)
        return "/cdn/"+row.avatar.split("#").slice(-1)
      }
    },
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
      this.photoVisible=true;
      this.tempExam_id.exam_id=row.exam_id

    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleUpload(response, file) {
      this.$notify({
        title: '上传结果',
        message: response.message,
        type: 'success',
        duration: 3000
      })

    },
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
