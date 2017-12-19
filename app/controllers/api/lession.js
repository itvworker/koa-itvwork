const lessionModel = require(path.join(webconfig.v1,'lession.js'));


class TeachItem {
    constructor(ctx,next) {

    }
    async add(ctx,next){
       let post=ctx.request.body;
       ctx.body= await lessionModel.add(post.data);

    }
    async list(ctx,next) {
        let post=ctx.request.body;
        ctx.body=await lessionModel.find(post.data);
    }

    async detail(ctx,next){
        let post=ctx.request.body;
        ctx.body=await lessionModel.findOne(post.data);
    }

    async updata(ctx,next){
        let post = ctx.request.body;
        ctx.body= await lessionModel.updata(post.data);
    }

    async del(ctx, next) {
        let post = ctx.request.body;
        ctx.body = await lessionModel.del(post.data);
    }
}

module.exports=new TeachItem();
