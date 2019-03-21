<template>
  <div id="car-management">
    <div id="main-tool-bar" class="main-tool-bar-div">
      <el-button-group>
        <el-button type="primary" size="small" icon="el-icon-circle-plus-outline">新增</el-button>
        <el-button type="primary" size="small" icon="el-icon-edit">修改</el-button>
        <el-button type="primary" size="small" icon="el-icon-delete">删除</el-button>
      </el-button-group>
        <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <div style="margin-bottom: 0px">
      <v-page-tool-bar :page-no="pageNo" :page-size="pageSize" :total-count="totalCount"
       v-on:pageNoChange="handlePageNoChange" v-on:pageSizeChange="handlePageSizeChange"></v-page-tool-bar>
    </div>
  </div>
</template>

<script>
  import vPageToolBar from './PageToolBar'
  import axios from 'axios'

  export default {
    name: "CarManagement",
    components: {
      vPageToolBar
    },
    data() {
      return {
        pageNo: 1,
        pageSize: 50,
        totalCount: 0,
        tableData: [{}],
        multipleSelection: []
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handlePageNoChange(pageNo) {
        this.pageNo = pageNo;
        this.handlePageSearch();
      },
      handlePageSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.handlePageSearch();
      },
      handlePageSearch() {
        let params = {
          startTime: '2019-03-18 15:25:09',
          endTime: '2019-03-18 19:25:09',
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          keywords: ''
        }
        let url = 'http://localhost:8081/vehiclesys/main/vehicle/page_search';
        axios.post(
            url,
            params
            //方式2通过transformRequest方法发送数据，本质还是将数据拼接成字符串
            ,{
              transformRequest:[
              function(data){
                let params='';
                for(let index in data){
                  params+=index+'='+data[index]+'&';
                }
                return params;
              }
            ]
          })
          .then(response => {
            console.log('response --->'+ response);
            this.tableData = response.data.records;
            this.totalCount = response.data.totalCount;
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
      }
    },
    mounted() {
      this.handlePageSearch();
    }
  }
</script>

<style scoped>

</style>
