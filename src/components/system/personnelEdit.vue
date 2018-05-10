<template>
  <div style="padding: 10px;">

    <Row class="addHeader">
      <Col span="1">
      <router-link to="/personnel"><img src="../../../static/img/ico_left.png" alt=""></router-link>
      </Col>
      <Col span="22"><p>{{$t('employees.editEmployees')}}</p></Col>
    </Row>

    <Row class="formBox">
      <Col span="24">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="labelWidth">
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('employees.staffMemberId')+fuhao" prop="personnel_id">
            <Input v-model="formValidate.personnel_id" disabled></Input>
          </FormItem>
          </Col>
          <Col span="10" class="errorTip">{{$t('store.storeIdWarning')}}</Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('employees.name')+fuhao"  prop="personnel_name">
            <Input v-model="formValidate.personnel_name" :maxlength="20"></Input>
          </FormItem>
          </Col>
          <Col span="10" class="errorTip">{{$t('store.storeNameWarning')}}</Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('employees.gender')+fuhao" prop="personnel_gender">
            <Select v-model="formValidate.personnel_gender">
              <Option v-for="item in personnel_gender_list" :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('employees.positionRole')+fuhao" prop="personnel_job">
            <Select v-model="formValidate.personnel_job" >
              <Option v-for="item in personnel_job_list" :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('employees.store')+fuhao" prop="personnel_store">
            <Select v-model="formValidate.personnel_store" >
              <Option v-for="item in personnel_store_list" :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="10" offset="4">
          <h3 style="border-top:1px solid #ececec;padding: 15px;">{{$t('employees.additionalInfo')}}</h3>
          </Col>
        </Row>

        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('employees.idNumber')+fuhao">
            <Input v-model="formValidate.personnel_idnumber" :maxlength="18"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('employees.contactInfo')+fuhao">
            <Input v-model="formValidate.personnel_phone" :maxlength="11"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('employees.status')+fuhao">
            <Select v-model="formValidate.personnel_status">
              <Option v-for="item in personnel_status_list" :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('employees.Started')+fuhao">
            <DatePicker type="date" placeholder="Select date" v-model="formValidate.personnel_inTime" @on-change="getpersonnel_inTime" style="width: 100%;"></DatePicker>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('employees.left')+fuhao">
            <DatePicker type="date" placeholder="Select date" v-model="formValidate.personnel_outTime" @on-change="getpersonnel_outTime" style="width: 100%;"></DatePicker>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="10" offset="6">
          <FormItem  >
            <Button type="error" long  @click="handleSubmit('formValidate')" :disabled="isButton">{{$t('share.save')}}</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
      </Col>
    </Row>



  </div>
</template>
<script src="../js/personnelEdit.js">
</script>
<style>
  @import "../css/personnelEdit.css";
</style>
