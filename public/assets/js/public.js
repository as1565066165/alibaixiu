// 向服务器发送请求 获取随机推荐文章数据
$.get('/posts/random', function (response) {
  var randomTpl = `
    {{each data}}
    <li>
    <a href="detail.html?id={{$value._id}}">
      <p class="title">{{$value.title.substr(0,20)+'...'}}</p>
      <p class="reading">阅读({{$value.meta.views}})</p>
      <div class="pic">
        <img src="{{$value.thumbnail}}" alt="">
      </div>
    </a>
  </li>
  {{/each}}
    `;
  var html = template.render(randomTpl, { data: response });
  $('#randomBox').html(html);

});

if (!isComment) {
  // 获取网站配置
  var isComment;
  $.get('/settings', function (response) {
    isComment = response.comment
  })
}

// 向服务器发送请求 获取最新评论数据
$.get('/comments/lasted', function (response) {
  var commentTpl;
  if (isComment) {
    commentTpl = `
    <h3 style="display: inline-block;
    margin-bottom: 10px;
    line-height: 25px;
    font-size: 20px;
    font-weight: 600;
    border-bottom: 2px solid #ff5e52;">最新评论</h3>
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
  } else {
    commentTpl = `<h4>找不到内容哟！</h4>`;
  }
  var html = template.render(commentTpl, { data: response });
  $('#commentBox').html(html);

});

// 向服务器发送请求 获取分类列表数据
$.get('/categories', function (response) {
  var navTpl = `
    {{each data}}
    <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
    {{/each}}
    `;
  var html = template.render(navTpl, { data: response });
  $('.navBox').html(html);

});

// 从浏览器的地址栏中获取查询参数
function getUrlParams (name) {
  var paramsAry = location.search.substr(1).split('&');
  for (var i = 0; i < paramsAry.length; i++) {
    var temp = paramsAry[i].split('=');
    if (temp[0] == name) {
      return temp[1];
    };
    return -1;
  }

}

// 当搜索数据提交时触发
$('.search form').on('submit', function () {
  // 获取搜索框输入内容
  var key = $(this).find('.keys').val();
  // 跳转搜索页面并向url传入key
  location.href = '/search.html?key=' + key;
  // 阻止表单的默认提交事件
  return false;
})