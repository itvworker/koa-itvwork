var Router = require('koa-router');
var router = new Router({
    prefix: '/apiadmin'
});
var controller = {};
var fs = require('fs');
var path = require('path');
const koajson = require('koa-json');
const ctrl = require('../common/controller.js');
const api = require('../common/api.js');

const koaRouter = require('koa-router')
const busboy = require('koa-busboy');
const rsa=require(path.join(webconfig.common, 'rsa.js'));

module.exports =async function (app) {
  // router.use(koajson());
  let controller=await ctrl.readdirSync(webconfig.apiadmin);
  controller=ctrl.funName(controller);
  router.use(async function (ctx, next) {
      let data = ctx.request.body;
      if(data['rsa']){
      data= JSON.parse(rsa.decrypt(data['rsa']));
      ctx.request.body=data;
      console.log(data);
      }


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

  api.initRouter('apiadmin',router,controller);
  api.bulidRouter(router,controller);
  app.use(router.routes());
}
