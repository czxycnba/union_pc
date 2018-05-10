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
      personnel_id:'',
      personnel_name:'',
      personnel_gender:'',
      personnel_job:'',
      personnel_area:'',
      personnel_store:'',
      personnel_idnumber:'',
      personnel_phone:'',
      personnel_status:'',
      personnel_inTime:'',
      personnel_OutTime:'',
      labelWidth:140,  //label宽
      ruleValidate:{
        personnel_id: [{ required: true }],
      }
    }
  },
  mounted(){
    this.$nextTick(function () {
      //console.log(this.ID)
      this.pageInit();

    })
  },
  methods:{
    pageInit(){
      axios.get(URL.usersSee+this.ID).then( response=>{
        let val=response.data.data;
        this.personnel_id=val.userCode;
        this.personnel_name=val.userName;
        this.personnel_gender=val.sex;
        this.personnel_job=val.roleName;
        this.personnel_store=val.shopName;
        this.personnel_idnumber=val.idNumber;
        this.personnel_phone=val.contact;
        this.personnel_status=val.workCondition;
        this.personnel_inTime=val.hireDate;
        this.personnel_OutTime=val.leaveDate;

      }).catch( error=>{
        this.$Message.error(FUN.errorTip(this,error.response.status));
      });


    }
  }
}
