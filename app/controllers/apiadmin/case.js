const caseModel = require(path.join(webconfig.v1, 'case.js'));
class Case {
    async add() {
        let post = this.ctx.request.body;
        this.ctx.body = tool.aesData(await caseModel.add(post.data), post.key);

    }
    async list() {
        let post = this.ctx.request.body;
        this.ctx.body = tool.aesData(await caseModel.find(post.data), post.key);


    }
    async detail() {
        let post = this.ctx.request.body;
        this.ctx.body = tool.aesData(await caseModel.findOne(post.data), post.key);
    }

    async updata() {
        let post = this.ctx.request.body;
        this.ctx.body = tool.aesData(await caseModel.updata(post.data), post.key);
    }

    async del() {
        let post = this.ctx.request.body;
        this.ctx.body = tool.aesData(await caseModel.del(post.data), post.key);
    }
}

module.exports = new Case();
