import request from '@/utils/request'

export default {
    // 1.发送验证码到指定手机号
    sendCodeToPhone(phone) {
        return request({
            url: `/sms/send/code/to/phone/${phone}`,
            method: 'get',
        })
    },
    // 2.用户注册
    registerUser(params) {
        return request({
            url: '/usr/register',
            method: 'post',
            data: params,
        })
    },
}