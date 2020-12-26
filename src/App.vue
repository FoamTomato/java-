<template>
  <div id="app">
    <el-container>
      <el-header style="-webkit-app-region: drag;text-align: right;height:30px;max-height:30px; font-size: 12px;background-color:#065279">
        <el-row :gutter="20">
          <el-col :span="6">
            <div style="float: left;margin-top:5px;">
              <img src="./img/logos.png" 
              style="width: 20px; height: 20px;float: left;">
              <nobr style="float:right;margin-top:1px;margin-left:7px;font-family: '微软雅黑';text-align:center">数独科技-运营插件工具</nobr>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="text-align:center;line-height:30px">
              {{"adminasdfsadfa"}}
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-button type="text" class="el-icon-remove el-icon-removes" @click="subtract"></el-button>
              <el-button type="text" class="el-icon-circle-plus el-icon-circle-pluss" @click="plus"></el-button>
              <el-button type="text" class="el-icon-error el-icon-errors" @click="close"></el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <router-view />
    </el-container>
  </div>
</template>
<script>
export default{
    mounted(){
      window.addEventListener('offline', function ($event) { this.$message.error('断网了'); });
      window.addEventListener('online', function ($event) { this.$message.success('来网了'); });
    }
}
</script>
<style>
body,
html {
  margin: 0;
  padding: 0;
  font-family: "微软雅黑"
}
button,el-container {
  -webkit-app-region: no-drag;
}
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
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