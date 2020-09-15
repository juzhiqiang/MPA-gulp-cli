/*
 * @Author: null
 * @Email: 3027704690@qq.com
 * @Date: 2020-09-11 17:55:12
 * @LastEditors: null
 * @LastEditTime: 2020-09-15 14:42:08
 * @Description: 启动文件
 * @form: (0 U 0)
 */
const config = {}

exports.dev = require('./dev')(config);
exports.build = require('./build');