import request from '@/utils/request'

export default {
    // 1.根据id，查询小节信息
    getVideoById(videoId) {
        return request({
            url: `/edu/video/get/by/id/${videoId}`,
            method: 'get',
        })
    },
    // 2.添加小节
    addVideo(video) {
        return request({
            url: '/edu/video/add',
            method: 'post',
            data: video
        })
    },
    // 3.修改小节
    updateVideo(video) {
        return request({
            url: '/edu/video/update',
            method: 'post',
            data: video
        })
    },
    // 4.根据小节id，删除小节
    deleteVideoById(videoId) {
        return request({
            url: `/edu/video/delete/by/id/${videoId}`,
            method: 'delete',
        })
    },
    // 5.根据视频id，删除上传的视频
    deleteVodById(videoId) {
        return request({
            url: `/vod/video/remove/by/id/${videoId}`,
            method: 'delete',
        })
    },
}