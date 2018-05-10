/**
 * Created by jing.li on 2018/2/27.
 */
module.exports={
  errorCode:{
    error400:'Request error',
    error401:'No authorization, please login',
    error403:'Access denied',
    error404:'equest address error',
    error408:'The request timeout',
    error500:'erver internal error',
    error501:'Service not implemented',
    error502:'Gateway error',
    error503:'Service unavailable',
    error504:'Gateway timeout',
    error505:'The HTTP version is not supported',
    error10001:'System error',
    error10002:'Parameter error',
    error1000:'Account or password error',
    errorOther:'Please check your internet connection'

  },
  loginPage:{
    login:'Log In',
    loginName:'Enter username',
    loginPWD:'Enter password',
    RememberMe:'Remember me',
    recommend:'We recommend that you use Google Chrome or Firefox.',
    footer:'Copyright © Sengled Optoelectronics Co. Ltd. 2010-2016 备案号：浙ICP备10206866号-2',
    tel:'tel',
    errPwdLength:'Password cannot be shorter than 6 characters',
    errLoginFail:'Login failed',
    errNet:'Please check your internet connection',
    successLogin:'Login successful',
    errLoginPermission:"Login successful, but you don't have any access privileges"
  },
  share: {
    action: 'Action',
    new: 'Add',
    search: "Search",
    view:'View',
    delete:'Delete',
    edit:'Edit',
    save:'Save',
    warning:'Warning',
    cancel:'Cancel',
    enable:"Enable",
    disable:"Disable",
    errSave:'Unable to save',
    saveSuccess:'Save Success',
    system:'Smart Retail Lighting',
    welcome:'Welcome',
    logOut:'Log Out',
    systemManage:"SystemManage",
    all:'All',
    num:'#',
    delFail:'Unable to delete',
    delSuccess:'Delete Success',
    official:'Official',
    template:'Template',
    confirmEnable:"Confirm Enable",
    copyTemplate:'Copy Template',
    copy:'Copy',
    select:'Please Select',
    adjust:'Adjust',
    onOff:'On/Off',
    resetPassword:'ResetPassword',
    newSuccess:'New Success',
    newFail:'Unable to New',
    accountName:'AccountName',
    userName:"UserName",
    status:'Status',
    online:'Online',
    offline:'Offline',
    locked:'Locked',
    expired:'Expired',
    permissions:'Permissions',
    reset:'Confirm',
    demo:'Demo',
    test:'Test',
    trial:'Trial',
    page:' page',
    total:"total ",
    numPage:'',
    now:'',
    item:'',
    record:' records',
    notBlank:'Cannot be blank',
    telErr:'Incorrect telephone number format',
    idNumberErr:'Incorrect ID number format',
    other:'other'
  },
  store:{
    store:'Store',
    storeid:'StoreID',
    storeName:'StoreName',
    storeType:'StoreType',
    chainStore:'Direct',
    joinStore:'Franchisee',
    phoneNumber:'PhoneNumber',
    delPrompt:'Deleting a store will cause it to be permanently erased from the system！',
    newStore:'New Store',
    created:'Created',
    location:'Location',
    locationWarning:"Location Can't be empty",
    storeTypeWarning:"Store type Can't be empty",
    fullAddress:'FullAddress',
    contactPerson:'ContactPerson',
    storeIdWarning:'Alphanumerical characters only, must be 4 or more characters long',
    storeIdWarning1:"Store ID Can't repeat",
    storeNameWarning:'Alphanumerical or Chinese characters',
    storeTelWarning:'Cannot be blank',
    editStore:'Edit Store',
    viewStore:'View Store'
  },
  roles:{
    viewRoles:'View Roles',
    editRoles:'Edit Roles',
    roles:'Roles',
    systemManage:'System',
    bulbsManage:'Bulbs',
    infoManage:'Info',
    rolesId:'RolesID',
    rolesName:'RolesName',
    rolesType:'RolesType',
    rolesTypeWarning:"Roles type Can't be empty",
    delPrompt:'Deleting a role will permanently delete the privileges associated with that role from the system！',
    DisPrompt:'Disabling a role will remove the privileges associated with it!',
    newRoles:'New Roles',
    appPermissions:'App Permissions',
    pcPermissions:'Computer Permissions',
    viewing:'Viewing',
    editing:'Editing',
    all:'All',
    scenes:'Scenes',
    bulbs:'Bulbs',
    info:'Info',
    effect:'Effect',
    deviceInfo:'Device Info',
    energyUsage:'EnergyUsage',
    scenesList:'Scenes List',
    effectList:'Events List',
    bulbsList:'Bulbs List',
    devices:'Devices',
    statistics:'Statistics',
    energyUsageMap:'EnergyUsage',
    moduleName:'Module Name',

  },
  employees:{
    employees:'Employees',
    newEmployees:'New Employees',
    editEmployees:'Edit Employees',
    viewEmployees:'View Employees',
    staffMemberId:'StaffMember',
    name:'Name',
    position:'Position',
    store:'Store',
    delInfo:"Deleting an employee will cause that employee's information to be permanently erased",
    gender:'Gender',
    male:'Male',
    female:'Female',
    positionRole:'Position（Role）',
    additionalInfo:'Additional Information',
    idNumber:'ID Number',
    contactInfo:'Contact Information',
    status:'Status',
    employee:'Employee',
    formerEmployee:'Former Employee',
    vacation:'Vacation',
    Started:'Started',
    left:'Left:',
    userIdWarning:"User ID Can't repeat",
    basicinFormationSet:'Basic information set'
  },
  account:{
    employees:"Account(employees)",
    store:"Account(store)",
    disablAccountWarning:'Disabling this account will prevent the user from being able to log in',
    delAccountWarning:"Deleting this account will permanently erase all of the account's information from the system",
    useDefaultPwd:'Use Default Password',
    newPwd:'New Password',
    confirmNewPwd:'Confirm New Password',
    pwdErr:'Please enter password',
    pwdErr1:'Your password can only contain alphanumerical characters',
    pwdErr2:' Please confirm your password',
    pwdErr3:'Passwords do not match',
    pwdErr4:'Password cannot be shorter than 6 characters',
    defaultPwdWarning:'Default password is: 888888',
    pwd:'Password',
    users:'Users',
    type:'Type',
    rolePermissions:"Role Permissions",
    storePermissions:'Store Permissions',
    tabletUsername:'Tablet Username',
    status:'Status',
    accountStatus:'Status',
    tabletAccountUser:'Tablet Username',
    tabletAccountStatus:'Tablet Status',
    tabletAccountPwd:'Tablet Password',
    editStoreName:'Edit Store Name',
    disable:'Disable',
    enableAccount:'Are you sure to enable this account?',
    enable:'Enable',
    delete:'Delete',
    resetPassword:'ResetPassword',
    newAccount:'New Account',
    editAccount:'Edit Account',
    viewAccount:'View Account',
    accountWarning:'Account name must be unique',
    disabledAccountWarning:'This account cannot be used to log in on any client after disabled',
    delAccountWarning:'All service to this store will be stopped after deleting its account'
  }
}