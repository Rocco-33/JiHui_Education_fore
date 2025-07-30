import request from '@/utils/request'

const api_name = '/order'

export default {

    // 1.创建订单，获取订单编号
    createOrder(courseId) {
        return request({
            url: `${api_name}/create/${courseId}`,
            method: 'get',
        })
    },
    // 2.根据订单编号，查询订单信息
    getOrderByNo(orderNo) {
        return request({
            url: `${api_name}/get/by/no/${orderNo}`,
            method: 'get',
        })
    },
    // 3.根据订单编号，获取微信支付二维码
    getPayQRCode(orderNo) {
        return request({
            url: `${api_name}/pay/get/qr/code/${orderNo}`,
            method: 'get',
        })
    },
    // 4.查询订单支付状态，更新订单状态，添加支付记录
    updateOrder(orderNo) {
        return request({
            url: `${api_name}/pay/update/by/orderNo/${orderNo}`,
            method: 'get',
        })
    },
    // 5.根据课程 id，通过查询订单，判断用户是否已购该课程
    isBuyCourse(courseId) {
        return request({
            url: `${api_name}/is/buy/course/${courseId}`,
            method: 'get',
        })
    },
}