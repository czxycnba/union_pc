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
      PadName:'',
      PadPwd:'******',
      PadStatus:'',
      PadId:'',
      PadShop:'',
      modalPad:[],
      labelWidth:140,  //label宽
      ruleValidate:{
        personnel_id: [{ required: true }],
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
      axios.get(URL.shopAccountDetail+this.ID).then( response=>{

        let val=response.data.data.shopAccountWithStatus;

        this.PadName=val.padLoginName;
        this.PadStatus=val.status;
        this.PadId=val.id;
        this.PadShop=val.name;

        let padModal=response.data.data.moduleWithCheckeds;
        let pad=[];

        padModal.map( data=>{
          if(data.checked){
            pad.push(data)
          }
        });

        pad.map( data => {
          this.modalPad.push({
            app_name: data.moduleName,
            app_checkBox:data.childModules.map( check=>{
              if(check.checked){
                return check.moduleName
              }
            })
          })
        });
      }).catch( error=>{
        this.$Message.error(FUN.errorTip(this,error.response.status));
      });
    }
  }
}
