const adModel = require(path.join(webconfig.v1, 'ad.js'));
const caseModel = require(path.join(webconfig.v1, 'case.js'));
const userModel = require(path.join(webconfig.v1, 'user.js'));
const fs = require('fs');
const des = require(path.join(webconfig.common, 'des3.js'));


const rsa = require(path.join(webconfig.common, 'rsa.js'));
class Index {

    async init(ctx, next) {
        this.ctx = ctx;
        this.next = next;
    }
    async index(ctx, next) {
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

        await ctx.render('index', {
            ad: ad.data.result,
            brand: brand.data.result,
            inpage: true,
            link: link.data.result
        });

    }
    async list() {
        let txt = des.encrypt({
            alg: 'des-ecb',
            autoPad: true,
            key: '01234567',
            plaintext: '1234567812345678',
            iv: null
        })
        let bi = des.decrypt({
            alg: 'des-ecb',
            autoPad: true,
            key: '01234567',
            plaintext: txt.ciph,
            iv: null
        })
        this.ctx.body=rsa.encrypt('data---weefsafa');
    

    }

}


module.exports = new Index();
