var koa = require('koa');
var app =new koa();
global.path = require('path');
var router = require('./app/router/admin');  //后台路由
const render = require('koa-ejs');
global.webconfig = require(path.join(__dirname,'app/config/config.js'))(__dirname);
const mongoose= require('mongoose');
global.mdb=mongoose;
global.tool=require('./app/common/tool');
const db = mongoose.connect(webconfig.db);
const session = require("koa-session2");
// const Store = require("./app/session/store");


render(app, {
    root: path.join(__dirname, 'app/view'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
});


app.use(session({
    // store: new Store()   //default "koa:sess"
}));




db.connection.on("error", function(error) {
    console.log("数据库连接失败：" + error);
});

db.connection.on("open", function() {

    console.log("数据库连接成功");
})

db.connection.on('disconnected', function() {
    console.log('数据库连接断开');
})



router(app);




app.listen(8099);


