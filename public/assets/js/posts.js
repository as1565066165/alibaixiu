let saveFormData = '';
// 向服务器发送请求 查询文章信息
$.get('/posts', function (response) {
    // 利用模板引擎将服务器返回的数据与html进行拼接 返回的是一个字符串
    var html = template('postsTpl', response);
    // 渲染文章列表页面
    $('#postsBox').html(html);
    // 利用模板引擎将服务器返回的数据与html进行拼接 返回的是一个字符串
    var page = template('pageTpl', response);
    // 渲染分页页面
    $('#page').html(page);
});



// 分页
function changePage(page) {
    // 向服务器发送请求 查询文章信息
    if (saveFormData) {
        var formData = saveFormData + '&page=' + page;
    } else {
        formData = 'page=' + page;
    }

    $.get('/posts', formData, function (response) {
        // 利用模板引擎将服务器返回的数据与html进行拼接 返回的是一个字符串
        var html = template('postsTpl', response);
        // 渲染文章列表页面
        $('#postsBox').html(html);
        // 利用模板引擎将服务器返回的数据与html进行拼接 返回的是一个字符串
        var page = template('pageTpl', response);
        // 渲染分页页面
        $('#page').html(page);
    });
}

// 向服务器发送请求索要拼接数据
$.get('/categories', function (response) {
    // 利用模板引擎将服务器返回的数据与html进行拼接 返回的是一个字符串
    var html = template('categoryTpl', { data: response });
    // 渲染分页下拉框
    $('#categoryBox').html(html);
});

// 当用户对文章列表页面进行筛选的时候
$('#filterForm').on('submit', function () {
    // 获取用户选择的筛选方式
    var formData = $(this).serialize();
    saveFormData = formData;
    // 向服务器发送请求 查询文章信息
    $.get('/posts', formData, function (response) {
        // 利用模板引擎将服务器返回的数据与html进行拼接 返回的是一个字符串
        var html = template('postsTpl', response);
        // 渲染文章列表页面
        $('#postsBox').html(html);
        // 利用模板引擎将服务器返回的数据与html进行拼接 返回的是一个字符串
        var page = template('pageTpl', response);
        // 渲染分页页面
        $('#page').html(page);
    });
    // 阻止表单的默认提交事件
    return false;
});

// 事件委派 当用户点击了删除按钮时触发
$('#postsBox').on('click', '.delete', function () {
    // 弹出删除提示框 防止误触删除按钮
    if (confirm('您确定要删除这一篇文章吗？')) {
        // 获取删除文章id
        var id = $(this).attr('data-id');
        // 向服务器发送请求 删除文章
        $.ajax({
            type: 'delete',
            url: `/posts/${id}`,
            success: function () {
                // 刷新页面
                location.reload();
            }
        });
    }
});