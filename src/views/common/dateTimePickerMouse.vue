<template>
  <el-date-picker v-model="ctime" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
    type="datetimerange" :picker-options="pickerOptions2" :clearable='false' format='yyyy-MM-dd HH:mm:ss'>
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
              d1.getFullYear() +
              "-" +
              (d1.getMonth() + 1) +
              "-" +
              d1.getDate() +
              " " +
              d1.getHours() +
              ":" +
              d1.getMinutes() +
              ":" +
              d1.getSeconds()
            this.endTime =
              d2.getFullYear() +
              "-" +
              (d2.getMonth() + 1) +
              "-" +
              d2.getDate() +
              " " +
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
        choiceDate:'',
        pickerOptions2: {
          onPick: ({
            maxDate,
            minDate
          }) => {
            this.choiceDate = minDate.getTime()
            if (maxDate) {
              this.choiceDate = ''
            }
          },
          disabledDate: (time) => {
            const self = this;
            if (!!self.choiceDate) {
              const startDay = (new Date(self.choiceDate).getDate() - 1) * 24 * 3600 * 1000;
              const endDay = (new Date(
                new Date(self.choiceDate).getFullYear(),
                new Date(self.choiceDate).getMonth() + 1,
                0
              ).getDate() - new Date(self.choiceDate).getDate()) * 24 * 3600 * 1000;
              let minTime = self.choiceDate - startDay;
              let maxTime = self.choiceDate + endDay;
              return time.getTime() < minTime || time.getTime() > maxTime
            }
          }
        },
      }
    },
    props: ['ptime', 'detailVisible', 'isTime', 'installTime']
  }

</script>
