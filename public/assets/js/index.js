// 获取文章数量
$.get('/posts/count', function (response) {
    // 将服务器返回的数据渲染到页面中  这里比较简单就不用模板引擎了
    $('#post').html(`<strong>${response.postCount}</strong>篇文章（<strong>${response.draftCount}</strong>篇草稿）`);
});

// 获取分类数量
$.get('/categories/count', function (response) {
    // 将服务器返回的数据渲染到页面中  这里比较简单就不用模板引擎了
    $('#category').html(`<strong>${response.categoryCount}</strong>个分类`);
});

// 获取评论数量 
$.get('/comments/count', function (response) {
    // 将服务器返回的数据渲染到页面中  这里比较简单就不用模板引擎了
    $('#comment').html(`<strong>${response.commentCount}</strong>条评论（<strong>${response.draftCount}</strong>条待审核）`);

})