// 测试 Node.js 能否访问目标 URL
const https = require('https');

const url = 'https://www.doubao.com/chat/';
console.log(`测试访问：${url}`);

https.get(url, (res) => {
  console.log(`状态码：${res.statusCode}`);
  console.log(`响应头：${JSON.stringify(res.headers, null, 2)}`);
  res.on('data', (d) => {});
}).on('error', (e) => {
  console.error(`Node.js 访问失败：${e.message}`);
});