// 数据库操作
const mongoose = require('mongoose');
// 模型规则类
const { Schema } = mongoose;
// 对象规则验证
const Joi = require('joi');

// 用户集合规则
const SlideSchema = new Schema({
	// 标题
	title: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 30
	},
	// 头像
	image: {
		type: String,
		required: true,
		default: null
	},
	link: {
		type: String,
		default: null
	}
}, {versionKey: false});

// 用户集合类
const Slide = mongoose.model('Slide', SlideSchema);

// 注册数据格式校验
const validateSlide = slide => {
	// 定义对象验证规则
	const schema = {
		title: Joi.string().min(2).max(30).required().error(new Error('标题不符合验证规则'))
	};
	// 验证
	return Joi.validate(slide, schema, {
		// 检测到所有错误
		abortEarly: false,
		// 允许对象包含被忽略的未知键
		allowUnknown: true
	});
}

// 导出对象
module.exports = {
	Slide,
	validateSlide
};