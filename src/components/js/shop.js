/**
 * Created by jing.li on 2018/1/4.
 */
import {shopApi} from '../../assets/api/api'
import axios from 'axios'
import * as URL from '../../assets/api/url'
import * as FUN from '../../assets/js/lib'
import * as Tag from '../../assets/js/tag'
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
      shop_id:'',
      shop_name:'',
      shop_attr:0,
      shop_attr_arr:[

      ],
      columns: [
      ],
      tableData: [],
      modal_del:false,
      rowId:''

    }
  },
  beforeMounted:function () {

  },
  mounted:function () {

    this.$nextTick(function () {
      this.columns.push(
        {title: this.$t('share.num'), key: 'code',width:80},
        {title: this.$t('store.storeid'), key: 'shopCode'},
        {title: this.$t('store.storeName'), key: 'shopName'},
        {title: this.$t('store.phoneNumber'), key: 'phone'},
        {title: this.$t('store.storeType'), key: 'shopNature',width:120},
        {title: this.$t('share.action'), key: 'action',align: 'center',width:300,
          render: (h, params) => {
            return[
              this.perSee?this.seeBtn(h, params):this.unPerBtn(h, params,this.$t('share.view')),
              this.perDel?this.delBtn(h, params):this.unPerBtn(h, params,this.$t('share.delete')),
              this.perEdit?this.editBtn(h, params):this.unPerBtn(h, params,this.$t('share.edit'))
            ]
          }
        },
      );
      this.shop_attr_arr.push(
        {id:0,name:this.$t('share.all')},
        {id:1,name:this.$t('store.chainStore')},
        {id:2,name:this.$t('store.joinStore')}
      );

      this.pageInit(this.currentPage);
      this.getPer();  //权限
    })
  },
  methods: {
    pageInit(page){

      this.currentPage=page;
      let data={
        shopCode:this.shop_id,
        shopName:this.shop_name,
        shopNature:this.shop_attr,
        pageNo:this.currentPage,
      };
      this.getTable(data,page);
    },
    shopSearch(){
      let data={
        shopCode:this.shop_id,
        shopName:this.shop_name,
        shopNature:this.shop_attr,
        pageNo:this.currentPage,
      };

      this.getTable(data,this.currentPage);
    },
    getTable(data,page){
      this.tableData=[];
      shopApi.getShop({params:data}).then( response=>{
        let val=response.data.data;
        let baseData = response.data;

        if(val !=undefined){
          val.map( (v,i)=>{
            if(v.shopNature=="加盟"){
              v.shopNature=this.$t('store.joinStore')
            }else if(v.shopNature=="直营"){
              v.shopNature =this.$t('store.chainStore');

            }else {
              v.shopNature =this.$t('share.other');
            }
            this.tableData.push({
              code:i+1,
              id:v.id,
              shopCode:v.shopCode,
              shopName:v.shopName,
              shopNature:v.shopNature,
              phone:v.shopTel
            })
          })
        }
        if(this.tableData.length>0){
          this.ishowPage=true;
        }else{
          this.ishowPage=false;
        }
        if(baseData !=undefined){
          this.currentPage=page;
          this.pageSize=baseData.pageSize;
          this.totalCount=baseData.totalCount;
          this.beginIndex=baseData.beginIndex;
          this.endIndex=baseData.endIndex;
          this.$refs.pageBox.$el.children[1].innerText=this.$t('share.numPage')+page+this.$t('share.page')+' '+ this.$t('share.total')+baseData.totalPage+this.$t('share.page');
        }
        this.$refs.pageBox.$el.children[1].innerText.style={'font-size':14+'px'};
      }).catch( error=>{

        //this.$Message.error('请检查网络连接1');
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
      })
    },


    seeBtn(h, params){
      return h('span', {
        props: {type: 'info', size: 'small',},
        style: {marginRight: '8px',cursor:'pointer',color:'#229ddd'},
        on: {
          click: () => {
            this.$router.push({path: 'shopSee',query:{id:this.tableData[params.index].id}});
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
            this.$router.push({path: 'shopEdit',query:{id:this.tableData[params.index].id}});
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

    modalDel(index){
      this.modal_del=true;
      this.rowId=this.tableData[index].id;
    },
    delOk(){
      this.modal_del=false;
      axios.delete(URL.shopSee+this.rowId).then( response=>{
        if(response.data.messageCode==200){
          this.tableData.splice(this.modal_del, 1);
          this.pageInit(this.currentPage);
        }else{
          this.$Message.error(this.$t('share.delFail') )
        }
      }).catch( error=>{
        this.$Message.error(this.$t('loginPage.errNet'));
      })
    },
    delCancel(){
      this.modal_del=false;
    }

  }
}
