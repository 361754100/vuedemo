<template>
  <!--设置container高度占比100%-->
  <el-container style="height: 100%;min-height:100vh;" >
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>
        <div id="main-div" >
          <!--<v-hello></v-hello>-->
          <v-test></v-test>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import vTest from './test.vue'
  import vHello from './HelloWorld.vue'
    export default {
        name: "index",
        components: {
          vTest,
          vHello
        }
    }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    padding:5px;
  }

  body > .el-container {
    display: block;
    margin-bottom: 0px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  #main-div{
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
