const caseModel = require(path.join(webconfig.v1,'case.js'));


class Case {
    constructor(ctx,next) {

    }
    async add(ctx,next){
       let post=ctx.request.body;
       ctx.body= await caseModel.add(post.data);

    }
    async list(ctx,next) {
        let post=ctx.request.body;
        ctx.body=await caseModel.find(post.data);


    }
    
    async detail(ctx,next){
        let post=ctx.request.body;
        ctx.body=await caseModel.findOne(post.data);
    }

    async updata(ctx,next){
        let post = ctx.request.body;
        ctx.body= await caseModel.updata(post.data);
    }
}

module.exports=new Case();
