# 项目简介

阿里百秀，内容管理系统，分为内容管理和内容展示两大核心功能。

## 1. 功能模块

#### 1.1 内容管理

| 模块     | 功能                           |
| -------- | ------------------------------ |
| 用户     | 登录、退出、用户增删改查       |
| 文章     | 文章管理                       |
| 分类     | 分类管理                       |
| 评论     | 评论管理                       |
| 网站设置 | 关键字、描述、网站logo、轮播图 |

#### 1.2 内容展示

| 模块   | 功能                           |
| ------ | ------------------------------ |
| 首页   | 导航、文章数据展示             |
| 列表页 | 根据分类显示文章列表           |
| 详情页 | 文章详情数据展示、实现评论功能 |

## 2. 开发模式

#### 2.1 前后端混合开发模式

所有HTML代码和数据在服务器端拼接好，一次性将所有内容发送到客户端，浏览器执行代码，将内容呈现给用户

![02](https://github.com/as1565066165/alibaixiu/blob/master/assets/02.png)

问题：

1. 前后端开发人员对互相的代码都不是别熟悉，混合开发两者在处理互相的代码时非常困难
2. 在开发的过程中难免会出现代码互相覆盖，导致工作量倍增

#### 2.2 前后端分离开发模式

![03](https://github.com/as1565066165/alibaixiu/blob/master/assets/03.png)

好处：职责、分工明确，独立开发，互不影响。



## 3. 项目架构

| 系统分层 | 使用技术                                  |
| -------- | ----------------------------------------- |
| 数据层   | mongoDB                                   |
| 服务层   | node.js (express)                         |
| 客户端   | art-template、jQuery、font-awesome、swipe |

## 4. 项目运行环境搭建（运行项目必须知道的事情）

1. 安装node.js软件并测试其是否安装成功
   1. win + R 开启windows系统中的运行程序，在运行程序中输入powershell回车，打开命令行程序
   2. 输入`node -v`命令查看node.js的版本，在命令行程序中输出了版本号没有报错即说明安装成功
2. 安装mongodb、mongodb-compass软件
3. 将阿里百秀项目文件夹复制到硬盘中（服务器端程序）
4. 在命令行工具中进入到项目根目录中
   1. 按住shift键，点击鼠标右键，选择在此处打开powershell窗口
5. 使用`npm install`命令安装项目所需依赖文件
6. 打开app.js文件  在47行数据库连接部分将：'mongodb://itcast:itcast@localhost:27017/alibaixiu'修改

​       为'mongodb://localhost:27017/alibaixiu'

​       原因:你没有创建mongodb数据库连接账号和密码信息，我们选择用默认的方式登录mongodb数据库

7. 在命令行工具中输入node app.js开启项目



## 5.项目运行后注意事项（运行项目必须知道的事情）

1.打开浏览器,在浏览器地址栏中输入localhost:3000/admin/login.html 进入登录页面

   输入系统默认用户名:（原来）itcast@qq.com  （现在）admin@qq.com密码:123456  进入管理员页面

2.由于没有上传数据库文件 所有的数据都需要自己实现手动添加

3.进入管理员页面 首先更改自己的账号信息（修改密码等）、上传用户头像

4.接着添加文章信息、系统设置信息、轮播图信息 （顺序无要求，添加就是填写表单信息、选择图片文件等）

5.注意在更改分类信息时 分类信息的图标需要上font-awesome上搜索   如：fa-phone、fa-gift等

   在font-awesome搜索的图片类名格式为：fa fa-xxx-xxx ,你只需要添加后面fa-xxx-xxx部分即可

6.在添加完基本的数据库信息后 可以选择退出登录注册一个新用户（注册的用户默认为普通用户）

   或利用管理员添加用户权限进行普通用户的添加

7.在后台数据添加完成后，利用普通用户账号进入前台文章显示页面（如果想页面内容更为丰富

   建议文章信息添加15条左右、分类信息添加4条左右）

8.如果想利用管理员账号进入网站，则在未退出管理员账号的情况下。打开新的标签页在浏览器

   地址栏输入localhost:3000进入前台文章显示页面

9.管理员如果开启了评论功能，则前台文章详情页面会显示评论功能，如果管理员关闭了评论则

   页面不会显示评论功能

10.如果管理员开启了评论审核功能，则用户评论之后不会立马显示到页面中，需要管理员在后台

   管理页面进行评论审核，待评论批准之后才会显示到文章页面。如果管理员关闭了评论功能则直

   接显示在文章详情页面。

11.如果项目仍然运行不了，请联系q我：1565066165



## 5.项目地址

首页：http://luoxu.ltd:3000/

登录页面：http://luoxu.ltd:3000/admin/login.html

# 项目效果展示

## 1.前台文章显示页面

![index](https://github.com/as1565066165/alibaixiu/blob/master/assets/index.png)

## 2.前台文章分类页面

![category](https://github.com/as1565066165/alibaixiu/blob/master/assets/category.png)

## 3.前台文章详情页面

![post](https://github.com/as1565066165/alibaixiu/blob/master/assets/post.png)

## 4.登录页面

![login](https://github.com/as1565066165/alibaixiu/blob/master/assets/login.png)

## 5.注册页面

![register](https://github.com/as1565066165/alibaixiu/blob/master/assets/register.png)

## 6.后台管理页面

![admin](https://github.com/as1565066165/alibaixiu/blob/master/assets/admin.png)



# 项目功能

## 1.用户功能

### 1.1 登录

1. 为登录按钮添加点击事件
2. 获取用户在文本框中输入的用户名和密码
3. 验证用户是否输入了用户名和密码，如果没有输入，阻止程序向下执行，提示用户输入用户名和密码
4. 调用实现登录功能的接口，登录成功，跳转到数据管理的首页，登录失败，提示用户名或密码错误



### 1.2 登录拦截

1. 使用script标签加载服务器端提供的接口地址
2. 判断isLogin变量的值，如果值为false，跳转到登录页面



### 1.3 添加用户

1. 为添加用户功能的每一个表单项添加name属性，且name属性值需要和接口文档中要求的参数名称保持一致
2. 为表单绑定提交事件，在事件处理函数中阻止表单默认提交的行为
3. 在事件处理函数中获取到用户在表单中输入的内容
4. 调用添加用户接口，将获取到的内容通过接口发送给服务器端，操作成功刷新页面，操作失败给出用户提示



### 1.4 展示用户列表

1. 向服务器端发送Ajax请求，索要用户列表数据
2. 第二步，使用模板引擎将数据和html模板进行拼接
3. 第三步就是将拼接好的内容展示在页面中



### 1.5 用户头像上传

1. 为文件选择控件添加onchange事件，在事件处理函数中获取到用户选择到的文件
2. 创建formData对象用于实现图片文件上传
3. 调用图片文件上传接口，实现图片上传
4. 在添加新用户表单中新增一个隐藏域，将图片地址存储在隐藏域中



### 1.6 用户列表展示

1. 在页面加载时向服务器端发送Ajax请求，索要用户列表数据
2. 使用模板引擎将数据和html模板进行拼接
3. 将拼接好的内容展示在页面中



### 1.7 用户信息修改

1. 通过事件委托的形式为编辑按钮点击添加事件
2. 在事件处理函数中获取到当前点击用户的id值
3. 根据用户id获取用户的详细信息，并且通过模板引擎将用户的详细信息渲染到左侧的表单中
4. 为修改按钮添加点击事件，在事件处理函数中获取到用户在表单中输入的内容，调用修改用户信息接口实现用户信息修改功能。



### 1.8 删除用户

1. 为删除按钮添加点击事件
2. 确认用户是否要进行删除操作
3. 获取到当前被点击用户的id
4. 调用删除用户接口根据id删除用户，如果删除成功，刷新当前页面，让页面显示最新的内容



### 1.9 批量删除用户

1. 管理复选框的选中状态
   1. 当全选按钮被选中时，所有用户要被选中，当全选按钮取消选中时，所有用户要被取消选中
   2. 当用户前面的复选框按钮状态被改变时，要检查是否有用户处于未选中状态，如果有，取消全选按钮的选中状态，如果没有，就意味着所有用户都处于选中状态，此时将全选按钮设置为选中状态
2. 管理批量删除按钮的状态
   1. 当全选按钮被选中时，显示批量删除按钮，当全选按钮被取消选中时，隐藏批量删除按钮
   2. 当用户前面的复选框按钮状态改变时，检查所有用户的选中状态，如果有用户被选中，显示批量删除按钮，如果所有用户都没有处于选中状态，隐藏批量删除按钮
3. 实现批量删除用户功能
   1. 批量删除按钮添加点击事件，在点击事件处理函数中，将所有被选中的用户id执行存储在一个数组中
   2. 调用用删除用户接口，实现删除用户功能



### 1.10 修改密码

1. 为修改密码表单中的每一个表单项添加name属性，name属性的值要和接口中的参数名称保持一致
2. 为修改密码表单添加表单提交事件，在事件处理函数中，阻止表单的默认提交行为
3. 获取到用户在表单中输入的内容
4. 调用修改密码接口，实现密码修改功能，如果密码修改成功，跳转到登录页面，让用户重新登录



### 1.11 展示登录用户信息

1. 根据userId变量的值，向服务器端获取当前登录用户的信息
2. 将用户信息显示在页面的左侧



## 2.分类功能

### 2.1 添加分类

1. 为表单中的每一个表单项添加name属性，name属性的值要和接口文档中要求的参数名称保持一致
2. 为表单添加表单提交事件，在事件处理函数中，阻止表单提交的默认行为
3. 获取到用户在表单中输入的内容
4. 调用分类添加接口，实现添加分类功能



### 2.2 分类数据展示

1. 向服务器端发送Ajax请求，索要分类页面数据
2. 使用模板引擎将服务器端返回的数据和HTML模板进行拼接
3. 将拼接好的内容展示在页面中



### 2.3 分类数据修改

1. 通过事件委托为编辑按钮添加点击事件，在事件处理函数中获取到要修改的分类数据id
2. 根据id调用接口，获取分类数据的详细信息
3. 利用模板引擎将分类数据和HTML字符进行拼接，拼接完成以后将内容渲染到页面中
4. 为修改按钮添加点击事件，在事件处理函数中获取到管理员在表单中输入的内容
5. 调用修改分类数据接口，实现分类数据修改功能。



### 2.4 分类数据删除

1. 通过事件委托的方式为删除按钮添加点击事件，在点击事件处理函数弹出删除确认框
2. 在用户点击了确认删除后，获取要删除的分类数据的id
3. 调用删除分类数据接口，实现删除分类数据功能，如果分类删除成功，刷新页面



## 3.文章功能

### 3.1 添加文章

1. 获取文章分类数据，并将数据显示在所属分类的下拉列表中供管理员选择
2. 实现文章封面图片的上传，并将上传后的图片地址保存在一个隐藏域中
3. 为添加文章表单中的每一个表单项添加name属性，并且name属性值要和接口中要求的参数名称保持一致
4. 为添加文章表单绑定表单提交事件，在事件处理函数中阻止表单默认提交的行为
5. 获取到管理员在表单中输入的内容
6. 向服务器端发送添加文章的请求，实现文章添加功能，文章添加成功以后要跳转到文章列表页面



### 3.2 文章列表数据展示

1. 在页面一上来的时候向服务器端发送请求索要文章列表数据
2. 通过模板引擎将文章列表数据和HTML进行拼接，拼接完成以后将内容显示在页面中
3. 根据分页数据实现列表数据分页功能



### 3.3 文章数据列表筛选

1. 向服务器端发送请求，索要文章分类数据，并将数据显示在所属分类的下来列表中
2. 为筛选按钮添加点击事件，在事件处理函数中获取到用户选择到的内容
3. 向服务器端发送请求，索要管理员要求的文章列表数据，并将数据显示在页面中



### 3.4 文章编辑

1. 为编辑按钮添加链接，并将文章id作为链接的查询参数传递到文章编辑页面
2. 在文章编辑页面获取地址栏中的id参数
3. 根据id获取文章详细信息，并将文章信息显示在文章编辑表单中
4. 为修改文章表单绑定表单提交事件，在事件处理函数中阻止表单默认提交的行为
5. 获取到用户在表单中输入的内容
6. 向服务器端发送请求，实现修改文章信息功能，如果文章信息修改成功，跳转到文章列表页面



### 3.5 文章删除

1. 通过事件委托为删除按钮添加点击事件，在事件处理函数中弹出一个删除确认框，跟管理员确认删除操作
2. 在事件处理函数中获取要要删除的文章的id
3. 发送Ajax请求，执行删除操作，删除操作成功，刷新页面



### 3.6 文章热门推荐

1. 向服务器端发送请求，索要热门推荐数据

2. 使用模板引擎将数据和html模板进行拼接，将拼接好的内容显示在页面中

   ```javascript
   var str = '<div>{{name}}</div>';
   var obj = {name: '张三'}
   var html = template.render(str, obj);
   ```



### 3.7 文章搜索

1. 为搜索表单绑定表单提交事件
2. 在事件处理函数中阻止表单默认提交行为并且获取到用户输入的搜索关键字
3. 跳转到搜索结果页面并且将用户输入的搜索关键字传递到搜索结果页面
4. 在搜索结果页面中，从地址栏的查询参数中获取到用户输入的关键字
5. 根据用户输入的搜索关键字调用搜索接口，当服务器端返回数据以后，将搜索结果数据和HTML模板进行拼接，最终将拼接好的内容展示在页面中





## 4.评论功能

### 4.1 评论列表展示

1. 向服务器端发送请求，获取评论列表数据
2. 使用模板引擎将评论列表数据和HTML模板进行拼接，拼接完成以后再将内容展示在页面中
3. 根据分页数据实现分页功能



### 4.2 评论审核

1. 根据当前评论的状态更改审核按钮中的文字。如果当前评论是未审核状态，按钮中显示批准，如果当前评论是已审核状态，按钮中显示驳回
2. 通过事件委托的方式为审核按钮添加点击事件，在事件处理函数中获取到当前评论的状态
3. 向服务器端发送请求，告诉服务器端评论要更改为什么状态，如果修改成功，刷新页面，让页面中显示最新的数据



### 4.3 评论删除

1. 通过事件委托的方式为删除按钮添加点击事件，在事件处理函数中弹出删除确认框
2. 获取到管理员要删除的评论id值
3. 向服务器端发送请求，执行删除评论操作，评论如果删除成功，刷新页面



## 5.轮播图功能

### 5.1 图片轮播数据添加

1. 实现图片上传功能，并且将上传后的图片地址保存在一个隐藏域中
2. 为图片轮播表单中的每一个表单项添加name属性，name属性的值要和接口中要求的参数名称保持一致
3. 为图片轮播表单绑定表单提交事件，在事件处理函数中阻止表单默认提交的行为
4. 获取到管理员在表单中输入的内容
5. 向服务器端发送请求，实现图片轮播数据添加功能，如果数据添加成功，刷新页面



### 5.2 轮播图数据展示

1. 向服务器端发送请求索要图片轮播列表数据
2. 使用模板引擎将图片轮播列表数据和HTML模板进行拼接，拼接完成以后将内容展示在页面中



### 5.3 图片轮播数据删除

1. 通过事件委托的方式为删除按钮添加点击事件
2. 在事件处理函数中弹出删除确认框
3. 获取到要删除的轮播图数据的id
4. 向服务器端发送请求，执行删除操作，删除操作成功，刷新页面



### 5.4 轮播图数据展示（更新）

1. 向服务器端发送请求索要轮播图数据
2. 使用模板引擎将数据和HTML字符串进行拼接，将拼接好的内容显示在页面中
3. 将原有的实现轮播图效果的JavaScript代码挪到ajax方法的success函数的最后面



## 6.网站设置功能

### 6.1 网站设置

1. 实现网站logo图片的上传，并且将上传后的图片地址保存在一个隐藏域中
2. 为表单中的每一个表单项添加name属性，name属性的值要和接口文档中要求的参数名称保持一致
3. 为表单绑定提交事件，在事件处理函数中阻止表单默认提交的行为
4. 获取到管理员在表单中输入的内容
5. 向服务器端发送请求，实现网站设置数据的添加功能



### 6.2 显示网站设置数据

1. 向服务器端发送请求，获取网站设置数据
2. 判断服务器端返回的数据是否为真，如果为真，将数据展示在表单中



## 7.网站最近更新功能

### 7.1 页面展示了文章评论信息

1.按照文章id搜索文章的评论

2.已批准的评论会直接展现在页面中

3.最新评论实现了优化功能

4.管理页面的未批准评论会标红

### 7.2 页面优化

1.所有的点赞按钮都实现了点赞功能

2.评论链接实现了跳转到评论文章功能

3.所有的分类按钮实现了跳转分类页面功能

### 7.3 注册页面

1.在登录页面添加了用户注册按钮

2.注册页面上js实现了前端注册信息的基本验证

3.使用的bootstrap开发的页面功能

4.注册页面注册的用户全为普通用户

5.实现了根据邮箱查找用户的功能

详细信息参照接口文档





# 













