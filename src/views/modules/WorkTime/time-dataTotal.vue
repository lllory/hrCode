<!-- 数据汇总 -->
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
          <el-form-item prop="staffName">
            <el-input v-model="dataForm.staffName" placeholder="员工姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>工号：</el-form-item>
          <el-form-item prop="staffNo">
            <el-input
              v-model="dataForm.staffNo"
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
              v-model="dataForm.collectDate"
              :showTime='showTime'
              @sendDateTime="getDateTime"
            ></date-time-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span='24'>
           <el-col :span="6">
          <el-form-item>城市：</el-form-item>
          <el-form-item prop="insuredLand">
            <el-input
              v-model="dataForm.insuredLand"
              style=""
              placeholder="城市"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
            <el-col :span="18" style='float:right'>
          <el-button style="float:right;margin-left: 8px;" @click="reset('searchForm')">重置</el-button>
          <el-button style="float:right" v-if="!flag" v-on:click="getDataList()" type="primary">查询</el-button>
          <el-button style="float:right" v-else disabled>查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="operatBtn" >
      <!-- <el-button type="primary" @click="addOrUpdateHandle()">计算</el-button>
      <el-button type="primary" @click="importExcel" ref="suspendRef">导入</el-button> -->
      <el-button type="primary" @click="exportExcel">导出</el-button>
    </div>
     <!-- <dynamic-table style="width: 100%" :tabledata="dataList" :table-header="headerData"  ></dynamic-table> -->
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
import DynamicTable from '../../common/tabel'
export default {
  props: ["propHeight", "isHeight"],
  data() {
    return {
      paginationShow: true,
      tableHeight: window.innerHeight - 300,
      dataForm: {
       staffName : "",
        staffNo: "",
        department: "",
        insuredLand:"",
        collectDate:""
      },
      showTime:true,
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
      dataListSelections: [],
      // 时间选择器
      newdate: "",
      attendanceList:[],
      headerData:[
         
          {
              id:101,
              prop:'staffName',
              label:'员工姓名',
              width:120,
          },
          {
              id:102,
              prop:'staffNo',
              label:'员工编号',
              width:120,
          },
           {
              id:102,
              prop:'ascriptionDate',
              label:'归属时间',
              width:120,
          },
          {
              id:103,
              prop:'insuredLand',
              label:'参保地'

          },
          {
              id:104,
              prop:'department',
              label:'部门',
              width:150,
          },
          {
              id:105,
              prop:'core',
              label:'中心',
              width:120,
          },
          {
              id:106,
              prop:'endowmentInsuranceBase',
              label:'养老缴费基数',
              width:180,

          },
          {
              id:107,
              prop:'endowmentInsuranceCom',
              label:'养老单位',
               width:120,
          },
          {
              id:108,
              prop:'endowmentInsurancePer',
              label:'养老个人',
               width:120,
          },
          {
              id:109,
              prop:'endowmentInsuranceCollect',
              label:'养老合计',
               width:120,
          },
          {
              id:110,
              prop:'unemploymentInsuranceBase',
              label:'失业缴费基数',
               width:180,
          },
          {
              id:111,
              prop:'unemploymentInsuranceCom',
              label:'失业单位',
               width:120,
          },
          {
              id:112,
              prop:'unemploymentInsurancePer',
              label:'失业个人',
               width:120,
          },
          {
              id:113,
              prop:'unemploymentInsuranceCollect',
              label:'失业合计',
               width:120,
          },
          {
              id:114,
              prop:'industrialInsuranceBase',
              label:'工伤缴费基数',
               width:180,
          },
          {
              id:115,
              prop:'industrialInsurance',
              label:'工伤'
          },
          {
              id:116,
              prop:'maternityInsuranceBase',
              label:'生育缴费基数',
               width:180,
          },
          {
              id:117,
              prop:'maternityInsurance',
              label:'生育',

          },
          {
              id:118,
              prop:'medicalInsuranceBase',
              label:'医疗缴费基数',
              width:180,
          },
          {
              id:119,
              prop:'medicalInsuranceCom',
              label:'医疗单位',
              width:120,
          },
          {
              id:120,
              prop:'medicalInsurancePer',
              label:'医疗个人',
              width:120,
          },
          {
              id:121,
              prop:'medicalInsuranceCollect',
              label:'医疗合计',
              width:120,
          },
          {
              id:122,
              prop:'sicknessInsuranceBase',
              label:'大病缴费基数',
              width:180,
          },
          {
              id:123,
              prop:'sicknessInsuranceCom',
              label:'大病单位',
              width:120,
          },
           {
              id:124,
              prop:'sicknessInsurancePer',
              label:'大病个人',
              width:120,
          },
          {
              id:125,
              prop:'housingFundBase',
              label:'住房缴费基数',
              width:180,
          },
          {
              id:126,
              prop:'housingFundCom',
              label:'住房单位',
              width:120,
          },
          {
              id:127,
              prop:'housingFundPer',
              label:'住房个人',
              width:120,
          },
           {
              id:128,
              prop:'housingFundCollect',
              label:'住房合计',
              width:120,
          },
          {
              id:129,
              prop:'companyCollect',
              label:'单位合计',
              width:120,
          },
          {
              id:131,
              prop:'personalCollect',
              label:'个人合计',
              width:120,
          },
          {
              id:132,
              prop:'collect',
              label:'合计',
              width:120,
          },
           {
              id:132,
              prop:'collectDate',
              label:'查询日期',
              width:120,
          },
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
      if(this.dataForm.collectDate == '' || typeof(this.dataForm.collectDate) == 'undefined'){
        this.$message.error('请选择日期')
        return
      }
      if(this.dataForm.insuredLand == '' || typeof(this.dataForm.insuredLand) == 'undefined'){
        this.$message.error('请输入城市')
        return
      }
        this.$http({
          url: this.$http.adornUrl(`/datacollect/exportDataCollect`),
          method: "post",
          headers: {
            "Content-Type": "application/json; application/octet-stream"
          },
          responseType: "blob",
          data: this.$http.adornParams(this.dataForm)
        }).then(({ data }) => {
          const content = data;
          const blob = new Blob([content], { type: "application/excel" }); // 构造一个blob对象来处理数据
          const fileName = "数据汇总表.xlsx"; // 导出文件名
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
        url: this.$http.adornUrl("/datacollect/getdatacollectlist"),
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
    // 重置
    reset(formName) {
      this.dataForm = ({
       staffName : "",
        staffNo: "",
        department: "",
        insuredLand:"",
        collectDate:""
      });
      this.showTime = true
      this.getTime()
    },
   getTime: function() {
      let time = new Date(new Date().getTime());
             this.startTime =
            time.getFullYear() + "-" + ((time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : "0" + (time
              .getMonth() + 1)) 
            + "-" + (time.getDate() >= 10 ? time.getDate() : "0" + time.getDate()) + " " +
            time.getHours() +
            ":" +
            time.getMinutes() +
            ":" +
            time.getSeconds()
       this.dataForm.collectDate  = this.startTime.split(' ')[0].slice(0,7)
    },

    // 获取子组件中的时间
    getDateTime(data) {
      // this.time = data.startTime;
      this.dataForm.collectDate = data.startTime
      this.showTime = false
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