import axios from 'axios'
import router from './router'
import Vue from 'vue'

const http = axios.create({
   // baseURLs: "http://localhost:3001/admin/api",
   // baseURL: "http://localhost:3001/"
   baseURLs: "https://wx.ec-sudo.com:3001/admin/api",
   baseURL: "https://wx.ec-sudo.com:3001/"
})

//校验
http.interceptors.request.use(function (config) {
   if (localStorage.token) {
       config.headers.Authorization = 'Bearer ' + localStorage.token
   }
   return config
}, function (error) {
   return Promise.reject(error)
})

//全局捕获
http.interceptors.response.use(res => {
   return res
}, err => {
   if (err.response.data.message) {
       //获取错误信息
       Vue.prototype.$message.error(err.response.data.message)
       console.log(err.response)
       if (err.response.status === 401) {
           router.push('/login')
       }
   }
   return Promise.reject(err)
})
export default http