import { Option } from 'option-model.js';
import { Layer } from '../../utils/layer.js';
var option = new Option();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textAreaInput:""
  },

  onLoad: function (options) {
  },
  onTextAreaInput: function (e) {
    this.setData({
      textAreaInput: e.detail.value
    })
  },
  onSubmit: function (e) {
    if (this.data.textAreaInput == ""){
      Layer.fail('意见不正确');
    }else{
      wx.showToast({
        title: '提交中',
        icon: 'loading',
        mask: true,
        duration: 2000
      });
      option.PostOpinion(this.data.textAreaInput,(res)=>{
        if(res.code == 200){
          wx.hideLoading();
          setTimeout(() => {
            Layer.success('提交成功');
          }, 300)
          setTimeout(() => {
            wx.navigateBack();
          }, 1500)
        }
      })
    }
  },

  
  onShow: function () {
    
  }
})