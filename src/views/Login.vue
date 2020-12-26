<template>
  <div class="login-container">
    <el-card class="login-card">
      <div slot="header">请先登录</div>
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username" placeholder></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password" placeholder></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
    data(){
        return{
            model:{}
        }
    },
    methods:{
        async login(){
            const res=await this.$http.post('/asin/api/login',this.model)
            //sessionStorage.token=res.data.token//浏览器关闭就没了
            localStorage.users=res.data.username
            localStorage.token =res.data.token//浏览器关闭还存在
            this.$router.push('/')
            this.$message.success('登录成功')
        }
    }
}
</script>
<style>
.login-container {
  width: 30%;
  margin: 5rem auto;
}
</style>