import axios from 'axios'

const http = axios.create({
    baseURL: "https://wx.ec-sudo.com:3001/"
   //baseURL: "http://localhost:3001/"
})

export default http