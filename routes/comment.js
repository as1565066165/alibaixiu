// 文章评论路由
const comment = require('express').Router();

// 添加评论
comment.post('/', require('./actions/comment/create'));
// 根据id删除
comment.delete('/:id', require('./actions/comment/findByIdAndDelete'));
// 获取评论列表
comment.get('/', require('./actions/comment/find'));
// 获取评论数量
comment.get('/count', require('./actions/comment/count'));
// 获取最新评论
comment.get('/lasted', require('./actions/comment/lasted'));
// 更改评论状态
comment.put('/:id', require('./actions/comment/findByIdAndUpdate'))

// 导出路由
module.exports = comment;