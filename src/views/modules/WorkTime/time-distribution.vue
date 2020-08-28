<template>
  <div class="mod-config">
    <el-form
      id="specialForm"
      :inline="true"
      ref="searchForm"
      :model="dataForm"
      @keyup.enter.native="getDataList()"
      class="query attendance"
    >
      <el-row :span="24">
        <el-col :span="6">
          <el-form-item>部门名称：</el-form-item>
          <el-form-item prop="department">
            <el-select v-model="dataForm.department" placeholder="请选择">
              <el-option
                v-for="item in collectingBusiness"
                :key="item.id"
                :label="item.depName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>员工姓名：</el-form-item>
          <el-form-item prop="staffName">
            <el-input v-model="dataForm.staffName" placeholder="员工姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>工号：</el-form-item>
          <el-form-item prop="staffNo">
            <el-input v-model="dataForm.staffNo" style placeholder="工号" clearable></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item style="margin-right:-2px;">月份：</el-form-item>
          <el-form-item>
            <date-time-picker
              style="margin-left: -29px;"
              v-model="time"
              @sendDateTime="getDateTime"
            ></date-time-picker>
          </el-form-item>
        </el-col>-->
        <el-col :span="6">
          <el-form-item style="margin-right:-2px;">月份：</el-form-item>
          <el-form-item>
            <date-time-picker
              style="margin-left: -29px;"
              v-model="dataForm.statisticsDate"
              @sendDateTime="getDateTime"
            ></date-time-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="6">
          <el-form-item>项目代码：</el-form-item>
          <el-form-item prop="projectCode">
            <el-input v-model="dataForm.projectCode" style placeholder="项目代码" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>纳税地：</el-form-item>
          <el-form-item prop="placeOfTaxation">
            <el-input v-model="dataForm.placeOfTaxation" style placeholder="纳税地" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" style>
          <el-button style="float:right;margin-left: 8px;" @click="reset('searchForm')">重置</el-button>
          <el-button style="float:right" v-if="!flag" v-on:click="getDataList()" type="primary">查询</el-button>
          <el-button style="float:right" v-else disabled>查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="operatBtn">
      <!-- <el-button type="primary" @click="addOrUpdateHandle()">计算</el-button>
      <el-button type="primary" @click="importExcel" ref="suspendRef">导入</el-button>-->
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
      <!-- <el-button type="primary" @click="exportExcel">导出</el-button> -->
    </div>
    <dynamic-table
      style="width: 100%"
      ref="tableRef"
      :tabledata="dataList"
      :table-header="headerData"
      :PaginationList="tablePaginationList"
      :currentChangeHandleFun = 'currentChangeHandle'
      :sizeChangeHandleFun = 'sizeChangeHandle'
      :tableHeight = 'tableHeight'
    ></dynamic-table>
  </div>
