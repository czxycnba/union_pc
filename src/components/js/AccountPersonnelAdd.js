/**
 * Created by jing.li on 2018/1/3.
 */
import * as Validate from '../../assets/js/validate'
import * as FUN from '../../assets/js/lib'
import {userAccountApi} from '../../assets/api/api'
import axios from 'axios'
import * as URL from '../../assets/api/url'

export default {
  data () {
    return {
      fuhao: '：',
      isButton: false,
      labelWidth: 140,  //label宽
      formValidate: {
        ap_name: '',
        ap_pasd: '888888',
        ap_user: '',
        ap_type: '',
        ap_role: [],
        ap_status: '',
      },
      filterTime: '',
      ap_user_List: [],
      ap_type_List: [],
      ap_role_List: [],
      ap_status_List: [],
      ruleValidate: {
        ap_name: [{required: true, validator: Validate.validateId, trigger: 'blur'}],
        ap_pasd: [{required: true, validator: Validate.validateNotNull, trigger: 'blur'}],
        ap_user: [{required: true, type: 'number', validator: Validate.validateNotNull, trigger: 'change'}],
        ap_type: [{required: true, type: 'number', validator: Validate.validateNotNull, trigger: 'change'}],
        ap_role: [{required: true, type: 'array', validator: Validate.validateArrayNotNull, trigger: 'change'}],
        ap_status: [{required: true, type: 'number', validator: Validate.validateNotNull, trigger: 'change'}]
      },
      ap_shop_List: [],
      indeterminate: false,
      checkAll: false,
      shopAccountIds: [],   //权限
      checkAllGroup: [],
      labelCheck: ''
    }
  },
  created:function () {
    Validate.huoquObj.func(this);
  },
  mounted(){
    this.$nextTick(function () {
      this.ap_type_List.push(
        {id: 1, name: this.$t('share.official')},
        {id: 2, name: this.$t('share.demo')},
        {id: 3, name: this.$t('share.test')},
        {id: 4, name: this.$t('share.trial')}
      );

      this.ap_status_List.push(
        {id: 1, name: this.$t('share.online')},
        {id: 2, name: this.$t('share.offline')},
        {id: 3, name: this.$t('share.locked')},
        {id: 4, name: this.$t('share.expired')}
      );
      this.getrole_List();
      this.getuser_List();
      this.getshop_List();
    })
  },
  methods: {
    getrole_List(){
      userAccountApi.getRole().then(response => {
        this.ap_role_List = response.data;
      })
    },
    getuser_List(){
      userAccountApi.getUser().then(response => {
        this.ap_user_List = response.data;
      })
    },

    getUser(id){
      axios.get(URL.usersGetRol + id).then(response => {
        if (response.data.messageCode == 200) {
          if (response.data.data !== -1) {
            this.formValidate.ap_role.push(response.data.data)
          } else {
            this.formValidate.ap_role = []
          }
        }
      }).catch(error => {

        this.$Message.error(FUN.errorTip(this,error.response.status));
      })
    },


    getshop_List(){
      userAccountApi.getShop().then(response => {
        response.data.map(v => {
          this.ap_shop_List.push({
            id: v.id,
            shopCode: v.shopCode,
            shopName: v.shopName,
          })
          this.shopAccountIds.push(v.id)
        })
      })
    },

    getNode(selection, row){
      this.shopAccountIds.push(row.id)
    },
    getNodeCancel(selection, row){
      var index = this.shopAccountIds.indexOf(row.id);
      if (index > -1) {
        this.shopAccountIds.splice(index, 1);
      }
    },

    handleCheckAll () {
      //console.log(  this.indeterminate )
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = this.shopAccountIds;
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange (data) {
      if (data.length === this.shopAccountIds.length) {
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
      let data = {
        accountName: this.formValidate.ap_name,
        accountPwd: this.formValidate.ap_pasd,
        userId: this.formValidate.ap_user,
        accountType: this.formValidate.ap_type,
        roleIds: this.formValidate.ap_role, //[]
        accountStatus: this.formValidate.ap_status,
        shopAccountIds: this.checkAllGroup //[]
      };

      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isButton = true;
          axios.post(URL.userAccount, data).then(response => {
            if (response.data.messageCode == 200) {
              this.$Message.success(this.$t('share.saveSuccess'));
              this.$router.push({path: '/accountPersonnel'})
            }
            else if (response.data.messageCode == 20008) {
              this.formValidate.ap_name = '';
              this.$Message.error(this.$t('account.accountWarning'));
              this.isButton = false;
            } else {
              this.$Message.error(this.$t('share.errSave'));
            }
          }).catch(error => {
            this.$Message.error(this.$t('share.errSave'));
          })
        } else {
          this.$Message.error(this.$t('share.errSave'));
          this.isButton = false;
        }
      })
    }
  }
}
