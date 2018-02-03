var Router = require('koa-router');
var router = new Router({
    prefix: '/apiout'
});
var ctrl = {};
const controller={};
var fs = require('fs');
var path = require('path');
const koaRouter = require('koa-router')
const busboy = require('koa-busboy')
const koajson =require('koa-json');
const apitool = require(path.join(webconfig.common, 'api.js'));


module.exports =async (app)=> {
    //初始化控制器
    let paths=[];

    fs.readdirSync(webconfig.api).forEach(function(file) {
        if (file.indexOf('.js') != -1) {
            var ctrlName = file.split('.')[0];
            controller[ctrlName] = {
                type: 'Controller',
                controller: require(path.join(webconfig.api, file)),
                path: path.join(webconfig.api, file)
            }
        } else {
            let urlpath = webconfig.api + '/' + file;
            paths.push({
                name: file,
                path: urlpath
            });
        }
    });




    //初始化二级控制器 /pc/文件夹/*.js
    if (paths.length >= 1) {
        let l = paths.length;
        for (let i = 0; i < l; i++) {
            let filetype = false;
            if (controller[paths[i]['name']]) {
                controller[paths[i]['name']]['children'] = {};
                filetype = true;
            } else {
                controller[paths[i]['name']] = {
                    type: 'path',
                    children: {}
                }
            }
            let urlpath = paths[i]['path'];
            fs.readdirSync(urlpath).forEach(function(files) {
                if (files.indexOf('.js') != -1) {
                    var cname = files.split('.')[0];

                    if (filetype) {
                        controller[paths[i]['name']]['children'][cname] = {
                            type: 'Controller',
                            controller: require(path.join(urlpath, files)),
                            path: path.join(urlpath, files)
                        };
                    } else {
                        controller[paths[i]['name']]['children'][cname] = {
                            type: 'Controller',
                            controller: require(path.join(urlpath, files)),
                            path: path.join(urlpath, files)
                        };
                    }
                }
            })
        }
    }

    // router.use(async function (ctx, next) {
    //     let data = ctx.request.body;
    //     let url = ctx.request.url.substring(1, ctx.request.url.length).split('/');
    //     ctx.session = require(path.join(webconfig.model + '/v1', 'session.js'));
    //     let token = '';
    //     switch (url[1]) {
    //         case 'login':
    //             await next();
    //             break;
    //
    //         default:
    //             if (data['fields']) {
    //                 token = data['fields']['token'];
    //             } else {
    //                 token = data['token'];
    //             }
    //
    //             if (token) {
    //                 let mess = await ctx.session.findOne({
    //                     _id: token
    //                 });
    //                 if (mess.err_code == 200) {
    //                     ctx.admin = mess.data.data;
    //                     await next();
    //                 } else {
    //                     ctx.body = {
    //                         err_code: 104,
    //                         err_msg: '登录过时'
    //                     };
    //                 }
    //             } else {
    //
    //                 ctx.body = {
    //                     err_code: 104,
    //                     err_msg: '你没有权限，请登录'
    //                 };
    //             }
    //     }
    //
    // });
    router.use(koajson());


    controller=await apitool.funName(controller);
    
    apitool.initRouter(router, controller); //执行init()
    apitool.bulidRouter(router,controller);



    app.use(router.routes());
}
