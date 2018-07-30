import { Base } from '../../utils/base.js';

class DetailType extends Base {
  constructor() {
    super();
  }

  getAllcategory(callBack) {
    var params = {
      url: 'category/all',
      method: 'GET',
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
  Sendcategory(id,callBack) {
    var params = {
      url: 'category/send',
      method: 'GET',
      data:{ id },
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
}

export { DetailType };