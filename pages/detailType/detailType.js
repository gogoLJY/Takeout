
import { DetailType } from 'detailType-model.js';
import { Layer } from '../../utils/layer.js';
var detailType = new DetailType();

Page({
  data: {
    ImageUrl:"https://x2018062501.aweyu.cn",
    imgIndex: false,
    category_name: "",
    loading: true
  },
  onLoad: function (options) {
  
  },
  onShow: function () {
    detailType.getAllcategory((res) =>{
      this.setData({
        category: res.data,
        loading: false        
      })
    })
  },
  onChangeImg: function (e) {
    this.setData({
      imgIndex: e.currentTarget.dataset.imgid,
      category_name: e.currentTarget.dataset.name,
      category_id: e.currentTarget.dataset.itemid
    })
  },
  onFinish: function(){
    if (this.data.category_name == ''){
      Layer.fail('请选择类型');
    }else{
      detailType.Sendcategory(this.data.category_id,(res)=>{
        setTimeout(function(){
          wx.navigateBack();
        },800)
      })
    }
  }
})