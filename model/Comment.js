// 数据库操作
const mongoose = require('mongoose');
// 模型规则类
const { Schema } = mongoose;
// 对象规则验证
const Joi = require('joi');
// 文章模型规则
const CommentSchema = new Schema({
	// 评论人
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	// 评论内容
	content: {
		type: String,
		required: true
	},
	// 评论文章
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: [true, '评论文章id不存在']
	},
	// 状态
	state: {
		type: Number,
		// 0 未批准 1 批准
		default: 0
	},
	// 评论时间
	createAt: {
		type: Date,
		default: Date.now
	}
}, { versionKey: false });
// 创建分类集合
const Comment = mongoose.model('Comment', CommentSchema);

// 评论格式校验（路由级别）
const validateComment = comment => {
	// _id验证规则
	const objectIdReg = /^[0-9a-fA-F]{24}$/;
	// 定义对象验证规则
	const schema = {
		author: Joi.string().regex(objectIdReg).required().error(new Error('用户ID非法')),
		content: Joi.string().required().error(new Error('评论不符合格式要求')),
		post: Joi.string().regex(objectIdReg).required().error(new Error('评论文章ID非法')),
		state: Joi.number().valid(0, 1)
	};
	// 验证
	return Joi.validate(comment, schema, {
		// 检测到所有错误
		abortEarly: false,
		// 允许对象包含被忽略的未知键
		allowUnknown: true
	});
}

// Comment.find().then(async result => {
// 	if (result.length <= 12) {
// 		await Comment.create({
// 			author: '5ef6aa607bf23125909b0932',
// 			content: '走起！走起',
// 			post: '5ef812fb3c863641b80c4d07',
// 			state: 1
// 		})
// 	}
// })
// 导出模块成员
module.exports = {
	Comment,
	validateComment
}
