
import Vue from 'vue'
import App from './App'
import router from './router/index'
import iView from 'iview';
import VIscroll from 'viscroll'
import store from './store/index'
import 'iview/dist/styles/iview.css';
import "babel-polyfill";
import 'es6-promise/auto'
require('es6-promise').polyfill();
import 'core-js/fn/array/find';
import 'core-js/fn/array/find-index';
import axios from 'axios';
import VueI18n from 'vue-i18n';
import LangEn from '../static/lang/en';
import LangZhCHS from '../static/lang/zhCHS';
import zh from 'iview/dist/locale/zh-CN';
import locale from 'iview/dist/locale/en-US';
import VueCookies from 'vue-cookies'
import {getCookie} from './cookie'

//Vue.config.debug = true;//debug模式 false:未默认值
axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios;
Vue.use(VueI18n);
Vue.use(VIscroll, {
  mouseWheel: true,
  click: false,
  preventDefault: true,
  tap: false,
  bounce: false,
  disableMouse: false,
  disablePointer: true,
  disableTouch: false,
  scrollbars: true,
  //hScrollbar: true,
  fadeScrollbars: true,
  eventPassthrough: false,
  scrollX: true,
  scrollY: true,
});
//Vue.config.productionTip = false;//设置为 false 以阻止 vue 在启动时生成生产提示

// 当前代码执行在哪个环境中？ 开发环境还是生产环境
Vue.config.productionTip = process.env.NODE_ENV === 'production';



Vue.use(VueCookies);
Vue.use(iView,{locale});
Vue.config.devtools = false;//版本是否为生产 默认值为true 生产为false
Vue.config.silent =false;//显示所有的日志和警告 true：取消所有的警告与提示
let lang='zh';
 /*if(navigator.language =='zh-CN'){
  lang ='zh'
}else {
  lang ='en'
}*/
const messages = {
  en: LangEn,
  zh: LangZhCHS
};
const i18n = new VueI18n({
  locale:lang,
  messages
});
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    let token =getCookie('token');
    if(token==='success' || getCookie("time")==='validity') {
        next();
    }
    else {
      next({
        path: '/login',
        query: {redirect:router.currentRoute.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});
axios.interceptors.request.use(config=>{
  return config;
},error => {
  if(error.request){
    router.replace({
      path:'/login'
    })
  }
  return Promise.reject(error);
});
axios.interceptors.response.use(
  response =>{
    return response;
  },
  error => {
    if(error.response){
      router.replace({
        path:'/login'
      });
      /*switch (error.response.status){
        case 401:
          router.replace({
            path:'/login'
           /!* query:{redirect:router.currentRoute.fullPath}*!/
          });
          break;
        case 302:
          router.replace({
            path:'/login',
          });
          localStorage.clear();
          break;
        case 500:
          router.replace({
            path:'/login'
          });
          break;
      }*/
      localStorage.clear();
    }
    return Promise.reject(error.response.data)
  }
);
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app');







//el 挂载元素到dom $mount延迟挂载

function isEmptyObject(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}
