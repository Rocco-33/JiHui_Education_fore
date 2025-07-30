import request from '@/utils/request'

export default {
    // 1.添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: '/edu/course/add/info',
            method: 'post',
            data: courseInfo,
        })
    },
    // 2.修改课程基本信息
    updateCourseInfo(courseInfo) {
        return request({
            url: '/edu/course/update',
            method: 'post',
            data: courseInfo
        })
    },
    // 3.查询所有讲师信息
    getAllTeacher() {
        return request({
            url: '/edu/teacher/get/all',
            method: 'get',
        })
    },
    // 4.查询课程基本信息
    getCourseInfoById(courseId) {
        return request({
            url: `/edu/course/get/info/by/id/${courseId}`,
            method: 'get',
        })
    },
    // 5.查询课程发布信息
    getPublishInfoById(courseId) {
        return request({
            url: `/edu/course/get/publish/info/by/id/${courseId}`,
            method: 'get',
        })
    },
    // 6.发布课程
    publish(courseId) {
        return request({
            url: `/edu/course/publish/${courseId}`,
            method: 'get',
        })
    },
    // 7.条件查询课程分页
    getPageByCondition(current, size, courseQuery) {
        return request({
            url: `/edu/course/get/page/by/condition/${current}/${size}`,
            method: 'post',
            data: courseQuery,
        })
    },
    // 8.根据课程 id 删除该课程相关信息
    deleteCourseById(courseId) {
        return request({
            url: `/edu/course/delete/by/id/${courseId}`,
            method: 'delete',
        })
    },
}