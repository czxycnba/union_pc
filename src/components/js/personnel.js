/**
 * Created by jing.li on 2018/1/4.
 */
import {usersApi} from '../../assets/api/api'
import axios from 'axios'
import * as URL from '../../assets/api/url'
import * as FUN from '../../assets/js/lib'
'use strict';
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
      perSee:false,
      perEdit:false,
      perDel:false,
      labelWidth:80, //label宽
      columns: [

      ],
      data: [],
      personnel_id:'',
      personnel_name:'',
      personnel_job:0,
      personnel_job_list:[],
      personnel_store:0,
      personnel_store_list:[],
      modal_del:false,
      rowId:''
    }
  },


  mounted:function () {
    this.$nextTick(function () {
      this.columns.push(
        {title: this.$t('share.num'), key: 'code',width:80},
        {title: this.$t('employees.staffMemberId'), key: 'userCode'},
        {title: this.$t('employees.name'), key: 'userName'},
        {title: this.$t('employees.position'), key: 'roleName',
          render: (h, params) => {
            return this.roleDeleted(h, params)
          }
        },
        {title: this.$t('employees.store'), key: 'shopName',
          render: (h, params) => {
            return this.shopDeleted(h, params)
          }
        },
        {title:this.$t('share.action'), key: 'action',align: 'center',width:300,
          render: (h, params) => {
            return this.actionBtn(h, params)
          }
        },
      );
      this.pageInit(this.currentPage);
      this.getPer();  //权限
      this.getJobName();
      this.getStoreName();
    })
  },
  methods: {
    pageInit(page){
      this.currentPage=page;
      let data={
        userCode:null,
        userName:null,
        roleId:null,
        shopId:null,
        pageNo:this.currentPage,
        pageSize:this.pageSize,
      };
      this.drawTable(data,page);
    },
    userSearch(){
      let data={
        userCode:this.personnel_id,
        userName:this.personnel_name,
        roleId:this.personnel_job,
        shopId:this.personnel_store,
        pageNo:1,
        pageSize:10,
      };
      this.drawTable(data,this.currentPage);
    },
    drawTable(data,page){
      this.data=[];
      usersApi.getUsersInit({params:data}).then( response=>{
        let datas=response.data.data;
        //shopDeleted	=1
        datas.map( (v,i)=>{
          this.data.push({
            id:v.id,
            code:i+1,
            userCode:v.userCode,
            userName:v.userName,
            roleName:v.roleName,
            shopName:v.shopName,
            shopDeleted:v.shopDeleted==1?'#ccc':'#495060',
            roleDeleted:v.roleDeleted==1?'#ccc':'#495060'
          })
        });
        if(this.data.length>0){
          this.ishowPage=true;
        }else{
          this.ishowPage=false;
        }

        this.currentPage=page;
        this.pageSize=response.data.pageSize;
        this.totalCount=response.data.totalCount;
        this.beginIndex=response.data.beginIndex;
        this.endIndex=response.data.endIndex;
        //this.$refs.pageBox.$el.children[1].innerText='第 '+page+' 页  共'+response.data.totalPage+'页';
        this.$refs.pageBox.$el.children[1].innerText=this.$t('share.numPage')+page+this.$t('share.page')+' '+ this.$t('share.total')+response.data.totalPage+this.$t('share.page');
        this.$refs.pageBox.$el.children[1].innerText.style={'font-size':14+'px'};

      }).catch( error=>{
        //this.$Message.error(FUN.errorTip(this,'errnet'));
      })

    },
    getJobName(){
      usersApi.getUsersJob().then( response=>{
        // console.log('response.data',response.data)
        this.personnel_job_list=response.data;
        this.personnel_job_list.unshift({
          "id": 0,
          "name": this.$t('share.all')
        },)
      });
    },
    getStoreName(){
      usersApi.getUsersStore().then( response=>{
        //console.log('response--',response)
        this.personnel_store_list=response.data;
        this.personnel_store_list.unshift({
          "id": 0,
          "name": this.$t('share.all')
        },)
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
            case '新增':this.perAdd =true;break;
            case '查看':this.perSee =true;break;
            case '编辑':this.perEdit=true;break;
            case '删除':this.perDel =true;break;
          }
        })
      });
    },


    shopDeleted(h, params){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:this.data[params.index].shopDeleted},
      }, this.data[params.index].shopName)
    },
    roleDeleted(h, params){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:this.data[params.index].roleDeleted},
      }, this.data[params.index].roleName)
    },

    seeBtn(h, params){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:'#229ddd'},
        on: {
          click: () => {
            this.$router.push({path: 'personnelSee',query:{id:this.data[params.index].id}});
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
            this.$router.push({path: 'personnelEdit',query:{id:this.data[params.index].id}});
          }
        }
      }, this.$t('share.edit'))
    },
    unPerBtn(h, params,text){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:'#ccc'},
      }, text)
    },
    actionBtn(h, params){
      return [
        this.perSee?this.seeBtn(h, params):this.unPerBtn(h, params,this.$t('share.view')),
        this.perDel?this.delBtn(h, params):this.unPerBtn(h, params,this.$t('share.delete')),
        this.perEdit?this.editBtn(h, params):this.unPerBtn(h, params,this.$t('share.edit'))
      ]
    },

    modalDel(index){
      this.modal_del=true;
      this.rowId=this.data[index].id;
    },
    delOk(){
      this.modal_del=false;
      axios.delete( URL.usersSee+this.rowId ).then( response=>{
        if(response.data.messageCode==200){
          this.data.splice(this.rowId, 1);
          this.pageInit(this.currentPage);
        }else{
          this.$Message.error(this.$t('share.delFail') )
        }
      }).catch( error=>{
        this.$Message.error(this.$t('loginPage.errNet'));
      });
    },
    delCancel(){
      this.modal_del=false;
    }

  }
}
