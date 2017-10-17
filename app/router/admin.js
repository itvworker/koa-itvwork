var Router = require('koa-router');
var router = new Router({
    prefix: '/api'
});
var ctrl={};
var fs = require('fs');
var path = require('path');
module.exports = function (app) {
    //初始化控制器
    fs.readdirSync(webconfig.api).forEach(function(file) {
        if (file.indexOf('.js') != -1) {
            var ctrlName = file.split('.')[0];
            ctrl[ctrlName] = require(path.join(webconfig.api, file));
        }
    });

    //接口首页
    router.get('api','/', async function (ctx, next) {

    });

    //管理员
    router.post('api_admin_add','/admin/add',async function(ctx,next) {
          await ctrl.admin.add(ctx,next);
    });
    //管理员列表
    router.post('api_add','/admin/list',async function (ctx,next) {
         await ctrl.admin.list(ctx,next);
    })


    //运用路由
    app.use(router.routes());

}
