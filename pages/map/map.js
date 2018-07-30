// pages/map/map.js
Page({

  data: {
    latitude: 0,//纬度 
    longitude: 0,//经度 
    speed: 0,//速度 
    accuracy: 16,//位置精准度 
    markers: [],
    covers: [], 

  },
  getlocation: function () {
    var markers = [{
      latitude: 31.23,
      longitude: 121.47,
      name: '浦东新区',
      desc: '我的位置'
    }]
    var covers = [{
      latitude: 31.23,
      longitude: 121.47,
      // iconPath: '/images/add.png',
      rotate: 0
    }]
    this.setData({
      longitude: 121.47,
      latitude: 31.23,
      markers: markers,
      covers: covers,
    })
  },
  onLoad: function (options) {
  
  },


  onShow: function () {
  
  },

})