</template>
<script>
//  import DateTimePicker from "../../common/dateTimePicker.vue";
import DateTimePicker from "../../common/dateTime.vue";
import { configFun, deleteFn } from "../../../utils/utils.js";
import DynamicTable from "../../common/tabel";
export default {
  props: ["propHeight", "isHeight"],
  data() {
    return {
      // paginationShow: true,
      tableHeight: window.innerHeight - 300,
      customerList: [], //客户
      dataForm: {
        statisticsDate:"",//月份
        placeOfTaxation:"",//纳税地
        projectCode:"",//项目代码
        staffNo: "",
        staffName: "",
        department: ""
      },
      tablePaginationList: {
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        paginationShow: true
      },
      formData: new FormData(),
      clearFile: true,
      collectingBusiness: [],
      dataList: [],
      // pageIndex: 1,
      // pageSize: 10,
      // totalPage: 0,
      dataListLoading: false,
      flag: false,
      time: "", // 存子组件中的time值
      startdate: "",
      enddate: "",
      taskname: "",
      customerName: "",
      taskStatu: "",
      detailVisible: false,
      detailVisibletwo: false,
      dataListSelections: [],
      // 时间选择器
      newdate: "",
      attendanceList: [],
      headerData: [
        {
          id: 100,
          prop: "serialNumber",
          label: "序号",
        },
        {
          id: 101,
          prop: "staffName",
          label: "员工姓名",
          width:120,
        },
        {
          id: 102,
          prop: "staffNo",
          label: "员工编号",
          width:120,
        },
        {
          id: 103,
          prop: "department",
          label: "部门",
          width:120,
        },
        {
          id: 104,
          prop: "costCenterCode",
          label: "成本中心代码",
          width:180
        },
        {
          id: 105,
          prop: "projectCode",
          label: "项目代码",
        },
        {
          id: 106,
          prop: "monthlyWorkingHours",
          label: "月工时",
        },
        {
          id: 107,
          prop: "projectHours",
          label: "项目工时",
        },
        {
          id: 107,
          prop: "placeOfTaxation",
          label: "纳税地",
        }
      ]
      // 省市县
    };
  },
  components: {
    DateTimePicker,
    DynamicTable
  },
  activated() {
    // this.getDataList();
  },
  mounted() {
    // 网点名称
    // this.networkPonintType();
    this.getDataList();
    this.getTime();
    const time = new Date(new Date().getTime());
    this.newdate =
      time.getFullYear() +
      "-" +
      (time.getMonth() + 1 >= 10
        ? time.getMonth() + 1
        : "0" + (time.getMonth() + 1)) +
      "-" +
      (time.getDate() >= 10 ? time.getDate() : "0" + time.getDate());
    this.attendanceName(); //部门名称
  },
  methods: {
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
            url: this.$http.adornUrl(`/worktime/uploadWorkTime/`),
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
    attendanceName() {
      this.$http({
        url: this.$http.adornUrl(`/department/getlist`),
        method: "post",
        data: this.$http.adornParams()
      }).then(({ data }) => {
        if (data.code == 0) {
          this.collectingBusiness = data.list;
        } else {
          this.collectingBusiness = [];
        }
      });
    },
    // getRowKey(row){
    //   return row.id
    // },
    taskDetail(jobnumber) {},

    // 數組对象去重
    removeRepeatArrObj(arr) {
      let allArr = [];
      for (var i = 0; i < arr.length; i++) {
        var flag = true;
        for (var j = 0; j < allArr.length; j++) {
          if (arr[i].id == allArr[j].id) {
            flag = false;
          }
        }
        if (flag) {
          allArr.push(arr[i]);
        }
      }
      return allArr;
    },
    // 导出
    exportExcel() {
      this.$http({
        url: this.$http.adornUrl(`/file/exportAttendanceInfo`),
        method: "post",
        headers: {
          "Content-Type": "application/json; application/octet-stream"
        },
        responseType: "blob",
        data: this.$http.adornParams({
          startdate: this.startdate ? this.startdate.split(" ")[0] : "",
          enddate: this.enddate ? this.enddate.split(" ")[0] : "",
          staffNo: this.dataForm.staffNo,
          staffName: this.dataForm.staffName,
          department: this.dataForm.department,
          ids: this.removeRepeatArrObj(this.attendanceList)
        })
      }).then(({ data }) => {
        const content = data;
        const blob = new Blob([content], { type: "application/excel" }); // 构造一个blob对象来处理数据
        const fileName = "打卡记录表.xlsx"; // 导出文件名
        // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
        // IE10以上支持blob但是依然不支持download
        if ("download" in document.createElement("a")) {
          // 支持a标签download的浏览器
          const link = document.createElement("a"); // 创建a标签
          link.download = fileName; // a标签添加属性
          link.style.display = "none";
          link.href = URL.createObjectURL(blob);
          document.body.appendChild(link);
          link.click(); // 执行下载
          URL.revokeObjectURL(link.href); // 释放url
          document.body.removeChild(link); // 释放标签
        } else {
          // 其他浏览器
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },

    init(id) {
      // this.reset();
      this.time = "";
    },
    // 获取数据列表
    getDataList() {
      this.tablePaginationList.paginationShow = false;
      //   this.$refs.tabelData.clearSelection()
      this.currentChangeHandle(1);
      this.$nextTick(function() {
        this.tablePaginationList.paginationShow = true;
      });
    },
    // // 每页数
    sizeChangeHandle(val) {
      // this.pageSize = val;
      // this.pageIndex = 1;
      this.tablePaginationList.pageSize = val
      this.tablePaginationList.pageIndex = 1
      this.getDataList();
    },
    // // 当前页
    currentChangeHandle(val) {
      // this.pageIndex = val;
      this.tablePaginationList.pageIndex = val
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
        url: this.$http.adornUrl("/worktime/getWorkTimeList"),
        method: "post",
        data: this.$http.adornParams({
          pageIndex: this.tablePaginationList.pageIndex,
          pageSize: this.tablePaginationList.pageSize,
          object:this.dataForm
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
    // // 多选
    // selectionChangeHandle(val) {
    //     console.log(this.dataListSelections,'this.dataListSelections')
    //   this.dataListSelections = val;
    //   if( this.dataListSelections != ''){
    //     this.dataListSelections.forEach(item=>{
    //       let obj = {}
    //       obj.id= item.id
    //       this.attendanceList.push(obj)
    //     })
    //   }
    // },
    // 详情
    detailHandle(id) {
      this.detailVisibletwo = true;
      this.$nextTick(() => {
        this.$refs.detailtwo.init(id);
      });
    },

    // 重置
    reset(formName) {
      this.dataForm = {
        statisticsDate:"",//月份
        placeOfTaxation:"",//纳税地
        projectCode:"",//项目代码
        staffno: "",
        staffname: "",
        department: ""
      };
    },
    getTime: function() {
      let time = new Date(new Date().getTime());
      this.startT =
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1 >= 10
          ? time.getMonth() + 1
          : "0" + (time.getMonth() + 1)) +
        "-" +
        (time.getDate() >= 10 ? time.getDate() : "0" + time.getDate()) +
        " " +
        "00:00:00";
      this.endT =
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1 >= 10
          ? time.getMonth() + 1
          : "0" + (time.getMonth() + 1)) +
        "-" +
        (time.getDate() >= 10 ? time.getDate() : "0" + time.getDate()) +
        " " +
        "23:59:59";
    },

    // 获取子组件中的时间
    getDateTime(data) {
      // this.time = data.startTime;
      this.startdate = data.startTime;
      this.enddate = data.endTime;
      this.dataForm.statisticsDate = data.startTime;
    }
  },

  created() {}
};
</script>
<style scoped>
.mod-config p {
  float: left;
  width: 25%;
  text-align: right;
  height: 32px;
  line-height: 32px;
  margin: 0;
}

.el-dialog__body {
  height: 500px;
  overflow: auto;
}
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
.el-row {
  margin-bottom: 0;
  height: 42px;
}
.el-table thead.is-group th {
  background: #fff;
}
</style>