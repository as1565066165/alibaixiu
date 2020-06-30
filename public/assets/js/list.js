// 获取地址栏中的categoryId参数
var categoryId = getUrlParams('categoryId');

// 向服务器发送请求 根据分类获取文章信息
$.get('/posts/category/' + categoryId, function (response) {
    var html = template('listTpl', { data: response });
    $('#listBox').html(html);
});

// 向服务器发送请求 根据id查询分类
$.get('/categories/' + categoryId, function (response) {
    // 将查询出来的title赋值给分类标题
    $('#categoryTitle').html(response.title);
});

// 如果用户点击了点赞按钮
$('#listBox').on('click', '#like', function () {
    var id = $(this).attr('data-id');
    // 向服务器发送请求 点赞
    $.post('/posts/fabulous/' + id, function () {
        // 刷新页面
        location.reload();
    })
})