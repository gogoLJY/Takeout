import { ReplyComment } from 'replyComment-model.js';
import { Layer } from '../../utils/layer.js';
var replyComment = new ReplyComment();
Page({

  data: {
    loading:true,
    imgList:[]
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this._loadData(options.id);
  },
  onShow: function () {
    this._loadData(this.data.id);
  },
  _loadData:function(id){
    replyComment.getDetailCommunity(id, (res) => {
      if (res.data.image.length == 0){
      }else{
        this.setData({
          imgList: this.concat(res.data.image),
        })
      }
      this.setData({
        detailComment: res.data,
        isLike: res.data.isLike,
        like_count: res.data.like_count,
        loading: false
      })
    })
  },
  concat: function (imageList) {
    this.data.imgList = [];
    for (let i in imageList) {
      this.data.imgList = this.data.imgList.concat(imageList[i].url)
    }
    return this.data.imgList;
  },
  onLike: function () {
    replyComment.getLike(this.data.id,(res)=>{
      if(res.code == 200){
        Layer.success('点赞成功');
        this.setData({
          isLike: 1,
          like_count: this.data.like_count + 1,
        })
      }else{
        Layer.fail('您已经点赞了');
      }
    })
  },
  onLikeActive: function(){
    Layer.fail('您已经点赞了');
  },
  onPublicComment: function(){
    wx.navigateTo({
      url: '../publicComment/publicComment?id=' + this.data.id,
    })
  },
  onPreviewImage: function(e){
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.imgList
    })
  }
})