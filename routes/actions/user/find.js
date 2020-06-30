// 用户模块
const { User } = require('../../../model/User');

module.exports = async (req, res) => {
	// 查询用户信息
	const users = await User.find().select('-password').sort('-createTime');
	// 响应
	res.send(users);
}