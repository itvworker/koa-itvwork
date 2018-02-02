const caseSortModel = require(path.join(webconfig.v1, 'teachSort.js'));
const imgModel = require(path.join(webconfig.v1, 'images.js'));

class TeachSort {
  init(ctx,next){
    this.ctx=ctx;
    this.next=next;
  }

    async index(ctx, next) {
        let post = ctx.request.body;
        let data = await caseSortModel.find(post['data']);
        ctx.body = data;

    }

    async add(ctx, next) {
        let data=ctx.request.body;
        ctx.body =  await caseSortModel.add(data.data);
    }

    async detail(ctx, next) {
        let post = ctx.request.body;
        let result = await caseSortModel.findone(post['data']);
        ctx.body = result;
    }

    async del(ctx, next) {
        let post = ctx.request.body;
        let result = await caseSortModel.del(post.data);
        ctx.body = result;
    }


    async update(){
        let post = ctx.request.body;
        let detail = await caseSortModel.findone({_id:post.data._id});
    }

}

module.exports = new TeachSort();
