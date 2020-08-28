<template>
  <div class="mod-config">
    <el-form
      id="specialForm"
      :inline="true"
      ref="searchForm"
      :model="dataForm"
      @keyup.enter.native="getDataList()"
      class="query"
    >
      <el-row :span="24">
        <el-col :span="6">
          <el-form-item>部门名称：</el-form-item>
          <!-- <el-form-item prop="department">
            <el-input v-model="dataForm.department" placeholder="部门名称" clearable></el-input>
          </el-form-item> -->
          <el-form-item prop="department">
              <el-select v-model="dataForm.department" placeholder="请选择">
                <el-option v-for="item in collectingBusiness" :key="item.id" :label="item.depName" :value="item.id">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item style="margin-right:-2px;">月份：</el-form-item>
          <el-form-item>
            <date-time-picker
              style="margin-left: -29px;"
              v-model="time"
              @sendDateTime="getDateTime"
            ></date-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>员工姓名：</el-form-item>
          <el-form-item prop="staffname">
            <el-input v-model="dataForm.staffname" placeholder="员工姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>工号：</el-form-item>
          <el-form-item prop="staffno">
            <el-input
              v-model="dataForm.staffno"
              style="margin-left: -29px;"
              placeholder="工号"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :span="24">
        <el-col :span="24" style>
          <el-button style="float:right;margin-left: 8px;" @click="reset('searchForm')">重置</el-button>
          <el-button style="float:right" v-if="!flag" v-on:click="getDataList()" type="primary">查询</el-button>
          <el-button style="float:right" v-else disabled>查询</el-button>
        </el-col>
      </el-row>
      <!-- <el-row :span="24">
          <el-col :span="24" style="padding-right: 24px;">
            <el-button style="float:right;margin-left: 8px;" @click="reset('searchForm')">重置</el-button>
            <el-button style="float:right" v-if="!flag" v-on:click="getDataList()" type="primary">查询</el-button>
            <el-button style="float:right" v-else disabled>查询</el-button>
          </el-col>
      </el-row>-->
    </el-form>
    <div class="operatBtn" style="float:right">
      <el-button type="primary" @click="addOrUpdateHandle()">计算</el-button>
      <el-button type="primary" @click="importExcel" ref="suspendRef">导入</el-button>
      <el-button type="primary" @click="exportExcel">导出</el-button>
    </div>
    <el-table
      id="taskTable"
      :data="dataList"
      ref='tabledata'
      border
      :height="isHeight ? 320 : tableHeight"
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;" :row-key="getRowKey"
    >
      <el-table-column label="考勤信息" align="center">
        <el-table-column type="selection" header-align="center" align="center" width="50"  :reserve-selection="true"></el-table-column>
        <el-table-column prop="name" header-align="center" align="center" label="姓名" width="120"></el-table-column>
        <el-table-column
          prop="department"
          header-align="center"
          align="center"
          width="200px"
          label="部门名称"
        ></el-table-column>
        <el-table-column
          prop="jobnumber"
          width="200px"
          header-align="center"
          align="center"
          label="工号"
        ></el-table-column>
        <el-table-column
          prop="attendanceDays"
          header-align="center"
          align="center"
          width="110px"
          label="出勤天数"
        ></el-table-column>
        <el-table-column prop="restDays" header-align="center" align="center" label="休息天数"></el-table-column>
        <el-table-column
          prop="taskinfoName"
          header-align="center"
          align="center"
          width="110px"
          label="休假类别"
        >
          <!--  <template slot-scope="scope">
            <div style="color:#0590fc;cursor:pointer;" @click="taskDetail(scope.row.jobnumber)">
              查看休假类别
            </div>
          </template>-->
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right">
              <div>
                <span style="width: 120px;display: inline-block;">出勤天数:{{scope.row.attendanceDays}}</span>
                <span>休息天数: {{scope.row.restDays}}</span>
              </div>
              <div>
                <span style="width: 120px;display: inline-block;">工作时长: {{scope.row.workHours}}</span>
                <span>迟到次数: {{scope.row.lateness}}</span>
              </div>
              <div>
                <span style="width: 120px;display: inline-block;">迟到时长: {{scope.row.lateTime}}</span>
                <span>严重迟到次数: {{scope.row.seriousLate}}</span>
              </div>
              <div>
                <span style="width: 120px;display: inline-block;">严重迟到时长: {{scope.row.seriousTime}}</span>
                <span>旷工迟到天数: {{scope.row.absentLate}}</span>
              </div>
              <div>
                <span
                  style="width: 120px;display: inline-block;"
                >早退次数: {{scope.row.earlyRetirement}}</span>
                <span>早退时长: {{scope.row.earlyTimes}}</span>
              </div>
              <div>
                <span style="width: 120px;display: inline-block;">上班缺卡次数: {{scope.row.missCardOn}}</span>
                <span>下班缺卡次数: {{scope.row.missCardUnder}}</span>
              </div>
              <div>
                <span style="width: 120px;display: inline-block;">旷工天数: {{scope.row.absenteeism}}</span>
                <span>出差时长: {{scope.row.businessTravel}}</span>
              </div>
              <div>
                <span style="width: 120px;display: inline-block;">外出时长: {{scope.row.goOut}}</span>
                <span>请假: {{scope.row.leaves}}</span>
              </div>
              <div>
                <span
                  style="width: 120px;display: inline-block;"
                >加班审批统计: {{scope.row.overtimeCheck}}</span>
                <span>加班时长: {{scope.row.overtimeTime}}</span>
              </div>
              <div>
                <span
                  style="width: 120px;display: inline-block;"
                >考勤结果: {{scope.row.attendanceResults}}</span>
                <span>年休假: {{scope.row.annualLeave}}</span>
              </div>
              <div>
                <span
                  style="width: 120px;display: inline-block;"
                >企业奖励假: {{scope.row.businessIncentiveLeave}}</span>
                <span>事假: {{scope.row.personalLeave}}</span>
              </div>
              <div>
                <span style="width: 120px;display: inline-block;">病假: {{scope.row.sickLeave}}</span>
                <span>婚假: {{scope.row.marriageHoliday}}</span>
              </div>
              <div>
                <span style="width: 120px;display: inline-block;">丧假: {{scope.row.funeralLeave}}</span>
                <span>产假: {{scope.row.maternityLeave}}</span>
              </div>
              <div>
                <span style="width: 120px;display: inline-block;">陪产假: {{scope.row.paternityLeave}}</span>
                <span>哺乳假: {{scope.row.breastfeedingLeave}}</span>
              </div>
              <div>
                <span style="width: 120px;display: inline-block;">工伤假: {{scope.row.prenatalCheckUp}}</span>
                <span>
                  产检假:
                  {{scope.row.prenatalCheckUp}}
                </span>
              </div>
              <div>
                <span style="width: 120px;display: inline-block;">公假: {{scope.row.publicHoliday}}</span>
              </div>
              <a slot="reference" type="success" style="width:60px">查看详情</a>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="workHours"
          width="120px"
          header-align="center"
          align="center"
          label="工作时长"
        ></el-table-column>
        <el-table-column
          prop="lateness"
          width="120px"
          header-align="center"
          align="center"
          label="迟到次数"
        ></el-table-column>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="paginationShow"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <import-excel v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></import-excel>
  </div>
