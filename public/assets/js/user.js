// 当表单发生提交事件时
$('#userForm').on('submit', function () {
    // 获取用户在表单输入的内容并转换为参数字符串的形式
    var formData = $(this).serialize();
    // 向服务器发送添加用户请求
    $.post('/users', formData, function () {
        // 重新刷新当前页面
        location.reload();
    }).error(function () {
        alert('用户添加失败');
    })
    // 阻止表单的默认行为
    return false;
});

// 当用户点击头像图片时
$('#modifyBox').on('change', '#avatar', function () {
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

// 向服务器发送请求   获取列表页数据
$.get('/users', function (response) {
    // 使用模板引擎将数据和字符串进行拼接 返回的是一个字符串
    var html = template('userTpl', { data: response });
    // 将拼接好的字符串渲染到页面中
    $('#userBox').html(html);

});

// 事件委派  当用户点击编辑按钮时
$('#userBox').on('click', '.edit', function () {
    // 从自定义属性中获取用户id 
    var id = $(this).attr('data-id');
    // 向服务器发送请求 修改用户信息
    $.get(`/users/${id}`, function (response) {
        // 使用模板引擎将数据和字符串进行拼接 返回的是一个字符串
        var html = template('modifyTpl', response);
        // 将拼接好的字符串渲染到页面中
        $('#modifyBox').html(html);

    })
});

//事件委派 当修改表单提交时
$('#modifyBox').on('submit', '#modifyForm', function () {
    // 获取表单中的内容并转换为参数字符串的形式
    var formData = $(this).serialize();
    // 获取用户id
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: `/users/${id}`,
        data: formData,
        success: function () {
            // 刷新页面
            location.reload();
        }
    })

    // 阻止表单的默认提交事件
    return false;
});

// 事件委派 删除用户
$('#userBox').on('click', '.delete', function () {
    if (confirm('您确定要删除该用户吗？')) {
        // 获取用户id
        var id = $(this).siblings().attr('data-id');
        // 向服务器请求删除此id的用户信息
        $.ajax({
            type: 'delete',
            url: `/users/${id}`,
            success: function () {
                // 刷新页面
                location.reload();
            }
        })
    }

});

// 获取用户全选按钮
var selectAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany');

// 当用户全选按钮状态发生改变时
selectAll.on('change', function () {
    // 获取全选按钮的状态
    var status = $(this).prop('checked');
    if (status) {
        // 如果全选按钮被选中 显示批量删除按钮
        deleteMany.show();
    } else {
        // 如果全选框没有被选中 隐藏批量删除按钮
        deleteMany.hide();
    }
    // 获取所有的用户并将所有的用户的状态和全选按钮保持一致
    $('#userBox').find('.userStatus').prop('checked', status);
});

// 事件委托 当用户前面的复选框按钮状态发生改变时
$('#userBox').on('change', '.userStatus', function () {
    // 获取用户前面所有的复选框按钮
    var inputs = $('#userBox').find('.userStatus');

    if (inputs.filter(':checked').length > 0) {
        // 如果用户前面有复选框按钮被选中 显示批量删除按钮
        deleteMany.show();
    } else {
        // 如果用户前面没有复选框按钮被选中 隐藏批量删除按钮
        deleteMany.hide();
    }

    // 如果选中的复选框按钮个数等于所有复选框按钮的个数
    if (inputs.length == inputs.filter(':checked').length) {
        // 让全选框处于选中状态
        selectAll.prop('checked', true);
    } else {
        // 让全选框处于未选中状态
        selectAll.prop('checked', false);
    }
});

// 批量删除按钮的点击事件
deleteMany.on('click', function () {
    // 存储用户id的数组
    var ids = [];
    // 获取所有复选框选中的用户
    var checkedUsers = $('.userStatus').filter(':checked');

    checkedUsers.each(function (index, element) {
        ids.push($(element).attr('data-id'));
    });
    // 进行确认提示
    if (confirm('您真的要批量删除这些用户吗？')) {
        // 向服务器发送批量删除用户请求
        $.ajax({
            type: 'delete',
            url: `/users/${ids.join('-')}`,
            success: function () {
                // 刷新页面
                location.reload();
            }
        })
    }



})


