const ws = require('ws');
const wss = new ws.Server({ port: 8080 }); // 修改为8081
// 监听连接事件，当有客户端连接到服务器时触发
wss.on('connection', function connection(ws) {
// 监听消息事件，当收到客户端发送的消息时触发 
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  setInterval(() => {
    ws.send('我给客户端的');
  }, 1000);
});
console.log('websocket服务器已启动，监听端口：8080')