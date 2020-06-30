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