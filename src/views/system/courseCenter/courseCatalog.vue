<template>
  <div class="catalog-page">
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-button type="primary" @click="appendMain" icon="el-icon-plus">添加大章节</el-button>
          <el-tree
            :data="data"
            :show-checkbox="false"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            style="margin-top: 20px;font-size: large"
          >
         <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="large"
            @click="() => append(data)">
            添加子目录
          </el-button>
          <el-button
            type="text"
            size="large"
            @click="() => edit(node, data)">
            编辑目录名
          </el-button>
          <el-button
            type="text"
            size="large"
            @click="() => remove(node, data)">
            删除该目录
          </el-button>
          <el-button type="text" size="large" @click="addVid(node,data)">
          设置Vid
          </el-button>
            <!--<span v-show="!data.isTitle">-->
              <!--<el-upload style="display: inline-block;" :auto-upload="false" ref="video"-->
                         <!--:file-list="fileList" :show-file-list="false" action="/dev-api/api/v1/shift/courses/video"-->
                         <!--accept="video/mp4"-->
                         <!--:on-change="addFile" :on-progress="progress" :on-success="finish" :on-error="handleError">-->
              <!--<el-button type="text" size="mini">选取视频</el-button>-->
              <!--<span style="font-size: 12px">(mp4文件,不超过{{maxSize}}mb)</span>-->
            <!--</el-upload>-->
            <!--<el-button type="text" size="mini" @click="uploadVideo(data)">上传</el-button>-->
            <!--<div style="width: 100px;display: inline-block;font-size: 11px;" v-show="data.uploading">-->
              <!--<el-progress :percentage="percentage" :text-inside="true" :stroke-width="12"/>-->
            <!--</div>-->
            <!--<div style="width: 100px;display: inline-block;font-size: 11px;" v-if="data.status">-->
              <!--已上传-->
            <!--</div>-->
            <!--</span>-->
        </span>
      </span>
          </el-tree>
          <el-button @click="updateCatalog" type="primary" style="float: right;margin-bottom: 20px;">保存目录</el-button>
        </el-card>
      </el-col>
      <el-col>

      </el-col>
    </el-row>
  </div>
</template>
<script>
  // import {uploadCourseCatalog,getCourseCatalog} from '../../api/school-course'
  import {getCatalogTreeById,modifySystemCourseById} from '@/api/system_apis'

  export default {
    data() {

      return {
        data: [],
        fileList: [], // 上传文件列表
        maxSize: 500, // 上传文件限制大小，单位mb
        percentage: 0, // 上传进度
        tempData: {},
        course_id: undefined,
        course: {},
        current_id:0
      }
    },
    created() {

      this.course_id = this.$route.params.course_id;
      this.getCatalog()
    },
    methods: {
      /*
      * 获取courseid对应的目录
      */
      getCatalog() {
        getCatalogTreeById({course_id: this.course_id}).then(response => {
          this.course = response.data
          console.log(JSON.parse(this.course.catalogtree))
          this.data = JSON.parse(this.course.catalogtree).catalogtree
          this.getPlayList(this.data)
         // console.log(this.current_id)
        }).catch(error => {
          console.log(error)
        })
      },
      /**
       *  深度遍历获取id
       * */
      getPlayList(catalog){
        for(let i=0;i<catalog.length;i++){
          if(catalog[i].id > this.current_id){
            this.current_id = catalog[i].id
          }else if(catalog[i].hasOwnProperty('children')){
            this.getPlayList(catalog[i]['children'])
          }
        }
      },
      /*
      * 保存新目录
      */
      updateCatalog() {
        console.log(this.data);
        this.course.catalogtree = JSON.stringify({"catalogtree":this.data})
        modifySystemCourseById(this.course).then(res => {
          console.log(res)
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success'
          });
        }).catch(error => {
          this.$notify.error({
            title: '错误',
            message: '保存出错'
          });
        })
      },
      /*
      *
      * 添加 子目录
      */
      append(data) {
        console.log(data)
        const newChild = {id:  ++this.current_id, label: '新目录', children: [], status: false}
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      },
      /*
      * 删除指定目录
      */
      remove(node, data) {
        this.$confirm('确认删除该目录？', '删除提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const parent = node.parent;
          const children = parent.data.children || parent.data
          const index = children.findIndex(d => d.id === data.id)
          children.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          return;
        })
      },
      /*
      * 编辑目录名
      */
      edit(node, data) {
        this.$prompt('设置目录名', '设置', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        }).then(({value}) => {
          data.label = value;
          this.$message({
            type: 'success',
            message: '设置成功！ '
          });
        })
      },
      /*
       * 添加新大章节
       */
      appendMain() {
        const newChild = {id: ++this.current_id, label: '新目录', children: [], isTitle: true};
        console.log(this.data)
        this.data.push(newChild)
      },
      /*
       * 选取文件
       */
      addFile(file, filelist) {
        console.log("on change...")
        if (file.size > this.maxSize * 1024 * 1024) {
          this.$notify.error({
            title: '错误',
            message: '超出文件上传大小限制'
          });
          return;
        }
        this.fileList = filelist
      },
      /*
      * 进度条
       */
      progress(event, file, fileList) {
        console.log(event);
        this.percentage = Math.floor(event.percent)
      },
      /*
      * 点击上传
       */
      uploadVideo(data) {
        if (this.fileList.length !== 0) {
          data.uploading = true;
          this.tempData = data;
          this.$refs.video.submit()
        } else {
          this.$notify({
            title: '失败',
            message: '请先选取要上传的文件',
            type: 'error'
          });
        }
      },
      /*
      * 上传成功
       */
      finish(response, file, fileList) {
        this.percentage = 100;
        this.tempData.status = true;
        setTimeout(() => {
          delete this.tempData.uploading;
          this.percentage = 0;
        }, 1000);
        this.$notify({
          title: '成功',
          message: '上传成功！',
          type: 'error'
        });
      },
      /*
      * 处理出错
       */
      handleError(err, file, fileList) {
        delete this.tempData.uploading
        this.$notify({
          title: '出错',
          message: '上传出错！',
          type: 'error'
        });
      },
      addVid(node,data){
        console.log(node,data)
        this.$prompt('请输入该课程对应的Vid', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          data.vid  = value
          this.type = true
            this.$message({
            type: 'success',
            message: '设置成功!'
          });
          console.log(this.data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .catalog-page {
    padding: 20px;
  }
</style>