</template>
<script>
// import AddOrUpdate from "./task-add-or-update";
// import DetailBasetwo from "./task-detail";
// import DetailBase from "./task-detail-count";
import ImportExcel from "./work-attendance-import";
import DateTimePicker from "../../common/dateTime.vue";
import { configFun, deleteFn } from "../../../utils/utils.js";
export default {
  props: ["propHeight", "isHeight"],
  data() {
    return {
      paginationShow: true,
      tableHeight: window.innerHeight - 300,
      customerList: [], //客户
      dataForm: {
        staffno: "",
        staffname: "",
        department: ""
      },
      dataList: [],
      attendanceList:[],
      collectingBusiness:[],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      flag: false,
      time: "", // 存子组件中的time值
      taskname: "",
      customerName: "",
      taskStatu: "",
      addOrUpdateVisible: false, //新增弹窗
      detailVisible: false,
      detailVisibletwo: false,
      dataListSelections: [],
      // 时间选择器
      newdate: ""
      // 省市县
    };
  },
  components: {
    // AddOrUpdate,
    DateTimePicker,
    ImportExcel
    // DetailBase,
    // DetailBasetwo
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
      this.attendanceName()
  },
  methods: {
    attendanceName(){
      this.$http({
          url: this.$http.adornUrl(`/department/getlist`),
          method: "post",
          data: this.$http.adornParams()
        }).then(({ data }) => {
          if(data.code == 0){
            this.collectingBusiness = data.list
          }else {
            this.collectingBusiness = []
          }
        });
    },
    getRowKey(row){
      return row.id
    },
    taskDetail(jobnumber) {},
    // 计算
    addOrUpdateHandle(id) {
      if (this.time == "" || this.time == undefined) {
        this.$message.error("请选择月份")
        return;
      } else {
        this.$http({
          url: this.$http.adornUrl(`/file/handle`),
          method: "post",
          data: this.$http.adornParams({
            yearmonth: this.time ? this.time : ''
          })
        }).then(({ data }) => {});
      }
    },
    //   导入
    importExcel() {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(this.time);
      });
    },
    // 數組对象去重
    removeRepeatArrObj(arr) {
        let allArr = []
        for (var i = 0; i < arr.length; i++) {
          var flag = true;
          for (var j = 0; j < allArr.length; j++) {
            if (arr[i].id == allArr[j].id) {
              flag = false;
            };
          };
          if (flag) {
            allArr.push(arr[i]);
          };
        };
        return allArr
      },
    // 导出
    exportExcel() {
      if (this.time == "" || this.time == undefined) {
        this.$message.error("请选择月份")
        return;
      } else {
        this.$http({
          url: this.$http.adornUrl(`/file/export`),
          method: "post",
          headers: {
            "Content-Type": "application/json; application/octet-stream"
          },
          responseType: "blob",
          data: this.$http.adornParams({
            date: this.time ? this.time : "",
            staffno: this.dataForm.staffno,
            staffname: this.dataForm.staffname,
            department: this.dataForm.department,
             ids:this.removeRepeatArrObj(this.attendanceList)
          })
        }).then(({ data }) => {
          const content = data;
          const blob = new Blob([content], { type: "application/excel" }); // 构造一个blob对象来处理数据
          const fileName = "考勤表.xlsx"; // 导出文件名
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
      }
    },

    init(id) {
      // this.reset();
      this.time = "";
    },
    // 获取数据列表
    getDataList() {
      this.paginationShow = false;
      this.currentChangeHandle(1);
      this.$refs.tabledata.clearSelection()
      this.$nextTick(function() {
        this.paginationShow = true;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
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
        url: this.$http.adornUrl("/file/getsummaryList"),
        method: "post",
        data: this.$http.adornParams({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          object: {
            'date': this.time ? this.time : "",
            'staffno': this.dataForm.staffno,
            'staffname': this.dataForm.staffname,
            'department': this.dataForm.department
          }
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.list.list;
          this.totalPage = data.list.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
        this.flag = false;
      });
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
      if( this.dataListSelections != ''){
        this.dataListSelections.forEach(item=>{
          let obj = {}
          obj.id= item.id
          this.attendanceList.push(obj)
        })
      }
    },
    // 详情
    detailHandle(id) {
      this.detailVisibletwo = true;
      this.$nextTick(() => {
        this.$refs.detailtwo.init(id);
      });
    },

    // 重置
    reset(formName) {
      this.dataForm =({
         staffno: "",
        staffname: "",
        department: ""
      });
      this.time = "";
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
      this.time = data.startTime;
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

/* .el-input,
      .el-select,
      .el-autocomplete {
        width: 70%;
        float: right;
        margin-right: 5%;
        } */

.el-row {
  margin-bottom: 0;
  height: 42px;
}

/* .el-form{
        border-bottom: 2px solid #f5f5f5;
        } */
.el-table thead.is-group th {
  background: #fff;
}
</style>