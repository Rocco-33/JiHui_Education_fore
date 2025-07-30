import request from '@/utils/request'

export default {
    // 1.获取讲师列表（条件查询分页）
    // 参数: current 当前页，size 分页大小，teacherQuery 条件对象
    getTeacherListPage(current, size, teacherQuery) {
        return request({
          url: `/edu/teacher/get/page/by/condition/${current}/${size}`,
          method: 'post',
          data: teacherQuery, // 将条件对象转换成json对象传递给接口
        })
    },
    // 2.删除讲师（根据ID）
    removeTeacherById(id) {
      return request({
        url: `/edu/teacher/remove/by/id/${id}`,
        method: 'delete',
      })
    },
    // 3.添加讲师
    addTeacher(teacher) {
      return request({
        url: `/edu/teacher/add`,
        method: 'post',
        data: teacher,
      })
    },
    // 4.修改讲师
    updateTeacher(teacher) {
      return request({
        url: `/edu/teacher/update`,
        method: 'post',
        data: teacher,
      })
    },
    // 5.查询讲师（根据ID）
    getTeacher(id) {
      return request({
        url: `/edu/teacher/get/by/id/${id}`,
        method: 'get',
      })
    },
    // 5.查询所有讲师
    getTeacherList() {
      return request({
        url: '/edu/teacher/get/all',
        method: 'get',
      })
    },
}

export function getList(params) {
  return request({
    url: '/edu/table/list',
    method: 'get',
    params
  })
}