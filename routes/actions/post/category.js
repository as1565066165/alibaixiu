// 文章模块
const { Post } = require('../../../model/Post');

module.exports = async (req, res) => {
	// 获取分类id
	const id = req.params.id;
	// 查询文章信息
	const posts = await Post.find({ category: id }).populate('author', '-password').populate('category');
	// 响应
	res.send(posts);
}