import { PublicComment } from 'publicComment-model.js';
import { Layer } from '../../utils/layer.js';
var publicComment = new PublicComment();
Page({
  data: {
    disabledBtn:false
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },
  onShow: function () {
  },
  onSubmit: function (e) {
    var formValue = e.detail.value
    if (formValue.content == "") {
      Layer.fail('内容不正确');
    } else {
      Layer.loading();
      publicComment.getPostComment(this.data.id,formValue.content, (res) => {
        if (res.code == 200) {
          wx.hideLoading();
          setTimeout(()=>{
            Layer.success('评论成功');
          },300)
          let pages = getCurrentPages()
          let prevPage = pages[pages.length - 2]
          prevPage.setData({
            id: this.data.id
          })
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            })
          },800)
          
        }
      })
    }
  }
  
})