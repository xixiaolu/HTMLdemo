const http = require('http');
// const server = http.createServer((req, res) => {
//     req.write('hello world\n');
//     req.end();
// })
// server.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))
app.use(express.json()).use(express.urlencoded({ extended: false }));
const post = 3000;



app.get('/api/greet', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ message: 'Hello World' });
})

app.get('/api/getImage',(req, res) => {
    console.log('req',req.query); // 获取url传过来的参数
    res.json({message: '带参数的get请求'});
})


app.post('/api/getUserInfo', (req, res) => {
    // console.log(req.body);  前端传过来的信息
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ data : [{name :'123',age : 12},{name : '456',age : 11}] });
});



app.listen(post, () => {
    console.log(`Server is running on port ${post}`);
});
