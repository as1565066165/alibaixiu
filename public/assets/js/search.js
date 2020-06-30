// 如果用户点击了点赞按钮
$('#listBox').on('click', '#like', function () {
    var id = $(this).attr('data-id');
    // 向服务器发送请求 点赞
    $.post('/posts/fabulous/' + id, function () {
        // 刷新页面
        location.reload();
    })
});

// 获取搜索参数
var key = getUrlParams('key');
// 向服务器发送请求 搜索文章
$.get('/posts/search/' + key, function (response) {
    // 利用模板引擎将服务器返回的数据与html进行拼接 返回值是一个字符串
    var html = template('searchTpl', { data: response });
    // 将拼接好的字符串渲染到页面中
    $('#listBox').html(html);
})