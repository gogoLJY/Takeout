import { PublicTopic } from 'publicTopic-model.js';
import { Layer } from '../../utils/layer.js';
var publicTopic = new PublicTopic();
Page({
  data: {
    pictures: [],
    hideAddImg: false,
    test1:false,
    TextAreaInput :''
  },
  onLoad: function (options) {
    var that = this;
    if (that.data.pictures.length <= 0) {
      that.setData({
        pictures: []
      })
    }else{
      wx.getStorage({
        key: 'gallery',
        success: function (res) {
          that.setData({
            pictures: res.data
          })
        }
      })
    }
  },
  onShow: function () {

  },
  onTextAreaInput: function(e){
    console.log(e.detail.value);
  },
  uploadImage: function () {
    var that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      success: function (res) {
        var tempFilePath = res.tempFilePaths[0];
        that.setData({
          pictures: that.data.pictures.concat(tempFilePath)
        })
        if (that.data.pictures.length >= 9) {
          Layer.fail('最多上传9张图片');
          that.setData({
            hideAddImg: true
          })
        }
      }
    })
  },
  onPreviewImage: function(e){
    var index = e.currentTarget.dataset.index;
    var that = this
    wx.previewImage({
      current: that.data.pictures[index], // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: that.data.pictures
    })
  },
  onTextAreaInput: function (e) {
    this.setData({
      TextAreaInput : e.detail.value
    })
  }, 
  onSubmit: function(e){
    var formValue = e.detail.value
    if (this.data.TextAreaInput == ""){
      Layer.fail('内容不正确');
    }else{
      if (this.data.pictures.length == 0){
        Layer.fail('请添加图片');
      }else{
        wx.showToast({
          title: '发布中',
          icon: 'loading',
          mask: true,
          duration: 2000
        });
        publicTopic.getAddPost(formValue.content, (res) => {
          if (res.code == 200) {
            this.uploadimg({
              url: 'https://x2018062501.aweyu.cn/post/file',
              path: this.data.pictures,
              content: formValue.content,
              id: res.data
            });
          }
        })
      }
    }
  },
  uploadimg: function(data){
    var that = this,
    i=data.i ? data.i : 0,//当前上传的哪张图片
    success=data.success ? data.success : 0,//上传成功的个数
    fail=data.fail ? data.fail : 0;//上传失败的个数
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'image',//这里根据自己的实际情况改
      header: {
        "Content-Type": "multipart/form-data",
        'accept': 'application/json',
        'token': wx.getStorageSync('token')
      },
      formData: {
        id:data.id
      },
      success: (res) => {
        var data = JSON.parse(res.data);
        if (data.code == 200){
          wx.hideLoading();
          setTimeout(() => {
            Layer.success('发布成功');
          }, 300)
          setTimeout(()=>{
            wx.navigateBack();
          },1500)
        }
        success++;
      },
      fail: (res) => {
        Layer.fail('上传失败');
        setTimeout(()=>{
          this.onLoad();
        },800)
        
      },
      complete: () => {
        if(this.data.pictures.length==0){
        }else{
          i++;//这个图片执行完上传后，开始上传下一张
          if (i == data.path.length) {   //当图片传完时，停止调用          
            console.log('执行完毕');
            console.log('成功：' + success + " 失败：" + fail);
          } else {//若图片还没有传完，则继续调用函数
            console.log(i);
            data.i = i;
            data.success = success;
            data.fail = fail;
            that.uploadimg(data);
          }
        }
      }
    });
  }
})