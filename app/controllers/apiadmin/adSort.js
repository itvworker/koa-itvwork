const adSortModel = require(path.join(webconfig.v1, 'adSort.js'));
const imgModel = require(path.join(webconfig.v1, 'images.js'));

class AdSort {


    async index() {
        let post = this.ctx.request.body;
        let data = await adSortModel.find(post['data']);
        this.ctx.body = data;
      }

    async add() {
        let data=this.ctx.request.body;
        this.ctx.body =  await adSortModel.add(data.data);
    }

    async detail() {
        let post = this.ctx.request.body;

        let result = await adSortModel.findone(post['data']);
        this.ctx.body = result;
    }

    async del() {
        let post = this.ctx.request.body;
        let result = await adSortModel.del(post.data);
        this.ctx.body = result;
    }


    async update(){
        let post = this.ctx.request.body;
        let detail = await adSortModel.findone({_id:post.data._id});
    }

}

module.exports = new AdSort();
