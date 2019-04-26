<template>
  <div class="block page-tool-bar-div">
    <!--<el-button icon="el-icon-thd-refresh">默认按钮</el-button>-->
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
