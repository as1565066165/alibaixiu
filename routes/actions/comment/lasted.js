// 评论模块
const { Comment } = require('../../../model/Comment');

module.exports = async (req, res) => {
	// 查询最新评论信息
	const posts = await Comment.find({ 'state': 1 }).populate('author', '-password').sort('-createAt').limit(5)
	// 响应
	res.send(posts);
}