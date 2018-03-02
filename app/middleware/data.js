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
const rsa = require(path.join(webconfig.common, 'rsa.js'));
module.exports = function(options) {
    return function app(ctx, next) {
        let data = ctx.request.body;
        if (data['rsa']) {
            let res = JSON.parse(rsa.decrypt(data['rsa']));
            if(!data['data']){
              ctx.request.body=res;
            }else{
              ctx.request.body ={
                rsa:res,
                data:data['data']
              };
            }

        }
        if (data['fields']) {
            let db = JSON.parse(rsa.decrypt(data['fields']['rsa']));
            if(data['fields']['data']){
                let data = JSON.parse(data['fields']['data']);
                ctx.request.body = {rsa:db,data:data};
            }else{
                ctx.request.body = db;
            }
        }
        return next();
    };
};
