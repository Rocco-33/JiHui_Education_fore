'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  // BASE_API: '"http://192.168.200.130:9001"', //linux下的nginx服务器
  BASE_API: '"http://localhost:9002"', //本地的网关服务
  OSS_PATH: '"https://project-jihui-resource-static20230706.oss-cn-fuzhou.aliyuncs.com"', //OSS服务器
})
