 <template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">
        <el-form-item
          class="input-prepend restyle"
          prop="mobile"
          :rules="[
            {
              required: true,
              message: '请输入手机号码',
              trigger: 'blur',
            },
            { validator: checkPhone, trigger: 'blur' },
          ]"
        >
          <div>
            <el-input type="text" placeholder="手机号" v-model="user.mobile" />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item
          class="input-prepend"
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <div>
            <el-input
              type="password"
              placeholder="密码"
              v-model="user.password"
            />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>

        <div class="btn">
          <input
            type="button"
            class="sign-in-button"
            value="登录"
            @click="submitLogin()"
          />
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li>
            <a
              id="weixin"
              class="weixin"
              target="_blank"
              href="http://localhost:8160/usr/wx/get/qr/code"
              ><i class="iconfont icon-weixin"
            /></a>
          </li>
          <li>
            <a id="qq" class="qq" target="_blank" href="#"
              ><i class="iconfont icon-qq"
            /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/sign.css";
import "~/assets/css/iconfont.css";

import cookie from "js-cookie";
import login from '@/api/login'

export default {
  layout: "sign",

  data() {
    return {
      user: {
        mobile: "",
        password: "",
      },
      loginInfo: {},
    };
  },

  methods: {
    // 1.检查手机号格式
    checkPhone(rule, value, callback) {
      //debugger
      if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error("手机号码格式不正确"));
      }
      return callback();
    },
    // 2.提交用户登录
    submitLogin() {
      login.loginUser(this.user)
        .then(response => {
          // 服务端响应的token字符串，放入cookie（名称, 值, 作用范围）
          cookie.set('token', response.data.data.token, {domain: 'localhost'})
          // 通过 token 获取用户信息，放入cookie
          login.getUserByToken()
            .then(response => {
              cookie.set('userInfo', JSON.stringify(response.data.data.userInfo), {domain: 'localhost'})
            })
          // 跳转首页
          this.$router.push({path: '/'})
        })
        .error(response => {
          this.$message({
            type: 'error',
            message: response.data.message,
          })
        })
    },
  },
};
</script>
<style>
.el-form-item__error {
  z-index: 9999999;
  font-size: 10px;
  color: red;
  text-align: left;
}
</style>