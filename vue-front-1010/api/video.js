import request from '@/utils/request'

const api_name = '/vod'

export default {

    // 1.根据视频id，获取视频播放凭证
    getPlayAuthById(id) {
        return request({
            url: `${api_name}/get/play/auth/by/id/${id}`,
            method: 'get'
        })
    }

}