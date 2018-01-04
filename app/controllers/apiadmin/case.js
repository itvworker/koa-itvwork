const adModel = require(path.join(webconfig.v1, 'ad.js'));
const caseModel = require(path.join(webconfig.v1, 'case.js'));
const caseSort = require(path.join(webconfig.v1, 'caseSort.js'));

class Case {

    async init(ctx, next){
        this.ctx = ctx;
        this.next = next;
        //ctx.redirect('/news');
        this.params=tool.paramArr(ctx.path);
    }
    async index() {
        let param = this.params;
        let query = this.ctx.query;
        let ad = await adModel.find({
            query: {
                classify: 'bfdaf1d4b22e5a63ba9b944dd446ad1d'
            }
        });

        let search = {};
        if (JSON.stringify(param) !== '[]') {
            search['sort'] = param.sort;
        }


        let brand = await caseModel.find({
            query: search,
            num: 12,
            page: query.page ? query.page : 1
        });


        let url = tool.pageurl(this.ctx.path, query);

        let page = new Page({
            pot: 13,
            url: url,
            page: query.page ?
                query.page :
                1,
            num: 12,
            count: brand.data.count
        })

        await this.ctx.render('case', {
            ad: ad.data.result,
            brand: brand.data.result,
            page: page.html()
        });
    }

    async msg() {

        let id = this.params[2].replace('.html', '');
        let data = await caseModel.findOne({
            _id: id
        });


        //404
        if (data.err_code !== 200) {
            await this.ctx.render('404');
            return false;
        }
        let sort = await caseSort.findOne({
            _id: data.data.sort
        });
        let views = await caseModel.useInc({
            _id: id
        }, 1);
        let prev = await caseModel.findOne({
            add_time: {
                $gt: data.data.add_time
            }
        }, {
            add_time: 1
        }, {
            title: 1
        });
        let nextone = await caseModel.findOne({
            add_time: {
                $lt: data.data.add_time
            }
        }, {
            add_time: -1
        }, {
            title: 1
        });


        await this.ctx.render('caseMsg', {
            msg: data.data,
            sort: sort.data,
            prev: prev,
            next: nextone
        });
    }
}

module.exports = new Case();
