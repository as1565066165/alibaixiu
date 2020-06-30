// 获取文章id
var postId = getUrlParams('id');

// 管理员是否审核评论
var review;

// 向服务器发送请求 根据id查询文章信息
$.get('/posts/' + postId, function (response) {
    var html = template('postTpl', response);
    $('#postBox').html(html);
});

// 如果用户点击了点赞按钮
$('#postBox').on('click', '#like', function () {
    // 向服务器发送请求 点赞
    $.post('/posts/fabulous/' + postId, function () {
        // 刷新页面
        location.reload();
    })
});

// 获取网站配置
$.get('/settings', function (response) {

    review = response.review;
    // 如果管理员设置了评论功能
    if (response.comment) {
        // 渲染评论区到页面中
        var html = template('commentAreaTpl');
        $('#commentAreaBox').html(html);
    }

});

// 当评论表单发生提交行为的时候
$('#commentAreaBox').on('submit', 'form', function () {

    // 获取用户在文本域输入的内容
    var content = $(this).find('textarea').val();
    // 评论的状态
    var state;
    // 如果开启了评论审核
    if (review) {
        state = 0;
    } else {
        // 否则
        state = 1;
    }
    $.post('/comments', { content, post: postId, state }, function () {
        location.reload();
    }).error(function () {
        location.href = '/admin/login.html';
    })


    // 阻止表单的默认提交行为
    return false;
})

// 获取当前文章的评论信息
$.get('/comments?pId=' + postId, function (response) {
    console.log(response);
    var userCommentsTpl = `
    {{each data}}
    <li>
    <a href="detail.html?id={{$value.post}}">
      <div class="avatar">
        <img src="{{$value.author.avatar}}" alt="">
      </div>
      <div class="txt">
        <p>
          <span>{{$value.author.nickName}}</span>{{$imports.formatDate($value.createAt)}}说:
        </p>
        <p>{{$value.content}}</p>
      </div>
    </a>
  </li>
  {{/each}}
    `;
    var html = template.render(userCommentsTpl, { data: response });
    $('#userComments').html(html);

})