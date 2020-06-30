// 向服务器发送请求 获取热门推荐文章数据
$.get('/posts/recommend', function (response) {
    var recommendTpl = `
    {{each data}}
    <li>
    <a href="detail.html?id={{$value._id}}">
      <img src="{{$value.thumbnail}}" alt="">
      <span>{{$value.title}}</span>
    </a>
    </li>
    {{/each}}
    `;
    var html = template.render(recommendTpl, { data: response });
    $('#recommendBox').html(html);

})