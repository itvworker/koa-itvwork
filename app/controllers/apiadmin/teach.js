const teachModel = require(path.join(webconfig.v1, 'teach.js'));


class Teach {
    async index() {
        let post = this.ctx.request.body;
        this.ctx.body = tool.aesData(await teachModel.find(post.data),post.key);
    }
    async msg(){
      let post = this.ctx.request.body;
        this.ctx.body = tool.aesData(await teachModel.findOne(post.data),post.key);

    }
    async add(){
      let post=this.ctx.request.body;
      this.ctx.body = tool.aesData(await teachModel.add(post.data),post.key);
    
    }
}


module.exports = new Teach();
