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
      shopAdd_id:'',
      shopAdd_name:'',
      shopAdd_phone:'',
      shopAdd_attr:'',
      shopAdd_time:'',
      shopAdd_country:'',
      //shopAdd_area:'河北省石家庄市玄武区',
      shopAdd_address:'',
      shopAdd_leader:'',
      labelWidth:120,  //label宽
      ruleValidate:{
        shopAdd_id: [{ required: true }],
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
      axios.get(URL.shopSee+this.ID).then( response=>{
        if(response.data.messageCode==200){
          let val=response.data.data;
          this.shopAdd_id=val.shopCode;
          this.shopAdd_name=val.shopName;
          this.shopAdd_phone=val.shopTel;
          this.shopAdd_attr=val.shopNature;
          this.shopAdd_time=val.establishDate;
          this.shopAdd_country=val.shopArea;
          // this.shopAdd_area=val.shopName;
          this.shopAdd_address=val.detailedAddr;
          this.shopAdd_leader=val.shopMgr;
        }
      }).catch( error=>{
        this.$Message.error(this.$t('loginPage.errNet'));
      })
    }

  }
}
