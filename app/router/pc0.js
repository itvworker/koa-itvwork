var Router = require('koa-router');
var router = new Router();

var controller = {};

var fs = require('fs');
var path = require('path');
const koajson = require('koa-json');
module.exports = function(app) {
  router.use(koajson());

  let paths = [];
  fs.readdirSync(webconfig.pc).forEach(function(file) {
    if (file.indexOf('.js') != -1) {
      var ctrlName = file.split('.')[0];
      // ctrl[ctrlName] = require(path.join(webconfig.pc, file));
      controller[ctrlName] = {
        type: 'Controller',
        controller: require(path.join(webconfig.pc, file)),
        path:path.join(webconfig.pc, file)
      }
    } else {
      let urlpath = webconfig.pc + '/' + file;
      paths.push({name: file, path: urlpath});
    }
  });

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
              path:path.join(urlpath, files)
            };
          } else {
            controller[paths[i]['name']]['children'][cname] = {
              type: 'Controller',
              controller: require(path.join(urlpath, files)),
                path:path.join(urlpath, files)
            };
          }
        }
      })
    }
  }




  router.use(async (ctx, next) => {
    let path = ctx.path;
    let arr=ctx.path.split('/');
        arr.slice(0,1);
      if(path=="/"){
         controller.index['controller'].init(ctx,next);
      }else{

      }

      await next();

    // let url = "";
    // let path = ctx.url.substr(1, ctx.url.length);
    // path = path.split('/');
    // if (!path[0]) {
    //   url = await ctrl.index.init(ctx, next);
    // } else {
    //   url = await ctrl[path[0]].init(ctx, next);
    // }
    //
    // if (url === true) {
    //   await next();
    // } else {
    //   if (url === false) {
    //     ctx.redirect('/');
    //   } else {
    //     ctx.redirect(url);
    //   }
    // }


  });


  //判断是否是ie以下
  // router.use(async function (ctx, next) {
  //     var userAgent = ctx.request.header["user-agent"]; 取得浏览器的userAgent字符串
  //     var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; 判断是否IE浏览器
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

  //     } isIE end

  //     ctx.isIE8 = false;
  //     next();
  // })

  //首页
  // router.get('/.well-known/acme-challenge/:id', async function (ctx, next) {
  //     let param=ctx.params;
  //     ctx.body = '73mM5uVWUwISukWvHxVXlucoTBCQb_AzZ45y96_P3R4.-fi2OBKHYLvi_nrDi1cWDtu1H3QTM8V3t9ind_UDros';
  //
  // });

  //注册



  router.get('/adminmanger', async (ctx, next) => {
    await ctx.render('admin');
  });

  router.get('/', async (ctx, next) => {

    await controller.index['controller'].index();
  });

  router.get('/:p1',async (ctx,next)=>{
    let p1=ctx.request.params.p1;
    console.log(p1,'---------------aaaaaaaaaaaa');
    if(controller[p1]['type']=="Controller"){
        if(controller[p1]['controller']['index']){
            await controller[p1].index();
        }else{
            await  controller[p1]['children']['index']['index']();
        }
    }

  });

  router.get('/:p1/:p2',async (ctx,next)=>{
      let arr=ctx.request.params;
    

  })

  // router.get('/reg', async (ctx, next) => {
  //   await ctrl.reg.index(ctx, next);
  // });
  // // router.get('/user/setperson', async function(ctx, next) {
  // //     await ctrl.user.updataPerson(ctx, next);
  // // });
  //
  // //案例
  // router.get('/case', async (ctx, next) => {
  //   await ctrl.case.index();
  // });
  // router.get('/case/index/:sort', async (ctx, next) => {
  //   await ctrl.case.index();
  // });
  // router.get('/case/msg/:id', async (ctx, next) => {
  //   await ctrl.case.msg();
  // })
  //
  // //学堂
  // router.get('/teach', async (ctx, next) => {
  //   await ctrl.teach.index(ctx, next);
  // });
  //
  // router.get('/news', async (ctx, next) => {
  //   await ctrl.news.index(ctx, next);
  // });

  //运用路由
  app.use(router.routes());

}
