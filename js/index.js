var requestUrl = 'http://62.234.26.183/public/screen/show'
var requestData = {data: '',header: {token: ''}}

var redStr = '#c75658'
var blueStr = '#4a9ed9'
var greenStr = '#4dadb2'
var yellowStr = '#f6c142'

var chartA1 = echarts.init(document.getElementById('chartA1'));
var chartA2 = echarts.init(document.getElementById('chartA2'));
var chartA3 = echarts.init(document.getElementById('chartA3'));
var chartA4 = echarts.init(document.getElementById('chartA4'));
var chartB2 = echarts.init(document.getElementById('chartB2'));
var chartC1 = echarts.init(document.getElementById('chartC1'));
var chartC2 = echarts.init(document.getElementById('chartC2'));

var chartMB1 = echarts.init(document.getElementById('chartMB1'));
var chartMB2 = echarts.init(document.getElementById('chartMB2'));
var chartMB3 = echarts.init(document.getElementById('chartMB3'));
var chartMB4 = echarts.init(document.getElementById('chartMB4'));
var chartMD1 = echarts.init(document.getElementById('chartMD1'));

var chartRA1 = echarts.init(document.getElementById('chartRA1'));
var chartRA2 = echarts.init(document.getElementById('chartRA2'));
var chartRA3 = echarts.init(document.getElementById('chartRA3'));
var chartMC1 = echarts.init(document.getElementById('chartMC1'));
var chartMC3 = echarts.init(document.getElementById('chartMC3'));
var chartRC1 = echarts.init(document.getElementById('chartRC1'));
var chartRC2 = echarts.init(document.getElementById('chartRC2'));
var chartRC3 = echarts.init(document.getElementById('chartRC3'));
var chartRC4 = echarts.init(document.getElementById('chartRC4'));
var chartRC5 = echarts.init(document.getElementById('chartRC5'));
var chartRC6 = echarts.init(document.getElementById('chartRC6'));

