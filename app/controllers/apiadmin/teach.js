const teachModel = require(path.join(webconfig.v1, 'teach.js'));


class Teach {
    async index() {
        let post = this.ctx.request.body;
        console.log(post.data);
        this.ctx.body=await teachModel.find(post.data);

    }
}


module.exports = new Teach();
