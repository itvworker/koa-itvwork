var Router = require('koa-router');
var router = new Router({
    prefix: '/api'
});
var ctrl = {};
var fs = require('fs');
var path = require('path');

const koaRouter = require('koa-router')
const busboy = require('koa-busboy')

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

    //接口首页
    router.get('api', '/', async function (ctx, next) {

    });
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

    router.post('api_case_sort', '/caseSort/index', async function (ctx, next) {
        await ctrl.caseSort.index(ctx, next);

    })

    router.post('api_case_sort', '/caseSort/index', async function (ctx, next) {
        await ctrl.caseSort.updata(ctx, next);

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


    //运用路由
    app.use(router.routes());

}