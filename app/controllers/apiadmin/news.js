const newsModel = require(path.join(webconfig.v1, 'news.js'));


class News {
    async add(ctx, next) {
        let post = this.ctx.request.body;
        this.ctx.body = tool.aesData(await newsModel.add(post.data), post.key);

    }
    async list(ctx, next) {
        let post = this.ctx.request.body;
        this.ctx.body = tool.aesData(await newsModel.find(post.data), post.key);
    }

    async detail(ctx, next) {
        let post = ctx.request.body;
        this.ctx.body = tool.aesData(await newsModel.findOne(post.data), post.key);
    }

    async updata(ctx, next) {
        let post = ctx.request.body;
        this.ctx.body = tool.aesData(await newsModel.updata(post.data), post.key);
    }

    async del(ctx, next) {
        let post = ctx.request.body;
        this.ctx.body = tool.aesData(await newsModel.del(post.data), post.key);
    }
}

module.exports = new News();
