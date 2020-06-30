// 用户路由
const slide = require('express').Router();

// 添加轮播图片
slide.post('/', require('./actions/slide/create'));
// 根据id删除轮播图片
slide.delete('/:id', require('./actions/slide/findByIdAndDelete'));
// 获取轮播图
slide.get('/', require('./actions/slide/find'))

// 导出路由
module.exports = slide;