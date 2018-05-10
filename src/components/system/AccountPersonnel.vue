<template>
  <div>
    <Row>
      <Col span="6">
      <Form  :label-width="labelWidth">
        <FormItem :label="$t('share.accountName')" prop="">
          <Input v-model="ap_id" placeholder="" :maxlength="20"></Input>
        </FormItem>
      </Form>
      </Col>
      <Col span="6">
      <Form  :label-width="labelWidth">
        <FormItem :label="$t('share.userName')" prop="">
          <Input v-model="ap_name" placeholder="" :maxlength="20"></Input>
        </FormItem>
      </Form>
      </Col>
      <Col span="6">
      <Form  :label-width="labelWidth">
        <FormItem :label="$t('account.accountStatus')" prop="">
          <Select v-model="ap_status">
            <Option v-for='i in ap_status_list' :value="i.id">{{i.name}}</Option>
          </Select>
        </FormItem>
      </Form>
      </Col>

      <Col span="4" offset="1">
      <Button type="error"  @click="APSearch"> {{$t('share.search')}}</Button>
      </Col>
    </Row>
    <Row v-show="perAdd">
      <Col span="12" offset="12">
      <MenuItem class="sr_tools" name="">
        <router-link to="/accountPersonnelAdd"><Icon type="ios-sr_add"></Icon>{{$t('share.new')}}</router-link>
      </MenuItem>
      </Col>
    </Row>

    <Table ref="roletable" :columns="columns" :data="tableData" class="table_wrapper" id="table_wrapper" ></Table>

    <Row class="table_page" v-show="ishowPage">
      <Col span="12" offset="12">
      <Row>
        <Col span="13" style="text-align: right"><Page :current="currentPage" :total="totalCount" :pageSize="pageSize"   simple ref="pageBox"  @on-change="pageInit"></Page></Col>
        <Col span="11" style="font-size: 14px;line-height: 24px;">{{$t('share.now')}}{{beginIndex}}-{{endIndex}}{{$t('share.item')}}，{{$t('share.total')}}{{totalCount}}{{$t('share.item')}}{{$t('share.record')}}</Col>
      </Row>
      </Col>
    </Row>

    <Modal v-model="modal_stop" width="360"  class-name="vertical-center-modal">
      <p slot="header" style="color:#fff;text-align:center">
        <span>{{$t('share.warning')}}</span>
      </p>
      <div style="text-align:center">
        <p>{{$t('account.disablAccountWarning')}}！</p>
      </div>
      <div slot="footer">
        <i-button type="error"   @click="stoptipOk">{{$t('account.disable')}}</i-button>
        <i-button type="default"  @click="stoptipCancel">{{$t('share.cancel')}}</i-button>
      </div>
    </Modal>

    <Modal v-model="modal_use" width="360"  class-name="vertical-center-modal">
      <p slot="header" style="color:#fff;text-align:center">
        <span>{{$t('share.warning')}}</span>
      </p>
      <div style="text-align:center">
        <p>{{$t('account.enableAccount')}}</p>
      </div>
      <div slot="footer">
        <i-button type="error"   @click="usetipOk">{{$t('account.enable')}}</i-button>
        <i-button type="default"  @click="usetipCancel">{{$t('share.cancel')}}</i-button>
      </div>
    </Modal>


    <Modal v-model="modal_del" width="360"  class-name="vertical-center-modal" >

      <p slot="header" style="color:#fff;text-align:center">
        <span>{{$t('share.warning')}}</span>
      </p>
      <div style="text-align:center">
        <p>{{$t('account.delAccountWarning')}}</p>
      </div>
      <div slot="footer">
        <i-button type="error"   @click="delOk">{{$t('account.delete')}}</i-button>
        <i-button type="default"  @click="delCancel">{{$t('share.cancel')}}</i-button>
      </div>

    </Modal>


    <Modal v-model="modal_pass" width="360"  class-name="vertical-center-modal" >

      <p slot="header" style="color:#fff;text-align:center">
        <span>{{$t('account.resetPassword')}}</span>
      </p>
      <div style="text-align:center">
        <p style="height: 25px;margin-bottom: 10px;"><Checkbox v-model="initialPass"><span style="font-size: 14px;vertical-align:middle">{{$t('account.defaultPwdWarning')}}</span></checkbox></p>

        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="labelWidth">
          <Row>
            <Col span="24" >
            <FormItem :label="$t('account.newPwd')" prop="pasd">
              <Input v-model="formValidate.pasd"  :disabled="initialPass" :maxlength="16"  style="ime-mode: disabled"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24" >
            <FormItem :label="$t('account.confirmNewPwd')" prop="pasdOnce">
              <Input v-model="formValidate.pasdOnce" :disabled="initialPass" :maxlength="16"  style="ime-mode: disabled"></Input>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <i-button type="error"  @click="handleSubmitPsd('formValidate')">{{$t('share.reset')}}</i-button>
        <i-button type="default"  @click="passCancel">{{$t('share.cancel')}}</i-button>
      </div>
    </Modal>

  </div>
</template>
<script src="../js/AccountPersonnel.js">
</script>

<style >
  @import "../../assets/css/main.css";
  @import "../css/AccountPersonnel.css";
</style>