function fetchData() {
  axios({
    url: requestUrl,
    method: 'post',
    data: {
      data: '',
      header: {
        token: ''
      }
    }
  }).then((res) => {
    var data = res.data.data
  // L  A
  
    var equipmentInspectionVo = data.equipmentInspectionVo
    var LA1 = equipmentInspectionVo.inspectionVos
    var LA2 = equipmentInspectionVo.inspectionTrends
    var LA3 = equipmentInspectionVo.standbyVos
    var LA4 = equipmentInspectionVo.standbyTrends
  
    var LA1_data = LA1.map(item => item.count)
    var LA1_xData = LA1.map(item => item.name)
    LA1_data.unshift(LA1_data[0] + LA1_data[1])
    LA1_xData.unshift('甲乙类')
  
    var LA2_data = [[],[],[]]
    var LA2_xData = []
    for (var key in LA2) {
      if (LA2.hasOwnProperty(key)) {
        var item = LA2[key]
        if (item.length > 0) {
          LA2_xData.push(key + '月')
          var LA2_sum = 0
          item.forEach(subItem => {
            LA2_sum += subItem.count
            if (subItem.name === '甲类') {
              LA2_data[1].push(subItem.count)
            }
            if (subItem.name === '乙类') {
              LA2_data[2].push(subItem.count)
            }
          })
          LA2_data[0].push(LA2_sum)
        }
      }
    }
  
    var LA3_data = LA3.map(item => item.time)
    var LA3_xData = LA3.map(item => item.name)
    LA3_data.unshift(LA3_data[0] + LA3_data[1])
    LA3_xData.unshift('甲乙类')
  
    var LA4_data = [[],[],[]]
    var LA4_xData = []
    for (var key in LA4) {
      if (LA4.hasOwnProperty(key)) {
        var item = LA4[key]
        if (item.length > 0) {
          LA4_xData.push(key + '月')
          var LA4_sum = 0
          item.forEach(subItem => {
            LA4_sum += subItem.time
            if (subItem.name === '甲类') {
              LA4_data[1].push(subItem.time)
            }
            if (subItem.name === '乙类') {
              LA4_data[2].push(subItem.time)
            }
          })
          LA4_data[0].push(LA4_sum)
        }
      }
    }
  
    chartA1.setOption({
      xAxis: {
        type: 'value',
        show: false
      },
      yAxis: {
          type: 'category',
          data: LA1_xData,
          axisLine:{
            show:true,
            lineStyle: {
              color: '#fff',
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            inside: false
          } 
          // axisLine:{show:false},
          // splitLine: {show: false}
      },
      series: [{
          data: LA1_data,
          type: 'bar',
          barWidth: '12',
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'right',
              },
              color: function(params) { 
                var colorList = [ '#4a9ed9','#4dadb2', '#f6c142' ]; 
                return colorList[params.dataIndex] 
              }
            }
          }
      }],
      grid: {
        x:50,  //左留白
        y:10,   //上留白
        x2:40,  //右留白
        y2:10   //下留白
      }
    });
    chartA2.setOption({
      xAxis: {
        type: 'category',
        data: LA2_xData,
        // boundaryGap: false,
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: false
        },
      },
      yAxis: {
        name: '(人)',
        nameGap: 5,
        type: 'value',
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: false
        },
        interval: 500,
        // axisLabel: {
        //   interval: 800,
        //   formatter: '{value} kg'
        // }
      },
      series: [
        {
          name: '甲乙类',
          type: 'line',
          data: LA2_data[0],
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#f6c142'
              }
            }
          }
        },
        {
          name: '甲类',
          type: 'line',
          data: LA2_data[1],
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#4dadb2'
              }
            }
          }
        },
        {
          name: '乙类',
          type: 'line',
          data: LA2_data[1],
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#4a9ed9'
              }
            }
          }
        }
      ],
      grid: {
        x:50,  //左留白
        y:24,   //上留白
        x2:40,  //右留白
        y2:24   //下留白
      }
    });
    chartA3.setOption({
      xAxis: {
        type: 'value',
        show: false
      },
      yAxis: {
          type: 'category',
          data: LA3_xData,
          axisLine:{
            show:true,
            lineStyle: {
              color: '#fff',
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            inside: false
          } 
          // axisLine:{show:false},
          // splitLine: {show: false}
      },
      series: [{
          data: LA3_data,
          type: 'bar',
          barWidth: '12',
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'right',
              },
              color: function(params) { 
                var colorList = [ '#4a9ed9','#4dadb2', '#f6c142' ]; 
                return colorList[params.dataIndex] 
              }
            }
          }
      }],
      grid: {
        x:50,  //左留白
        y:10,   //上留白
        x2:40,  //右留白
        y2:10   //下留白
      }
    });
    chartA4.setOption({
      xAxis: {
        type: 'category',
        data: LA4_xData,
        // boundaryGap: false,
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: false
        },
      },
      yAxis: {
        name: '(h)',
        nameGap: 5,
        type: 'value',
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: false
        },
        interval: 200,
        // axisLabel: {
        //   interval: 800,
        //   formatter: '{value} kg'
        // }
      },
      series: [
        {
          name: '甲乙类',
          type: 'line',
          data: LA4_data[0],
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#f6c142'
              }
            }
          }
        },
        {
          name: '甲类',
          type: 'line',
          data: LA4_data[1],
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#4dadb2'
              }
            }
          }
        },
        {
          name: '乙类',
          type: 'line',
          data: LA4_data[2],
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#4a9ed9'
              }
            }
          }
        }
      ],
      grid: {
        x:50,  //左留白
        y:24,   //上留白
        x2:40,  //右留白
        y2:24   //下留白
      }
    });
  
  
  
  // L  B
    var LB1 = data.areaEquipmentTotalVos
    var LB1_data = LB1.map(item => item.count)
    var LB1_xData = LB1.map(item => item.name)
    chartB2.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        },
        formatter: function (params) {
          console.log(params)
        }
      },
      xAxis: {
        type: 'category',
        data: LB1_xData,
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          inside: false,
          interval: 0
        } 
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        name: '设备数量',
        data: LB1_data,
        type: 'bar',
        color: yellowStr,
        barWidth: '20',
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: 'top',
            }
          }
        }
      }],
      grid: {
        x:10,  //左留白
        y:10,   //上留白
        x2:10,  //右留白
        y2:20   //下留白
      }
    })
  
  // L  C
    var LC1 = data.eqOperationIndexVo.overload
    var LC2 = data.eqOperationIndexVo.lowload
    var LC1_data = LC1.map(item => item.count).reverse()
    var LC1_xData = LC1.map(item => item.name).reverse()
    var LC2_data = LC2.map(item => item.count).reverse()
    var LC2_xData = LC2.map(item => item.name).reverse()
  
    chartC1.setOption({
      xAxis: {
        type: 'value',
        show: false
      },
      yAxis: {
          type: 'category',
          data: LC1_xData,
          axisLine:{
            show:true,
            lineStyle: {
              color: '#fff',
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            inside: false
          } 
          // axisLine:{show:false},
          // splitLine: {show: false}
      },
      series: [{
          data: LC1_data,
          type: 'bar',
          color: redStr,
          barWidth: '12',
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'right',
              }
            }
          }
      }],
      grid: {
        x:50,  //左留白
        y:10,   //上留白
        x2:40,  //右留白
        y2:10   //下留白
      }
    });
    chartC2.setOption({
      xAxis: {
        type: 'value',
        show: false
      },
      yAxis: {
          type: 'category',
          data: LC2_xData,
          axisLine:{
            show:true,
            lineStyle: {
              color: '#fff',
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            inside: false
          } 
          // axisLine:{show:false},
          // splitLine: {show: false}
      },
      series: [{
          data: LC2_data,
          type: 'bar',
          color: greenStr,
          barWidth: '12',
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'right',
              }
            }
          }
      }],
      grid: {
        x:50,  //左留白
        y:10,   //上留白
        x2:40,  //右留白
        y2:10   //下留白
      }
    });
  
  // M A
    var eqCount = data.mapAllCityVo.eqCount || 0
    var eqOriginalValue = data.mapAllCityVo.eqOriginalValue || 0
    $('.eqCount').text(eqCount)
    $('.eqOriginalValue').text(eqOriginalValue)
  
  
  // M  B
    var MB1 = data.mapAllCityVo.aEqCountVos
    var MB1_data = MB1.map(item => ({
      name: item.name,
      value: item.count
    }))
    var MB2 = data.mapAllCityVo.bEqCountVos
    var MB2_data = MB2.map(item => ({
      name: item.name,
      value: item.count
    }))
    var MB3 = data.mapAllCityVo.abEqCountVos
    var MB3_data = MB3.map(item => ({
      name: item.name,
      value: item.count
    }))
    const aCount = data.mapAllCityVo.abEqCountVos.find(item => item.name === '甲类').count
    const bCount = data.mapAllCityVo.abEqCountVos.find(item => item.name === '乙类').count
    const abCount = aCount + bCount
    $('.aCount').text(aCount)
    $('.bCount').text(bCount)
    $('.abCount').text(abCount)
    chartMB1.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: '甲类',
          type: 'pie',
          radius: '70%',
          avoidLabelOverlap: false,
          label: {
            fontSize: 12,
            color: '#235894',
            position: 'inner'
          },
          labelLine: {
            lineStyle: {
                color: '#235894'
            }
          },
          data: MB1_data,
          itemStyle: {
            color: function(params) { 
              var colorList = [ redStr, blueStr, greenStr, yellowStr ]; 
              return colorList[params.dataIndex] 
            }
          }
        }
      ]
    })
    chartMB2.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: '乙类',
          type: 'pie',
          radius: '70%',
          avoidLabelOverlap: false,
          label: {
            fontSize: 12,
            color: '#235894',
            position: 'inner'
          },
          labelLine: {
            lineStyle: {
                color: '#235894'
            }
          },
          data: MB2_data,
          itemStyle: {
            color: function(params) { 
              var colorList = [ redStr, blueStr, greenStr, yellowStr ]; 
              return colorList[params.dataIndex] 
            }
          }
        }
      ]
    })
    chartMB3.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: '甲乙类',
          type: 'pie',
          radius: '70%',
          avoidLabelOverlap: false,
          label: {
            fontSize: 12,
            color: '#235894',
            position: 'inner'
          },
          labelLine: {
            lineStyle: {
                color: '#235894'
            }
          },
          data: MB3_data,
          itemStyle: {
            color: function(params) { 
              var colorList = [ redStr, blueStr, greenStr, yellowStr ]; 
              return colorList[params.dataIndex] 
            }
          }
        }
      ]
    })
  
    var MB4_data = data.mapAllCityVo.proportion * 10000
    var proportion = data.mapAllCityVo.proportion
    $('.proportion').text(proportion)
    chartMB4.setOption({
      series: [
        {
            name: '全省人占比',
            type: 'gauge',
            splitNumber: 10,
            radius: '75%',
            title: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 5
              }
            },
            splitLine: {
              length: 5
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              width: 4
            },
            detail: {
              formatter: '{value}‱',
              color: yellowStr
            },
            data: [{value: MB4_data, name: '全省人占比'}]
        }
      ]
    })

    var MC1 = data.eqMonitorVo.aEqMonitor
    var MC2 = data.eqMonitorVo.aAllEqMonitor
    var MC3 = data.eqMonitorVo.bEqMonitor
    var MC4 = data.eqMonitorVo.bAllEqMonitor

    var MC1_xData = MC1.map(item => item.name)
    var MC1_data = { bootCount: [], offlineCount: [], standbyCount: [] }
    MC1_data.bootCount = MC1.map(item => item.bootCount)
    MC1_data.offlineCount = MC1.map(item => item.offlineCount)
    MC1_data.standbyCount = MC1.map(item => item.standbyCount)    
    // MC1_data.bootCount = [1,2,3,4]
    // MC1_data.offlineCount = [1,2,3,4]
    // MC1_data.standbyCount = [1,2,3,4]

    var MC3_xData = MC3.map(item => item.name)
    var MC3_data = { bootCount: [], offlineCount: [], standbyCount: [] }
    MC3_data.bootCount = MC3.map(item => item.bootCount)
    MC3_data.offlineCount = MC3.map(item => item.offlineCount)
    MC3_data.standbyCount = MC3.map(item => item.standbyCount)

    chartMC1.setOption({
      xAxis: {
        type: 'category',
        data: MC1_xData,
        axisLine:{
          show:false,
          lineStyle: {
            color: '#fff',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          inside: false,
          interval: 0
        } 
      },
      yAxis: {
        type: 'value',
        interval: 15,
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
      },
      grid: {
        x:40,  //左留白
        y:20,   //上留白
        x2:20,  //右留白
        y2:25   //下留白
      },
      series: [
        {
          data: MC1_data.bootCount,
          type: 'bar',
          color: redStr,
          barWidth: '20',
          stack: '总量',
          label: {
              show: true,
              position: 'insideTop',
              formatter: function (params) {
                if (params.value) {
                  return params.value
                } else {
                  return ''
                }
              }
          },
        },
        {
          data: MC1_data.offlineCount,
          type: 'bar',
          color: blueStr,
          barWidth: '20',
          stack: '总量',
          label: {
              show: true,
              position: 'insideTop',
              formatter: function (params) {
                if (params.value) {
                  return params.value
                } else {
                  return ''
                }
              }
          },
        },
        {
          data: MC1_data.standbyCount,
          type: 'bar',
          color: greenStr,
          barWidth: '20',
          stack: '总量',
          label: {
              show: true,
              position: 'insideTop',
              formatter: function (params) {
                if (params.value) {
                  return params.value
                } else {
                  return ''
                }
              }
          },
        }
      ]
    })
    chartMC3.setOption({
      xAxis: {
        type: 'category',
        data: MC3_xData,
        axisLine:{
          show:false,
          lineStyle: {
            color: '#fff',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          inside: false,
          interval: 0
        } 
      },
      yAxis: {
        type: 'value',
        interval: 15,
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
      },
      grid: {
        x:40,  //左留白
        y:20,   //上留白
        x2:20,  //右留白
        y2:25   //下留白
      },
      series: [
        {
          data: MC3_data.bootCount,
          type: 'bar',
          color: redStr,
          barWidth: '20',
          stack: '总量',
          label: {
              show: true,
              position: 'insideTop',
              formatter: function (params) {
                if (params.value) {
                  return params.value
                } else {
                  return ''
                }
              }
          },
        },
        {
          data: MC3_data.offlineCount,
          type: 'bar',
          color: blueStr,
          barWidth: '20',
          stack: '总量',
          label: {
              show: true,
              position: 'insideTop',
              formatter: function (params) {
                if (params.value) {
                  return params.value
                } else {
                  return ''
                }
              }
          },
        },
        {
          data: MC3_data.standbyCount,
          type: 'bar',
          color: greenStr,
          barWidth: '20',
          stack: '总量',
          label: {
              show: true,
              position: 'insideTop',
              formatter: function (params) {
                if (params.value) {
                  return params.value
                } else {
                  return ''
                }
              }
          },
        }
      ]
    })

    $('#chartMC2 .allCount').text(MC2.allCount)
    $('#chartMC2 .bootCount').text(MC2.bootCount)
    $('#chartMC2 .standbyCount').text(MC2.standbyCount)
    $('#chartMC2 .offlineCount').text(MC2.offlineCount)

    $('#chartMC4 .allCount').text(MC4.allCount)
    $('#chartMC4 .bootCount').text(MC4.bootCount)
    $('#chartMC4 .standbyCount').text(MC4.standbyCount)
    $('#chartMC4 .offlineCount').text(MC4.offlineCount)


    var MD1 = data.queryHourWorkingCountVos
    var MD1_data = MD1.map(item => item.count)
    var MD1_xData = MD1.map(item => item.hour)
    chartMD1.setOption({
      xAxis: {
        type: 'category',
        data: MD1_xData,
        // boundaryGap: false,
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: false
        },
      },
      yAxis: {
        type: 'value',
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: false
        },
        interval: 200,
        // axisLabel: {
        //   interval: 800,
        //   formatter: '{value} kg'
        // }
      },
      series: [
        {
          type: 'line',
          data: MD1_data,
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#0098e4'
              }
            }
          }
        }
      ],
      grid: {
        x:50,  //左留白
        y:24,   //上留白
        x2:40,  //右留白
        y2:24   //下留白
      }
    });

    var RA1 = data.mechanismOverviewResps
    var RA3 = data.mechanismCityResps
    var RA1_data = RA1.map(item => ({
      name: item.name,
      value: item.count
    }))
    var MR2_data = RA1.map(item => item.count)
    var MR2_xData = RA1.map(item => item.name)
    var RA3_data = RA3.map(item => item.count)
    var RA3_xData = RA3.map(item => item.name)
    chartRA1.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: '机构比',
          type: 'pie',
          radius: '70%',
          avoidLabelOverlap: false,
          label: {
            fontSize: 10,
            color: '#235894',
            position: 'inner'
          },
          labelLine: {
            lineStyle: {
                color: '#235894'
            }
          },
          data: RA1_data,
          itemStyle: {
            color: function(params) { 
              var colorList = [ redStr, yellowStr, greenStr, blueStr ]; 
              return colorList[params.dataIndex] 
            }
          }
        }
      ]
    })
    chartRA2.setOption({
      xAxis: {
        type: 'category',
        data: MR2_xData,
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          inside: false,
          interval: 0
        } 
      },
      yAxis: {
        type: 'value',
        interval: 20,
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
      },
      grid: {
        x:40,  //左留白
        y:10,   //上留白
        x2:10,  //右留白
        y2:40   //下留白
      },
      series: [{
          data: MR2_data,
          type: 'bar',
          color: '#f6c142',
          barWidth: '20',
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'top',
              }
            }
          }
      }]
    })
    chartRA3.setOption({
      xAxis: {
        type: 'category',
        data: RA3_xData,
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          inside: false,
          interval: 0
        } 
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        name: '山东省各市区在线监督医院数量分布',
        data: RA3_data,
        type: 'bar',
        color: yellowStr,
        barWidth: '20',
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: 'top',
            }
          }
        }
      }],
      grid: {
        x:24,  //左留白
        y:20,   //上留白
        x2:20,  //右留白
        y2:30   //下留白
      }
    })

    var RC1 = data.equipmentEfficiencyResp.research
    var RC1_data = RC1.map(item => item.efficiency)
    var RC1_xData = RC1.map(item => item.name)
    var RC2 = data.equipmentEfficiencyResp.bootRate
    var RC2_data = RC2.map(item => item.efficiency)
    var RC2_xData = RC2.map(item => item.name)
    var RC3 = data.equipmentEfficiencyResp.machineUtilization
    var RC3_data = RC3.map(item => item.efficiency)
    var RC3_xData = RC3.map(item => item.name)
    var RC4 = data.equipmentEfficiencyResp.workloadRate
    var RC4_data = RC4.map(item => item.efficiency)
    var RC4_xData = RC4.map(item => item.name)
    var RC5 = data.equipmentEfficiencyResp.intactRate * 100


    chartRC1.setOption({
      xAxis: {
        type: 'category',
        data: RC1_xData,
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          inside: false,
          interval: 0,
          // rotate: 90
        } 
        // axisLine:{show:false},
        // splitLine: {show: false}
      },
      yAxis: {
        type: 'value',
        splitLine: {
          // show:false
        },
        interval: 20,
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
      },
      series: [{
          data: RC1_data,
          type: 'bar',
          // color: function(params) { 
          //   var colorList = [ '#4a9ed9','#4dadb2', '#f6c142' ]; 
          //   return colorList[params.dataIndex] 
          // },
          color: blueStr,
          barWidth: '10',
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'top',
              }
            }
          }
      }],
      grid: {
        x:40,  //左留白
        y:10,   //上留白
        x2:20,  //右留白
        y2:25   //下留白
      }
    })
    chartRC2.setOption({
      xAxis: {
        type: 'category',
        data: RC2_xData,
        // boundaryGap: false,
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: false
        },
      },
      yAxis: {
        type: 'value',
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: false
        },
        interval: 20,
        // axisLabel: {
        //   interval: 800,
        //   formatter: '{value} kg'
        // }
      },
      series: [
        {
          name: '',
          type: 'bar',
          data: RC2_data,
          label: {
            show: true, //开启显示
            position: 'top',
          }
        }
      ],
      grid: {
        x:30,  //左留白
        y:10,   //上留白
        x2:10,  //右留白
        y2:25   //下留白
      }
    })
    chartRC3.setOption({
      xAxis: {
        type: 'category',
        data: RC3_xData,
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          inside: false,
          interval: 0,
          // rotate: 90
        } 
        // axisLine:{show:false},
        // splitLine: {show: false}
      },
      yAxis: {
        type: 'value',
        splitLine: {
          // show:false
        },
        interval: 20,
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
      },
      series: [{
          data: RC3_data,
          type: 'bar',
          color: yellowStr,
          barWidth: '20',
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'top',
              }
            }
          }
      }],
      grid: {
        x:40,  //左留白
        y:20,   //上留白
        x2:20,  //右留白
        y2:25   //下留白
      }
    })
    chartRC4.setOption({
      xAxis: {
        type: 'category',
        data: RC4_xData,
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          inside: false,
          interval: 0,
          // rotate: 90
        } 
        // axisLine:{show:false},
        // splitLine: {show: false}
      },
      yAxis: {
        type: 'value',
        splitLine: {
          // show:false
        },
        interval: 20,
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
      },
      series: [{
          data: RC4_data,
          type: 'bar',
          color: greenStr,
          barWidth: '20',
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'top',
              }
            }
          }
      }],
      grid: {
        x:40,  //左留白
        y:20,   //上留白
        x2:20,  //右留白
        y2:25   //下留白
      }
    })
    chartRC5.setOption({
      series: [
        {
            name: '完好率',
            type: 'gauge',
            splitNumber: 10,
            radius: '75%',
            title: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 5
              }
            },
            splitLine: {
              length: 5
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              width: 4
            },
            detail: {
              formatter: '{value}%',
              color: yellowStr
            },
            data: [{value: RC5, name: '完成率'}]
        }
      ]
    })
    chartRC6.setOption({
      xAxis: {
        type: 'category',
        data: ['CT1', 'CT2', 'CT3'],
        axisLine:{
          show:true,
          lineStyle: {
            color: '#fff',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          inside: false,
          interval: 0,
          // rotate: 90
        } 
        // axisLine:{show:false},
        // splitLine: {show: false}
    },
    yAxis: {
      type: 'value',
      splitLine: {
        // show:false
      },
      interval: 5,
      axisLine:{
        show:true,
        lineStyle: {
          color: '#fff',
          type: 'solid'
        }
      },
      axisTick: {
        show: false
      },
    },
    series: [{
        data: [9, 14, 15],
        type: 'bar',
        // color: function(params) { 
        //   var colorList = [ '#4a9ed9','#4dadb2', '#f6c142' ]; 
        //   return colorList[params.dataIndex] 
        // },
        color: '#c75658',
        barWidth: '20',
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: 'top',
            }
          }
        }
    }],
    grid: {
      x:40,  //左留白
      y:20,   //上留白
      x2:10,  //右留白
      y2:30   //下留白
    }
    })

  })
}
fetchData()
var timer = setInterval(function () {
  fetchData()
}, 10000);

