<template>
    <div class="app-container">
        <h2 style="text-align: center;">发布新课程</h2>
        <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="填写课程基本信息"/>
            <el-step title="创建课程大纲"/>
            <el-step title="提交审核"/>
        </el-steps>
        <el-form label-width="120px">
            <el-form-item label="课程标题">
                <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程，专业名称注意大小写"/>
            </el-form-item>

            <el-form-item label="课程分类">
                <el-select 
                v-model="courseInfo.subjectParentId" 
                placeholder="一级分类"
                @change="firstSubjectChange">
                    <el-option
                    v-for="firstSubject in firstSubjectList"
                    :key="firstSubject.id"
                    :label="firstSubject.title"
                    :value="firstSubject.id"/>
                </el-select>

                <el-select 
                v-model="courseInfo.subjectId" 
                placeholder="二级分类">
                    <el-option
                    v-for="secondSubject in secondSubjectList"
                    :key="secondSubject.id"
                    :label="secondSubject.title"
                    :value="secondSubject.id"/>
                </el-select>
            </el-form-item>

            <el-form-item label="课程讲师">
                <el-select
                v-model="courseInfo.teacherId"
                placeholder="请选择">
                    <el-option
                    v-for="teacher in teacherList"
                    :key="teacher.id"
                    :label="teacher.name"
                    :value="teacher.id"/>
                </el-select>
            </el-form-item>

            <el-form-item label="总课时">
                <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
            </el-form-item>

            <el-form-item label="课程简介">
                <Tinymce :height="300" v-model="courseInfo.description"/>
            </el-form-item>

            <el-form-item label="课程封面">
                <el-upload
                :show-file-list="false"
                :on-success="AvatarUploadSuccess"
                :before-upload="AvatarBeforeUpload"
                :action="BASE_API + '/oss/file/upload'"
                class="avatar-uploader">
                <img :src="String(courseInfo.cover)" width="300px" height="300px">
                </el-upload>
            </el-form-item>

            <el-form-item label="课程价格">
                <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="示例"/>
            </el-form-item>

            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 引入js文件
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
// 引入组件
import Tinymce from '@/components/Tinymce'

export default {
    components: { Tinymce },
    data() {
        return {
            BASE_API: process.env.BASE_API, //接口地址
            saveBtnDisabled: false, //保存按钮是否禁用
            courseId: '', //课程id
            courseInfo: { //课程基本信息
                title: '',
                subjectId: '',
                subjectParentId: '',
                teacherId: '',
                lessonNum: 0,
                description: '',
                cover: process.env.OSS_PATH + '/course/cover/default.jpg',
                price: 0
            },
            teacherList: [], //讲师数组
            firstSubjectList: [], //一级课程分类的数组
            secondSubjectList: [], //二级课程分类的数组
        }
    },
    created() {
        // 1.初始化课程基本信息
        this.init()
    },
    methods: {
        // 0.初始化课程基本信息
        init() {
            // 判断路径是否有id，如果有则获取id并查询课程基本信息
            if(this.$route.params && this.$route.params.id) {
                this.courseId = this.$route.params.id
                this.getCourseInfo()
            } else {
                // 重置数据
                this.courseId = ''
                this.courseInfo = {
                    title: '',
                    subjectId: '',
                    subjectParentId: '',
                    teacherId: '',
                    lessonNum: 0,
                    description: '',
                    cover: process.env.OSS_PATH + '/course/cover/default.jpg',
                    price: 0
                }
                // 初始化课程分类信息（一级）
                this.getSubjectList()
            }
            // 初始化所有讲师信息
            this.getAllTeacher()
        },
        // 1.点击下一步
        next() {
            if(!this.courseId) {
                this.addCourseInfo()
            } else {
                this.updateCourseInfo()
            }
        },
        // 2.查询所有讲师信息
        getAllTeacher() {
            course.getAllTeacher()
                .then(response => {
                    this.teacherList = response.data.teacherList
                })
        },
        // 3.查询所有课程分类
        getSubjectList() {
            subject.getSubjectList()
                .then(response => {
                    this.firstSubjectList = response.data.subjectList
                })
        },
        // 4.改变一级课程分类
        firstSubjectChange(subjectId) {
            for (let i = 0; i < this.firstSubjectList.length; i++) {
                // 找到选中的一级课程分类
                if (this.firstSubjectList[i].id === subjectId) {
                    // 取出其二级课程分类的数组，并赋值
                    this.secondSubjectList = this.firstSubjectList[i].children
                    this.courseInfo.subjectId = ''
                }
            }
        },
        // 5.上传课程封面之前的回调
        AvatarBeforeUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        // 6.上传课程封面成功的回调
        AvatarUploadSuccess(response, file) {
            console.log(response)// 上传响应
            console.log(URL.createObjectURL(file.raw))// base64编码
            this.courseInfo.cover = response.data.url
        },
        // 7.查询课程基本信息
        getCourseInfo() {
            course.getCourseInfoById(this.courseId)
                .then(response => {
                    this.courseInfo = response.data.courseInfo
                    // 7.1 查询课程分类
                    subject.getSubjectList()
                        .then(response => {
                            this.firstSubjectList = response.data.subjectList
                            // 7.2 遍历一级分类
                            for(var i = 0; i < this.firstSubjectList.length; i++) {
                                var firstSubject = this.firstSubjectList[i]
                                // 7.3 与回显的数据比较，相等则赋值二级分类
                                if(this.courseInfo.subjectParentId == firstSubject.id) {
                                    this.secondSubjectList = firstSubject.children
                                }
                            }
                        })
                })
        },
        // 8.添加课程的基本信息
        addCourseInfo() {
            course.addCourseInfo(this.courseInfo)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '添加课程信息成功！'
                    })
                    // 跳转到 "创建课程大纲" 页面
                    this.$router.push({ path: '/course/chapter/' + response.data.courseId })
                })
        },
        // 9.修改课程的基本信息
        updateCourseInfo() {
            course.updateCourseInfo(this.courseInfo)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '修改课程信息成功！'
                    })
                    // 跳转到 "创建课程大纲" 页面
                    this.$router.push({ path: '/course/chapter/' + this.courseId })
                })
        }
    }
}
</script>

<style scoped>
.tinymce-container {
    line-height: 29px;
}
</style>