<template>
  <div>
    <el-table
      :data="tabledata"
      border
      style="width: 100%;"
      id="taskTable"
      ref="tabelData"
      :height="tableHeight"
      @selection-change="selectionChangeHandle"
      :row-key="getRowKey"
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
        :reserve-selection="true"
      ></el-table-column>
      <template v-for="item in tableHeader">
        <table-column v-if="item.children && item.children.length" :key="item.id" :column-header='item'></table-column>
        <el-table-column v-else :key="item.id" :label="item.label" :prop="item.prop" align="center" :width='item.width'></el-table-column>
      </template>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作" v-if="typeof(refString) !== 'undefined' ">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="update(scope.row)">修改</el-button>
          <!-- <el-button type="text" size="small" @click="detail(scope.row)">详情</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="PaginationList.paginationShow"
      @size-change="sizeChangeHandleFun"
      @current-change="currentChangeHandleFun"
      :current-page="PaginationList.pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="PaginationList.pageSize"
      :total="PaginationList.totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <time-distribution-update v-if="distribution" ref="distribution"></time-distribution-update>
    <time-wages-update v-if="wages" ref='wages' @emitDataSelectionsList='getParentData'></time-wages-update>
    <time-five-payment v-if="fivePayment" ref='fivePayment'></time-five-payment>
    <department-manage v-if="department" ref="department"  @emitDataSelectionsList='getParentData'></department-manage>
  </div>
</template>

<script>
import TableColumn from '../common/TableColumn'
import TimeDistributionUpdate from "../modules/WorkTime/timeupdate/time-distribution-update"
import timeWagesUpdate from '../modules/WorkTime/timeupdate/time-wages-update'
import TimeFivePayment from '../modules/WorkTime/timeupdate/time-fivePayment-update'
import DepartmentManage from '../modules/attendance/department-manage-update'

export default {
  data() {
    return {
      distribution: false,
      wages:false,
      fivePayment:false,
      department:false,
      dataListSelectionsList:[]
    };
  },
  components: {
     TableColumn,
    TimeDistributionUpdate,
    timeWagesUpdate,
    TimeFivePayment,
    DepartmentManage,
   
  },
  props: {
    tableHeader: {
      type: Array,
      required: true
    },
    // 表格的数据
    tabledata: {
      type: Array,
      required: true
    },
    refString: {
      type: String,
    },
    PaginationList:{
      type:Object,
      required:true
    },
    currentChangeHandleFun:{
      type:Function,
      required:true
    },
    sizeChangeHandleFun:{
      type:Function,
      required:true
    },
    tableHeight:{
      type:Number,
      required:true
    }
  },
  mounted() {
  },
  methods: {
    getRowKey(row) {
      if(this.refString == 'wages'){
        return row.staffNo;
      }else if(this.refString == 'department'){
        return row.id
      }
        
    },
    getParentData(){
      this.$emit('emitDataSelectionsList')
      console.log('调用爷爷组件的方法')
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
    // 修改
    update(item,ref) {
      if(typeof(ref) !== 'undefined') this.refString = ref
        this[this.refString] = true;
        this.$nextTick(() => {
          this.$refs[this.refString].init(item);
        });
      // }
    },
    clearSelectionT(){
      this.$refs.tabelData.clearSelection()
      sessionStorage.setItem('wageList',JSON.stringify ([]))
    },
    // 详情
    detail(item) {},
    
    // 多选
    selectionChangeHandle(val) {
     this.dataListSelectionsList = []
      this.dataListSelections = val;
      if (this.dataListSelections  && this.dataListSelections.length > 0) {
        // this.dataListSelections.map((item,index)=>item.id = index)
        this.dataListSelections.forEach(item => {
          let obj = {};
          if(this.refString == 'wages'){
             obj.id = item.staffNo;
          }else if(this.refString == 'department'){
            obj.id = item.id
          }
         
          this.dataListSelectionsList.push(obj)
        });
      }
      this.$emit('emitDataList',this.dataListSelectionsList)
    }
  }
};
</script>