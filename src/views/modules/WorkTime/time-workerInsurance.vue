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
        <el-col :span="6" v-if="searchKey == 'ordinary'">
          <el-form-item>业务小类编码：</el-form-item>
          <el-form-item prop="item3Code" style="margin-left: 100px;width:90%">
            <el-input v-model="dataForm.item3Code" placeholder="业务小类编码" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" v-if="searchKey == 'ordinary'">
          <el-form-item>项目代码：</el-form-item>
          <el-form-item prop="apProjectSegCode" style="margin-left:90px">
            <el-input v-model="dataForm.apProjectSegCode" style placeholder="项目的代码" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="searchKey == 'ordinary'">
          <el-form-item style="margin-right:-2px;">月份：</el-form-item>
          <el-form-item>
            <date-time-picker
              style="margin-left: -29px;"
              v-model="dataForm.date"
              :showTime="showTime"
              @sendDateTime="getDateTime"
            ></date-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="searchKey == 'ordinary'">
          <el-form-item>城市：</el-form-item>
          <el-form-item prop="city" style="margin-left:90px">
            <el-input v-model="dataForm.city" style placeholder="城市" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="searchKey == 'bj_branchOffice_QT'">
          <el-form-item>显示列表：</el-form-item>
          <el-form-item prop="searchKey">
            <el-select v-model="searchKey" placeholder="请选择" @change="changeSearch">
              <el-option
                v-for="item in ordinaryList"
                :key="item.label"
                :label="item.value"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="searchKey == 'bj_branchOffice_QT'">
          <el-form-item>业务大类：</el-form-item>
          <el-form-item prop="businessLargeclass" style="margin-left: 100px;width:90%">
            <el-input v-model="dataForm.businessLargeclass" placeholder="业务大类" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" v-if="searchKey == 'bj_branchOffice_QT'">
          <el-form-item>业务小类：</el-form-item>
          <el-form-item prop="businessSubclass" style="margin-left:90px">
            <el-input v-model="dataForm.businessSubclass" style placeholder="业务小类" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" v-if="searchKey == 'bj_branchOffice_QT'">
          <el-form-item>业务小类编码：</el-form-item>
          <el-form-item prop="businessSubclassCode" style="margin-left:90px">
            <el-input v-model="dataForm.businessSubclassCode" style placeholder="业务小类编码" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="6" v-if="searchKey == 'ordinary'">
          <el-form-item>显示列表：</el-form-item>
          <el-form-item prop="searchKey">
            <el-select v-model="searchKey" placeholder="请选择" @change="changeSearch">
              <el-option
                v-for="item in ordinaryList"
                :key="item.label"
                :label="item.value"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="18" v-if="searchKey == 'ordinary'">
          <el-button style="float:right;margin-left: 8px;" @click="reset('searchForm')">重置</el-button>
          <el-button style="float:right" v-if="!flag" v-on:click="getDataList()" type="primary">查询</el-button>
          <el-button style="float:right" v-else disabled>查询</el-button>
        </el-col>
        <el-col :span="24" v-else>
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
      <el-button type="primary" @click="exportExcel">导出</el-button>
    </div>
    <!-- <dynamic-table style="width: 100%" :tabledata="dataList" :table-header="headerData"  ></dynamic-table> -->
    <dynamic-table
      style="width: 100%"
      ref="tableRef"
      :tabledata="dataList"
      :table-header="headerData[searchKey]"
      :PaginationList="tablePaginationList"
      :currentChangeHandleFun="currentChangeHandle"
      :sizeChangeHandleFun="sizeChangeHandle"
      :tableHeight="tableHeight"
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
      tableHeight: window.innerHeight - 300,
      dataForm: {
        city: "",
        date: "",
        apProjectSegCode: "",
        item3Code: ""
        // businessLargeclass: "",
        // businessSubclass: "",
        // businessSubclassCode: ""
      },
      dataForm_QT: {
        businessLargeclass: "",
        businessSubclass: "",
        businessSubclassCode: ""
      },
      searchKey: "ordinary",
      ordinaryList: [
        { label: "ordinary", value: "普通类计件单" },
        { label: "bj_branchOffice_QT", value: "全通北京分公司" }
      ],
      flag: false,
      showTime: true,
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
      dataListLoading: false,
      flag: false,
      attendanceList: [],
      headerData: {
        ordinary: [
          {
            id: 1,
            prop: "fieldcode",
            label: "序号(必填)",
            width: 150
          },
          {
            id: 2,
            prop: "item3code",
            label: "业务小类编码(必填)",
            width: 250
          },
            {
            id: 11,
            prop: "attendancedate",
            label: "成本中心",
            width: 120
          },
           {
            id: 12,
            prop: "withholdingcontrno",
            label: "合同编号",
            width: 120
          },
          {
            id: 13,
            prop: "vendorclientname",
            label: "供应商名称(必填)",
            width: 250
          },
          {
            id: 3,
            prop: "vendorclientno",
            label: "供应商编号(必填)",
            width: 150
          },
          {
            id: 4,
            prop: "vendorclientsitecode",
            label: "供应商地点(必填)",
            width: 150
          },
          {
            id: 5,
            prop: "budgetdeptsegcode",
            label: "预算责任部门code",
            width: 200
          },
          {
            id: 6,
            prop: "budgetprjcode",
            label: "预算项目编号",
            width: 200
          },
          {
            id: 7,
            prop: "dimensionid",
            label: "费用维度属性(必填)",
            width: 200
          },
          {
            id: 8,
            prop: "applyamount",
            label: "本月计提(必填)",
            width: 120
          },
          {
            id: 9,
            prop: "approjectsegcode",
            label: "项目段code",
            width: 150
          },
          {
            id: 10,
            prop: "claimlinedesc",
            label: "摘要(必填)",
            width: 150
          },
        
         
          
        ],
        bj_branchOffice_QT: [
          {
            id: 14,
            prop: "businessLargeclass",
            label: "业务大类(以报账平台系统为准)",
            width: 250
          },
          {
            id: 15,
            prop: "businessSubclass",
            label: "业务小类(以报账平台系统为准)",
            width: 250
          },
          {
            id: 16,
            prop: "businessSubclassCode",
            label: "业务小类编码(以报账平台系统为准)",
            width: 300
          },
          {
            id: 17,
            prop: "costCenter",
            label: "成本中心(以报账平台系统为准)",
            width: 300
          },
          {
            id: 18,
            prop: "costLatitudeAttribute",
            label: "费用维度属性",
            width: 200
          },
          {
            id: 19,
            prop: "typeOfVatDeductionVoucher",
            label: "增值税扣税凭证类型",
            width: 200
          },
          {
            id: 20,
            prop: "taxRate",
            label: "税率",
            width: 120
          }
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
    this.getTime();
    this.getDataList();

    this.attendanceName(); //部门名称
  },
  methods: {
    changeSearch() {
      this.getDataList();
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
            url: this.$http.adornUrl(`/accrual/importaccrual/`),
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
      if(typeof(this.dataForm.city)  == 'undefined' || this.dataForm.city == ''){
        this.$message.error('请输入城市')
        return
      }
      this.$http({
        url: this.$http.adornUrl(`/accrual/export`),
        method: "post",
        headers: {
          "Content-Type": "application/json; application/octet-stream"
        },
        responseType: "blob",
        data: this.$http.adornParams(this.dataForm)
      }).then(({ data }) => {
          const content = data;
          const blob = new Blob([content], { type: "application/excel" }); // 构造一个blob对象来处理数据
          const fileName = "职工保险表.xlsx"; // 导出文件名
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
      this.tablePaginationList.pageSize = val;
      this.tablePaginationList.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      // this.pageIndex = val;
      this.tablePaginationList.pageIndex = val;
      let sendList = {};
      let url = "";
      if (this.searchKey == "ordinary") {
        sendList = this.dataForm;
        url = "/accrual/getlist";
      } else if (this.searchKey == "bj_branchOffice_QT") {
        sendList = this.dataForm_QT;
        url = "/accrual/getbusinesslist";
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
        data: this.$http.adornParams({
          pageIndex: this.tablePaginationList.pageIndex,
          pageSize: this.tablePaginationList.pageSize,
          object: sendList
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

    // 重置
    reset(formName) {
      this.dataForm = {
        city: "",
        date: "",
        apProjectSegCode: "",
        item3Code: ""
      };
      this.showTime = true;
      this.getTime();
    },
    getTime: function() {
      let time = new Date(new Date().getTime());
      this.startTime =
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1 >= 10
          ? time.getMonth() + 1
          : "0" + (time.getMonth() + 1)) +
        "-" +
        (time.getDate() >= 10 ? time.getDate() : "0" + time.getDate()) +
        " " +
        time.getHours() +
        ":" +
        time.getMinutes() +
        ":" +
        time.getSeconds();
      this.dataForm.date = this.startTime.split(" ")[0].slice(0, 7);
    },

    // 获取子组件中的时间
    getDateTime(data) {
      // this.time = data.startTime;
      this.dataForm.date = data.startTime;
      this.showTime = false;
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