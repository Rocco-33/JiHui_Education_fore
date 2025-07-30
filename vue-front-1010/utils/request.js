import axios from "axios"
import cookie from 'js-cookie'
import { MessageBox, Message } from "element-ui"

// 创建 axios 实例
const service = axios.create({
    baseURL: 'http://192.168.200.130:9001', // api 的 base_url
    timeout: 20000 // 请求超时时间
})

// http request 拦截器
service.interceptors.request.use(
    config => {
        // 如果cookie中存在token，则放入请求头
        if (cookie.get('token')) {
            config.headers['token'] = cookie.get('token');
        }
        return config
    },
    err => {
        return Promise.reject(err);
    })

// http response 拦截器
service.interceptors.response.use(
    response => {
        if (response.data.code === 28004) {
            // 返回 错误代码-1 清除ticket信息并跳转到登录页面
            window.location.href="/login"
            Message({
                message: response.data.message,
                type: 'error',
                duration: 5 * 1000
            })
            return
        } else {
            if (response.data.code !== 20000) {
                //25000：订单支付中，不做任何提示
                if(response.data.code !== 25000) {
                    Message({
                        message: response.data.message || 'error',
                        type: 'error',
                        duration: 5 * 1000
                    })
                }
            } else {
                return response;
            }
        }
    },
    error => {
        return Promise.reject(error.response)   // 返回接口返回的错误信息
    });
  

export default service