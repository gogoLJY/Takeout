import { Base } from '../../utils/base.js';

class Option extends Base {
  constructor() {
    super();
  }
  PostOpinion(content, callBack) {
    var params = {
      url: 'user/opinion',
      method: 'POST',
      data: { content },
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }

}

export { Option };