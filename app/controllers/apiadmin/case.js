const caseModel = require(path.join(webconfig.v1,'case.js'));
class Case {
  init(ctx,next){
    this.ctx=ctx;
    this.next=next;
  }
    async add(ctx,next){
       let post=this.ctx.request.body;
       this.ctx.body= await caseModel.add(post.data);

    }
    async list(ctx,next) {
        let post=this.ctx.request.body;
        this.ctx.body=await caseModel.find(post.data);

    }
    async detail(ctx,next){
        let post=this.ctx.request.body;
        this.ctx.body=await caseModel.findOne(post.data);
    }

    async updata(ctx,next){
        let post = this.ctx.request.body;
        this.ctx.body= await caseModel.updata(post.data);
    }

    async del(ctx, next) {
        let post = this.ctx.request.body;
        this.ctx.body = await caseModel.del(post.data);
    }
}

module.exports=new Case();
