class Router {

    controller(router, controller, name) {
        if (controller['controller']['index']) {
          console.log(name);
          router.get('/' + name, async(ctx, next) => {
                await controller['controller']['index']();
            });
        }
        let fun_name = controller['fun_name'];
        let c = controller['controller'];
        if (fun_name) {
            for (let a in fun_name) {
                if(!(name=="index"&&fun_name[a]=="index")){
                  router.get(['/' + name + '/' + fun_name[a],'/' + name + '/' + fun_name[a] + '/*'], async(ctx, next) => {
                      await c[fun_name[a]]();
                  })
                }
            }
        }
    }

    async index(router, child, i) {
      console.log(child);
        if (child['index']['index']) {
            router.get('/' + i, async(ctx, next) => {
                await child['index']['index']();
            })
        }
    }


    async initRouter(router, controller) {
        router.use(async(ctx, next) => {
            let path = ctx.path;
            let arr = path.split('/');
            arr.splice(0, 1);
            if (arr.length > 0 && arr[0]) {
                if (controller[arr[0]]['type'] == "Controller" && controller[arr[0]]['children']) {
                    let child = controller[arr[0]]['children'];
                    controller[arr[0]].init(cxt, next);
                    if (arr[1] && child[arr[1]]['controller']) {
                        child[arr[1]]['controller'].init()
                    }
                }
                if (controller[arr[0]]['type'] == "Controller" && (!controller[arr[0]]['children'])) {
                    controller[arr[0]]['controller'].init(ctx, next);
                }

                if (controller[arr[0]]['type'] != "Controller") {
                    let child = controller[arr[0]]['children'];
                    if (arr[1] && child[arr[1]]) {
                        child[arr[1]]['controller'].init(ctx, next);
                    }
                }
            } else {
                controller.index['controller'].init(ctx, next);
            }


            await next()


        })
    }
}

module.exports = new Router();
