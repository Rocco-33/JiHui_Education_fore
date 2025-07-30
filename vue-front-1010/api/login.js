import request from '@/utils/request'

export default {
    // 1.用户登录
    loginUser(user) {
        return request({
            url: '/usr/login',
            method: 'post',
            data: user,
        })
    },
    // 2.根据 token 获取用户信息
    getUserByToken() {
        return request({
            url: `/usr/get/user/info/by/token`,
            method: 'get',
        })
    },
}