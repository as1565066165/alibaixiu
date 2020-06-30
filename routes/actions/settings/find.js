const { Setting } = require('../../../model/Setting');

module.exports = async (req, res) => {
	// 查询设置信息
	const settings = await Setting.find();
	// 响应 设置信息
	return res.send(settings[0]);
}