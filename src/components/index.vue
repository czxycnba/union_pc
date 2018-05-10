<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 0}">
    <Row>
      <Col span="24" class="topMenu">
      <Row>
        <Col span="20" offset='2' class="top">
        <Row>
          <Col span="8" class="top_logo">
          <img src="../../static/img/logo.svg" alt="" style='width: 60px'><span><b>{{$t('share.system')}}</b></span>
          </Col>
          <Col span="16"  class="top_logout">
          <ul>
            <li><span>{{$t('share.welcome')}}，</span><b>{{userName}}</b></li>
            <li><img src="../../static/img/ico_down.png" alt=""><span @click="logout">{{$t('share.logOut')}}</span></li>
          </ul>
          </Col>
        </Row>
        </Col>
      </Row>
      </Col>
    </Row>
    <Row type="flex">
      <Col span="20" offset='2' style="" >
      <Row>
        <Col :span="spanLeft" :offset="spanOffLeft" class="layout-menu-left" v-show="spanLeft==4?true:false">
        <div class="innerbox leftMenu_scroll">
          <Menu  :active-name="activeName" :open-names="['1']" v-for="i in user"  @on-select="getActive" style="width: 207px">
            <Submenu  name="1" >
              <template slot="title">
                <p class="sysMark" @click="sysGo"></p>
                <Icon :type="i.icon"></Icon>{{i.title}}
              </template>
              <router-link v-for="i in i.children" :to="{path:i.url}" name="" >
                <MenuItem :name="i.name">{{i.subtitle}}</MenuItem>
              </router-link>
            </Submenu>
          </Menu>
        </div>
        </Col>
        <Col :span="spanRight" style="height:1000px;background-color: #ececec">
        <Button type="text" @click="toggleClick" class="toggleBtn">
          <img src="../../static/img/sideslip_away.png" v-show="spanLeft==4">
          <img src="../../static/img/sideslip_pull.png" v-show="spanLeft==0">
        </Button>
        <Row>
          <Col :span="22"  offset='2'>
          <div class="layout-breadcrumb topMenu_scroll">
            <div id='root' class="root">
              <div class="list" id="list">
                <Tag v-for="item in countInfo"
                     :name="item"
                     :closable="item.name==1?false:true"
                     :color="item.name?(item.name===activeName?'red':'default'):(item.name===activeName?'red':'default')"
                     @on-close="handleClose"
                     @click.native="clickTag(item)">{{item.subtitle}}</Tag>
              </div>
            </div>
          </div>
          </Col>
        </Row>
        <div class="layout-content "  style="background: #ececec;overflow: auto;overflow-y: hidden;padding-bottom: 100px;">
          <div class="layout-content-main innerbox" ref="rightcontentbox" style="background-color: #fff;" >
            <router-view></router-view>
          </div>
        </div>
        </Col>
      </Row>
      </Col>
    </Row>
  </div>
