// 验证模块
const Joi = require('joi');
// 分类模块
const { Category, validateCategory } = require('../../../model/Category');

module.exports = async (req, res) => {
	// 待修改分类id
	req.fields._id = req.params['id'];
	console.log()
	// 定义对象验证规则
	const schema = {
		_id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id非法'))
	};
	// 验证yong
	const { error } = Joi.validate(req.fields, schema, {
		// 允许对象包含被忽略的未知键
		allowUnknown: true
	});
	// 数据格式没有通过验证
	if (error) return res.status(400).send({ message: error.message });
	// 通过验证
	// 更新分类信息
	let category = await Category.findByIdAndUpdate(req.fields._id, { $set: req.fields }, { new: true });
	// 响应
	res.send(category);

}