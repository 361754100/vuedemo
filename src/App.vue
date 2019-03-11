<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--<el-button>默认按钮</el-button>
    <v-test></v-test>-->
    <ul id="main">
        <li><router-link to="/hello">HelloWorld</router-link></li>
        <li><router-link to="/test">Test</router-link></li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
  // 引入自定义组件
  import vTest from "./components/test.vue";

export default {
  name: 'App',
  components:{
    vTest
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
