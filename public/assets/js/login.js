// 获取邮箱元素
var emailInp = $('#email');
// 获取密码框元素
var passwordInp = $('#password');
// 给登录按钮添加点击事件
$('#loginBtn').on('click', function () {
    // 获取邮箱输入框内容
    var email = emailInp.val();
    // 获取密码框内容
    var password = passwordInp.val();
    // 如果邮箱内容为空提示用户输入邮箱地址
    if (email.trim().length == 0) {
        alert('请输入邮箱地址！');
        // 聚焦到邮箱输入框
        emailInp.focus();
        // 阻止程序向下执行
        return;
    }
    // 如果密码内容为空提示用户输入密码
    if (password.trim().length == 0) {
        alert('请输入密码！');
        // 聚焦到密码框
        passwordInp.focus();
        // 阻止程序向下执行
        return;
    }

    // 向服务器发送ajax请求
    $.post('/login', { email, password }, function (response) {
        // 如果用户是管理员
        if (response.role == 'admin') {
            // 请求成功重定向到数据管理页面
            location.href = '/admin/index.html';
        } else {
            // 如果是普通用户 跳转到文章首页
            location.href = '/index.html';
        }

    }).error(function () {
        // 请求失败 提示错误信息
        alert('用户名或密码错误，请重新输入！');
        // 聚焦到邮箱输入框
        emailInp.focus();
        // 清空输入内容
        emailInp.val('');
        passwordInp.val('');

    })
})