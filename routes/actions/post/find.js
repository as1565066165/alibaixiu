// 用户模块
const { Post, validatePost } = require('../../../model/Post');
// 分页
const pagination = require('mongoose-sex-page');
// 工具
const _ = require('lodash');

module.exports = async (req, res) => {
	// 当前页
	let page = +req.query.page;
	// 如果页码没有传递
	if (!page || !_.isNumber(page)) page = 1;
	// 查询条件
	let condition = {};
	// 分类条件
	if (req.query.category != undefined) {
		if (req.query.category != '') condition.category = req.query.category;
	}
	// 状态条件
	if (req.query.state != undefined) {
		if (req.query.state != '') condition.state = req.query.state;
	}
	// 显示查询条件
	// console.log(condition)
	// 查询文章信息
	const posts = await pagination(Post).page(page).size(10).display(5).find(condition).populate('author', '-password').populate('category').select('-content -meta').exec();
	// 响应
	res.send(posts);
}