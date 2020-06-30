// 验证模块
const Joi = require('joi');
// 轮播图模块
const { Slide } = require('../../../model/Slide');
// 文件模块
const fs = require('fs');
// 路径处理
const path = require('path');
// 方法改造
const { promisify } = require('util');
// 删除文件
const unlink = promisify(fs.unlink);

module.exports = async (req, res) => {
	// 获取轮播id
	const id = req.params['id'];
	// 验证模型
	const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('轮播图id不符合格式'))
	// 验证
	const { error } = Joi.validate(id, schema);
	// 数据格式没有通过验证
	if (error) return res.status(400).send({ message: error.message });
	// 通过验证
	// 删除轮播图
	let slide = await Slide.findByIdAndDelete(id);
	// 如果缩略图存在
	if (slide.image) {
		// 删除缩略图
		await unlink(path.join(__dirname, '../', '../', '../', 'public', slide.image));
	}
	// 响应
	res.send(slide);
};