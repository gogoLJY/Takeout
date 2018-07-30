import { Base } from '../../utils/base.js';

class ReplyComment extends Base {
  constructor() {
    super();
  }
  getDetailCommunity(id, callBack) {
    var params = {
      url: 'post/get',
      method: 'GET',
      data: { id },
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
  getLike(id, callBack) {
    var params = {
      url: 'post/like',
      method: 'GET',
      data: { id },
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
}

export { ReplyComment };