function full(ele) {
  if (ele.requestFullscreen) {
      return ele.requestFullscreen();
  } else if (ele.mozRequestFullScreen) {
      return ele.mozRequestFullScreen();
  } else if (ele.webkitRequestFullscreen) {
      return ele.webkitRequestFullscreen();
  } else if (ele.msRequestFullscreen) {
      return ele.msRequestFullscreen();
  }
}


document.getElementById('fullScreen').addEventListener('click', function () {
  full(document.body).then(() => {
    console.log(1)
    document.getElementById('mask').style = 'display: none;'
    // initChart()
  })
})


  // MID
  var chartMap = echarts.init(document.getElementById('map'));
  var optionMap = {
    tooltip : {
        trigger: 'item',
        formatter: '{b}'
    },
    series : [{
        // name: '山东',
        type: 'map',
        mapType: 'CD',
        roam: false,
        top:'8%',
        zoom:1.2,
        x:'25%',
        selectedMode : 'single',//multiple多选
        itemStyle:{
            normal:{
                label:{
                    show:true,
                    textStyle: {
                        color: "#231816"
                    }
                },
                areaStyle:{color:'#B1D0EC'},
                color:'#B1D0EC',
                borderColor:'#dadfde'//区块的边框颜色
            },
            emphasis:{//鼠标hover样式
                label:{
                    show:true,
                    textStyle:{
                        color:'#fa4f04'
                    }
                },
                areaStyle:{color:'red'}
            }
        },
        data:[
            {name:'济南市',
                itemStyle: {
                    normal: {
                        areaColor: '#ffd811',
                        borderColor: '#edce00'
                    }
                }
            },
            {name:'德州市',
                itemStyle: {
                    normal: {
                        areaColor: '#13d5ff',
                        borderColor: '#0abcee'
                    }
                }
            }, 
            {name:'聊城市',
                itemStyle: {
                    normal: {
                        areaColor: '#92d050',
                        borderColor: '#1ca9f2'
                    }
                }
            },
            {name:'泰安市',
                itemStyle: {
                    normal: {
                        areaColor: '#88ddf5',
                        borderColor: '#88ddf5',
                    }
                }
            },
            // {name:'莱芜市',
            //     itemStyle: {
            //         normal: {
            //             areaColor: '#13d5ff',
            //             borderColor: '#45b5ef',
            //         }
            //     }
            // },
            {name:'菏泽市',
                itemStyle: {
                    normal: {
                        areaColor: '#13d5ff',
                        borderColor: '#45b5ef'
                    }
                }
            },
            {name:'枣庄市',
                itemStyle: {
                    normal: {
                        areaColor: '#45b5ef',
                        borderColor: '#45b5ef',
                    }
                }
            },
            {name:'济宁市',
                itemStyle: {
                    normal: {
                        areaColor: '#ffd811',
                        borderColor: '#45b5ef',
                    }
                }
            },
            {name:'临沂市',
                itemStyle: {
                    normal: {
                        areaColor: '#ffa312',
                        borderColor: '#45b5ef',
                    }
                }
            },
            {name:'青岛市',
                itemStyle: {
                    normal: {
                        areaColor: '#92d050',
                        borderColor: '#1ca9f2'
                    }
                }
            },
            {name:'烟台市',
                itemStyle: {
                    normal: {
                        areaColor: '#88ddf5',
                        borderColor: '#88ddf5',
                    }
                }
            },
            {name:'威海市',
                itemStyle: {
                    normal: {
                        areaColor: '#13d5ff',
                        borderColor: '#45b5ef',
                    }
                }
            },
            {name:'潍坊市',
                itemStyle: {
                    normal: {
                        areaColor: '#13d5ff',
                        borderColor: '#45b5ef'
                    }
                }
            },
            {name:'淄博市',
                itemStyle: {
                    normal: {
                        areaColor: '#45b5ef',
                        borderColor: '#45b5ef',
                    }
                }
            },
            {name:'滨州市',
                itemStyle: {
                    normal: {
                        areaColor: '#13d5ff',
                        borderColor: '#45b5ef',
                    }
                }
            },
            {name:'东营市',
                itemStyle: {
                    normal: {
                        areaColor: 'red',
                        borderColor: '#971d2b',
                    }
                }
            },
            {name:'日照市',
                itemStyle: {
                    normal: {
                        areaColor: 'red',
                        borderColor: '#971d2b',
                    }
                }
            },
        ]
    }]
  }
  $.get("/js/shandong2.json", function (chinaJson) {
    echarts.registerMap('CD', chinaJson);
    chartMap.setOption(optionMap)
  });
// }
// console.log(myChart)
setTimeout(function (){
  window.onresize = function () {
    chartA1.resize();
    chartA2.resize();
    chartA3.resize();
    chartA4.resize();
    chartB2.resize();
    chartC1.resize();
    chartC2.resize();
    chartMap.resize();
    chartMB1.resize();
    chartMB2.resize();
    chartMB3.resize();
    chartMB4.resize();
    chartMC1.resize();
    chartMC3.resize();
    chartMD1.resize();
    chartRA1.resize();
    chartRA2.resize();
    chartRA3.resize();
    chartRC1.resize();
    chartRC2.resize();
    chartRC3.resize();
    chartRC4.resize();
    chartRC5.resize();
    chartRC6.resize();
  }
},200)
