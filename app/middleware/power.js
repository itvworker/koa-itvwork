/**
 * CORS middleware
 *
 * @param {Object} [options]
 *  - {String|Function(ctx)} origin `Access-Control-Allow-Origin`, default is request Origin header
 *  - {String|Array} allowMethods `Access-Control-Allow-Methods`, default is 'GET,HEAD,PUT,POST,DELETE,PATCH'
 *  - {String|Array} exposeHeaders `Access-Control-Expose-Headers`
 *  - {String|Array} allowHeaders `Access-Control-Allow-Headers`
 *  - {String|Number} maxAge `Access-Control-Max-Age` in seconds
 *  - {Boolean} credentials `Access-Control-Allow-Credentials`
 *  - {Boolean} keepHeadersOnError Add set headers to `err.header` if an error is thrown
 * @return {Function} cors middleware
 * @api public
 */

module.exports =  function(options) {
    return async function  app(ctx, next) {
        let data = ctx.request.body;
        let url = ctx.request.url.substring(1, ctx.request.url.length).split('/');
        ctx.session = require(path.join(webconfig.model + '/v1', 'session.js'));
        let token = '';
        switch (url[1]) {
            case 'login':
                return next();
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
                    if (mess.err_code == 200&&mess['data']) {
                        ctx.admin = mess.data.data;
                        return next();
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
    };
};
