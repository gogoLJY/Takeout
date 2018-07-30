/*
 * 正则
 * 修饰器@
 * Array.from
 */

const formatText = (key) => {
  return key + '不正确'
};

const rules = {
  name: function (v) {
    if (!v.match(/^.{2,20}$/)) {
      return {
        status: false,
        msg: formatText('姓名')
      }
    }
  },
  email: function (v) {
    if (!v.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
      return {
        status: false,
        msg: formatText('邮箱')
      }
    }
  },
  account: function(v){
    if (!v.match(/^\d{11}$/)){
      return {
        status: false,
        msg: formatText('账号')
      }
    }
  },
  num: function (v) {
    if (!v.match(/^\d$/)) {
      return {
        status: false,
        msg: formatText('人数限制')
      }
    }
  },
  budgetPrice: function (v) {
    if (!v.match(/^[1-9]\d*|0$/)) {
      return {
        status: false,
        msg: formatText('金额')
      }
    }
  },
  spendinginput: function(v){
    if (!v.match(/^[1-9]\d*|0$/)) {
      return {
        status: false,
        msg: formatText('支出金额不正确')
      }
    }
  },
  remarks: function(v) {
    if (!v.trim()) {
      return {
        status: false,
        msg: formatText('备注')
      }
    }
  },
  mobile: function (v) {
    if (!v.match(/^1(3|4|5|7|8)\d{9}$/)) {
      return {
        status: false,
        msg: formatText('手机号')
      }
    }
  },

  IDcard: function (v) {
    if (!v.trim()) {
      return {
        status: false,
        msg: formatText('身份证')
      }
    }
  },
  address: function (v) {
    if (!v.trim()) {
      return {
        status: false,
        msg: formatText('地址')
      }
    }
  }
}

class FormCheck {
  constructor(opts) {
    this.opts = opts;
  }

  check(success, fail) {
    const elements = this.opts;
    var result = {
      status: true,
      msg: ""
    }

    for (let i in elements) {
      if (elements.hasOwnProperty(i) === true) {
        console.log(i)
        if (rules[i]) {
          rules[i](elements[i]) && (result = rules[i](elements[i]))
        }

      }
    }

    if (result.status) {
      success && success(result)
    } else {
      fail && fail(result)
    }
  }

}

export { FormCheck };