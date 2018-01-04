const fs = require('fs');

class Api {
  async initRouter(name,router,controller) {
    let self=this;
    console.log(router);
    router.use(async (ctx, next) => {
        let url=self.urlpath(ctx.path);
        console.log(url,'url------------');
        for(let i in controller){


        }
    })
  }
  urlpath(url){
    let arr = url.split('/');
    arr=arr.slice(2,-1);
    return arr;

  }

}

module.exports = new Api();
