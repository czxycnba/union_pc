/**
 * Created by jing.li on 2018/1/4.
 */
import * as Validate from '../../assets/js/validate'
import axios from 'axios'
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
      ID:this.$route.query.id,
      labelWidth:125,  //label宽
      formValidate:{
        shopAdd_id:'',
        shopAdd_name:'',
        shopAdd_attr:'',
        shopAdd_phone:'',
        shopAdd_country:0,
        shopAdd_city:['110000', '110101'],
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
      ruleValidate:{
        shopAdd_id: [{ required: true, validator: Validate.validateId,trigger: 'blur' }],
        shopAdd_name: [{ required: true, validator: Validate.validateName,trigger: 'blur' }],
        shopAdd_phone:[{ required: true, validator: Validate.validatePhone,trigger: 'blur' }],
        shopAdd_attr: [{ required: true, type:'number',validator: Validate.validateNotNull, trigger: 'change' }],
        shopAdd_country: [{ required: true, type:'number',validator: Validate.validateNotNull, trigger: 'change' }]
      },
      datas:[],
      resDefault:'',
      res:[],
      showRes:[],
      provinceCode:'',
      provinceName:'',
      cityCode:'',
      cityName:'',
      districtCode:'',
      districtName:'',
      streetCode:'',
      streetName:'',
      option:{
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      }
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
      this.pageInit();
    })
  },
  methods: {
    pageInit(){
      axios.get(URL.shopEdit+this.ID).then( response=>{
        let val=response.data.data;
        //console.log('init--',val.provinceName,val.cityName,val.districtName,val.streetName)
        this.formValidate.shopAdd_id=val.shopCode;
        this.formValidate.shopAdd_name=val.shopName;
        this.formValidate.shopAdd_phone=val.shopTel;
        this.formValidate.shopAdd_attr=val.shopNature;
        this.filterTime=val.establishDate;
        this.formValidate.shopAdd_time=val.establishDate;
        this.formValidate.shopAdd_address=val.detailedAddr;
        this.formValidate.shopAdd_leader=val.shopMgr;


        if(this.provinceName==null || this.cityName==null || this.districtName==null || this.streetName==null){
          this.resDefault=''
        }else{
          this.resDefault=val.provinceName+'/'+val.cityName+'/'+val.districtName+'/'+val.streetName;
        }


        this.provinceCode=val.provinceCode;
        this.provinceName=val.provinceName;
        this.cityCode=val.cityCode;
        this.cityName=val.cityName;
        this.districtCode=val.districtCode;
        this.districtName=val.districtName;
        this.streetCode=val.streetCode;
        this.streetName=val.streetName;

      }).catch(error=>{
        this.$Message.error(this.$t('loginPage.errNet'));
      })

    },
    getShopAdd_time(date){
      this.filterTime=date;
    },

    getShopAdd_time(date){
      this.filterTime=date;
    },

    handleSubmit (name) {

      if(this.showRes.length){
        this.provinceCode=this.showRes[0].code;
        this.provinceName=this.showRes[0].name;
        this.cityCode=this.showRes[1].code;
        this.cityName=this.showRes[1].name;
        this.districtCode=this.showRes[2].code;
        this.districtName=this.showRes[2].name;
        this.streetCode=this.showRes[3].code;
        this.streetName=this.showRes[3].name;
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
        provinceCode:this.provinceCode,
        provinceName:this.provinceName,
        cityCode:this.cityCode,
        cityName:this.cityName,
        districtCode:this.districtCode,
        districtName:this.districtName,
        streetCode:this.streetCode,
        streetName:this.streetName,
      };


      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isButton=true;
          axios.put(URL.shopSee+this.ID,data).then(response=>{
            if(response.data.messageCode==200){
              this.$Message.success(this.$t('share.saveSuccess'));
              this.$router.push({path:'/shop'});
            } else if(response.data.messageCode==20010){
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
