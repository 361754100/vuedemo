<template>
  <div id="car-management">
    <div id="main-tool-bar" class="main-tool-bar-div">
      <el-date-picker
        v-model="search_form.defaultDateValue"
        type="daterange"
        :picker-options="search_form.pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="medium"
        align="right">
      </el-date-picker>
      <el-input v-model="search_form.keywords" size="medium" auto-complete="off" placeholder="车牌关键字：粤S88888" style="width: 250px"></el-input>

      <el-button-group>
        <el-button type="primary" size="medium" icon="el-icon-search" @click="handlePageSearch">搜索</el-button>
        <el-button type="primary" size="medium" icon="el-icon-time" @click="resetSearch_form">重置</el-button>
      </el-button-group>

      <el-button-group>
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>
        <el-button type="primary" size="medium" icon="el-icon-edit" @click="handleUpdate">修改</el-button>
        <el-button type="primary" size="medium" icon="el-icon-delete" @click="handleDel">删除</el-button>
      </el-button-group>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        prop="id"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        prop="carNo"
        label="车牌号码"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="carColor"
        label="车辆颜色"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="carName"
        label="车辆品牌"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        label="日期"
        align="left"
        show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.creationTime | renderDate }}</template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <div style="margin-bottom: 0px">
      <v-page-tool-bar :page-no="pageNo" :page-size="pageSize" :total-count="totalCount"
                       v-on:pageNoChange="handlePageNoChange" v-on:pageSizeChange="handlePageSizeChange" v-on:pageRefresh="handlePageSearch"></v-page-tool-bar>
    </div>


    <el-dialog title="编辑车辆信息" :visible.sync="dialogFormVisible" align="left">
      <el-form :model="edit_form" ref="edit_form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="车辆品牌：" :label-width="formLabelWidth" prop="carName">
              <el-input v-model="edit_form.carName" auto-complete="off" placeholder="例如：Jeep自由光"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车牌号码：" :label-width="formLabelWidth" prop="carNo">
              <el-input v-model="edit_form.carNo" auto-complete="off" placeholder="例如：粤S00888"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="车身颜色：" :label-width="formLabelWidth" prop="carColor">
              <el-input v-model="edit_form.carColor" auto-complete="off" placeholder="例如：蓝色"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车主：" :label-width="formLabelWidth" prop="owner" >
              <el-input v-model="edit_form.ownerId" auto-complete="off" placeholder="例如：王先生"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!--<el-form-item label="活动区域" :label-width="formLabelWidth">-->
        <!--<el-select v-model="edit_form.region" placeholder="请选择活动区域">-->
        <!--<el-option label="区域一" value="shanghai"></el-option>-->
        <!--<el-option label="区域二" value="beijing"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEditInfo">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script type="application/javascript" src="../assets/javascript/CommonUtils"></script>
