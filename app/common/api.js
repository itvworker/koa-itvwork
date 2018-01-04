const fs = require('fs');

class Api {
  async initRouter(name, router, controller) {
    let self = this;

    router.use(async (ctx, next) => {
      let url = self.urlpath(ctx.path);
      url = this.pathToLower(url);
      if (url.length <= 0)
        next();
      if (!controller[url[0]])
        next();
      if (controller[url[0]]['type'] == 'path') {
        let children = controller[url[0]]['children'];
        if (children) {
          children[url[1]]['controller'].init();
        }
      } else {
        await controller[url[0]]['controller'].init(ctx, next);
        let children = controller[url[0]]['children'];
        if (children) {
          if (url[1]) {
            children[url[1]]['controller'].init();
          }
        }
      }

      next();
    })
  }
  urlpath(url) {
    let arr = url.split('/');
    arr.splice(0, 2);
    return arr;
  }
  pathToLower(url) {
    let l = url.length;
    for (let i = 0; i < l; i++) {
      url[i] = url[i].toLowerCase();
    }
    return url;
  }

  async bulidRouter(router, controller) {
    for (let i in controller) {
      if (controller[i]['type'] == "path") {
        if (controller[i]['children']) {
            this.childrenRouter(i,router,controller[i]['children']);
        }
      } else {
        if (controller[i]['children']) {
            this.childrenRouter(i,router,controller[i]['children']);
        }else{
           this.routers(i,router,controller[i]);
        }
      }
    }
  }
async childrenRouter(paths,router,controller){
    for(let i in controller){
      let url=paths+'/'+i;
        this.routers(url,router,controller[i]);
    }
}
async routers(paths,router,controller){
    for(let i in controller['fun_name']){
      if(controller['fun_name'][i]!="init"){
        router.get('/'+paths+'/'+controller['fun_name'][i].toLowerCase(), async (ctx, next) => {
        // ctx.body=paths+'/'+controller['fun_name'][i].toLowerCase();
        // console.log(i);
        await controller['controller'][controller['fun_name'][i]]();
        });

      }
    };

}


}

module.exports = new Api();
