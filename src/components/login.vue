<template>

  <div class="loginBg">
    <Button class="label label-important" size="small"
            style="width:47px;font-size:15px;position: absolute;margin-top: 10px;right: 10px; " :key="locale?'en':'cn'"
            @click="changeLang()">{{lang}}
    </Button>

    <div style="width: 450px;margin: 50px auto;">
      <div class="logo">
        <img src="../../static/img/logo.png" alt="">
      </div>
      <div class="loginBox">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" class="loginForm">
          <Form-item prop="username" class="loginInput">
            <Input type="text" v-model="formInline.username" :placeholder="$t('loginPage.loginName')"></Input>
          </Form-item>
          <Form-item prop="password">
            <Input type="password" v-model="formInline.password" :placeholder="$t('loginPage.loginPWD')"></Input>
          </Form-item>
          <Form-item style="padding-bottom: 20px;">
            <Button type="error" long @click="handleSubmit('formInline')">{{$t('loginPage.login')}}</Button>
            <!--<label ><input type="checkbox" v-model="single" @click="isCheck"
                          ><span></span>{{$t('loginPage.RememberMe')}}<br/></label>-->

            <p @click="isCheck" >
              <Checkbox v-model="single" style="width: 200px"><span >{{$t('loginPage.RememberMe')}}</span></checkbox>
            </p>
            <p class="tip_chrom">{{$t('loginPage.recommend')}}</p>
          </Form-item>
        </Form>
      </div>
    </div>

    <Row>
      <Col span="8" offset="16" class="tipBottom">

      <div class="tip">
        <Tooltip>
          <span class='tipImg tipIosImg'></span>
        </Tooltip>

        <Tooltip>
          <span class='tipImg tipAndroidImg'></span>
        </Tooltip>

        <Tooltip :content="phone" placement="top">
          <span class='tipImg tipPhoneImg'></span>
        </Tooltip>
      </div>

      </Col>
    </Row>
    <Row class='bottomMsg'>
      <Col span="24">
      <p>www.sengled.com</p>
      <p>{{$t('loginPage.footer')}}</p>
      </Col>
    </Row>

  </div>
