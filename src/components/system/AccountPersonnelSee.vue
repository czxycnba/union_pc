<template>
  <div style="padding: 10px;" >
    <Row class="addHeader">
      <Col span="1">
      <router-link to="/accountPersonnel"><img src="../../../static/img/ico_left.png" alt=""></router-link>
      </Col>
      <Col span="22"><p>{{$t('account.viewAccount')}}</p></Col>
    </Row>

    <Row class="formBox innerbox">
      <Col span="24">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  :label-width="labelWidth">
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('share.accountName')+fuhao"  prop="personnel_id">
            <p class="roleInfo">{{accountName}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('account.pwd')+fuhao" prop="personnel_id">
            <p class="roleInfo">{{accountPwd}}</p>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('account.users')+fuhao" prop="personnel_id">
            <p class="roleInfo">{{userName}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('account.type')+fuhao" prop="personnel_id">
            <p class="roleInfo">{{accountTypeDesc}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('account.rolePermissions')+fuhao" prop="personnel_id">
            <p class="roleInfo">{{roleName}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('account.accountStatus')+fuhao" prop="personnel_id">
            <h3>{{accountStatusDesc}}</h3>
          </FormItem>
          </Col>
        </Row>

<!--******-->
        <Row class="roleInfo_box">
          <Col span="12" offset="6">
          <h3>{{$t('account.storePermissions')}}</h3>
          <table width="100%" border="0" cellspacing="0" cellpadding="0" >
            <tr class="roleInfo_header">
              <td width="20%" style="text-align: center">{{$t('store.storeid')}}</td>
              <td width="30%" style="text-align: center">{{$t('store.storeName')}}</td>
            </tr>
          </table>
          <div class="table-b innerbox tableBox">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" >
              <tr class="tableBodyInfo">
                <td width="20%" >
                  <Row>
                    <Col>
                    <p v-for="i in shopPermissionsSelectedList" class="table_text_center" style="line-height:25px;border-bottom:1px solid #ececec">{{i.shopCode}}</p>
                    </Col>
                  </Row>
                </td>
                <td width="30%">
                  <Row>
                    <Col >
                      <p v-for="i in shopPermissionsSelectedList" class="table_text_center" style="line-height:25px;border-bottom:1px solid #ececec">{{i.shopName}}</p>
                    </Col>
                  </Row>
                </td>
              </tr>
            </table>
          </div>
          </Col>
        </Row>

      </Form>
      </Col>
    </Row>

  </div>
</template>
<script src="../js/AccountPersonnelSee.js">

</script>
<style scoped>
  @import "../css/AccountPersonnelSee.css";

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

