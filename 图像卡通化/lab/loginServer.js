// 引入外部接口
const {User} = require('./models.js'); // 如果想要读取后端数据库的内容，则通过User读取
const express = require("express");
const path = require('path');
const app = express();

const SECRET = 'zzkya'//jwt密钥

//解决跨域
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//????????????????????/
// app.get('/api/users', async(req, res)=> {
//     const users = await User.find()
//     res.send(users);
// });

// req:从前端得到的数据体，res:返回给前端的数据体
app.post('/api/register', async function(req, res){
    var username = String(req.body.username);
    var password = String(req.body.password);
    console.log(username, password);

    // User为请求的后端数据库体,现在后端数据库中查看时候已存在该用户
    const user1 = await User.findOne({
        username: req.body.username,
    })
    if(user1) {
        return res.status(422).send({message: 'Username already exists!'});
    }

    const user = await User.create({
        username,
        password,
    });
    res.send(user);
});

app.post('/api/login.html', async function(req,res){
    const user = await User.findOne({
        username:req.body.username,
    })
    if(!user){
        return res.status(422).send({message: 'Username does not exist!'})
    }

    const isPasswordValid = require('bcrypt').compareSync(
        req.body.password,user.password);
    if(!isPasswordValid){
        return res.status(422).send({message:'Password is incorrect!'});
    }

    res.send(user);
});

app.listen(3030,()=>{
    console.log('http://localhost:3030');
});
