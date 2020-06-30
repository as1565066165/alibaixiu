// 添加退出按钮的点击事件
$('#logout').on('click', function () {
    // 增加退出确认框 防止用户误触退出登录按钮  返回的是一个布尔值
    // 如果点击确认返回true 否则返回false
    var isConfirm = confirm('您确定要退出吗？');
    // 当用户点击了确认时
    if (isConfirm) {
        // 向服务器发送ajax请求
        $.post('/logout', function () {
            // 如果退出成功则重定向到用户登录页面
            location.href = 'login.html';
        }).error(function () {
            // 如果退出失败则提示用户退出失败
            alert('退出失败!');
        })
    }
});

// 处理日期事件格式
function formatDate(date) {
    // 将字符串格式的日期转换为日期对象
    date = new Date(date);
    // 获取年
    year = date.getFullYear();
    // 获取月
    month = ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1));
    // 获取日
    day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    // 获取时
    hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    // 获取分
    minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    // 获取秒
    second = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    // 返回要显示的时间字符串格式
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

// 获取用户名和头像
$.get(`/users/${userId}`, function (response) {
    if (response.avatar) {
        $('.profile .avatar').attr('src', response.avatar);
    } else {
        $('.profile .avatar').attr('src', '../assets/img/default.png');
    }
    $('.profile .name').text(response.nickName);

})


