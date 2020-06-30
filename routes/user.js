// 用户路由
const user = require('express').Router();

// 创建用户
user.post('/', require('./actions/user/create'));
// 查询所有用户信息
user.get('/', require('./actions/user/find'));
// 登录用户密码修改
user.put('/password', require('./actions/user/password'));
// 根据id删除用户信息
user.delete('/:id', require('./actions/user/findByIdAndDelete'));
// 根据id修改用户信息
user.put('/:id', require('./actions/user/findByIdAndUpdate'));
// 根据用户id查询用户信息
user.get('/:id', require('./actions/user/findById'));
// 根据用户邮箱查询用户信息
user.get('/email/:email', require('./actions/user/findByEmail'));

// 导出路由
module.exports = user;
