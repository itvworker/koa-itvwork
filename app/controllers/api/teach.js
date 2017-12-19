const teachModel = require(path.join(webconfig.v1,'teach.js'));


class Teach {
    constructor(ctx,next) {

    }
    async add(ctx,next){
       let post=ctx.request.body;

       ctx.body= await teachModel.add(post.data);

    }
    async list(ctx,next) {
        let post=ctx.request.body;
        ctx.body=await teachModel.find(post.data);

    }

    async detail(ctx,next){
        let post=ctx.request.body;
        ctx.body=await teachModel.findOne(post.data);
    }

    async updata(ctx,next){
        let post = ctx.request.body;
        ctx.body= await teachModel.updata(post.data);
    }

    async del(ctx, next) {
        let post = ctx.request.body;
        ctx.body = await teachModel.del(post.data);
    }
}

module.exports=new Teach();
