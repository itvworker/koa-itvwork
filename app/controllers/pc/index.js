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
        let sar="j75r6AF0iE8e/LfdmeAGCCcS11IffD5htEq0WdBBVE+GkBKpKpzAtSmKa51Y8ZAWCV9uUVLdVF+Z4lEP1pSGFW9UBHn97pTqvniZyOg5RhrXttWxsC/uIriMhKVIwx1wUNieFK+hRkNRkhAf8bKZyFAS9v9iX67tu2YbEXy6BYrqGrii2X1Xw7EW12OA5kVGPBeUws6wG2X34quvY6J+YbhPz5JL30AC5yAfPYixobqEU+zaxsPCWv1SPwMIjk1CYw22ofOwV0grmZdIoSyYqKbdJJm0lOR0H0IrcXbG43DNdct+KhqS9TKSsHN+pFHfimINL2DfKJG8VJBkKKD4uw==";
        console.log(rsa.decrypt(sar),'-------wwwwwwwww--------------');

        await this.ctx.render('index', {
            ad: ad.data.result,
            brand: brand.data.result,
            inpage: true,
            link: link.data.result

        });

    }
}


module.exports = new Index();
