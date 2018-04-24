const caseSortModel = require(path.join(webconfig.v1, 'newsSort.js'));
const imgModel = require(path.join(webconfig.v1, 'images.js'));

class NewsSort {

    async index() {
        let post = this.ctx.request.body;
        let data = await caseSortModel.find(post['data']);
        this.ctx.body = tool.aesData(data, post.key);


    }

    async add() {
        let post = this.ctx.request.body;
        this.ctx.body = tool.aesData(await caseSortModel.add(data.data), post.key);

    }

    async detail() {
        let post = this.ctx.request.body;
        let result = await caseSortModel.findone(post['data']);
        this.ctx.body = tool.aesData(result, post.key);

    }

    async del() {
        let post = this.ctx.request.body;
        let result = await caseSortModel.del(post.data);
        this.ctx.body = tool.aesData(result, post.key);

    }


    async update() {
        let post = this.ctx.request.body;
        let detail = await caseSortModel.findone({
            _id: post.data._id
        });
        this.ctx.body = tool.aesData(result, post.key);
    }

}

module.exports = new NewsSort();
