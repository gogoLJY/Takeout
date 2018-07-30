import { Base } from '../../utils/base.js';

class AllComment extends Base {
  constructor() {
    super();
  }

  getDynamic(callBack) {
    var params = {
      url: 'post/dynamic',
      method: 'GET',
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
  getPostget(callBack) {
    var params = {
      url: 'post/get',
      method: 'GET',
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
}

export { AllComment };