const { Post } = require('../../../model/Post');

module.exports = async (req, res) => {
	// 查询所有文章数量
	const postCount = await Post.countDocuments();
	// 查询草稿数量
	const draftCount = await Post.countDocuments({ state: 0 });
	// 响应
	res.send({ postCount, draftCount });
}