var koa = require('koa');
var app =new koa();
global.path = require('path');
global.Page = require('./app/common/page');
const render = require('koa-ejs');
global.webconfig = require(path.join(__dirname,'app/config/config.js'))(__dirname);
var router = require('./app/router/admin');  //后台路由
var pcrouter= require('./app/router/pc');
var apirouter= require('./app/router/api.js');
const mongoose= require('mongoose');
mongoose.Promise = global.Promise;
global.mdb=mongoose;
global.tool=require('./app/common/tool');
global.routerTool=require('./app/common/router');
const db = mongoose.connect(webconfig.db);

const koaBody = require('koa-body');
const resouce = require('koa-static2');
//const cors = require('@koa/cors');


render(app, {
    root: path.join(__dirname, 'app/view'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
});

app.use(koaBody({multipart: true}))
// app.use(cors());
app.use(resouce("",__dirname+"/public"));



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
pcrouter(app);
apirouter(app);




app.listen(8099);