</template>
<script>
  import * as Tag from '../assets/js/tag'
  import * as URL from '../assets/api/url'
  import * as FUN from '../assets/js/lib'
  import axios from 'axios'
  import {scroll} from '../assets/js/scroll'
  import {getCookie,setCookie} from '../cookie'
  export default {
    data () {
      return {
        single:false,
        navData:[],
        //userName:'',
        activeName:'1-1',   //划过
        openNames:['1'],    //展开
        spanLeft: 4,
        spanOffLeft:0,
        spanRight: 20,
        user:[],
        per:[],
        defaultUrl:[],
        defaultActiveName:[],
        //countInfo:Tag.countInfo,  //标签信息
        countInfo:[],
        colorTag:'#f0f', //选中颜色
        userName:''
      }
    },
    computed: {
      /* userName(){
         return this.$store.state.user.username;
       },*/
      iconSize () {
        return this.spanLeft === 4 ? 20 : 24;
      },
      widthBox(){
        return document.getElementsByClassName('ivu-table-header')[0].offsetWidth;
      }
    },
    mounted(){
      if (getCookie('lng') == '0') {
        this.$i18n.locale = 'zh';
      } else {
        this.$i18n.locale = 'en';
      }
      this.activeName=localStorage.getItem('actives');
      this.openNames = ["1"];
      this.$nextTick(function () {
        let H = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
        this.$refs.rightcontentbox.style.height= (H-160)+ 'px';
        this.navData =JSON.parse(localStorage.getItem('leftMenu'));
        this.userName =JSON.parse(localStorage.getItem('userName'));
        this.getNav();
        //Tag.addTag.tagMark(this.$route.path,this,this.countInfo);
        if(this.$route.path=='/index'){
          this.$router.push({path:this.defaultUrl[0]});
          //this.activeName=this.defaultActiveName[0];
        }/*else{
          this.countInfo=Tag.countInfo
          console.log(this.countInfo)
        }*/
        this.activeName=this.defaultActiveName[0];//给tag设置高亮
      })
    },
    methods: {
      getNav(){
        let datas=this.navData;
        let leftNav=[];
        leftNav.push(datas);
        leftNav.map( (v,i)=> {
          let Modules = v.childModules;
          this.user.push({
            name: i + 1,
            title:this.$t('share.systemManage'),
            icon: v.icon,
            children: Modules.map((v, k)=> {
              switch (v.moduleName){
                case '店铺管理':
                  v.moduleName = this.$t('store.store');
                  break;
                case '角色管理':
                  v.moduleName = this.$t('roles.roles');
                  break;
                case '店铺管理':
                  v.moduleName = this.$t('store.store');
                  break;
                case '人员管理':
                  v.moduleName = this.$t('employees.employees');
                  break;
                case '账户管理（人员）':
                  v.moduleName = this.$t('account.employees');
                  break;
                case '账户管理（店铺）':
                  v.moduleName = this.$t('account.store');
                  break;
              }
              return {
                name: (i + 1) + '-' + (k + 1),
                subtitle: v.moduleName,
                url: v.moduleUrl,
                permissionList: v.permissionList.map(v=> {
                  return v.permissionName
                })
              }
            })
          });
          this.countInfo= Modules.map((v, k)=> {
            return {
              name: (i + 1) + '-' + (k + 1),
              subtitle: v.moduleName,
              url: v.moduleUrl
            }
          });
          Modules.map(v=> {
            this.defaultUrl.push(v.moduleUrl)
          });
          this.user.map( v=>{
            v.children.map( child=>{
              this.defaultActiveName.push(child.name);
            })
          });
          //console.log('this.defaultActiveName--',this.defaultActiveName)
          Modules.map(v=> {
            this.per.push({
              subtitle: v.moduleName,
              url:v.moduleUrl,
              permissionList: v.permissionList.map(v=> {
                return v.permissionName
              })
            })
          });
        });
        localStorage.setItem('per',JSON.stringify(this.per));
      },
      getActive(name){  //添加tag
        Tag.addTag.tagMark(name,this,this.countInfo);
        //this.tagMark(name,this)
        scroll.scrollTopBar();
        this.activeName=name;

        //this.countInfo=Tag.countInfo;
        localStorage.setItem('actives',name);
      },
      tagMark (name) {
        switch (name){
          case '1-1':
            for(var i = 0; i < this.countInfo.length; i++){if(name === this.countInfo[i].name){return true;}}
            this.countInfo.unshift({"name": "1-1", "subtitle": this.$t('store.store'), "url": "/shop"});
            break;
          case '1-2':
            for(var i = 0; i < this.countInfo.length; i++){if(name === this.countInfo[i].name){return true;}}
            this.countInfo.unshift({"name": "1-2", "subtitle": this.$t('roles.roles'), "url": "/role"});
            break;
          case '1-3':
            for(var i = 0; i < this.countInfo.length; i++){if(name === this.countInfo[i].name){return true;}}
            this.countInfo.unshift({"name": "1-3", "subtitle": this.$t('employees.employees'), "url": "/personnel"});
            break;
          case '1-4':
            for(var i = 0; i < this.countInfo.length; i++){if(name === this.countInfo[i].name){return true;}}
            this.countInfo.unshift({"name": "1-4", "subtitle":  this.$t('account.employees'), "url": "/accountPersonnel"});
            break;
          case '1-5':
            for(var i = 0; i < this.countInfo.length; i++){if(name === this.countInfo[i].name){return true;}}
            this.countInfo.unshift({"name": "1-5", "subtitle": this.$t('account.store'), "url": "/accountShop"});
            break;
        }
        switch (name){
          case '/shop':
            this.countInfo.push({"name": "1-1", "subtitle": this.$t('store.store'), "url": "/shop"});
            break;
          case '/role':
            this.countInfo.push({"name": "1-2", "subtitle": this.$t('roles.roles'), "url": "/role"});
            break;
          case '/personnel':
            this.countInfo.push({"name": "1-3", "subtitle": this.$t('employees.employees'), "url": "/personnel"});
            break;
          case '/accountPersonnel':
            this.countInfo.push({"name": "1-4", "subtitle":  this.$t('account.employees'), "url": "/accountPersonnel"});
            break;
          case '/accountShop':
            this.countInfo.push({"name": "1-5", "subtitle": this.$t('account.store'), "url": "/accountShop"});
            break;
        }
      },
      sysGo(){
        this.$router.push({path:'/system'});
        this.activeName='';
        this.countInfo=[];
      },
      handleClose (event, name) {   //关闭tag
        if(this.countInfo.length==1){
          this.$router.push({path:'/system'});
          this.activeName='0';
        }
        const index = this.countInfo.indexOf(name);
        this.countInfo.splice(index, 1);
        if(this.$route.path.indexOf(name.url)!=-1){
          Tag.addTag.tagClick(this.countInfo[0].url,this);
          this.$router.push({path:this.countInfo[0].url});
          this.activeName=this.countInfo[0].name;
        }
      },
      clickTag(item){      //点击tag
        this.activeName=item.name;
        Tag.addTag.tagClick(item.url,this);
        scroll.scrollTopBar();
      },
      toggleClick () {   //左侧导航展开收缩
        if (this.spanLeft === 4) {
          this.spanLeft = 0;
          this.spanRight = 24;
        } else {
          this.spanLeft = 4;
          this.spanRight = 20;
        }
      },
      logout(){      //退出
        axios.post(URL.logout).then( response=>{
          if(response.data.messageCode==200){
            this.$store.commit('logout');
            localStorage.clear();
            this.countInfo.splice(0,this.countInfo.length);
            this.$router.push('/login');
            this.countInfo=[]
          }
        }).catch(error=>{
        })
      },
    }
  }
