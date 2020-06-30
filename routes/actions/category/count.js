const { Category } = require('../../../model/Category');

module.exports = async (req, res) => {
	// 查询所有分类数量
	const categoryCount = await Category.countDocuments();
	// 响应
	res.send({ categoryCount });
}