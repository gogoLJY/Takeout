import { Base } from '../../utils/base.js';

class PublicComment extends Base {
  constructor() {
    super();
  }
  getPostComment(id,content, callBack) {
    var params = {
      url: 'post/comment',
      method: 'POST',
      data: {id,content },
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }

}

export { PublicComment };