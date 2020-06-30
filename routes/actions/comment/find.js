// 评论模块
const { Comment } = require('../../../model/Comment');
// 分页
const pagination = require('mongoose-sex-page');
// 工具
const _ = require('lodash');

module.exports = async (req, res) => {
	// 当前页
	let page = +req.query.page;
	// 获取文章id
	let pId = req.query.pId;
	// 如果页码没有传递
	if (!page || !_.isNumber(page)) page = 1;
	// 根据文章id获取评论信息
	if (pId) {
		const posts = await Comment.find({ 'post': pId, 'state': 1 }).populate('author', '-password').populate('post', '-content -meta');
		res.send(posts);
		return;
	}
	// 查询评论信息
	const posts = await pagination(Comment).page(page).size(10).display(5).populate('author', '-password').populate('post', '-content -meta').exec();
	// 响应
	res.send(posts);
}