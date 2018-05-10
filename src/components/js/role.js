/**
 * Created by jing.li on 2018/1/4.
 */

import {roleApi} from '../../assets/api/api'
import axios from 'axios'
import * as URL from '../../assets/api/url'
import * as FUN from '../../assets/js/lib'

export default {
  data () {
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
      perClone:false,
      labelWidth:80,  //label宽
      role_id:'',
      role_name:'',
      role_attr:'0',    //全部---0==null
      role_attr_arr:'',
      count:1,  //复制
      modal_stop:false, //提示--停用
      modal_use:false, //提示--停用
      modal_del:false,
      used:'',
      row_id:'',
      modal_loading:false,
      columns: [

      ],
      data: []
    }
  },

  mounted(){
    this.$nextTick(function () {
      this.columns.push(
        {title: this.$t('share.num'), key: 'code',width:80},
        {title: this.$t('roles.rolesId'), key: 'roleId'},
        {title: this.$t('roles.rolesName'), key: 'name'},
        {title: this.$t('roles.rolesType'), key: 'attr',width:120},
        {title: this.$t('share.action'), key: 'action',align: 'center',width:300,
          render: (h, params) => {
            return this.actionBtn(h, params)
          }
        },
      );
      this.pageInit(this.currentPage);
      this.getRoleAttr();
      this.getPer();  //权限
    })
  },
  methods: {
    pageInit(page){
      this.currentPage=page;
      let data={
        roleCode:null,
        roleName:null,
        roleType:this.role_attr,
        currentPage:this.currentPage
      };
      this.drawTable(data,page)



    },
    getRoleAttr(){
      roleApi.getRoleType().then( response=>{
        this.role_attr_arr=$.extend({0:'全部'},response.data);
        for(var i in this.role_attr_arr) {
          if(this.role_attr_arr[i]=='全部'){
            this.role_attr_arr[i] = this.$t('share.all')
          }
          if(this.role_attr_arr[i]=='正式'){
            this.role_attr_arr[i] = this.$t('share.official')
          }
          if(this.role_attr_arr[i]=='模板'){
            this.role_attr_arr[i] = this.$t('share.template')
          }
        }

      }).catch( error=>{
        //console.log(error)
      })
    },
    roleSearch(){
      let data={
        roleCode:this.role_id,
        roleName:this.role_name,
        roleType:this.role_attr,
        currentPage:this.currentPage
      };

      this.drawTable(data,this.currentPage)
    },
    drawTable(data,page){
      this.data=[];
      axios.post(URL.roleInit,data).then( response=>{


        //1 qiyong  0 stop

        let pages=response.data.data.page;
        let datas=response.data.data.roles;
        datas.map( (v,i)=>{
          if(v.roleTypeName=="正式"){
            v.roleTypeName =this.$t('share.official');
          }else if(v.roleTypeName=="模板"){
            v.roleTypeName =this.$t('share.template');
          }
          this.data.push({
            id:v.id,
            code:i+1,
            roleId:v.roleCode,
            name:v.roleName,
            attr:v.roleTypeName,
            used: v.enableMark,
            moban:v.roleCode.indexOf("-")!=-1?this.$t('share.copyTemplate'):this.$t('share.template')

          })
        });

        if(this.data.length>0){
          this.ishowPage=true;
        }else{
          this.ishowPage=false;
        }


        this.currentPage=page;
        this.pageSize=pages.pageSize;
        this.totalCount=pages.rowCount;
        this.beginIndex=pages.startIndex;
        this.endIndex=pages.endIndex;
        //this.$refs.pageBox.$el.children[1].innerText='第 '+page+' 页  共'+pages.pageCount+'页';
        this.$refs.pageBox.$el.children[1].innerText=this.$t('share.numPage')+page+this.$t('share.page')+' '+ this.$t('share.total')+pages.pageCount+this.$t('share.page');
        this.$refs.pageBox.$el.children[1].innerText.style={'font-size':14+'px'};

      }).catch( error=>{
        //this.$Message.error(FUN.errorTip(this.$t('loginPage.errNet')));
      });
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
            case '复制':this.perClone =true;break;
          }
        })
      })
    },

    cloneBtn(h, params){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:'#229ddd'},
        on: {
          click: () => {
            let id=this.data[params.index].id;
            axios.post(URL.roleClone+id).then( response=>{
              //console.log("clone----",response.data)
              if(response.data.messageCode==200){
                this.pageInit(this.currentPage);
                /*params.row.id+='-'+this.count;
                 params.row.attrClone='复制模板';
                 this.data.splice(params.index+1,0,params.row);
                 this.count+=1;*/
              }
            }).catch( error=>{
             // console.log(error)
            });
          }
        }
      }, this.$t('share.copy'))
    },
    seeBtn(h, params){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:'#229ddd'},
        on: {
          click: () => {
            this.$router.push({path:'/roleSee',query:{id:this.data[params.index].id}})
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
            this.modalDel(params.index)
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
            this.$router.push({path:'/roleEdit',query:{id:this.data[params.index].id}})
          }
        }
      }, this.$t('share.edit'))
    },
    enableBtn(h, params){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:'#229ddd'},
        on: {
          click: () => {
            this.modalaUse(params.index);
          }
        }
      },this.$t('share.enable'))
    },
    disableBtn(h, params){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:'#229ddd'},
        on: {
          click: () => {
            this.modalaStop(params.index);
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

      switch (this.data[params.index].attr){
        case '正式':return[
          this.perStart && this.data[params.index].used==0?this.enableBtn(h,params):this.unPerBtn(h,params,this.$t('share.enable')),
          this.perStop && this.data[params.index].used==1?this.disableBtn(h,params):this.unPerBtn(h,params,this.$t('share.disable')),
          this.perSee?this.seeBtn(h,params):this.unPerBtn(h,params,this.$t('share.view')),
          this.perDel?this.delBtn(h,params):this.unPerBtn(h,params,this.$t('share.delete')),
          this.perEdit?this.editBtn(h,params):this.unPerBtn(h,params,this.$t('share.edit'))];break;
      }

      switch (this.data[params.index].moban){
        case this.$t('share.template'):return[
          this.perClone?this.cloneBtn(h,params):this.unPerBtn(h,params,this.$t('share.copy')),
          this.perSee?this.seeBtn(h,params):this.unPerBtn(h,params,this.$t('share.view')),
          this.perDel?this.delBtn(h,params):this.unPerBtn(h,params,this.$t('share.delete'))];break;
        case  this.$t('share.copyTemplate'):return[
          this.perSee?this.seeBtn(h,params):this.unPerBtn(h,params,this.$t('share.view')),
          this.perDel?this.delBtn(h,params):this.unPerBtn(h,params,this.$t('share.delete')),
          this.perEdit?this.editBtn(h,params):this.unPerBtn(h,params,this.$t('share.edit'))];break;

      }

    },

    modalaStop(index){
      this.modal_stop=true;
      this.row_id=this.data[index].id;
      this.used=index;
    },
    stopOk(){
      let data={
        enableMark: 0,
        id: this.row_id
      }
      this.modal_stop=false;
      axios.post(URL.roleUpdate,data).then( response=>{
        //console.log(response.data);
        if(response.data.messageCode==200){
          this.data[this.used].used=0;
        }
      }).catch( error=>{
        this.$Message.error(FUN.errorTip(error.response.status));
      })
    },
    stopCancel(){
      this.modal_stop=false;
    },

    modalaUse(index){
      this.modal_use=true;
      this.row_id=this.data[index].id;
      this.used=index;
    },
    useOk(){
      let data={
        enableMark: 1,
        id: this.row_id
      };
      this.modal_use=false;
      axios.post(URL.roleUpdate,data).then( response=>{

        if(response.data.messageCode==200){
          this.data[this.used].used=1
        }

      }).catch( error=>{
        this.$Message.error(FUN.errorTip(error.response.status));
      })
    },
    useCancel(){
      this.modal_use=false;
    },


    modalDel(index){
      this.modal_del=true;
      this.row_id=this.data[index].id;
    },
    delOk(){
      this.modal_del=false;
      axios.delete( URL.roleInit+this.row_id ).then( response=>{
        if(response.data.messageCode==200){
          this.data.splice(this.row_id, 1);
          this.$Message.success(this.$t('share.delSuccess') )
          this.pageInit(this.currentPage);
        }else{
          this.$Message.error( this.$t('share.delFail') )
        }
      }).catch( error=>{
        this.$Message.error(FUN.errorTip(this,error.response.status));
      });

    },
    delCancel(){
      this.modal_del=false;
    }
  }

}
