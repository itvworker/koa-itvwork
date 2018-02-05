const fs = require('fs');

class Api {
    initRouter(name, router, controller) {
        let self = this;
        var pass = true;
        router.use(async(ctx, next) => {
            let url = self.urlpath(ctx.path);
            url = this.pathToLower(url);
            if (controller[url[0]]['type'] == 'path') {
                let children = controller[url[0]]['children'];
                if (children) {
                    if (!children[url[1]]['controller']['init']) {
                        let ct = children[url[1]]['controller'];
                        ct['init'] = (ctx, next) => {
                            ct['ctx'] = ctx;
                            ct['next'] = next;
                        }
                        return true;
                    }
                    pass = await children[url[1]]['controller'].init(ctx, next);
                }
            } else {
                if (!controller[url[0]]['controller']['init']) {
                    let ct = controller[url[0]]['controller'];
                    ct['init'] = (ctx, next) => {
                        ct['ctx'] = ctx;
                        ct['next'] = next;
                        return true;
                    }
                }
                pass = await controller[url[0]]['controller'].init(ctx, next);
                let children = controller[url[0]]['children'];
                if (children) {
                    if (url[1]) {
                        if (!children[url[1]]['controller']['init']) {
                            let ct = children[url[1]]['controller'];
                            ct['init'] = (ctx, next) => {
                                ct['ctx'] = ctx;
                                ct['next'] = next;
                            }
                            return true;
                        }
                        if (pass === true) {
                            pass = await children[url[1]]['controller'].init(ctx, next);
                        }

                    }
                }
            }
            if (pass === true) {
                await next();
            } else {
                ctx.body = pass;
            }

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
                    this.childrenRouter(i, router, controller[i]['children']);
                }
            } else {
                if (controller[i]['children']) {
                    this.childrenRouter(i, router, controller[i]['children']);
                } else {
                    this.routers(i, router, controller[i]);
                }
            }
        }
    }
    async childrenRouter(paths, router, controller) {
        for (let i in controller) {
            let url = paths + '/' + i;
            this.routers(url, router, controller[i]);
        }
    }
    async routers(paths, router, controller) {
        for (let i in controller['fun_name']) {
            if (controller['fun_name'][i] != "init") {
                router.post('/' + paths + '/' + controller['fun_name'][i].toLowerCase(), async(ctx, next) => {
                    await controller['controller'][controller['fun_name'][i]](ctx, next);
                });
            }
        };
    }
}

module.exports = new Api();
