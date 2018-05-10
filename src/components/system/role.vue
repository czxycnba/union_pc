<template>
  <div style="padding: 10px;">
    <Row>
      <Col span="6">
      <Form  :label-width="labelWidth">
        <FormItem :label="$t('roles.rolesId')" prop="">
          <Input v-model="role_id" placeholder="" :maxlength="20"></Input>
        </FormItem>
      </Form>
      </Col>
      <Col span="6">
      <Form  :label-width="labelWidth">
        <FormItem :label="$t('roles.rolesName')" prop="">
          <Input v-model="role_name" placeholder="" :maxlength="20"></Input>
        </FormItem>
      </Form>
      </Col>
      <Col span="6">
      <Form  :label-width="labelWidth">
        <FormItem :label="$t('roles.rolesType')" prop="">
          <Select v-model="role_attr">
            <Option v-for='(val,key) in role_attr_arr' :value="key">{{val}}</Option>
          </Select>
        </FormItem>
      </Form>
      </Col>

      <Col span="4" offset="1">
      <Button type="error"  @click="roleSearch"> {{$t('share.search')}}</Button>
      </Col>
    </Row>
    <Row v-show="perAdd">
      <Col span="12" offset="12">
      <MenuItem class="sr_tools" name="">
        <router-link to="/roleAdd"><Icon type="ios-sr_add"></Icon> {{$t('share.new')}}</router-link>
      </MenuItem>
      </Col>
    </Row>

    <Table ref="roletable" :columns="columns" :data="data" class="table_wrapper" id="table_wrapper"></Table>

    <Row class="table_page" v-show="ishowPage">
      <Col span="12" offset="12">
      <Row>
        <Col span="13" style="text-align: right"><Page :current="currentPage" :total="totalCount" :pageSize="pageSize"  simple ref="pageBox"  @on-change="pageInit"></Page></Col>
        <Col span="11" style="font-size: 14px;line-height: 24px;">{{$t('share.now')}}{{beginIndex}}-{{endIndex}}{{$t('share.item')}}，{{$t('share.total')}}{{totalCount}}{{$t('share.item')}}{{$t('share.record')}}</Col>
      </Row>
      </Col>
    </Row>

    <Modal v-model="modal_stop" width="360"  class-name="vertical-center-modal">
      <p slot="header" style="color:#fff;text-align:center">
        <span>{{$t('share.warning')}}</span>
      </p>
      <div style="text-align:center">
        <p>{{$t('roles.DisPrompt')}}！</p>
      </div>
      <div slot="footer">
        <i-button type="error"  @click="stopOk">{{$t('share.disable')}}</i-button>
        <i-button type="default"  @click="stopCancel">{{$t('share.cancel')}}</i-button>
      </div>
    </Modal>

    <Modal v-model="modal_use" width="360"  class-name="vertical-center-modal">
      <p slot="header" style="color:#fff;text-align:center">
        <span>{{$t('share.warning')}}</span>
      </p>
      <div style="text-align:center">
        <p>{{$t('share.confirmEnable')}}?</p>
      </div>
      <div slot="footer">
        <i-button type="error"   @click="useOk">{{$t('share.enable')}}</i-button>
        <i-button type="default"  @click="useCancel">{{$t('share.cancel')}}</i-button>
      </div>
    </Modal>

    <Modal v-model="modal_del" width="360"  class-name="vertical-center-modal" >

      <p slot="header" style="color:#fff;text-align:center">
        <span>{{$t('share.warning')}}</span>
      </p>
      <div style="text-align:center">
        <p>{{$t('roles.delPrompt')}}！</p>
      </div>
      <div slot="footer">
        <i-button type="error"   @click="delOk">{{$t('share.delete')}}</i-button>
        <i-button type="default"  @click="delCancel">{{$t('share.cancel')}}</i-button>
      </div>
    </Modal>
  </div>
</template>
<script src="../js/role.js">

</script>

<style>
  @import "../../assets/css/main.css";
  @import "../css/role.css";
</style>


