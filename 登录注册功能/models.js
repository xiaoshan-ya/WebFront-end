
// 1. 在要使用的.js文件中导入mongoose
const mongoose = require('mongoose')

// 2. js文件中链接数据库
mongoose.connect('mongodb://localhost:3306/webload',{
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
});

// 3. 监听链接成功还是失败
let db = mongoose.connection;
db.on('error', (err)=>{ // 链接失败
   console.log(err, "链接失败");
});
db.once('open', function() { // 链接成功
   // we're connected!
   console.log("链接成功");
});
db.once('open', function() { // 断开链接
   // we're connected!
   console.log("断开链接");
});

// 在数据库中新建一个表, 表中只有用户名和密码这两列
const Userscheme = new mongoose.Schema({
   username: { type: String , unique: true},//保证用户名唯一
   password: {
      type: String,
      set(val) {
         return require('bcryptjs').hashSync(val,4)//对密码加密
      }
   },
});

const User = mongoose.model('User', Userscheme);

// 对外提供一个接口
module.exports = {User};
