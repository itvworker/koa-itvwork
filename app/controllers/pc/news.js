const newsModel = require(path.join(webconfig.v1, 'news.js'));
const fs = require('fs');

class News {

    init(ctx, next) {
        this.ctx = ctx;
        this.next = next;
        this.params=tool.paramArr(ctx.path);
    }
    async index(ctx, next) {

        let query = this.ctx.query;
        let search = {};
        if (this.params.length>3) {
            search['sort'] ={
              id:this.params[3]
            };
        }

        let list = await newsModel.find({
            query: search,
            num: 16,
            page: 1
        });
        let url = tool.pageurl(this.ctx.path, query);

        let page = new Page({
            pot: 13,
            url: url,
            page: query.page ? query.page : 1,
            num: 12,
            count: 30000
        })

        await this.ctx.render('news', {
            data: list.data.result,
            page: page.html()
        });



    }

    async reg(ctx, next) {



    }



}


module.exports = new News();
