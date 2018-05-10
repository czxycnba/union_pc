<template>
  <div style="padding: 10px;">
    <Row class="addHeader">
      <Col span="1">
      <router-link to="/personnel"><img src="../../../static/img/ico_left.png" alt=""></router-link>
      </Col>
      <Col span="22"><p>{{$t('employees.viewEmployees')}}</p></Col>
    </Row>

    <Row class="formBox innerbox">
      <Col span="24">
      <Form ref="formValidate"  :label-width="labelWidth">
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('employees.staffMemberId')+fuhao" prop="personnel_id">
            <p class="roleInfo">{{personnel_id}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('employees.name')+fuhao" prop="personnel_id">
            <p class="roleInfo">{{personnel_name}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('employees.positionRole')+fuhao"  prop="personnel_id">
            <p class="roleInfo">{{personnel_job}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('employees.store')+fuhao" prop="personnel_id">
            <p class="roleInfo">{{personnel_store}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('employees.status')+fuhao" prop="personnel_id">
            <p class="roleInfo">{{personnel_status}}</p>
          </FormItem>
          </Col>
        </Row>


        <Row>
          <Col span="8" offset="8" >
          <h3 style="border-top:1px solid #ececec;padding: 15px;">{{$t('employees.basicinFormationSet')}}</h3>
          </Col>
        </Row>

        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('employees.gender')+fuhao">
            <p class="roleInfo">{{personnel_gender}}</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="8" >
          <FormItem  :label="$t('employees.idNumber')+fuhao">
            <p class="roleInfo">{{personnel_idnumber}}</p>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('employees.contactInfo')+fuhao">
            <p class="roleInfo">{{personnel_phone}}</p>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('employees.Started')+fuhao">
            <p class="roleInfo">{{personnel_inTime}}</p>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="8" offset="8" >
          <FormItem :label="$t('employees.left')+fuhao">
            <p class="roleInfo">{{personnel_OutTime}}</p>
          </FormItem>
          </Col>
        </Row>

      </Form>
      </Col>
    </Row>

  </div>
</template>
<script src="../js/personnelSee.js">
</script>
<style scoped>
  @import "../css/personnelSee.css";
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
