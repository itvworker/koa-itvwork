var koa = require('koa');
var app =new koa();
global.path = require('path');
var router = require('./app/router/admin');  //后台路由
const render = require('koa-ejs');
global.webconfig = require(path.join(__dirname,'app/config/config.js'))(__dirname);
const mongoose= require('mongoose');
mongoose.Promise = global.Promise;
global.mdb=mongoose;
global.tool=require('./app/common/tool');
const db = mongoose.connect(webconfig.db);
const session = require("koa-session");
const koajson =require('koa-json');
const koaBody = require('koa-body');
const resouce = require('koa-static2');
const cors = require('@koa/cors');


render(app, {
    root: path.join(__dirname, 'app/view'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
});



app.use(koajson());
app.use(koaBody())
app.use(cors());
app.use(resouce("static", __dirname + "/assets"));








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


