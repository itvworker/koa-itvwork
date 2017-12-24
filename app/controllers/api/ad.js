const adModel = require(path.join(webconfig.v1, 'ad.js'));


class Ad {
    init(ctx,next){
      this.ctx=ctx;
      this.next=next;
    }
    async add(ctx, next) {
        let post = ctx.request.body;
        ctx.body = await adModel.add(post.data);

    }
    async index(ctx, next) {
        let post = ctx.request.body;
        ctx.body = await adModel.find(post.data);

    }

    async detail(ctx, next) {
        let post = ctx.request.body;
        ctx.body = await adModel.findOne(post.data);
    }

    async updata(ctx, next) {
        let post = ctx.request.body;
        ctx.body = await adModel.updata(post.data);
    }

    async del(ctx, next) {
        let post = ctx.request.body;
        ctx.body = await adModel.del(post.data);
    }
}

module.exports = new Ad();
