// 验证模块
const Joi = require('joi');
// 用户模块
const { User } = require('../../../model/User');

module.exports = async (req, res) => {
    // 获取用户email
    const email = req.params['email'];
    // 验证模型
    const schema = Joi.string().required().regex(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).error(new Error('用户邮箱不符合格式'));
    // 验证
    const { error } = Joi.validate(email, schema)
    // 数据格式没有通过验证
    if (error) return res.status(400).send({ message: error.message });
    // 通过验证
    // 查询用户信息
    const user = await User.findOne({ email }).select('-password');
    if (user) {
        // 响应
        return res.status(400).send({ message: '邮箱地址已经被注册' });
    } else {
        // 响应
        return res.send({ message: '邮箱地址可用' });
    }


};