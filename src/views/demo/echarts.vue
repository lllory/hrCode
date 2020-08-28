<template>
  <div class="mod-demo-echarts">
    <!-- <el-alert
      title="提示："
      type="warning"
      :closable="false">
      <div slot-scope="description">
        <p class="el-alert__description">1. 此Demo只提供ECharts官方使用文档，入门部署和体验功能。具体使用请参考：http://echarts.baidu.com/index.html</p>
      </div>
    </el-alert> -->

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div id="J_chartLineBox" class="chart-box"></div>
        </el-card>
      </el-col>
      <!-- <el-col :span="24">
        <el-card>
          <div id="J_chartBarBox" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="J_chartPieBox" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="J_chartScatterBox" class="chart-box"></div>
        </el-card>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data () {
      return {
        chartLine: null
        // chartBar: null,
        // chartPie: null,
        // chartScatter: null
      }
    },
    mounted () {
      this.initChartLine()
      // this.initChartBar()
      // this.initChartPie()
      // this.initChartScatter()
    },
    activated () {
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
      if (this.chartLine) {
        this.chartLine.resize()
      }
      // if (this.chartBar) {
      //   this.chartBar.resize()
      // }
      // if (this.chartPie) {
      //   this.chartPie.resize()
      // }
      // if (this.chartScatter) {
      //   this.chartScatter.resize()
      // }
    },
    methods: {
      
      // 折线图
      initChartLine () {
        var option = {
          'title': {
            'text': ''
          },
          'tooltip': {
            'trigger': 'axis'
          },
          'legend': {
            'data': [ '1天', '7天', '14天' ],
            x: 'left'
          },

        grid: [{
            'hight':'3%',
            'left': '3%',
            'right': '4%'
           }, {
            'hight':'3%',
            'top':'55%',
            'left': '3%',
            'right': '4%'
          }],
         
          
          'xAxis': [
            {
            'type': 'category',
            'boundaryGap': false,
            'data': [ '2018-2-11 3:00', '2018-2-12 3:00', '2018-2-13 3:00', '2018-2-14 3:00', '2018-2-15 3:00', '2018-2-16 3:00', '2018-2-17 3:00' ]
          },
          {
           'type': 'category',
            'boundaryGap': false,
            'data': [ '2018-2-10 3:00', '2018-2-10 4:00', '2018-2-10 5:00', '2018-2-10 6:00', '2018-2-10 7:00', '2018-2-10 8:00', '2018-2-10 10:00' ] 
          }
          ],
          'yAxis': [{
            'name':'磁盘使用率',
            'type': 'value',
            'max':'10'
          },
          {
            'name':'CPU使用率',
            'type': 'value',
            'max':'10',
            }
          ],
          
          'series': [
            {
              'name': '磁盘使用率',
              'type': 'line',
              'symbolSize':'8',
               'hoverAnimation':'false',
              'stack': '总量',
              lineStyle: {
				normal: {
					color: "#3deaff"   // 线条颜色
				  }
        },
        areaStyle: { //区域填充样式
                normal: {
                 //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					   { offset: 0,  color: 'rgba(61,234,255, 0.9)'}, 
					   { offset: 0.7,  color: 'rgba(61,234,255, 0)'}
				   ], false),

                 shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                 shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
             }
         },
              'data': [ 0.97,0.96,0.96,0.95,0.95,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.93,0.92,0.91,0.9,0.89,0.88,0.87,0.87,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.87,0.88,0.9,0.93,0.96,0.99,1.03,1.06,1.1,1.14,1.17,1.2,1.23,1.26,1.29,1.33,1.36,1.4,1.43,1.45,1.48,1.49,1.51,1.51,1.5,1.49,1.47,1.44,1.41,1.37,1.34,1.3,1.27,1.24,1.22,1.2,1.19,1.18,1.16,1.15,1.14,1.13,1.12,1.11,1.11,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.09,1.09,1.08,1.07,1.06,1.05,1.04,1.03,1.03,1.02,1.01,1.01,1,0.99,0.98,0.97,0.96,0.96,0.95,0.95,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.93,0.92,0.91,0.9,0.89,0.88,0.87,0.87,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.85,0.84,0.83,0.82,0.81,0.8,0.8,0.79,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.78,0.77,0.75,0.73,0.71,0.68,0.65,0.63,0.61,0.59,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0.58,0. ]
            },
             {
              'name': 'CPU使用率',
              'type': 'line',
              'symbolSize':'8',
               'hoverAnimation':'false',
              'stack': '总量',
              lineStyle: {
				normal: {
					color: "#3deaff"   // 线条颜色
				}
      },
      areaStyle: { //区域填充样式
                normal: {
                 //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					   { offset: 0,  color: 'rgba(61,234,255, 0.9)'}, 
					   { offset: 0.7,  color: 'rgba(61,234,255, 0)'}
				   ], false),

                 shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                 shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
             }
         },
                'data': [ ,0.248,0.069,0.117,0.115,0.087,0.326,0.036,0.009,0.009,0.009,0.009,0.009,0.004,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.02,0.039,0.04,0.04,0.04,0.229,0.079,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.023,0.069,0.082,0.082,0.082,0.503,0.774,0.038,0.012,0.012,0.012,0.016,0.02,0.028,0.051,0.06,0.064,0.19,0.15,0.164,0.139,0.13,0.085,0.031,0.023,0.022,0.007,0.005,0.005,0.001,0,0.02,0.048,0.048,0.053,0.056,0.036,0.008,0.008,0.004,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ]
            }
          ],
      
			
            
        }
        this.chartLine = echarts.init(document.getElementById('J_chartLineBox'))
        this.chartLine.setOption(option)
        window.addEventListener('resize', () => {
          this.chartLine.resize()
        })
      },
      // 柱状图
      // initChartBar () {
      //   var option = {
      //     tooltip: {
      //       trigger: 'axis',
      //       axisPointer: {
      //         type: 'shadow'
      //       }
      //     },
      //     legend: {
      //       data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
      //     },
      //     grid: {
      //       left: '3%',
      //       right: '4%',
      //       bottom: '3%',
      //       containLabel: true
      //     },
      //     xAxis: [
      //       {
      //         type: 'category',
      //         data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      //       }
      //     ],
      //     yAxis: [
      //       {
      //         type: 'value'
      //       }
      //     ],
      //     series: [
      //       {
      //         name: '直接访问',
      //         type: 'bar',
      //         data: [320, 332, 301, 334, 390, 330, 320]
      //       },
      //       {
      //         name: '邮件营销',
      //         type: 'bar',
      //         stack: '广告',
      //         data: [120, 132, 101, 134, 90, 230, 210]
      //       },
      //       {
      //         name: '联盟广告',
      //         type: 'bar',
      //         stack: '广告',
      //         data: [220, 182, 191, 234, 290, 330, 310]
      //       },
      //       {
      //         name: '视频广告',
      //         type: 'bar',
      //         stack: '广告',
      //         data: [150, 232, 201, 154, 190, 330, 410]
      //       },
      //       {
      //         name: '搜索引擎',
      //         type: 'bar',
      //         data: [862, 1018, 964, 1026, 1679, 1600, 1570],
      //         markLine: {
      //           lineStyle: {
      //             normal: {
      //               type: 'dashed'
      //             }
      //           },
      //           data: [
      //             [{ type: 'min' }, { type: 'max' }]
      //           ]
      //         }
      //       },
      //       {
      //         name: '百度',
      //         type: 'bar',
      //         barWidth: 5,
      //         stack: '搜索引擎',
      //         data: [620, 732, 701, 734, 1090, 1130, 1120]
      //       },
      //       {
      //         name: '谷歌',
      //         type: 'bar',
      //         stack: '搜索引擎',
      //         data: [120, 132, 101, 134, 290, 230, 220]
      //       },
      //       {
      //         name: '必应',
      //         type: 'bar',
      //         stack: '搜索引擎',
      //         data: [60, 72, 71, 74, 190, 130, 110]
      //       },
      //       {
      //         name: '其他',
      //         type: 'bar',
      //         stack: '搜索引擎',
      //         data: [62, 82, 91, 84, 109, 110, 120]
      //       }
      //     ]
      //   }
      //   this.chartBar = echarts.init(document.getElementById('J_chartBarBox'))
      //   this.chartBar.setOption(option)
      //   window.addEventListener('resize', () => {
      //     this.chartBar.resize()
      //   })
      // },
      // 饼状图
      // initChartPie () {
      //   var option = {
      //     backgroundColor: '#2c343c',
      //     title: {
      //       text: 'Customized Pie',
      //       left: 'center',
      //       top: 20,
      //       textStyle: {
      //         color: '#ccc'
      //       }
      //     },
      //     tooltip: {
      //       trigger: 'item',
      //       formatter: '{a} <br/>{b} : {c} ({d}%)'
      //     },
      //     visualMap: {
      //       show: false,
      //       min: 80,
      //       max: 600,
      //       inRange: {
      //         colorLightness: [0, 1]
      //       }
      //     },
      //     series: [
      //       {
      //         name: '访问来源',
      //         type: 'pie',
      //         radius: '55%',
      //         center: ['50%', '50%'],
      //         data: [
      //           { value: 335, name: '直接访问' },
      //           { value: 310, name: '邮件营销' },
      //           { value: 274, name: '联盟广告' },
      //           { value: 235, name: '视频广告' },
      //           { value: 400, name: '搜索引擎' }
      //         ].sort(function (a, b) { return a.value - b.value }),
      //         roseType: 'radius',
      //         label: {
      //           normal: {
      //             textStyle: {
      //               color: 'rgba(255, 255, 255, 0.3)'
      //             }
      //           }
      //         },
      //         labelLine: {
      //           normal: {
      //             lineStyle: {
      //               color: 'rgba(255, 255, 255, 0.3)'
      //             },
      //             smooth: 0.2,
      //             length: 10,
      //             length2: 20
      //           }
      //         },
      //         itemStyle: {
      //           normal: {
      //             color: '#c23531',
      //             shadowBlur: 200,
      //             shadowColor: 'rgba(0, 0, 0, 0.5)'
      //           }
      //         },
      //         animationType: 'scale',
      //         animationEasing: 'elasticOut',
      //         animationDelay: function (idx) {
      //           return Math.random() * 200
      //         }
      //       }
      //     ]
      //   }
      //   this.chartPie = echarts.init(document.getElementById('J_chartPieBox'))
      //   this.chartPie.setOption(option)
      //   window.addEventListener('resize', () => {
      //     this.chartPie.resize()
      //   })
      // },
      // 散点图
      // initChartScatter () {
      //   var option = {
      //     backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
      //       { offset: 0, color: '#f7f8fa' },
      //       { offset: 1, color: '#cdd0d5' }
      //     ]),
      //     title: {
      //       text: '1990 与 2015 年各国家人均寿命与 GDP'
      //     },
      //     legend: {
      //       right: 10,
      //       data: ['1990', '2015']
      //     },
      //     xAxis: {
      //       splitLine: {
      //         lineStyle: {
      //           type: 'dashed'
      //         }
      //       }
      //     },
      //     yAxis: {
      //       splitLine: {
      //         lineStyle: {
      //           type: 'dashed'
      //         }
      //       },
      //       scale: true
      //     },
      //     series: [
      //       {
      //         name: '1990',
      //         data: [
      //           [28604, 77, 17096869, 'Australia', 1990],
      //           [31163, 77.4, 27662440, 'Canada', 1990],
      //           [1516, 68, 1154605773, 'China', 1990],
      //           [13670, 74.7, 10582082, 'Cuba', 1990],
      //           [28599, 75, 4986705, 'Finland', 1990],
      //           [29476, 77.1, 56943299, 'France', 1990],
      //           [31476, 75.4, 78958237, 'Germany', 1990],
      //           [28666, 78.1, 254830, 'Iceland', 1990],
      //           [1777, 57.7, 870601776, 'India', 1990],
      //           [29550, 79.1, 122249285, 'Japan', 1990],
      //           [2076, 67.9, 20194354, 'North Korea', 1990],
      //           [12087, 72, 42972254, 'South Korea', 1990],
      //           [24021, 75.4, 3397534, 'New Zealand', 1990],
      //           [43296, 76.8, 4240375, 'Norway', 1990],
      //           [10088, 70.8, 38195258, 'Poland', 1990],
      //           [19349, 69.6, 147568552, 'Russia', 1990],
      //           [10670, 67.3, 53994605, 'Turkey', 1990],
      //           [26424, 75.7, 57110117, 'United Kingdom', 1990],
      //           [37062, 75.4, 252847810, 'United States', 1990]
      //         ],
      //         type: 'scatter',
      //         symbolSize: function (data) {
      //           return Math.sqrt(data[2]) / 5e2
      //         },
      //         label: {
      //           emphasis: {
      //             show: true,
      //             formatter: function (param) {
      //               return param.data[3]
      //             },
      //             position: 'top'
      //           }
      //         },
      //         itemStyle: {
      //           normal: {
      //             shadowBlur: 10,
      //             shadowColor: 'rgba(120, 36, 50, 0.5)',
      //             shadowOffsetY: 5,
      //             color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
      //               { offset: 0, color: 'rgb(251, 118, 123)' },
      //               { offset: 1, color: 'rgb(204, 46, 72)' }
      //             ])
      //           }
      //         }
      //       },
      //       {
      //         name: '2015',
      //         data: [
      //           [44056, 81.8, 23968973, 'Australia', 2015],
      //           [43294, 81.7, 35939927, 'Canada', 2015],
      //           [13334, 76.9, 1376048943, 'China', 2015],
      //           [21291, 78.5, 11389562, 'Cuba', 2015],
      //           [38923, 80.8, 5503457, 'Finland', 2015],
      //           [37599, 81.9, 64395345, 'France', 2015],
      //           [44053, 81.1, 80688545, 'Germany', 2015],
      //           [42182, 82.8, 329425, 'Iceland', 2015],
      //           [5903, 66.8, 1311050527, 'India', 2015],
      //           [36162, 83.5, 126573481, 'Japan', 2015],
      //           [1390, 71.4, 25155317, 'North Korea', 2015],
      //           [34644, 80.7, 50293439, 'South Korea', 2015],
      //           [34186, 80.6, 4528526, 'New Zealand', 2015],
      //           [64304, 81.6, 5210967, 'Norway', 2015],
      //           [24787, 77.3, 38611794, 'Poland', 2015],
      //           [23038, 73.13, 143456918, 'Russia', 2015],
      //           [19360, 76.5, 78665830, 'Turkey', 2015],
      //           [38225, 81.4, 64715810, 'United Kingdom', 2015],
      //           [53354, 79.1, 321773631, 'United States', 2015]
      //         ],
      //         type: 'scatter',
      //         symbolSize: function (data) {
      //           return Math.sqrt(data[2]) / 5e2
      //         },
      //         label: {
      //           emphasis: {
      //             show: true,
      //             formatter: function (param) {
      //               return param.data[3]
      //             },
      //             position: 'top'
      //           }
      //         },
      //         itemStyle: {
      //           normal: {
      //             shadowBlur: 10,
      //             shadowColor: 'rgba(25, 100, 150, 0.5)',
      //             shadowOffsetY: 5,
      //             color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
      //               { offset: 0, color: 'rgb(129, 227, 238)' },
      //               { offset: 1, color: 'rgb(25, 183, 207)' }
      //             ])
      //           }
      //         }
      //       }
      //     ]
      //   }
      //   this.chartPie = echarts.init(document.getElementById('J_chartScatterBox'))
      //   this.chartPie.setOption(option)
      //   window.addEventListener('resize', () => {
      //     this.chartPie.resize()
      //   })
      // }
    }
  }
</script>

<style lang="scss">
  .mod-demo-echarts {
    > .el-alert {
      margin-bottom: 10px;
    }
    > .el-row {
      margin-top: -10px;
      margin-bottom: -10px;
      .el-col {
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    .chart-box {
      min-height: 200px;
    }
  }
</style>
