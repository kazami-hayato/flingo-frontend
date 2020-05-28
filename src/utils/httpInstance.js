import axios from 'axios'
export const polyvInstance = axios.create({
  baseURL:'https://api.polyv.net',
  timeout:1000
})
polyvInstance.interceptors.request.use((config)=>{
  // console.log(config)
  return config
})
