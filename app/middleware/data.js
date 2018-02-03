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
            data = JSON.parse(rsa.decrypt(data['rsa']));
            ctx.request.body = data;
        }
        if (data['fields']) {
            let arrdata = {
                data: {},
                token: '',
                timetemp: '',
                type: ''
            }
            let db = JSON.parse(rsa.decrypt(data['fields']['rsas']));
            arrdata.token = db.token,
            arrdata.timetemp = db.timetemp,
            arrdata.type = db.type;
            arrdata.data = JSON.parse(data['fields']['data']);
            data = arrdata;
            ctx.request.body = data;
        }

        return next();
    };
};
