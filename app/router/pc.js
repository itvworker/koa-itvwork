var Router = require('koa-router');
var router = new Router();
var ctrl = {};
var fs = require('fs');
var path = require('path');
const koajson = require('koa-json');



module.exports = function (app) {


    fs.readdirSync(webconfig.pc).forEach(function (file) {
        if (file.indexOf('.js') != -1) {
            var ctrlName = file.split('.')[0];
            ctrl[ctrlName] = require(path.join(webconfig.pc, file));
        }
    });
    

 


    router.use(koajson());

    //判断是否是ie以下
    // router.use(async function (ctx, next) {
    //     var userAgent = ctx.request.header["user-agent"]; //取得浏览器的userAgent字符串
    //     var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    //     if (isIE) {
    //         var IE6 = IE7 = IE8 = false;
    //         var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    //         reIE.test(userAgent);
    //         var fIEVersion = parseFloat(RegExp["$1"]);
    //         IE6 = fIEVersion == 6.0;
    //         IE7 = fIEVersion == 7.0;
    //         IE8 = fIEVersion == 8.0;
    //         if (IE6) {
    //             ctx.isIE8 = true;
    //             next();
    //         }
    //         if (IE7) {
    //             ctx.isIE8 = true;
    //             next();
    //         }
    //         if (IE8) {
    //             ctx.isIE8 = true;
    //             next()
    //         }
    //         ctx.isIE8 = false;
    //         next();

    //     } //isIE end

    //     ctx.isIE8 = false;
    //     next();
    // })


    //首页
    router.get('/', async function (ctx, next) {
        await ctrl.index.index(ctx,next);
     
    });

    //注册

    router.get('/reg', async function (ctx, next) {
        await ctrl.user.reg(ctx, next);
    });
    router.get('/user/setperson', async function (ctx, next) {
        await ctrl.user.updataPerson(ctx, next);
    });
    

    //案例 
    router.get('/case', async function (ctx, next) {
        await ctrl.case.index(ctx, next);
    });
    router.get('/case/:sort', async function (ctx, next) {
        await ctrl.case.index(ctx, next);
    });

    //学堂
    router.get('/teach', async function (ctx, next) {
        await ctrl.teach.index(ctx, next);
    });

    


    //运用路由
    app.use(router.routes());
   

}

