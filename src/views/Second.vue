<template>
    <el-form ref="form" v-loading="loading"  :model="form"  :rules="rules" status-icon label-width="80px" style="margin-top:20px;padding-right:20px" class="demo-ruleForm">
        <el-form-item label="ASIN" prop="asin">
            <el-input  size="small"  v-model="form.asin"  placeholder="请输入asin"></el-input>
        </el-form-item>
        <el-form-item label="产品名" prop="name">
            <el-input v-model="form.name" size="small"  placeholder="请输入产品名"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
            <el-input v-model="form.brand" size="small"  placeholder="请输入品牌"></el-input>
        </el-form-item>
        <el-form-item label="主卖家" prop="seller">
            <el-input v-model="form.seller" size="small"  placeholder="请输入主卖家"></el-input>
        </el-form-item>
        <el-form-item label="站点" prop="site">
            <el-select v-model="form.site" placeholder="请选择站点" size="small">
                <el-option label="美国" value="美国"></el-option>
                <el-option label="加拿大" value="加拿大"></el-option>
                <el-option label="墨西哥" value="墨西哥"></el-option>
                <el-option label="英国" value="英国"></el-option>
                <el-option label="法国" value="法国"></el-option>
                <el-option label="德国" value="德国"></el-option>
                <el-option label="荷兰" value="荷兰"></el-option>
                <el-option label="意大利" value="意大利"></el-option>
                <el-option label="西班牙" value="西班牙"></el-option>
                <el-option label="瑞典" value="瑞典"></el-option>
                <el-option label="澳大利亚" value="澳大利亚"></el-option>
                <el-option label="印度" value="印度"></el-option>
                <el-option label="阿联酋" value="阿联酋"></el-option>
                <el-option label="沙特阿拉伯" value="沙特阿拉伯"></el-option>
                <el-option label="日本" value="日本"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="用户" prop="user">
            <el-select v-model="form.user" placeholder="请选择用户" size="small">
                <el-option :label="user.name" :value="user.name" v-for="user in lists"></el-option>
            </el-select>
            <el-button size="small" @click="selects()" style="margin-left:10px">刷新</el-button>
        </el-form-item>
        <el-form-item label="录入时间">
            <el-date-picker size="small"
                v-model="form.time" disabled>
            </el-date-picker>
        </el-form-item>
        <el-form-item label="产品图片" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :action="$http.defaults.baseURLs+'/upload2'"
            :on-success="afterUpload"
          >
            <img v-if="form.avatar" :src="form.avatar" fit="cover" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon avatars"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button type="submit" class="but" @click="submitForm('form')" size="small">立即创建</el-button>
            <el-button type="submit"  @click="resetForm('form')" size="small">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
  export default {
    data() {
      return {
        lists:[],
        form: {
          asin:'',
          name: '',
          brand: '',
          seller: '',
          site: '',
          user: '',
          time: '',
          status: '1',
          avatar:''
        },
        // 加载圈
        loading:false,
        // 表单校验
        rules:{
          name: [],
          brand: [],
          seller: [],
          status: '1',
          avatar: '',
          asin: [
            { required: true, message: 'asin不能为空', trigger: 'blur' },
          ],
          site: [
            { required: true, message: '站点不能为空', trigger: 'blur' },
          ],
          user: [
            { required: true, message: '用户不能为空', trigger: 'blur' },
          ]
        },
      }
    },
    created(){
        this.form.time=Date.now()
        this.selects()
    },
    methods: {
      selects(){
        this.$http.post("/userA/select").then(res=>{
          this.lists=res.data
          console.log(this.lists)
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading=true
            this.$http.post("/asin/add",this.form).then(res=>{
              this.loading=false
              if(res.status==200){
                this.$notify({
                      title: '成功',
                      message: `asin：${res.data.asin}创建成功`,
                      type: 'success',
                      offset: 25
                });
                this.$refs[formName].resetFields();
              }else{
                this.$message.error("出现异常")
              }
            })
          } else {
            this.$message.error('错误的提交');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      afterUpload(res) {
        //给图片赋值
        this.form.avatar = res.url;
      }
    }
  }
</script>
<style>

.but.el-button--primary{
  background-color: #065279;
  border-color: #065279;
}

.avatar-uploader .el-upload {
  border: 1px dashed #065279;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: IndianRed;
}
.avatar-uploader-icon.avatars:hover {
  font-size: 24px;
  color: IndianRed;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar-uploader-icon.avatars{
  font-size: 24px;
  color: #065279;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>