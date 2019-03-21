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
          <el-menu-item index="2" @click="handleMenuBtnClick(3,'车辆管理')">
            <i class="el-icon-thd--cheliang"></i>
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
        <el-header style="background-color: white ; border-bottom: solid 1px #e6e6e6; padding: 0px 10px 0px 10px;">
          <div id="sys-logo">
            <img src="../assets/logo_2.png"/>
          </div>
          <div id="user-banner">
            <label style="font-family: '微软雅黑 Light'; margin-right: 15px;">{{timeStamp | formatDate}}</label>
            <el-button icon="el-icon-thd-tongzhi" circle></el-button>
            <el-button type="primary" icon="el-icon-thd-wode" circle></el-button>
          </div>
        </el-header>
        <el-main style="padding-top: 1px;">
          <div id="main-div">
            <el-tabs v-model="indexTabsValue"  type="border-card" closable @tab-remove="removeTab">
              <el-tab-pane
                v-for="(item, index) in indexTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
                class="el-tabs__content"
              >
                <component v-bind:is="item.component"></component>
              </el-tab-pane>
            </el-tabs>
            <!--<v-hello></v-hello>-->
            <!--<v-test></v-test>-->
            <!--<v-bmap></v-bmap>-->
          </div>
        </el-main>
      </el-container>

  </el-container>
</template>

<script>
  import vTest from './test.vue'
  import vHello from './HelloWorld.vue'
  import vBmap from './bmap.vue'
  import vCarManagement from './CarManagement.vue'

  // 在月份、日期、小时等小于10 时前面补0
  var padDate = function (value ) {
    return value < 10 ? '0' + value : value;
  }
    export default {
        name: "index",
        components: {
          vTest,
          vHello,
          vBmap,
          vCarManagement
        },
        data() {
          return {
            isCollapse: true,
            isMouseOn: false,
            timeStamp: new Date(),
            collapseTitle: '展开',
            indexTabsValue: '1',
            indexTabs: [{
              title: '首页',
              name: '1',
              component: vBmap
            }, {
              title: 'Tab 2',
              name: '2',
              component: vTest
            }],
            tabIndex: 2
          };
        },
        filters: {
          formatDate: function (value) {
            let date = new Date(value);
            let year = padDate(date.getFullYear());
            let month = padDate(date.getMonth());
            let day = padDate(date.getDate());
            let hours = padDate(date.getHours());
            let minutes = padDate(date.getMinutes());
            let seconds = padDate(date.getSeconds());
            return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
          }
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
          },
          handleMenuBtnClick(menuId, menuName) {
            switch (menuId) {
              case 1:
                break;
              case 3: this.addTab(menuId, menuName, vCarManagement);
                break;
              default: break;
            }
          },
          addTab(targetId, targetName, targetComponent) {
            let tabLength = this.indexTabs.length;
            for(let i = 0; i < tabLength; i++) {
              let tempTab = this.indexTabs[i];

              if(targetId == tempTab.name) {
                return;
              }
            }

            let newTabName = targetId + '';
            // let newTabName = ++this.tabIndex + '';
            this.indexTabs.push({
              title: targetName,
              name: newTabName,
              component: targetComponent
            });
            this.indexTabsValue = newTabName;
          },
          removeTab(targetName) {
            let tabs = this.indexTabs;
            let activeName = this.indexTabsValue;
            if (activeName === targetName) {
              tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                  let nextTab = tabs[index + 1] || tabs[index - 1];
                  if (nextTab) {
                    activeName = nextTab.name;
                  }
                }
              });
            }
            this.indexTabsValue = activeName;
            this.indexTabs = tabs.filter(tab => tab.name !== targetName);
          }
        },
        mounted: function () {
          let _this = this;
          this.timer = setInterval(function () {
            _this.timeStamp = new Date();
          }, 1000)
        },
        beforeDestroy: function () {
          if(this.timer) {
            clearInterval(this.timer);
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

  #sys-logo {
    display: block;
    float: left;
    width: 390px;
    height: 59px;
    line-height: 59px;
    overflow: hidden;
  }

  #user-banner {
    display: block;
    min-width: 200px;
    height: 59px;
    float: right;
    text-align: right;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }

  .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
    padding:2px 1px 0px 0px;
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
<style>
  /** Tab组件样式**/
  .el-tabs {
    height: 30px;
    line-height: 30px;
  }
  .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 0px;
    height: 30px;
    line-height: 30px;
  }
  .el-tabs__item {
    height: 30px;
    line-height: 30px;
  }
  .el-tabs> .el-tabs__content {
    padding: 2px 0px 0px 0px;
  }
</style>
