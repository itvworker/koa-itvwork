var Router = require('koa-router');
var router = new Router({
    prefix: '/api'
});
var ctrl = {};
var fs = require('fs');
var path = require('path');

const koaRouter = require('koa-router')
const busboy = require('koa-busboy')
const koajson =require('koa-json');
module.exports = function (app) {
    //初始化控制器

    const uploader = busboy({
        dest: webconfig + '/temp', // default is system temp folder (`os.tmpdir()`)
        fnDestFilename: (fieldname, filename) => uuid() + filename
    })

    fs.readdirSync(webconfig.api).forEach(function (file) {
        if (file.indexOf('.js') != -1) {
            var ctrlName = file.split('.')[0];
            ctrl[ctrlName] = require(path.join(webconfig.api, file));
        }
    });

    router.use(async function (ctx, next) {
        let data = ctx.request.body;
        let url = ctx.request.url.substring(1, ctx.request.url.length).split('/');
        ctx.session = require(path.join(webconfig.model + '/v1', 'session.js'));
        let token = '';
        switch (url[1]) {
            case 'login':
                await next();
                break;

            default:
                if (data['fields']) {
                    token = data['fields']['token'];
                } else {
                    token = data['token'];
                }

                if (token) {
                    let mess = await ctx.session.findOne({
                        _id: token
                    });
                    if (mess.err_code == 200) {
                        ctx.admin = mess.data.data;
                        await next();
                    } else {
                        ctx.body = {
                            err_code: 104,
                            err_msg: '登录过时'
                        };
                    }
                } else {

                    ctx.body = {
                        err_code: 104,
                        err_msg: '你没有权限，请登录'
                    };
                }
        }

    });

    router.use(koajson());

    //接口首页

    //管理人员登录
    router.post('api_login', '/login', async function (ctx, next) {
        await ctrl.login.index(ctx, next);
    });
    //管理员
    router.post('api_admin_add', '/admin/add', async function (ctx, next) {
        await ctrl.admin.add(ctx, next);
    });
    //管理员列表
    router.post('api_add', '/admin/list', async function (ctx, next) {
        await ctrl.admin.list(ctx, next);
    })


    //案例
    router.post('api_addcase', '/case/add', async function (ctx, next) {

        await ctrl.case.add(ctx, next);
    })
    router.post('api_case_list', '/case/index', async function (ctx, next) {
        await ctrl.case.list(ctx, next);
    })
    router.post('api_case_detail', '/case/detail', async function (ctx, next) {
        await ctrl.case.detail(ctx, next);
    })

    router.post('api_case_updata', '/case/updata', async function (ctx, next) {
        await ctrl.case.updata(ctx, next);

    })
    router.post('api_case_del', '/case/del', async function (ctx, next) {
        await ctrl.case.del(ctx, next);

    })


    //案例分类接口

    router.post('api_case_sort', '/caseSort/index', async function (ctx, next) {
        await ctrl.caseSort.index(ctx, next);

    })

    router.post('api_case_add_sort', '/caseSort/add', async function (ctx, next) {
        await ctrl.caseSort.add(ctx, next);
    });

    router.post('api_case_sort_detail', '/caseSort/detail', async function (ctx, next) {
        await ctrl.caseSort.detail(ctx, next);
    });

    router.post('api_case_sort_del', '/caseSort/del', async function (ctx, next) {
        await ctrl.caseSort.del(ctx, next);
    });

    router.post('api_case_sort_update', '/caseSort/update', async function (ctx, next) {
        await ctrl.caseSort.update(ctx, next);
    });

    //图片
    router.post('api_file', '/file', async function (ctx, next) {
        await ctrl.images.list(ctx, next);
    })

    router.post('api_file_uploads', '/file/uploads/', async function (ctx, next) {
        await ctrl.images.uploads(ctx, next);
    })


    //新闻

    router.post('api_addnews', '/news/add', async function (ctx, next) {
        await ctrl.news.add(ctx, next);
    })
    router.post('api_news_list', '/news/index', async function (ctx, next) {
        await ctrl.news.list(ctx, next);
    })
    router.post('api_news_detail', '/news/detail', async function (ctx, next) {
        await ctrl.news.detail(ctx, next);
    })

    router.post('api_news_updata', '/news/updata', async function (ctx, next) {
        await ctrl.news.updata(ctx, next);
    })
    router.post('api_case_del', '/news/del', async function (ctx, next) {
        await ctrl.news.del(ctx, next);
    })


    // 新闻分类接口

    router.post('api_news_sort', '/newsSort/index', async function (ctx, next) {
        await ctrl.newsSort.index(ctx, next);
    })

    router.post('api_news_add_sort', '/newsSort/add', async function (ctx, next) {
        await ctrl.newsSort.add(ctx, next);
    });

    router.post('api_news_sort_detail', '/newsSort/detail', async function (ctx, next) {
        await ctrl.newsSort.detail(ctx, next);
    });

    router.post('api_news_sort_del', '/newsSort/del', async function (ctx, next) {
        await ctrl.newsSort.del(ctx, next);
    });

    router.post('api_news_sort_update', '/newsSort/update', async function (ctx, next) {
        await ctrl.newsSort.update(ctx, next);
    });


    //教程

    router.post('api_teach_add', '/teach/add', async function (ctx, next) {
        await ctrl.teach.add(ctx, next);
    })
    router.post('api_teach_list', '/teach/index', async function (ctx, next) {
        await ctrl.teach.list(ctx, next);
    })
    router.post('api_teach_detail', '/teach/detail', async function (ctx, next) {
        await ctrl.teach.detail(ctx, next);
    })

    router.post('api_teach_updata', '/teach/updata', async function (ctx, next) {
        await ctrl.teach.updata(ctx, next);
    })
    router.post('api_teach_del', '/teach/del', async function (ctx, next) {
        await ctrl.teach.del(ctx, next);
    })

    router.post('api_teach_item_add','/lession/add', async function (ctx, next) {
        await ctrl.lession.add(ctx, next);
    })

    router.post('api_teach_item_add','/lession/list', async function (ctx, next) {
        await ctrl.lession.list(ctx, next);
    })

    router.post('api_teach_item_detail', '/lession/detail', async function (ctx, next) {
        await ctrl.lession.detail(ctx, next);
    })

    router.post('api_teach_item_updata', '/lession/updata', async function (ctx, next) {
        await ctrl.lession.updata(ctx, next);
    })

    router.post('api_teach_item_del', '/lession/del', async function (ctx, next) {
        await ctrl.lession.del(ctx, next);
    })


    // 教程分类接口

    router.post('api_teach_sort', '/teachSort/index', async function (ctx, next) {
        await ctrl.teachSort.index(ctx, next);
    })

    router.post('api_teach_add_sort', '/teachSort/add', async function (ctx, next) {
        await ctrl.teachSort.add(ctx, next);
    });

    router.post('api_teach_sort_detail', '/teachSort/detail', async function (ctx, next) {
        await ctrl.teachSort.detail(ctx, next);
    });

    router.post('api_teach_sort_del', '/teachSort/del', async function (ctx, next) {
        await ctrl.teachSort.del(ctx, next);
    });

    router.post('api_teach_sort_update', '/teachSort/update', async function (ctx, next) {
        await ctrl.teachSort.update(ctx, next);
    });


    //广告
    router.post('api_teach_sort', '/ad/index', async function (ctx, next) {
        await ctrl.ad.index(ctx, next);
    })

    router.post('api_teach_add_sort', '/ad/add', async function (ctx, next) {
        await ctrl.ad.add(ctx, next);
    });

    router.post('api_teach_sort_detail', '/ad/detail', async function (ctx, next) {
        await ctrl.ad.detail(ctx, next);
    });

    router.post('api_teach_sort_del', '/ad/del', async function (ctx, next) {
        await ctrl.ad.del(ctx, next);
    });

    router.post('api_teach_sort_update', '/ad/update', async function (ctx, next) {
        await ctrl.ad.update(ctx, next);
    });

    // 广告分类接口

    router.post('api_teach_sort', '/adSort/index', async function (ctx, next) {
        await ctrl.adSort.index(ctx, next);
    })

    router.post('api_teach_add_sort', '/adSort/add', async function (ctx, next) {
        await ctrl.adSort.add(ctx, next);
    });

    router.post('api_teach_sort_detail', '/adSort/detail', async function (ctx, next) {
        await ctrl.adSort.detail(ctx, next);
    });

    router.post('api_teach_sort_del', 'adSort/del', async function (ctx, next) {
        await ctrl.adSort.del(ctx, next);
    });

    router.post('api_teach_sort_update', '/adSort/update', async function (ctx, next) {
        await ctrl.adSort.update(ctx, next);
    });


    //运用路由
    app.use(router.routes());

}
