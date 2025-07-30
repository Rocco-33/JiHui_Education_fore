import request from '@/utils/request'

export default {
    // 1.查询首页的8门热门课程
    getIndexCourseList() {
        return request({
            url: '/edu/index/get/course/list',
            method: 'get'
        })
    },
    // 2.查询首页的4位名师
    getIndexTeacherList() {
        return request({
            url: '/edu/index/get/teacher/list',
            method: 'get'
        })
    },
}