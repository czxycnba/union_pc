/**
 * Created by jing.li on 2018/1/4.
 */
import * as FUN from '../../assets/js/lib'
import * as URL from '../../assets/api/url'
import axios from 'axios'
export default {
  data () {
    return {
      fuhao:'：',
      ID:this.$route.query.id,
      accountName:'',
      accountPwd:'******',
      userName:'',
      accountTypeDesc:'',
      roleName:'',
      accountStatusDesc:'',
      shopPermissionsSelectedList:[],

      shopPermissionsSelectedList_ishow:false,

      labelWidth:140,  //label宽
      ruleValidate:{
        personnel_id: [{ required: true }]
      }
    }
  },
  mounted(){
    this.$nextTick(function () {
      this.pageInit();
    })
  },
  methods:{
    pageInit(){
      axios.get(URL.userAccount+this.ID).then( response=>{
        //console.log(response.data.data);
        let val=response.data.data;
        this.accountName=val.accountName;
        //this.accountPwd=val.accountPwd;
        this.accountPwd='******';
        this.userName=val.userName;
        this.accountTypeDesc=val.accountTypeDesc;
        this.roleName=val.roleName;
        this.accountStatusDesc=val.accountStatusDesc;
        this.shopPermissionsSelectedList=val.shopPermissionsSelectedList;

        if(this.shopPermissionsSelectedList.length>0){
          this.shopPermissionsSelectedList_ishow=true
        }

      }).catch( error=>{
        this.$Message.error(FUN.errorTip(this,error.response.status));
      });

    }
  }
}
