<template>
<div class="loginBackground">
  <div class="login-container">
    <el-card class="login-card">
      <el-form @submit.native.prevent="login">
        <el-avatar style="margin-left:40%" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <el-form-item label="用户名">
          <el-input v-model="model.username" placeholder></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password" placeholder></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" native-type="submit" v-show="lo">登录</el-button>
          <el-progress :percentage="percentage" :color="customColorMethod"  v-show="!lo"></el-progress>
        </el-form-item> 
      </el-form>
    </el-card>
  </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            model:{},
            lo: true,
            percentage: 0
        }
    },
    methods:{
        async login(){
            const res=await this.$http.post('/asin/api/login',this.model)
            this.lo=false
            //sessionStorage.token=res.data.token//浏览器关闭就没了
            localStorage.users=res.data.username
            localStorage.token =res.data.token // 浏览器关闭还存在
            localStorage.auths =res.data.auths
            localStorage.avatar =res.data.avatar
            for(let i=0;i<=5;i++){
              this.increase()
              await this.sleep(1);
            }
            await this.sleep(3);
            this.$router.push('/')
            this.lo=true
            this.percentage=0
            this.$message.success('登录成功')
        },
        customColorMethod(percentage) {
          if (percentage < 30) {
            return '#909399';
          } else if (percentage < 70) {
            return '#e6a23c';
          } else {
            return '#67c23a';
          }
        },
        sleep(duration) {
            return new Promise(resolve => {
                setTimeout(resolve, duration * 100)
            })
        },
        increase() {
          this.percentage += 20;
          if (this.percentage > 100) {
            this.percentage = 100;
          }
        }
    }
}
</script>
<style>
.login-container {
  width: 30%;
  margin: 20vh auto;
}
.loginBackground{
  width:100%;
  background:url('../img/oxxw29.jpg');
  background-size:100% 100%;
  height:95.7vh
}
</style>