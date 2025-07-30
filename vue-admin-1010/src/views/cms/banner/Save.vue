<template>
    <div class="app-container">
        <el-form label-width="120px">
            <el-form-item label="轮播图标题">
                <el-input v-model="banner.title"/>
            </el-form-item>

            <el-form-item label="轮播图排序">
                <el-input-number v-model="banner.sort" controls-position="right" :min="0"/>
            </el-form-item>

            <el-form-item label="轮播图图片">
                <!-- 头衔缩略图 -->
                <pan-thumb :image="String(banner.imageUrl)"/>
                <!-- 文件上传按钮 -->
                <el-button type="primary" icon="el-icon-upload" @click="imageCropperIsShow = true">更换头图
                </el-button>
                <!--
                    v-show：是否显示上传弹框组件
                    :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                    :url：后台上传的url地址
                    @close：关闭上传组件的回调
                    @crop-upload-success：上传成功后的回调 
                -->
                <image-cropper
                    v-show="imageCropperIsShow"
                    :width="1200"
                    :height="480"
                    :key="imageCropperKey"
                    :url="BASE_API + '/oss/file/upload'"
                    field="file"
                    @close="closeImageCropper"
                    @crop-upload-success="cropUploadSuccess"/>
            </el-form-item>

            <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import banner from '@/api/cms/banner'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
    components: {ImageCropper, PanThumb},
    data() {
        return {
            banner: {
                title: '',
                sort: 0,
                imageUrl: process.env.OSS_PATH + '/banner/default.jpg',
            },
            imageCropperKey: 0,             //上传弹框的key
            imageCropperIsShow: false,      //上传弹框是否显示
            saveBtnDisabled: false,         //保存按钮是否禁用
            BASE_API: process.env.BASE_API, //获取dev.env.js的api地址
        }
    },
    created() {
        this.init()
    },
    watch: {
        // 路由发生变化则执行
        $route(to, from) {
            this.init()
        }
    },
    methods: {
        // 0.初始化
        init() {
            // 判断路径是否有id，如果有则获取id并查询轮播图
            if(this.$route.params && this.$route.params.id) {
                const id = this.$route.params.id
                this.getBanner(id)
            } else {
                this.banner = {
                    title: '',
                    sort: 0,
                    imageUrl: process.env.OSS_PATH + '/banner/default.jpg',
                }
            }
        },
        // 1.保存
        saveOrUpdate() {
            // 根据id 判断添加或修改
            if(!this.banner.id) {
                this.saveBanner()
            } else {
                this.updateBanner()
            }
        },
        // 2.添加轮播图
        saveBanner() {
            banner.addBanner(this.banner)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                    // 路由跳转到列表页面
                    this.$router.push({path:'/banner/list'})
                })
        },
        // 3.查询轮播图（根据id）
        getBanner(id) {
            banner.getBanner(id)
                .then(response => {
                    this.banner = response.data.banner
                })
        },
        // 3.修改轮播图
        updateBanner() {
            banner.updateBanner(this.banner)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    })
                    // 路由跳转到列表页面
                    this.$router.push({path:'/banner/list'})
                })
        },
        // 4.图片上传成功
        cropUploadSuccess(data) {
            // data即封装的返回结果对象
            this.banner.imageUrl = data.url
            this.$message({
                type: 'success',
                message: '保存成功!'
            })
            this.imageCropperIsShow = false // 关闭弹框
            this.imageCropperKey = this.imageCropperKey + 1 // 初始化组件
        },
        // 5.关闭图片上传弹框
        closeImageCropper() {
            this.imageCropperIsShow = false
            this.imageCropperKey = this.imageCropperKey + 1 // 初始化组件
        },
    },
}
</script>