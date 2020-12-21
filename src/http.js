import axios from 'axios'

const http = axios.create({
   // baseURLs: "http://localhost:3001/admin/api",
   // baseURL: "http://localhost:3001/"
   baseURLs: "https://wx.ec-sudo.com:3001/admin/api",
   baseURL: "https://wx.ec-sudo.com:3001/"
})

export default http