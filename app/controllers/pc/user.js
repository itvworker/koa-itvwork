const adModel = require(path.join(webconfig.v1, 'ad.js'));
const caseModel = require(path.join(webconfig.v1, 'case.js'));
const userModel = require(path.join(webconfig.v1, 'user.js'));
const fs = require('fs');

class User {
    constructor() { }
    

    async reg(ctx, next) {
         let pwd= tool.md5('wwwww' + 'qazxswedqwertyuiop');
        ctx.body= await userModel.reg({
              username:'wkwx',
              pwd:pwd
          });

    }
    async updataPerson(ctx,next){
        
        ctx.body = await userModel.updataPerson({
            _id: "80b5fee607acc7f33189e191355a7fa7"
        }, {
                nickname: '我是你哥s----',
                phone:'13451454514---------'
            });
    }



}


module.exports = new User();