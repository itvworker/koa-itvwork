const adModel = require(path.join(webconfig.v1, 'ad.js'));


class Ad {
    async add() {
        let post = this.ctx.request.body;
        this.ctx.body = await adModel.add(post.data);

    }
    async index() {
        let post = this.ctx.request.body;
        this.ctx.body = await adModel.find(post.data);

    }

    async detail() {
        let post = this.ctx.request.body;
        this.ctx.body = await adModel.findOne(post.data);
    }

    async updata() {
        let post = this.ctx.request.body;
        this.ctx.body = await adModel.updata(post.data);
    }

    async del() {
        let post = this.ctx.request.body;
        this.ctx.body = await adModel.del(post.data);
    }
}

module.exports = new Ad();
