<template>
  <f7-page name="home" :page-content="pageContent" :no-navbar="noNavbar" @page:init="init" @page:reinit="reinit">
    <f7-navbar>
      <f7-nav-title>首页</f7-nav-title>
    </f7-navbar>
    <f7-page-content>
      <f7-block strong>
        <span v-text="$t('app.app_name')"></span>
        <p>Here is your blank Framework7 app. Let's see what we have here.</p>
      </f7-block>
      <f7-block-title>Navigation</f7-block-title>
      <f7-list>
        <f7-list-item link="/about/" title="About"></f7-list-item>
        <f7-list-item link="/form/" title="Form"></f7-list-item>
      </f7-list>
      <f7-block-title>Modals</f7-block-title>
      <f7-block strong>
        <f7-row>
          <f7-col width="50">
            <f7-button fill raised popup-open="#popup">Popup</f7-button>
          </f7-col>
          <f7-col width="50">
            <f7-button fill raised login-screen-open="#login-screen">Login Screen</f7-button>
          </f7-col>
        </f7-row>
      </f7-block>
      <f7-block-title>Panels</f7-block-title>
      <f7-block strong>
        <f7-row>
          <f7-col width="50">
            <f7-button fill raised panel-open="left">Left Panel</f7-button>
          </f7-col>
          <f7-col width="50">
            <f7-button fill raised panel-open="right">Right Panel</f7-button>
          </f7-col>
        </f7-row>
      </f7-block>
      <f7-list>
        <f7-list-item link="/dynamic-route/blog/45/post/125/?foo=bar#about" title="Dynamic Route"></f7-list-item>
        <f7-list-item link="/load-something-that-doesnt-exist/" title="Default Route (404)"></f7-list-item>
      </f7-list>
    </f7-page-content>
    <f7-toolbar>
      <f7-link>Left Link</f7-link>
      <f7-link>Right Link</f7-link>
    </f7-toolbar>
  </f7-page>
</template>
<script>
import { mapState } from "vuex";
import { WXJSSDK } from "../js/wx_jssdk_mixin.js";

export default {
  data() {
    return {
      pageContent: false,
      noNavbar: true
    };
  },
  computed: {
    ...mapState({
      plusReady: state => state.plusReady
    })
  },
  mixins: [WXJSSDK],
  mounted: function() {
    var that = this;
    // that.$nextTick(function() {
    //   console.log("home nextTick");
    //   that.updateShareConfigInfo();
    // });
    this.$f7ready(f7 => {
      console.log("home f7 ready");
      this.$f7.dialog.alert("f7 ready");
      // 切换语言
      // console.log("this.$i18n", this.$i18n);
      // this.$i18n.locale = "en";
      that.updateShareConfigInfo();
    });
  },
  methods: {
    updateShareConfigInfo() {
      var that = this;
      var title = "我是首页标题";
      var link = "http://h5.xcourage.fullstack.cn";
      var imgUrl = "http://cdn.framework7.cn/i/aplt.png";
      var desc = "我是首页内容";
      that.updateShareConfig(title, link, imgUrl, desc);
    },
    init() {
      console.log("home page init");
    },
    reinit() {
      console.log("home page reinit");
      var that = this;
      that.updateShareConfigInfo();
    }
  }
};
</script>
