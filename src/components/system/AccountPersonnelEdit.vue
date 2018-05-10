<template>
  <div style="padding: 10px;">

    <Row class="addHeader">
      <Col span="1">
      <router-link to="/accountPersonnel"><img src="../../../static/img/ico_left.png" alt=""></router-link>
      </Col>
      <Col span="22"><p>{{$t('account.editAccount')}}</p></Col>
    </Row>

    <Row class="formBox">
      <Col span="24">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="labelWidth">
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('share.accountName')+fuhao"  prop="ap_name">
            <Input v-model="formValidate.ap_name" :maxlength="20"></Input>
          </FormItem>
          </Col>
          <Col span="10" class="errorTip">{{$t('store.storeIdWarning')}}</Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('account.pwd')+fuhao" prop="ap_pasd">
            <Input v-model="formValidate.ap_pasd" disabled :maxlength="16"></Input>
          </FormItem>
          </Col>
          <Col span="10" class="errorTip">{{$t('account.defaultPwdWarning')}}</Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('account.users')+fuhao" prop="ap_user">
            <Select v-model="formValidate.ap_user" >
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
            <Select v-model="formValidate.ap_role" multiple>
              <Option v-for="item in ap_role_List" :value="item.id" :key="item.id" >{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="4">

          <FormItem :label="$t('account.accountStatus')+fuhao" prop="ap_status">
            <Select v-model="formValidate.ap_status" >
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
          <ol class="shopBox" v-for="val in ap_shop_List" >
            <li>
              <checkbox-group  v-model="checkAllGroup" @on-change="checkAllGroupChange">
                <checkbox :label="val.shopAccountId" value="">{{labelCheck}}</checkbox>
              </checkbox-group>
            </li>
            <li>{{val.shopCode}}</li>
            <li>{{val.shopName}}</li>
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
<script src="../js/AccountPersonnelEdit.js">
</script>
<style>
  @import "../css/AccountPersonnelEdit.css";
</style>
