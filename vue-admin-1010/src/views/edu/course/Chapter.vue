<template>
    <div class="app-container">
        <h2 style="text-align: center;">发布新课程</h2>
        <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="填写课程基本信息"/>
            <el-step title="创建课程大纲"/>
            <el-step title="提交审核"/>
        </el-steps>

        <!-- 章节 -->
        <ul class="chapterList">
            <li v-for="chapter in chapterList" :key="chapter.id">
                <p>
                    {{ chapter.title }}
                    <span class="acts">
                        <el-button type="text" @click="openAddVideoDialog(chapter.id)">添加小节</el-button>
                        <el-button style="" type="text" @click="openEditChapterDialog(chapter.id)">编辑</el-button>
                        <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
                    </span>
                </p>
                <!-- 小节 -->
                <ul class="chapterList videoList">
                    <li v-for="video in chapter.children" :key="video.id">
                        <p>{{ video.title }}
                            <span class="acts">
                                <el-button type="text" @click="openEditVideoDialog(video.id)">编辑</el-button>
                                <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
                            </span>
                        </p>
                    </li>
                </ul>
            </li>
        </ul>

        <el-button type="text" @click="openAddChapterDialog">添加章节</el-button>

        <div>
            <el-button @click="previous">上一步</el-button>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
        </div>

        <!-- 添加/修改章节的弹窗 -->
        <el-dialog :visible.sync="chapterDialogVisible" title="添加章节">
            <el-form :model="chapter" label-width="120px">
                <el-form-item label="章节标题">
                    <el-input v-model="chapter.title"/>
                </el-form-item>
                <el-form-item label="章节排序">
                    <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="chapterDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveOrUpdateChapter">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 添加/修改小节的弹窗 -->
        <el-dialog :visible.sync="videoDialogVisible" title="添加小节">
            <el-form :model="video" label-width="120px">
                <el-form-item label="课时标题">
                    <el-input v-model="video.title"/>
                </el-form-item>
                <el-form-item label="课时排序">
                    <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
                </el-form-item>
                <el-form-item label="是否免费">
                    <el-radio-group v-model="video.isFree">
                        <el-radio :label="true">免费</el-radio>
                        <el-radio :label="false">默认</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上传视频">
                    <el-upload
                    :on-success="handleVodUploadSuccess"
                    :on-exceed="handleVodUploadExceed"
                    :before-remove="beforeVodRemove"
                    :on-remove="handleVodRemove"
                    :file-list="fileList"
                    :action="BASE_API + '/vod/video/upload'"
                    :limit="1"
                    class="upload-demo">
                        <el-button size="small" type="primary">上传视频</el-button>
                        <el-tooltip placement="right-end">
                            <div slot="content">最大支持1G,<br>
                            支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                            GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                            MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                            SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
                            <i class="el-icon-question"/>
                        </el-tooltip>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="videoDialogVisible = false">取 消</el-button>
                <el-button :disabled="saveVideoBtnDisabled" type="primary"
                @click="saveOrUpdateVideo">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import chapter from '@/api/edu/chapter'
import video from '@/api/edu/video'

