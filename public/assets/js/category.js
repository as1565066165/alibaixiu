// 当用户在提交表单时触发
$('#addCategory').on('submit', function () {
    // 获取用户输入的表单信息
    var formData = $(this).serialize();
    // 向服务器发送请求 增加分类信息
    $.post('/categories', formData, function () {
        // 刷新页面
        location.reload();
    })
    // 阻止表单的默认提交事件
    return false;
});

// 向服务器发送请求 查询分类信息
$.get('/categories', function (response) {
    // 使用模板引擎将服务器返回的数据和html拼接成字符串
    var html = template('categoryListTpl', { data: response });
    // 将拼接好的字符串渲染到页面中
    $('#categoryBox').html(html);
});

// 事件委派 给编辑按钮添加委派事件
$('#categoryBox').on('click', '.edit', function () {
    // 获取要编辑的分类id
    var id = $(this).attr('data-id');
    // 根据id向服务器发送请求 查询要编辑的分类信息
    $.get(`/categories/${id}`, function (response) {
        // 使用模板引擎将服务器返回的数据和html拼接成字符串
        var html = template('modifyCategoryTpl', response);
        // 将拼接好的字符串渲染到页面中
        $('#formBox').html(html);
    })

});

// 当管理员发送修改表单的提交行为时
$('#formBox').on('submit', '#modifyCategory', function () {
    // 获取当前分类的id
    var id = $(this).attr('data-id');
    // 获取管理员修改的分类信息
    var formData = $(this).serialize();
    // 向服务器端发送修改请求
    $.ajax({
        type: 'put',
        url: `/categories/${id}`,
        data: formData,
        success: function () {
            // 刷新页面
            location.reload();
        }
    });
    // 阻止表单的默认提交行为
    return false;
});

// 事件委托 给删除按钮添加点击事件
$('#categoryBox').on('click', '.delete', function () {
    if (confirm('您真的要删除这个分类吗？')) {
        // 获取要删除的分类信息的id
        var id = $(this).siblings().attr('data-id');
        // 向服务器端发送请求 删除此id的分类信息
        $.ajax({
            type: 'delete',
            url: `/categories/${id}`,
            success: function () {
                // 刷新页面
                location.reload();
            }
        });
    }
});

// 获取分类全选按钮
var selectAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany');

// 当分类全选按钮状态发生改变时
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
    // 获取所有的分类并将所有的分类的状态和全选按钮保持一致
    $('#categoryBox').find('.categoryStatus').prop('checked', status);
});

// 事件委托 当分类前面的复选框按钮状态发生改变时
$('#categoryBox').on('change', '.categoryStatus', function () {
    // 获取分类前面所有的复选框按钮
    var inputs = $('#categoryBox').find('.categoryStatus');

    if (inputs.filter(':checked').length > 0) {
        // 如果分类前面有复选框按钮被选中 显示批量删除按钮
        deleteMany.show();
    } else {
        // 如果分类前面没有复选框按钮被选中 隐藏批量删除按钮
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
    // 存储分类id的数组
    var ids = [];
    // 获取所有复选框选中的分类
    var checkedCategories = $('.categoryStatus').filter(':checked');

    checkedCategories.each(function (index, element) {
        ids.push($(element).attr('data-id'));
    });
    // 进行确认提示
    if (confirm('您真的要批量删除这些分类吗？')) {
        // 向服务器发送批量删除分类请求
        $.ajax({
            type: 'delete',
            url: `/categories/${ids.join('-')}`,
            success: function () {
                // 刷新页面
                location.reload();
            }
        })
    }



})