</script>
<style scoped>
  @import url('../assets/css/index.css');
  /*leftMenu*/
  .leftMenu_scroll{overflow-x:auto;height: 1280px;}
  /*图标*/
  .ivu-icon-ios-sr_light:before,
  .ivu-icon-ios-sr_home:before,
  .ivu-icon-ios-sr_control:before,
  .ivu-icon-ios-sr_music:before,
  .ivu-icon-ios-sr_stati:before,
  .ivu-icon-ios-sr_install:before,
  .ivu-icon-ios-sr_system:before,
  .ivu-icon-ios-sr_basics:before {display: inline-block;width:20px;height:20px;margin-top: -6px;vertical-align: middle;  }
  .ivu-icon-ios-sr_home:before {content: url('../../static/img/ico_home.png');}
  .ivu-icon-ios-sr_light:before{content: url('../../static/img/ico_light.png');}
  .ivu-icon-ios-sr_control:before{content: url('../../static/img/ico_control.png');}
  .ivu-icon-ios-sr_music:before{content: url('../../static/img/ico_music.png');}
  .ivu-icon-ios-sr_stati:before{content: url('../../static/img/ico_stati.png');}
  .ivu-icon-ios-sr_install:before{content: url('../../static/img/ico_install.png');}
  .ivu-icon-ios-sr_system:before{background-size:50%;content: url('../../static/img/ico_system.png');}
  .ivu-icon-ios-sr_basics:before{content: url('../../static/img/ico_basics.png');}
  /*图标end*/
  a {color: #495060;}
  .ivu-menu-vertical.ivu-menu-opened>.ivu-menu-submenu-title{background-color:red}
  .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{padding-left:51px}
  .ivu-menu{display:block;margin:0;padding:0;outline:0;list-style:none;color:#495060;font-size:14px;position:relative;z-index:900;width:240px;background:#fdfdfd;border:none}
  .ivu-menu-vertical.ivu-menu-light:after{content:'';display:block;width:1px;height:100%;background: #db3529;position:absolute;top:0;bottom:0;right:0;z-index:1;border:none}
  .ivu-menu-vertical .ivu-menu-submenu-title:hover{background:#db3529;color:#fff}
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){color:#db3529;border-right:0 solid #fdfdfd !important;z-index:2;}
  .ivu-menu{
    display: block;
    margin: 0;
    padding: 0;
    outline: 0;
    list-style: none;
    color: #fff;
    font-size: 14px;
    position: relative;
    z-index: 900;
    width: 240px;
    background: #db3529;
    border: none;
  }
  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 14px 0px 14px 24px;
    position: relative;
    cursor: pointer;
    z-index: 1;
    transition: all .2s ease-in-out;
    background: #fdfdfd;
  }
  .sysMark{position: absolute;width: 100%;height: 100%;top: 0;left: 0;background: #56303000;}
  /*切换*/
  .toggleBtn{position: absolute;left:-25px;top:35%;z-index: 999;}
  .toggleBtn_bg1{background: url("../../static/img/sideslip_away.png") no-repeat;}
  .toggleBtn_bg2{background: url("../../static/img/sideslip_pull.png") no-repeat;}
  /*滑动菜单*/
  .topMenu_scroll{overflow:hidden;height: 50px;width:auto;background-color:#ececec;}
  .ivu-tag{display:inline-block !important;height:44px;line-height:44px;margin:0 -3px 0 0;padding:0 16px;border:1px solid #e9eaec;border-radius:3px;background:#fff;color:#999;font-size:14px;vertical-align:middle;opacity:1;overflow:hidden;cursor:pointer;background:url("../../static/img/tip_def_bg.png") no-repeat center;background-size:100% 100%}
  #root{height:60px;width:100%;white-space:nowrap;overflow:hidden;position:relative}
  .root:before{display:block;content:'';width:20px;height:100%;position:absolute;right:-20px;top:0}
  .list{position:absolute;left:0;top:0;transition:all 1s;height:100%;line-height:2.5}
  .ivu-tag-red{background:url("../../static/img/tip_bg.png") no-repeat center;background-size:100% 100%;color:#333333}
  .top_logout{cursor: pointer}
</style>
<style>
  .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
    background: #cb3329;
  }
  li.ivu-menu-item:hover{background: #f3f3f3 !important;}
  .ivu-tag-text{color: #999
  }
  .ivu-tag-color-white {
    color: #000!important;
  }
</style>
