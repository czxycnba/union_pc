

//export const countInfo=[];
export const addTag ={
  tagMark (name,$this,countInfo) {
    switch (name){
      case '1-1':
        for(var i = 0; i < countInfo.length; i++){if(name === countInfo[i].name){return true;}}
        countInfo.unshift({"name": "1-1", "subtitle": $this.$t('store.store'), "url": "/shop"});
        break;

      case '1-2':
        for(var i = 0; i < countInfo.length; i++){if(name === countInfo[i].name){return true;}}
        countInfo.unshift({"name": "1-2", "subtitle": $this.$t('roles.roles'), "url": "/role"});
        break;

      case '1-3':
        for(var i = 0; i < countInfo.length; i++){if(name === countInfo[i].name){return true;}}

        countInfo.unshift({"name": "1-3", "subtitle": $this.$t('employees.employees'), "url": "/personnel"});
        break;
      case '1-4':
        for(var i = 0; i < countInfo.length; i++){if(name === countInfo[i].name){return true;}}

        countInfo.unshift({"name": "1-4", "subtitle": $this.$t('account.employees'), "url": "/accountPersonnel"});
        break;
      case '1-5':
        for(var i = 0; i < countInfo.length; i++){if(name === countInfo[i].name){return true;}}
        countInfo.unshift({"name": "1-5", "subtitle": $this.$t('account.store'), "url": "/accountShop"});
        break;
    }
    switch (name){
      case '/shop':
        countInfo.push({"name": "1-1", "subtitle": $this.$t('store.store'), "url": "/shop"});
        break;
      case '/role':
        countInfo.push({"name": "1-2", "subtitle": $this.$t('roles.roles'), "url": "/role"});
        break;
      case '/personnel':
        countInfo.push({"name": "1-3", "subtitle": $this.$t('employees.employees'), "url": "/personnel"});
        break;
      case '/accountPersonnel':
        countInfo.push({"name": "1-4", "subtitle": $this.$t('account.employees'), "url": "/accountPersonnel"});
        break;
      case '/accountShop':
        countInfo.push({"name": "1-5", "subtitle": $this.$t('account.store'), "url": "/accountShop"});
        break;
    }
  },

  tagClick(url,$this){
    switch (url){
      case '/shop':$this.$router.push({path:"/shop"});break;
      case '/role':$this.$router.push({path: "/role"});break;
      case '/personnel':$this.$router.push({path: "/personnel"});break;
      case '/accountPersonnel':$this.$router.push({path: "/accountPersonnel"});break;
      case '/accountShop':$this.$router.push({path: "/accountShop"});break;
    }
  }

};








