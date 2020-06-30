// 路由集合
module.exports = app => {
	// 用户
	app.use('/users', require('./user'));
	// 分类
	app.use('/categories', require('./category'));
	// 文章
	app.use('/posts', require('./post'));
	// 评论
	app.use('/comments', require('./comment'));
	// 轮播图
	app.use('/slides', require('./slide'));
	// 网站设置
	app.use('/settings', require('./settings'));

	// 其他
	// 用户登录
	app.post('/login', require('./actions/other/login'));
	// 用户退出
	app.post('/logout', require('./actions/other/logout'));
	// 判断用户是否登录
	app.get('/login/status', require('./actions/other/loginStatus'))
	// 图片文件上传
	app.post('/upload', require('./actions/other/upload'));
};