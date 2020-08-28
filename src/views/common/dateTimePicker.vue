<template>
  <el-date-picker v-model="ctime" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
    type="daterange" :picker-options="pickerOptions2" :clearable='false' format='yyyy-MM-dd'>
  </el-date-picker>
</template>

<script>
  export default {
    model: {
      prop: "ptime",
      event: "change"
    },
    computed: {
      ctime: {
        get(val) {
          if (val) {
            let time = new Date(new Date().getTime());
            // this.startT = time.getFullYear() +  "-" +  (time.getMonth() + 1) +  "-" +  time.getDate() + " "+"00:00:00";
            // this.endT = time.getFullYear() +  "-" +  (time.getMonth() + 1) +  "-" +  time.getDate() + " "+"23:59:59";
            this.startT = time.getFullYear() + "-" + ((time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : "0" + (
                time.getMonth() + 1)) + "-" + (time.getDate() >= 10 ? time.getDate() : "0" + time.getDate()) + " " +
              "00:00:00";
            this.endT = time.getFullYear() + "-" + ((time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : "0" + (time
                .getMonth() + 1)) + "-" + (time.getDate() >= 10 ? time.getDate() : "0" + time.getDate()) + " " +
              "23:59:59";
            if (this.isTime) {
              return this.ptime || [new Date(this.startT), new Date(this.endT)]
            } else if (this.tableNametime != undefined && this.tableNametime != '') {
              this.startTabel =new Date((new Date(this.tableNametime).getTime() -  1 * 60 * 60 * 1000)) 
                this.endTabel =  new Date(new Date(this.tableNametime).getTime())
                return [new Date(this.startTabel), new Date(this.endTabel)]
              // if (this.tableName == 'hour' || this.tableName == 'day') {
              //   let tableTime = new Date(new Date(this.tableNametime).getTime())
              //   this.startTabel = tableTime.getFullYear() + "-" + ((tableTime.getMonth() + 1) >= 10 ? (tableTime
              //     .getMonth() + 1) : "0" + (tableTime.getMonth() + 1)) + "-" + (tableTime.getDate() >= 10 ?
              //     tableTime.getDate() : "0" + tableTime.getDate()) + " " + "00:00:00";
              //   this.endTabel = tableTime.getFullYear() + "-" + ((tableTime.getMonth() + 1) >= 10 ? (tableTime
              //     .getMonth() + 1) : "0" + (tableTime.getMonth() + 1)) + "-" + (tableTime.getDate() >= 10 ?
              //     tableTime.getDate() : "0" + tableTime.getDate()) + " " + "23:59:59";
              //     console.log([new Date(this.startTabel), new Date(this.endTabel)],'[new Date(this.startTabel), new Date(this.endTabel)]')
              //   return [new Date(this.startTabel), new Date(this.endTabel)]
              // }else if(this.tableName == 'week'){
              //   this.startTabel =new Date((new Date(this.tableNametime).getTime() - 3600 * 1000 * 24 * 7)) 
              //   this.endTabel =  new Date(new Date(this.tableNametime).getTime())
              //   return [new Date(this.startTabel), new Date(this.endTabel)]
              //   // console.log( this.startTabel,' this.startTabel week')
              // }
              // else if(this.tableName == 'month'){
              //   // this.startTabel =new Date((new Date(this.tableNametime).getTime() - 3600 * 1000 * 24 * 30)) 
              //   // this.endTabel =  new Date(new Date(this.tableNametime).getTime())

              //   let tableNametime =new Date(this.tableNametime).getTime()
              //   const startDay = (new Date(tableNametime).getDate()- (new Date(tableNametime).getDate()-(new Date(tableNametime).getDate()-1))) * 24 * 3600 * 1000;
              // const endDay = (new Date(
              //   new Date(tableNametime).getFullYear(),
              //   new Date(tableNametime).getMonth() + 1,
              //   0
              // ).getDate() - new Date(tableNametime).getDate()) * 24 * 3600 * 1000;
              // let minTime = tableNametime - startDay;
              // let maxTime = tableNametime + endDay;
              //   return [new Date(minTime), new Date(maxTime)]
              // }
            } else {
              if (this.installTime) {
                return [new Date(this.startT), new Date(this.endT)]
              } else {
                return this.ptime
              }
            }
          } else {
            return ''
          }
        },
        set(val) {
          if (val) {
            let d1 = new Date(val[0].getTime())
            let d2 = new Date(val[1].getTime())
            this.startTime =
            d1.getFullYear() + "-" + ((d1.getMonth() + 1) >= 10 ? (d1.getMonth() + 1) : "0" + (d1
              .getMonth() + 1)) 
            + "-" + (d1.getDate() >= 10 ? d1.getDate() : "0" + d1.getDate()) + " " +
            d1.getHours() +
            ":" +
            d1.getMinutes() +
            ":" +
            d1.getSeconds()
            // this.startTime =
            //   d1.getFullYear() +
            //   "-" +
            //   (d1.getMonth() + 1) +
            //   "-" +
            //   d1.getDate() +
            //   " " +
            //   d1.getHours() +
            //   ":" +
            //   d1.getMinutes() +
            //   ":" +
            //   d1.getSeconds()
            // this.endTime =
            //   d2.getFullYear() +
            //   "-" +
            //   (d2.getMonth() + 1) +
            //   "-" +
            //   d2.getDate() +
            //   " " +
            //   d2.getHours() +
            //   ":" +
            //   d2.getMinutes() +
            //   ":" +
            //   d2.getSeconds()
              this.endTime =
            d2.getFullYear() + "-" + ((d2.getMonth() + 1) >= 10 ? (d2.getMonth() + 1) : "0" + (d2
              .getMonth() + 1)) 
            + "-" + (d2.getDate() >= 10 ? d2.getDate() : "0" + d2.getDate()) + " " +
            d2.getHours() +
            ":" +
            d2.getMinutes() +
            ":" +
            d2.getSeconds()
            let dateTime = {
              time: val,
              startTime: this.startTime,
              endTime: this.endTime
            }
            this.$emit('sendDateTime', dateTime)
          } else {
            let dateTime = {
              time: '',
              startTime: '',
              endTime: ''
            }
            this.$emit('sendDateTime', dateTime)
          }
        }
      }
    },
    data() {
      return {
        time: '',
        startT: '',
        endT: '',
        endTabel: "",
        startTabel: "",
        pickerOptions2: {
          shortcuts: [{
              text: "最近一周",
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit("pick", [start, end])
              }
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit("pick", [start, end])
              }
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit("pick", [start, end])
              }
            }
          ]
        }
      }
    },
    props: ['ptime', 'detailVisible', 'isTime', 'installTime', 'tableNametime', 'tableName']
  }

</script>
