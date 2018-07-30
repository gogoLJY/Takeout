import { Base } from '../../utils/base.js';

class KeepAccount extends Base {
  constructor() {
    super();
  }

  getCategory(callBack) {
    var params = {
      url: 'category/get',
      method: 'GET',
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
  getUsercheck(callBack) {
    var params = {
      url: 'user/check',
      method: 'GET',
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
  getSingleCategory(callBack) {
    var params = {
      url: 'category/single',
      method: 'GET',
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
  AddBill(account,callBack) {
    var params = {
      url: 'bill/add',
      method: 'POST',
      data: account,
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
}

export { KeepAccount };