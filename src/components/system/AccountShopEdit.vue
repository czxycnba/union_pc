<template>
  <div class='index' style="padding: 10px;">

    <Row class="addHeader">
      <Col span="1">
      <router-link to="/accountShop"><img src="../../../static/img/ico_left.png" alt=""></router-link>
      </Col>
      <Col span="22"><p>{{$t('account.editStoreName')}}</p></Col>
    </Row>

    <Row class="formBox">
      <Col span="24">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="labelWidth">
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('account.tabletAccountUser')+fuhao" prop="pad_name">
            <Input v-model="formValidate.pad_name" disabled></Input>
          </FormItem>
          </Col>
          <Col span="10" class="errorTip">{{$t('store.storeIdWarning')}}</Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('account.tabletAccountPwd')+fuhao" prop="pad_name">
            <Input v-model="formValidate.pad_psd" disabled></Input>
          </FormItem>
          </Col>
          <!--<Col span="10" class="errorTip">{{$t('store.storeNameWarning')}}</Col>-->
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('account.tabletAccountStatus')+fuhao" prop="pad_name">
            <Input v-model="formValidate.pad_status" disabled></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('store.storeid')+fuhao" prop="pad_name">
            <Input v-model="formValidate.pad_id" disabled></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('store.storeName')+fuhao" prop="pad_name">
            <Input v-model="formValidate.pad_shopName" disabled></Input>
          </FormItem>
          </Col>
        </Row>

        <!--<Row class="roleInfo_box">
          <Col span="10" offset="4">
          <h3>Pad端展示模块设置</h3>
          <Row class="roleInfo_header">
            <Col span="9"><p>模块名称</p></Col>
            <Col span="15"><p>子模块名称</p></Col>
          </Row>
          <Row class="roleInfo_body innerbox">
            <div v-for="(val,key) in modalApp" style="clear: both;border-bottom: 1px solid #ececec;">
              <Col span="9">
              <p><b>{{val.app_name}}</b><br>
                <Checkbox
                  :indeterminate="val.indeterminate_app"
                  :value="val.checkAll"
                  @on-change="AllInput_app(key)">
                  <span class="checkbox_quanxuan">全选</span>
                </Checkbox>
              </p>
              </Col>

              <Col span="15" class="roleInfo_line">
              <checkbox-group
                v-model="AllInputGroup_app[key]"
                @on-change="AllInputGroup_app_Change(key)"
                class="padding_left"
                style="display: inline-block !important;width: 45%">
                <div v-for="item in val.app_checkBox">
                  <checkbox :label="item.moduleId" class="checkbox_list margin_bottom">{{item.moduleName}}</checkbox>
                </div>
              </checkbox-group>

              </Col>
            </div>
          </Row>

          </Col>
        </Row>-->


        <Row>
          <Col span="10" offset="6">
          <FormItem>
            <Button type="error" long  @click.native="handleSubmit('formValidate')" :disabled="isButton">保存</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
      </Col>
    </Row>
  </div>
</template>
<script src="../js/AccountShopEdit.js">

</script>
<style >
  @import "../css/AccountShopEdit.css";

</style>

