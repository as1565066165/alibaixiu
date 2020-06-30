const { Slide, validateSlide } = require('../../../model/Slide');

module.exports = async (req, res) => {
	// 数据格式校验
	const { error } = validateSlide(req.fields);
	// 格式不符合要求
	if (error) return res.status(400).send({ message: error.message });
	// 格式符合要求 继续向下执行
	// 创建轮播图
	let slide = new Slide(req.fields);
	// 保存轮播图
	await slide.save();
	// 响应
	res.send(slide);
};