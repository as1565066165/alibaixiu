// 文章分类路由
const category = require('express').Router();

// 添加分类
category.post('/', require('./actions/category/create'));
// 根据分类ID删除分类信息
category.delete('/:id', require('./actions/category/findByIdAndDelete'));
// 查询所有分类
category.get('/', require('./actions/category/find'));
// 查询分类数量
category.get('/count', require('./actions/category/count'));
// 根据分类ID修改分类信息
category.put('/:id', require('./actions/category/findByIdAndUpdate'));
// 根据分类ID查询分类信息
category.get('/:id', require('./actions/category/findById'));

module.exports = category;