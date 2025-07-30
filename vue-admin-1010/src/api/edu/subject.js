import request from '@/utils/request'

export default {
    // 查询所有课程分类
    getSubjectList() {
        return request({
            url: '/edu/subject/get/list/by/tree',
            method: 'get'
        })
    }
}