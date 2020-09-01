<template>
  <div class="info-container" style="padding: 20px">
    <div style="padding: 2rem">
    <el-row :gutter="24">
      <el-col :xs="{span: 16}" :sm="{span: 16}" :md="{span: 16}" :lg="{span: 12}" :xl="{span: 12}">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="Logo">
            <span>
              <img
                style="width: 100px; height: 100px"
                :src="form.logo" alt="logo"
              >
            </span>
            <el-upload
              ref="upload"
              accept=".jpg,.ico,.png,.svg,.jpeg"
              list-type="picture"
              :name="'File'"
              :on-success="handleUpload"
              :file-list="fileList"
              :limit="1"
              action="/apis/v1/static/file">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png/svg/ico文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="网校名称" >
            <el-input v-model="form.title">
              <template slot="append">
                <div v-if="form.main_school===form.sub_school" style="color: #0a76a4">
                 主校</div>
                <div v-else>分校</div>
              </template>
              </el-input>
          </el-form-item>
          <el-form-item label="主校名称" >
            <el-input v-model="form.main_school" disabled/>
          </el-form-item>
          <el-form-item label="分校名称" v-if="form.main_school!==form.sub_school">
            <el-input v-model="form.sub_school" disabled/>
          </el-form-item>
          <el-form-item label="H5域名">
            <el-input v-model="form.h5_domain"/>
          </el-form-item>
          <el-form-item label="子域名">
            <el-input v-model="form.sub_domain"/>
          </el-form-item>
          <el-form-item label="咨询热线">
            <el-input v-model="form.hotline"/>
          </el-form-item>
          <el-form-item label="咨询QQ">
            <el-input v-model="form.qq"/>
          </el-form-item>
          <el-form-item label="咨询邮箱">
            <el-input v-model="form.email"/>
          </el-form-item>
          <el-form-item label="备案号">
            <el-input v-model="form.icp"/>
          </el-form-item>
          <el-form-item label="网站介绍">
            <el-input type="textarea" v-model="form.web_brief"/>
          </el-form-item>
          <el-form-item label="联系地址">
            <el-input v-model="form.address"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col>
        <div class="stamp">{{form.title}}</div>
      </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>

  import {getSchool, modifySchool, uploadFile} from "@/api/apis";

  export default {
    name: "config",
    data() {
      return {
        logofile: {},
        first_query: {
          school_id: undefined
        },
        // change_query: {
        //     school_id: undefined
        // },
        fileList: [],
        form: {
          school_id: undefined,
          logo: '',
          title: '',
          h5_domain:'',
          sub_domain: '',
          hotline: '',
          qq: '',
          email: '',
          icp: '',
          web_brief: '',
          address: ''

        }
      }
    },
    created() {
      getSchool().then(response => {
        this.form = response.data
      })
    },
    methods: {

      handleUpload(response, File) {
        this.form.logo = '/cdn/' + response.data
      },
      onSubmit() {
        console.log(this.form)
        modifySchool(this.form).then(() => {
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success'
          });
        })
      },
      onCancel() {
        this.form = {};
        console.log("clear")
      }
    }
  }
</script>

<style scoped lang="scss">
.stamp{
  top: 2rem;
  left: 17rem;
  position: absolute;
  transform: rotate(12deg);
  font-size: 3rem;
  font-weight: 700;
  border: 0.25rem solid #555;
  display: inline-block;
  padding: 0.25rem 1rem;
  text-transform: uppercase;
  border-radius: 1rem;
  font-family: 'Courier';
 -webkit-mask-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png');
  -webkit-mask-size: 944px 604px;
  mix-blend-mode: multiply;
  color: #D23;
  border: 0.5rem double #D23;
  -webkit-mask-position: 2rem 3rem;
  font-size: 2rem;
}
</style>
