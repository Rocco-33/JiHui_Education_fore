import request from '@/utils/request'

export default {
    // 1.查询课程章节列表
    getChapterList(courseId) {
        return request({
            url: `/edu/chapter/get/list/by/id/${courseId}`,
            method: 'get'
        })
    },
    // 2.根据id，查询章节信息
    getChapterById(chapterId) {
        return request({
            url: `/edu/chapter/get/by/id/${chapterId}`,
            method: 'get',
        })
    },
    // 3.添加课程章节
    addChapter(chapter) {
        return request({
            url: '/edu/chapter/add',
            method: 'post',
            data: chapter
        })
    },
    // 4.修改课程章节
    updateChapter(chapter) {
        return request({
            url: '/edu/chapter/update',
            method: 'post',
            data: chapter
        })
    },
    // 5.根据id，删除课程章节
    deleteChapterById(chapterId) {
        return request({
            url: `/edu/chapter/delete/by/id/${chapterId}`,
            method: 'delete',
        })
    },
}