</template>
<script>
  import axios from 'axios'
  import * as URL from '../assets/api/url';
  import {getCookie, setCookie, delCookie} from '../cookie'
  import * as Validate from '../assets/js/validate'
  import * as Fun from '../assets/js/lib'

  export default {
    data() {
      return {
        locale: 'zh',
        lang: 'EN',
        navData: [],
        navLeftShowData: [],
        formInline: {
          username: '',
          password: ''
        },
        ruleInline: {
          username: [
            {validator: Validate.validateUserName, required: true, trigger: 'blur'}
          ],
          password: [
            {required: true, validator: Validate.validatePWD, trigger: 'blur'},
            {type: 'string', min: 6, validator: Validate.validatePWDLength}
          ]
        },
        handLoad: false,
        single: false,
        phone:'',
        userName: ''
      }
    },
    created:function () {
      Validate.huoquObj.func(this);
    },
    mounted: function () {
      this.single = localStorage.getItem('single');
      //延迟回调循环更新之后执行，等待dom更新
      this.$nextTick(function () {
        if (getCookie('lng') == '0') {
          this.locale = 'zh';
          this.lang = 'EN';
        } else {
          this.locale = 'en';
          this.lang = '中文';
        }
        this.phone=this.$t('loginPage.tel') + '：021-64851811';
        document.onkeyup = function () {
          if (event.keyCode == 13) {
            this.handleSubmit('formInline')
          }
        }.bind(this);

        this.checkLogin();
      });

    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      uid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
    },
    watch: {
      locale(val) {
        this.$i18n.locale = val;
      }
    },
    methods: {
      checkLogin(){
        if (this.single) {
          axios.get(URL.checkLogin).then(response => {
            if (response.data.messageCode == 200) {
              setCookie('token','success');
              this.userName = response.data.data.username;
              let datas = response.data.data.leftMenuData;
              datas.map(child => {
                if (child.moduleCode == "pc_sys_mgt") {
                  this.navData = child
                }
              });
              localStorage.setItem('leftMenu', JSON.stringify(this.navData));
              localStorage.setItem('userName', JSON.stringify(this.userName));
              this.$router.push({path: '/index'});
            } else if (response.data.messageCode == 20012) {
              localStorage.setItem('single', false);
              this.navData = [];
            }
          }).catch(error => {
            this.$Message.error(Fun.errorTip(this,error.response.status));
          })

        }
      },
      changeLang() {
        // 增加传入语言
        if (this.locale == 'zh') {
          this.lang = 'EN';
          this.locale = 'en';
        } else {
          this.lang = '中文';
          this.locale = 'zh';
        }
        setCookie('lng', this.locale == 'zh' ? '0' : '1', 24);
        window.location.reload();//进行刷新改变cookie里的值
      },
      isCheck() {
        this.single = !this.single;
        localStorage.setItem('single',this.single);
      },
      handleSubmit(name) {
        let data = {
          username: this.formInline.username.replace(/(^\s*)|(\s*$)/g, ""),
          password: this.formInline.password,
          channel: 'PC'
        };

        this.$refs[name].validate((valid) => {
          if (valid) {
            axios.post(URL.login, data).then(response => {
              if (response.data.messageCode == 200) {
                if (response.data.hasOwnProperty("data")) {
                  setCookie('token','success');
                  setCookie("time",'validity', 5 * 60 * 1000);
                  this.$router.push({path: '/index'});
                  this.$Message.success(this.$t('loginPage.successLogin'));
                  this.userName = response.data.data.username;
                  let datas = response.data.data.leftMenuData;
                  datas.map(child => {
                    if (child.moduleCode == "pc_sys_mgt") {
                      this.navData = child;
                    }
                  });

                  this.$store.commit('login');
                  localStorage.setItem('leftMenu', JSON.stringify(this.navData));
                  localStorage.setItem('userName', JSON.stringify(this.userName));
                } else {
                  this.$Message.success(this.$t('loginPage.errLoginPermission'));
                }

              } else if (response.data.messageCode == 10001) {
                this.$Message.error(this.$t('errorCode.error10001'));
              } else if (response.data.messageCode == 10002) {
                this.$Message.error(this.$t('errorCode.error10002'));
              }else if(response.data.messageCode==1000){
                this.$Message.error(this.$t('errorCode.error1000'));
              }
            }).catch(error => {
              this.$Message.error(this.$t('loginPage.errNet'));
              //this.$Message.error(FUN.errorTip(error.response.status));
            })
          } else {

            this.$Message.error(this.$t('loginPage.errLoginFail'));
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .loginBg {
    width: 100%;
    height: 800px;
    overflow: hidden; /* position: relative; */
    background: url("../../static/img/background.png") no-repeat;
    background-size: 100% 100%;
  }

  .logo {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .logo > img {
    display: inline-block;
    width: 40%;
    height: 120px;
    background-size: 100% auto;
  }

  .loginBox {
    background: rgba(255, 255, 255, 0.68);
    border-radius: 8px;
  }

  .loginForm {
    padding: 0 30px;
  }

  .loginInput {
    padding-top: 30px;
  }

  .radio span {
    font-size: 12px;
    color: #000000;
    line-height: 20px;
    vertical-align: middle
  }

  .tipBottom {
    height: 66px;
    width: 100%;
    position: fixed;
    bottom: 30px;
  }

  .tip {
    width: 200px;
    height: 66px;
    position: fixed;
    right: 50px;
  }

  .tipImg {
    width: 25px;
    height: 25px;
    display: inline-block;
    border-radius: 100%;
    padding: 20px;
    border: 2px solid #fff;
    margin: 0 5px;
  }

  .tipIosImg {
    background: url("../../static/img/ios.png") no-repeat center;
    background-size: 50% auto;
  }

  .tipAndroidImg {
    background: url("../../static/img/android.png") no-repeat center;
    background-size: 50% auto;
  }

  .tipPhoneImg {
    background: url("../../static/img/phone.png") no-repeat center;
    background-size: 50% auto;
  }

  .tipIosImg:hover {
    background: #d52b1e url("../../static/img/ios.png") no-repeat center;
    border: 2px solid #d52b1e;
  }

  .tipAndroidImg:hover {
    background: #d52b1e url("../../static/img/android.png") no-repeat center;
    border: 2px solid #d52b1e;
  }

  .tipPhoneImg:hover {
    background: #d52b1e url("../../static/img/phone.png") no-repeat center;
    border: 2px solid #d52b1e;
  }

  .bottomMsg {
    height: 46px;
    width: 100%;
    background: #313131;
    position: fixed;
    bottom: 0;
    text-align: center;
    padding: 5px 0;
    color: #fff;
  }

  .bottomMsg p {
    font-size: 12px;
    line-height: 150%;
  }

  .bottomMsg h4 {
    line-height: 150%;
  }

  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    display: none;
  }

  label {
    width: 100px;
    height: 20px;
    display: inline-block;
    cursor: pointer;
    vertical-align: baseline
  }

  label input[type="checkbox"] + span {
    width: 15px;
    height: 14px;
    display: inline-block;
    border: 1px;
    background: #fff;
    vertical-align: text-bottom;
    margin-right: 3px;
  }

  label input[type="checkbox"]:checked + span {
    background-position: 0 -21px;
    background: #fff url("../../static/img/ico_select2.png") no-repeat center center;
  }

  .tip_chrom {
    margin-top: -10px;
    color: #ed3f14;
    padding-left: 18px;
    font-size: 12px;
  }
</style>
<style>
  .ivu-checkbox-checked .ivu-checkbox-inner {
    border-color: #ccc !important;
    background-color: #fff !important;
  }

  .ivu-tooltip-inner {
    max-width: 250px;
    min-height: 34px;
    padding: 8px 12px;
    color: #000;
    text-align: left;
    text-decoration: none;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    white-space: nowrap;
  }

  .ivu-tooltip-popper[x-placement^=top] .ivu-tooltip-arrow {
    bottom: 3px;
    border-width: 5px 5px 0;
    border-top-color: #fff;
  }

  .ivu-checkbox-checked .ivu-checkbox-inner:after {
    content: url("../../static/img/ico_select2.png");
    display: table;
    width: 6px;
    height: 6px;
    position: absolute;
    top: 1px;
    left: 1px;
    border: 1px solid #fff;
    border-top: 0;
    border-left: 0;
    -ms-transform: rotate(0deg) scale(1);
    transform: rotate(0deg) scale(1);
    transition: all .2s ease-in-out;
  }

  .ivu-checkbox-inner {
    border: 0px solid #fff;
  }
</style>





