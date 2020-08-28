<template>
  <div class="mod-config">
    <el-form id="specialForm" :inline="true" :model="dataForm" ref="searchForm" @keyup.enter.native="getDataList()">
      <el-row :span="24">
        <el-col :span="24">
          <el-form-item>城市：</el-form-item>
          <el-form-item prop="city">
            <el-input v-model="dataForm.city" placeholder="城市" clearable></el-input>
          </el-form-item>
          <el-form-item style="float: right;">
              <el-button style="margin-left: 8px;" v-if="!flag" v-on:click="getDataList()" type="primary">查询</el-button>
              <el-button style="margin-left: 8px;" v-else disabled>查询</el-button>
              <el-button @click="reset('searchForm')">重置</el-button>
            </el-form-item>
        </el-col>
        <!-- <el-col :span="18">
          <el-form-item>发布时间：</el-form-item>
          <el-form-item>
            <date-time-picker @sendDateTime="getDateTime" v-model="time"></date-time-picker>
          </el-form-item>

        
        </el-col> -->
      </el-row>
    </el-form>
    <div class="operatBtn">
      <!-- <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button> -->
      <div id='import_class'>
           <input
      type="file"
      @change="importf(this)"
      v-if="clearFile"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, xlsx"
      id="fileCss"
    />
    <el-button type="primary" >导入</el-button>
      </div>
      
      <!-- <el-button type="primary" @click="exportExcel()">导出</el-button> -->
    </div>
     <!-- <dynamic-table ref='tableRef' style="width: 100%" :tabledata="dataList" :table-header="headerData" :refString='refString' ></dynamic-table> -->
    <dynamic-table
      style="width: 100%"
      ref="tableRef"
      :tabledata="dataList"
      :table-header="headerData"
      :PaginationList="tablePaginationList"
      :currentChangeHandleFun = 'currentChangeHandle'
      :sizeChangeHandleFun = 'sizeChangeHandle'
      :tableHeight = 'tableHeight'
      :refString='refString'
    ></dynamic-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <detail-base v-if="detailVisible" ref="detail" @refreshDataList="getDataList">></detail-base>
  </div>
</template>

// <script>
//   import AddOrUpdate from './timeupdate/time-wages-update'
//   import DetailBase from './client-detail'
  import DateTimePicker from '../../common/dateTimePicker.vue'
  import DynamicTable from '../../common/tabel'
  import {
    configFun,
    deleteFn
  } from '../../../utils/utils.js'

  export default {
    data() {
      return {
        dataForm: {
          city: ''
        },
        tableHeight: window.innerHeight - 300,
        tablePaginationList: {
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        paginationShow: true
      },
        refString:"fivePayment",
        dataList: [],
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        detailVisible: false,
        flag: false,
         formData: new FormData(),
         clearFile: true,
        headerData:[
           {
              id:99,
              prop:'city',
              label:'城市',
              },
             {
              id:100,
              label:'养老保险',
              children:[
                  {
                    prop:'endowmentInsuranceCom',
                    label:'单位',
                  },
                  {
                    prop:'endowmentInsurancePer',
                    label:'个人',
                  },
              ]
          },
          {
              id:101,
              prop:'morningclock',
              label:'失业保险',
              children:[
                  {
                    prop:'unemploymentInsuranceCom',
                    label:'单位',
                  },
                  {
                    prop:'unemploymentInsurancePer',
                    label:'个人',
                  },
              ]
          },
          {
              id:107,
              prop:'result',
              label:'工伤保险',
              children:[
                  {
                    prop:'industrialInsurance',
                    label:'单位',
                  },
              ]
          },
          {
              id:107,
              prop:'result',
              label:'医疗保险',
              children:[
                  {
                    prop:'medicalInsuranceCom',
                    label:'单位',
                  },
                  {
                    prop:'medicalInsurancePer',
                    label:'个人',
                  },
              ]
          },
          {
              id:103,
              prop:'department',
              label:'大病',
              children:[
                  {
                    prop:'sicknessInsuranceCom',
                    label:'单位',
                  },
                  {
                    prop:'sicknessInsurancePer',
                    label:'个人',
                  },
              ]
          },
          {
            id:104,
            prop:'afternoonclock',
            label:'生育保险',
            children:[
                  {
                    prop:'maternityInsurance',
                    label:'单位',
                  }
              ]
          },
           {
              id:103,
              prop:'department',
              label:'住房公积金',
              children:[
                  {
                    prop:'housingFundCom',
                    label:'单位',
                  },
                  {
                    prop:'housingFundPer',
                    label:'个人',
                  },
              ]
          },
          {
              id:105,
              width:200,
              prop:'remark',
              label:'备注',
              },
        ]
      }
    },
    components: {
    //   AddOrUpdate,
    //   DetailBase,
         DynamicTable,
      DateTimePicker,
    },
    activated() {
      this.getDataList()
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
            url: this.$http.adornUrl(`/worktime/uploadPaymentProportion/`),
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
                  message: "操作成功，"+data.success,
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
      //   this.$refs.tabelData.clearSelection()
      this.currentChangeHandle(1);
      this.$nextTick(function() {
        this.tablePaginationList.paginationShow = true;
      });
       
      },
      // 每页数
      sizeChangeHandle(val) {
        // this.pageSize = val
        // this.pageIndex = 1
        this.tablePaginationList.pageSize = val
        this.tablePaginationList.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        // this.pageIndex = val
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
        this.dataListLoading = true
        this.flag = true
        this.$http({
          url: this.$http.adornUrl('/worktime/getPaymentProportion'),
          method: 'post',
          data: this.$http.adornParams({
            pageIndex: this.tablePaginationList.pageIndex,
            pageSize: this.tablePaginationList.pageSize,
            'object': this.dataForm
          })
        }).then(({
          data
        }) => {
           if (data && data.code === 0) {
          this.dataList = data.list.list;
          // this.totalPage = data.list.totalCount;
          this.tablePaginationList.totalPage = data.list.totalCount;
        } else {
          this.dataList = [];
          // this.totalPage = 0;
          this.tablePaginationList.totalPage = 0;
        }
          this.dataListLoading = false
          this.flag = false
        })
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle(id) {
        this.$nextTick(() => {
          this.$refs.tableRef.update('','wages')
        })
      },
     
      // 详情
      detailHandle(id) {
        this.detailVisible = true
        this.$nextTick(() => {
          this.$refs.detail.init(id)
        })
      },
      // 获取子组件中的时间
      getDateTime(data) {
        this.time = data.time
        this.createDateStart = data.startTime
        this.createDateEnd = data.endTime
      },
      // 导出
      exportExcel() {
        // let table = document.querySelector('.el-table__fixed-right');
        configFun('.el-table__fixed-right','400拨测客户端管理');
      },
      //重置
      reset(searchForm) {
        this.dataForm ={}
        this.$refs.searchForm.resetFields()
        this.time = ''
        this.createDateStart = ''
        this.createDateEnd = ''
      },
    }
  }

</script>

<style lang="scss" scoped>
#import_class{
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
