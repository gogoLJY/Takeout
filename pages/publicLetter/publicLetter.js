import { PublicLetter } from 'publicLetter-model.js';
import { Layer } from '../../utils/layer.js';
var publicLetter = new PublicLetter();
Page({

 
  data: {
  },
  onLoad: function (options) {
  
  },

  onShow: function () {
    
  },
  onSubmit:function(e){
    var formValue = e.detail.value
    if (formValue.content == "") {
      Layer.fail('内容不正确');
    } else {
      wx.showToast({
        title: '发布中',
        icon: 'loading',
        mask: true,
        duration: 2000
      });
      publicLetter.getAddPost(formValue.content,(res)=>{
        if(res.code ==200){
          wx.hideLoading();
          setTimeout(() =>{
            Layer.success('发布成功');
          },300)
          setTimeout(() => {
            wx.navigateBack();
          }, 1500)
        }
      })
    }
  }
})