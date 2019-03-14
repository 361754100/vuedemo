<template>
  <!--设置container高度占比100%-->
  <el-container style="height: 100%;min-height:100vh;" >
      <el-aside width="auto" style="background-color: #545c64; border-right: solid 1px #e6e6e6;">
        <el-row style="background-color: #545c64; color: #fff;">
          <el-col :span="24">
            <div id="collapse-btn-div"  :title="collapseTitle" v-model="isCollapse" :class="{'btn-expand': !isCollapse, 'btn-collapse': isCollapse} " v-on:click="handleExpandBtn" v-on:mouseenter="handleExpandMouseOn" v-on:mouseleave="handleExpandMouseLeave">
              <i :class="{'el-icon-d-arrow-left': !isCollapse, 'el-icon-d-arrow-right': isCollapse, 'collapse-mouse-on':isMouseOn} " v-model="isMouseOn"></i>
            </div>
          </el-col>
        </el-row>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 style="border: none;"
                 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
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
        },
        data() {
          return {
            isCollapse: true,
            isMouseOn: false,
            collapseTitle: '展开'
          };
        },
        methods: {
          handleOpen(key, keyPath) {
            console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            console.log(key, keyPath);
          },
          handleExpandBtn() {
            if(this.isCollapse === false) {
              this.isCollapse = true;
              this.collapseTitle = '展开';
            } else {
              this.isCollapse = false;
              this.collapseTitle = '收起';
            }
          },
          handleExpandMouseOn(){
            this.isMouseOn = true;
          },
          handleExpandMouseLeave() {
            this.isMouseOn = false;
          }
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

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  /**
    折叠按钮的样式
   */
  #collapse-btn-div {
    display: block;
    height: 30px;
    line-height: 30px;
    float: right;
  }
  .btn-expand {
    width: 53px;
  }
  .btn-collapse {
    width: 63px;
  }
  .collapse-mouse-on {
    color: #ffd04b
  }
</style>
