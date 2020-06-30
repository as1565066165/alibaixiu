// 向服务器发送请求  获取评论列表信息
$.get('/comments', function (response) {
    // 利用模板引擎将服务器返回的数据和html进行拼接 返回值是一个字符串
    var html = template('commentsTpl', response);
    // 将拼接好的字符串渲染到页面当中
    $('#commentsBox').html(html);
    // 利用模板引擎将服务器返回的数据和html进行拼接 返回值是一个字符串
    var pageHtml = template('pageTpl', response);
    // 将拼接好的字符串渲染到页面当中
    $('#pageBox').html(pageHtml);
});

// 分页函数
function changePage(page) {
    // 向服务器发送请求  获取分页评论列表信息
    $.get('/comments', { page }, function (response) {
        // 利用模板引擎将服务器返回的数据和html进行拼接 返回值是一个字符串
        var html = template('commentsTpl', response);
        // 将拼接好的字符串渲染到页面当中
        $('#commentsBox').html(html);
        // 利用模板引擎将服务器返回的数据和html进行拼接 返回值是一个字符串
        var pageHtml = template('pageTpl', response);
        // 将拼接好的字符串渲染到页面当中
        $('#pageBox').html(pageHtml);
    });
};

// 事件委托 当点击了批准或者驳回按钮时触发
$('#commentsBox').on('click', '.state', function () {
    // 获取要修改的评论状态
    var state = $(this).attr('data-state');
    // 获取要修改的评论id
    var id = $(this).attr('data-id');
    // 向服务器发送请求 修改评论状态
    $.ajax({
        type: 'put',
        url: `/comments/${id}`,
        data: { state: state == 0 ? 1 : 0 },
        success: function () {
            // 刷新页面
            location.reload();
        }
    });
});

// 事件委托 当点击了删除评论按钮时触发
$('#commentsBox').on('click', '.delete', function () {
    // 提示确认删除提示框 防止用户误触删除按钮
    if (confirm('您确定要删除该评论吗？')) {
        // 获取要删除的评论id
        var id = $(this).siblings().attr('data-id');
        // 向服务器发送请求  删除评论
        $.ajax({
            type: 'delete',
            url: `/comments/${id}`,
            success: function () {
                // 刷新页面
                location.reload();
            }
        });
    }


});