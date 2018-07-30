// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'020-5201314'
  },

  
  onLoad: function (options) {
  
  },

  onReady: function () {
  
  },


  onShow: function () {
  
  },
  onphone: function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  }


})