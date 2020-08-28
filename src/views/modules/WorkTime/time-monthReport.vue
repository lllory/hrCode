<template>
  <div class="mod-config" >
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
          <el-form-item>显示列表：</el-form-item>
          <el-form-item prop="searchKey">
            <el-select v-model="searchKey" placeholder="请选择" @change='changeSearch'>
              <el-option
                v-for="item in searchList"
                :key="item.label"
                :label="item.value"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>查询地：</el-form-item>
          <el-form-item prop="staffno">
            <el-input
              v-model="dataForm.city"
              style=""
              placeholder="查询地"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item style="margin-right:-2px;">月份：</el-form-item>
          <el-form-item>
            <date-time-picker
              style="margin-left: -29px;"
              v-model="dataForm.date"
              :showTime='showTime'
              @sendDateTime="getDateTime"
            ></date-time-picker>
          </el-form-item>
        </el-col>
         <el-col :span="6" style>
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
     <dynamic-table width='100%' v-if="searchKey == 'fiveInsurance'"   :tabledata="dataList" :table-header="headerData[searchKey]"  :spanRow='true' :tabWinHeight='tabWinHeight'></dynamic-table>
    <dynamic-table-last
    v-if="searchKey == 'accumulation'"
        style="width: 100%"
        ref="tableRef"
        :tabledata="dataListCopy"
        :table-header="headerData[searchKey]"
        :PaginationList="tablePaginationList"
        :currentChangeHandleFun = 'currentChangeHandle'
        :sizeChangeHandleFun = 'sizeChangeHandle'
        :tableHeight = 'tableHeight'
      ></dynamic-table-last>
  </div>
</template>
<script>

//  import DateTimePicker from "../../common/dateTimePicker.vue";
import DateTimePicker from "../../common/dateTime.vue";
import { configFun, deleteFn } from "../../../utils/utils.js";
import DynamicTable from '../../common/tabelModle1'
import DynamicTableLast from '../../common/tabel'
export default {
  props: ["propHeight", "isHeight"],
  data() {
    return {
      paginationShow: true,
      tabWinHeight:window.innerHeight - 300,
      tableHeight: window.innerHeight - 300,
      customerList: [], //客户
      dataForm: {
       city:"北京",
       date:""
      },
      searchKey:"fiveInsurance",
      searchList:[
        {label:"accumulation",value:"公积金列表"},
        {label:"fiveInsurance",value:"五险"}
      ],
      showTime:true,
      collectingBusiness:[],
      dataList: {},
      dataListCopy :[],
      tablePaginationList: {
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        paginationShow: true
      },
      dataListLoading: false,
      flag: false,
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
      headerData:{
        'fiveInsurance':[{
              id:101,
              prop:'morningclock',
              label:'项目',
              width:120
          },
          {
              id:101,
              prop:'morningclock',
              label:'栏号',
              width:120
          },
          {
              id:102,
              prop:'attendancedate',
              label:'养老',
               width:120
          },
          {
              id:103,
              prop:'department',
              label:'失业',
               width:400
          },
          {
              id:104,
              prop:'afternoonclock',
              label:'工伤',
               width:120
          },
          {
              id:105,
              prop:'result',
              label:'生育',
               width:120
          },
          {
              id:105,
              prop:'result',
              label:'基本医疗',
               width:120
          },
          {
              id:105,
              prop:'result',
              label:'大额医疗',
               width:120
          },
          {
              id:105,
              prop:'result',
              label:'合计',
               width:120
          }],
          'accumulation':[
            {
              id:105,
              prop:'department',
              label:'部门',
          },
          {
              id:105,
              prop:'housingfundcom',
              label:'公司缴费',
          },
          {
              id:105,
              prop:'housingfundper',
              label:'个人缴费',
          }
          ]

        
      }
     
    };
  },
  components: {
    DateTimePicker,
    DynamicTable,
    DynamicTableLast
  },
  activated() {
    // this.getDataList();
  },
  mounted() {
    // 网点名称
    // this.networkPonintType();
    this.getDataList();
    this.getTime();
    this.attendanceName() //显示列表
  },
  methods: {
    changeSearch(){
      this.getDataList()
    },
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
          url: this.$http.adornUrl(`/FiveRisksMonthlyRepor/export`),
          method: "post",
          headers: {
            "Content-Type": "application/json; application/octet-stream"
          },
          responseType: "blob",
          data: ({
            collectDate:this.dataForm.date,
            city:this.dataForm.city
          })
        }).then(({ data }) => {
          const content = data;
          const blob = new Blob([content], { type: "application/excel" }); // 构造一个blob对象来处理数据
          const fileName = "五险一金表.xlsx"; // 导出文件名
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
     let url = ''
     let dataFormList = {}
     if(this.searchKey == 'fiveInsurance'){
       url = '/FiveRisksMonthlyRepor/selectfive'
       dataFormList = this.dataForm
     }else if(this.searchKey == 'accumulation'){
       url = '/FiveRisksMonthlyRepor/gethousingfunddetail'
       dataFormList = {
           pageIndex: this.tablePaginationList.pageIndex,
          pageSize: this.tablePaginationList.pageSize,
          object:{
            collectDate:this.dataForm.date,
            city:this.dataForm.city
          }
       }

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
        url: this.$http.adornUrl(url),
        method: "post",
        data: dataFormList
      }).then(({ data }) => {
        if (data && data.code === 0) {
          if(this.searchKey == 'fiveInsurance'){
          this.dataList =Object.assign(data.FiveRisksFundMonthlyReport, data.FiveRisksRate , data.PayPersonNum) ;
          }else if(this.searchKey == 'accumulation'){
            this.dataListCopy = data.list.list
             this.tablePaginationList.totalPage = data.list.totalCount;
          }
        } else {
          this.$message.error(data.msg)
           if(this.searchKey == 'fiveInsurance'){
            this.dataList = {};
          }else if(this.searchKey == 'accumulation'){
            this.dataListCopy =[]
            this.tablePaginationList.totalPage = 0;
          }
          
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
       city:"",
       date:""
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
        this.dataForm.date = this.startTime.split(' ')[0].slice(0,7)
    },

    // 获取子组件中的时间
    getDateTime(data) {
      // this.time = data.startTime;
      this.dataForm.date = data.startTime
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