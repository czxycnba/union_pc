/**
 * Created by jing.li on 2018/1/4.
 */
import axios from 'axios'
import * as Validate from '../../assets/js/validate'
import * as URL from '../../assets/api/url'
import * as FUN from '../../assets/js/lib'

import Vue from 'vue';
import iviewArea from 'iview-area';
Vue.use(iviewArea);

export default {
  data () {
    return {
      fuhao:'：',
      isButton:false,  // 保存置灰
      res:[],
      showRes:[],
      labelWidth:130,  //label宽
      formValidate:{
        shopAdd_id:'',
        shopAdd_name:'',
        shopAdd_attr:'',
        shopAdd_phone:'',
        shopAdd_country:'',
        shopAdd_city:'',
        shopAdd_address:'',
        shopAdd_leader:''
      },
      filterTime:'',
      shopAdd_attr_List:[
      ],
      shopAdd_country_List:['中国大陆'],
      shopAdd_area_List:[],
      shopAdd_area:[],
      shopShengCode:'',
      shopShengName:'',
      shopCityCode:'',
      shopCityName:'',
      requiredCity:true,
      ruleValidate:{
        shopAdd_id: [{ required: true, validator: Validate.validateId,trigger: 'blur' }],
        shopAdd_name: [{ required: true, validator: Validate.validateName,trigger: 'blur' }],
        shopAdd_phone:[{ required: true, validator: Validate.validatePhone,trigger: 'blur' }],
        shopAdd_attr: [{ required: true, type:'number',validator: Validate.validateNotNull, trigger: 'change' }],
        shopAdd_country: [{ required:true, type:'number', validator: Validate.validateNotNull,  trigger: 'change' }],
        shopAdd_city:    [{ required:true, type:'number',validator: Validate.validateNotNull, trigger: 'change' }]
      },
      datas:[],
      option:{
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      }
    }
  },
  computed:{
    isCountry(){
      return  this.formValidate.shopAdd_country===0?false:true;
    }
  },
  created:function () {
    Validate.huoquObj.func(this);
  },
  mounted(){
    this.$nextTick(function () {
      this.shopAdd_attr_List.push(
      {id:1,name:this.$t('store.chainStore')},
      {id:2,name:this.$t('store.joinStore')}
      );
    })
  },
  methods: {
    getShopAdd_time(date){
      this.filterTime=date;
    },

    getCountry(name){
      this.formValidate.shopAdd_country=name;
    },
    getCity(name){
      if(name.length==0){
        this.formValidate.shopAdd_city=''
      }else{
        this.formValidate.shopAdd_city=name.length;
      }
    },

    handleSubmit (name) {

      let provinceCode='';
      let provinceName='';
      let cityCode='';
      let cityName='';
      let districtCode='';
      let districtName='';
      let streetCode='';
      let streetName='';

      if(this.res.length>0){
        provinceCode=this.showRes[0].code;
        provinceName=this.showRes[0].name;
        cityCode=this.showRes[1].code;
        cityName=this.showRes[1].name;
        districtCode=this.showRes[2].code;
        districtName=this.showRes[2].name;
        streetCode=this.showRes[3].code;
        streetName=this.showRes[3].name;
      }else{
        provinceCode='';
        provinceName='';
        cityCode='';
        cityName='';
        districtCode='';
        districtName='';
        streetCode='';
        streetName='';
      }

      let data={
        shopCode:this.formValidate.shopAdd_id,
        shopName:this.formValidate.shopAdd_name,
        shopTel:this.formValidate.shopAdd_phone,
        shopNature:this.formValidate.shopAdd_attr,
        establishDateStr :this.filterTime,
        detailedAddr :this.formValidate.shopAdd_address,
        shopMgr :this.formValidate.shopAdd_leader,
        countryCode:'86',
        countryName:'中国大陆',
        provinceCode:provinceCode,
        provinceName:provinceName,
        cityCode:cityCode,
        cityName:cityName,
        districtCode:districtCode,
        districtName:districtName,
        streetCode:streetCode,
        streetName:streetName,
      };

      this.$refs[name].validate((valid) => {

        if (valid) {
          this.isButton=true;
          axios.post(URL.shopSee,data).then(response=>{
            if(response.data.messageCode==200){
              this.$Message.success(this.$t('share.saveSuccess'));
              this.$router.push({path:'/shop'})
            }else if(response.data.messageCode==20010){
              this.$Message.error(this.$t('store.storeIdWarning1'));
              this.formValidate.shopAdd_id='';
              this.isButton=false;
            } else {
              this.$Message.error(this.$t('share.errSave'));
            }
          }).catch(error=>{
            this.$Message.error(this.$t('loginPage.errNet'));
          })
        } else {
          this.$Message.error(this.$t('share.errSave'));
          this.isButton=false;
        }
      })
    }

  },
  watch: {
    res (val) {
      this.showRes =val;

    }

  }
}
