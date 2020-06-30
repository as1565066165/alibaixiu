// 文章模型
const { Post, validatePost } = require('../../../model/Post');

module.exports = async (req, res) => {
	// 数据格式校验
	const { error } = validatePost(req.fields);
	// 格式不符合要求
	if (error) return res.status(400).send({ message: error.details });
	// 添加作者
	req.fields.author = req.session.userInfo._id;
	// 创建分类
	const post = new Post(req.fields);
	// 保存分类
	await post.save();
	// 响应
	res.send(post);
}