<template>
  <div style="padding: 10px;">
    <Row class="addHeader">
      <Col span="1">
      <router-link to="/accountShop"><img src="../../../static/img/ico_left.png" alt=""></router-link>
      </Col>
      <Col span="22"><p>查看店铺账户</p></Col>
    </Row>

    <Row class="formBox innerbox">
      <Col span="24">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="labelWidth">
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('account.tabletAccountUser')+fuhao" prop="personnel_id">
            <p class="roleInfo">{{PadName}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('account.tabletAccountPwd')+fuhao" prop="personnel_id">
            <p class="roleInfo">{{PadPwd}}</p>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('account.tabletAccountStatus')+fuhao" prop="personnel_id">
            <p class="roleInfo">{{PadStatus}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('store.storeid')+fuhao" prop="personnel_id">
            <p class="roleInfo">{{PadId}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('store.storeName')+fuhao" prop="personnel_id">
            <p class="roleInfo">{{PadShop}}</p>
          </FormItem>
          </Col>
        </Row>



<!--***********-->
        <!--<Row class="roleInfo_box">
          <Col span="8" offset="8">
          <h4>Pad端展示模块设置</h4>
          <table width="100%" border="0" cellspacing="0" cellpadding="0" >
            <tr class="roleInfo_header">
              <td width="40%" style="text-align: center">模块名称</td>
              <td width="60%" style="text-align: center">子模块名称</td>
            </tr>
          </table>
          <div class="table-b innerbox tableBox">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" v-for="i in modalPad">
              <tr class="tableBodyInfo">
                <td width="40%">
                  <Row>
                    <Col>
                    <h6 class="table_text_center">{{i.app_name}}</h6>
                    </Col>
                  </Row>
                </td>
                <td width="60%">
                  <Row>
                    <Col >
                    <p v-for="i in i.app_checkBox" style="text-align: center">{{i}}</p>
                    </Col>
                  </Row>
                </td>

              </tr>
            </table>
          </div>
          </Col>
        </Row>-->


      </Form>
      </Col>
    </Row>

  </div>
</template>
<script src="../js/AccountShopSee.js">
</script>
<style scoped>
@import "../css/AccountShopSee.css";
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

