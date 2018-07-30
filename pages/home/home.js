import {Home} from 'home-model.js';
import { Layer } from '../../utils/layer.js';
var home = new Home();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    hideAlert: true,
    hideAccount: false,
    isRegister:false,
    time:"",
    PickerTime:"",
    EndDate:"",
    startDate:"",
    changeTime:"",
    curIndex: 0,
    income: [],
    spending: [],
    AlertText: "亲爱的小主",
    settleDisabled: true
  },
  onLoad: function (options) {
    let startDate = this.getStartTime();
    this.setData({
      time: startDate.startDate,
      iphoneTime: startDate.iphoneTime,
      startDate: startDate.startDate,
      EndDate: this.getCurrentTime(),
      preDate: this.getPreTime(),
      changeTime: startDate.changeTime,
      settleDisabled: true,
      hideAccount: false
    })
    if (this.data.changeTime == ""){
    }else{
      this.setData({
        changeTime: startDate.changeTime
      })
    }
    var sysTime = this.data.startDate.replace('年', '/').replace('月', '/');
    setTimeout(()=>{
      this.setData({
        loading: false
      })
      home.getBillAll(Date.parse(startDate.iphoneTime) / 1000, (res) => {
        console.log(res);
        let comes = this._come(res.data.bill);
        let bill = this.same(res.data.bill);
        this.setData({
          data: res.code,
        })
        if (res.code == 0) {
          this.setData({
            hideAlert: false,
            AlertText: "请添加预算",
          })
        } else {
          this.setData({
            bill: res.data,
            income: comes.income,
            spending: comes.spending,
            balance: res.data.detail.balance,
          })
        }
      })
      home.getUsercheck((res) => {
        if (res.data.tips === 1) {
          if (this.data.balance <= res.data.budget) {
            this.setData({
              changeColor: true
            })
          }
        }else{
          this.setData({
            changeColor: false
          })
        }
      })
    },2000)
   
  },
  onShow: function () {
    this.onLoad();
    home.checkRegister((res) => {
      if (!res) {
        this.setData({
          isRegister: false,
        })
      }
      else {
        this.setData({
          isRegister: true,
        })
      }
    })
  },
  same: function(bill){
      
  },
  _come: function (comes) {
    this.data.spending = [];//支出
    this.data.income = [];//收入
    for (let i in comes) {
      if (comes[i].type === 2) {
        this.data.spending.push(comes[i]);
      } else{
        this.data.income.push(comes[i]);
      }
    }
    return { income: this.data.income, spending: this.data.spending };
  },
  getPreTime: function(){
    var n = Date.parse(new Date());
    
    return this.translateTime('pre', n);
  },
  getCurrentTime:function(){
    var n = Date.parse(new Date());
    return this.translateTime('cur',n);
  },
  getStartTime: function () {
    var n = Date.parse(new Date());
    return this.translateTime('', n);
  },
  changeTime: function (e) {//切换时间
    var time = e.detail.value;
    var thisTime = this.getStartTime().startDate.replace('年', '/').replace('月', '/') + '01';
    if (Date.parse(time) / 1000 < Date.parse(thisTime)/1000){
      this.setData({
        hideAccount:true,
        settleDisabled:false
      })
    }else{
      this.setData({
        settleDisabled:true,
        hideAccount: false
      }) 
    }
    this.setData({
      changeTime: this.translateTime('cTime', Date.parse(time))
    })
    var resData = time.replace('-', '年') + '月';
    if (time != "null") {
      this.setData(
        { time: resData }
      )
    }
    home.getBillAll(Date.parse(time) / 1000 - 28800, (res) => {
      console.log(res);
      if(res.code == 1){
        Layer.fail('本月未添加预算');
        this.setData({
          bill: [],
          income: [],
          spending: [],
        })
      }else{
        this.setData({
          bill: res.data,
          loading: false
        })
      }
    })
  },
  translateTime: function(str,n){
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = date.getMonth() + 1  ;
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    
    if (str == "pre" || str == "cur"){
      if (str == "pre"){
        var Y = Y - 1;
        var M = M + 1;
      }
      return Y + '-' + M;
    } else if (str =='cTime'){
      return M + '月';
    }else{
      return { 
        startDate: Y + '年' + M + '月', 
        changeTime: M + '月', 
        iphoneTime: Y + '/' + M + '/' + '01' + " " + "00" + ":" + "00" + ":" + "00"}; 
    }
  },

  onTab: function (e) {
    const index = parseInt(e.currentTarget.dataset.index)
    this.setData({
      curIndex: index
    })
  },
  onAddBudget: function(){
    wx.navigateTo({
      url: '../addbudget/addbudget',
    })
  },
  onEditAccount: function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../editAccount/editAccount?id=' + e.currentTarget.dataset.id,
    })
  },
  onChart: function(){
    var time = Date.parse(this.data.time.replace('年', '/').replace('月', '/') + '01')
    wx.navigateTo({
      url: '../chart/chart?time=' + time / 1000,
    })
  },
  onKeepAccount: function(){
    wx.navigateTo({
      url: '../keepAccount/keepAccount',
    })
  },
  onHideAlert: function(){
    this.setData({
      hideAlert: true,
    })
    wx.navigateTo({
      url: '../addbudget/addbudget',
    })
  },
  login: function (e) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        home.onRegister(e.detail.userInfo.nickName, e.detail.userInfo.avatarUrl, (res) => {
          if (res.code == 200) {
            setTimeout(() => {
              that.setData({
                isRegister: true,
              })
            }, 500)
          }
        })
      }
    })
  }

})