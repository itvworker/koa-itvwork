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
    return async (ctx, next)=> {
        let token="";
        let data = ctx.request.body;
        const ses = require(path.join(webconfig.model + '/v1', 'session.js'));
      
        if(data['token']){

              ctx.session= await ses.findOne({_id:data['token']});
              console.log(ctx.session);
        }
        return next();
    };
};
