<template>
  <!-- <el-date-picker v-model="ctime" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
    type="datetimerange" :picker-options="pickerOptions2" :clearable='false' format='yyyy-MM-dd HH:mm:ss'>
  </el-date-picker> -->
  <el-date-picker
  v-model="ctime"
  type="month"
  :clearable='false'
  placeholder="选择日期">
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
             this.startTime =
            time.getFullYear() + "-" + ((time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : "0" + (time
              .getMonth() + 1)) 
            + "-" + (time.getDate() >= 10 ? time.getDate() : "0" + time.getDate()) + " " +
            time.getHours() +
            ":" +
            time.getMinutes() +
            ":" +
            time.getSeconds()
            console.log(this.startTime,'startTime')
            if(this.showTime == true){
              return new Date(this.startTime)
            }else{
            return this.ptime
            }
          } else {
            return ''
          }
        },
        set(val) {
          if (val) {
            let d1 = new Date(val.getTime())
            
            this.startTime =
            d1.getFullYear() + "-" + ((d1.getMonth() + 1) >= 10 ? (d1.getMonth() + 1) : "0" + (d1
              .getMonth() + 1)) 
            + "-" + (d1.getDate() >= 10 ? d1.getDate() : "0" + d1.getDate()) + " " +
            d1.getHours() +
            ":" +
            d1.getMinutes() +
            ":" +
            d1.getSeconds()
            let dateTime = {
              time: val,
              startTime: this.startTime.split(' ')[0].slice(0,7),
              
            }
            this.$emit('sendDateTime', dateTime)
          } else {
            let dateTime = {
              time: '',
              startTime: '',
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
    props: ['ptime','showTime']
  }

</script>
