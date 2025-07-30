import request from '@/utils/request'

export default {
    getAllBanner() {
        return request({
            url: '/cms/banner/get/all',
            method: 'get'
        })
    }
}