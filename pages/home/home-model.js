import { Base } from '../../utils/base.js';

class Home extends Base{
  constructor() {
    super();
  }
  getBillAll(timestamp,callBack){
    var params = {
      url: 'bill/all',
      method: 'POST',
      data: { timestamp },
      sCallBack: function(res) {     
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
  onRegister(nickname, avatar, callBack) {
    var params = {
      url: 'user/info',
      method: 'POST',
      data: { nickname, avatar },
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
}

export {Home};