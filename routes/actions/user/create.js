const { User, validateUser } = require('../../../model/User');
// hash密码
const bcrypt = require('bcryptjs');
// 工具
const _ = require('lodash');

module.exports = async (req, res) => {
	// 数据格式校验
	const { error } = validateUser(req.fields);
	// 格式不符合要求
	if (error) return res.status(400).send({ message: error.message });
	// 格式符合要求 继续向下执行
	// 查询用户
	let user = await User.findOne({ email: req.fields.email });
	// 用户已存在
	if (user) return res.status(400).send({ message: '邮箱已经被注册' });
	// 用户不存在 可以正常执行注册流程
	// 生成盐
	const salt = await bcrypt.genSalt(10);
	// 使用盐对密码进行加密
	req.fields.password = await bcrypt.hash(req.fields.password, salt);
	// 创建用户
	user = new User(req.fields);
	// 保存用户
	await user.save();
	// 响应
	res.send(_.pick(user, ['_id', 'email', 'nickName', 'role', 'avatar', 'createTime', 'status']));
};