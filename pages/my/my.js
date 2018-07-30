import { My } from 'my-model.js';
import { Layer } from '../../utils/layer.js';
var app = getApp();
var my = new My();
Page({
  data: {
    currentTab: 0,
    loading: false,
  },
  onLoad: function () {
    
  },

  onShow: function (options) {
    
  },
  onOpinionTap: function () {
    wx.navigateTo({
      url: '../opinion/opinion',
    })
  },
  onClearStorageTap: function(){
    wx.showModal({
      title: '清除缓存',
      content: '确定清除缓存吗',
      confirmColor: "#538afe",
      success: function (res) {
        if (res.confirm) {
          wx.clearStorage();
          setTimeout(() => {
            Layer.success('清除成功！')
          }, 300)
        }
      }
    })
  },
  onAboutTap: function(){
    wx.navigateTo({
      url: '../about/about',
    })
  }
})