var wxCharts = require('../../utils/wxcharts.js');
import { Chart } from 'chart-model.js';
import { Layer } from '../../utils/layer.js';
var chart = new Chart();
var ringChart = null;
var IncomeChart = null;
Page({

  data: {
    time: "",
    Incometime:"",
    EndDate: "",
    startDate: "",
    curIndex: 0,
    loading: true
  },

  onLoad: function (options) {
    this.setData({
      optionTime: options.time,
      time: this.translateTime('', options.time * 1000),
      Incometime: this.translateTime('', options.time * 1000),
      startDate: this.getStartTime(),
      EndDate: this.getCurrentTime(),
      preDate: this.getPreTime()
    })
   
  },
  onShow: function () {
    chart.getBillChart(this.data.optionTime, 2, (res) => {
      this.setData({
        chart: res.data,
        loading:false
      })
    })
    chart.getBillChart(this.data.optionTime, 1, (res) => {
      this.setData({
        IncomeChart: res.data,
        loading: false
      })
    })
 
    setTimeout(()=>{
      this._onload(this.data.chart);
      this._onIncomeChart(this.data.IncomeChart);
    },800)
  },
  getPreTime: function () {
    var n = Date.parse(new Date());
    return this.translateTime('pre', n);
  },
  getCurrentTime: function () {
    var n = Date.parse(new Date());
    return this.translateTime('cur', n);
  },
  getStartTime: function () {
    var n = Date.parse(new Date());
    return this.translateTime('', n);
  },
  changeTime: function (e) {//支出的picker
    var time = e.detail.value;
    console.log(time);
    if (time != "null") {
      this.setData(
        { time: time }
      )
    }
    chart.getBillChart(Date.parse(time) / 1000 - 28800, 2, (res) => {
      console.log(res);
      if(res.code == 0){
        Layer.fail('该月无支出');
      }
      this.setData({
        chart: res.data,
        loading: false
      })
    })
    console.log(this.data.chart)
    setTimeout(() => {
      this._onload(this.data.chart);
    }, 500)
  },
  changeIncomeTime: function(e){//收入的picker
    var Incometime = e.detail.value;
    if (Incometime != "null") {
      this.setData(
        { Incometime: Incometime }
      )
    }
    chart.getBillChart(Date.parse(Incometime) / 1000 - 28800, 1, (res) => {
      console.log(res);
      if (res.code == 0) {
        Layer.fail('该月无收入');
      }
      this.setData({
        IncomeChart: res.data,
      })
    })
    setTimeout(() => {
      this._onload(this.data.IncomeChart);
    }, 500)
  },
  translateTime: function (str, n) {
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    if (str == "pre") {
      var Y = Y - 1;
      var M = parseInt(M) + 1;
    }
  
    return Y + '-' + M;
  },
  onTab: function (e) {
    const index = parseInt(e.currentTarget.dataset.index)
    this.setData({
      curIndex: index
    })
    if (index==0){
      this._onload(this.data.chart);
    }else{
      this._onIncomeChart(this.data.IncomeChart);
    }
    
  },
  /**
   * 画图表
   */
  touchHandler: function (e) {
    console.log(ringChart.getCurrentDataIndex(e));
  },
  _onload: function (chart) {

    var windowWidth = 375;
    ringChart = new wxCharts({
      animation: true,
      canvasId: 'ringCanvas',
      type: 'ring',
      extra: {
        ringWidth: 30,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name: '总支出',
        color: '#333',
        fontSize: 12,
        backgroundColor: '#000'
      },
      subtitle: {
        name: chart.total,
        color: '#333',
        fontSize: 25
      },
      series: [
        {
          name: '饮食',
          data: chart.diet,
          color:'#FFBE40',
          stroke: false
        }, 
        {
          name: '购物',
          data: chart.shopping,
          color: '#F96C55',
          stroke: false
        }, 
        {
          name: '学习',
          data: chart.learning,
          color:'#8555F9',
          stroke: false
        }, 
        {
          name: '出行',
          data: chart.travel,
          color:'#63e086',
          stroke: false
        },
        {
          name: '医疗',
          data: chart.medical,
          color: '#54c0fc',
          stroke: false
        },
        {
          name: '娱乐',
          data: chart.entertainment,
          color: '#8bc34a',
          stroke: false
        }
        ],
      width: windowWidth,
      height: 300,
      dataLabel: true,
      legend: true,
      background: '#fff',
      padding: 0
    });
    ringChart.addEventListener('renderComplete', () => {
       console.log('renderComplete');
    });
    setTimeout(() => {
      ringChart.stopAnimation();
    }, 800);
  },
  _onIncomeChart: function (Incomechart) {

    var windowWidth = 375;
    ringChart = new wxCharts({
      animation: true,
      canvasId: 'IncomeCanvas',
      type: 'ring',
      extra: {
        ringWidth: 30,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name: '总收入',
        color: '#333',
        fontSize: 12,
        backgroundColor: '#000'
      },
      subtitle: {
        name: Incomechart.total,
        color: '#333',
        fontSize: 25
      },
      series: [
        {
          name: '饮食',
          data: Incomechart.diet,
          color: '#FFBE40',
          stroke: false
        },
        {
          name: '购物',
          data: Incomechart.shopping,
          color: '#F96C55',
          stroke: false
        },
        {
          name: '学习',
          data: Incomechart.learning,
          color: '#8555F9',
          stroke: false
        },
        {
          name: '出行',
          data: Incomechart.travel,
          color: '#63e086',
          stroke: false
        },
        {
          name: '医疗',
          data: Incomechart.medical,
          color: '#54c0fc',
          stroke: false
        },
        {
          name: '娱乐',
          data: Incomechart.entertainment,
          color: '#8bc34a',
          stroke: false
        }
      ],
      width: windowWidth,
      height: 300,
      dataLabel: true,
      legend: true,
      background: '#fff',
      padding: 0
    });
    ringChart.addEventListener('renderComplete', () => {
      console.log('IncomechartComplete');
    });
    setTimeout(() => {
      ringChart.stopAnimation();
    }, 800);
  },
})