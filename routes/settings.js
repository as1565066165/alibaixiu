// 用户路由
const settings = require('express').Router();

// 添加网站设置
settings.post('/', require('./actions/settings/create'));
// 获取网站配置
settings.get('/', require('./actions/settings/find'))

// 导出路由
module.exports = settings;