import { Community } from 'community-model.js';
import { Layer } from '../../utils/layer.js';
var community = new Community();
Page({
  data: {
    loading: true,
    like:true,
    buttonIndex: 1,
    hideMask:true,
    hidePoint: true,
    imgList:[]
  },

  onLoad: function (options) {
  
  },

  onShow: function () {
    community.getALLCommunity((res)=>{
      console.log(res);
      if(res.code ==200){
        this.setData({
          community: res.data.post,
          imgList: this.concat(res.data.image),
          loading: false
        })
      }else{
        Layer.fail('暂无动态');
      }
     
    })
    community.getPostCount((res)=>{
      if(res.data == 0){
        this.setData({
          hidePoint: true
        })
      }else{
        this.setData({
          hidePoint: false
        })
      }
    })
  },
  onPublicLetter: function(){
    wx.navigateTo({
      url: '../publicLetter/publicLetter',
    })    
  },
  onPublicImg: function(){
    wx.navigateTo({
      url: '../publicTopic/publicTopic',
    })
  },
  onDetailcomment: function(e){
    wx.navigateTo({
      url: '../replyComment/replyComment?id=' + e.currentTarget.dataset.id,
    })
  },
  onreplyComment: function(){
    wx.navigateTo({
      url: '../allcomment/allcomment',
    })
  },
  onLike: function(e){
    wx.navigateTo({
      url: '../replyComment/replyComment?id=' + e.currentTarget.dataset.postid,
    })
  },
  onComment: function(e){
    wx.navigateTo({
      url: '../replyComment/replyComment?id=' + e.currentTarget.dataset.postid,
    })
  },
  onLikeActive: function () {
    Layer.fail('您已经点赞了');
  },
  onPreviewImage: function(e){
    var current = e.currentTarget.dataset.src;
    console.log(e.currentTarget.dataset.postid);
    console.log(this.concat(e.currentTarget.dataset.postid, this.data.community))
    wx.previewImage({
      current: current,
      urls: this.data.imgList
    });
  },
  concat: function (id, community) {
    this.data.imgList = [];
    for (let i in community) {
      if (id == community[i].id){
        for ( let j in community[i].image ){
          this.data.imgList = this.data.imgList.concat(community[i].image[j].url)
        }
      }
    }
    return this.data.imgList;
  },
  saveImage: function(e){
    console.log(e.currentTarget.dataset.src);
    wx.downloadFile({
      url: e.currentTarget.dataset.src,
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
            console.log('fail')
          }
        })
      },
      fail: function () {
        console.log('fail')
      }
    })
  },
  onChangeImg: function(){
    this.setData({
      buttonIndex: 2,
      hideMask:false
    })
  },
  onCloseImg: function () {
    this.setData({
      buttonIndex: 1,
      hideMask:true
    })
  }
})