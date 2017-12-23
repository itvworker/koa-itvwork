var Router = require('koa-router');
var router = new Router();
var controller = {};
var fs = require('fs');
var path = require('path');
const koajson = require('koa-json');

module.exports = function(app) {
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
    for (let i in controller) {
        if (controller[i]['type'] == 'Controller') {
            let data = fs.readFileSync(controller[i]['path'], "utf-8");
            let arr = [];
            data.replace(/async[ ]+[\w|_]+/ig, function(val) {
                let vs = val.replace('async', '');
                vs = vs.replace(/\s+/g, "");
                arr.push(vs);
                return val;
            })
            controller[i]['fun_name'] = arr;
            let child = controller[i]['children'];


            if (child) {

                let arr = [];
                for (let a in child) {
                    if (child[a]['type'] == 'Controller') {
                        let data = fs.readFileSync(child[a]['path'], "utf-8");
                        data.replace(/async[ ]+[\w|_]+/ig, function(val) {
                            let vs = val.replace('async', '');
                            vs = vs.replace(/\s+/g, "");
                            arr.push(vs);
                            return val;
                        })
                    }
                    controller[i]['children'][a]['fun_name'] = arr;
                }
            }
        }
    }



    routerTool.initRouter(router, controller); //执行init()
    router.get('/adminmanger', async(ctx, next) => {
        await ctx.render('admin');
    });

    router.get(['/', '/index', '/index/index'], async(ctx, next) => {
        await controller.index['controller'].index();
    });


    //建立路由
    for (let i in controller) {
        if (controller[i]['type'] == "Controller") {
            if (controller[i]['children']) {
                let child = controller[i]['children'];
                routerTool.index(router, controller[i]['children'], i);
                for (let a in child) {

                routerTool.controller(router, child[a], '/' + i + '/' + a);
                }
            } else {
                routerTool.controller(router, controller[i], i);
            }
        } else {
            let child = controller[i]['children'];

            routerTool.index(router, controller[i]['children'], i);
            for (let a in child) {
                routerTool.controller(router, child[a], '/' + i + '/' + a + '');
            }
        }
    }






    //运用路由
    app.use(router.routes());

}