export default {
    data() {
        return {
            saveBtnDisabled: false, // 保存按钮是否禁用
            saveVideoBtnDisabled: false, // 保存小节的按钮是否禁用
            chapterDialogVisible: false, // 是否显示章节弹窗
            videoDialogVisible: false, // 是否显示小节弹窗
            courseId: '', // 课程id
            chapterList: [], // 课程章节列表
            chapter: { // 章节对象
                title: '',
                sort: 0,
            },
            video: { // 小节对象
                title: '',
                sort: 0,
                isFree: 0,
                videoSourceId: '',
                videoOriginalName: '',
            },
            fileList: [], //上传文件列表
            BASE_API: process.env.BASE_API, // 接口API地址
        }
    },
    created() {
        // 1.获取路由路径中的课程id
        if(this.$route.params && this.$route.params.id) {
            this.courseId = this.$route.params.id
        }
        // 2.初始化课程大纲列表
        this.getChapterList()
    },
    methods: {
        // 1.点击上一步，跳转到 "填写课程基本信息" 页面
        previous() {
            this.$router.push({ path: '/course/info/' + this.courseId })
        },
        // 2.点击下一步，跳转到 "提交审核" 页面
        next() {
            this.$router.push({ path: '/course/publish/' + this.courseId })
        },
        // 3.根据课程 id 查询课程大纲列表
        getChapterList() {
            chapter.getChapterList(this.courseId)
                .then(response => {
                    this.chapterList = response.data.chapterList
                })
            // 清空视频文件列表
            this.fileList = []
        },
        /************************* 章节操作 *************************/
        // 1.打开添加章节的弹窗
        openAddChapterDialog() {
            // 1.1 显示弹窗
            this.chapterDialogVisible = true
            // 1.2 重置章节信息
            this.chapter = {
                id: null,
                title: '',
                sort: 0,
            }
        },
        // 2.打开修改章节的弹窗
        openEditChapterDialog(chapterId) {
            // 2.1 显示弹窗
            this.chapterDialogVisible = true
            // 2.2 根据id，查询章节信息
            chapter.getChapterById(chapterId)
                .then(response => {
                    this.chapter = response.data.chapter
                })
        },
        // 3.确定添加章节
        saveChapter() {
            this.chapter.courseId = this.courseId // 设置课程id
            chapter.addChapter(this.chapter)
                .then(response => {
                    // 3.1 关闭弹窗
                    this.chapterDialogVisible = false
                    // 3.2 提示信息
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                    // 3.3 刷新课程大纲列表
                    this.getChapterList()
                })
        },
        // 4.确定修改章节
        updateChapter() {
            chapter.updateChapter(this.chapter)
                .then(response => {
                    // 5.1 关闭弹窗
                    this.chapterDialogVisible = false
                    // 5.2 提示信息
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    })
                    // 5.3 刷新课程大纲列表
                    this.getChapterList()
                })
        },
        // 5.添加/修改 章节信息
        saveOrUpdateChapter() {
            // 根据章节id判断
            if(!this.chapter.id) {
                this.saveChapter()
            } else {
                this.updateChapter()
            }
        },
        // 6.删除章节信息
        removeChapter(chapterId) {
            this.$confirm('此操作将永久删除章节信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                chapter.deleteChapterById(chapterId)
                    .then(response => {
                        // 6.1 提示信息
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        // 6.2 刷新课程大纲列表
                        this.getChapterList()
                    })
            })
        },
        /************************* 小节操作 *************************/
        // 1.打开添加小节的弹窗
        openAddVideoDialog(chapterId) {
            // 重置小节信息
            this.video = {
                id: null,
                title: '',
                sort: 0,
                isFree: 0,
                videoSourceId: '',
                videoOriginalName: ''
            }
            this.videoDialogVisible = true // 显示弹窗
            this.video.courseId = this.courseId // 设置课程id
            this.video.chapterId = chapterId // 设置章节id
        },
        // 2.打开修改小节的弹窗
        openEditVideoDialog(videoId) {
            // 2.1 显示弹窗
            this.videoDialogVisible = true
            // 2.2 根据id，查询小节信息
            video.getVideoById(videoId)
                .then(response => {
                    this.video = response.data.video
                })
        },
        // 3.确定添加小节
        saveVideo() {
            video.addVideo(this.video)
                .then(response => {
                    // 3.1 关闭弹窗
                    this.videoDialogVisible = false
                    // 3.2 提示信息
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                    // 3.3 刷新课程大纲列表
                    this.getChapterList()
                })
        },
        // 4.确定修改小节
        updateVideo() {
            video.updateVideo(this.video)
                .then(response => {
                    // 4.1 关闭弹窗
                    this.videoDialogVisible = false
                    // 4.2 提示信息
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    })
                    // 4.3 刷新课程大纲列表
                    this.getChapterList()
                })
        },
        // 5.添加/修改 小节信息
        saveOrUpdateVideo() {
            if(!this.video.id) {
                this.saveVideo()
            } else {
                this.updateVideo()
            }
        },
        // 6.删除小节
        removeVideo(videoId) {
            this.$confirm('此操作将永久删除小节信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                video.deleteVideoById(videoId)
                    .then(response => {
                        // 6.1 提示信息
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        // 6.2 刷新课程大纲列表
                        this.getChapterList()
                    })
            })
        },
        // 7.视频上传成功后的回调
        handleVodUploadSuccess(response, file, fileList) {
            this.video.videoSourceId = response.data.videoId
            this.video.videoOriginalName = file.name
        },
        // 8.上传视频数超过限制的回调（大于定义的limit值）
        handleVodUploadExceed() {
            this.$message.warning('想要重新上传视频，请先删除已上传的视频！')
        },
        // 9.删除上传的视频文件之前的回调
        beforeVodRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}?`)
        },
        // 10.确认删除上传的视频文件
        handleVodRemove() {
            video.deleteVodById(this.video.videoSourceId)
                .then(response => {
                    // 10.1 提示信息
                    this.$message({
                        type: 'success',
                        message: '视频移除成功!'
                    })
                    // 10.2 清空视频文件列表
                    this.fileList = []
                    // 10.3 清空小节对象的数据
                    this.video.videoSourceId = ''
                    this.video.videoOriginalName = ''
                })
        }
    }
}
</script>

<style scoped>
.chapterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chapterList li{
    position: relative;
}
.chapterList p{
    float: left;
    font-size: 20px;
    margin: 10px 0;
    padding: 10px;
    height: 70px;
    line-height: 50px;
    width: 100%;
    border: 1px solid #DDD;
}
.chapterList .acts {
    float: right;
    font-size: 14px;
}
.videoList{
    padding-left: 50px;
}
.videoList p{
    float: left;
    font-size: 14px;
    margin: 10px 0;
    padding: 10px;
    height: 50px;
    line-height: 30px;
    width: 100%;
    border: 1px dotted #DDD;
}
</style>