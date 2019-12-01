<template>
  <div class="info-container" style="padding: 20px">
    <el-row :gutter="24">
      <el-col :xs="{span: 16}" :sm="{span: 16}" :md="{span: 16}" :lg="{span: 12}" :xl="{span: 12}">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="Logo">
            <span> <img
              style="width: 100px; height: 100px"
              :src="form.logo"
            >
            </span>
            <el-upload
              ref="upload"
              accept=".jpg,.ico,.png,.svg,.jpeg"
              action=""
              list-type="picture"
              :http-request="parseLogo"
              :on-preview="handlePreview"
              :on-change="onUploadChange"
              :on-remove="handleRemove"
              :before-remove="beforeRemove" multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="imgList"
              :auto-upload="false">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png/svg/ico文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="网校名称">
            <el-input v-model="form.school_name"></el-input>
          </el-form-item>
          <el-form-item label="H5域名">
            <el-input v-model="form.H5domain"></el-input>
          </el-form-item>
          <el-form-item label="咨询热线">
            <el-input v-model="form.hotline"></el-input>
          </el-form-item>
          <el-form-item label="咨询QQ">
            <el-input v-model="form.qq"></el-input>
          </el-form-item>
          <el-form-item label="咨询邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="备案号">
            <el-input v-model="form.icp"></el-input>
          </el-form-item>
          <el-form-item label="网站介绍">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="联系地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>

    import {fetchSchoolById, changeSchoolById} from '@/api/school'

    export default {
        name: "config",
        data() {
            return {
                logofile: {},
                first_query: {
                    token: 'admin-token',
                    school_id: 123456
                },
                change_query:{

                },
                imgList: [],
                form: {
                    logo: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    school_name: '',
                    H5domain: '',
                    hotline: '',
                    qq: '',
                    email: '',
                    icp: '',
                    description: '',
                    address: ''

                }
            }
        },
        created() {
            fetchSchoolById(this.first_query).then(response => {
                console.log(response.data)
                this.form = response.data
            })
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            onUploadChange(file) {
                this.logofile = file
                console.log(this.logofile)
            },
            parseLogo() {

            },
            onSubmit() {
                console.log(this.form);
                changeSchoolById(this.change_query).then(() => {
                    this.location.reload();
                })
            },
            onCancel() {
                this.form = {};
                console.log("clear")
            }
        }
    }
</script>

<style scoped>

</style>
