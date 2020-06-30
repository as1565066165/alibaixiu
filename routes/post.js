const post = require('express').Router();
// 添加文章信息
post.post('/', require('./actions/post/create'));
// 根据ID删除文章
post.delete('/:id', require('./actions/post/findByIdAndDelete'));
// 查询所有文章
post.get('/', require('./actions/post/find'));
// 查询文章数量
post.get('/count', require(('./actions/post/count')));
// 获取最新发布文章(按照发布时间排序)
post.get('/lasted', require('./actions/post/lasted'));
// 获取热门推荐(按钮评论数量排序)
post.get('/recommend', require('./actions/post/recommend'));
// 获取随机推荐
post.get('/random', require('./actions/post/random'));
// 文章点赞
post.post('/fabulous/:id', require('./actions/post/fabulous'))
// 根据分类获取文章列表
post.get('/category/:id', require('./actions/post/category'))
// 文章搜索
post.get('/search/:key', require('./actions/post/search'))
// 根据文章id获取文章信息
post.get('/:id', require('./actions/post/findById'));
// 根据ID修改文章
post.put('/:id', require('./actions/post/findByIdAndUpdate'));


module.exports = post;