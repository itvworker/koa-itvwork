const adModel = require(path.join(webconfig.v1, 'ad.js'));
const caseModel = require(path.join(webconfig.v1, 'case.js'));
const userModel = require(path.join(webconfig.v1, 'user.js'));
const rsa = require(path.join(webconfig.common, 'rsa.js'));
const Verify = require(path.join(webconfig.common, 'verify.js'));
const gm = require('gm').subClass({
    imageMagick: true
});
const fs = require('fs');


class Index {

    init(ctx, next) {
        this.ctx = ctx;
        this.next = next;
    }
    async index() {
        let ad = await adModel.find({
            query: {
                classify: '90d67eabd91381c13f8ff0734f884f0b'
            }
        });
        let link = await adModel.find({
            query: {
                classify: '5a6f1b597502522a42d5c674248a77cd'
            }
        });
        let url = path.join(webconfig.source, 'images');
        let brand = await caseModel.find({
            num: 8,
            page: 1
        });
        await this.ctx.render('index', {
            ad: ad.data.result,
            brand: brand.data.result,
            inpage: true,
            link: link.data.result
        });
    }
    async test() {


        this.ctx.body = gm(path.join(webconfig.images, '8b70fa33330647f508c57ff4f7c08219.jpg')).resize(240, 240).write(path.join(webconfig.images, 'aaa.jpg'), function(err) {
          console.log(err);
        });;
        //8b70fa33330647f508c57ff4f7c08219.jpg
        // this.ctx.body = {
        //     data: 'test'
        // };
        // images(path.join(webconfig.images, '8b70fa33330647f508c57ff4f7c08219.jpg'))
        // .size(300)
        // .save(path.join(webconfig.images, '8b70fa33330647f508c57ff4f7c08219_300*300.jpg'));

    }
}


module.exports = new Index();
