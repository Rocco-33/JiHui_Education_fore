import request from '@/utils/request'

export default {
    // 1.条件查询课程分页集合
    getData(current, size, courseQuery) {
        return request({
            url: `/edu/front/course/get/page/by/condition/${current}/${size}`,
            method: 'post',
            data: courseQuery,
        })
    },
    // 2.获取所有课程分类（树形结构）
    getSubjectListByTree() {
        return request({
            url: `/edu/subject/get/list/by/tree`,
            method: 'get',
        })
    },
    // 3.获取课程的详细信息
    getCourseInfoById(courseId) {
        return request({
            url: `/edu/front/course/get/info/by/id/${courseId}`,
            method: 'get',
        })
    }
}