import * as Validate from '../../assets/js/validate'
import {roleApi} from '../../assets/api/api'
import axios from 'axios'
import * as URL from '../../assets/api/url'
import * as FUN from '../../assets/js/lib'
export default {
  data () {
    return {
      fuhao:'：',
      isButton:false,
      ID:this.$route.query.id,
      labelWidth: 120,  // label宽
      disabledId:'',
      formValidate: {
        role_id: '',
        role_name: '',
        role_attr: ''
      },
      role_attr_List:[],
      ruleValidate: {
        role_id: [{ required: true, validator: Validate.validateId, trigger: 'blur' }],
        role_name: [{ required: true, validator:Validate.validateName,trigger: 'blur' }],
        role_attr: [{ required: true, validator:Validate.validateShopAdd_attr, trigger: 'change' }]
      },

      dataApp:[],
      modalApp: [],
      AllInputGroup_app: [],    // 查看权限输出的数据格式 1-2
      AllInputGroup_appRes: [], // 查看权限最后输出的数据格式
      TreeArrRes_app: [],       // 树 最后输出的数据格式
      dataPc: [],
      modalPc: [],
      AllInputGroup_pc: [],    // 查看权限输出的数据格式 1-2
      AllInputGroup_pcRes: [], // 查看权限最后输出的数据格式
      TreeArrRes_pc: [],       // 树 最后输出的数据格式
      allCheckedApp: [],
      allCheckedPc: [],
      pkModulePermissionsList:[],
      checkBoxInit:[],
      treeInit:[],
      allBtn:[]
    }
  },
  created:function () {
    Validate.huoquObj.func(this);
  },
  mounted () {
    this.$nextTick(function () {
      this.getRoleAttr();
      this.pageInit();

      this.formValidate.role_attr=='1'?this.disabledId=false:this.disabledId=true;
    })
  },
  methods: {
    pageInit () {
      axios.get(URL.roleEdit+this.ID).then( response=>{
        let role = response.data.data.role;
        this.formValidate.role_id=role.roleCode;
        this.formValidate.role_name=role.roleName;
        this.formValidate.role_attr=role.roleType.toString();
        let data = response.data.data.modulePermissionsWithCheckeds;
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
        this.setDataApp();
        this.setDataPc();
      }).catch( error=>{
        this.$Message.error(FUN.errorTip(error.response.status));

      })
    },
    getRoleAttr(){
      roleApi.getRoleType().then( response=>{
        this.role_attr_arr=response.data
        for(var i in this.role_attr_arr) {
          if(this.role_attr_arr[i]=='正式'){
            this.role_attr_arr[i] = this.$t('share.official')
          }
          if(this.role_attr_arr[i]=='模板'){
            this.role_attr_arr[i] = this.$t('share.template')
          }
        }
      }).catch( error=>{
        this.$Message.error(this,FUN.errorTip(error.response.status));
      })
    },
    getAttr(val){
      val=='1'?this.disabledId=true:this.disabledId=false;
    },

    /*app*/
    setDataApp () {
      this.modalApp = this.dataApp.map((v, i) => {
        let datas=v.childModules;
        let treeArr=[],quanbu='';
        switch (v.moduleName){
          case '灯控':
            v.moduleName = this.$t('roles.bulbs');
            break;
          case '统计':
            v.moduleName = this.$t('roles.info');
            break;
        }
        this.AllInputGroup_app[i] = [];
        this.TreeArrRes_app[i] = [];

        datas.map( v=>{
          if(v.permissionWithCheckedList.length>1){
            treeArr.push(v);
            quanbu=this.$t('roles.all')
          }
        });

        return {
          isCheckedAll: v.checked, // 控制全部
          checkAll: false,     // 控制查看权限全部
          app_name: v.moduleName,
          moduleId: v.id,
          indeterminate_app: false,
          app_checkBox: v.childModules.map((check, c) => {

            let checkedPer=[]
            check.permissionWithCheckedList.map((permission, p) => {
              if (permission.checked && permission.id === 2) this.AllInputGroup_app[i].push(check.id + '-2')
              if(permission.id===2){
                checkedPer.push(permission.checked)
              }
            });
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
            return {
              checked: checkedPer[0],
              moduleId: check.id,
              moduleName: check.moduleName,
              permissionIds: [2]
            }

          }),
          // 查看权限 - 点全部需要的数据
          AllInputGroup_app: v.childModules.map(check => {
            return check.id + '-2';
          }),

          app_tree: [{
            title: quanbu,
            expand: true,
            checked: v.checked,
            children: treeArr.map( (tree,k) => {
              //过滤查看
              let arr=[];
              let permissionIds=[];
              tree.permissionWithCheckedList.map(treeChild=>{
                if(treeChild.permissionName!=='查看'){
                  arr.push(treeChild);
                  if(treeChild.checked){
                    permissionIds.push(treeChild.id)
                  }
                }
              });

              this.TreeArrRes_app[i].push({
                moduleId:tree.id,
                permissionIds:permissionIds
              })
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
              return {
                title: tree.moduleName,
                id: tree.id,
                expand: false,
                checked: false,
                children: arr.map(treeChild => {
                  switch (treeChild.permissionName){
                    case '新增':
                      treeChild.permissionName= this.$t('share.new');
                      break;
                    case '编辑':
                      treeChild.permissionName = this.$t('share.edit');
                      break;
                    case '删除':
                      treeChild.permissionName = this.$t('share.delete');
                      break;
                    case '调控':
                      treeChild.permissionName = this.$t('share.adjust');
                      break;
                    case '开/关':
                      treeChild.permissionName = this.$t('share.onOff');
                      break;
                  }
                  return {
                    title: treeChild.permissionName,
                    parentId: tree.id,
                    id: treeChild.id,
                    checked: treeChild.checked
                  }
                })
              }
            })
          }]
        }
      });
      this.modalApp.map((v, i) => {
        // 查看权限 全部是否选中
        let isCheckAll = true
        v.app_checkBox.map((check, c) => {
          if (!check.checked) isCheckAll = false
          if (c === (v.app_checkBox.length - 1) && isCheckAll) {
            this.modalApp[i].checkAll = true
          }
        });
        // 进入页面，判断是否全选
        this.checkedAllApp(i)
      });

    },
    checkAll_app (key) {
      // 点击全部处理 - 根据key，树和查看权限都需要做相应的数据改变

      let checked
      if (this.modalApp[key].isCheckedAll) {
        checked = false
        this.modalApp[key].isCheckedAll = false
        this.AllInputGroup_app[key] = []
      } else {
        checked = true
        this.modalApp[key].isCheckedAll = true
        this.AllInputGroup_app[key] = this.modalApp[key].AllInputGroup_app

      }
      this.modalApp[key].app_tree[0].checked = checked
      this.modalApp[key].app_tree[0].children.forEach((child, c) => {
        child.checked = checked
        child.children.forEach((option, o) => {
          option.checked = checked
        })
      })
      this.modalApp[key].checkAll = checked
      this.TreeNode_app(key)
      this.AllInputGroup_app_Change(key)
    },
    AllInput_app (key) {
      // 查看权限 全部处理 - 根据key处理相应的数据
      if (this.modalApp[key].indeterminate_app) {
        this.modalApp[key].checkAll = false
      } else {
        this.modalApp[key].checkAll = !this.modalApp[key].checkAll
      }
      this.modalApp[key].indeterminate_app = false
      if (this.modalApp[key].checkAll) {
        this.AllInputGroup_app[key] = this.modalApp[key].AllInputGroup_app
      } else {
        this.AllInputGroup_app[key] = []
        //this.modalApp[key].checkAll = false
      }
      this.checkedAllApp(key)
    },
    AllInputGroup_app_Change (key) {
      // 查看权限 - change事件处理
      if (this.AllInputGroup_app[key].length === this.modalApp[key].AllInputGroup_app.length) {
        this.modalApp[key].indeterminate_app = false
        this.modalApp[key].checkAll = true
      } else if (this.AllInputGroup_app[key].length > 0) {
        this.modalApp[key].indeterminate_app = true
        this.modalApp[key].checkAll = false
      } else {
        this.modalApp[key].indeterminate_app = false
        this.modalApp[key].checkAll = false
      }

      this.checkedAllApp(key)
    },
    AllTree_app () {},
    TreeNode_app (key) {
      this.checkedAllApp(key)
      this.TreeArrRes_app[key]=[];

      let nodes = this.$refs.treeApp[key].getCheckedNodes()
      let filterNodes=[];
      //console.log('change得到的数组', nodes);
      nodes.map( v=>{
        if(v.title!=='全选'){
          filterNodes.push(v)
        }
      });
      this.TreeArrRes_app[key] = this.toFormatApp(filterNodes)
      //console.log('最后的要提交的数组', this.TreeArrRes_app)
    },
    toFormatApp (data) {
      // 树 - 最后需要的数据格式转换
      let arr = []
      data.forEach((v, i) => {
        if (v.children) {
          arr[arr.length] = {
            moduleId: v.id,
            permissionIds: v.children.map(c => {
              return c.id
            })
          }
        } else {
          let noMid = true
          if (arr.length) {
            arr.forEach((a, o) => {
              if (v.parentId === a.moduleId) {
                noMid = false
                let noPid = true
                a.permissionIds.forEach((p, s) => {
                  if (v.id === p) {
                    noPid = false
                  }
                  if (s === a.permissionIds.length - 1 && noPid && v.id !== 2) {
                    a.permissionIds.push(v.id)
                  }
                })
              }
              if (o === arr.length - 1 && noMid && v.id !== 2) {
                arr[arr.length] = {
                  moduleId: v.parentId,
                  permissionIds: [v.id]
                }
              }
            })
          } else {
            if (v.id !== 2) {
              arr[arr.length] = {
                moduleId: v.parentId,
                permissionIds: [v.id]
              }
            }
          }
        }
      })
      return arr
    },
    checkedAllApp (key) {
      // 全部按钮的选中状态处理 - 如果树和查看权限的全选为true，则全部为true，否则为false
      //console.log('.......', this.modalApp[key].app_tree[0].children.length, this.modalApp[key].app_tree[0].checked, this.modalApp[key].checkAll)
      if ((this.modalApp[key].app_tree[0].checked && this.modalApp[key].checkAll) || (!this.modalApp[key].app_tree[0].children.length && this.modalApp[key].checkAll)) {
        this.modalApp[key].isCheckedAll = true
        this.allCheckedApp[key] = this.modalApp[key].moduleId
      } else {
        this.allCheckedApp[key] = undefined
        this.modalApp[key].isCheckedAll = false
      }
    },

    /*pc*/
    setDataPc () {
      //console.log('未调整之前的数据pc', this.dataPc)
      this.modalPc = this.dataPc.map((v, i) => {
        let datas=v.childModules;
        let treeArr=[],quanbu='';
        switch (v.moduleName){
          case '系统管理':
            v.moduleName = this.$t('roles.systemManage');
            break;
          case '灯控管理':
            v.moduleName = this.$t('roles.bulbsManage');
            break;
          case '统计管理':
            v.moduleName = this.$t('roles.infoManage');
            break;
        }
        this.AllInputGroup_pc[i] = [];
        this.TreeArrRes_pc[i] = [];

        datas.map( v=>{
          if(v.permissionWithCheckedList.length>1){
            treeArr.push(v);
            quanbu=this.$t('roles.all')
          }
        });

        return {
          isCheckedAll: v.checked, // 控制全部
          checkAll: false,     // 控制查看权限全部
          pc_name: v.moduleName,
          moduleId: v.id,
          indeterminate_pc: false,
          pc_checkBox: v.childModules.map((check, c) => {
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
            let checkedPer=[]
            check.permissionWithCheckedList.map((permission, p) => {
              if (permission.checked && permission.id === 2) this.AllInputGroup_pc[i].push(check.id + '-2')
              if(permission.id===2){
                checkedPer.push(permission.checked)
              }
            });

            return {
              checked: checkedPer[0],
              moduleId: check.id,
              moduleName: check.moduleName,
              permissionIds: [2]
            }

          }),
          // 查看权限 - 点全部需要的数据
          AllInputGroup_pc: v.childModules.map(check => {
            return check.id + '-2';
          }),

          pc_tree: [{
            title: quanbu,
            expand: true,
            checked: v.checked,
            children: treeArr.map( (tree,k) => {
              //过滤查看
              let arr=[];
              let permissionIds=[];
              tree.permissionWithCheckedList.map(treeChild=>{
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
                if(treeChild.permissionName!=='查看'){
                  arr.push(treeChild);
                  if(treeChild.checked){
                    permissionIds.push(treeChild.id)
                  }
                }
              });

              this.TreeArrRes_pc[i].push({
                moduleId:tree.id,
                permissionIds:permissionIds
              })

              return {
                title: tree.moduleName,
                id: tree.id,
                expand: false,
                checked: false,
                children: arr.map(treeChild => {
                  switch (treeChild.permissionName){
                    case '新增':
                      treeChild.permissionName= this.$t('share.new');
                      break;
                    case '编辑':
                      treeChild.permissionName = this.$t('share.edit');
                      break;
                    case '删除':
                      treeChild.permissionName = this.$t('share.delete');
                      break;
                    case '复制':
                      treeChild.permissionName = this.$t('share.copy');
                      break;
                    case '停用':
                      treeChild.permissionName = this.$t('share.disable');
                      break;
                    case '启用':
                      treeChild.permissionName = this.$t('share.enable');
                      break;
                    case '重置密码':
                      treeChild.permissionName = this.$t('share.resetPassword');
                      break;
                    case '调控':
                      treeChild.permissionName = this.$t('share.adjust');
                      break;
                    case '开/关':
                      treeChild.permissionName = this.$t('share.onOff');
                      break;
                  }
                  return {
                    title: treeChild.permissionName,
                    parentId: tree.id,
                    id: treeChild.id,
                    checked: treeChild.checked
                  }
                })
              }
            })
          }]
        }
      });
      this.modalPc.map((v, i) => {
        // 查看权限 全部是否选中
        let isCheckAll = true
        v.pc_checkBox.map((check, c) => {
          if (!check.checked) isCheckAll = false
          if (c === (v.pc_checkBox.length - 1) && isCheckAll) {
            this.modalPc[i].checkAll = true

          }
        });
        // 进入页面，判断是否全选
        this.checkedAllPc(i)
      });

    },
    checkAll_pc (key) {
      // 点击全部处理 - 根据key，树和查看权限都需要做相应的数据改变

      let checked
      if (this.modalPc[key].isCheckedAll) {
        checked = false
        this.modalPc[key].isCheckedAll = false
        this.AllInputGroup_pc[key] = []
      } else {
        checked = true
        this.modalPc[key].isCheckedAll = true
        this.AllInputGroup_pc[key] = this.modalPc[key].AllInputGroup_pc

      }
      this.modalPc[key].pc_tree[0].checked = checked
      this.modalPc[key].pc_tree[0].children.forEach((child, c) => {
        child.checked = checked
        child.children.forEach((option, o) => {
          option.checked = checked
        })
      })
      this.modalPc[key].checkAll = checked
      this.TreeNode_pc(key)
      this.AllInputGroup_pc_Change(key)
    },
    AllInput_pc (key) {
      // 查看权限 全部处理 - 根据key处理相应的数据
      if (this.modalPc[key].indeterminate_pc) {
        this.modalPc[key].checkAll = false
      } else {
        this.modalPc[key].checkAll = !this.modalPc[key].checkAll
      }
      this.modalPc[key].indeterminate_pc = false
      if (this.modalPc[key].checkAll) {
        this.AllInputGroup_pc[key] = this.modalPc[key].AllInputGroup_pc
      } else {
        this.AllInputGroup_pc[key] = []
      }
      this.checkedAllPc(key)
    },
    AllInputGroup_pc_Change (key) {
      // 查看权限 - change事件处理
      if (this.AllInputGroup_pc[key].length === this.modalPc[key].AllInputGroup_pc.length) {
        this.modalPc[key].indeterminate_pc = false
        this.modalPc[key].checkAll = true
      } else if (this.AllInputGroup_pc[key].length > 0) {
        this.modalPc[key].indeterminate_pc = true
        this.modalPc[key].checkAll = false
      } else {
        this.modalPc[key].indeterminate_pc = false
        this.modalPc[key].checkAll = false
      }

      this.checkedAllPc(key)
    },
    AllTree_pc () {},
    TreeNode_pc (key) {
      this.checkedAllPc(key)
      this.TreeArrRes_pc[key]=[];

      let nodes = this.$refs.treePc[key].getCheckedNodes()
      let filterNodes=[];
      //console.log('change得到的数组', nodes);
      nodes.map( v=>{
        if(v.title!=='全选'){
          filterNodes.push(v)
        }
      });
      this.TreeArrRes_pc[key] = this.toFormatPc(filterNodes)

    },
    toFormatPc (data) {
      // 树 - 最后需要的数据格式转换
      let arr = []
      data.forEach((v, i) => {
        if (v.children) {
          arr[arr.length] = {
            moduleId: v.id,
            permissionIds: v.children.map(c => {
              return c.id
            })
          }
        } else {
          let noMid = true
          if (arr.length) {
            arr.forEach((a, o) => {
              if (v.parentId === a.moduleId) {
                noMid = false
                let noPid = true
                a.permissionIds.forEach((p, s) => {
                  if (v.id === p) {
                    noPid = false
                  }
                  if (s === a.permissionIds.length - 1 && noPid && v.id !== 2) {
                    a.permissionIds.push(v.id)
                  }
                })
              }
              if (o === arr.length - 1 && noMid && v.id !== 2) {
                arr[arr.length] = {
                  moduleId: v.parentId,
                  permissionIds: [v.id]
                }
              }
            })
          } else {
            if (v.id !== 2) {
              arr[arr.length] = {
                moduleId: v.parentId,
                permissionIds: [v.id]
              }
            }
          }
        }
      })
      return arr
    },
    checkedAllPc (key) {
      // 全部按钮的选中状态处理 - 如果树和查看权限的全选为true，则全部为true，否则为false
      if ((this.modalPc[key].pc_tree[0].checked && this.modalPc[key].checkAll) || (!this.modalPc[key].pc_tree[0].children.length && this.modalPc[key].checkAll)) {
        this.modalPc[key].isCheckedAll = true
        this.allCheckedPc[key] = this.modalPc[key].moduleId
      } else {
        this.allCheckedPc[key] = undefined
        this.modalPc[key].isCheckedAll = false
      }
    },

    handleSubmit (name) {
      /*this.pkModulePermissionsList = this.allCheckedApp.map(v => {
       return {
       moduleId: v,
       permissionIds: [2]
       }
       })

       this.pkModulePermissionsList = this.allCheckedPc.map(v => {
       return {
       moduleId: v,
       permissionIds: [2]
       }
       })*/

      this.allCheckedApp.map(v => {
        this.pkModulePermissionsList.push({
          moduleId: v,
          permissionIds: [2]
        })
      })
      this.allCheckedPc.map(v => {
        this.pkModulePermissionsList.push({
          moduleId: v,
          permissionIds: [2]
        })
      })


      this.AllInputGroup_app.map( v=>{
        v.map( child=>{
          let arr=child.split('-');
          this.pkModulePermissionsList.push({
            moduleId: parseInt(arr[0]),
            permissionIds: [parseInt(arr[1])]
          })
        })
      });
      this.AllInputGroup_pc.map( v=>{
        v.map( child=>{
          let arr=child.split('-');
          this.pkModulePermissionsList.push({
            moduleId: parseInt(arr[0]),
            permissionIds: [parseInt(arr[1])]
          })
        })
      });
      this.TreeArrRes_app.map( arr=>{
        arr.map( v=>{
          this.pkModulePermissionsList.push(v)
        })
      });
      this.TreeArrRes_pc.map( arr=>{
        arr.map( v=>{
          this.pkModulePermissionsList.push(v)
        })
      });
      let postData=[];
      this.pkModulePermissionsList.map( v=>{
        if(v.moduleId !== undefined  && v.permissionIds.length){
          postData.push(v)
        }
      })

      let data = {
        roleId: this.ID,
        roleCode: this.formValidate.role_id,
        roleName: this.formValidate.role_name,
        roleType: this.formValidate.role_attr,
        pkModulePermissionsList: postData
      };

      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isButton=true;
          axios.post(URL.roleSave,data).then( response=>{
            if(response.data.messageCode==200){
              this.$Message.success(this.$t('share.saveSuccess'));
              postData=[];
              this.$router.push({path:'/role'})
            }else if(response.data.messageCode==20005){
              this.$Message.error(this.$t('share.errSave'));
              this.formValidate.shopAdd_id='';
              this.isButton=false;
            }

          }).catch( error=>{
            this.$Message.error(this.$t('share.errSave'));
          });

        } else {
          this.pkModulePermissionsList=[];
          this.$Message.error(this.$t('share.errSave'));
          this.isButton=false;
        }
      })
    }
  }
}
