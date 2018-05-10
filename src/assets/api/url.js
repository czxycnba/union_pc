
//let baseUrl="http://127.0.0.1:8082/biz-mgt/api/v1";
let baseUrl="/biz-mgt/api/v1";


export const login      = baseUrl+"/user/login";
export const checkLogin = baseUrl+"/user/checkLogin";
export const logout     = "/biz-mgt/api/app/v1/user/logout";
//店铺管理
export const shops    = baseUrl+"/shops/";  //
export const shopSee  = baseUrl+"/shop/";   //查看  删除
export const shopEdit = baseUrl+"/shop/edit/";  //编辑

//角色管理
export const roleInit    = baseUrl+"/role/";
export const roleType    = baseUrl+"/role/type";
export const roleInput   = baseUrl+"/role/input";    //新增
export const roleDetail  = baseUrl+"/role/detail/";  //查看
export const roleClone   = baseUrl+"/role/copy/";  //复制
export const roleSave    = baseUrl+"/role/save/";  //
export const roleUpdate  = baseUrl+"/role/enableMark/update";  // 启用停用
export const roleEdit    = baseUrl+"/role/edit/";  //

//人员管理
export const usersInit  = baseUrl+"/users/";  //人员管理
export const usersJob   = baseUrl+"/user/roles/list/";  //职位
export const usersStore = baseUrl+"/user/shops/list/";  //店铺
export const usersSee   = baseUrl+"/user/";  //新增 --- 查看  删除 编辑 保存 +id
export const usersEdit  = baseUrl+"/user/edit/";  //编辑 +id
export const usersGetRol  = baseUrl+"/userAccounts/role/";


//账户管理（人员）
export const userAccount     = baseUrl+"/userAccounts/";  //店铺人员管理
export const userAccountPwd  = baseUrl+"/userAccounts/pwd/";  //重置密码
export const userAccountdis  = baseUrl+"/userAccounts/account/";  //启用停用
export const userAccountRoles= baseUrl+"/userAccounts/roles/";  //角色权限下拉
export const userAccountUsers= baseUrl+"/userAccounts/users/";  //用户
export const userAccountShop = baseUrl+"/userAccounts/shopPermissions/";  //店铺权限
export const userAccountEdit = baseUrl+"/userAccounts/edit/";  //编辑


//账户管理（店铺）
export const shopAccount     = baseUrl+"/shopAccount";
export const shopAccountPsd  = baseUrl+"/shopAccount/pwd/reset";
export const shopAccountEdit = baseUrl+"/shopAccount/edit/";
export const shopAccountSave = baseUrl+"/shopAccount/save";
export const shopAccountDetail = baseUrl+"/shopAccount/detail/";








