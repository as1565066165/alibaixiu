// 验证模块
const Joi = require('joi');
// 文章模块
const { Post } = require('../../../model/Post');

module.exports = async (req, res) => {
	// 要修改的文章id
	const id = req.params.id;
	// 验证id格式
	if (!/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).send({ message: '文章ID不合法' })
	// 通过验证
	let post = await Post.findByIdAndUpdate(id, { $set: req.fields }, { new: true });
	// 响应
	res.send(post);
}