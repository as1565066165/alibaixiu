const { User, validateLogin } = require('../../../model/User');
// hash密码
const bcrypt = require('bcryptjs');
// 工具
const _ = require('lodash');

module.exports = async (req, res) => {
	req.session.destroy(err => {
		if (err == null) {
			res.clearCookie('connect-sid');
			res.send({ message: '退出成功' });
		} else {
			res.send({ message: '退出失败' });
		}
	});
};
