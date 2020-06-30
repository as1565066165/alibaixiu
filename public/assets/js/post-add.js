// 获取文章的所属分类数据
$.get('/categories', function (response) {
    // 使用模板引擎将数据和字符串进行拼接 返回的是一个字符串
    var html = template('categoryTpl', { data: response });
    // 将拼接好的字符串渲染到页面中
    $('#category').html(html);
});

// 当管理员选择文件时 触发事件
$('#feature').on('change', function () {
    // 创建FormData对象 上传二进制文件
    var formData = new FormData();
    // 添加上传文件
    formData.append('cover', this.files[0]);
    // 向服务器发送请求 上传文件
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要处理data数据
        processData: false,
        // 告诉$.ajax方法不要设置参数类型
        contentType: false,
        success: function (response) {
            $('#thumbnail').val(response[0].cover);
        }
    });
});

// 当管理员点击了文章发布按钮 触发事件
$('#addForm').on('submit', function () {
    // 获取文章表单输入内容
    var formData = $(this).serialize();

    // 向服务器发送请求 添加文章信息
    $.post('/posts', formData, function () {
        // 跳转到文章列表页面
        location.href = '/admin/posts.html';
    })

    // 阻止表单的默认提交事件
    return false;
});

// 获取浏览器地址栏的id参数
let id = getUrlParams('id');
// 当前是管理员做修改文章操作
if (id != -1) {
    // 根据id获取文章的详细信息
    $.get(`/posts/${id}`, function (response) {
        // 获取文章的所属分类数据
        $.get('/categories', function (categories) {
            response.categories = categories;
            var html = template('modifyTpl', response);
            $('#parentBox').html(html);
        });


    })
}
// 事件委派 当修改文章表单提交时触发
$('#parentBox').on('submit', '#modifyForm', function () {
    // 获取管理员修改的表单详细信息
    var formData = $(this).serialize();
    $.ajax({
        type: 'put',
        url: `/posts/${id}`,
        data: formData,
        success: function () {
            // 修改成功 重定向文章列表页面
            location.href = '/admin/posts.html';
        }
    })
    // 阻止表单的默认提交事件
    return false;

})

// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    for (var i = 0; i < paramsAry.length; i++) {
        var temp = paramsAry[i].split('=');
        if (temp[0] == name) {
            return temp[1];
        };
        return -1;
    }

}