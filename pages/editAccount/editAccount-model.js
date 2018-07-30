import { Base } from '../../utils/base.js';

class EditAccount extends Base {
  constructor() {
    super();
  }

  getDetailBill(id,callBack) {
    var params = {
      url: 'bill/get',
      method: 'GET',
      data:{ id },
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
  getChangeBill(id,price,note,callBack) {
    var params = {
      url: 'bill/change',
      method: 'POST',
      data: { id, price, note },
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
}

export { EditAccount };