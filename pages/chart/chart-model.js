import { Base } from '../../utils/base.js';

class Chart extends Base {
  constructor() {
    super();
  }

  getBillChart(timestamp,type_id,callBack) {
    var params = {
      url: 'bill/chart',
      method: 'POST',
      data: { timestamp, type_id},
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
 
}

export { Chart };