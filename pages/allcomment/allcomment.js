
import { AllComment } from 'allcomment-model.js';
import { Layer } from '../../utils/layer.js';
var allComment = new AllComment();

Page({
  data: {
  
  },

  onLoad: function (options) {
  
  },
  onShow: function () {
    allComment.getDynamic((res)=>{
      console.log(res);
      this.setData({
        like:res.data.like,
        comment: res.data.comment
      })
    })
  },
  ondetail: function(e){
    wx.navigateTo({
      url: '../replyComment/replyComment?id=' + e.currentTarget.dataset.id,
    })
  }
})