<template>
  <div style="padding: 10px;">
    <Row class="addHeader">
      <Col span="1">
      <router-link to="/shop"><img src="../../../static/img/ico_left.png" alt=""></router-link>
      </Col>
      <Col span="22"><p>{{$t('store.viewStore')}}</p></Col>
    </Row>

    <Row class="formBox innerbox">
      <Col span="24">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="labelWidth">
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('store.storeid')+fuhao" prop="shopAdd_id">
            <p class="roleInfo">{{shopAdd_id}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('store.storeName')+fuhao" prop="shopAdd_id">
            <p class="roleInfo">{{shopAdd_name}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('store.phoneNumber')+fuhao" prop="shopAdd_id">
            <p class="roleInfo">{{shopAdd_phone}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('store.storeType')+fuhao" prop="shopAdd_id">
            <p class="roleInfo">{{shopAdd_attr}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('store.created')+fuhao" prop="">
            <p class="roleInfo">{{shopAdd_time}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('store.location')+fuhao" prop="shopAdd_id">
            <p class="roleInfo"><span>{{shopAdd_country}}</span></p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('store.fullAddress')+fuhao" prop=" ">
            <p class="roleInfo">{{shopAdd_address}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('store.contactPerson')+fuhao"  prop=" ">
            <p class="roleInfo">{{shopAdd_leader}}</p>
          </FormItem>
          </Col>
        </Row>

      </Form>
      </Col>
    </Row>

  </div>
</template>
<script src="../js/shopSee.js">

</script>
<style scoped>
  @import "../css/shopSee.css";
</style>
<style>
  .ivu-form .ivu-form-item-label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 12px;
    color: #495060;
    line-height: 1;
    padding: 10px 12px 10px 0;
    box-sizing: border-box;
    font-weight: 600;
  }
</style>
