import { Base } from '../../utils/base.js';

class Addbudget extends Base {
  constructor() {
    super();
  }

  getUserGet(callBack) {
    var params = {
      url: 'user/get',
      method: 'GET',
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
  getUserChange(budget,tips,balance,callBack) {
    var params = {
      url: 'user/change',
      method: 'POST',
      data: { budget, tips, balance },
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
}

export { Addbudget };