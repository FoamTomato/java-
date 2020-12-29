<template>
    <el-container>
      <el-main style="padding: 5px;">
        <template>
          <el-tabs v-model="activeName" tab-position="left" style="height:92vh" @tab-click="handleClick">
            <el-tab-pane name="img">
              <span slot="label">
                <el-avatar shape="square"  v-if="avatar()==undefined" style="float:left" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <el-avatar  v-if="avatar()!=undefined" style="float:left;margin-left:20%" shape="square" :src="avatar()" >
                  <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                </el-avatar>
                <a @click="logout" style="font-size:10px;">切换</a>
              </span>

              <img src="../img/sudo.png" style="width:100%;margin-top:20vh"/>
            </el-tab-pane>
            <el-tab-pane v-if="auths('ASIN查询')" label="ASIN查询" name="first" lazy>
              <first></first>
            </el-tab-pane>
            <el-tab-pane v-if="auths('ASIN添加')" label="ASIN添加" name="second" lazy>
              <second></second>
            </el-tab-pane>
            <el-tab-pane v-if="auths('侵权词')" label="侵权词" name="fourth" lazy>
              <fourth></fourth>
            </el-tab-pane>
            <el-tab-pane v-if="auths('投诉人管理')" label="投诉人管理" name="third" lazy>
              <third></third>
            </el-tab-pane>
            <el-tab-pane v-if="auths('用户管理')" label="用户管理" name="users" lazy>
              <users></users>
            </el-tab-pane>
            <el-tab-pane v-if="auths('日本商标局')" label="日本商标局" name="five" lazy>
            </el-tab-pane>
            <el-tab-pane v-if="auths('欧洲商标局')" label="欧洲商标局" name="six" lazy>
            </el-tab-pane>
            <el-tab-pane v-if="auths('英国商标局')" label="英国商标局" name="seven" lazy>
            </el-tab-pane>
            <el-tab-pane v-if="auths('美国商标局')" label="美国商标局" name="eight" lazy>
            </el-tab-pane>
            <el-tab-pane v-if="auths('加拿大商标局')" label="加拿大商标局" name="nine" lazy>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-main>
    </el-container>
</template>
<script>
import { ipcRenderer,remote } from 'electron'
import { FindInPage } from 'electron-find'
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
      // 查询所有的用户权限
    },
    methods: {
      auths(str) {
        return localStorage.auths.indexOf(str)==-1?false:true  // -1 说明array中不存在id为str的对象
      },
      avatar(){
        return localStorage.avatar
      },
      updatese(){
        this.$forceUpdate()
      },
      // 换号
      logout(){
        this.$confirm(`确认切换账号?请谨慎操作，不可复原`)
        .then(_ => {
          localStorage.clear()
          this.$message.success("登出成功")
          this.$router.push('/login')
        })
        .catch(_ => {});
      },
      // 下拉菜单选择
      handleClick(tab, event) {
        // 页面满足加载，不满足关闭
        if(tab.name=="five"||tab.name=="six"||tab.name=="seven"||tab.name=="nine"||tab.name=="eight"){
          this.finds()
          ipcRenderer.send(tab.name)
        }else{
          ipcRenderer.send("closeView")
        }
      },
      finds(){
        // 配置查找窗口相对于父级定位节点的偏移量
        let findInPage = new FindInPage(window, {
            offsetTop: 20,
            offsetRight: 10
        })
        console.log(123)
        findInPage.openFindWindow()
      }
    }
  };
</script>
<style>
.el-avatar--square {
  border: 1px solid #eef1f3;
  box-shadow:0px 10px 5px -10px #000;
}
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
.el-avatar>img {
  width:100%
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