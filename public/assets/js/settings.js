// 当管理员选择文件时触发
$('#logo').on('change', function () {
    // 获取选择的文件信息 
    var file = this.files[0];
    // 创建FormData对象
    var formData = new FormData();
    // 将管理员选择的文件添加到FormData对象中
    formData.append('logo', file);
    // 向服务器发送请求实现文件上传功能
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#hiddenLogo').val(response[0].logo);
            // 将设置的网站图标显示到页面中
            $('#preview').attr('src', response[0].logo);
        }
    });
})

// 当管理员提交settings表单时触发
$('#settingsForm').on('submit', function () {
    // 获取管理员输入的表单信息
    var formData = $(this).serialize();
    // 向服务器发送请求 添加settings数据
    $.post('/settings', formData, function () {
        // 刷新页面
        location.reload();
    })
    // 阻止表单的默认提交行为
    return false;
});

// 向服务器发送请求 获取管理员设置信息
$.get('/settings', function (response) {
    // 如果管理员进行了网站设置 
    if (response) {
        // 将服务器返回设置的结果显示到页面中
        // 设置隐藏域的值
        $('#hiddenLogo').val(response.logo);
        // 设置显示图片
        $('#preview').attr('src', response.logo);
        // 设置站点名称
        $('input[name="title"]').val(response.title);
        // 设置开启评论功能
        $('input[name="comment"]').prop('checked', response.comment);
        // 设置评论必须经人工批准
        $('input[name="review"]').prop('checked', response.review);
    }

})