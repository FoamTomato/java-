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
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="用户" prop="user">
            <el-select v-model="form.user" placeholder="请选择用户" size="small">
                <el-option :label="user.name" :value="user.name" v-for="user in form.user"></el-option>
                <el-button size="small" @click="selects()">刷新</el-button>
            </el-select>
        </el-form-item>
        <el-form-item label="录入时间">
            <el-date-picker size="small"
                v-model="form.time" disabled>
            </el-date-picker>
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
        form: {
          asin:'',
          name: '',
          brand: '',
          seller: '',
          site: '',
          user: [],
          time: '',
          status: '1'
        },
        // 加载圈
        loading:false,
        // 表单校验
        rules:{
          name: [],
          brand: [],
          seller: [],
          status: '1',
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
          this.form.user=res.body
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
                      message: `asin：${res.data.asin}添加成功`,
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
      }
    }
  }
</script>
<style>

.but.el-button--primary{
  background-color: #065279;
  border-color: #065279;
}
</style>