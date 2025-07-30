import request from '@/utils/request'

const api_name = '/edu/comment'

export default {

    // 1.根据课程 id，获取评论分页信息
    getCommentPageInfoByCourseId(current, size, courseId) {
        return request({
            url: `${api_name}/get/page/by/course/id/${current}/${size}`,
            method: 'get',
            params: {courseId},
        })
    },
    // 2.添加评论
    addComment(comment) {
        return request({
            url: `${api_name}/add`,
            method: 'post',
            data: comment,
        })
    }

}