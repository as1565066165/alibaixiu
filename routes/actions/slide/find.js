const { Slide } = require('../../../model/Slide');

module.exports = async (req, res) => {
	// 查找
	let slides = await Slide.find();
	// 响应
	res.send(slides);
};