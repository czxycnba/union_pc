<template>
  <div style="padding: 10px;">
    <Row>
      <Col span="5">
      <Form  :label-width="labelWidth">
        <FormItem :label="$t('employees.staffMemberId')">
          <Input v-model="personnel_id" placeholder="" :maxlength="20"></Input>
        </FormItem>
      </Form>
      </Col>
      <Col span="5">
      <Form  :label-width="labelWidth">
        <FormItem :label="$t('employees.name')">
          <Input v-model="personnel_name" placeholder="" :maxlength="20"></Input>
        </FormItem>
      </Form>
      </Col>
      <Col span="5">
      <Form  :label-width="labelWidth">
        <FormItem :label="$t('employees.position')">
          <Select v-model="personnel_job" >
            <Option v-for="item in personnel_job_list" :value="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
      </Form>
      </Col>
      <Col span="5">
      <Form  :label-width="labelWidth">
        <FormItem :label="$t('employees.store')">
          <Select v-model="personnel_store">
            <Option v-for='item in personnel_store_list' :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
      </Form>
      </Col>

      <Col span="3" offset="1">
      <Button type="error" @click="userSearch"> {{$t('share.search')}}</Button>
      </Col>
    </Row>
    <Row v-show="perAdd">
      <Col span="12" offset="12">
      <MenuItem class="sr_tools" name="">
        <router-link to="/personnelAdd"><Icon type="ios-sr_add"></Icon>{{$t('share.new')}}</router-link>
      </MenuItem>
      </Col>
    </Row>

    <Table ref="roletable" :columns="columns" :data="data" :pageSize="pageSize" class="table_wrapper" id="table_wrapper" ></Table>

    <Row class="table_page" v-show="ishowPage">
      <Col span="12" offset="12">
      <Row>
        <Col span="13" style="text-align: right"><Page :current="currentPage" :total="totalCount" :pageSize="pageSize" simple ref="pageBox"  @on-change="pageInit"></Page></Col>
        <Col span="11" style="font-size: 14px;line-height: 24px;">{{$t('share.now')}}{{beginIndex}}-{{endIndex}}{{$t('share.item')}}，{{$t('share.total')}}{{totalCount}}{{$t('share.item')}}{{$t('share.record')}}</Col>
      </Row>
      </Col>
    </Row>

    <Modal v-model="modal_del" width="360"  class-name="vertical-center-modal" >

      <p slot="header" style="color:#fff;text-align:center">
        <span>{{$t('share.warning')}}</span>
      </p>
      <div style="text-align:center">
        <p>{{$t('employees.delInfo')}}</p>
      </div>
      <div slot="footer">
        <i-button type="error"  @click="delOk">{{$t('share.delete')}}</i-button>
        <i-button type="default"  @click="delCancel">{{$t('share.cancel')}}</i-button>
      </div>

    </Modal>


  </div>
</template>
<script src="../js/personnel.js">

</script>

<style>
  @import "../../assets/css/main.css";
  @import "../css/personnel.css";

</style>

