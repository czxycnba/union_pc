/**
 * Created by jing.li on 2018/1/4.
 */
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
      labelWidth:140,  //label宽
      formValidate:{
        pad_name:'',
        pad_psd:'',
        pad_status:'0',
        pad_id:'',
        pad_shopName:''
      },
      ruleValidate: {
        pad_name: [{ required: true,validator: Validate.validateId,trigger: 'blur'}],
      },
      filterTime:'',
      personnel_job_list:[],
      personnel_store_list:[],

      dataApp:[],
      modalApp: [],
      AllInputGroup_app: [],    // 查看权限输出的数据格式 1-2
      AllInputGroup_appRes: [], // 查看权限最后输出的数据格式
      allBtn:[],
      allLen:[]

    }
  },
  created:function () {
    Validate.huoquObj.func(this);
  },
  mounted () {
    this.$nextTick(function () {
      this.pageInit();
    })
  },
  methods: {
    pageInit () {
      axios.get(URL.shopAccountEdit+this.ID).then( response=>{

        let val=response.data.data.shopAccountWithStatus;
        this.formValidate.pad_name=val.padLoginName;
        this.formValidate.pad_psd='******';
        this.formValidate.pad_status=val.status;
        this.formValidate.pad_id=val.name;
        this.formValidate.pad_shopName=val.code;

        this.dataApp=response.data.data.moduleWithCheckeds
        this.setDataApp()

      }).catch( error=>{
        this.$Message.error(FUN.errorTip(this,error.response.status));
      })
    },
    /*app*/
    setDataApp () {

      this.modalApp = this.dataApp.map((v, i) => {
        this.AllInputGroup_app[i] = [];
        this.allBtn.push(v.id)   //全选id
        this.allLen.push(v.childModules.length)  //每组长度
        return {
          checkAll: false,     // 控制查看权限全部
          app_name: v.moduleName,
          moduleId: v.id,
          indeterminate_app: false,
          app_checkBox: v.childModules.map((check, c) => {
            if(check.checked){
              this.AllInputGroup_app[i].push(check.id)
            }


            return {
              checked: check.checked,
              moduleId: check.id,
              moduleName: check.moduleName,
              permissionIds: [2]
            }
          }),
          // 查看权限 - 点全部需要的数据
          AllInputGroup_app: v.childModules.map(check => {
            return check.id
          }),

        }
      });

      this.modalApp.map((v, i) => {
        let isCheckAll = true;
        v.app_checkBox.map((check, c) => {
          if (!check.checked) isCheckAll = false;
          //console.log(c, v.app_checkBox.length - 1, isCheckAll)
          if (c === (v.app_checkBox.length - 1) && isCheckAll) {
            this.modalApp[i].checkAll = true;
          }
        });

      });

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
      }
    },
    AllInputGroup_app_Change (key) {

      Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };

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
    },

    handleSubmit (name) {
      let moduleIds=[];
      this.AllInputGroup_app.map( (v,i)=>{
        if(v.length==this.allLen[i]){
          moduleIds.push(this.allBtn[i])
        }
        v.map( child=>{
          moduleIds.push(child)
        })
      });

      let data = {
        shopAccountId:this.ID,
        moduleIds:moduleIds
      };


      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isButton=true;
          axios.post(URL.shopAccountSave,data).then( response=>{
            if(response.data.messageCode==200){
              this.$Message.success(this.$t('share.saveSuccess'));
              this.$router.push({path:'/accountShop'})
            } else {
              this.$Message.error(this.$t('share.errSave'))
            }
          }).catch( error=>{
            this.$Message.error(this.$t('loginPage.errNet'));
          });

        } else {
          this.$Message.error(this.$t('share.errSave'));
          this.isButton=false;
        }
      })
    }
  }
}
