// 当管理员选择文件时触发
$('#file').on('change', function () {
    // 获取选择的文件信息 
    var file = this.files[0];
    // 创建FormData对象
    var formData = new FormData();
    // 将管理员选择的文件添加到FormData对象中
    formData.append('image', file);
    // 向服务器发送请求实现文件上传功能
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#image').val(response[0].image);

        }
    });
})

// 当管理员提交slides表单时触发
$('#slidesForm').on('submit', function () {
    // 获取管理员输入的表单信息
    var formData = $(this).serialize();
    // 向服务器发送请求 添加slides数据
    $.post('/slides', formData, function () {
        // 刷新页面
        location.reload();
    })
    // 阻止表单的默认提交行为
    return false;
})

// 向服务器发送请求 查询slides列表页面
$.get('/slides', function (response) {
    // 利用模板引擎将服务器返回的数据和html进行拼接 返回值是一个字符串
    var html = template('slidesTpl', { data: response });
    // 将拼接好的字符串渲染到页面中
    $('#slidesBox').html(html);

})

// 事件委托 点击删除slides按钮时触发
$('#slidesBox').on('click', '.delete', function () {
    // 提示删除提示框 防止管理员误触删除按钮
    if (confirm('您真的要删除该轮播图吗？')) {
        // 获取要删除轮播图id
        var id = $(this).attr('data-id');
        // 向服务器发送请求 删除该轮播图信息
        $.ajax({
            type: 'delete',
            url: `/slides/${id}`,
            success: function () {
                // 刷新页面
                location.reload();
            }
        });
    }
})