<script>
  import vPageToolBar from './PageToolBar'
  import axios from 'axios'
  import formatDate from '../assets/javascript/CommonUtils'
  import api_utils from '../assets/javascript/ApiUtils'

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
        multipleSelection: [],
        editType: 1,
        dialogFormVisible: false,
        formLabelWidth: '100px',
        edit_form: {
          recordId: '',
          carName: '',
          carNo: '',
          carColor: '',
          ownerId: ''
        },
        search_form: {
          pickerOptions: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
          defaultDateValue: [],
          keywords: ''
        }
      }
    },
    filters: {
      renderDate: function (value) {
        return formatDate(value);
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
          startTime: formatDate(this.search_form.defaultDateValue[0].getTime()),
          endTime: formatDate(this.search_form.defaultDateValue[1].getTime()).substring(0, 11)+ '23:59:59',
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          keywords: this.search_form.keywords
        }
        let url = api_utils.carinfo_api.pagesearch_url;
        axios.post(
          url,
          params
          //方式2通过transformRequest方法发送数据，本质还是将数据拼接成字符串
          , {
            transformRequest: [
              function (data) {
                let params = '';
                for (let index in data) {
                  params += index + '=' + data[index] + '&';
                }
                return params;
              }
            ]
          })
          .then(response => {
            console.log('response --->' + response);
            this.tableData = response.data.records;
            this.totalCount = response.data.totalCount;
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
      },
      handleAdd() {
        this.editType = 1;
        this.dialogFormVisible = true;
      },
      handleUpdate() {
        this.editType = 2;
        let selectedLen = this.multipleSelection.length;
        if (selectedLen > 1 || selectedLen == 0) {
          this.$alert('请选择要一条记录', {
            confirmButtonText: '确定',
            callback: action => {
              //
            }
          });
          return;
        }
        this.edit_form.recordId = this.multipleSelection[0].id;
        this.edit_form.carColor = this.multipleSelection[0].carColor;
        this.edit_form.carName = this.multipleSelection[0].carName;
        this.edit_form.carNo = this.multipleSelection[0].carNo;
        this.edit_form.ownerId = 0; ///...

        this.dialogFormVisible = true;
      },
      handleDel() {
        let selectedLen = this.multipleSelection.length;
        if (selectedLen == 0) {
          this.$alert('请选择要删除的数据', {
            title: '温馨提示',
            confirmButtonText: '确定',
            callback: action => {
              //
            }
          });
          return;
        }
        let rowIds = [];
        for (let i = 0; i < selectedLen; i++) {
          rowIds.push(this.multipleSelection[i].id);
        }
        let _this = this;
        let params = {
          ids: rowIds
        }

        this.$msgbox({
          title: '温馨提示',
          message: '确定要删除选中的数据？',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';

              let url = api_utils.carinfo_api.delete_url;
              axios.post(
                url,
                JSON.stringify(params),
                {
                  headers: {'Content-Type': 'application/json'}
                }
                //方式2通过transformRequest方法发送数据，本质还是将数据拼接成字符串
              ).then(response => {
                let resultCode = response.data.resultCode;
                let resultMsg = response.data.resultMsg;
                done();
                if (resultCode == 100) {
                  this.$message({
                    type: 'success',
                    message: resultMsg
                  });
                  _this.handlePageSearch();
                } else {
                  this.$alert(resultMsg, {
                    confirmButtonText: '确定',
                    callback: action => {
                      //
                    }
                  });
                }
              })
                .catch(error => {
                  console.log(error)
                })
                .finally(() => instance.confirmButtonLoading = false)
            } else {
              done();
            }
          }
        }).then(action => {
          // this.$message({
          //   type: 'info',
          //   message: 'action: ' + action
          // });
        });
      },
      saveEditInfo() {
        let _this = this;
        let params = {
          carName: this.edit_form.carName,
          carNo: this.edit_form.carNo,
          carColor: this.edit_form.carColor,
          ownerId: this.edit_form.ownerId,
          recordId: this.edit_form.recordId
        }
        let url = api_utils.carinfo_api.add_url;
        if (this.editType == 2) {
          url = api_utils.carinfo_api.update_url;
        }
        axios.post(
          url,
          JSON.stringify(params),
          {
            headers: {'Content-Type': 'application/json'}
          }
          //方式2通过transformRequest方法发送数据，本质还是将数据拼接成字符串
        )
          .then(response => {
            let resultCode = response.data.resultCode;
            let resultMsg = response.data.resultMsg;

            if (resultCode == 100) {
              this.$message({
                type: 'success',
                message: resultMsg
              });
              _this.dialogFormVisible = false;
              // _this.$ref.edit_form.resetFields();
              _this.resetEdit_form();
              _this.handlePageSearch();
            } else {
              this.$alert(resultMsg, {
                confirmButtonText: '确定',
                callback: action => {
                  //
                }
              });
            }
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => this.loading = false)
      },
      resetSearch_form() {
        this.search_form.keywords = '';
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        this.search_form.defaultDateValue = [];
        this.search_form.defaultDateValue.push(start);
        this.search_form.defaultDateValue.push(end);
        this.handlePageSearch();
      },
      resetEdit_form() {
        this.edit_form.carName = '';
        this.edit_form.carNo = '';
        this.edit_form.ownerId = '';
        this.edit_form.recordId = '';
        this.edit_form.carColor = '';
        // this.$ref.edit_form.resetFields();
      }
    },
    mounted() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      this.search_form.defaultDateValue.push(start);
      this.search_form.defaultDateValue.push(end);
      this.handlePageSearch();
    }
  }
</script>

<style scoped>

</style>
