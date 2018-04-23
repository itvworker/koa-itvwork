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
    return async function app(ctx, next) {
        let data = ctx.request.body;
        if (!data['fields']) {
            let result = {};
            let key = '';
            let res="";
            if (!data['key']) {
                ctx.request.body = {
                    err_code: 104,
                    err_msg: '数据格式错误'
                };
            }
            try {
                key = rsa.decrypt(data['key']);
                result['key']=key;

            } catch (e) {
                ctx.request.body = {
                    err_code: 105,
                    err_msg: '公钥加密的信息无法解密，请检查你的公钥是否正确'
                };
            }

            try {
                res = JSON.parse(CryptoJS.AES.decrypt(data.data, key).toString(CryptoJS.enc.Utf8));


            } catch (e) {
                ctx.request.body = {
                    err_code: 106,
                    err_msg: '数据解密失败'
                };
            }
            result['data'] = res;
            if (data.token) {
                let token = JSON.parse(rsa.decrypt(data['token']));
                result['token'] = token.token;
                result['timetemp'] = token.timetemp;
            }
            ctx.request.body = result;
        }
        if (data['fields']) {
            var db = JSON.parse(rsa.decrypt(data['fields']['rsa']));
            db = JSON.parse(db);
            if (data['fields']['data']) {
                db['data'] = JSON.parse(data['fields']['data']);

                ctx.request.body = db;
            } else {

                ctx.request.body = db;
            }
        }

        return next();
    };
};
