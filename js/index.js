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
        y2:40   //下留白
      }
    })
  
  // L  C
    var LC1 = data.eqOperationIndexVo.overload
    var LC2 = data.eqOperationIndexVo.lowload
    var LC1_data = LC1.map(item => item.count)
    var LC1_xData = LC1.map(item => item.name)
    var LC2_data = LC2.map(item => item.count)
    var LC2_xData = LC2.map(item => item.name)
  
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




  var value = 0.8, // 值，0~1之间
  startAngle = 215, // 开始角度
  endAngle = -35, // 结束角度
  splitCount = 60, // 刻度数量
  pointerAngle = (startAngle - endAngle) * (1 - value) + endAngle;
  var chartMBOption = {
    series: [
      {
        type: 'gauge',
        radius: '90%',
        startAngle: pointerAngle,
        endAngle: endAngle,
        splitNumber: 1,
        axisLine: {
          show: false,
          lineStyle: {
            width: 3,
            opacity: 0
          }
        },
        title: { show: false },
        detail: { show: false },
        splitLine: { show: false },
        axisTick: {
          length: 10,
          splitNumber: Math.ceil((1 - value) * splitCount),
          lineStyle: {
            color: '#001242',
            width: 3
          }
        },
        axisLabel: { show: false },
        pointer: { show: false },
        itemStyle: {},
        markPoint: {
          animation: false,
          silent: false,
          data: [
            {
              symbol: 'image://' + document.getElementById('round1').src,
              x: '50%',
              y: '50%',
              symbolSize: 280,
              itemStyle: {
                borderWidth: 3
              }
            },
            {
              symbol: 'circle',
              symbolSize: 200
            }
          ]
        },
        data: [
          {
            value: value,
            name: 'test gauge'
          }
        ]
      },
      {
        type: 'gauge',
        radius: '90%',
        startAngle: startAngle,
        endAngle: pointerAngle,
        splitNumber: 1,
        axisLine: {
          show: false,
          lineStyle: {
            width: 3,
            opacity: 0
          }
        },
        title: { show: false },
        detail: { show: false },
        splitLine: { show: false },
        axisTick: {
          length: 10,
          splitNumber: Math.ceil(value * splitCount),
          lineStyle: {
            color: {
              image: document.getElementById('bg_img'),
              repeat: 'no-repeat'
            },
            width: 1
          }
        },
        axisLabel: { show: false },
        pointer: { show: false },
        itemStyle: {},
        data: [
          {
            value: value,
            name: 'test gauge'
          }
        ]
      },
      {
        type: 'gauge',
        radius: '95%',
        startAngle: pointerAngle,
        endAngle: pointerAngle,
        splitNumber: 1,
        axisLine: {
          show: false,
          lineStyle: {
            width: 3,
            opacity: 0
          }
        },
        title: { show: false },
        detail: { show: false },
        splitLine: { show: false },
        axisTick: {
          length: 15,
          splitNumber: 1,
          lineStyle: {
            color: {
              image: document.getElementById('bg_img'),
              repeat: 'no-repeat'
            },
            width: 3
          }
        },
        axisLabel: { show: false },
        pointer: { show: false },
        itemStyle: {},
        data: [
          {
            value: value,
            name: 'test gauge'
          }
        ]
      }
    ]
  }
  // chartMB1.setOption(chartMBOption)
  // chartMB1.setOption(chartMBOption)
  // chartMB2.setOption(chartMBOption)
  // chartMB3.setOption(chartMBOption)
  // chartMB4.setOption(chartMBOption)

  var chartMD1 = echarts.init(document.getElementById('chartMD1'));

  chartMD1.setOption({
    xAxis: {
      type: 'category',
      data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
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
        data: [0,100,200,330,400,900,800,300,200,100,400,200,700,100,300,900,200,300,100,400,0,200,300,100],
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


  // RIGHT

  var chartRA1 = echarts.init(document.getElementById('chartRA1'));
  var chartRA2 = echarts.init(document.getElementById('chartRA2'));
  var chartRA3 = echarts.init(document.getElementById('chartRA3'));
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
        data: [
          {value: 15, name: '一级'},
          {value: 15, name: '二级'},
          {value: 30, name: '三级'},
          {value: 40, name: '其他'}
        ],
        itemStyle: {
          color: function(params) { 
            var colorList = [ '#4a9ed9','#4dadb2', '#f6c142', '#c75658' ]; 
            return colorList[params.dataIndex] 
          }
        }
      }
    ]
  })
  chartRA2.setOption({
    xAxis: {
      type: 'category',
      data: ['一级', '二乙', '二甲', '三乙', '三甲', '其他'],
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
      data: [45, 46, 43, 25, 34, 12, 55],
      type: 'bar',
      // color: function(params) { 
      //   var colorList = [ '#4a9ed9','#4dadb2', '#f6c142' ]; 
      //   return colorList[params.dataIndex] 
      // },
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
  }],
  grid: {
    x:40,  //左留白
    y:10,   //上留白
    x2:10,  //右留白
    y2:40   //下留白
  }
  })
  chartRA3.setOption({
    xAxis: {
      type: 'category',
      data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      axisLine:{
        show: true,
        lineStyle: {
          color: '#fff'
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
      interval: 5,
    },
    series: [
      {
        type: 'line',
        data: [5,3,10,13,4,2,15,16,2,19,8,20,14,20,12,4,16,19,6,9],
        itemStyle: {
          normal: {
            lineStyle: {
              color: '#f6c142'
            }
          }
        }
      }
    ],
    grid: {
      x:24,  //左留白
      y:20,   //上留白
      x2:20,  //右留白
      y2:30   //下留白
    }
  })

  
  var chartRC1 = echarts.init(document.getElementById('chartRC1'));
  var chartRC2 = echarts.init(document.getElementById('chartRC2'));
  var chartRC3 = echarts.init(document.getElementById('chartRC3'));
  var chartRC4 = echarts.init(document.getElementById('chartRC4'));
  var chartRC5 = echarts.init(document.getElementById('chartRC5'));
  var chartRC6 = echarts.init(document.getElementById('chartRC6'));
  chartRC1.setOption({
    xAxis: {
      type: 'category',
      data: ['', '', '', '', '', ''],
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
        data: [45, 46, 43, 25, 34, 12],
        type: 'bar',
        // color: function(params) { 
        //   var colorList = [ '#4a9ed9','#4dadb2', '#f6c142' ]; 
        //   return colorList[params.dataIndex] 
        // },
        color: '#c75658',
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
      y2:10   //下留白
    }
  })
  chartRC2.setOption({
    xAxis: {
      type: 'category',
      data: ['', '', '', '', '', '', ''],
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
        type: 'line',
        data: [10,13,16,13,14,19,90],
        itemStyle: {
          normal: {
            lineStyle: {
              color: '#f6c142'
            }
          }
        }
      },
      {
        name: '',
        type: 'line',
        data: [80,19,40,61,14,42,20],
        itemStyle: {
          normal: {
            lineStyle: {
              color: '#4dadb2'
            }
          }
        }
      },
      {
        name: '',
        type: 'line',
        data: [50,90,60,10,100,40,30],
        itemStyle: {
          normal: {
            lineStyle: {
              color: '#4a9ed9'
            }
          }
        }
      },
      {
        name: '',
        type: 'line',
        data: [30,20,90,60,30,60,40],
        itemStyle: {
          normal: {
            lineStyle: {
              color: '#c75658'
            }
          }
        }
      }
    ],
    grid: {
      x:30,  //左留白
      y:10,   //上留白
      x2:10,  //右留白
      y2:10   //下留白
    }
  })
  chartRC3.setOption({
    xAxis: {
      type: 'category',
      data: ['', '', ''],
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
        data: [96, 95, 98],
        type: 'bar',
        // color: '#c75658',
        barWidth: '20',
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: 'top',
            },
            color: function(params) { 
              var colorList = [ '#4a9ed9','#4dadb2', '#f6c142' ]; 
              return colorList[params.dataIndex] 
            }
          }
        }
    }],
    grid: {
      x:40,  //左留白
      y:20,   //上留白
      x2:20,  //右留白
      y2:10   //下留白
    }
  })
  chartRC4.setOption({
    xAxis: {
      type: 'category',
      data: ['', '', ''],
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
        data: [109, 113, 89],
        type: 'bar',
        // color: '#c75658',
        barWidth: '20',
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: 'top',
            },
            color: function(params) { 
              var colorList = [ '#4a9ed9','#4dadb2', '#f6c142' ]; 
              return colorList[params.dataIndex] 
            }
          }
        }
    }],
    grid: {
      x:40,  //左留白
      y:20,   //上留白
      x2:20,  //右留白
      y2:10   //下留白
    }
  })

  chartRC5.setOption({
    series: [
      {
          name: '业务指标',
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
          data: [{value: 50, name: '完成率'}]
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
