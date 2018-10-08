/**
 * 微信公众号网页 jssdk 配置项设置
 */
import axios from 'axios';
import {
  mapState
} from 'vuex';
import wx from 'weixin-js-sdk';
import store from '../store';
import {
  initJSSDK
} from '../store/actions'

export const WXJSSDK = {
  computed: {
    // 这里的三点叫做： 扩展运算符
    ...mapState({
      weixin: state => state.weixin,
      wxjssdk_inited: state => state.wxjssdk_inited
    }),
  },
  mounted() {
    var that = this;
    that.$nextTick(function () {
      console.log('wx jssdk mixin mounted');
      //console.log('device', that.$device);
      //console.log('weixin', that.weixin);
      if (that.weixin) {
        that.initConfig();
      }
    });
  },
  methods: {
    initConfig() {
      var that = this;
      // iOS 版本，需要在这里初始化配置，只能初始化一次
      // android 版本需要在这里进行初始化配置，每次都需要重新初始化配置
      if (that.$device.android || that.wxjssdk_inited == false) {
        console.log('initConfig');
        var UrlLink = window.location.href;
        if (UrlLink.indexOf("#") < 0) {
          var cur_url = UrlLink;
        } else {
          var cur_url = location.href.split('#')[0];
        }
        console.log('cur_url', cur_url);
        axios.get("/jssdk?url=" + encodeURIComponent(cur_url), {}).then(function (result) {
          console.log('jssdk config', result);
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: result.data.appId, // 必填，公众号的唯一标识
            timestamp: result.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
            signature: result.data.signature, // 必填，签名，见附录1
            jsApiList: result.data.jsApiList //["chooseWXPay", "startRecord", "stopRecord", "uploadVoice", "onVoiceRecordEnd", "editAddress", "getLocation", "chooseImage", "uploadImage", "downloadImage", "getLocalImgData", "onMenuShareAppMessage", "onMenuShareTimeline", "hideMenuItems"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          // 初始过一次之后，要设置参数为 true
          initJSSDK(store, {
            'init': true
          })

        }).catch(function (error) {
          that.$f7.dialog.alert("wx.error" + JSON.stringify(error));
          console.log("error", error);
        });
      }
    },
    updateShareConfig(title, link, imgUrl, desc) {
      var that = this;
      // 需要延迟一定时间再执行，否则会出现先设置了分享的参数，再初始化微信 jssdk，造成自定义分享失败
      setTimeout(function () {
        console.log('updateShareConfig');
        that.$f7.dialog.alert("自定义分享标题" + title);
        wx.onMenuShareTimeline({
          title: title, // 分享标题
          link: link, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function () {}
          // 用户点击了分享后执行的回调函数
        })
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl, // 分享图标
          success: function () {
            // 用户点击了分享后执行的回调函数
          }
        });
      }, 1000);

    }
  }
}
