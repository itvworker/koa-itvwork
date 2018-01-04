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
const busboy = require('koa-busboy')

module.exports =async function (app) {
  // router.use(koajson());
  let controller=await ctrl.readdirSync(webconfig.apiadmin);
  controller=routerTool.funName(controller);
  api.initRouter('apiadmin', router, controller);
  app.use(router.routes());

}
