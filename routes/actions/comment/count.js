const { Comment } = require('../../../model/Comment');

module.exports = async (req, res) => {
	// 查询所有评论数量
	const commentCount = await Comment.countDocuments();
	// 查询未批准评论数量
	const draftCount = await Comment.countDocuments({ state: 0 });
	// 响应
	res.send({ commentCount, draftCount });
}