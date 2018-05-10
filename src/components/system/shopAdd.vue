<template>
  <div style="padding: 10px;">

    <Row class="addHeader">
      <Col span="1">
      <router-link to="/shop"><img src="../../../static/img/ico_left.png" alt=""></router-link>
      </Col>
      <Col span="22"><p>{{$t('store.newStore')}}</p></Col>
    </Row>

    <Row class="formBox">
      <Col span="24">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="labelWidth">
          <Row>
            <Col span="10" offset="4">
              <FormItem :label="$t('store.storeid')+fuhao" prop="shopAdd_id">
                <Input v-model="formValidate.shopAdd_id" :maxlength="20"></Input>
              </FormItem>
            </Col>
            <Col span="10" class="errorTip">{{$t('store.storeIdWarning')}}</Col>
          </Row>
          <Row>
            <Col span="10" offset="4">
            <FormItem :label="$t('store.storeName')+fuhao" prop="shopAdd_name">
              <Input v-model="formValidate.shopAdd_name" :maxlength="20"></Input>
            </FormItem>
            </Col>
            <Col span="10" class="errorTip">{{$t('store.storeNameWarning')}}</Col>
          </Row>

          <Row>
            <Col span="10" offset="4">
            <FormItem :label="$t('store.phoneNumber')+fuhao" prop="shopAdd_phone">
              <Input v-model="formValidate.shopAdd_phone" :maxlength="11" ></Input>
            </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="10" offset="4">
            <FormItem :label="$t('store.storeType')+fuhao" prop="shopAdd_attr">
              <Select v-model="formValidate.shopAdd_attr" :placeholder="$t('share.select')" >
                <Option v-for="item in shopAdd_attr_List" :value="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="10" offset="4">
            <FormItem :label="$t('store.created')+fuhao"  prop=" ">
              <DatePicker type="date" :options='option' :placeholder="$t('share.select')" v-model="formValidate.shopAdd_time" @on-change="getShopAdd_time" style="width: 100%;"></DatePicker>
            </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="10" offset="4">

              <Col span="11">
                <FormItem :label="$t('store.location')+fuhao" label-width="100" prop="shopAdd_country">
                  <Select v-model="formValidate.shopAdd_country"  @on-change="getCountry" :placeholder="$t('share.select')">
                    <Option v-for="(key,val) in shopAdd_country_List" :value="val">{{ key }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12" offset="1">

                <FormItem label-width="0" prop="shopAdd_city" >
                  <al-cascader v-model="res" level="3" :disabled="isCountry" clearable="false"  @on-change="getCity" :placeholder="$t('share.select')"/>
                </FormItem>
              </Col>

            </Col>
          </Row>

          <Row>
            <Col span="10" offset="4">
            <FormItem :label="$t('store.fullAddress')+fuhao"  prop=" ">
              <Input v-model="formValidate.shopAdd_address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
            </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="10" offset="4">
            <FormItem :label="$t('store.contactPerson')+fuhao"  prop=" ">
              <Input v-model="formValidate.shopAdd_leader" :maxlength="20"></Input>
            </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="10" offset="6">
            <FormItem   prop=" ">
              <Button type="error" long  @click="handleSubmit('formValidate')" :disabled="isButton">{{$t('share.save')}}</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  </div>
</template>
<script src="../js/shopAdd.js">
</script>
<style >
  @import "../css/shopAdd.css";
</style>


