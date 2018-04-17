var Router = require('koa-router');
var router = new Router();
var controller = {};
var fs = require('fs');
var path = require('path');
const koajson = require('koa-json');


module.exports = async (app)=>{
    router.use(koajson());
    let paths = [];

    //初始化一级目录或一级控制器 /pc/*.js
    fs.readdirSync(webconfig.pc).forEach(function(file) {
        if (file.indexOf('.js') != -1) {
            var ctrlName = file.split('.')[0];
            // ctrl[ctrlName] = require(path.join(webconfig.pc, file));
            controller[ctrlName] = {
                type: 'Controller',
                controller: require(path.join(webconfig.pc, file)),
                path: path.join(webconfig.pc, file)
            }
        } else {
            let urlpath = webconfig.pc + '/' + file;
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

    //获取控制器里的所有方法名
    controller=routerTool.funName(controller);
    routerTool.initRouter(router, controller); //执行init()
    router.get('/adminmanger', async(ctx, next) => {
        await ctx.render('admin');
    });
    router.get(['/', '/index', '/index/index'], async (ctx, next) => {
        //ctx.body=controller;
         await controller.index['controller'].index();
    });
    //建立路由
    routerTool.bulidRouter(router,controller);
    app.use(router.routes());

}
