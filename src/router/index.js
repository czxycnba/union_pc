import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  hashbang: true,//将路径格式化为#!开头
  history: false,//启用HTML5 history模式，可以使用pushState和replaceState来管理记录
  saveScrollPosition: true,//在启用html5 history模式的时候生效，用于后退操作的时候记住之前的滚动条位置
  transitionOnLoad: true,//初次加载是否启用场景切换
  abstract:false,//使用一个不依赖于浏览器的浏览历史虚拟管理后端
  /* base: __dirname,*/
  routes: [
    {
      path: '/',
      component: (resolve) => require(['../components/login.vue'], resolve),
    },
    {
      path: '/login',
      component: (resolve) => require(['../components/login.vue'], resolve),
    },
    {
      path: '/index',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      },
      component: (resolve) => require(['../components/index.vue'], resolve),
      children: [
        {
          path: '/home',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/home.vue'], resolve),
        },
        {
          path: '/shop',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/shop.vue'], resolve),
        }, {
          path: '/shopAdd',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/shopAdd.vue'], resolve),
        }, {
          path: '/shopSee',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/shopSee.vue'], resolve),
        }, {
          path: '/shopEdit',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/shopEdit.vue'], resolve),
        },

        {
          path: '/role',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/role.vue'], resolve),
        }, {
          path: '/roleAdd',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/roleAdd.vue'], resolve),
        }, {
          path: '/roleEdit',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/roleEdit.vue'], resolve),
        }, {
          path: '/roleSee',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/roleSee.vue'], resolve),
        },

        {
          path: '/personnel',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/personnel.vue'], resolve),
        }, {
          path: '/personnelAdd',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/personnelAdd.vue'], resolve),
        }, {
          path: '/personnelEdit',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/personnelEdit.vue'], resolve),
        }, {
          path: '/personnelSee',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/personnelSee.vue'], resolve),
        },


        {
          path: '/accountPersonnel',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/accountPersonnel.vue'], resolve),
        }, {
          path: '/accountPersonnelAdd',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/accountPersonnelAdd.vue'], resolve),
        }, {
          path: '/accountPersonnelEdit',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/accountPersonnelEdit.vue'], resolve),
        }, {
          path: '/accountPersonnelSee',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/accountPersonnelSee.vue'], resolve),
        },


        {
          path: '/accountShop',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/accountShop.vue'], resolve),
        }, {
          path: '/accountShopSee',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/accountShopSee.vue'], resolve),
        }, {
          path: '/accountShopEdit',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/accountShopEdit.vue'], resolve),
        }, {
          path: '/system',
          meta: {
            requireAuth: true,
          },
          component: (resolve) => require(['../components/system/sys.vue'], resolve),
        }
      ]
    }


  ]
});




