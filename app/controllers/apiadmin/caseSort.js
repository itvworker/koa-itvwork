const caseSortModel = require(path.join(webconfig.v1, 'caseSort.js'));
const imgModel = require(path.join(webconfig.v1, 'images.js'));

class CaseSort {
    async index() {
        let post = ctx.request.body;
        this.ctx.body = tool.aesData(await caseSortModel.find(post['data']), post.key);
    }
    async add() {
        let data = ctx.request.body;
        this.ctx.body = tool.aesData(await caseSortModel.add(data.data), post.key);
    }
    async detail() {
        let post = ctx.request.body;
        let result = await caseSortModel.findOne(post['data']);
        this.ctx.body = tool.aesData(result, post.key);
    }
    async del(ctx, next) {
        let post = ctx.request.body;
        let result = await caseSortModel.del(post.data);
        this.ctx.body = tool.aesData(result, post.key);
    }
    async update() {
        let post = ctx.request.body;
        let result = await caseSortModel.findone({
            _id: post.data._id
        });
        this.ctx.body = tool.aesData(result, post.key);
    }
}

module.exports = new CaseSort();
