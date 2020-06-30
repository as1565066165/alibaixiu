$('#modifyForm').on('submit', function () {
    // 获取表单的内容并转换为对应的字符串
    var formData = $(this).serialize();

    // 向服务器端发送请求 修改密码
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function (response) {
            // 输出密码修改成功的提示信息
            alert(response.message);

            // 重定向到用户登录页面
            location.href = '/admin/login.html';
        },
        error: function (response) {
            alert(JSON.parse(response.responseText).message);

        }
    });
    // 阻止表单的默认提交事件
    return false;
});