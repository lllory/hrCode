<template>
  <div class="mod-config">
    <el-form
      id="specialForm"
      :inline="true"
      :model="dataForm"
      ref="searchForm"
      @keyup.enter.native="getDataList()"
    >
      <el-row :span="24">
        <el-col :span="6">
          <el-form-item>员工姓名：</el-form-item>
          <el-form-item prop="staffName">
            <el-input v-model="dataForm.staffName" placeholder="员工姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>员工编号：</el-form-item>
          <el-form-item prop="staffNo">
            <el-input v-model="dataForm.staffNo" placeholder="员工编号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item style="float: right;">
            <el-button
              style="margin-left: 8px;"
              v-if="!flag"
              v-on:click="getDataList()"
              type="primary"
            >查询</el-button>
            <el-button style="margin-left: 8px;" v-else disabled>查询</el-button>
            <el-button @click="reset('searchForm')">重置</el-button>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="18">
          <el-form-item>发布时间：</el-form-item>
          <el-form-item>
            <date-time-picker @sendDateTime="getDateTime" v-model="time"></date-time-picker>
          </el-form-item>

        
        </el-col>-->
      </el-row>
    </el-form>
    <div class="operatBtn">
      <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
      <el-button @click="deleteHandle()" :disabled="gettableList.length <= 0">批量删除</el-button>
      <div id="import_class">
        <input
          type="file"
          @change="importf(this)"
          v-if="clearFile"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, xlsx"
          id="fileCss"
        />
        <el-button type="primary">导入</el-button>
      </div>
      <!-- <el-button type="define" @click="exportExcel()">导出</el-button> -->
    </div>
    <!-- <dynamic-table ref='tableRef' style="width: 100%" :tabledata="dataList" :table-header="headerData" :refString='refString' ></dynamic-table> -->
    <dynamic-table
      style="width: 100%"
      ref="tableRef"
      :tabledata="dataList"
      :table-header="headerData"
      :PaginationList="tablePaginationList"
      :currentChangeHandleFun="currentChangeHandle"
      :sizeChangeHandleFun="sizeChangeHandle"
      :tableHeight="tableHeight"
      :refString="refString"
      @emitDataSelectionsList="getDataList"
      @emitDataList='getTableList'
    ></dynamic-table>
  </div>
</template>

// <script>
//   import AddOrUpdate from './timeupdate/time-wages-update'
//   import DetailBase from './client-detail'
import DateTimePicker from "../../common/dateTimePicker.vue";
import DynamicTable from "../../common/tabel";
import { configFun, deleteFn } from "../../../utils/utils.js";

