import { KeepAccount } from 'keepAccount-model.js';
import { Layer } from '../../utils/layer.js';
import { FormCheck } from '../../utils/form-check.js';
var formCheck = new FormCheck();
var keepAccount = new KeepAccount();
Page({
  data: {
    curIndex: 0,
    hideImage: false,
    ImageUrl:"https://x2018062501.aweyu.cn",
    click:false,
    category_name:"",
    spendinginput:'',
    remarksinput: '',
    loading: true
  },
  onLoad: function (options) {
  
  },
  onTab: function (e) {
    const index = parseInt(e.currentTarget.dataset.index)
    this.setData({
      curIndex: index
    })
  },
  ondetailType: function(){
    wx.navigateTo({
      url: '../detailType/detailType',
    })
  },
  onShow: function () {
    keepAccount.getCategory((res) =>{
      this.setData({
        spending:res.data,
        loading: false
      })
    })
    keepAccount.getSingleCategory((res)=>{
        this.setData({
          single: res.data
        })
      
    })
  },
  onChangeImg: function (e) {
    this.setData({
      click: e.currentTarget.dataset.imgid,
      category_name: e.currentTarget.dataset.name,
      category_id: e.currentTarget.dataset.itemid
    })
  },
  spendinginput: function(e){
    this.setData({
      spendinginput: e.detail.value
    })

  },
  remarksinput: function (e) {
    this.setData({
      remarksinput: e.detail.value
    })
  },
  onSubmit: function (e) {
    var that = this
    var formValue = e.detail.value
    var formCheck = new FormCheck(formValue);
    formCheck.check((res) => {
      if (this.data.category_name == ""){
        Layer.fail('请选择类型');
      }else{
        wx.showToast({
          title: '保存中',
          icon: 'loading',
          mask: true,
          duration: 2000
        });
        let account = {
          category_id: that.data.category_id,
          price: that.data.spendinginput,
          note: that.data.remarksinput,
          type_id: 2
        }
        keepAccount.AddBill(account, (res) => {
          if (res.code == 200) {
            wx.hideLoading();
            setTimeout(() => {
              Layer.success('保存成功');
            }, 300)
            that.onShow();
          }
        })
      }
    }, (res) => {
      Layer.fail(res.msg);
    })
  },
  onIncome: function(e){
    var that = this
    var formValue = e.detail.value
    var formCheck = new FormCheck(formValue);
    formCheck.check((res) => {
      console.log(formValue)
      if (this.data.category_name == "") {
        Layer.fail('请选择类型');
      }else{
        wx.showToast({
          title: '保存中',
          icon: 'loading',
          mask: true,
          duration: 2000
        });
        let account = {
          category_id: that.data.category_id,
          price: that.data.spendinginput,
          note: that.data.remarksinput,
          type_id: 1
        }
        keepAccount.AddBill(account, (res) => {
          if (res.code == 200) {
            wx.hideLoading();
            setTimeout(() => {
              Layer.success('保存成功');
            }, 300)
            that.onShow();
          }
        })
      }
    }, (res) => {
      Layer.fail(res.msg);
    })
  },
  onSave: function(){
    if (this.data.category_name == "") {
      Layer.fail('请选择类型');
    } else if (this.data.spendinginput <= 0 || !this.data.spendinginput.match(/^[1-9]\d*$/)){
      Layer.fail('支出金额不正确');
    } else if (this.data.remarksinput == '') {
      Layer.fail('备注不正确');
    }else{
      wx.showToast({
        title: '保存中',
        icon: 'loading',
        mask: true,
        duration: 2000
      });
      let account = {
        category_id: this.data.category_id,
        price: this.data.spendinginput,
        note: this.data.remarksinput,
        type_id: 2
      }
      keepAccount.AddBill(account,(res)=>{
        if(res.code == 200){
          setTimeout(() => {
            Layer.success('保存成功');
          }, 800)
          setTimeout(()=>{
            wx.navigateBack();
          },1500)
        }
      })
    }
  },
  onIncomeSave: function(){
    if (this.data.category_name == "") {
      Layer.fail('请选择类型');
    } else if (this.data.spendinginput == '' || !this.data.spendinginput.match(/^[1-9]\d*|0$/)) {
      Layer.fail('支出金额不正确');
    } else if (this.data.remarksinput == '') {
      Layer.fail('备注不正确');
    } else {
      wx.showToast({
        title: '保存中',
        icon: 'loading',
        mask: true,
        duration: 2000
      });
      let account = {
        category_id: this.data.category_id,
        price: this.data.spendinginput,
        note: this.data.remarksinput,
        type_id: 1
      }
      keepAccount.AddBill(account, (res) => {
        if (res.code == 200) {
          setTimeout(() => {
            Layer.success('保存成功');
          }, 800)
          setTimeout(() => {
            wx.navigateBack();
          }, 1500)
        }
      })
    }
  }
})