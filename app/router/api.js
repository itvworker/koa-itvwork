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
const tovalt=require(path.join(webconfig.mid, 'token.js'));
const rsadata=require(path.join(webconfig.mid, 'data.js'));
const session=require(path.join(webconfig.mid, 'session.js'));
const cors = require('@koa/cors');

module.exports =async function (app) {
  // router.use(koajson());
  let controller=await ctrl.readdirSync(webconfig.apiadmin);
  controller=ctrl.funName(controller);
  router.use(cors());//允许跨域
  // router.use(tovalt());
  router.use(rsadata());//解密数据
  router.use(session());//验证权限
  api.initRouter('apiadmin',router,controller);
  api.bulidRouter(router,controller);
  app.use(router.routes());

}
