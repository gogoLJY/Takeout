export class Layer {
  static success(msg, callBack) {
    wx.showToast({
      title: msg,
      image: '/assets/success.png',
      duration: 2000,
      mask: true,
      success: function () {
        callBack && callBack()
      }
    })
  }

  static fail(msg, callBack) {
    wx.showToast({
      title: msg,
      image: '/assets/fail.png',
      duration: 2000,
      mask: true,
      success: function () {
        callBack && callBack()
      }
    })
  }

  static loading(msg = 'loding', callBack) {
    wx.showLoading({
      title: msg,
      mask: true,
      success: function () {
        callBack && callBack(wx.hideLoading)
      }
    })
  }




}