const teachModel = require(path.join(webconfig.v1, 'teach.js'));


class Teach {
    async index() {
        let post = this.ctx.request.body;
        this.ctx.body=await teachModel.find(post.data);
    }
    async msg(){
      let post = this.ctx.request.body;
        this.ctx.body=await teachModel.findOne(post.data);

    }
    async add(){
      let post=this.ctx.request.body;
      this.ctx.body=await teachModel.add(post.data);
    }
}


module.exports = new Teach();
