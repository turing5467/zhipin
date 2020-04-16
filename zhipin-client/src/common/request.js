import axios from 'axios';

export const uploadURL = 'http://localhost:8088/zhipin/uploadResume'

export  function request(config) {
    let instance = axios.create({
        baseURL: 'http://localhost:8088/zhipin',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8' //默认json格式请求体携带参数
        }
    });

    // instance.interceptors.request.use(config => {
    //     config.loadingText !== undefined && message.loading(config.loadingText, 0);
    //     return config;
    //   })

      instance.interceptors.response.use(response => {
        return response.data
      })

    return instance(config);
}
//异步函数，执行时需要使用await

export function requestJobMenu() { 
    return request({
        url: '/jobs'
    })
 }
 export function requestHotJob() { 
    return request({
        url: '/hot_job'
    })
 }
 export function requestHotCPN() { 
    return request({
        url: '/hot_cpn'
    })
 }
 export function requestCityTitle() { 
    return request({
        url: '/city_title'
    })
 }
 export function requestCities() { 
    return request({
        url: '/cities'
    })
 }
 export function requestJobList(page, condition) { 
    return request({
        url: '/getJobList',
        params: {
            page,condition
        }
    })
 }
 export function requestCPNList(page = 1) { 
    return request({
        url: '/getCPNList',
        params: {
            page
        }
    })
 }
  export function requestCPNDetail(code) { 
    return request({
        url: '/getCPNDetail',
        params: {
            code
        }
    })
 }
 export function requestJobDetail(code) { 
    return request({
        url: '/getJobDetail',
        params: {
            code
        }
    })
 }
 export function requestRegister(phone) {
     return request({
         url: '/addUser',
         params: {
             phone
         }
     })
 }
 export function requestLogin(phone, pwd) { 
     return request({
         url: '/getUserByPhone',
         params: {
             phone,
             pwd
         }
     })
  }
  export function requestGetUser(id) {
    return request({
        url: '/getUserById',
        params: {
            id
        }
    })
}
  export function requestGetDetail(phone) {
      return request({
          url: '/getDetailByPhone',
          params: {
              phone
          }
      })
  }
  export function requestUpdateDetail(phone, update) {
    return request({
        url: '/updateDetailByPhone',
        method: 'post',
        data: {
            phone,
            update
        }
    })
}

export function requestUpdateUser(id, pwd) {
    return request({
        url: '/updateUserById',
        method: 'post',
        data: {
            id,pwd
        }
    })
}

export function requestGetCert() { 
    return request({
        url: '/cert',
    })
 }