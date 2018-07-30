import { Layer } from '../../utils/layer.js';
import { EditAccount } from 'editAccount-model.js';
var editAccount = new EditAccount();
Page({

  data: {
    btnIndex: 1,
    priceInput:'',
    remarksInput:"",
    priceFocus: false,
    inputDisable:true,
    textDisable:true,
    textFocus: false
  },

  onLoad: function (options) {
    this._loaddata(options.id);
    this.setData({
      id: options.id
    })
  },
  _loaddata: function(id){
    editAccount.getDetailBill(id,(res) => {
      console.log(res)
      console.log(this.oncreate_time(res.data.create_time))
      this.setData({
        detail: res.data,
        create_time: this.oncreate_time(res.data.create_time)
      })
    })
  },
  oncreate_time: function (n){
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return Y + '-' + M + '-' + D
  },
  onPriceInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      priceInput:e.detail.value
    })
  },
  onremarksInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      remarksInput: e.detail.value
    })
  },
  onShow: function () {
  },
  onBlur: function(){
    this.setData({
      textFocus:true,
    })
  },
  onedit: function(){
    this.setData({
      btnIndex:2,
      priceFocus: true,
      textDisable: false,
      inputDisable:false
    })
  },
  onSubmit: function(e){
    var formValue = e.detail.value
    if (formValue.remarksInput == ''){
      Layer.fail('备注不正确');
    } else if (formValue.priceInput == '' || !formValue.priceInput.match(/^[1-9]\d*|0$/)) {
      Layer.fail('金额不正确');
    }else{
      console.log(this.data.id)
      editAccount.getChangeBill(this.data.id, formValue.priceInput, formValue.remarksInput,(res) => {
        console.log(res);
        if(res.code == 200){
          Layer.success('保存成功');
          setTimeout(()=>{
            wx.navigateBack()
          },1500)
        }
      })
    }

   
  }
})