// 数据库操作
const mongoose = require('mongoose');
// 模型规则类
const { Schema } = mongoose;
// 对象规则验证
const Joi = require('joi');
// 文章模型规则
const CategorySchema = new Schema({
	// 分类名称
	title: {
		type: String,
		minlength: 2,
		maxlength: 30,
		required: true,
		unique: true
	},
	// 分类类名
	className: {
		type: String,
		default: null
	},
	// 创建时间
	createAt: {
		type: Date,
		default: Date.now
	}
}, {versionKey: false});

// 创建分类集合
const Category = mongoose.model('Category', CategorySchema);

// 文章分类格式校验（路由级别）
const validateCategory = category => {
	// 定义对象验证规则
	const schema = {
		title: Joi.string().min(2).max(30).required().error(new Error('分类名称不符合验证验证规则')),
		createAt: Joi.date().default(Date.now, 'created time'),
		className: Joi.string().required().error(new Error('请填写分类图标类名')),
	};
	// 验证
	return Joi.validate(category, schema, {
		// 检测到所有错误
		abortEarly: false,
		// 允许对象包含被忽略的未知键
		allowUnknown: true
	});
}

// 导出模块成员
module.exports = {
	Category,
	validateCategory
}
