

import axios from 'axios'
import * as URL from '../../assets/api/api'

import {usersApi} from '../api/api'


const leftData=[];
export const permissionList=[];

export const methods ={

  isInArray($this,name){
    for(var i = 0; i < $this.countInfo.length; i++){
      if(name === $this.countInfo[i].name){
        return true;
      }
    }
  },

  getJob(){
    usersApi.getUsersJob().then( response=>{
      console.log(jobList)
      //jobList=response.data;
    }).catch( error=>{
      console.log(error)
    })
  },

  arr(arr) {
    let ret = [];

    arr.forEach(function(e, i, arr) {
      if (arr.indexOf(e) === i) {
        ret.push(e);
      }
    });
    return ret;
  },


};


export const errorTip=($this,status)=>{
  let message='';
  switch (status) {
    case 400:
      return message = $this.$t('errorCode.error400');//'请求错误';
      break;

    case 401:
      return message = $this.$t('errorCode.error401'); //'未授权，请登录';
      break;

    case 403:
      return message = $this.$t('errorCode.error403');//'拒绝访问';
      break;

    case 404:
      return message = $this.$t('errorCode.error404');//'请求地址出错';
      break;

    case 408:
      return message = $this.$t('errorCode.error408');//'请求超时';
      break;

    case 500:
      return message = $this.$t('errorCode.error500');//'服务器内部错误';
      break;

    case 501:
      return message = $this.$t('errorCode.error501');//'服务未实现';
      break;

    case 502:
      return message = $this.$t('errorCode.error502');//'网关错误';
      break;

    case 503:
      return message = $this.$t('errorCode.error503');//'服务不可用';
      break;

    case 504:
      return message = $this.$t('errorCode.error504');//'网关超时';
      break;
    case 505:
      return message = $this.$t('errorCode.error505');//'HTTP版本不受支持';
      break;
    case 10001:
      return message = $this.$t('errorCode.error505');//'系统错误';
      break;
    case 10002:
      return message = $this.$t('errorCode.error505');//'参数错误';
      break;
    default:
      return message = $this.$t('errorCode.errorOther');
  }
}
