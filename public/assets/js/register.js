// 验证邮箱地址格式和邮箱是否被注册
// 当邮箱输入框失去焦点时触发
$('#email').on('blur', checkEmail);


// 验证用户昵称是否符合格式
$('#nickName').on('blur', checkNickName);

// 当用户点击头像图片时
$('#file').on('change', function () {
    // 创建FormData对象
    var formData = new FormData();
    // 添加FormData属性
    formData.append('avatar', this.files[0]);
    // 向服务器端发送ajax请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数类型
        contentType: false,
        success: function (response) {
            // 选择图片时,页面中可以预览图片
            $('#preview').attr('src', response[0].avatar);
            // 在隐藏域
            $('#hiddenAvatar').val(response[0].avatar);

        }
    })

});

// 验证密码格式是否符合要求
$('#password').on('blur', checkPassword);

// 验证两次密码是否输入一致
$('#confirmPassword').on('blur', checkConfirmPassword);

// 当表单提交时调用
$('#registerForm').on('submit', function () {
    //  如果表单格式验证通过
    if (checkAll()) {
        //  获取表单内容
        var formData = $(this).serialize();

        // 向服务器发送请求  创建用户
        $.post('/users', formData, function (response) {
            location.href = '/admin/login.html';
        }).error(function (response) {
            var message = JSON.parse(response.responseText).message;
            alertTipsInfo(message, false);
        })

    }
    // 阻止表单的默认提交行为
    return false;
});

// 表单提交前检查所有的表单格式是否符合要求
function checkAll() {
    var emailFlag = checkEmail();
    var nickNameFlag = checkNickName();
    var passwordFlag = checkPassword();
    var confirmPasswordFlag = checkConfirmPassword();

    if (emailFlag && nickNameFlag && passwordFlag && confirmPasswordFlag) {
        alertTipsInfo('可以提交表单了', true);
        return true;

    } else {
        alertTipsInfo('任然有信息验证不通过', false);
        // 聚焦到验证失败的输入框
        if (!emailFlag) {
            $('#email').focus();
        } else if (!nickNameFlag) {
            $('#nickName').focus();
        } else if (passwordFlag) {
            $('#password').focus();
        } else {
            $('#confirmPassword').focus();
        }
        return false;
    }
};
// 验证邮箱地址格式和邮箱是否被注册
function checkEmail() {
    var flag = false;
    // 获取用户输入的邮箱地址
    var emailValue = $('#email').val();
    // 正则表达式 邮箱的验证规则
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // 测试用户输入的值是否符合邮箱格式
    if (!reg.test(emailValue)) {
        alertTipsInfo('请输入符合要求的邮箱地址', false);
        return flag = false;
    }
    // 向服务器发送同步ajax请求验证邮箱地址是否被注册
    $.ajax({
        type: 'get',
        url: '/users/email/' + emailValue,
        async: false,
        success: function (response) {
            alertTipsInfo(response.message, true);
            return flag = true;
        },
        error: function (response) {
            var message = JSON.parse(response.responseText).message;
            alertTipsInfo(message, false);
            return flag = false;
        }
    });
    // 同步ajax才能获得flag的值 异步会直接返回
    return flag;

}
// 验证用户昵称是否符合格式
function checkNickName() {
    // 获取用户输入的用户昵称
    var nickNameValue = $('#nickName').val();
    if (nickNameValue.trim().length < 2 || nickNameValue.trim().length > 20) {
        alertTipsInfo('用户昵称必须在2~20个字符之间', false);
        return false;
    } else {
        alertTipsInfo('用户名称格式符合要求', true);
        return true;
    }
};
// 验证密码格式是否符合要求
function checkPassword() {
    // 获取用户输入的密码
    var passwordValue = $('#password').val();
    // 密码的正则表达式
    var reg = /^[a-zA-Z0-9]{3,30}$/;
    // 测试用户输入的值是否符合密码格式
    if (!reg.test(passwordValue)) {
        alertTipsInfo('密码必须由3~30位大小写字母或数字构成', false);
        return false;
    } else {
        alertTipsInfo('密码格式符合要求', true);
        return true;
    }

}
// 验证两次密码是否输入一致方法
function checkConfirmPassword() {
    var confirmPwd = $('#confirmPassword').val();
    var pwd = $('#password').val();
    if (confirmPwd != pwd) {
        alertTipsInfo('两次密码输入不一致请重新输入', false);
        return false;
    } else {
        alertTipsInfo('两次密码比对成功', true);
        return true;
    }
}
// 输出提示信息
function alertTipsInfo(message, flag) {
    $('#info').html(message);
    $('#info').removeClass('alert-danger alert-success');
    if (flag) {
        $('#info').addClass('alert-success');
    } else {
        $('#info').addClass('alert-danger');
    }
    $('#info').show();
};