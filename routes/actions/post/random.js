// 文章模块
const { Post } = require('../../../model/Post');
require('mongoose-query-random');

module.exports = async (req, res) => {
	// 查询文章信息 // .select('-content') {state:1}
	Post.find().random(5, true, (err, docs) => {
		res.send(docs)
	})
}