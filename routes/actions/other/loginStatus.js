// 登录状态的判断
module.exports = async (req, res) => {
	if (req.session && req.session.userInfo && req.session.userInfo.role == 'admin') {
		const s = `var isLogin = true; var userId=\"${req.session.userInfo._id}\"`
		res.send(s)
	} else {
		res.send('var isLogin = false')
	}
};
