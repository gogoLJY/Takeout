import { Config } from 'config.js';

export class Token {
  constructor() {
    this.verifyUrl = Config.restUrl + 'token/verify';
    this.tokenUrl = Config.restUrl + 'token/user';
  }

  verify(callBack) {
    var token = wx.getStorageSync('token');
    console.log("下面是token的值");
    console.log(token);//打印token的值
    if (!token) {
      this.getTokenFromServer(callBack);
    }
    else {
      this._veirfyFromServer(token, callBack);
    }
  }

  _veirfyFromServer(token, callBack) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        token: token
      },
      success: function (res) {

        var valid = res.data.isValid;
        if (!valid) {
          that.getTokenFromServer(callBack);
        } else {
          callBack && callBack()
        }
      }
    })
  }

  getTokenFromServer(callBack) {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          data: {
            code: res.code
          },
          success: function (res) {
            wx.setStorageSync('token', res.data.data.token);
            callBack && callBack(res.data.data.token);
          }
        })
      }
    })
  }
}