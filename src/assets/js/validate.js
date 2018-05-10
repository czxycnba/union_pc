let that;



export const IdReg= /^[0-9a-zA-Z]{4,}$/;   //英文与数字组合，不少于4位
export const NameReg= /^[A-Za-z0-9_@.\u4e00-\u9fa5]+$/;   //英文、中文、数字
//const phoneReg= /(^(\d{3,4}-)?\d{7,8})$|(13[0-9]{9})/;   //
//const phoneReg=  /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;   //
export const IdNumberReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

export const phoneReg =/^(0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8})|(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/;
export const huoquObj={
  func($this){
    that =$this;
  }
};

export const validateUserName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error(that.$t('loginPage.loginName')));
  }
  callback();
};
export const validatePWD = (rule,value,callback)=>{
  if(value ===''){
    callback(new Error(that.$t('loginPage.loginPWD')));
  }
  callback();
};
export const validatePWDLength = (rule,value,callback)=>{
  if(value.length <6){
    callback(new Error(that.$t('loginPage.errPwdLength')));
  }
  callback();
};

export const validateShopAdd_attr =(rule,value,callback)=>{
  if(value ===''){
    callback(new Error(that.$t('roles.rolesTypeWarning')));
  }
  callback();

};
export const validateNotNull =(rule,value,callback)=>{
  if(value ===''){
    callback(new Error(that.$t('share.select')))
  }
  callback();
};
export const validateId = (rule, value, callback) => { //英文与数字组合，不少于4位
  if (value === '') {
    callback(new Error(that.$t('share.notBlank')));
  } else if(!IdReg.test(value)){
    callback(new Error(that.$t('store.storeIdWarning')));
  }else {
    callback();
  }
};
export const validateName = (rule, value, callback) => { //英文、中文、数字

  if (value === '') {
    callback(new Error(that.$t('share.notBlank')));
  } else if(!NameReg.test(value)){
    callback(new Error(that.$t('store.storeNameWarning')));
  }else {
    callback();
  }
};
export const validatePhone = (rule, value, callback) => { //电话
  if (value === '') {
    callback(new Error(that.$t('share.notBlank')));
  } else if(!phoneReg.test(value)){
    callback(new Error(that.$t('share.telErr')));
  }else {
    callback();
  }
};



export const validateIdNumber = (rule, value, callback) => { //电话
  if (value === '') {
    callback();
  } else if(!IdNumberReg.test(value)){
    callback(new Error(that.$t('share.idNumberErr')));
  }else {
    callback();
  }
};

export const validateArrayNotNull =(rule,value,callback)=>{
  if(value.length===0){
    callback(new Error(that.$t('share.select')))
  }
  callback();
};





