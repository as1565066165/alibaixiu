// 处理路径模块
const path = require('path');

// 全局api
global.Gapi = {
	// 应用路径
	path: {
		// 模型
		model: path.join(__dirname, 'model', '/'),
		// 中间件
		middleware: path.join(__dirname, 'middleware', '/'),
		// 静态资源
		public: path.join(__dirname, 'public', '/')
	},
	reg: {
		email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
		password: /^[a-zA-Z0-9]{3,30}$/,
		id: /^[0-9a-fA-F]{24}$/
	}
}

