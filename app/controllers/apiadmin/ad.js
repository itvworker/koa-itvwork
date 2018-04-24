const adModel = require(path.join(webconfig.v1, 'ad.js'));


class Ad {
    async add() {
        let post = this.ctx.request.body;
        this.ctx.body = tool.aesData(await adModel.add(post.data), post.key)
    }
    async index() {
        let post = this.ctx.request.body;
        this.ctx.body = tool.aesData(await adModel.find(post.data), post.key);
    }

    async detail() {
        let post = this.ctx.request.body;
        this.ctx.body = tool.aesData(await adModel.findOne(post.data), post.key);

    }

    async updata() {
        let post = this.ctx.request.body;
        this.ctx.body = tool.aesData(await adModel.updata(post.data), post.key);
    }

    async del() {
        let post = this.ctx.request.body;
        this.ctx.body = tool.aesData(await adModel.del(post.data), post.key);

    }
}

module.exports = new Ad();
