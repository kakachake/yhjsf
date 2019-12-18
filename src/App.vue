<template>
  <div id="app">
    <h1>操作系统-银行家算法</h1>
    <MainContent></MainContent>
  </div>
</template>

<script>
import MainContent from './components/MainContent'
export default {
  name: 'app',
  components: {
    MainContent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
body .el-table colgroup.gutter{
    display: table-cell!important;
}
.el-table th.gutter{
  display: table-cell!important;
}
</style>
