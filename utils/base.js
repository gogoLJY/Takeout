import { Config } from '../utils/config.js';
import { Token } from './token.js';

let token = new Token()

export class Base {
  constructor() {
    this.BaseRequestUrl = Config.restUrl;
  }
  request(params) {
    var url = this.BaseRequestUrl + params.url;
    if (!params.method) {
      params.method = 'GET';
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.method,
      header: {
        'content-type':'application/json',
        'token':wx.getStorageSync('token')
      },
      success: function(res) {
        params.sCallBack&&params.sCallBack(res.data);
      },
      fail: function(err) {
        console.log(err);
      }

    })
  }

  /**
   * 公共接口 判断是否注册 拉取注册页面
   * callBack中执行注册后的方法
   */
  checkRegister(callBack) {
    token.verify(() => {
      this._checkRg(callBack)
    })
    // token.getTokenFromServer(()=> {
    //   this._checkRg(callBack)
    // })
  }

  _checkRg(callBack) {
    var params = {
      url: 'user/info/check',
      type: 'GET',
      sCallBack: function (res) {
        if (res.data.nickname == "" || res.data.avatar == "") {
          callBack && callBack(false)
        } else {
          callBack && callBack(true)
        }
      }
    }
    this.request(params);
  }

}