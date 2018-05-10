<template>
  <div style="padding: 10px;">
    <Row class="addHeader">
      <Col span="1">
      <router-link to="/accountPersonnel"><img src="../../../static/img/ico_left.png" alt=""></router-link>
      </Col>
      <Col span="22"><p>{{$t('account.newAccount')}}</p></Col>
    </Row>
    <Row class="formBox">
      <Col span="24">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="labelWidth">
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('share.accountName')+fuhao" prop="ap_name">
            <Input v-model="formValidate.ap_name" :maxlength="20"></Input>
          </FormItem>
          </Col>
          <Col span="10" class="errorTip">{{$t('store.storeIdWarning')}}</Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('account.pwd')+fuhao" prop="ap_pasd">
            <Input v-model="formValidate.ap_pasd" :maxlength="16"></Input>
          </FormItem>
          </Col>
          <Col span="10" class="errorTip">{{$t('account.defaultPwdWarning')}}</Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('account.users')+fuhao" prop="ap_user">
            <Select v-model="formValidate.ap_user" @on-change="getUser" :placeholder="$t('share.select')">
              <Option v-for="item in ap_user_List" :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('account.type')+fuhao" prop="ap_type">
            <Select v-model="formValidate.ap_type" :placeholder="$t('share.select')">
              <Option v-for="item in ap_type_List" :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('account.rolePermissions')+fuhao" prop="ap_role">
            <Select v-model="formValidate.ap_role" multiple :placeholder="$t('share.select')">
              <Option v-for="item in ap_role_List" :value="item.id" :key="item.id" >{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('account.accountStatus')+fuhao" prop="ap_status">
            <Select v-model="formValidate.ap_status" :placeholder="$t('share.select')">
              <Option v-for="item in ap_status_List" :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <h3>{{$t('account.storePermissions')}}</h3>
          </Col>
        </Row>
        <Row>
          <Col span="14" offset="4" class="quanxianBox innerbox">
          <ol class="shopBox shopBoxHeder">
            <li><checkbox
              :indeterminate="indeterminate"
              :value="checkAll"
              @click.prevent.native="handleCheckAll"></checkbox></li>
            <li>{{$t('store.storeid')}}</li>
            <li>{{$t('store.storeName')}}</li>
          </ol>
            <ol class="shopBox" v-for="i in ap_shop_List" >
              <li>
                <checkbox-group  v-model="checkAllGroup" @on-change="checkAllGroupChange">
                  <checkbox :label="i.id" value="">{{labelCheck}}</checkbox>
                </checkbox-group>
              </li>
              <li>{{i.shopCode}}</li>
              <li>{{i.shopName}}</li>
            </ol>
          </ol>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="6">
          <FormItem>
            <Button type="error" long  @click="handleSubmit('formValidate')" :disabled="isButton">{{$t('share.save')}}</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
      </Col>
    </Row>
  </div>
</template>
<script src="../js/AccountPersonnelAdd.js">
</script>
<style>
  @import "../css/AccountPersonnelAdd.css";
  /*!*header*!
  .addHeader{height: 47px;border-bottom: 1px dashed #efefef;}
  .addHeader a>img{padding-top:5px;}
  .addHeader p{font-size:19px;line-height:40px;font-weight:400;color:#666666;text-align: center;}

  .formBox{padding-top: 20px;}
  .ivu-form .ivu-form-item-label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #333;
    line-height: 1;
    padding: 10px 12px 10px 0;
    box-sizing: border-box;
  }
  !*错误提示*!
  .errorTip{padding-left:15px;height: 32px;line-height: 32px;font-size: 12px;color:#ffa56f;}
  !*下拉三角*!
  .ivu-icon-arrow-down-b:before {  content: "\F104";  color: #db3528;  }

  !**权限***!
  .quanxianBox{height:200px;overflow-x:hidden;overflow-y:auto;margin-bottom:20px;}
  .shopBox{width: 100%;}
  .shopBox li{float: left;border-bottom: 1px solid #efefef;height: 40px;line-height: 40px;}
  .shopBox li:nth-child(1){width: 18%;padding-left: 2%}
  .shopBox li:nth-child(2){width: 40%;}
  .shopBox li:nth-child(3){width: 40%;}
  .shopBoxHeder{width:100%;height:39px;background: #db3528;color:#fff;;}


  !**!
  .ivu-checkbox {
    display: inline-block;
    vertical-align: middle;
    white-space: nowrap;
    cursor: pointer;
    outline: 0;
    line-height: 1;
    position: relative;
    width: 20px;
    height: 18px;
  }
  .ivu-checkbox-checked .ivu-checkbox-inner {
    border-color: #ccc !important;
    background-color: #fff !important;
  }
  .ivu-checkbox-indeterminate .ivu-checkbox-inner {
    background-color: #fff;
    border-color: #fff;
  }
  .ivu-checkbox-indeterminate .ivu-checkbox-inner {
    background-color: #fff;
    border-color: #ccc;
  }

  .ivu-checkbox-inner {
    display: inline-block;
    width:21px;
    height: 21px;
    position: relative;
    top: 1px;
    left: 0;
    border: 1px solid #dddee1;
    border-radius: 2px;
    background-color: #fff;
    !* transition: border-color .2s ease-in-out,background-color .2s ease-in-out; *!
  }
  .ivu-checkbox-checked .ivu-checkbox-inner:after {
    content:url("../../../static/img/ico_fit.png");
    display: table;
    width: 6px;
    height:6px;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #fff;
    border-top: 0;
    border-left: 0;
    -ms-transform: rotate(0deg) scale(1);
    transform: rotate(0deg) scale(1);
    transition: all .2s ease-in-out;
  }*/
</style>
