import axios from 'axios'
import config from './config'
import * as url from './url'

/*
 增 put     => { } // {data}
 删 delete  => data:{xx:xxxx}
 改 post    => { } //(data) -->data={1:'',2:''}
 查 get     => params:{xx:xxxx}
 */
export const Status = {
  codeStatus(response){
    if(response.data.messageCode==200){
      return response.data
    }
  }
};

//export const Header={'Content-Type':'application/json'};

export const roleApi = {

  postRoleInit(param){
    return axios.post(url.roleInit, param, config)
      .then(response =>{
        return Status.codeStatus(response)
      }).catch(error=>{
        console.log(error)
      })
  },

  getRoleType(param){
    return axios.get(url.roleType, param, config)
      .then(response =>{
        return Status.codeStatus(response)
      }).catch(error=>{
        console.log(error)
      })
  },


  getRoleAdd(param){
    return axios.get(url.roleInput, param, config)
      .then(response =>{
        return Status.codeStatus(response)
      }).catch(error=>{
        console.log(error)
      })
  },
  /*postRoleSearch(param){
    return axios.post(url.roleSearch, param, config)
      .then(response =>{
        return Status.codeStatus(response)
      }).catch(error=>{
        console.log(error)
      })
  },*/

  /*postRoleDetail(param){
    return axios.post(url, param, config)
      .then(response =>{
        return Status.codeStatus(response)
      }).catch(error=>{
        console.log(error)
      })
  }*/

};


export const usersApi = {

  getUsersInit(param){
    return axios.get(url.usersInit, param, config)
      .then(response =>{
        return Status.codeStatus(response)
      }).catch(error=>{
        console.log(error)
      })
  },

  getUsersJob(param){
    return axios.get(url.usersJob, param, config)
      .then(response =>{
        return Status.codeStatus(response)
      }).catch(error=>{
        console.log(error)
      })
  },

  getUsersStore(param){
    return axios.get(url.usersStore, param, config)
      .then(response =>{
        return Status.codeStatus(response)
      }).catch(error=>{
        console.log(error)
      })
  },

  /*postUsersSave(param){
      return axios.post(url.usersSave, param, config)
        .then(response =>{
          return Status.codeStatus(response)
        }).catch(error=>{
          console.log(error)
        })
    },*/

};


export const userAccountApi={
   getUserAccount(param){
     return axios.get(url.userAccount, param, config)
       .then(response =>{
         return Status.codeStatus(response)
       }).catch(error=>{
         console.log(error)
       })

   },
    putUserAccount(param){
         return axios.put(url.userAccountPwd, param, config)
           .then(response =>{
             return Status.codeStatus(response)
           }).catch(error=>{
             console.log(error)
           })

    },

    getRole(param){
      return axios.get(url.userAccountRoles, param, config)
        .then(response =>{
          return Status.codeStatus(response)
        }).catch(error=>{
          console.log(error)
        })

    },
   getUser(param){
      return axios.get(url.userAccountUsers, param, config)
        .then(response =>{
          return Status.codeStatus(response)
        }).catch(error=>{
          console.log(error)
        })

    },
  getShop(param){
      return axios.get(url.userAccountShop, param, config)
        .then(response =>{
          return Status.codeStatus(response)
        }).catch(error=>{
          console.log(error)
        })

    },



};


export const shopApi = {

  getShop(param){
    return axios.get(url.shops, param, config)
      .then(response =>{
        return Status.codeStatus(response)
      }).catch(error=>{
        console.log(error)
      })
  },

  getShopSee(param){
      return axios.get(url.shopSee, param, config)
        .then(response =>{
          return Status.codeStatus(response)
        }).catch(error=>{
          console.log(error)
        })
    },

};

