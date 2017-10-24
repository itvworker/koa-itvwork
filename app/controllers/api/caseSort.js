const caseSortModel = require(path.join(webconfig.v1, 'caseSort.js'));
const imgModel = require(path.join(webconfig.v1, 'images.js'));

class CaseSort {
    constructor(ctx, next) {

    }

    async index(ctx, next) {
        let post = ctx.request.body;
        let data = await caseSortModel.find(post['data']);
        ctx.body = data;

    }

    async add(ctx, next) {
        let post = ctx.request.body;
        let img = await imgModel.base64({
            use: 1,
            path: post['data']['cover'],
            sort: 'caseSort'
        });

        let data = await caseSortModel.add({
            title: post['data']['title'],
            cover: {
                _id: img.data._id,
                url: img.data.path
            }
        });
        ctx.body = data;
        // await ctx.render('user',{title:1000});
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

module.exports = new CaseSort();