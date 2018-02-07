const adModel = require(path.join(webconfig.v1, 'ad.js'));
const caseModel = require(path.join(webconfig.v1, 'case.js'));
const userModel = require(path.join(webconfig.v1, 'user.js'));
const rsa = require(path.join(webconfig.common, 'rsa.js'));
const Verify = require(path.join(webconfig.common, 'verify.js'));
const fs = require('fs');

class Index {

    init(ctx, next) {
        this.ctx = ctx;
        this.next = next;
    }
    async index() {
        let as = new Verify({
          username:{
              schema:'phone',
              schemaReqiure:'电话号码是密填',
              schemaUniq:['电话号帐号已经存在',userModel],
              schemaMsg:'电话号码格式错误'
          },
          date:{
            data:{
              schema:'between',
              schemaVal:'7-10',
              schemaMsg:'长度不一致'
            },
            type:{
              schema:'between',
              schemaVal:'7-10',
              schemaMsg:'长度不一致'
            }
          }
        });

          let data =  await as.init({
            username: 15018499455,
            date:[{
              data:1,
              type:10
            }]
        });

        this.ctx.body=data;
        // let ad = await adModel.find({
        //     query: {
        //         classify: '90d67eabd91381c13f8ff0734f884f0b'
        //     }
        // });
        // let link = await adModel.find({
        //     query: {
        //         classify: '5a6f1b597502522a42d5c674248a77cd'
        //     }
        // });
        // let url = path.join(webconfig.source, 'images');
        // let brand = await caseModel.find({
        //     num: 8,
        //     page: 1
        // });
        // await this.ctx.render('index', {
        //     ad: ad.data.result,
        //     brand: brand.data.result,
        //     inpage: true,
        //     link: link.data.result
        // });


    }
}


module.exports = new Index();
