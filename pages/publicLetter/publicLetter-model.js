import { Base } from '../../utils/base.js';

class PublicLetter extends Base {
  constructor() {
    super();
  }
  getAddPost(content, callBack) {
    var params = {
      url: 'post/add',
      method: 'POST',
      data: { content },
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }

}

export { PublicLetter };