var Router = require('koa-router');
var router = new Router({
    prefix: '/plane'
});
var controller = {};
var fs = require('fs');
var path = require('path');
const koajson = require('koa-json');
const ctrl = require('../common/controller.js');
const api = require('../common/api.js');

const koaRouter = require('koa-router')
const busboy = require('koa-busboy');
const cors = require('@koa/cors');
module.exports =async function (app) {
  // router.use(koajson());
  let controller=await ctrl.readdirSync(webconfig.plane);
  controller=ctrl.funName(controller);
  router.use(cors());//允许跨域
  api.initRouter('plane',router,controller);
  api.bulidRouter(router,controller);
  app.use(router.routes());
}
