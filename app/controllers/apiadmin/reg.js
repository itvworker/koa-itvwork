const adModel = require(path.join(webconfig.v1, 'ad.js'));
const caseModel = require(path.join(webconfig.v1, 'case.js'));
const userModel = require(path.join(webconfig.v1, 'user.js'));
const fs = require('fs');

class Reg {
  constructor() {
    return this;
  }
  async init(ctx, next) {
      this.ctx = ctx;
      this.next = next;

  }
    async index(ctx, next) {
        let pwd = tool.md5('wwwww' + 'qazxswedqwertyuiop');
        ctx.body = await userModel.reg({
            username: 'wkwx',
            pwd: pwd
        });

    }




}


module.exports = new Reg();
