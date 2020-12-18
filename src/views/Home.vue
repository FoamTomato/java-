<template>
  <el-container>
    <el-header style="-webkit-app-region: drag;text-align: right;height:6vh; font-size: 12px;background-color:#065279">
      <div style="float: left;margin-top:1vh;">
        <img src="../img/logos.png" 
        style="width: 4vh; height: 4vh;float: left;">
        <nobr style="float:right;margin-top:.5vh;margin-left:7px;font-family: '微软雅黑';">数独ASIN管理工具</nobr>
      </div>
      <div>
        <el-button type="text" class="el-icon-remove el-icon-removes" @click="close"></el-button>
        <el-button type="text" class="el-icon-circle-plus el-icon-circle-pluss" @click="close"></el-button>
        <el-button type="text" class="el-icon-error el-icon-errors" @click="close"></el-button>
      </div>
    </el-header>
    <el-container>
      <el-main style="padding: 5px;">
        <template>
          <el-tabs v-model="activeName" tab-position="left" style="height:92vh" @tab-click="handleClick" lazy>
            <el-tab-pane label="ASIN查询" name="first">
              <first></first>
            </el-tab-pane>
            <el-tab-pane label="ASIN添加" name="second">
              <second></second>
            </el-tab-pane>
            <el-tab-pane label="用户管理" name="third">
              <third></third>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { ipcRenderer } from 'electron'
import first from './First.vue'
import second from './Second.vue'
import third from './Third.vue'

  export default {
    data() {
      return {
          activeName: 'first',
      };
    },
    components:{
        'first':first,
        'second':second,
        'third':third
    },
    created(){
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      close(){
        ipcRenderer.send('close')
      },
    }
  };
</script>
<style>
.input-with-select>.el-input-group__append{
  background-color: #065279;
  border-color:#065279;
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
  margin-top:-.6vh;
  font-size: 18px;
  color:brown;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
.el-icon-remove.el-icon-removes:hover{
  margin-top:-.6vh;
  font-size: 18px;
  color:IndianRed;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
.el-icon-circle-plus.el-icon-circle-pluss{
  margin-top:-.6vh;
  font-size: 18px;
  color:#2E8B57;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
.el-icon-circle-plus.el-icon-circle-pluss:hover{
  margin-top:-.6vh;
  font-size: 18px;
  color:IndianRed;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
.el-icon-error.el-icon-errors{
  margin-top:-.6vh;
  font-size: 18px;
  color:DodgerBlue;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
.el-icon-error.el-icon-errors:hover{
  margin-top:-.6vh;
  font-size: 18px;
  color:IndianRed;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
</style>