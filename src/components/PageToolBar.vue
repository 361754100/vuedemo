<template>
  <div class="block page-tool-bar-div">
    <el-button icon="el-icon-thd-refresh" title="刷新" @click="handleRefreshBtn"
               style="width: 32px; height: 28px; padding: 0px; float: left; margin: 2px 5px 1px 2px;"></el-button>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNo"
      :page-sizes="[50, 100, 150, 200]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "PageToolBar",
        methods: {
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            // 把值回调给父组件绑定的事件
            this.$emit('pageSizeChange', val);
          },
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            // 把值回调给父组件绑定的事件
            this.$emit('pageNoChange', val);
          },
          handleRefreshBtn(val) {
            this.$emit('handlePageSearch', val);
          }
        },
        data() {
          return {
            // pageNo: 1,
            // pageSize: 50,
            // totalCount: 0
          };
        },
        props: ['pageNo', 'pageSize', 'totalCount']
    }
</script>

<style scoped>

</style>
