import { FormCheck } from '../../utils/form-check.js';
import { Addbudget } from 'addbudget-model.js';
import { Layer } from '../../utils/layer.js';
var addbudget = new Addbudget();
var formCheck = new FormCheck();
Page({
  data: {
    loading:true
  },
  onLoad: function (options) {
    setTimeout(()=>{
      addbudget.getUserGet((res) => {
        this.setData({
          budget: res.data,
          dataIndex: res.data.user.tips,
          loading:false
        })
        if (res.data.user.tips === 0) {
          this.setData({
            hidebudget: false
          })
        } else {
          this.setData({
            hidebudget: true
          })
        }
      })
    },800)
    
  },
  onReady: function () {
  
  },
  ChangeSwitch: function(e){
    console.log(e.detail.value);
    var index = e.detail.value? 1 : 0;
    this.setData({
      hidebudget: e.detail.value,
      dataIndex: index
    })
  },
  onSubmit: function (e) {
    var that = this
    var formValue = e.detail.value
    var formCheck = new FormCheck(formValue);
    console.log(!formValue.budgetPrice.match(/^[1-9]\d*|0$/));
    formCheck.check((res) => {
      if (formValue.budgetPrice < 0 || !formValue.budgetPrice.match(/^[1-9]\d*|0$/)){
        Layer.fail('金额不正确');
      } else if (formValue.settlement < 0 || !formValue.settlement.match(/^[1-9]\d*|0$/)){
        Layer.fail('预算金额不正确');
      }else{
        addbudget.getUserChange(formValue.budgetPrice, that.data.dataIndex, formValue.settlement, (res) => {
          console.log(res);
          if (res.code == 200) {
            Layer.success('保存成功', () => {
              setTimeout(() => {
                wx.navigateBack()
              }, 800)
            });
          }
        })
      }
    }, (res) => {
      Layer.fail(res.msg);
    })
  },
  onShow: function () {

  },
  onHide: function () {
  
  },
})