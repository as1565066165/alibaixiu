// 数据库操作
const mongoose = require('mongoose');
// 模型规则类
const { Schema } = mongoose;

// 对象规则验证
const Joi = require('joi');
// 文章模型规则
const PostSchema = new Schema({
	// 标题
	title: {
		type: String,
		minlength: 2,
		maxlength: 100,
		required: [true, '请输入文章标题']
	},
	// 作者
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	// 状态
	state: {
		type: Number,
		// 0 草稿 1 发布
		default: 0
	},
	// 创建时间
	createAt: {
		type: Date,
		default: Date.now
	},
	// 修改时间
	updateAt: {
		type: Date,
		default: Date.now
	},
	// 内容
	content: {
		type: String,
		default: null
	},
	// 缩略图
	thumbnail: {
		type: String,
		default: null
	},
	// 所属分类
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: [true, '分类信息不存在']
	},
	meta: {
		// 看过数量
		views: { type: Number, default: 0 },
		// 喜欢数量
		likes: { type: Number, default: 0 },
		// 评论数量
		comments: { type: Number, default: 0 }
	}
}, {versionKey: false});

const Post = mongoose.model('Post', PostSchema);

// 时间更新
PostSchema.pre('findOneAndUpdate', function(next) {
	this.findOneAndUpdate({}, { updateAt: Date.now() })
	next();
});

// 文章格式校验
const validatePost = post => {
	// 定义对象验证规则
	const schema = {
		title: Joi.string().min(2).max(100).required().error(new Error('文章标题不符合验证验证规则')),
		state: Joi.number().valid([0, 1]).default(0, 'draft').error(new Error('文章状态值非法')),
		thumbnail: Joi.any().empty(),
		content: Joi.string(),
		category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('分类id格式非法'))
	};
	// 验证
	return Joi.validate(post, schema, {
		// 检测到所有错误
		abortEarly: false,
		// 允许对象包含被忽略的未知键
		allowUnknown: true
	});
}

// 导出模块成员
module.exports = {
	Post,
	validatePost
};