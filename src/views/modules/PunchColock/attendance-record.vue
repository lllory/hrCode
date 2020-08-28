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
                <el-option v-for="item in collectingBusiness" :key="item.id" :label="item.depName" :value="item.id">
                </el-option>
              </el-select>
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
              style=""
              placeholder="工号"
              clearable
            ></el-input>
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
        </el-col> -->
        <el-col :span="6">
          <el-form-item style="margin-right:-2px;">考勤日期：</el-form-item>
          <el-form-item>
            <date-time-picker v-model="time" @sendDateTime="getDateTime" ></date-time-picker>
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
     
    </el-form>
    <div class="operatBtn" style="float:right">
      <!-- <el-button type="primary" @click="addOrUpdateHandle()">计算</el-button>
      <el-button type="primary" @click="importExcel" ref="suspendRef">导入</el-button> -->
      <el-button type="primary" @click="exportExcel">导出</el-button>
    </div>
    <el-table
      id="taskTable"
      ref='tabelData'
      :data="dataList"
      border
      :height="isHeight ? 320 : tableHeight"
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;" :row-key="getRowKey"
    >
      <!-- <el-table-column label="考勤信息" align="center"> -->
        <el-table-column type="selection" header-align="center" align="center" width="50"  :reserve-selection="true"></el-table-column>
        <el-table-column prop="staffname" header-align="center" align="center" label="姓名" width="120"></el-table-column>
          <el-table-column
          prop="staffno"
          width="200px"
          header-align="center"
          align="center"
          label="工号"
        ></el-table-column>
        <el-table-column
          prop="department"
          header-align="center"
          align="center"
          width="350px"
          label="部门名称"
        ></el-table-column>
      
        <el-table-column
          prop="attendancedate"
          header-align="center"
          align="center"
          width=""
          label="考勤日期"
        ></el-table-column>
        <el-table-column prop="restDays" header-align="center" align="center" label="休息天数" width="110px"></el-table-column>
        <el-table-column
          prop="morningclock"
          width=""
          header-align="center"
          align="center"
          label="上班时间"
        ></el-table-column>
        <el-table-column
          prop="afternoonclock"
          width=""
          header-align="center"
          align="center"
          label="下班时间"
        ></el-table-column>
        <el-table-column
          prop="result"
          width=""
          header-align="center"
          align="center"
          label="考勤结果"
        ></el-table-column>
      <!-- </el-table-column> -->
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

 import DateTimePicker from "../../common/dateTimePicker.vue";
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
      collectingBusiness:[],
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      flag: false,
      time: "", // 存子组件中的time值
      startdate:"",
      enddate:"",
      taskname: "",
      customerName: "",
      taskStatu: "",
      addOrUpdateVisible: false, //新增弹窗
      detailVisible: false,
      detailVisibletwo: false,
      dataListSelections: [],
      // 时间选择器
      newdate: "",
      attendanceList:[]
      // 省市县
    };
  },
  components: {
    DateTimePicker,
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
      this.attendanceName() //部门名称
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
        this.$http({
          url: this.$http.adornUrl(`/file/exportAttendanceInfo`),
          method: "post",
          headers: {
            "Content-Type": "application/json; application/octet-stream"
          },
          responseType: "blob",
          data: this.$http.adornParams({
            startdate:this.startdate ? this.startdate.split(" ")[0] : "" ,
            enddate:this.enddate ? this.enddate.split(' ')[0] : '',
            staffno: this.dataForm.staffno,
            staffname: this.dataForm.staffname,
            department: this.dataForm.department,
            ids:this.removeRepeatArrObj(this.attendanceList)
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
      this.paginationShow = false;
      this.$refs.tabelData.clearSelection()
      this.currentChangeHandle(1);
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
        url: this.$http.adornUrl("/file/getAttendanceInfo"),
        method: "post",
        data: this.$http.adornParams({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          object: {
            startdate:this.startdate ? this.startdate.split(" ")[0] : "" ,
            enddate:this.enddate ? this.enddate.split(' ')[0] : '',
            staffno: this.dataForm.staffno,
            staffname: this.dataForm.staffname,
            department: this.dataForm.department
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
      this.dataForm = ({
        staffno: "",
        staffname: "",
        department: ""
      });
      this.time = "";
      this.startdate = ''
      this.enddate = ''
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
      this.startdate = data.startTime
      this.enddate = data.endTime
        this.time = data.time;
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