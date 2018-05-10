/**
 * Created by jing.li on 2018/1/3.
 */
import {userAccountApi} from '../../assets/api/api'
import axios from 'axios'
import * as URL from '../../assets/api/url'
import * as FUN from '../../assets/js/lib'
import * as Validate from '../../assets/js/validate'
export default {
  data () {
    const pasReg= /^[0-9a-zA-Z]+$/;
    //const reg =/[\\u4E00-\\u9FFF]+","g"/;
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('account.pwdErr')));
      } else if(!pasReg.test(value)){
        callback(new Error(this.$t('account.pwdErr1')));
      }else {
        if (this.formValidate.pasdOnce !== '') {
          // 对第二个密码框单独验证
          this.$refs.formValidate.validateField('pasdOnce');
        }
        callback();
      }
    };

    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('account.pwdErr2')));
      } else if (value !== this.formValidate.pasd) {
        callback(new Error(this.$t('account.pwdEr3')));
      }else {
        callback();
      }
    };
    return {
      currentPage:1, //当前页码
      pageSize:10,   //每页10条
      totalCount:0,   //总条数
      beginIndex:'',
      endIndex:'',
      ishowPage:false,
      perAdd:false,
      perStart:false,
      perStop:false,
      perSee:false,
      perEdit:false,
      perDel:false,
      perPasd:false,
      labelWidth:120,  //label宽
      ap_id:'',
      ap_name:'',
      ap_status:0,
      ap_status_list:[
      ],
      modal_stop:false, //提示--停用 0  启用1
      modal_use:false, //提示--停用 0  启用1
      modal_del:false,
      modal_del_Id:'',
      modal_pass:false,
      initialPass:false,  //是否恢复888888
      initpwd:'888888',
      rowId:'',
      modal_loading:false,
      columns: [

      ],
      tableData: [],
      formValidate:{
        pasd:'',
        pasdOnce:''
      },
      ruleValidate:{
        pasd: [
          { validator: validatePass,required: true},
          { type: 'string', min: 6, message: this.$t('account.pwdErr4') }
        ],
        pasdOnce: [
          { validator: validatePassCheck, required: true }
        ],
      },
      rowIndex:'',
      textstop:this.$t('share.disable'),
      textstar:this.$t('share.enable'),
    }
  },
  created:function () {
    Validate.huoquObj.func(this);
  },
  mounted(){
    this.$nextTick(function () {
      this.columns.push(
        {title: this.$t('share.num'), key: 'code',width:80},
        {title: this.$t('share.accountName'), key: 'accountName'},
        {title: this.$t('share.userName'), key: 'userName'},
        {title: this.$t('share.permissions'), key: 'roleName'},
        {title: this.$t('share.status'), key: 'accountStatus',width:120},
        {title: this.$t('share.action'), key: 'action',align: 'center',width:300,
          render: (h, params) => {
            return this.actionBtn(h, params)
          }
        }

      );
      this.ap_status_list.push(
        { id:0,name:this.$t('share.all')},
        { id:1,name:this.$t('share.online')},
        { id:2,name:this.$t('share.offline')},
        { id:3,name:this.$t('share.locked')},
        { id:4,name:this.$t('share.expired')}
      );
      this.pageInit(this.currentPage);
      this.getPer();
    })
  },
  methods: {
    pageInit(page){
      this.currentPage=page;
      let data={
        accountName:this.ap_id,
        userName:this.ap_name,
        accountStatus:this.ap_status,
        pageNo:this.currentPage,
        pageSize:''
      };
      this.getRoleAttr(data,page);
    },

    getRoleAttr(data,page){
      this.tableData=[];
      userAccountApi.getUserAccount({params:data}).then( response=>{
        let datas=response.data.data;

        datas.map( (v,i)=>{
          if(v.accountStatus=='在线'){
            v.accountStatus=this.$t('share.online');
          }else if(v.accountStatus=='离线'){
            v.accountStatus=this.$t('share.offline');
          }else if(v.accountStatus=='锁定'){
            v.accountStatus=this.$t('share.locked');
          }else if(v.accountStatus=='失效'){
            v.accountStatus=this.$t('share.expired');
          }
          this.tableData.push({
            id:v.id,
            code:i+1,
            accountName:v.accountName,
            userName:v.userName,
            roleName:v.roleName,
            accountStatus:v.accountStatus,
            enableMark:v.enableMark
          })
        });
        if(this.tableData.length>0){
          this.ishowPage=true;
        }else{
          this.ishowPage=false;
        }
        this.pageSize=response.data.pageSize;
        this.totalCount=response.data.totalCount;
        this.beginIndex=response.data.beginIndex;
        this.endIndex=response.data.endIndex;
        this.$refs.pageBox.$el.children[1].innerText=this.$t('share.numPage')+page+this.$t('share.page')+' '+ this.$t('share.total')+response.data.totalPage+this.$t('share.page');
        this.$refs.pageBox.$el.children[1].innerText.style={'font-size':14+'px'};

      }).catch( error=>{
        //this.$Message.error(FUN.errorTip(this,'errnet'));
      })
    },

    APSearch(){
      let data={
        accountName:this.ap_id,
        userName:this.ap_name,
        accountStatus:this.ap_status,
        pageNo:this.currentPage
      };
      this.getRoleAttr(data,this.currentPage);
    },

    getPer(){
      let per=JSON.parse(localStorage.getItem('per'));
      let perList=[];
      per.map( child=>{
        if(child.url==this.$route.path){
          perList.push(child.permissionList)
        }
      });
      perList.map( v=>{
        v.map( v=>{
          switch(v){
            case '新增':this.perAdd  =true;break;
            case '查看':this.perSee  =true;break;
            case '编辑':this.perEdit =true;break;
            case '删除':this.perDel  =true;break;
            case '启用':this.perStart=true;break;
            case '停用':this.perStop =true;break;
            case '重置密码':this.perPasd =true;break;
          }
        })
      })
    },

    seeBtn(h, params){
      return h('span', {
        props: {type: 'info', size: 'small'},
        style: {marginRight: '8px',cursor:'pointer',color:'#229ddd'},
        on: {
          click: () => {
            this.$router.push({path:'/accountPersonnelSee',query:{id:this.tableData[params.index].id}})
          }
        }
      }, this.$t('share.view'))
    },
    delBtn(h, params){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:'#229ddd'},
        on: {
          click: () => {
            this.modalDel(params.index);
          }
        }
      }, this.$t('share.delete'))
    },
    editBtn(h, params){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:'#229ddd'},
        on: {
          click: () => {
            this.$router.push({path:'/accountPersonnelEdit',query:{id:this.tableData[params.index].id}})
          }
        }
      }, this.$t('share.edit'))
    },
    passBtn(h, params){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:'#229ddd'},
        on: {
          click: () => {
            this.modalPass(params.index)

          }
        }
      }, this.$t('account.resetPassword'))
    },
    disableBtn(h, params,text){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:'#229ddd'},
        on: {
          click: () => {
            this.modal_stoptip(params.index);
          }
        }
      }, this.$t('share.disable'))
    },
    enableBtn(h, params){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:'#229ddd'},
        on: {
          click: () => {
            this.modal_usetip(params.index);
          }
        }
      },  this.$t('share.enable'))
    },
    unPerBtn(h, params,text){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:'#ccc'},
      }, text)
    },
    actionBtn(h, params){

      if(this.tableData[params.index].accountStatus==this.$t('share.expired')){
        return[
            this.perSee?this.seeBtn(h,params):this.unPerBtn(h,params,this.$t('share.view')),
          this.perDel?this.delBtn(h,params):this.unPerBtn(h,params,this.$t('share.delete')),
          this.perEdit?this.editBtn(h,params):this.unPerBtn(h,params,this.$t('share.edit'))
        ]
      }else{
        if( this.tableData[params.index].enableMark==0){
          return[
            this.perSee?this.seeBtn(h,params):this.unPerBtn(h,params,this.$t('share.view')),
            this.perStart?this.enableBtn(h,params):this.unPerBtn(h,params,this.$t('share.enable')),
            this.perEdit?this.editBtn(h,params):this.unPerBtn(h,params,this.$t('share.edit')),
            this.perPasd?this.passBtn(h,params):this.unPerBtn(h,params,this.$t('account.resetPassword'))
          ]
        }else{
          return[
            this.perSee?this.seeBtn(h,params):this.unPerBtn(h,params,this.$t('share.view')),
            this.perStop?this.disableBtn(h,params):this.unPerBtn(h,params,this.$t('share.disable')),
            this.perDel?this.delBtn(h,params):this.unPerBtn(h,params,this.$t('share.delete')),
            this.perEdit?this.editBtn(h,params):this.unPerBtn(h,params,this.$t('share.edit')),
            this.perPasd?this.passBtn(h,params):this.unPerBtn(h,params,this.$t('account.resetPassword'))]
        }
      }
    },
    modal_stoptip(index){
      this.modal_stop=true;
      this.rowId=this.tableData[index].id;
      this.rowIndex=index
    },
    stoptipOk(){
      this.modal_stop=false;
      let data={id:this.rowId, enableMark:0}
      axios.put(URL.userAccountdis+this.rowId,data).then( response=>{
        //console.log(response)
        if(response.data.messageCode==200){
          this.$Message.success(this.$t('share.saveSuccess'));
          this.pageInit(this.currentPage);
          //this.datas[this.rowIndex].enableMark==1;
          //this.textstop=this.$t('share.enable');
        }
      }).catch( error=>{
        this.$Message.error(this.$t('share.errSave'));
      })
    },
    stoptipCancel(){
      this.modal_stop=false;
    },
    modal_usetip(index){
      this.modal_use=true;
      this.rowId=this.tableData[index].id;
      this.rowIndex=index
    },
    usetipOk(){
      this.modal_use=false;
      let data={id:this.rowId, enableMark:1}
      axios.put(URL.userAccountdis+this.rowId,data).then( response=>{
        if(response.data.messageCode==200){
          this.$Message.success(this.$t('share.saveSuccess'));
          this.pageInit(this.currentPage);
          //this.datas[this.rowIndex].enableMark==0;
          //this.textstar=this.$t('share.disable');
        }
      }).catch( error=>{
        this.$Message.error(this.$t('share.errSave'));
      })
    },
    usetipCancel(){
      this.modal_use=false;
    },
    modalDel(index){
      this.modal_del=true;
      this.modal_del_Id=this.tableData[index].id;
    },
    delOk(){
      this.modal_del=false;
      axios.delete( URL.userAccount+this.modal_del_Id ).then( response=>{

        if(response.data.messageCode==200){
          this.tableData.splice(this.modal_del_Id, 1);
          this.pageInit(this.currentPage);
        }else if(response.data.messageCode==20013){
          this.$Message.error(this.$t('share.delFail') )
        }else{
          this.$Message.error( this.$t('share.delFail') )
        }
      }).catch( error=>{
        this.$Message.error(this.$t('share.delFail'));
      });

    },
    delCancel(){
      this.modal_del=false;
    },
    modalPass(index){
      this.modal_pass=true;
      this.rowId=this.tableData[index].id;
      this.initialPass=false;
      this.formValidate.pasd='';
      this.formValidate.pasdOnce='';
    },
    passCancel(){
      this.modal_pass=false;
    },
    handleSubmitPsd (name) {
      this.modal_pass=false;
      let data={
        id:this.rowId,
        pwd:this.initialPass?this.initpwd:this.formValidate.pasd
      };
      if(this.initialPass){
        axios.put(URL.userAccountPwd+this.rowId,data).then( response=>{

          if(response.data.messageCode==200){
            this.$Message.success(this.$t('share.saveSuccess'));
          }else {
            this.$Message.error(this.$t('share.errSave'));
          }
        }).catch(errro=>{
          this.$Message.error(this.$t('loginPage.errNet'));
        })
      }else{

        this.$refs[name].validate((valid) => {
          if (valid) {
            axios.put(URL.userAccountPwd+this.rowId,data).then( response=>{
              if(response.data.messageCode==200){
                this.$Message.success(this.$t('share.saveSuccess'));
              }else {
                this.$Message.error(this.$t('share.errSave'));
              }
            }).catch( error=>{
              this.$Message.error(this.$t('loginPage.errNet'));
            })

          } else {
            this.$Message.error(this.$t('share.errSave'));
          }
        })
      }
    }
  }
}
