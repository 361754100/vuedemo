<template>
  <div id="app">
    <!--<img src="./assets/logo.png">
    &lt;!&ndash;<el-button>默认按钮</el-button>
    <v-test></v-test>&ndash;&gt;
    <ul id="main">
        <li><router-link to="/hello">HelloWorld</router-link></li>
        <li><router-link to="/test">Test</router-link></li>
    </ul>-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
}
</style>
