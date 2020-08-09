<template>
  <div class="catalog-page">
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-button type="primary" @click="appendMain" icon="el-icon-plus">添加大章节</el-button>
          <el-tree
            :data="CatalogData"
            :show-checkbox="false"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            style="margin-top: 1rem;margin-bottom: 1rem;font-size: large"
          >
         <span class="custom-tree-node" slot-scope="{ node, data }">
            <span class="node-title">
              <el-icon class="el-icon-video-play" v-if="'vid' in dictData[data.id]"></el-icon>
              {{dictData[data.id].label}}
            </span>
            <span style="margin-left: 2rem">
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
                <span v-show="!data.isTitle" style="position: relative;padding-left: 2px;">
                  <el-upload type="file" style="display: inline-block;"
                             :on-change="addFile"
                             action="" :auto-upload="false" accept="video/mp4"
                             :multiple="false" :limit=1
                  >
                    <el-button type="text">选择视频</el-button>
                  </el-upload>
                  <el-button type="text" @click="uploadFile(data)">视频上传 </el-button>
                  <span style="font-size: 14px;padding-left: 5px;" v-if="!data.type">{{loading===0?'':loading}}</span>
                  <span style="font-size: 14px;padding-left: 5px;" v-else>完成</span>
                </span>
            </span>
        </span>
          </el-tree>
          <span>总课程数：{{totalCourse}}</span>
          <el-button @click="updateCatalog" type="primary" style="float: right;margin-bottom: 20px;">保存目录</el-button>
        </el-card>
      </el-col>
      <el-col>

      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {getCatalogTreeById, modifySystemCourseById} from '@/api/system_apis'
  import PlvVideoUpload from '@polyv/vod-upload-js-sdk'
  import md5 from 'js-md5'
  // import Vue from 'vue'
  export default {
    data() {
      return {
        test: '',
        CatalogData: [],
        dictData: {},
        fileList: [], // 上传文件列表
        maxSize: 500, // 上传文件限制大小，单位mb
        percentage: 0, // 上传进度
        tempData: {},
        course_id: undefined,
        course: {},
        current_id: 0,
        user_id: "d6001adfae",
        secretkey: "00X97pOUEx",
        write_token: "7cae507f-22d6-4720-af10-7d618e6a3634",
        videoUpload: null,
        ptime: 0,
        loading: 0,
        totalCourse: 0
      }
    },
    created() {
      this.course_id = this.$route.params.course_id;
      this.getCatalog();
      // 初始化保利威视uploader
      this.videoUpload = new PlvVideoUpload({
        events: {
          Error: (err) => {  // 错误事件回调
            this.$message.error(err || '上传失败')
          },
          UploadComplete: () => {
            this.$message.success("上传成功！")
          }  // 全部上传任务完成回调
        }
      });
    },
    watch: {
      CatalogData: {
        handler(val, oldVal) {
          this.totalCourse = 0
          this.getSum(val)
        },
        deep: true
      },
    },
    methods: {
      // 获取总课程数
      getSum(arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].vid) {
            this.totalCourse++
          }
          if (arr[i].hasOwnProperty('children')) {
            this.getSum(arr[i]['children'])
          }
        }
      },
      // 获取当前目录树
      getCatalog() {
        getCatalogTreeById({course_id: this.course_id}).then(response => {
          this.course = response.data
          this.CatalogData = JSON.parse(this.course.catalogtree).catalogtree
          this.dictData = JSON.parse(this.course.catalogdict).catalogdict
          console.log(this.CatalogData, this.dictData)
          // this.getPlayList(this.data)
          // console.log(this.current_id)
          // if (response.data.catalogtree !== null
          //   && response.data.catalogtree !== '') {
          //   console.log(JSON.parse(this.course.catalogtree))
          //   this.CatalogData = JSON.parse(this.course.catalogtree).catalogtree
          //   this.getPlayList(this.CatalogData)
          // }
        }).catch(() => {
          this.$notify({
            type: "warning",
            message: "当前目录树为空",
            duration: 2000
          })
        })
      },
      /**
       *  深度遍历获取id
       * */
      // getPlayList(catalog) {
      //   for (let i = 0; i < catalog.length; i++) {
      //     if (catalog[i].id > this.current_id) {
      //       this.current_id = catalog[i].id
      //     } else if (catalog[i].hasOwnProperty('children')) {
      //       this.getPlayList(catalog[i]['children'])
      //     }
      //   }
      // },
      // 更新目录树
      updateCatalog() {
        console.log(this.CatalogData);
        this.course.catalogtree = JSON.stringify({"catalogtree": this.CatalogData})
        this.course.catalogdict = JSON.stringify({"catalogdict": this.dictData})
        if (this.course.is_shift === 1)
          this.$confirm('此操作将更新上架课程?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
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
          })
        else {
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
        }
      },
      // 添加新的子目录
      append(data) {
        this.$prompt('输入节名', '设置', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        }).then(({value}) => {
          let labelKey = md5(value + new Date().getTime().toString())
          this.dictData[labelKey] = {label: value, type: false, isChapter: false}
          const newChild = {id: labelKey, children: []};
          if (!data.children) {
            this.$set(data, 'children', [])
          }
          data.children.push(newChild)
          this.$message({
            type: 'success',
            message: '设置成功！ '
          });
        })
      },
      //删除目录
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
          delete this.dictData[data.id]
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          return;
        })
      },
      //编辑目录
      edit(node, data) {
        this.$prompt('设置目录名', '设置', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        }).then(({value}) => {
          this.dictData[data.id].label=value
          this.$message({
            type: 'success',
            message: '设置成功！ '
          });

        })
      },
      // 添加大目录
      appendMain() {
        this.$prompt('输入大章节名', '设置', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        }).then(({value}) => {
          let labelKey = md5(value + new Date().getTime().toString())
          this.dictData[labelKey] = {label: value, type: false, isChapter: true}
          const newChild = {id: labelKey, children: []};
          this.CatalogData.push(newChild)
          this.$message({
            type: 'success',
            message: '设置成功！ '
          });
        })

      },
      // 添加文件
      addFile(file, filelist) {
        // if (file.size > this.maxSize * 1024 * 1024) {
        //   this.$notify.error({
        //     title: '错误',
        //     message: '超出文件上传大小限制'
        //   });
        //   return;
        // }
        this.fileList = filelist
      },
      //设置vid
      addVid(node, data) {
        console.log(data)
        this.$prompt('请输入该课程对应的Vid', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: this.dictData[data.id].vid ? this.dictData[data.id].vid : ''
        }).then(({value}) => {
          if (value.trim() !== '') {
            this.dictData[data.id].vid = value
            this.dictData[data.id].type = true
            console.log(this.dictData)
            this.$message({
              type: 'success',
              message: '设置成功!'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
      ,
      /**
       *  上传文件
       * @param file
       * @param fileList
       */
      uploadFile(data) {
        console.log(this.fileList)
        let _this = this
        let file = this.fileList[0]
        // if (file.size > this.maxSize * 1024 * 1024) {
        //   this.$notify.error({
        //     title: '错误',
        //     message: '超出文件上传大小限制'
        //   });
        //   return;
        // }
        let file_temp = {
          title: '',
          desc: '',  // 描述
          cataid: '',  // 上传分类目录ID
          tag: '',  // 标签
          luping: 0,  // 是否开启视频课件优化处理，对于上传录屏类视频清晰度有所优化：0为不开启，1为开启
          keepsource: 0  //
        };
        let uploadManager = this.videoUpload.addFile(
          file.raw,
          {
            FileStarted: function (uploadInfo) { // 文件开始上传回调
              console.log("文件上传开始: " + uploadInfo.fileData.title);
            },
            FileProgress: function (uploadInfo) { // 文件上传过程返回上传进度信息回调
              console.log("文件上传中: " + (uploadInfo.progress * 100).toFixed(2) + '%');
              _this.loading = (uploadInfo.progress * 100).toFixed(2) + '%'
            },
            FileStopped: function (uploadInfo) { // 文件暂停上传回调
              console.log("文件上传停止: " + uploadInfo.fileData.title);
            },
            FileSucceed: function (uploadInfo) { // 文件上传成功回调
              // console.log(uploadInfo);
              // data.vid = uploadInfo.fileData.vid
              // data.type = true
              // data.finished = false
              this.dictData[data.id].vid = uploadInfo.fileData.vid
              this.dictData[data.id].type = true
              _this.loading = 0
            },
            FileFailed: function (uploadInfo) { // 文件上传失败回调
              console.log("文件上传失败: " + uploadInfo.fileData.title);
            }
          },
          file_temp
        );
        _this.updateUpload()
        _this.videoUpload.resumeFile(uploadManager.id)
      }
      ,
      /**
       * 更新uploader
       */
      updateUpload() {
        this.ptime = new Date().getTime();
        this.videoUpload.updateUserData({
          userid: this.user_id,
          ptime: this.ptime,
          sign: md5(this.secretkey + this.ptime),
          hash: md5(this.ptime + this.write_token)
        })
      }
      ,
      /**
       *  删除文件回调
       * @param file
       * @param fileList
       */
      removeVid(file, fileList) {
        console.log(this.videoUpload)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .catalog-page {
    padding: 20px;
  }


  .custom-tree-node {
    margin: 0;
    padding: 0 0.8em;
    line-height: 2em;
    font-weight: 700;
    position: relative;
    cursor: pointer;

  }

  .custom-tree-node:before {
    content: "";
    display: block;
    width: 10px;
    height: 0;
    border-top: 1px solid;
    margin-top: -1px;
    position: absolute;
    top: 1em;
    left: 0;
  }

  .custom-tree-node:last-child:before {
    background: transparent;
    height: auto;
    top: 1em;
    bottom: 0;
  }
</style>
