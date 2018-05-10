/**
 * Created by jing.li on 2018/1/4.
 */
import axios from 'axios'
import * as URL from '../../assets/api/url'
import * as FUN from '../../assets/js/lib'

export default {
  data () {
    return {
      fuhao:'：',
      ID:this.$route.query.id,
      labelWidth:130,  //label宽
      ruleValidate:{
        shopAdd_id: [{ required: true }],
      },
      roleCode:'',
      roleName:'',
      roleTypeName:'',
      dataApp:[],
      dataPc:[],
      modalApp:[],
      modalPc:[]
    }
  },
  mounted(){
    this.$nextTick(function () {
      this.pageInit();
    })
  },
  methods:{
    pageInit(){
      axios.post(URL.roleDetail+this.ID).then( response=>{
        let val=response.data.data.roleWithRoleType;
        this.roleCode=val.roleCode;
        this.roleName=val.roleName;
        this.roleTypeName=val.roleTypeName;
        let data=response.data.data.modulePermissionsWithCheckeds;
          if(this.roleTypeName=='正式'){
            this.roleTypeName = this.$t('share.official')
          } else if(this.roleTypeName=='模板'){
            this.roleTypeName = this.$t('share.template')
          }

        data.map(v => {
          switch (v.channel) {
            case 'app':
              this.dataApp.push(v);
              break;
            case 'pc':
              this.dataPc.push(v);
              break;
          }
        });

        let arrApp=[];
        let arrPc=[];


        this.dataApp.map( data=>{
          if(data.checked){
            arrApp.push(data)
          }
        });

        arrApp.map( appdata => {

          switch (appdata.moduleName){
            case '灯控':
              appdata.moduleName = this.$t('roles.bulbs');
              break;
            case '统计':
              appdata.moduleName = this.$t('roles.info');
              break;
          }
          this.modalApp.push({
            app_name: appdata.moduleName,
            app_checkBox:appdata.childModules.map( check=>{
              switch (check.moduleName){
                case '场景控制':
                  check.moduleName = this.$t('roles.scenes');
                  break;
                case '动效控制':
                  check.moduleName = this.$t('roles.effect');
                  break;
                case '灯控台账':
                  check.moduleName = this.$t('roles.devices');
                  break;
                case '设备统计':
                  check.moduleName = this.$t('roles.deviceInfo');
                  break;
                case '耗电统计':
                  check.moduleName = this.$t('roles.energyUsage');
                  break;
              }
              if(check.checked){
                return check.moduleName
              }
            }),
            app_tree:appdata.childModules.map( tree=>{
              //过滤查看

              let seeArr = tree.permissionWithCheckedList.filter((data) => {
                if(data.permissionName!=='查看'){
                  return data
                }
              });

              let listArr=[];
              seeArr.filter( (v)=>{
                if(v.checked){
                  listArr.push(v)
                }
              });
              switch (tree.moduleName){
                case '场景控制':
                  tree.moduleName = this.$t('roles.scenes');
                  break;
                case '动效控制':
                  tree.moduleName = this.$t('roles.effect');
                  break;
                case '灯控台账':
                  tree.moduleName = this.$t('roles.devices');
                  break;
                case '设备统计':
                  tree.moduleName = this.$t('roles.deviceInfo');
                  break;
                case '耗电统计':
                  tree.moduleName = this.$t('roles.energyUsage');
                  break;
              }

              if (listArr.length) {
                return {
                  title: tree.moduleName,
                  subChild: listArr.map(treechild=> {
                    switch (treechild.permissionName){
                      case '新增':
                        treechild.permissionName= this.$t('share.new');
                        break;
                      case '编辑':
                        treechild.permissionName = this.$t('share.edit');
                        break;
                      case '删除':
                        treechild.permissionName = this.$t('share.delete');
                        break;
                      case '调控':
                        treechild.permissionName = this.$t('share.adjust');
                        break;
                      case '开/关':
                        treechild.permissionName = this.$t('share.onOff');
                        break;
                    }
                    if (treechild.checked) {
                      return treechild.permissionName
                    }
                  })
                }
              }

            })

          })
        });

        this.dataPc.map( data=>{
          if(data.checked){
            arrPc.push(data)
          }
        });
        arrPc.map( appdata => {
          switch (appdata.moduleName){
            case '系统管理':
              appdata.moduleName = this.$t('roles.system');
              break;
            case '灯控管理':
              appdata.moduleName = this.$t('roles.bulbsManage');
              break;
            case '统计管理':
              appdata.moduleName = this.$t('roles.infoManage');
              break;
          }
          this.modalPc.push({
            pc_name: appdata.moduleName,
            pc_checkBox:appdata.childModules.map( check=>{
              switch (check.moduleName){
                case '店铺管理':
                  check.moduleName = this.$t('store.store');
                  break;
                case '角色管理':
                  check.moduleName = this.$t('roles.roles');
                  break;
                case '人员管理':
                  check.moduleName = this.$t('employees.employees');
                  break;
                case '账户管理（人员）':
                  check.moduleName = this.$t('account.employees');
                  break;
                case '账户管理（店铺）':
                  check.moduleName = this.$t('account.store');
                  break;
                case '场景列表':
                  check.moduleName = this.$t('roles.scenesList');
                  break;
                case '动效列表':
                  check.moduleName = this.$t('roles.effectList');
                  break;
                case '灯具列表':
                  check.moduleName = this.$t('roles.bulbsList');
                  break;
                case '设备统计图':
                  check.moduleName = this.$t('roles.statistics');
                  break;
                case '耗电统计图':
                  check.moduleName = this.$t('roles.energyUsageMap');
                  break;
              }
              if(check.checked){
                return check.moduleName
              }
            }),
            pc_tree:appdata.childModules.map( tree=>{
              switch (tree.moduleName){
                case '店铺管理':
                  tree.moduleName = this.$t('store.store');
                  break;
                case '角色管理':
                  tree.moduleName = this.$t('roles.roles');
                  break;
                case '人员管理':
                  tree.moduleName = this.$t('employees.employees');
                  break;
                case '账户管理（人员）':
                  tree.moduleName = this.$t('account.employees');
                  break;
                case '账户管理（店铺）':
                  tree.moduleName = this.$t('account.store');
                  break;
                case '场景列表':
                  tree.moduleName = this.$t('roles.scenesList');
                  break;
                case '动效列表':
                  tree.moduleName = this.$t('roles.effectList');
                  break;
                case '灯具列表':
                  tree.moduleName = this.$t('roles.bulbsList');
                  break;
                case '设备统计图':
                  tree.moduleName = this.$t('roles.statistics');
                  break;
                case '耗电统计图':
                  tree.moduleName = this.$t('roles.energyUsageMap');
                  break;
              }
              //过滤查看
              let seeArr = tree.permissionWithCheckedList.filter((data) => {
                if(data.permissionName!=='查看'){
                  return data
                }
              });

              let listArr=[];
              seeArr.filter( (v)=>{
                if(v.checked){
                  listArr.push(v)
                }
              });

              if (listArr.length) {
                return {
                  title: tree.moduleName,
                  subChild: listArr.map(treechild=> {
                    switch (treechild.permissionName){
                      case '新增':
                        treechild.permissionName= this.$t('share.new');
                        break;
                      case '编辑':
                        treechild.permissionName = this.$t('share.edit');
                        break;
                      case '删除':
                        treechild.permissionName = this.$t('share.delete');
                        break;
                      case '复制':
                        treechild.permissionName = this.$t('share.copy');
                        break;
                      case '停用':
                        treechild.permissionName = this.$t('share.disable');
                        break;
                      case '启用':
                        treechild.permissionName = this.$t('share.enable');
                        break;
                      case '重置密码':
                        treechild.permissionName = this.$t('share.resetPassword');
                        break;
                      case '调控':
                        treechild.permissionName = this.$t('share.adjust');
                        break;
                      case '开/关':
                        treechild.permissionName = this.$t('share.onOff');
                        break;
                    }
                    if (treechild.checked) {
                      return treechild.permissionName
                    }
                  })
                }
              }

            })

          })
        })

      }).catch( error=>{
        this.$Message.error(this.$t('loginPage.errNet'));
      });
    }
  }
}
