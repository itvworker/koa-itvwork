const fs = require('fs');

class Router {
  controller(router, controller, name) {
    router.get('/' + name, async (ctx, next) => {
      await controller['controller']['index']();
    });
    router.post('/' + name, async (ctx, next) => {
      await controller['controller']['index']();
    });

    if (controller['controller']['index']) {
      router.get('/' + name, async (ctx, next) => {
        await controller['controller']['index']();
      });
      router.post('/' + name, async (ctx, next) => {
        await controller['controller']['index']();
      });
    }
    let fun_name = controller['fun_name'];
    let c = controller['controller'];
    if (fun_name) {

      for (let a in fun_name) {
        if (!(name == "index" && fun_name[a] == "index")) {
          router.get([
            '/' + name + '/' + fun_name[a],
            '/' + name + '/' + fun_name[a] + '/*'
          ], async (ctx, next) => {
            await c[fun_name[a]]();
          });
          router.post([
            '/' + name + '/' + fun_name[a],
            '/' + name + '/' + fun_name[a] + '/*'
          ], async (ctx, next) => {
            await c[fun_name[a]]();
          })
        }
      }
    }
  }

  async index(router, child, i) {

    if (child['index']['controller']['index']) {
      router.get('/' + i, async (ctx, next) => {
        await child['index']['controller']['index']();
      })
    }
  }

  //初始化控制器的init
  async initRouter(router, controller) {
    router.use(async (ctx, next) => {
      let path = ctx.path;
      let arr = path.split('/');
      arr.splice(0, 1);
      if (arr.length > 0 && arr[0]) {
        if (controller[arr[0]]['type'] == "Controller" && controller[arr[0]]['children']) {
          let child = controller[arr[0]]['children'];
          child['index']['controller'].init(ctx, next)
          if (arr[1] && child[arr[1]]['controller']) {
            child[arr[1]]['controller'].init(ctx, next)
          }
        }
        if (controller[arr[0]]['type'] == "Controller" && (!controller[arr[0]]['children'])) {
          controller[arr[0]]['controller'].init(ctx, next);
        }
        if (controller[arr[0]]['type'] != "Controller") {
          let child = controller[arr[0]]['children'];
          child['index']['controller'].init(ctx, next);
          if (arr[1] && child[arr[1]]) {
            child[arr[1]]['controller'].init(ctx, next);
          }
        }
      } else {
        controller.index['controller'].init(ctx, next);
      }
      await next();
    })
  }

  //获取控制器的方法名
  funName(controller) {
    for (let i in controller) {
      if (controller[i]['type'] == 'Controller') {
        let data = fs.readFileSync(controller[i]['path'], "utf-8");
        let arr = [];
        data.replace(/async[ ]+[\w|_]+/ig, function(val) {
          let vs = val.replace('async', '');
          vs = vs.replace(/\s+/g, "");
          if(vs !='init'){
                arr.push(vs);
          }
          return val;
        })
        controller[i]['fun_name'] = arr;
        controller = this.childFunName(controller, i);
      } else {
        controller = this.childFunName(controller, i);
      }
    }
    return controller;
  }
  //获取子文件夹控制器方法
  childFunName(controller, i) {
    let child = controller[i]['children'];
    if (child) {
      for (let a in child) {
        let arr = [];
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
    return controller;
  }

  async bulidRouter(router, controller) {
    for (let i in controller) {
      if (controller[i]['type'] == "Controller") {
        if (controller[i]['children']) {
          let child = controller[i]['children'];
          this.index(router, controller[i]['children'], i);
          for (let a in child) {

            this.controller(router, child[a], i + '/' + a);
          }
        } else {
          this.controller(router, controller[i], i);
        }
      } else {
        let child = controller[i]['children'];
        this.index(router, controller[i]['children'], i);
        for (let a in child) {
          this.controller(router, child[a], i + '/' + a);
        }
      }
    }

  }

  async oneRecord(){
    let controller={};
    let paths={};
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
    return {"controller":controller,"paths":paths }
  };


}

module.exports = new Router();
