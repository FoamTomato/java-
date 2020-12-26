<template>
    <el-container>
      <el-main style="padding: 5px;">
        <template>
          <el-tabs v-model="activeName" tab-position="left" style="height:92vh" @tab-click="handleClick">
            <el-tab-pane name="img" disabled="true">
              <span slot="label">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              </span>
            </el-tab-pane>
            <el-tab-pane label="ASIN查询" name="first" lazy>
              <first></first>
            </el-tab-pane>
            <el-tab-pane label="ASIN添加" name="second" lazy>
              <second></second>
            </el-tab-pane>
            <el-tab-pane label="侵权词" name="fourth" lazy>
              <fourth></fourth>
            </el-tab-pane>
            <el-tab-pane label="投诉人管理" name="third" lazy>
              <third></third>
            </el-tab-pane>
            <el-tab-pane label="用户管理" name="users" lazy>
              <users></users>
            </el-tab-pane>
            <el-tab-pane label="日本商标局" name="five" lazy>
            </el-tab-pane>
            <el-tab-pane label="欧洲商标局" name="six" lazy>
            </el-tab-pane>
            <el-tab-pane label="英国商标局" name="seven" lazy>
            </el-tab-pane>
            <el-tab-pane label="美国商标局" name="eight" lazy>
            </el-tab-pane>
            <el-tab-pane label="加拿大商标局" name="nine" lazy>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-main>
    </el-container>
</template>
<script>
import { ipcRenderer,remote } from 'electron'
import first from './First.vue'
import second from './Second.vue'
import third from './Third.vue'
import fourth from './Fourth.vue'
import users from './Users.vue'

export default {
    data() {
      return {
          activeName: 'first',
          findOne:"",
      };
    },
    components:{
        'first':first,
        'second':second,
        'third':third,
        'fourth':fourth,
        'users':users
    },
    created(){
    },
    methods: {
      logout(){
        this.$confirm(`确认登出账号?请谨慎操作，不可复原`)
        .then(_ => {
          localStorage.users=null
          localStorage.token =null//浏览器关闭还存在
          this.$message.success("登出成功")
          this.$router.push('/login')
        })
        .catch(_ => {});
      },
      // 下拉菜单选择
      handleClick(tab, event) {
        // 页面满足加载，不满足关闭
        if(tab.name=="five"||tab.name=="six"||tab.name=="seven"||tab.name=="nine"||tab.name=="eight"){
          ipcRenderer.send(tab.name)
        }else{
          ipcRenderer.send("closeView")
        }
      },
      // 关闭
      close(){
        ipcRenderer.send('close')
      },
      // 缩小
      subtract(){
        remote.getCurrentWindow().minimize()
      },
      // 放大
      plus(){
        // 判断是否最大化
        // console.log(remote.getCurrentWindow().isMaximized())
        if(remote.getCurrentWindow().isMaximized()){
          // 复原
          remote.getCurrentWindow().restore();
        }else{
          // 最大化
          remote.getCurrentWindow().maximize()
        }
      }
    }
  };
</script>
<style>
.input-with-select>.el-input-group__append{
  background-color: #065279;
  border-color:#065279;
  color:#fff
}
.input-with-select>.el-input-group__append:hover{
  background-color: IndianRed;
  border-color:IndianRed;
  color:#fff
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-header {
  color: white;
}
.el-aside {
  color: #333;
}
.el-menu{
  border-right: 0px;
}
.el-icon-remove.el-icon-removes{
  margin-top:-8px;
  font-size: 18px;
  color:brown;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
.el-icon-remove.el-icon-removes:hover{
  margin-top:-8px;
  font-size: 18px;
  color:IndianRed;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
.el-icon-circle-plus.el-icon-circle-pluss{
   margin-top:-8px;
  font-size: 18px;
  color:#2E8B57;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
.el-icon-circle-plus.el-icon-circle-pluss:hover{
   margin-top:-8px;
  font-size: 18px;
  color:IndianRed;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
.el-icon-error.el-icon-errors{
   margin-top:-8px;
  font-size: 18px;
  color:DodgerBlue;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
.el-icon-error.el-icon-errors:hover{
   margin-top:-8px;
  font-size: 18px;
  color:IndianRed;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
</style>