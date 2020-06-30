// 验证模块
const Joi = require('joi');
// 用户模块
const { User } = require('../../../model/User');
// 文件模块
const fs = require('fs');
// 路径处理
const path = require('path');
// 方法改造
const { promisify } = require('util');
// 删除文件
const unlink = promisify(fs.unlink);

module.exports = async (req, res) => {
	// 获取用户id
	const id = req.params['id'];
	// 验证模型
	const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id不符合格式'))
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
			if (error) return res.status(400).send({message: error.message});
		}
		// 通过验证
		for (const item of ids) {
			// 删除用户
			let user = await User.findByIdAndDelete(item);
			// 将删除的用户存储在数组中
			result.push(user);
			// 如果缩略图存在
			if (user.avatar) {
				// 删除缩略图
				await unlink(path.join(__dirname, '../', '../','../', 'public', user.avatar));
			}
		}
		// 响应
		res.send(result);

	} else {
		// 单个删除
		// 验证
		const { error } = Joi.validate(id, schema);
		// 数据格式没有通过验证
		if (error) return res.status(400).send({message: error.message});
		// 通过验证
		// 删除用户
		let user = await User.findByIdAndDelete(id);
		// 如果缩略图存在
		if (user.avatar) {
			// 删除缩略图
			await unlink(path.join(__dirname, '../', '../', '../', 'public', user.avatar));
		}
		// 响应
		res.send(user);
	}
	
};