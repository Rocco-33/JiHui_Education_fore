<template>
    <div class="app-container">
        <h2 style="text-align: center;">发布新课程</h2>
        <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="填写课程基本信息"/>
            <el-step title="创建课程大纲"/>
            <el-step title="提交审核"/>
        </el-steps>
        <div class="ccInfo">
            <img :src="coursePublishInfo.cover">
            <div class="main">
                <h2>{{ coursePublishInfo.title }}</h2>
                <p class="gray"><span>共{{ coursePublishInfo.lessonNum }}课时</span></p>
                <p><span>所属分类：{{ coursePublishInfo.firstSubject }} — {{ coursePublishInfo.secondSubject }}</span></p>
                <p>课程讲师：{{ coursePublishInfo.teacherName }}</p>
                <h3 class="red">￥{{ coursePublishInfo.price }}</h3>
            </div>
        </div>
        <div>
            <el-button @click="previous">返回修改</el-button>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">发布课程</el-button>
        </div>
    </div>
</template>

<script>
import course from '@/api/edu/course'

export default {
    data() {
        return {
            saveBtnDisabled: false, // 保存按钮是否禁用
            courseId: '', // 课程id
            coursePublishInfo: {} // 课程发布对象
        }
    },
    created() {
        // 1.获取路由路径中的课程id
        if(this.$route.params && this.$route.params.id) {
            this.courseId = this.$route.params.id
        }
        // 2.初始化课程发布信息
        this.getPublishInfo()
    },
    methods: {
        // 1.点击上一步，跳转到 "创建课程大纲" 页面
        previous() {
            console.log('previous')
            this.$router.push({ path: '/course/chapter/' + this.courseId })
        },
        // 2.点击发布课程
        publish() {
            this.$confirm('是否核对信息无误，并确认发布?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        course.publish(this.courseId)
                            .then(response => {
                                // 1.提示信息
                                this.$message({
                                    type: 'success',
                                    message: '课程发布成功!'
                                })
                                // 2.路由跳转到课程列表
                                this.$router.push({ path: '/course/list' }) 
                            })
                    })
        },
        // 3.根据课程 id 查询课程发布信息
        getPublishInfo() {
            course.getPublishInfoById(this.courseId)
                .then(response => {
                    this.coursePublishInfo = response.data.coursePublishInfo
                })
        },
    }
}
</script>

<style scoped>
.ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
}
.ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
}
.ccInfo .main {
    margin-left: 520px;
}
.ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
}
</style>