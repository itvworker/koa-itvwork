const newsModel = require(path.join(webconfig.v1,'news.js'));


class News {
    constructor(ctx,next) {

    }
    async add(ctx,next){
       let post=ctx.request.body;
       ctx.body= await newsModel.add(post.data);

    }
    async list(ctx,next) {
        let post=ctx.request.body;
        ctx.body=await newsModel.find(post.data);

    }
    
    async detail(ctx,next){
        let post=ctx.request.body;
        ctx.body=await newsModel.findOne(post.data);
    }

    async updata(ctx,next){
        let post = ctx.request.body;
        ctx.body= await newsModel.updata(post.data);
    }

    async del(ctx, next) {
        let post = ctx.request.body;
        ctx.body = await newsModel.del(post.data);
    }
}

module.exports=new News();
