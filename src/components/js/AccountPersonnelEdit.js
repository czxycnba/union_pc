/**
 * Created by jing.li on 2018/1/4.
 */
import * as Validate from '../../assets/js/validate'
import * as FUN from '../../assets/js/lib'
import {userAccountApi} from '../../assets/api/api'
import axios from 'axios'
import * as URL from '../../assets/api/url'

export default {
  data () {
    return {
      fuhao:'：',
      isButton:false,
      noCheck:false,
      ID:this.$route.query.id,
      labelWidth:140,  //label宽
      formValidate:{
        ap_name:'',
        ap_pasd:'******',
        ap_user:'',
        ap_type:'',
        ap_role:[],
        ap_status:'',
      },
      filterTime:'',
      ap_user_List:[],
      ap_type_List:[
      ],
      ap_role_List:[],
      ap_status_List:[
      ],
      ruleValidate:{
        ap_name: [{ required: true, validator: Validate.validateId,trigger: 'blur' }],
        ap_pasd: [{ required: true, validator: Validate.validateNotNull,trigger: 'blur' }],
        ap_user: [{ required: true, type:'number',validator: Validate.validateNotNull, trigger: 'change' }],
        ap_type: [{ required: true, type:'number',validator: Validate.validateNotNull, trigger: 'change' }],
        ap_role: [{ required: true, type:'array' ,validator: Validate.validateArrayNotNull, trigger: 'change' }],
        ap_status:[{required: true, type:'number',validator: Validate.validateNotNull, trigger: 'change' }]
      },
      ap_shop_List:[],
      all_shop_list:[],
      indeterminate:false,
      checkAll:false,
      shopAccountIds:[],   //权限
      checkAllGroup:[],
      labelCheck:''
    }
  },
  created:function () {
    Validate.huoquObj.func(this);
  },
  mounted(){
    this.$nextTick(function () {
      this.ap_type_List.push(
        { id:1,name:this.$t('share.official')},
        { id:2,name:this.$t('share.demo')},
        { id:3,name:this.$t('share.test')},
        { id:4,name:this.$t('share.trial')}
      );

      this.ap_status_List.push(
        { id:1,name:this.$t('share.online')},
        { id:2,name:this.$t('share.offline')},
        { id:3,name:this.$t('share.locked')},
        { id:4,name:this.$t('share.expired')}
      );
      this.getrole_List();
      this.getuser_List();
      this.pageInit();
    })
  },
  methods: {
    pageInit(){
      axios.get(URL.userAccountEdit+this.ID).then( response=>{

        if(response.data.messageCode==200){
          let val=response.data.data;
          this.formValidate.ap_name=val.accountName;
          //this.formValidate.ap_pasd=val.accountPwd;
          this.formValidate.ap_user=val.userId;
          this.formValidate.ap_type=val.accountType;
          this.formValidate.ap_role=val.roleIds;
          this.formValidate.ap_status=val.accountStatus;
          console.log(this.formValidate.ap_status);

          val.shopPermissionsList.map( (v,i)=>{

            //console.log('99999',v.shopAccountId)
            this.ap_shop_List.push({
              shopId:v.shopId,
              shopName:v.shopName,
              shopCode:v.shopCode,
              shopAccountId:v.shopAccountId,
              selected:v.selected
            });

            this.all_shop_list.push(v.shopAccountId);

            if(v.selected===1){
              this.shopAccountIds.push(v.shopAccountId)
            }

          });
          if(this.all_shop_list.length === this.shopAccountIds.length){
             this.checkAll =true;
          }
          this.checkAllGroup=this.shopAccountIds;

        }
      }).catch( error=>{
        this.$Message.error(FUN.errorTip(this,error.response.status));
      })
    },
    getrole_List(){
      userAccountApi.getRole().then(response=>{
        this.ap_role_List=response.data;
      })
    },
    getuser_List(){
      userAccountApi.getUser().then(response=>{
        this.ap_user_List=response.data;
      })
    },

    getNode(selection,row){
      this.shopAccountIds.push(row.id)
    },
    getNodeCancel(selection,row){
      var index = this.shopAccountIds.indexOf(row.id);
      if (index > -1) {
        this.shopAccountIds.splice(index, 1);
      }
    },

    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = this.all_shop_list;
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange (data) {
      if (data.length === this.all_shop_list.length) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        //this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },

    handleSubmit (name) {
      let data={
        accountName: this.formValidate.ap_name,
        //accountPwd: this.formValidate.ap_pasd,
        userId: this.formValidate.ap_user,
        accountType: this.formValidate.ap_type,
        roleIds: this.formValidate.ap_role, //[]
        accountStatus: this.formValidate.ap_status,
        shopAccountIds: this.checkAllGroup //[]
      };

      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isButton=true;
          axios.put(URL.userAccount+this.ID,data).then( response=>{
            if(response.data.messageCode==200){
              this.$Message.success(this.$t('share.saveSuccess'));
              this.$router.push({path:'/accountPersonnel'})
            }
            else if(response.data.messageCode==20008){
              this.$Message.error(this.$t('account.accountWarning'));
              this.formValidate.ap_name='';
              this.isButton=false;
            }else {
              this.$Message.error(this.$t('share.errSave'));
            }
          }).catch( error=>{
            this.$Message.error(this.$t('share.errSave'));
          })
        } else {
          this.$Message.error(this.$t('share.errSave'));
          this.isButton=false;
        }
      })
    }
  }
}
