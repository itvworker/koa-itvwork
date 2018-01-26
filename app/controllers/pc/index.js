const adModel = require(path.join(webconfig.v1, 'ad.js'));
const caseModel = require(path.join(webconfig.v1, 'case.js'));
const userModel = require(path.join(webconfig.v1, 'user.js'));
const rsa=require(path.join(webconfig.common, 'rsa.js'));
const fs = require('fs');

class Index {

    init(ctx,next){
      this.ctx=ctx;
      this.next=next;
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
        let s=rsa.encrypt('我是谁');
        let sar="DemZSyoWK4VHYjzWUhq1nG6IHg5Ih1U9+ElVaENun69clADJd0ILl1oW5O7ch14VK+gSsnwqPFSxD6HtY1jHZHlWdTXGXupruOo4+/+gC58CzWt6Ml4vl/LhBEmBSMenJ5qVL0Mrsvgx/co8s23Q2+AaZKLnJ28Tx9BCi29Wo10=";
        console.log(rsa.decrypt(s));

        await this.ctx.render('index', {
            ad: ad.data.result,
            brand: brand.data.result,
            inpage: true,
            link: link.data.result,
            rsa:{
              begin:'我是谁',
              end:s,
              init:rsa.decrypt(sar)
            }
        });

    }
}


module.exports = new Index();
