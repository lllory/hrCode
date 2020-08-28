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
              <el-select v-model="dataForm.department" placeholder="请选择" >
                <el-option v-for="item in fiveriskList" :key="item.label" :label="item.value" :value="item.label">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="18" style>
          <el-button style="float:right;margin-left: 8px;" @click="reset('searchForm')">重置</el-button>
          <el-button style="float:right" v-if="!flag" v-on:click="getDataList()" type="primary">查询</el-button>
          <el-button style="float:right" v-else disabled>查询</el-button>
        </el-col>
         <!-- <el-col :span="6">
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
        
        <el-col :span="6">
          <el-form-item style="margin-right:-2px;">月份：</el-form-item>
          <el-form-item>
            <date-time-picker
              style="margin-left: -29px;"
              v-model="time"
              @sendDateTime="getDateTime"
            ></date-time-picker>
          </el-form-item>
        </el-col> -->
       
        
      </el-row>
      <!-- <el-row :span="24">
           
        <el-col :span="24" style>
          <el-button style="float:right;margin-left: 8px;" @click="reset('searchForm')">重置</el-button>
          <el-button style="float:right" v-if="!flag" v-on:click="getDataList()" type="primary">查询</el-button>
          <el-button style="float:right" v-else disabled>查询</el-button>
        </el-col>
      </el-row> -->
     
    </el-form>
    <div class="operatBtn">
      <!-- <el-button type="primary" @click="addOrUpdateHandle()">计算</el-button>
      <el-button type="primary" @click="importExcel" ref="suspendRef">导入</el-button> -->
      <el-button type="primary" @click="exportExcel">导出</el-button>
    </div>
     <!-- <dynamic-table style="width: 100%" :tabledata="dataList" :table-header="headerData[dataForm.department]"  ></dynamic-table> -->
     <dynamic-table
      style="width: 100%"
      ref="tableRef"
      :tabledata="dataList"
      :table-header="headerData[dataForm.department]"
      :PaginationList="tablePaginationList"
      :currentChangeHandleFun = 'currentChangeHandle'
      :sizeChangeHandleFun = 'sizeChangeHandle'
      :tableHeight = 'tableHeight'
    ></dynamic-table>
    <!-- 弹窗, 新增 / 修改 -->
    <import-excel v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></import-excel>
  </div>
</template>
<script>

//  import DateTimePicker from "../../common/dateTimePicker.vue";
import DateTimePicker from "../../common/dateTime.vue";
import { configFun, deleteFn } from "../../../utils/utils.js";
import DynamicTable from '../../common/tabel'
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
        department: "company"
      },
      tablePaginationList: {
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        paginationShow: true
      },
      collectingBusiness:[],
      dataList: [],
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
      attendanceList:[],
      fiveriskList:[
          {label:'company',value:'项目汇总'},
           {label:'person',value:'个人展示'}
      ],
      headerData:{
          'company':[
                { id:100,prop:'staffno',label:'部门' },
                { id:101,prop:'morningclock',label:'成本中心代码'},
                { id:102,prop:'attendancedate',label:'项目代码'},
                {id:103, prop:'department',label:'求和项:项目工时'},
                {id:104, prop:'afternoonclock',label:'求和项:养老'},
                {id:105,prop:'result',label:'求和项:失业' },
                {id:105,prop:'result',label:'求和项:工伤'},
                {id:105,prop:'result',label:'求和项:医疗'},
                {id:105,prop:'result',label:'求和项:大病'},
                {id:105,prop:'result',label:'求和项:生育'},
                {id:105,prop:'result',label:'求和项:住房'}
           ],
           'person':[
                { id:100,prop:'staffno',label:'员工姓名' },
                { id:101,prop:'morningclock',label:'员工编号'},
                 { id:100,prop:'staffno',label:'部门' },
                 { id:101,prop:'morningclock',label:'成本中心代码'},
                { id:102,prop:'attendancedate',label:'月工时'},
                {id:103, prop:'department',label:'项目工时'},
                 {id:103, prop:'department',label:'纳税地'},
                {id:104, prop:'afternoonclock',label:'养老'},
                {id:105,prop:'result',label:'失业' },
                {id:105,prop:'result',label:'工伤'},
                {id:105,prop:'result',label:'医疗'},
                {id:105,prop:'result',label:'大病'},
                {id:105,prop:'result',label:'生育'},
                {id:105,prop:'result',label:'住房'}
           ]
          


      }
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
    // getRowKey(row){
    //   return row.id
    // },
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
      this.tablePaginationList.paginationShow = false;
      //   this.$refs.tabelData.clearSelection()
      this.currentChangeHandle(1);
      this.$nextTick(function() {
        this.tablePaginationList.paginationShow = true;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      // this.pageSize = val;
      // this.pageIndex = 1;
      this.tablePaginationList.pageSize = val
      this.tablePaginationList.pageIndex = 1
      this.getDataList();
    },
    // 当前页
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
        url: this.$http.adornUrl("/file/getAttendanceInfo"),
        method: "post",
        data: this.$http.adornParams({
          pageIndex: this.tablePaginationList.pageIndex,
          pageSize: this.tablePaginationList.pageSize,
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
          // this.dataList = data.list.list;
           this.dataList = [];
           this.tablePaginationList.totalPage = 0;
          // this.totalPage = data.list.totalCount;
          // this.tablePaginationList.totalPage = data.list.totalCount;
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