import { Base } from '../../utils/base.js';

class Order extends Base {
  constructor() {
    super();
  }

  getALLCommunity(callBack) {
    var params = {
      url: 'post/all',
      method: 'GET',
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
  getPostCount(callBack) {
    var params = {
      url: 'post/count',
      method: 'GET',
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
}

export { Order };