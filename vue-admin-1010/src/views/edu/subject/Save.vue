<template>
    <div class="app-container">
        <el-form label-width="120px">
            <el-form-item label="信息描述">
                <el-tag type="info">excel模版说明</el-tag>
                <el-tag>
                    <i class="el-icon-download"/>
                    <a :href="OSS_PATH + '/excel/temple.xlsx'">点击下载模版</a>
                </el-tag>
            </el-form-item>

            <el-form-item label="选择Excel">
                <el-upload
                    ref="upload"
                    :auto-upload="false"
                    :on-success="fileUploadSuccess"
                    :on-error="fileUploadError"
                    :disabled="importBtnDisabled"
                    :limit="1"
                    :action="BASE_API+'/edu/subject/add'"
                    name="file"
                    accept="application/.xlsx">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button
                    :loading="loading"
                    style="margin-left: 10px;"
                    size="small"
                    type="success"
                    @click="submitUpload">
                    {{ fileUploadBtnText }}
                </el-button>
                </el-upload>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            BASE_API: process.env.BASE_API, // 接口API地址
            OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
            fileUploadBtnText: '上传到服务器', // 按钮文字
            importBtnDisabled: false, // 上传按钮是否禁用
            loading: false,
        }
    },
    created() {
        //
    },
    methods: {
        // 1.将excel上传到服务器的事件函数
        submitUpload() {
            this.fileUploadBtnText = '正在上传'
            this.importBtnDisabled = true
            this.loading = true
            this.$refs.upload.submit()
        },
        // 2.上传成功的回调
        fileUploadSuccess() {
            this.fileUploadBtnText = '导入成功'
            this.loading = false
            this.$message({
                type: 'success',
                message: '导入成功!'
            })
            // 路由跳转到课程分类列表
            this.$router.push({path: '/subject/list'})
        },
        // 3.上传失败的回调
        fileUploadError() {
            this.fileUploadBtnText = '导入失败'
            this.loading = false
            this.$message({
                type: 'error',
                message: '导入失败!'
            })
        }
    },
}
</script>