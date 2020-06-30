const { User } = require('../../../model/User');
// hash密码
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
	// 判断用户是否处于登录状态
	if (req.session.userInfo) {
		// 原始正确密码
		const originPass = req.session.userInfo.password;
		// 用户id
		const _id = req.session.userInfo._id;
		// 获取新密码以及确认密码
		const { userPass, newPass, confirmPass } = req.fields;
		// 如果用户输入的密码和原始密码一致
		if (await bcrypt.compare(userPass, originPass)) {
			// 如果用户输入的两次密码相同
			if (newPass == confirmPass) {
				// 更新密码
				// 生成盐
				const salt = await bcrypt.genSalt(10);
				const finalPass = await bcrypt.hash(newPass, salt);
				let user = await User.findByIdAndUpdate(_id, { $set: { password: finalPass } })
				req.session.userInfo = null;
				res.status(200).send({ message: '密码修改成功' });
			} else {
				res.status(400).send({ message: '两次新密码输入的不相同' });
			}
		} else {
			res.status(400).send({ message: '原始密码输入错误' })
		}
	} else {
		res.status(400).send({ message: '请登录' });
	}

};