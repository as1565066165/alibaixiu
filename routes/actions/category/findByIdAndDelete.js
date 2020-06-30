// 验证模块
const Joi = require('joi');
// 分类模块
const { Category } = require('../../../model/Category');
// 文章模块
const { Post } = require('../../../model/Post');

module.exports = async (req, res) => {
	// 获取分类id
	const id = req.params['id'];
	// 验证模型
	const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('分类id不符合格式'))
	// 如果id中存在-
	if (id.indexOf('-') != -1) {
		// 批量删除
		// 将字符串id分割为数组
		const ids = id.split('-');
		// 存储结果数组
		const result = [];
		// 验证
		for (const item of ids) {
			// 验证
			let { error } = Joi.validate(item, schema);
			// 数据格式没有通过验证
			if (error) return res.status(400).send({ message: error.message });
		}
		// 通过验证
		for (const item of ids) {
			// 删除分类
			let category = await Category.findByIdAndDelete(item);
			// 将删除的分类存储在数组中
			result.push(category);
		}
		// 响应
		res.send(result);
	} else {
		// 单个删除
		// 验证
		const { error } = Joi.validate(id, schema)
		// 数据格式没有通过验证
		if (error) return res.status(400).send({ message: error.message });
		// 通过验证
		// 删除分类
		let category = await Category.findByIdAndDelete(id);
		// 删除分类下面的文章
		let post = await Post.deleteMany({ category: id });
		// 响应
		res.send(category);
	}

};








