<template>
    <client-only>
        <div class="main">
            <div class="title">
            <a href="/login">登录</a>
            <span>·</span>
            <a class="active" href="/register">注册</a>
            </div>

            <div class="sign-up-container">
            <el-form ref="userForm" :model="params">

                <el-form-item
                    class="input-prepend restyle"
                    prop="nickname"
                    :rules="[{ required: true, message: '请输入你的昵称', trigger: 'blur', },]">
                <div>
                    <el-input
                        type="text"
                        placeholder="你的昵称"
                        v-model="params.nickname"/>
                    <i class="iconfont icon-user"/>
                </div>
                </el-form-item>

                <el-form-item
                    class="input-prepend restyle no-radius"
                    prop="mobile"
                    :rules="[
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { validator: checkPhone, trigger: 'blur' },
                    ]">
                <div>
                    <el-input
                        type="text"
                        placeholder="手机号"
                        v-model="params.mobile"/>
                    <i class="iconfont icon-phone"/>
                </div>
                </el-form-item>

                <el-form-item
                    class="input-prepend restyle no-radius"
                    prop="code"
                    :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' },]">
                <div style="width: 100%; display: block; float: left; position: relative">
                    <el-input type="text" placeholder="验证码" v-model="params.code" />
                    <i class="iconfont icon-phone"/>
                </div>
                <div class="btn" style="/*position: absolute;*/ right: 0; top: 6px; width: 40%">
                    <a
                        href="javascript:"
                        type="button"
                        @click="sendCodeToPhone()"
                        :value="codeTest"
                        style="border: none; background-color: none">
                    {{ codeTest }}</a>
                </div>
                </el-form-item>

                <el-form-item
                class="input-prepend"
                prop="password"
                :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
                <div>
                    <el-input
                        type="password"
                        placeholder="设置密码"
                        v-model="params.password"/>
                    <i class="iconfont icon-password" />
                </div>
                </el-form-item>

                <div class="btn">
                <input
                    type="button"
                    class="sign-up-button"
                    value="注册"
                    @click="submitRegister()"
                />
                </div>
                <p class="sign-up-msg">
                点击 “注册” 即表示您同意并愿意遵守简书
                <br/>
                <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">用户协议</a>和
                <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a>。
                </p>
            </el-form>
            <!-- 更多注册方式 -->
            <div class="more-sign">
                <h6>社交帐号直接注册</h6>
                <ul>
                <li>
                    <a
                        id="weixin"
                        class="weixin"
                        target="_blank"
                        href="http://huaan.free.idcfengye.com/api/ucenter/wx/login">
                    <i class="iconfont icon-weixin"/>
                    </a>
                </li>
                <li>
                    <a id="qq" class="qq" target="_blank" href="#"
                    >
                    <i class="iconfont icon-qq"/>
                    </a>
                </li>
                </ul>
            </div>
            </div>
        </div>
    </client-only>
</template>

<script>
import "~/assets/css/sign.css";
import "~/assets/css/iconfont.css";

import register from '@/api/register'

export default {
  layout: "sign",
  data() {
    return {
      params: {
        mobile: "",
        code: "",
        nickname: "",
        password: "",
      },
      sending: true, //是否可以发送验证码
      second: 60, //倒计时间
      codeTest: "获取验证码",
    };
  },
  methods: {
    // 1.检查手机号输入格式
    checkPhone(rule, value, callback) {
      if (!(/^1[34578]\d{9}$/.test(value))) {
        return callback(new Error("手机号码格式不正确"));
      }
      return callback();
    },
    // 2.发送完验证码的倒计时
    timeDown() {
        let result = setInterval(() => {
            --this.second;
            this.codeTest = this.second

            if (this.second < 1) {
                clearInterval(result) //销毁定时器对象
                this.sending = true //可以发送
                //this.disabled = false
                this.second = 60
                this.codeTest = "获取验证码"
            }
        }, 1000);
    },
    // 3.发送验证码到指定手机号
    sendCodeToPhone() {
        if(!this.sending) return
        register.sendCodeToPhone(this.params.mobile)
            .then(response => {
                this.sending = false //不可发送
                this.timeDown() //开始倒计时
            })
    },
    // 4.提交注册
    submitRegister() {
        register.registerUser(this.params)
            .then(response => {
                //提示注册成功
                this.$message({
                    type: 'success',
                    message: "注册成功"
                })
                this.$router.push({path: '/login'})
            })
    },
  },
}
</script>

<style>
.el-form-item__error {
  z-index: 9999999;
  font-size: 10px;
  color: red;
  text-align: left;
}
</style>