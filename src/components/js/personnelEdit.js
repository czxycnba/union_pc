/**
 * Created by jing.li on 2018/1/4.
 */
import * as Validate from '../../assets/js/validate'
import axios from 'axios'
import * as URL from '../../assets/api/url'
import {usersApi} from '../../assets/api/api'
import * as FUN from '../../assets/js/lib'

export default {
  data () {

    return {
      fuhao:'：',
      isButton:false,
      ID:this.$route.query.id,
      labelWidth:150,  //label宽
      formValidate:{
        personnel_id:'',
        personnel_name:'',
        personnel_gender:'0',
        personnel_job:'',
        personnel_store:'',
        personnel_idnumber:'',
        personnel_phone:'',
        personnel_status:'',
        personnel_inTime:'',
        personnel_outTime:'',
      },
      comeTime:'',
      outTime:'',
      personnel_gender_list:[
      ],
      personnel_job_list:[],
      personnel_store_list:[],
      ruleValidate:{
        personnel_id: [{ required: true, validator: Validate.validateId,trigger: 'blur' }],
        personnel_name: [{ required: true, validator: Validate.validateName,trigger: 'blur' }],
        personnel_gender:[{ required: true,type:'number',validator: Validate.validateNotNull,trigger: 'blur' }],
        personnel_job: [{ required: true,type:'number', validator: Validate.validateNotNull, trigger: 'change' }],
        personnel_store: [{ required: true,type:'number', validator: Validate.validateNotNull, trigger: 'change' }],
        personnel_phone:[{ required: false, validator: Validate.validatePhone,trigger: 'blur' }],
        personnel_idnumber:[{ required: false, validator: Validate.validateIdNumber,trigger: 'blur' }]
      },
      personnel_status_list:[  //1在职 / 2离职/ 3休假
      ],
    }
  },
  created:function () {
    Validate.huoquObj.func(this);
  },
  mounted(){
    this.$nextTick(function () {
      this.personnel_gender_list.push(
        { id:0,name:this.$t('employees.male')},
        { id:1,name:this.$t('employees.female')}
      );
      this.personnel_status_list.push(
        { id:1,name:this.$t('employees.employee')},
        { id:2,name:this.$t('employees.formerEmployee')},
        { id:3,name:this.$t('employees.vacation')}
      ); //1在职 / 2离职/ 3休假

      this.getJobName();
      this.getStoreName();
      this.pageInit();
    })
  },
  methods: {

    pageInit(){
      axios.get(URL.usersEdit+this.ID).then( response=>{

        let val=response.data.data;

        this.formValidate.personnel_id=val.userCode;
        this.formValidate.personnel_name=val.userName;
        this.formValidate.personnel_gender=val.sex;
        this.formValidate.personnel_job=val.roleId;
        this.formValidate.personnel_store=val.shopId;
        this.formValidate.personnel_idnumber=val.idNumber;
        this.formValidate.personnel_phone=val.contact;
        this.formValidate.personnel_status=val.workCondition;
        this.formValidate.personnel_inTime=val.hireDate;
        this.formValidate.personnel_outTime=val.leaveDate;
      }).catch( error=>{
        this.$Message.error(FUN.errorTip(this,error.response.status));
      });
    },
    getJobName(){
      usersApi.getUsersJob().then( response=>{
        this.personnel_job_list=response.data
      })
    },
    getStoreName(){
      usersApi.getUsersStore().then( response=>{
        this.personnel_store_list=response.data;
      })
    },
    getpersonnel_inTime(date){
      this.comeTime=date;
    },
    getpersonnel_outTime(date){

      this.outTime=date;
    },

    handleSubmit (name) {
      let data={
        id:this.ID,
        userCode:this.formValidate.personnel_id,
        userName:this.formValidate.personnel_name,
        sex:this.formValidate.personnel_gender,
        roleId:this.formValidate.personnel_job,
        shopId:this.formValidate.personnel_store,
        idNumber:this.formValidate.personnel_idnumber,
        contact:this.formValidate.personnel_phone,
        workCondition:this.formValidate.personnel_status,
        hireDateStr:this.comeTime,
        leaveDateStr:this.outTime,
      };

      this.$refs[name].validate((valid) => {
        if (valid) {

          this.isButton=true;
          axios.put(URL.usersSee+this.ID,data).then( response=>{

            if(response.data.messageCode==200){
              this.$Message.success(this.$t('share.saveSuccess'));
              this.$router.push({path:'/personnel'})
            } else if(response.data.messageCode==20011){
              this.$Message.error(this.$t('employees.userIdWarning'));
              this.formValidate.personnel_id='';
              this.isButton=false;
            } else {
              this.$Message.error(this.$t('share.errSave'));
            }
          }).catch( error=>{
            this.$Message.error(this.$t('share.errSave'));
          });


        } else {
          this.$Message.error(this.$t('share.errSave'));
          this.isButton=false;
        }
      })
    }



  }
}
