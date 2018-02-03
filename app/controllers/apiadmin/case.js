const caseModel = require(path.join(webconfig.v1,'case.js'));
class Case {
    async add(){
       let post=this.ctx.request.body;
       this.ctx.body= await caseModel.add(post.data);

    }
    async list() {
        let post=this.ctx.request.body;
        console.log(post);
        this.ctx.body=await caseModel.find(post.data);

    }
    async detail(){
        let post=this.ctx.request.body;
        this.ctx.body=await caseModel.findOne(post.data);
    }

    async updata(){
        let post = this.ctx.request.body;
        this.ctx.body= await caseModel.updata(post.data);
    }

    async del() {
        let post = this.ctx.request.body;
        this.ctx.body = await caseModel.del(post.data);
    }
}

module.exports=new Case();
