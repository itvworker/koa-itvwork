const adSortModel = require(path.join(webconfig.v1, 'adSort.js'));
const imgModel = require(path.join(webconfig.v1, 'images.js'));

class AdSort {

    async index() {
        let post = this.ctx.request.body;
        let data = await adSortModel.find(post['data']);
        this.ctx.body = tool.aesData(data, post.key);
    }

    async add() {
        let data = this.ctx.request.body;
        this.ctx.body = tool.aesData(await adSortModel.add(data.data), post.key);
    }

    async detail() {
        let post = this.ctx.request.body;
        let result = await adSortModel.findone(post['data']);
        this.ctx.body = tool.aesData(result, post.key);
    }

    async del() {
        let post = this.ctx.request.body;
        let result = await adSortModel.del(post.data);
        this.ctx.body = tool.aesData(result, post.key);
    }
    async update() {
        let post = this.ctx.request.body;
        let detail = await adSortModel.findone({
            _id: post.data._id
        });
        this.ctx.body = tool.aesData(detail, post.key);
    }

}

module.exports = new AdSort();
