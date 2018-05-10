/**
 * Created by jing.li on 2018/1/4.
 */

import axios from 'axios'
import * as URL from '../../assets/api/url'
import * as FUN from '../../assets/js/lib'
import * as Validate from "../../assets/js/validate";

export default {
  data () {
    const pasReg= /^[0-9a-zA-Z]+$/;
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
        callback(new Error(this.$t('account.pwdErr3')));
      } else {
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
      perSee:false,
      perEdit:false,
      perPasd:false,
      labelWidth:120,  //label宽
      ap_id:'',
      ap_name:'',
      modal_tip:false, //提示--停用
      modal_del:false,
      modal_del_Id:'',
      modal_pass:false,
      initialPass:false,  //是否恢复8888
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
          { validator: validatePassCheck, required: true },
        ],
      }
    }
  },
  mounted(){
    this.$nextTick(function () {
      this.columns.push(
        {title: this.$t('share.num'), key: 'code',width:80},
        {title: this.$t('store.storeid'), key: 'shopid'},
        {title: this.$t('store.storeName'), key: 'name'},
        {title: this.$t('account.tabletUsername'), key: 'padLoginName'},
        {title: this.$t('account.status'), key: 'status',width:120},
        {title: this.$t('share.action'), key: 'action',align: 'center',width:300,
          render: (h, params) => {
            return this.actionBtn(h, params)
          }
        },
      );
      this.pageInit(this.currentPage);
      this.getPer();  //权限
    })
  },
  created:function () {
    Validate.huoquObj.func(this);
  },
  methods: {
    pageInit(page){
      this.currentPage=page;
      let data={
        shopCode: this.ap_id,
        shopName: this.ap_name,
        currentPage: this.currentPage
      };
      this.getTable(data,page);
    },
    roleSearch(){
      let data={
        shopCode: this.ap_id,
        shopName: this.ap_name,
        currentPage:this.currentPage
      };

      this.getTable(data,this.currentPage);
    },
    getTable(data,page){
      this.tableData=[];
      axios.post(URL.shopAccount,data).then( response=>{
        let pages=response.data.data.page;
        let val=response.data.data.shopAccountWithStatusList;

        val.map( (v,i)=>{
          this.tableData.push({
            code:i+1,
            id:v.id,
            shopid:v.code,
            name:v.name,
            padLoginName:v.padLoginName,
            status:v.status,
          })
        });
        if(this.tableData.length>0){
          this.ishowPage=true;
        }else{
          this.ishowPage=false;
        }

        this.currentPage=page;
        this.pageSize=pages.pageSize;
        this.totalCount=pages.rowCount;
        this.beginIndex=pages.startIndex;
        this.endIndex=pages.endIndex;
        this.$refs.pageBox.$el.children[1].innerText=this.$t('share.numPage')+page+this.$t('share.page')+' '+ this.$t('share.total')+pages.pageCount+this.$t('share.page');
        this.$refs.pageBox.$el.children[1].innerText.style={'font-size':14+'px'};
      }).catch( error=>{
        //this.$Message.error(FUN.errorTip(this,'errnet'));
      })
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
            case '查看':this.perSee  =true;break;
            case '编辑':this.perEdit =true;break;
            case '重置密码':this.perPasd  =true;break;
          }
        })
      })
    },
    seeBtn(h, params){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:'#229ddd'},
        on: {
          click: () => {
            this.$router.push({path:'/accountShopSee',query:{id:this.tableData[params.index]}.id})
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
            this.$router.push({path:'/accountShopEdit',query:{id:this.tableData[params.index].id}})
          }
        }
      },this.$t('share.edit'))
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
    disableBtn(h, params){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:'#229ddd'},
        on: {
          click: () => {
            this.modalTip(params.index);
          }
        }
      }, this.$t('share.disable'))
    },
    unPerBtn(h, params,text){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:'#ccc'},
      }, text)
    },
    actionBtn(h, params){
      return[
        this.perSee?this.seeBtn(h,params):this.unPerBtn(h,params,this.$t('share.view')),
        this.perEdit?this.editBtn(h,params):this.unPerBtn(h,params,this.$t('share.edit')),
        this.perPasd?this.passBtn(h,params):this.unPerBtn(h,params,this.$t('account.resetPassword'))
      ]
    },
    modalTip(index){
      this.modal_tip=true;
    },
    tipOk(){
      this.modal_tip=false;
    },
    tipCancel(){
      this.modal_tip=false;
    },
    modalDel(index){
      this.modal_del=true;
      this.modal_del_Id=index;
    },
    delOk(){

      this.data.splice(this.modal_del_Id, 1);
      this.modal_del=false;
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
        newPwd:this.initialPass?this.initpwd:this.formValidate.pasd
      };
      if(this.initialPass){
        axios.post(URL.shopAccountPsd,data).then( response=>{
          if(response.data.messageCode==200){
            this.$Message.success(this.$t('share.saveSuccess'));
          }else {
            this.$Message.error(this.$t('share.errSave'));
          }
        }).catch( error=>{
          this.$Message.error(FUN.errorTip(this,error.response.status));
        })
      }else{
        this.$refs[name].validate((valid) => {
          if (valid) {
            axios.post(URL.shopAccountPsd,data).then( response=>{
              if(response.data.messageCode==200){
                this.$Message.success(this.$t('share.saveSuccess'));
              }else {
                this.$Message.error(this.$t('share.errSave'));
              }
            }).catch( error=>{
              this.$Message.error(FUN.errorTip(this,error.response.status));
            })
          } else {
            this.$Message.error(this.$t('share.errSave'));
          }
        })
      }

    }

  }

}
