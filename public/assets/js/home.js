//  向服务器发送请求 获取轮播图
$.get('/slides', function (response) {
    // 利用模板引擎将服务器返回的数据与HTML进行拼接 返回值是一个字符串
    var html = template('slidesTpl', { data: response });
    // 将拼接好的字符串渲染到页面中
    $('#slidesBox').html(html);
    //
    var swiper = Swipe(document.querySelector('.swipe'), {
        auto: 3000,
        transitionEnd: function (index) {
            // index++;

            $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
        }
    });

    // 上/下一张
    $('.swipe .arrow').on('click', function () {
        var _this = $(this);

        if (_this.is('.prev')) {
            swiper.prev();
        } else if (_this.is('.next')) {
            swiper.next();
        }
    })
});

// 向服务器发送请求 获取最新发布的文章数据
$.get('/posts/lasted', function (response) {
    var html = template('lastedTpl', { data: response });
    $('#lastedBox').html(html);

});

// 如果用户点击了点赞按钮
$('#lastedBox').on('click', '#like', function () {
    var id = $(this).attr('data-id');
    // 向服务器发送请求 点赞
    $.post('/posts/fabulous/' + id, function () {
        // 刷新页面
        location.reload();
    })
})