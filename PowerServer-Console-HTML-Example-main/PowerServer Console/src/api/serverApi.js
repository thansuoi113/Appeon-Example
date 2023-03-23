import axios from '@/utils/request';


export function getHealth() {
  return axios.get({
    url: '/health-details',
    data: ''
  }).then((res) => {
      var healthDataList=[];
      for(var temItem in res){
        var healthData={item:"", subItem:"", list:[]};
        healthData.item = temItem;
        var temResult = true;
        var temDate = res[temItem];
        for(var temSubItem in  temDate){
          var healthSubData={}
          healthSubData.subItem = temSubItem;

          healthSubData.Actual = temDate[temSubItem].Actual;
          healthSubData.Expected = temDate[temSubItem].Expected;
          healthSubData.Suggestion = temDate[temSubItem].Suggestion;
          healthSubData.Result = temDate[temSubItem].Result;
          // alert(healthSubData.Actual);
          if(!temDate[temSubItem].Result){
            temResult=false;
          }
          healthData.list.push(healthSubData);
        }
        healthData.Result = temResult;
        healthDataList.push(healthData);
      }
      // alert(JSON.stringify(healthDataList));
      return {
      code: 0,
      data: {
        list:healthDataList
      }
    }
  })
}

export function getHealthTotalInfo() {
  return Promise.all([
     axios.get({
       url: '/health',
       data: ''
     }),
     axios.get({
       url: '/health-readiness',
       data: ''
     }),
     axios.get({
       url: '/health-liveness',
       data: ''
     })
     ]).then(res=> {
       // alert(res)
       return {code:0, data:{health:res[0],readiness:res[1],liveness:res[2]}}
  })
}

export function getHealthStatus() {
  return axios.get({
    url: '/health',
    data: ''
  }).then((res) => {
      return {
        code: 0,
        data: res
      }
  })
}

export function getHealthReadinessStatus() {
  return axios.get({
    url: '/health-readiness',
    data: ''
  }).then((res) => {
      return {
        code: 0,
        data: res
      }
  })
}

export function getHealthLivenessStatus() {
  return axios.get({
    url: '/health-liveness',
    data: ''
  }).then((res) => {
      return {
      code: 0,
      data: res
    }
  })
}

export function getSessionList() {
  return axios.get({
    url: '/api/session/LoadAll',
    data: ''
  }).then((res) => {
      return {
      code: 0,
      data: {
        list:res
      }
    }
  })
}

export function killSessionById(sessionId){
  return axios.post({
    url: '/api/session/killbyid/'+sessionId,
    data: ''
  }).then((res) => {
    // alert(JSON.stringify(res))
      return {code:0,data:res}
  })
}


export function rollbackTransaction(sessionId,transactionId){
  return axios.post({
    url: '/api/transaction/rollbackbyid/'+sessionId+"/"+transactionId,
    data: ''
  }).then((res) => {
      return {code:0,data:res}
  })
}

export function getTransactionList() {
  return axios.get({
    url: '/api/Transaction/LoadAll',
    data: ''
  }).then((res) => {
      return {
      code: 0,
      data: {
        list:res
      }
    }
  })
}

export function getRequestSql(transactionId) {
  return axios.get({
    url: '/api/transaction/loadrequestsql/'+transactionId,
    data: ''
  }).then((res) => {
      return {
      code: 0,
      data: {
        list:res
      }
    }
  })
}


export function getApplicationList() {
  return axios.get({
    url: '/api/application/loadall',
    data: ''
  }).then((res) => {
    var listData =[];
    for (var index in res) {
          var configObj={};
          var appName = res[index].applicationname;
          configObj.applicationname = appName;
          var caches="";
          var cloudtransactions = res[index].configuration.cloudtransactions;
          for(var i in cloudtransactions){
              caches+="["+i+":"+cloudtransactions[i].cachename+"];";
          }
          caches = caches.substr(0,caches.length-1);
          configObj.cachename=caches;
          configObj.sessionTimeout = res[index].configuration.session.timeout;
          configObj.requestTimeout = res[index].configuration.request.timeout;
          configObj.transactionTimeout = res[index].configuration.transaction.timeout;
          configObj.runMode = res[index].configuration.runmode;
          listData.push(configObj)
        }
      return { code: 0,data: {list:listData}}
  })
}
export function updateApplication(formData){
  // alert(JSON.stringify(formData))
  return axios.post({
    url: '/api/application/edit',
    data: formData
  }).then((res) => {
      if(res.issucceeded===true){
        return {code:0,data:res}
      }else{
        return {code:-1,data:res}
        console.log(res);
      }
  })
}

export function getConnectionList() {
  return axios.get({
    url: '/api/Connection/LoadAll',
    data: ''
  }).then((res) => {
    var listData =[];
    for (var index in res) {
          var groupVal = res[index].cachegroup;
          var items=res[index].items;
          for(var index1 in items){
            var configObj;
            configObj = items[index1].configuration;
            configObj.cachename = items[index1].cachename;
            configObj.cachegroup = groupVal;
            listData.push(configObj)
          }
        }
        // alert(JSON.stringify(res))
      return { code: 0,data: {list:listData}}
  })
}

export function updateConnection(formData){
  var cacheGroup = formData.cachegroup;
  return axios.post({
    url: '/api/Connection/Edit/'+cacheGroup,
    data: formData
  }).then((res) => {
      if(res.issucceeded===true){
        return {code:0,data:res}
      }else{
        return {code:-1,data:res}
        console.log(res);
      }
  })
}

export function addConnection(formData){
  var cacheGroup = formData.cachegroup;

  return axios.post({
    url: '/api/Connection/addone/'+cacheGroup,
    data: formData
  }).then((res) => {
      if(res.issucceeded===true){
        return {code:0,data:res}
      }else{
        return {code:-1,data:res}
        console.log(res);
      }
  })
}

export function delConnection(formData){
  var cacheGroup = formData.cachegroup;
  var cacheName = formData.cacheName;
  return axios.post({
    url: '/api/Connection/removeone/'+cacheGroup+'/'+cacheName,
    data: ''
  }).then((res) => {
      if(res.issucceeded===true){
        return {code:0,data:res}
      }else{
        return {code:-1,data:res}
        console.log(res);
      }
  })
}

export function getConsoleInfo() {
  return Promise.all([
     //上架
     axios.get({
       url: '/api/application/LoadAll',
       data: ''
     }),
     axios.get({
       url: '/api/session/LoadAll',
       data: ''
     }),
     axios.get({
       url: '/api/Transaction/LoadAll',
       data: ''
     }),
     axios.get({
       url: '/api/Connection/LoadAll',
       data: ''
     })
     ]).then(res=> {
       //统计所以connectionCount
       var connCount=0;
       var conList = res[3];
       for (var index in conList) {
           var items=conList[index].items;
           connCount+=items.length;
        }
       return {code:0, data:[{name:"appCount",value:res[0].length}, {name:"sessionCount",value:res[1].length},
       {name:"transCount",value:res[2].length},{name:"connectionCount",value:connCount}]}

  })
}




export function getLicenseInfo() {
  return axios.get({
    url: '/api/License/LoadLicenseInfo',
    data: ''
  }).then((res) => {
      return {code:0,data:res}
  })
}

export function getInstanceInfo() {
  return axios.get({
    url: '/api/License/LoadInstanceInfo',
    data: ''
  }).then((res) => {
      return {code:0,data:res}
  })
}
