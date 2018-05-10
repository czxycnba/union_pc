<template>
  <div class='index' style="padding: 10px;">

    <Row class="addHeader">
      <Col span="1">
      <router-link to="/role"><img src="../../../static/img/ico_left.png" alt=""></router-link>
      </Col>
      <Col span="22"><p>{{$t('roles.newRoles')}}</p></Col>
    </Row>

    <Row class="formBox">
      <Col span="24">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="labelWidth">
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('roles.rolesId')+fuhao" prop="shopAdd_id">
            <Input v-model="formValidate.shopAdd_id" :maxlength="20"></Input>
          </FormItem>
          </Col>
          <Col span="10" class="errorTip">{{$t('store.storeIdWarning')}}</Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('roles.rolesName')+fuhao" prop="shopAdd_name">
            <Input v-model="formValidate.shopAdd_name" :maxlength="20"></Input>
          </FormItem>
          </Col>
          <Col span="10" class="errorTip">{{$t('store.storeNameWarning')}}</Col>
        </Row>
        <Row>
          <Col span="10" offset="4">
          <FormItem :label="$t('roles.rolesType')+fuhao" prop="shopAdd_attr">
            <Select v-model="formValidate.shopAdd_attr" clearable  :placeholder="$t('share.select')">
              <Option v-for="(val,key) in shopAdd_attr_List" :value="key">{{ val }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>

        <Row class="roleInfo_box">
          <Col span="22" offset="1">
          <h2>{{$t('roles.appPermissions')}}</h2>
          <table width="100%" border="0" cellspacing="0" cellpadding="0" >
            <tr class="roleInfo_header">
              <td width="20%" style="text-align: center">{{$t('roles.moduleName')}}</td>
              <td width="35%" style="text-align: center">{{$t('roles.viewing')}}</td>
              <td width="45%" style="text-align: center">{{$t('roles.editing')}}</td>
            </tr>
          </table>
          <div class="table-b innerbox tableBox">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" >
              <tr v-for="(val,key) in modalApp" class="tableBodyInfo">
                  <td width="20%">
                    <Row>
                      <Col><p class="table_text_center"><b>{{val.app_name}}</b><br>
                      <Checkbox
                        :value="val.isCheckedAll"
                        @on-change="checkAll_app(key)">
                        <span class="checkbox_quanxuan ">{{$t('roles.all')}}</span>
                      </Checkbox>
                    </p>
                      </Col>
                    </Row>
                  </td>
                  <td width="35%">
                    <Row>
                      <Col>
                      <div class="padding_left margin_bottom margin_top">
                        <Checkbox
                          :indeterminate="val.indeterminate_app"
                          :value="val.checkAll"
                          @click.prevent.native="AllInput_app(key)">
                          <span class="checkbox_quanxuan">{{$t('roles.all')}}</span>
                        </Checkbox>

                      </div>
                      <checkbox-group
                        v-model="AllInputGroup_app[key]"
                        @on-change="AllInputGroup_app_Change(key)"
                        class="padding_left"
                        style="display: inline-block !important;width:65%">
                        <div v-for="item in val.app_checkBox" >
                          <checkbox :label="item.moduleId+'-'+2" class="checkbox_list margin_bottom">{{item.moduleName}}</checkbox>
                        </div>
                      </checkbox-group>

                      </Col>
                    </Row>
                  </td>
                  <td width="35%">
                    <Row>
                      <Col>
                      <div class="padding_left" v-for='i in val.app_tree' v-show="i.title==''?false:true" >
                        <Tree
                          :data="val.app_tree"
                          show-checkbox
                          ref="treeApp"
                          @on-check-change="TreeNode_app(key)"
                          class="checkboxtree_list ">
                        </Tree>
                      </div>
                      </Col>
                    </Row>
                  </td>
                </tr>
            </table>
          </div>
          </Col>
        </Row>

        <Row class="roleInfo_box">
          <Col span="22" offset="1">
          <h2>{{$t('roles.pcPermissions')}}</h2>
          <table width="100%" border="0" cellspacing="0" cellpadding="0" >
            <tr class="roleInfo_header">
              <td width="20%" style="text-align: center">{{$t('roles.moduleName')}}</td>
              <td width="35%" style="text-align: center">{{$t('roles.viewing')}}</td>
              <td width="45%" style="text-align: center">{{$t('roles.editing')}}</td>
            </tr>
          </table>
          <div class="table-b innerbox tableBox">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" >
              <tr v-for="(val,key) in modalPc" class="tableBodyInfo">
                <td width="20%">
                  <Row>
                    <Col><p class="table_text_center"><b>{{val.pc_name}}</b><br>
                    <Checkbox
                      :value="val.isCheckedAll"
                      @on-change="checkAll_pc(key)">
                      <span class="checkbox_quanxuan">{{$t('roles.all')}}</span>
                    </Checkbox>
                  </p>
                    </Col>
                  </Row>
                </td>
                <td width="35%">
                  <Row>
                    <Col>
                    <div class="padding_left margin_bottom margin_top ">
                      <Checkbox
                        :indeterminate="val.indeterminate_pc"
                        :value="val.checkAll"
                        @click.prevent.native="AllInput_pc(key)">
                        <span class="checkbox_quanxuan">{{$t('roles.all')}}</span>
                      </Checkbox>

                    </div>
                    <checkbox-group
                      v-model="AllInputGroup_pc[key]"
                      @on-change="AllInputGroup_pc_Change(key)"
                      class="padding_left"
                      style="display: inline-block !important;width: 65%">
                      <div v-for="item in val.pc_checkBox" >
                        <checkbox :label="item.moduleId+'-'+2" class="checkbox_list margin_bottom">{{item.moduleName}}</checkbox>
                      </div>
                    </checkbox-group>

                    </Col>
                  </Row>
                </td>
                <td width="35%">
                  <Row>
                    <Col>
                    <div class="padding_left " v-for='i in val.pc_tree' v-show="i.title==''?false:true">
                      <Tree
                        :data="val.pc_tree"
                        show-checkbox
                        ref="treePc"
                        @on-check-change="TreeNode_pc(key)"
                        class="checkboxtree_list "
                        >
                      </Tree>
                    </div>
                    </Col>
                  </Row>
                </td>
              </tr>
            </table>
          </div>
          </Col>
        </Row>

        <Row>
          <Col span="10" offset="6">
          <FormItem>
            <Button type="error" long  @click.native="handleSubmit('formValidate')" :disabled="isButton">{{$t('share.save')}}</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
      </Col>
    </Row>
  </div>
</template>
<script src="../js/roleAdd.js">

</script>
<style >
  @import "../css/roleAdd.css";
</style>
<style scoped>
  .table-b table td{border:1px solid #ececec;}
</style>
