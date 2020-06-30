// 分类模型
const { Category, validateCategory } = require('../../../model/Category');
// 工具
const _ = require('lodash');

module.exports = async (req, res) => {
	// 数据格式校验
	const { error } = validateCategory(req.fields);
	// 格式不符合要求
	if (error) return res.status(400).send({message: error.message});
	// 查询分类
	let category = await Category.findOne({title: req.fields.title});
	// 分类已存在
	if (category) return res.status(400).send({message: '分类已经存在'});
	
	// 创建分类对象
	category = new Category(req.fields);
	// 保存分类
	await category.save();
	// 响应
	res.send(category);
};