export default {
  data() {
    return {
      dataForm: {
        staffName: "",
        staffNo: ""
      },
      formData: new FormData(),
      clearFile: true,
      tableHeight: window.innerHeight - 300,
      tablePaginationList: {
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        paginationShow: true
      },
      refString: "wages",
      dataList: [],
      gettableList: [],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      detailVisible: false,
      flag: false,
      headerData: [
        {
          id: 100,
          prop: "staffNo",
          label: "员工编号"
        },
        {
          id: 101,
          prop: "staffName",
          label: "姓名"
        },
        {
          id: 107,
          prop: "staffDepartment",
          label: "部门"
        },
        {
          id: 107,
          prop: "placeOfTaxation",
          label: "参保地"
        },
        {
          id: 103,
          prop: "salary",
          label: "工资"
        },
        {
          id: 104,
          prop: "idCard",
          label: "身份证号"
        }
      ]
    };
  },
  components: {
    //   AddOrUpdate,
    //   DetailBase,
    DynamicTable,
    DateTimePicker
  },
  activated() {
    this.getDataList();
  },
  methods: {
    addOrUpdateHandle() {
      this.$refs.tableRef.update('', "wages");
    },
    // 导入
    importf(obj) {
      // this.clearFile = true
      // this.$refs.clearFile.value = ''
      var fileId = document.getElementById("fileCss");
      let self = this;
      if (fileId.files[0].size <= 50 * 1024 * 1024) {
        this.file = fileId.files[0];
        this.formData.append("file", this.file);
        if (
          fileId.files[0].name.split(".")[1] == "xls" ||
          fileId.files[0].name.split(".")[1] == "xlsx" ||
          fileId.files[0].name.split(".")[1] == "csv"
        ) {
          this.clearFile = false;
          this.$http({
            url: this.$http.adornUrl(`/stafflist/importStaff/`),
            method: "post",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            data: this.formData
          })
            .then(({ data }) => {
              if (data && data.code === 0) {
                this.formData = new FormData();
                this.clearFile = true;
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {}
                });
              } else {
                this.formData = new FormData();
                this.$message.error(data.msg);
                this.clearFile = true;
              }
            })
            .catch(e => {
              this.formData = new FormData();
              this.$message.error(e);
              this.clearFile = true;
            });
        } else {
          this.$message.error(`请选择后缀名为.xls、.xlsx或者.csv的文件`);
          this.dataForm.apppackagename = "";
        }
        this.formData = new FormData();
      } else {
        this.$message.error("不能大于50M");
      }
    },
    // 获取数据列表
    getDataList() {
      this.tablePaginationList.paginationShow = false;
      this.$refs.tableRef.clearSelectionT();
      this.currentChangeHandle(1);
      this.$nextTick(function() {
        this.tablePaginationList.paginationShow = true;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      // this.pageSize = val
      // this.pageIndex = 1
      this.tablePaginationList.pageSize = val;
      this.tablePaginationList.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      // this.pageIndex = val
      this.tablePaginationList.pageIndex = val;
      if (this.propHeight != undefined) {
        this.tableHeight = window.innerHeight - 460;
      } else {
        this.tableHeight = window.innerHeight - 345;
      }
      //表格高度自适应
      window.addEventListener("resize", () => {
        if (this.propHeight != undefined) {
          this.tableHeight = window.innerHeight - 460;
        } else {
          this.tableHeight = window.innerHeight - 345;
        }
      });
      this.dataListLoading = true;
      this.flag = true;
      this.$http({
        url: this.$http.adornUrl("/stafflist/getstaffList"),
        method: "post",
        data: this.$http.adornParams({
          pageIndex: this.tablePaginationList.pageIndex,
          pageSize: this.tablePaginationList.pageSize,
          object: this.dataForm
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.list.list;
          // this.totalPage = data.list.totalCount;
          this.tablePaginationList.totalPage = data.list.totalCount;
        } else {
          this.dataList = [];
          // this.totalPage = 0;
          this.tablePaginationList.totalPage = 0;
        }
        this.dataListLoading = false;
        this.flag = false;
      });
    },
    // 多选
    // 新增 / 修改
    // 删除
    deleteHandle(id) {
      this.$confirm(`确定进行批量删除操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl("/stafflist/deleteStaff"),
            method: "post",
            data: {
              ids: this.gettableList
            }
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: data.msg,
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.getDataList();
                }
              });
            } else {
              this.getDataList();
              this.$message.error(data.msg);
            }
          });
        })
        .catch(() => {});
    },
    // 获取列表id
    getTableList(data) {
      this.gettableList = data;
    },
    // 获取子组件中的时间
    getDateTime(data) {
      this.time = data.time;
      this.createDateStart = data.startTime;
      this.createDateEnd = data.endTime;
    },
    // 导出
    exportExcel() {
      // let table = document.querySelector('.el-table__fixed-right');
      configFun(".el-table__fixed-right", "400拨测客户端管理");
    },
    //重置
    reset(searchForm) {
      this.dataForm = {
        staffName: "",
        staffNo: ""
      };
    }
  }
};
</script>

<style lang="scss" scoped>
#import_class {
  display: inline-block;
  position: relative;
  cursor: pointer;
}
#fileCss {
  position: absolute;
  z-index: 999;
  width: 70px;
  opacity: 0;
  left: 0%;
  height: 30px;
  cursor: pointer;
}
</style>
