


// ... 其他代码省略，请自行前往章节 4.2 后端接口 获取其他代码

if (pathName == "/sendMessage") { // 提交留言信息

  console.log("\n【API - 提交留言信息】");

  result = JSON.parse(result);

  let id = result.userid; // id
  let userName = result.username; // 用户名
  let messageText = result.message; // 留言内容
  let time = getNowFormatDate(); // 时间

  if(!messageText) {
    res.end("登录失败，留言内容为空！");
    return;
  } else if(messageText.length > 140) {
    res.end("登录失败，字数超过限制！");
    return;
  } else {

    // 新增的 SQL 语句及新增的字段信息
    let addSql = "INSERT INTO message(user_message, user_id, user_name, time) VALUES(?, ?, ?, ?)";
    let addSqlParams = [messageText, id, userName, time];

    // 连接 SQL 并实施语句
    connection.query(addSql, addSqlParams, function (error1, response1) {
      if (error1) { // 如果 SQL 语句错误
        throw error1;
      } else {
        console.log("\n新增成功！");

        // 返回数据
        res.write(JSON.stringify({
          code: "0",
          message: "新增成功！"
        }));

        // 结束响应
        res.end();
      }
    })
  }

} else if (pathName == "/login") { // 登录

  console.log("\n【API - 登录】");

} else if (pathName == "/register") { // 注册

  console.log("\n【API - 注册】");

}



// ... 其他代码省略，请自行前往章节 4.2 后端接口 获取其他代码



if (pathName == "/getMessage") { // 获取留言信息

  console.log("\n【API - 获取留言信息】");

  // 解析 url 参数部分
  let params = url.parse(req.url, true).query;

  console.log("\n参数为：");
  console.log(params);

  // 新增的 SQL 语句及新增的字段信息
  let readSql = "SELECT * FROM message";

  // 连接 SQL 并实施语句
  connection.query(readSql, function (error1, response1) {
    if (error1) {
      throw error1;
    } else {

      let newRes = JSON.parse(JSON.stringify(response1));
      console.log(newRes);

      // 返回数据
      res.write(JSON.stringify({
        code: "1",
        message: "查询成功！",
        data: newRes
      }));

      // 结束响应
      res.end();
    }
  });
  // 查询完毕
} else if(pathName == "/") { // 首页
  res.writeHead(200, {
    "Content-Type": "text/html;charset=UTF-8"
  });

  res.write('<h1 style="text-align:center">jsliang 前端有限公司服务已开启！</h1><h2 style="text-align:center">详情可见：<a href="https://github.com/LiangJunrong/document-library/blob/master/other-library/Node/NodeBase.md" target="_blank">Node 基础</a></h2>');

  res.end();
}
