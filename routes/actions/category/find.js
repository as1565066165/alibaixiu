// 分类模块
const { Category, validateCategory } = require('../../../model/Category');

module.exports = async (req, res) => {
	// 查询分类信息
	const category = await Category.find();
	// 响应 文章分类存在
	return res.send(category);

}