<template>
  <div style="padding: 10px;">
    <Row class="addHeader">
      <Col span="1">
      <router-link to="/role"><img src="../../../static/img/ico_left.png" alt=""></router-link>
      </Col>
      <Col span="22"><p>{{$t('roles.viewRoles')}}</p></Col>
    </Row>

    <Row class="formBox">
      <Col span="24">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="labelWidth">
          <Row>
            <Col span="8" offset="8" >
              <FormItem :label="$t('roles.rolesId')+fuhao" prop="shopAdd_id">
                <p class="roleInfo">{{roleCode}}</p>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8" offset="8" >
            <FormItem :label="$t('roles.rolesName')+fuhao" prop="shopAdd_id">
              <p class="roleInfo">{{roleName}}</p>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8" offset="8" >
            <FormItem :label="$t('roles.rolesType')+fuhao" prop="shopAdd_id">
              <p class="roleInfo">{{roleTypeName}}</p>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>

    <Row class="roleInfo_app">
      <Col span="22" offset="1">
      <Row class="roleInfo_box">
        <Col span="22" offset="1">
        <h2>{{$t('roles.appPermissions')}}</h2>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" >
          <tr class="roleInfo_header">
            <td width="20%" style="text-align: center">{{$t('roles.moduleName')}}</td>
            <td width="30%" style="text-align: center">{{$t('roles.viewing')}}</td>
            <td width="50%" style="text-align: center">{{$t('roles.editing')}}</td>
          </tr>
        </table>
        <div class="table-b innerbox tableBox">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" >
            <tr v-for="i in modalApp" class="tableBodyInfo">
              <td width="20%">
                <Row>
                  <Col><h6 class="table_text_center">{{i.app_name}}</h6></Col>
                </Row>
              </td>
              <td width="30%">
                <Row>
                  <Col style="text-align: center;line-height: 30px;font-size: 14px;">
                  <p v-for="i in i.app_checkBox">{{i}}</p>
                  </Col>
                </Row>
              </td>
              <td width="50%">
                <Row>
                  <Col>
                  <div v-for="o in i.app_tree">
                    <p v-if="o" style="text-align: left;padding-left: 10px;font-size: 14px;line-height: 25px;">
                      {{o.title}} :<span v-for="c in o.subChild"> {{c}} &nbsp; &nbsp;</span>
                    </p>
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
            <td width="30%" style="text-align: center">{{$t('roles.viewing')}}</td>
            <td width="50%" style="text-align: center">{{$t('roles.editing')}}</td>
          </tr>
        </table>
        <div class="table-b innerbox tableBox">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" >
            <tr v-for="i in modalPc" class="tableBodyInfo">
              <td width="20%">
                <Row>
                  <Col><h6 class="table_text_center">{{i.pc_name}}</h6></Col>
                </Row>
              </td>
              <td width="30%">
                <Row>
                  <Col style="text-align: center;line-height: 30px;font-size: 14px;">
                  <p v-for="i in i.pc_checkBox">{{i}}</p>
                  </Col>
                </Row>
              </td>
              <td width="50%">
                <Row>
                  <Col>
                  <div v-for="o in i.pc_tree">
                    <p v-if="o" style="text-align: left;padding-left: 10px;font-size: 14px;line-height: 25px;">
                      {{o.title}} :<span v-for="c in o.subChild"> {{c}} &nbsp; &nbsp;</span>
                    </p>
                  </div>
                  </Col>
                </Row>
              </td>
            </tr>
          </table>
        </div>
        </Col>
      </Row>
      </Col>
    </Row>
  </div>
</template>
<script src="../js/roleSee.js">

</script>
<style scoped>
  @import "../css/roleSee.css";
</style>

<style scoped>
  .table-b table td{border:1px solid #ececec;}
</style>
