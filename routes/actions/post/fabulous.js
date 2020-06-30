// 用户模块
const { Post } = require('../../../model/Post');

module.exports = async (req, res) => {
	// 获取文章id
	const id = req.params.id;
	// 查询文章信息
	const post = await Post.findOne({ _id: id }).select('meta');
	// 赞数量+1
	post.meta.likes = post.meta.likes + 1;
	// 保存
	await post.save();
	// 响应
	res.send(post);
}