/**
 * Created by jing.li on 2018/1/4.
 */
import * as Validate from '../../assets/js/validate'
import * as FUN from '../../assets/js/lib'
import {usersApi} from '../../assets/api/api'
import axios from 'axios'
import * as URL from '../../assets/api/url'

export default {
  data () {

    return {
      fuhao:'：',
      isButton:false,
      labelWidth:150,  //label宽
      formValidate:{
        personnel_id:'',
        personnel_name:'',
        personnel_gender:'',
        personnel_job:'',
        personnel_store:'',
        personnel_idnumber:'',
        personnel_phone:'',
        personnel_status:1,
        personnel_inTime:'',
        personnel_OutTime:''
      },
      comeTime:'',
      outTime:'',
      //personnel_gender_list:{"0":'男',"1":'女'},
      personnel_gender_list:[
      ],
      personnel_job_list:[],
      personnel_store_list:[],
      personnel_status_list:[  //1在职 / 2离职/ 3休假
      ],
      ruleValidate:{
        personnel_id: [{ required: true, validator: Validate.validateId,trigger: 'blur' }],
        personnel_name: [{ required: true, validator: Validate.validateName,trigger: 'blur' }],
        personnel_gender:[{ required: true,type:'number',validator: Validate.validateNotNull, trigger: 'change' }],
        personnel_job:   [{ required: true,type:'number', validator: Validate.validateNotNull, trigger: 'change' }],
        personnel_store: [{ required: true,type:'number', validator: Validate.validateNotNull, trigger: 'change' }],
        personnel_phone:[{ required: true, validator: Validate.validatePhone,trigger: 'blur' }],
        personnel_idnumber:[{ required: true, validator: Validate.validateIdNumber,trigger: 'blur' }],
      },
      options:{
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      }
    }
  },
  computed:{

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
    })
  },
  methods: {
    getpersonnel_inTime(date){
      this.comeTime=date;
    },
    getpersonnel_outTime(date){
      this.outTime=date;
    },


    getJobName(){
      usersApi.getUsersJob().then( response=>{
        this.personnel_job_list=response.data;
      })
    },
    getStoreName(){
      usersApi.getUsersStore().then( response=>{
        this.personnel_store_list=response.data;
      })
    },
    handleSubmit (name) {
      //console.log(this.personnel_job_list)
      let data={
        userCode: this.formValidate.personnel_id,
        userName: this.formValidate.personnel_name,
        sex: this.formValidate.personnel_gender,
        roleId: this.formValidate.personnel_job,
        shopId: this.formValidate.personnel_store,
        idNumber:  this.formValidate.personnel_idnumber,
        contact: this.formValidate.personnel_phone,
        workCondition: this.formValidate.personnel_status,
        hireDateStr:  this.comeTime,
        leaveDateStr:  this.outTime
      };

      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isButton=true;
          axios.post(URL.usersSee, data)
            .then(response =>{
              //console.log(response)
              if(response.data.messageCode==200){
                this.$Message.success(this.$t('share.saveSuccess'));
                this.$router.push({path:'/personnel'})
              }
              else if(response.data.messageCode==20011){
                this.$Message.error(this.$t('employees.userIdWarning'));
                this.formValidate.personnel_id='';
                this.isButton=false;
              }
              else{
                this.$Message.error(this.$t('share.errSave'));
              }

            }).catch(error=>{
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
