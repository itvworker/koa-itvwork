const imgModel = require(path.join(webconfig.v1, 'images.js'));

class Images {
    constructor(ctx,next) {

    }
    async list(ctx,next){
        let post = ctx.request.body;
        ctx.body=await imgModel.find(post.data);

       // await ctx.render('user',{title:1000});
    }

    async uploads(ctx,next){
        let post = ctx.request.body;
        ctx.body={err_code:200,err_msg:1};
        //ctx.body=await imgModel.uploads(post.data);

    }




}

module.exports=new Images();