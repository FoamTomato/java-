<template>
  <div id="app">
    <router-view />
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
</style>