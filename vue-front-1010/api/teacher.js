import request from '@/utils/request'

export default {
    // 1.获取讲师的分页信息
    getFrontTeachersMap(current, size) {
        return request({
            url: `/edu/front/teacher/get/page/${current}/${size}`,
            method: 'get',
        })
    },
    // 2.获取讲师的详细信息
    getFrontTeacherById(teacherId) {
        return request({
            url: `/edu/front/teacher/get/info/by/id/${teacherId}`,
            method: 'get',
        })
    },
}